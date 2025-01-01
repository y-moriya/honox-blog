import { PostCardList } from "@/components/PostCardList";
import { getCategorizedPosts } from "@/lib/posts";
import { createRoute } from "honox/factory";

export default createRoute(async (c) => {
	const category = c.req.param("category");
	const posts = await getCategorizedPosts(category);
	console.log(posts);

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
