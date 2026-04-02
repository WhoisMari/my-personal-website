export interface ProjectImage {
  image: string;
  caption: string;
}

export interface Project {
  id: number;
  title: string;
  thumbnail: string;
  content: string;
  github: string;
  link: string;
  timestamp: string;
}
