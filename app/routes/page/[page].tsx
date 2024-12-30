import { PostCardList } from "@/components/gunjo/PostCardList";
import { getPaginatedPosts } from "@/lib/posts";
import { createRoute } from "honox/factory";

export default createRoute(async (c) => {
	const page = Number(c.req.param("page"));
	const posts = await getPaginatedPosts(page, 10);

	return c.render(<PostCardList posts={posts} />, { title: "群青日和" });
});
