import { fetchProjectsForHome } from "@/lib/data";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default async function ProjectsCardsHome() {
  const projects = await fetchProjectsForHome();

  return (
    <>
      {projects.map((project) => {
        const project_tags = project.project_tags;
        return (
          <Card key={project.id} className="">
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
                {project_tags.map((tag) => (
                  <p key={tag}>{tag}</p>
                ))}
              </CardContent>
            </CardHeader>
          </Card>
        );
      })}
    </>
  );
}
