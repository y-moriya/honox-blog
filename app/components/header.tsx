import { useRequestContext } from "hono/jsx-renderer";

export function Header() {
	const c = useRequestContext();
	const pagePath = c.req.path;
	const pageName = pagePath.split("/").pop();
	const focused = (path: string) => (path === pageName ? "focus" : "");
	// TODO: ハンバーガーメニューにする
	return (
		<header class="navbar bg-base-100 border-b border-gray-300">
			<div class="flex-1">
				<h1 class="mx-4 scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
					<a href="/">群青日和</a>
				</h1>
			</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal px-1">
					<li>
						<a href="/" class={`font-bold ${focused("top")}`}>
							Top
						</a>
					</li>
					<li>
						<a href="/fixed/about" class={`font-bold ${focused("about")}`}>
							About
						</a>
					</li>
					<li>
						<a href="/categories" class={`font-bold ${focused("categories")}`}>
							Categories
						</a>
					</li>
					<li>
						<a
							href="/fixed/werewolf-archives"
							class={`font-bold ${focused("werewolf")}`}
						>
							Werewolf Archives
						</a>
					</li>
				</ul>
			</div>
		</header>
	);
}
