import type { PaginatedPosts, Post } from "@/types/post";
import type { Meta } from "@/types/meta";

// モジュール読み込み時に一度だけ glob を実行
const rawPosts = import.meta.glob<{ frontmatter: Meta }>("../routes/posts/**/*.mdx", {
  eager: true,
});

// 下書き以外の記事を取得し、日付降順で事前にソート
const postsCache: Post[] = Object.entries(rawPosts)
  .filter(([_, mod]) => !mod.frontmatter?.draft)
  .map(([key, mod]) => ({
    id: key.replace("../routes", ""),
    frontmatter: mod.frontmatter,
  }))
  .sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );

// ID による高速 O(1) 検索用の Map
const postMap = new Map<string, Post>(
  postsCache.map((post) => [post.id, post]),
);

export function getAllPosts(): Post[] {
  return [...postsCache];
}

export function getPostById(id: string): Post {
  // id が /posts/xxx 形式の場合と slug だけの場合の両方に対応
  const lookupKey = id.startsWith("/posts/") ? id : `/posts/${id}`;
  const post = postMap.get(lookupKey) || postMap.get(`${lookupKey}.mdx`) || postsCache.find((p) => p.id.includes(id));
  if (!post) {
    throw new Error(`Post not found: ${id}`);
  }
  return post;
}

export function getPaginatedPosts(page: number, perPage: number): PaginatedPosts {
  const allPosts = getAllPosts();
  const totalPage = Math.ceil(allPosts.length / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return { posts: allPosts.slice(start, end), totalPage };
}

export function getCategorizedPosts(category: string): Post[] {
  return postsCache.filter((post) =>
    post.frontmatter.categories?.includes(category),
  );
}

export function getCategories(): string[] {
  const categories = postsCache.flatMap(
    (post) => post.frontmatter.categories ?? [],
  );
  return Array.from(new Set(categories));
}
