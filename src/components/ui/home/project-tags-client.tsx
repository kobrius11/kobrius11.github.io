"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import type { projectTagsTable } from "@/lib/definitions";

export default function ProjectTagsClient({
  project_tags,
}: {
  project_tags: projectTagsTable[];
}) {
  const pathname = usePathname();
  const searchPrams = useSearchParams();
  const { replace } = useRouter();

  const handleClick = (tagSlug: string) => {
    const params = new URLSearchParams(searchPrams);

    if (tagSlug) params.set("tag", tagSlug);
    else params.delete("tag");

    replace(`${pathname}?${params.toString()}`);
  };

  const handleClearClick = () => {
    const params = new URLSearchParams(searchPrams);
    params.delete("tag");
    params.delete("query");

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="space-x-1 space-y-2">
        {project_tags.map((tag) => (
          <Button
            onClick={() => handleClick(tag.slug)}
            variant="secondary"
            key={tag.name}
          >
            {tag.name}
          </Button>
        ))}
      </div>
      <Button
        className="w-24"
        onClick={() => handleClearClick()}
        variant='destructive'
      >
        clear
      </Button>
    </div>
  );
}
