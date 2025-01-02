import type { PaginatedPosts, Post } from "@/types/post";

export function getAllPosts(): Post[] {
  const allPosts = import.meta.glob<{ frontmatter: Meta }>("../routes/posts/**/*.mdx", {
    eager: true,
  });
  return Object.entries(allPosts).map(([id, mod]) => {
    return { id: id.replace('../routes', ''), frontmatter: mod.frontmatter };
  });
}

export function getPostById(id: string): Post {
  const allPosts = import.meta.glob<{ frontmatter: Meta }>("../routes/posts/**/*.mdx", {
    eager: true,
  });
  const post = Object.entries(allPosts).find(([key]) => key.includes(id));
  if (!post) {
    throw new Error(`Post not found: ${id}`);
  }
  return { id: post[0].replace('../routes', ''), frontmatter: post[1].frontmatter };
}

export function getPaginatedPosts(page: number, perPage: number): PaginatedPosts {
  const allPosts = getAllPosts();
  const totalPage = Math.ceil(allPosts.length / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;

  // frontmatter.dateの降順でソート
  allPosts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );

  return { posts: allPosts.slice(start, end), totalPage };
}

export function getCategorizedPosts(category: string): Post[] {
  const allPosts = getAllPosts();

  // frontmatter.dateの降順でソート
  allPosts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );

  return allPosts.filter((post) => post.frontmatter.categories?.includes(category));
}

export function getCategories(): string[] {
  const allPosts = getAllPosts();
  const categories = allPosts.flatMap((post) => post.frontmatter.categories ?? []);
  return Array.from(new Set(categories));
}
