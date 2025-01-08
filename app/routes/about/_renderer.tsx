import { reactRenderer } from "@hono/react-renderer";
import { jsxRenderer } from "hono/jsx-renderer";

export default jsxRenderer(({ children, Layout, frontmatter }) => {
	return (
		<Layout title={frontmatter.title}>
			<div class="container mx-auto flex-1 px-0 main-container">
				<div class="max-w-8xl mx-auto px-0 py-8 sm:px-6 lg:px-8 markdown">
					<h1 class="text-3xl font-bold">{frontmatter.title}</h1>
				</div>
				<div class="max-w-8xl mx-auto px-0 py-8 sm:px-6 lg:px-8 markdown">
					{children}
				</div>
			</div>
		</Layout>
	);
});
