export interface ProjectImage {
  image: string;
  caption: string;
}

export interface ProjectTag {
  id: number;
  title: string;
}

export interface Project {
  id: number;
  title: string;
  thumbnail: string;
  content: string;
  github: string;
  link: string;
  stack_tags: ProjectTag[];
  project_tags: ProjectTag[];
  timestamp: string;
}
