import { BellRing } from "lucide-react";

import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

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
	return (
		<Card className={cn("w-[380px]", className)} {...props}>
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
				<p className="text-sm text-muted-foreground">{date}</p>
			</CardFooter>
		</Card>
	);
}
