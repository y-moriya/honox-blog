import { useState } from "hono/jsx";

interface MenuProps {
	pageName: string;
}

export function Menu({ pageName }: MenuProps) {
	const focused = (path: string) => (path === pageName ? "focus" : "");
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<div class="flex-none lg:hidden">
				<button
					type="button"
					class="btn btn-square btn-ghost"
					onClick={toggleMenu}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<title>Menu Icon</title>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16m-7 6h7"
						/>
					</svg>
				</button>
			</div>
			<div
				class={`flex-none ${isOpen ? "block absolute top-12 left-0 w-full bg-base-100 shadow-md z-50" : "hidden"} lg:block`}
			>
				<ul class={`menu ${isOpen ? "menu-vertical" : "menu-horizontal"} px-1`}>
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
							class={`font-bold ${focused("werewolf-archives")}`}
						>
							Werewolf Archives
						</a>
					</li>
					<li>
						<a href="/rss.xml" class={`font-bold ${focused("rss.xml")}`}>
							RSS
						</a>
					</li>
				</ul>
			</div>
		</>
	);
}
