import { Footer } from "@/components/gunjo/Footer";
import { Header } from "@/components/gunjo/Header";
import { BASE_URL } from "@/constants";
import { reactRenderer } from "@hono/react-renderer";
import { useRequestContext } from "@hono/react-renderer";
import type { FC, PropsWithChildren } from "react";

const HasIslands: FC<PropsWithChildren> = ({ children }) => {
	const IMPORTING_ISLANDS_ID = "__importing_islands" as const;
	const c = useRequestContext();
	return <>{c.get(IMPORTING_ISLANDS_ID) ? children : <></>}</>;
};

const OgpTags: FC<PropsWithChildren> = ({ children }) => {
	const title = "群青日和";
	const description = "群青日和は、群青が好きな人のためのブログです。";
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

export default reactRenderer(({ children, title }) => {
	return (
		<html lang="ja">
			<head>
				<meta http-equiv="content-language" content="ja" />
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				{import.meta.env.PROD ? (
					<>
						<HasIslands>
							<script type="module" src="/static/client.js" />
						</HasIslands>
						<link href="/static/assets/global.css" rel="stylesheet" />
						<OgpTags />
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
