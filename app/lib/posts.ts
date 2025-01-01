import type { PaginatedPosts, Post } from "@/types/post";

export async function getAllPosts(): Promise<Post[]> {
  const allPosts = import.meta.glob<{ frontmatter: Meta }>("../routes/posts/**/*.mdx", {
    eager: true,
  });
  return Object.entries(allPosts).map(([id, mod]) => {
    return { id: id.replace('../routes', ''), frontmatter: mod.frontmatter };
  });
}

export async function getPaginatedPosts(page: number, perPage: number): Promise<PaginatedPosts> {
  const allPosts = await getAllPosts();
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

export async function getCategorizedPosts(category: string): Promise<Post[]> {
  const allPosts = await getAllPosts();

  // frontmatter.dateの降順でソート
  allPosts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );

  return allPosts.filter((post) => post.frontmatter.categories?.includes(category));
}

export async function getCategories(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const categories = allPosts.flatMap((post) => post.frontmatter.categories ?? []);
  return Array.from(new Set(categories));
}
