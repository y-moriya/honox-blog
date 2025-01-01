import { format } from "date-fns";

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
	return (
		<div class="card bg-base-100 w-auto border shadow-sm h-full">
			<div class="card-body">
				<h2 class="card-title">
					<a href={url}>{title}</a>
				</h2>
				<p>
					{categories?.map((category) => (
						<span key={category} class="text-sm text-muted-foreground">
							<a href={`/categories/${category}`}>#{category}</a>
						</span>
					))}
				</p>
				<p>{description}</p>
				<p class="text-sm text-muted-foreground">{formattedDate}</p>
			</div>
		</div>
	);
}
