import { getAllPosts } from "@/lib/posts";
import { createRoute } from "honox/factory";
import { SITE_CONFIG } from "@/constants/config";

export default createRoute(async (c) => {
  const posts = getAllPosts();

  // 投稿日の降順でソート
  posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );

  const itemsXml = posts
    .map((post) => {
      const link = `${SITE_CONFIG.baseUrl}${post.id.replace(/\.mdx$/, "")}`;
      return `<item>
  <title><![CDATA[${post.frontmatter.title}]]></title>
  <link>${link}</link>
  <guid>${link}</guid>
  <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
  <description><![CDATA[${post.frontmatter.description || ""}]]></description>
</item>`;
    })
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title><![CDATA[${SITE_CONFIG.title}]]></title>
  <link>${SITE_CONFIG.baseUrl}</link>
  <description><![CDATA[${SITE_CONFIG.description}]]></description>
${itemsXml}
</channel>
</rss>`;

  return c.text(rssFeed, 200, { "Content-Type": "application/xml; charset=UTF-8" });
});
