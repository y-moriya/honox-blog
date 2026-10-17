import type { Meta } from "@/types/meta";

export type Post = {
  id: string;
  frontmatter: Meta;
};

export type PaginatedPosts = {
  posts: Post[];
  totalPage: number;
};
