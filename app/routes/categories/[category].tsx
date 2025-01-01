import { PostCardList } from "@/components/PostCardList";
import { getCategories, getCategorizedPosts } from "@/lib/posts";
import type { Env } from "hono";
import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";

const param = ssgParams<Env>(async (c) => {
	return (await getCategories()).map((category) => ({ category }));
});

export default createRoute(param, async (c) => {
	const category = c.req.param("category");
	const posts = await getCategorizedPosts(category);

	return c.render(
		<main>
			<header className="markdown">
				<h1 className="text-center">#{category}</h1>
			</header>
			<PostCardList posts={posts} />
		</main>,
		{
			title: `${category} - 群青日和`,
		},
	);
});
