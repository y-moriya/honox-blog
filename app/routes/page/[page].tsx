import { Pagination } from "@/components/Pagination";
import { PostCardList } from "@/components/PostCardList";
import { MAX_POSTS_PER_PAGE } from "@/constants";
import { getAllPosts, getPaginatedPosts } from "@/lib/posts";
import { createRoute } from "honox/factory";
import { ssgParams } from "hono/ssg";
import type { Env } from "hono";

const param = ssgParams<Env>(async (c) => {
	const params: { page: string }[] = [];
	const allPosts = await getAllPosts();
	const totalPage = Math.ceil(allPosts.length / MAX_POSTS_PER_PAGE);
	for (let page = 1; page <= totalPage; page++) {
		params.push({ page: page.toString() });
	}
	return params;
});

export default createRoute(param, async (c) => {
	const page = Number(c.req.param("page"));
	const { posts, totalPage } = await getPaginatedPosts(
		page,
		MAX_POSTS_PER_PAGE,
	);

	return c.render(
		<>
			<PostCardList posts={posts} />
			<Pagination currentPage={page} totalPage={totalPage} />
		</>,
		{ title: "群青日和" },
	);
});
