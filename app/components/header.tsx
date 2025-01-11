import { Menu } from "@/islands/menu";
import { useRequestContext } from "hono/jsx-renderer";

export function Header() {
	const c = useRequestContext();
	const pagePath = c.req.path;
	const pageName = pagePath.split("/").pop() ?? "";
	return (
		<header class="navbar bg-base-100 border-b border-gray-300">
			<div class="flex-1">
				<h1 class="mx-4 scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
					<a href="/">群青日和</a>
				</h1>
			</div>
			<Menu pageName={pageName} />
		</header>
	);
}
