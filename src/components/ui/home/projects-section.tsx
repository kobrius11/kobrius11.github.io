"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect } from "react";
import { projectsTable } from "@/lib/definitions";
import ProjectCard from "@/components/ui/project-card";

interface SectionContentProps {
  projects: projectsTable[];
  className?: string;
}

export function ProjectSectionContent({
  projects,
  className,
}: SectionContentProps) {
  const isMobile = useIsMobile();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (isMobile) {
    return (
      <Carousel setApi={setApi} className={cn("", className)}>
        <CarouselContent className="mx-5">
          {projects.map((project, idx) => (
            <CarouselItem key={idx}>
              <ProjectCard project={project} className="" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }

  // Desktop view with grid
  return (
    <div className={cn("grid grid-cols-3 gap-4", className)}>
      {projects.map((project, idx) => (
        <ProjectCard key={idx} project={project} className="" />
      ))}
    </div>
  );
}
