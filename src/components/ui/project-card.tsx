import Link from "next/link";
import { Send } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { projectsTable } from "@/lib/definitions";

export default function ProjectCard({
  project,
  className,
}: {
  project: projectsTable;
  className: string;
}) {
  const project_tags = project.project_tags;

  return (
    <>
      <Card key={project.id} className={className}>
        <CardHeader>
          <Avatar className="h-64 w-auto rounded-sm">
            <AvatarImage
              className="rounded-sm"
              src={project.picture_url}
              alt={`${project.name} picture`}
            />
            <AvatarFallback className="rounded-sm">CN</AvatarFallback>
          </Avatar>
          <CardContent>
            <CardTitle className="text-center">{project.name}</CardTitle>
            <CardDescription>{project.body}</CardDescription>
            <div className="my-0.5 space-x-1">
              {project_tags.map((tag: string) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="hover:bg-secondary/75"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </CardHeader>

        <CardFooter className="">
          <CardContent className="w-full">
            <CardDescription className="space-x-1">
              <Link href={project.project_url ? project.project_url : ""}>
                <Button variant="link">
                  <Send />
                  Project Link
                </Button>
              </Link>

              <div className="flex flex-row w-full">
                <p
                  className={cn(
                    project.status === "in_mind" && "text-yellow-500",
                    project.status === "completed" && "text-green-500",
                    project.status === "abandoned" && "text-red-500",
                    project.status === "in_progress" && "text-blue-500",
                    "font-semibold"
                  )}
                >
                  {project.status.replace("_", " ")}
                </p>
                <span className="flex-grow" />
                <p>{new Date(project.created_at).toLocaleDateString()}</p>
              </div>
            </CardDescription>
          </CardContent>
        </CardFooter>
      </Card>
    </>
  );
}
