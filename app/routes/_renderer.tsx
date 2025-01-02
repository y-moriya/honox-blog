import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BASE_URL } from "@/constants";
import { jsxRenderer } from "hono/jsx-renderer";
import { Script } from "honox/server";

// TODO: 各ページのOGP設定を追加する
const OgTags = () => {
	const title = "群青日和";
	const description = "事なかれ主義";
	const image = `${BASE_URL}/static/hero.jpg`;
	return (
		<>
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />
			<meta name="twitter:card" content="summary_large_image" />
		</>
	);
};

export default jsxRenderer(({ children, title }) => {
	return (
		<html lang="ja">
			<head>
				<meta httpEquiv="content-language" content="ja" />
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				{import.meta.env.PROD ? (
					<>
						<Script src="/static/client.js" async />
						<link href="/static/assets/global.css" rel="stylesheet" />
						<OgTags />
					</>
				) : (
					<>
						<script type="module" src="/app/client.ts" />
						<link href="/app/global.css" rel="stylesheet" />
					</>
				)}
				{title ? <title>{title}</title> : ""}
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
