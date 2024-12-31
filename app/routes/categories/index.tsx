// ../posts/**/*.mdx の Frontmatter を取得して、カテゴリーの一覧を作成する

import { getAllPosts } from "@/lib/posts";
import { createRoute } from "honox/factory";

export default createRoute(async (c) => {
	const allPosts = await getAllPosts();

	// カテゴリをFrontmatterから取得し、頻度をカウントする
	const categories = allPosts
		.flatMap((post) => post.frontmatter.categories || [])
		.reduce(
			(acc, category) => {
				acc[category] = (acc[category] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>,
		);

	// カテゴリの一覧を表示する
	return c.render(
		<main className="markdown">
			<h1>カテゴリ一覧</h1>
			<ul>
				{Object.entries(categories).map(([category, count]) => (
					<li key={category}>
						<a href={`/categories/${category}`}>
							{category} ({count})
						</a>
					</li>
				))}
			</ul>
		</main>,
		{ title: "カテゴリ一覧 - 群青日和" },
	);
});
