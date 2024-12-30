import {
	Link,
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";

// TODO: 現在のページを示すスタイルを追加する
export function Header() {
	return (
		<header>
			<div className="flex items-center justify-between">
				<h1 className="m-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
					<a href="/">群青日和</a>
				</h1>
				<NavigationMenu>
					<NavigationMenuList className="flex space-x-4">
						<NavigationMenuItem>
							<NavigationMenuLink>
								<a href="/blog" className={navigationMenuTriggerStyle()}>
									Blog
								</a>
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink>
								<a href="/about" className={navigationMenuTriggerStyle()}>
									About
								</a>
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink>
								<a href="/werewolf" className={navigationMenuTriggerStyle()}>
									Werwolf Archives
								</a>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</header>
	);
}
