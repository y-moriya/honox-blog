import { createRoute } from "honox/factory";
import { getPaginatedPosts } from "@/lib/posts";
import { PostCardList } from "@/components/gunjo/PostCardList";
import { Hero } from "@/components/gunjo/Hero";
import { MyPagination } from "@/components/gunjo/MyPagination";
import { MAX_POSTS_PER_PAGE } from "@/constants";

// TODO: OGP生成する
export default createRoute(async (c) => {
	const { posts, totalPage } = await getPaginatedPosts(1, MAX_POSTS_PER_PAGE);

	return c.render(
		<>
			<Hero />
			<PostCardList posts={posts} />
			<MyPagination currentPage={1} totalPage={totalPage} />
		</>,
		{ title: "群青日和" },
	);
});
