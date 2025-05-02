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
      <Card key={project.id} className={cn("py-0 cursor-default", className)}>
        <CardHeader className="px-0">
          <Avatar className="h-64 w-auto rounded-b-none rounded-t-lg">
            <AvatarImage
              className="rounded-b-none rounded-t-lg"
              src={project.picture_url}
              alt={`${project.name} picture`}
            />
            <AvatarFallback className="rounded-b-none rounded-t-lg">
              CN
            </AvatarFallback>
          </Avatar>
          <CardContent>
            <CardTitle className="text-center">
              {project.name}
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
            </CardTitle>
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

        <CardFooter className="w-full">
            <CardDescription className="space-x-1 w-full">
            <div className="flex flex-row items-center">
              <p>
                Published: {new Date(project.created_at).toLocaleDateString()}
              </p>
              <span className="flex-grow" />
              <Link href={project.project_url ? project.project_url : ""}>
                <Button variant="link">
                  <Send />
                  Project Link
                </Button>
              </Link>
            </div>
            </CardDescription>
        </CardFooter>
      </Card>
  );
}
