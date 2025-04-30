import ProjectTags from "@/components/ui/projects/project-tags";
import SearchBar from "@/components/ui/search";
import ProjectsCards from "@/components/ui/projects/project-cards";


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
  return (
    
    <div>
      <div className="flex flex-col items-center justify-center space-y-2 my-2">
        <SearchBar className="w-xl" placeholder="Search for projects..." />
        <ProjectTags />
      </div>
      <div className="grid grid-cols-3 space-x-4 mx-5 w-auto">
        <ProjectsCards query={query} tag={tag} />
      </div>
    </div>
  );
}
