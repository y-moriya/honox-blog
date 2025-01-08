import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BASE_URL, BLOG_TITLE } from "@/constants";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import { Script } from "honox/server";

export default jsxRenderer(({ children, title, frontmatter }) => {
	const pageTitle = title ? `${title} - ${BLOG_TITLE}` : BLOG_TITLE;
	const description = frontmatter?.description || "事なかれ主義";
	const c = useRequestContext();
	const pagePath = c.req.path;
	// pagePathの最後のpathを取得
	const pageName = pagePath.split("/").pop();
	// pagePathにpostsが含まれる場合は記事ページのため、OGPを設定
	const isPostPage = pagePath.includes("posts");
	const image = isPostPage
		? `${BASE_URL}/og/${pageName}.png`
		: `${BASE_URL}/static/hero.jpg`;

	return (
		<html lang="ja">
			<head>
				<meta httpEquiv="content-language" content="ja" />
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				{import.meta.env.PROD ? (
					<>
						<meta property="og:url" content={`${BASE_URL}${pagePath}`} />
						<meta property="og:image" content={image} />
						<meta property="twitter:image" content={image} />
						<Script src="/static/client.js" async />
						<link href="/static/assets/global.css" rel="stylesheet" />
					</>
				) : (
					<>
						<script type="module" src="/app/client.ts" />
						<link href="/app/global.css" rel="stylesheet" />
					</>
				)}
				<meta property="og:type" content="article" />
				<meta property="og:title" content={pageTitle} />
				<meta property="og:description" content={description} />
				<meta property="og:site_name" content={BLOG_TITLE} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@euro_s" />
				<meta name="twitter:title" content={pageTitle} />
				<meta name="twitter:description" content={description} />
				<title>{pageTitle}</title>
			</head>
			<body>
				<main className="max-w-4xl mx-auto">
					<Header />
					{children}
					<Footer />
				</main>
			</body>
		</html>
	);
});
