import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";

type CardProps = React.ComponentProps<typeof Card> & {
	title: string;
	description: string;
	date: string;
	url: string;
	categories?: string[];
};

export function PostCard({
	className,
	title,
	description,
	date,
	url,
	categories,
	...props
}: CardProps) {
	const formattedDate = format(new Date(date), "yyyy/MM/dd");
	// TODO: categoriesをリンクにする
	return (
		<Card {...props} className={className}>
			<CardHeader>
				<CardTitle>
					<a href={url}>{title}</a>
				</CardTitle>
				<CardDescription>
					{categories?.map((category) => (
						<span key={category} className="text-sm text-muted-foreground">
							{category}
						</span>
					))}
				</CardDescription>
			</CardHeader>
			<CardContent>{description}</CardContent>
			<CardFooter>
				<p className="text-sm text-muted-foreground">{formattedDate}</p>
			</CardFooter>
		</Card>
	);
}
