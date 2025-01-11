import { format } from "date-fns";
import { Category } from "./category";
import { SITE_CONFIG } from "@/constants/config";

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
	const viewTransitionStyleTitle = `view-transition-name:title-${viewTransitionUrl}`;
	const viewTransitionStyleDescription = `view-transition-name:description-${viewTransitionUrl}`;
	const viewTransitionStyleCategory = `view-transition-name:category-${viewTransitionUrl}`;
	const viewTransitionStyleDate = `view-transition-name:date-${viewTransitionUrl}`;

	return (
		<div class="card bg-base-100 w-auto border border-gray-700 shadow-sm h-full">
			<div class="card-body">
				<h2 class="card-title">
					<a href={url} style={viewTransitionStyleTitle}>
						{title}
					</a>
				</h2>
				<Category
					viewTransitionStyleCategory={viewTransitionStyleCategory}
					categories={categories ?? []}
				/>
				<p style={viewTransitionStyleDescription}>{description}</p>
				<p class="text-sm text-gray-500" style={viewTransitionStyleDate}>
					{formattedDate}
				</p>
			</div>
		</div>
	);
}
