import { Pagination } from "@/components/pagination";
import { PostCardList } from "@/components/post-card-list";
import { getAllPosts, getPaginatedPosts } from "@/lib/posts";
import { createRoute } from "honox/factory";
import { ssgParams } from "hono/ssg";
import type { Env } from "hono";
import { SITE_CONFIG } from "@/constants/config";

const param = ssgParams<Env>((c) => {
	const params: { page: string }[] = [];
	const allPosts = getAllPosts();
	const totalPage = Math.ceil(
		allPosts.length / SITE_CONFIG.pagination.postsPerPage,
	);
	for (let page = 1; page <= totalPage; page++) {
		params.push({ page: page.toString() });
	}
	return params;
});

export default createRoute(param, (c) => {
	const page = Number(c.req.param("page"));
	const { posts, totalPage } = getPaginatedPosts(
		page,
		SITE_CONFIG.pagination.postsPerPage,
	);

	return c.render(
		<>
			<PostCardList posts={posts} />
			<Pagination currentPage={page} totalPage={totalPage} />
		</>,
	);
});
