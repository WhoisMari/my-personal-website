import { Tag } from "../../../types";

export interface SkillsPost {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  intro: string;
  content: string;
  timestamp: string;
  tags: Tag[];
}

export interface Certificate {
  id: number;
  title: string;
  certificate: string;
  description: string;
  timestamp: string;
}
