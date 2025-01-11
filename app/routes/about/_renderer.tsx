import { format } from "date-fns";
import { jsxRenderer } from "hono/jsx-renderer";

export default jsxRenderer(({ children, Layout, frontmatter }) => {
	const formattedDate = frontmatter?.date
		? format(new Date(frontmatter.date), "yyyy/MM/dd")
		: "";
	return (
		<Layout title={frontmatter?.title}>
			<div class="container mx-auto flex-1 px-0 main-container">
				<div class="max-w-8xl mx-auto px-0 sm:px-6 lg:px-8 markdown">
					<h1 class="text-3xl font-bold">{frontmatter?.title}</h1>
				</div>
				<div class="max-w-8xl mx-auto p-0 sm:px-6 lg:px-8 markdown">
					<p>{frontmatter?.description}</p>
					<p class="text-center text-sm text-gray-500">{formattedDate}</p>
				</div>
				<div class="max-w-8xl mx-auto px-0 py-4 sm:px-6 lg:px-8 markdown">
					{children}
				</div>
			</div>
		</Layout>
	);
});
