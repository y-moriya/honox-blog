import { format } from "date-fns";
import { Category } from "./Category";

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
	const formattedDate = format(new Date(date), "yyyy/MM/dd");
	const viewTransitionUrl = url.split("/").pop();
	const viewTransitionStyleTitle = `view-transition-name:title-${viewTransitionUrl}`;
	const viewTransitionStyleDescription = `view-transition-name:description-${viewTransitionUrl}`;
	const viewTransitionStyleCategory = `view-transition-name:category-${viewTransitionUrl}`;

	return (
		<div class="card bg-base-100 w-auto border shadow-sm h-full">
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
				<p class="text-sm text-muted-foreground">{formattedDate}</p>
			</div>
		</div>
	);
}
