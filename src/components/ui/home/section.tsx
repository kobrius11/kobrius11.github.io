import { cn } from "@/lib/utils";

function Section({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="section"
      className={cn("snap-start h-screen py-8 md:py-24 lg:py-16", className)}
      {...props}
    />
  );
}

function SectionContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="section-content"
      className={cn("px-6 md:px-4", className)}
      {...props}
    />
  );
}

function SectionHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="section-header"
      className={cn(
        "@container/section-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6",
        className
      )}
      {...props}
    />
  );
}

function SectionTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="section-title"
      className={cn(
        "leading-none text-3xl bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none",
        className
      )}
      {...props}
    />
  );
}

function SectionDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="section-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function SectionFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="section-footer"
      className={cn(
        "flex items-center px-6 [.border-t]:pt-6",
        className
      )}
      {...props}
    />
  );
}

export {
  Section,
  SectionContent,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  SectionFooter,
};
