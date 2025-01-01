// TODO: 現在のページを示すスタイルを追加する
export function Header() {
	return (
		<header class="navbar bg-base-100">
			<div class="flex-1">
				<h1 class="m-4 scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
					<a href="/">群青日和</a>
				</h1>
			</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal px-1">
					<li>
						<a href="/blog" class="font-bold">
							Blog
						</a>
					</li>
					<li>
						<a href="/about" class="font-bold">
							About
						</a>
					</li>
					<li>
						<a href="/categories" class="font-bold">
							Categories
						</a>
					</li>
					<li>
						<a href="/werewolf" class="font-bold">
							Werewolf Archives
						</a>
					</li>
				</ul>
			</div>
		</header>
	);
}
