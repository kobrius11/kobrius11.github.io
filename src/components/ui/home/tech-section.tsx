"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { useEffect } from "react";
import TechCard from "@/components/ui/home/tech-card";

interface SectionContentProps {
  techStack: {
    title: string;
    stack: string[];
  }[];
  className?: string;
}

export function TechSectionContent({
  techStack,
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

  return (
    <>
      <Carousel
        setApi={setApi}
        className={cn("", 
            isMobile ? "flex items-center justify-center w-[100%]":"", className)}
      >
        <CarouselContent className="mx-5">
          {techStack.map(({ title, stack }, idx) => (
            <CarouselItem key={idx}>
              <TechCard title={title} stack={stack} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {isMobile ? null : (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
      <p>
        {current} of {count}
      </p>
    </>
  );
}
