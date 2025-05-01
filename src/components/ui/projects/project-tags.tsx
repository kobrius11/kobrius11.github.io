"use client";

import { Toggle } from "@/components/ui/toggle";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import type { projectTagsTable } from "@/lib/definitions";

export default function ProjectTags({
  project_tags,
}: {
  project_tags: projectTagsTable[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const handleClick = (tagSlug: string) => {
    const params = new URLSearchParams(searchParams);
    const current = params.get("tag");
    const currentTags = current ? current.split(",") : [];
  
    const tagIndex = currentTags.indexOf(tagSlug);
  
    if (tagIndex > -1) {
      // Remove tag
      currentTags.splice(tagIndex, 1);
    } else {
      // Add tag
      currentTags.push(tagSlug);
    }
  
    if (currentTags.length > 0) {
      params.set("tag", currentTags.join(","));
    } else {
      params.delete("tag");
    }
  
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="space-x-1 space-y-2">
        {project_tags.map((tag) => {
          const activeTags = searchParams.get("tag")?.split(",") || [];
          const isActive = activeTags.includes(tag.slug);
          return (
            <Toggle
              onClick={() => handleClick(tag.slug)}
              variant="outline"
              pressed={isActive}
              key={tag.name}
            >
              {tag.name}
            </Toggle>
          );
        })}
      </div>
    </div>
  );
}
