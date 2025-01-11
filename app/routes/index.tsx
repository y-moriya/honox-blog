import { createRoute } from "honox/factory";
import { getPaginatedPosts } from "@/lib/posts";
import { PostCardList } from "@/components/post-card-list";
import { Hero } from "@/components/hero";
import { Pagination } from "@/components/pagination";
import { SITE_CONFIG } from "@/constants/config";

export default createRoute((c) => {
	const { posts, totalPage } = getPaginatedPosts(
		1,
		SITE_CONFIG.pagination.postsPerPage,
	);

	return c.render(
		<>
			<Hero />
			<PostCardList posts={posts} />
			<Pagination currentPage={1} totalPage={totalPage} />
		</>,
	);
});
