import { getAllPosts, getPostById } from "@/lib/posts";
import { createRoute } from "honox/factory";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import type { Env } from "hono";
import { ssgParams } from "hono/ssg";

const param = ssgParams<Env>((c) => {
	const params: { slug: string }[] = [];
	const allPosts = getAllPosts();
	for (const post of allPosts) {
		params.push({ slug: post.id.replace("/posts/", "").replace(".mdx", "") });
	}
	return params;
});

export default createRoute(param, async (c) => {
	const slug = c.req.param("slug");
	if (slug === ":slug") {
		c.status(404);
		return c.text("Not Found");
	}

	const post = getPostById(slug);
	const titleLen = post?.frontmatter.title.length ?? 0;
	const splitedTitle = post?.frontmatter.title.split(" ");
	const notoSansBold = await loadGoogleFont({
		family: "Noto Sans JP",
		weight: 600,
	});

	const getTextSize = () => {
		if (titleLen > 35) {
			return 3.8;
		}
		if (titleLen > 20) {
			return 4;
		}
		return 4.8;
	};

	const svg = await satori(
		<div tw={"bg-blue-500 w-full h-full flex p-9"}>
			<div
				tw={
					"bg-blue-50 rounded-3xl border-solid w-full flex flex-col justify-end"
				}
			>
				<div tw={"flex w-full flex-1 items-center mt-10 px-34"}>
					<div tw={`flex justify-center  text-[${getTextSize()}rem] flex-wrap`}>
						{splitedTitle.map((s) => (
							<span key={s}>{s}</span>
						))}
					</div>
				</div>
				<div
					tw={
						"flex px-18 mb-10 items-center justify-between w-full text-[#444444]"
					}
				>
					<div tw="text-4xl flex items-center">
						<img
							alt="avatar"
							tw="rounded-full mr-4 w-18 h-18"
							src="https://0.gravatar.com/avatar/af76ccb150b6650affe4bb1f4b315df567ceb0a807aae400a38280a5a024d3ac?size=512"
						/>
						群青日和
					</div>
					<h1
						style={{
							fontWeight: 600,
							fontFamily: "Noto Sans JP",
						}}
					>
						gunjobiyori.com
					</h1>
				</div>
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "NotoSansJP",
					data: notoSansBold,
					weight: 600,
					style: "normal",
				},
			],
		},
	);

	const body = new Resvg(svg).render().asPng();
	const bodyArray = new Uint8Array(body);

	c.header("Content-Type", "image/png");
	return c.body(bodyArray.buffer);
});

function buildGoogleFontUrl({
	family,
	weight,
	text,
	display,
}: {
	family: string;
	weight?: number;
	text?: string;
	display?: string;
}) {
	const params: Record<string, string> = {
		family: `${encodeURIComponent(family)}${weight ? `:wght@${weight}` : ""}`,
	};

	if (text) {
		params.text = text;
	} else {
		params.subset = "latin";
	}

	if (display) {
		params.display = display;
	}

	return `https://fonts.googleapis.com/css2?${Object.keys(params)
		.map((key) => `${key}=${params[key]}`)
		.join("&")}`;
}

async function loadGoogleFont({
	family,
	weight,
	text,
}: {
	family: string;
	weight?: number;
	text?: string;
}) {
	const url = buildGoogleFontUrl({ family, weight, text });

	const css = await fetch(`${url}`, {
		headers: {
			"User-Agent":
				"Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
		},
	}).then((res) => res.text());

	const fontUrl = css.match(
		/src: url\((.+)\) format\('(opentype|truetype)'\)/,
	)?.[1];

	if (!fontUrl) {
		throw new Error("Could not find font URL");
	}

	const res = await fetch(fontUrl);
	const buffer = await res.arrayBuffer();
	return buffer;
}
