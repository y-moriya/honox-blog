import type { Post } from "@/types/post";
import { PostCard } from "./post-card";

interface PostCardListProps {
	posts: Post[];
}

// TODO: 各PostCardにキャッチアップ画像を追加したい
export function PostCardList({ posts, ...props }: PostCardListProps) {
	if (posts.length === 0) {
		return <div>No posts found.</div>;
	}

	return (
		<section>
			<ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
				{posts.map(({ id, frontmatter }) => (
					<li key={id} class="m-2">
						<PostCard
							title={frontmatter.title}
							date={frontmatter.date}
							description={frontmatter.description}
							url={`${id.replace(/\.mdx$/, "")}`}
							categories={frontmatter.categories}
						/>
					</li>
				))}
			</ul>
		</section>
	);
}
