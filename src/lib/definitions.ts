interface projectsTable {
  id: number;
  name: string;
  slug: string;
  body: string;
  status: 'in_mind' | 'in_progress' | 'abandoned' | 'completed';
  created_at: string;
  updated_at: string;
  project_url: string;
  picture_url: string;
  project_tags: string[];
}

interface projectTagsTable {
  name: string;
  slug: string;
}

export type { projectsTable, projectTagsTable };
