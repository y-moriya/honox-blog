import { Footer } from "@/components/gunjo/Footer";
import { Header } from "@/components/gunjo/Header";
import { reactRenderer } from "@hono/react-renderer";

export default reactRenderer(({ children, Layout, frontmatter }) => {
	return (
		<Layout title={frontmatter.title}>
			<div className="container mx-auto flex-1 px-0 main-container">
				<div className="max-w-8xl mx-auto px-0 py-8 sm:px-6 lg:px-8 markdown">
					<h1 className="text-3xl font-bold">{frontmatter.title}</h1>
				</div>
				<div className="max-w-8xl mx-auto px-0 py-8 sm:px-6 lg:px-8 markdown">
					{children}
				</div>
			</div>
		</Layout>
	);
});
