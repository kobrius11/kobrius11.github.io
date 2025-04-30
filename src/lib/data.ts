import postgres from "postgres";
import { projectsTable, projectTagsTable } from "@/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function fetchProjects() {
  try {
    const projects = await sql<projectsTable[]>`
        SELECT 
          p.*,
          ARRAY_AGG(pt.name) AS project_tags
        FROM public.projects p 
        LEFT JOIN public.projects_tags pt_many
          ON p.id = pt_many.project_id
        LEFT JOIN public.project_tags pt
          ON pt_many.tag_id = pt.id
        GROUP BY
          p.id
        ORDER BY 
          p.created_at DESC 
        LIMIT 3
    `;

    return projects;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch project data.");
  }
}

async function fetchProjectTags() {
  try {
    const project_tags = await sql<projectTagsTable[]>`
        SELECT DISTINCT
          p.name,
          p.slug
        FROM public.project_tags p
        INNER JOIN public.projects_tags pt
          ON p.id = pt.tag_id
    `;

    return project_tags;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch project data.");
  }
}

async function fetchFilteredProjectsByTags(tagSlug: string) {
  const tagSlugParsed = tagSlug.split(",");
  console.log(tagSlugParsed);
  try {
    const projects = await sql<projectTagsTable[]>`
      WITH projects_cte AS (
        SELECT 
          p.*,
          ARRAY_AGG(pt.name) AS project_tags
        FROM public.projects p 
        LEFT JOIN public.projects_tags pt_many
            ON p.id = pt_many.project_id
        LEFT JOIN public.project_tags pt
            ON pt_many.tag_id = pt.id
        GROUP BY p.id
      ), tags_cte AS (
        SELECT 
          pt_many.project_id
        FROM public.projects_tags pt_many
        LEFT JOIN public.project_tags pt
          ON pt_many.tag_id = pt.id
        WHERE pt.slug = ANY(${tagSlugParsed})
      )
        SELECT DISTINCT
          p.*
        FROM projects_cte p
        INNER JOIN tags_cte t
          ON p.id = t.project_id
    `;

    return projects;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch project data.");
  }
}

export { fetchProjects, fetchProjectTags, fetchFilteredProjectsByTags };
