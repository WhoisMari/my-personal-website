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

export type TagVariant = "highlight" | "fun" | "default";

export interface SkillTag {
  label: string;
  tooltip: string;
  variant: TagVariant;
}

export interface SkillGroup {
  label: string;
  tags: SkillTag[];
  muted?: boolean;
}
