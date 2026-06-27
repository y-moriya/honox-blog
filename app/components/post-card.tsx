import { format } from "date-fns";
import { Category } from "./category";
import { SITE_CONFIG } from "@/constants/config";
import { getViewTransitionStyles } from "@/lib/utils";

type CardProps = {
	title: string;
	description: string;
	date: string;
	url: string;
	categories?: string[];
};

export function PostCard({
	title,
	description,
	date,
	url,
	categories,
}: CardProps) {
	const formattedDate = format(new Date(date), SITE_CONFIG.dateFormat);
	const viewTransitionUrl = url.split("/").pop();
	const vtStyles = getViewTransitionStyles(viewTransitionUrl);

	return (
		<div class="card bg-base-100 w-auto border border-gray-700 shadow-sm h-full">
			<div class="card-body">
				<h2 class="card-title">
					<a href={url} style={vtStyles.title}>
						{title}
					</a>
				</h2>
				<Category
					viewTransitionStyleCategory={vtStyles.category}
					categories={categories ?? []}
				/>
				<p style={vtStyles.description}>{description}</p>
				<p class="text-sm text-gray-500" style={vtStyles.date}>
					{formattedDate}
				</p>
			</div>
		</div>
	);
}
