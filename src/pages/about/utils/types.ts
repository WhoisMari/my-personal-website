import { Tag } from "../../../types";

export interface AboutPost {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  intro: string;
  content: string;
  timestamp: string;
  tags: Tag[];
}
