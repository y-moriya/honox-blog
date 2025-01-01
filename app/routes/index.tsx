import { createRoute } from "honox/factory";
import { getPaginatedPosts } from "@/lib/posts";
import { PostCardList } from "@/components/PostCardList";
import { Hero } from "@/components/Hero";
import { Pagination } from "@/components/Pagination";
import { MAX_POSTS_PER_PAGE } from "@/constants";

// TODO: OGP生成する
// TODO: Transition API 使う
// TODO: shadcn/ui をやめて daisyui にする
export default createRoute(async (c) => {
	const { posts, totalPage } = await getPaginatedPosts(1, MAX_POSTS_PER_PAGE);

	return c.render(
		<>
			<Hero />
			<PostCardList posts={posts} />
			<Pagination currentPage={1} totalPage={totalPage} />
		</>,
		{ title: "群青日和" },
	);
});
