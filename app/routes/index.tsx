import { createRoute } from "honox/factory";
import { PostCard } from "@/components/gunjo/PostCard";
import { Header } from "@/components/gunjo/Header";
import { Footer } from "@/components/gunjo/Footer";

type Meta = {
	title: string;
	date: string;
	description: string;
	categories?: string[];
};

export default createRoute(async (c) => {
	const posts = import.meta.glob<{ frontmatter: Meta }>("./posts/**/*.mdx");
	const postEntries = await Promise.all(
		Object.entries(posts).map(async ([id, module]) => {
			const mod = await module();
			return { id, frontmatter: mod.frontmatter };
		}),
	);

	// frontmatter.dateの降順でソート
	postEntries.sort(
		(a, b) =>
			new Date(b.frontmatter.date).getTime() -
			new Date(a.frontmatter.date).getTime(),
	);

	// TODO: 各PostCardにキャッチアップ画像を追加したい
	return c.render(
		<main className="max-w-4xl mx-auto">
			<Header />
			<section>
				<img src="/static/hero.jpg" alt="hero" className="mx-auto" />
			</section>
			<section>
				<ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
					{postEntries.map(({ id, frontmatter }) => (
						<li key={id} className="m-2">
							<PostCard
								title={frontmatter.title}
								date={frontmatter.date}
								description={frontmatter.description}
								url={`${id.replace(/\.mdx$/, "")}`}
								categories={frontmatter.categories}
								className="h-full"
							/>
						</li>
					))}
				</ul>
			</section>
			<Footer />
		</main>,
		{ title: "群青日和" },
	);
});
