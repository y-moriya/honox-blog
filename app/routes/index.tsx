import { createRoute } from "honox/factory";
import { getPaginatedPosts } from "@/lib/posts";
import { PostCardList } from "@/components/PostCardList";
import { Hero } from "@/components/Hero";
import { Pagination } from "@/components/Pagination";
import { MAX_POSTS_PER_PAGE } from "@/constants";

export default createRoute((c) => {
	const { posts, totalPage } = getPaginatedPosts(1, MAX_POSTS_PER_PAGE);

	return c.render(
		<>
			<Hero />
			<PostCardList posts={posts} />
			<Pagination currentPage={1} totalPage={totalPage} />
		</>,
	);
});
