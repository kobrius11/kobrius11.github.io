import { fetchProjects, fetchFilteredProjectsByTags } from "@/lib/data";
import { projectTagsTable } from "@/lib/definitions";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default async function ProjectsCards({query, tag }: {query?:string, tag?: string}) {
    
    let projects: projectTagsTable[];

    if (!query && !tag) {
      projects = await fetchProjects();
    }
    if (!query && tag) {
      projects = await fetchFilteredProjectsByTags(tag);
    }
    if (query && !tag) {
      projects = await fetchProjects();
    }
    if (query && tag) {
      projects = await fetchProjects();
    }


  // } else if (query && tag) {
  //   projects = await fetchProjects()
  // };


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
