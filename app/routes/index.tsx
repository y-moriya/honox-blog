import { createRoute } from "honox/factory";
import { getPaginatedPosts } from "@/lib/posts";
import { PostCardList } from "@/components/gunjo/PostCardList";
import { Hero } from "@/components/gunjo/Hero";

export default createRoute(async (c) => {
	const posts = await getPaginatedPosts(1, 10);

	// TODO: pagination
	return c.render(
		<>
			<Hero />
			<PostCardList posts={posts} />
		</>,
		{ title: "群青日和" },
	);
});
