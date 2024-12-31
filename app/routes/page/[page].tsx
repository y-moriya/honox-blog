import { MyPagination } from "@/components/gunjo/MyPagination";
import { PostCardList } from "@/components/gunjo/PostCardList";
import { MAX_POSTS_PER_PAGE } from "@/constants";
import { getPaginatedPosts } from "@/lib/posts";
import { createRoute } from "honox/factory";

export default createRoute(async (c) => {
	const page = Number(c.req.param("page"));
	const { posts, totalPage } = await getPaginatedPosts(
		page,
		MAX_POSTS_PER_PAGE,
	);

	return c.render(
		<>
			<PostCardList posts={posts} />
			<MyPagination currentPage={page} totalPage={totalPage} />
		</>,
		{ title: "群青日和" },
	);
});
