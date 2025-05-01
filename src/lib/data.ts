import postgres from "postgres";
import { projectsTable, projectTagsTable } from "@/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function fetchProjectsForHome() {
  try {
    const projects = await sql<projectsTable[]>`
        SELECT 
          p.id,
          p.name,
          p.slug,
          p.body,
          p.status,
          p.created_at,
          p.updated_at,
          p.picture_url,
          p.project_url,
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

async function fetchProjects() {
  try {
    const projects = await sql<projectsTable[]>`
        SELECT 
          p.id,
          p.name,
          p.slug,
          p.body,
          p.status,
          p.created_at,
          p.updated_at,
          p.picture_url,
          p.project_url,
          ARRAY_AGG(pt.name) AS project_tags
        FROM public.projects p 
        LEFT JOIN public.projects_tags pt_many
          ON p.id = pt_many.project_id
        LEFT JOIN public.project_tags pt
          ON pt_many.tag_id = pt.id
        GROUP BY p.id
        ORDER BY p.created_at DESC 
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

async function fetchFilteredProjectsByTags(tagSlug: string, page: number = 0) {
  const tagSlugParsed = tagSlug.split(",");
  const tagSlugParsedStr = tagSlugParsed.sort().join(",");

  const offset = page * 3;
  try {
    const projects = await sql<projectsTable[]>`
      WITH projects_cte AS (
        SELECT 
          p.id,
          p.name,
          p.slug,
          p.body,
          p.status,
          p.created_at,
          p.updated_at,
          p.picture_url,
          p.project_url,
          ARRAY_AGG(pt.name) AS project_tags,
          STRING_AGG(pt.slug, ',' ORDER BY pt.slug) AS project_tags_str
        FROM public.projects p 
        LEFT JOIN public.projects_tags pt_many
            ON p.id = pt_many.project_id
        LEFT JOIN public.project_tags pt
            ON pt_many.tag_id = pt.id
        GROUP BY p.id
      ), tags_cte AS (
        SELECT 
          pt_many.project_id,
          pt.slug
        FROM public.projects_tags pt_many
        LEFT JOIN public.project_tags pt
          ON pt_many.tag_id = pt.id    
      )
        SELECT DISTINCT
          p.id,
          p.name,
          p.slug,
          p.body,
          p.status,
          p.created_at,
          p.updated_at,
          p.picture_url,
          p.project_url,
          p.project_tags
        FROM projects_cte p
        INNER JOIN tags_cte t
          ON p.id = t.project_id
        ${
          tagSlugParsed.length > 1
            ? sql`WHERE p.project_tags_str = ${tagSlugParsedStr}`
            : sql`WHERE t.slug = ANY(${tagSlugParsed})`
        }
        LIMIT 3 OFFSET ${offset}
    `;

    return projects;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch project data.");
  }
}

export { fetchProjectsForHome, fetchProjects, fetchProjectTags, fetchFilteredProjectsByTags };
