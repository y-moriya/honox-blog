import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";

export default jsxRenderer(({ children, Layout, frontmatter }) => {
	const c = useRequestContext();
	const pagePath = c.req.path;
	const pageName = pagePath.split("/").pop();
	const viewTransitionStyleTitle = `view-transition-name:title-${pageName}`;
	const viewTransitionStyleDescription = `view-transition-name:description-${pageName}`;
	const viewTransitionStyleCategory = `view-transition-name:category-${pageName}`;
	return (
		<Layout title={frontmatter?.title} frontmatter={frontmatter}>
			<div class="container mx-auto flex-1 px-0 main-container">
				<div class="max-w-8xl mx-auto px-0 py-4 sm:px-6 lg:px-8 markdown">
					<h1 class="text-3xl font-bold" style={viewTransitionStyleTitle}>
						{frontmatter?.title}
					</h1>
				</div>
				<div class="max-w-8xl mx-auto px-0 py-0">
					<p>
						{frontmatter?.categories?.map((category) => (
							<span key={category} class="text-sm text-muted-foreground">
								<a href={`/categories/${category}`} class="text-gray-700">
									#{category}
								</a>
							</span>
						))}
					</p>
				</div>
				<div
					class="max-w-8xl mx-auto px-0 py-4 sm:px-6 lg:px-8 markdown"
					style={viewTransitionStyleDescription}
				>
					<p>{frontmatter?.description}</p>
				</div>
				<div class="max-w-8xl mx-auto px-0 py-4 sm:px-6 lg:px-8 markdown">
					{children}
				</div>
			</div>
		</Layout>
	);
});
