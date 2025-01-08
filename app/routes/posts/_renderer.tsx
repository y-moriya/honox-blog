import { Category } from "@/components/Category";
import { format } from "date-fns";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";

export default jsxRenderer(({ children, Layout, frontmatter }) => {
	const formattedDate = frontmatter?.date
		? format(new Date(frontmatter.date), "yyyy/MM/dd")
		: "";
	const c = useRequestContext();
	const pagePath = c.req.path;
	const pageName = pagePath.split("/").pop();
	const viewTransitionStyleTitle = `view-transition-name:title-${pageName}`;
	const viewTransitionStyleDescription = `view-transition-name:description-${pageName}`;
	const viewTransitionStyleCategory = `view-transition-name:category-${pageName}`;
	const viewTransitionStyleDate = `view-transition-name:date-${pageName}`;
	return (
		<Layout title={frontmatter?.title} frontmatter={frontmatter}>
			<div class="container mx-auto flex-1 px-0 main-container">
				<div class="max-w-8xl mx-auto px-0 sm:px-6 lg:px-8 markdown">
					<h1 class="text-3xl font-bold" style={viewTransitionStyleTitle}>
						{frontmatter?.title}
					</h1>
				</div>
				<div class="max-w-8xl mx-auto px-0 py-0">
					<Category
						viewTransitionStyleCategory={viewTransitionStyleCategory}
						categories={frontmatter?.categories ?? []}
					/>
				</div>
				<div class="max-w-8xl mx-auto p-0 sm:px-6 lg:px-8 markdown">
					<p style={viewTransitionStyleDescription}>
						{frontmatter?.description}
					</p>
					<p
						class="text-center text-sm text-gray-500"
						style={viewTransitionStyleDate}
					>
						{formattedDate}
					</p>
				</div>
				<div class="max-w-8xl mx-auto px-0 py-4 sm:px-6 lg:px-8 markdown">
					{children}
				</div>
			</div>
		</Layout>
	);
});
