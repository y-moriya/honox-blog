import { createRoute } from "honox/factory";
import { PostCard } from "@/components/ui/PostCard";

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
	return c.render(
		<main>
			<header>
				<h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
					群青日和
				</h1>
			</header>
			<section>
				<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{postEntries.map(({ id, frontmatter }) => (
						<li key={id} className="m-4">
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
			<footer>
				<p className="text-center text-sm text-muted-foreground">
					© 2024 gunjobiyori.com. All rights reserved.
				</p>
			</footer>
		</main>,
		{ title: "群青日和" },
	);
});
