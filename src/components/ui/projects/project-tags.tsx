import { fetchProjectTags } from "@/lib/data";
import ProjectTagsClient from "./project-tags-client";


export default async function ProjectTags() {
  const project_tags = await fetchProjectTags();
  return <ProjectTagsClient project_tags={project_tags} />;
}