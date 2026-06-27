import { Category } from "@/components/category";
import { Gravatar } from "@/components/gravatar";
import { SITE_CONFIG } from "@/constants/config";
import { format } from "date-fns";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import { getViewTransitionStyles } from "@/lib/utils";

export default jsxRenderer(({ children, Layout, frontmatter }) => {
	const formattedDate = frontmatter?.date
		? format(new Date(frontmatter.date), SITE_CONFIG.dateFormat)
		: "";
	const c = useRequestContext();
	const pagePath = c.req.path;
	const pageName = pagePath.split("/").pop();
	const vtStyles = getViewTransitionStyles(pageName);
	return (
		<Layout title={frontmatter?.title} frontmatter={frontmatter}>
			<div class="container mx-auto flex-1 px-0 main-container">
				<div class="max-w-8xl mx-auto px-0 sm:px-6 lg:px-8 markdown">
					<h1 class="text-3xl font-bold" style={vtStyles.title}>
						{frontmatter?.title}
					</h1>
				</div>
				<div class="max-w-8xl mx-auto px-0 py-0">
					<Category
						viewTransitionStyleCategory={vtStyles.category}
						categories={frontmatter?.categories ?? []}
					/>
				</div>
				<div class="max-w-8xl mx-auto p-0 sm:px-6 lg:px-8 markdown">
					<p style={vtStyles.description}>
						{frontmatter?.description}
					</p>
					<p
						class="text-center text-sm text-gray-500"
						style={vtStyles.date}
					>
						{formattedDate}
					</p>
				</div>
				<div class="max-w-8xl mx-auto px-0 py-4 sm:px-6 lg:px-8 markdown">
					{children}
				</div>
			</div>
			<Gravatar />
		</Layout>
	);
});
