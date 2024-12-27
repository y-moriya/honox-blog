import { createRoute } from "honox/factory";
import Counter from "@/islands/counter";

type Meta = {
	title: string;
	date: string;
	description: string;
};

export default createRoute(async (c) => {
	const name = c.req.query("name") ?? "Hono";
	const posts = import.meta.glob<{ frontmatter: Meta }>("../posts/**/*.mdx");
	const postEntries = await Promise.all(
		Object.entries(posts).map(async ([id, module]) => {
			const mod = await module();
			return { id, frontmatter: mod.frontmatter };
		}),
	);
	return c.render(
		<div>
			<div className="m-5">
				<h1>Hello, {name}!</h1>
				<Counter />
			</div>
			<div>
				<h2>Posts</h2>
				<ul className="article-list">
					{postEntries.map(({ id, frontmatter }) => (
						<li key={id}>
							<a href={`${id.replace(/\.mdx$/, "")}`}>{frontmatter.title}</a>
						</li>
					))}
				</ul>
			</div>
		</div>,
		{ title: name },
	);
});
