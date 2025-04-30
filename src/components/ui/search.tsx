"use client";

import { cn } from "@/lib/utils";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";

export default function SearchBar({
  placeholder,
  className = "",
}: {
  placeholder: string;
  className?: string;
}) {
  const searchPrams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchPrams);

    if (term) params.set("query", term);
    else params.delete("query");

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className={cn("flex flex-1 flex-shrink-0", className)}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      {/* <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
      <Input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchPrams.get("query")?.toString()}
      />
    </div>
  );
}
