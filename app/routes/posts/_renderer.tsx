import { Footer } from "@/components/gunjo/Footer";
import { Header } from "@/components/gunjo/Header";
import { reactRenderer } from "@hono/react-renderer";

export default reactRenderer(({ children, Layout, title }) => {
	return (
		<Layout title={title}>
			<main className="max-w-4xl mx-auto">
				<Header />
				<div className="container mx-auto flex-1 px-0">
					<div className="max-w-8xl mx-auto px-0 py-8 sm:px-6 lg:px-8 markdown">
						{children}
					</div>
				</div>
				<Footer />
			</main>
		</Layout>
	);
});
