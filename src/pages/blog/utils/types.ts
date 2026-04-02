import { Tag } from "../../../types";

export interface Post {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  intro: string;
  content: string;
  timestamp: string;
  tags: Tag[];
}
