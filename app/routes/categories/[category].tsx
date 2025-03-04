import { PostCardList } from "@/components/post-card-list";
import { getCategories, getCategorizedPosts } from "@/lib/posts";
import type { Env } from "hono";
import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";

const param = ssgParams<Env>((c) => {
	return getCategories().map((category) => ({ category }));
});

export default createRoute(param, (c) => {
	const category = c.req.param("category");
	const posts = getCategorizedPosts(category);

	return c.render(
		<main>
			<header class="markdown">
				<h1 class="text-center">#{category}</h1>
			</header>
			<PostCardList posts={posts} />
		</main>,
		{
			title: `${category} - 群青日和`,
		},
	);
});
