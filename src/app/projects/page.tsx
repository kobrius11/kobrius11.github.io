import SearchBar from "@/components/ui/search";
import ProjectsCards from "@/components/ui/projects/project-cards";
import { fetchProjectTags } from "@/lib/data";
import ProjectTags from "@/components/ui/projects/project-tags";
import { Separator } from "@/components/ui/separator";



/* TODO: FIX mobile cards + style better now it looks like shit */
export default async function ProjectPage(props: {
  searchParams?: Promise<{
    query?: string;
    tag?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const tag = searchParams?.tag || "";

  const project_tags = await fetchProjectTags()
  return (
    
    <div>
      <div className="flex flex-col items-center justify-center space-y-2 my-2">
        <SearchBar className="lg:w-[65%]" placeholder="Search for projects..." />
        <ProjectTags project_tags={project_tags}/>
      </div>
      <Separator className="mb-5"/>
      <div className="grid grid-cols-3 space-x-4 mx-5 w-auto">
        <ProjectsCards query={query} tag={tag} />
      </div>
    </div>
  );
}
