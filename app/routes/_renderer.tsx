import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SITE_CONFIG } from "@/constants/config";
import { html } from "hono/html";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";

export default jsxRenderer(({ children, title, frontmatter }) => {
	const pageTitle = title
		? `${title} - ${SITE_CONFIG.title}`
		: SITE_CONFIG.title;
	const description = frontmatter?.description || SITE_CONFIG.description;
	const c = useRequestContext();
	const pagePath = c.req.path;
	// pagePathの最後のpathを取得
	const pageName = pagePath.split("/").pop();
	// pagePathにpostsが含まれる場合は記事ページのため、OGPを設定
	const isPostPage = pagePath.includes("posts");
	const image = isPostPage
		? `${SITE_CONFIG.baseUrl}/og/${pageName}.png`
		: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.defaultOgImage}`;

	return (
		<html lang="ja" data-theme="nord">
			<head>
				<meta httpEquiv="content-language" content="ja" />
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				{import.meta.env.PROD ? (
					<>
						<meta
							property="og:url"
							content={`${SITE_CONFIG.baseUrl}${pagePath}`}
						/>
						<meta property="og:image" content={image} />
						<meta property="twitter:image" content={image} />
						<script type="module" src="/static/client.js" />
						<link href="/static/assets/global.css" rel="stylesheet" />
						<GoogleAnalytics />
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
				<meta property="og:site_name" content={SITE_CONFIG.title} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@euro_s" />
				<meta name="twitter:title" content={pageTitle} />
				<meta name="twitter:description" content={description} />
				<title>{pageTitle}</title>
			</head>
			<body>
				<main class="max-w-4xl mx-auto">
					<Header />
					{children}
					<Footer />
				</main>
			</body>
		</html>
	);
});

const GoogleAnalytics = () => {
	return (
		<>
			<script
				async
				src="https://www.googletagmanager.com/gtag/js?id=G-N4XDQGX0C4"
			/>
			{html`
				<script>
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());

					gtag('config', 'G-N4XDQGX0C4');
				</script>
      `}
		</>
	);
};
