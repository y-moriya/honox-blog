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

const notifications = [
	{
		title: "Your call has been confirmed.",
		description: "1 hour ago",
	},
	{
		title: "You have a new message!",
		description: "1 hour ago",
	},
	{
		title: "Your subscription is expiring soon!",
		description: "2 hours ago",
	},
];

type CardProps = React.ComponentProps<typeof Card>;

export function PostCard({ className, ...props }: CardProps) {
	return (
		<Card className={cn("w-[380px]", className)} {...props}>
			<CardHeader>
				<CardTitle>Notifications</CardTitle>
				<CardDescription>You have 3 unread messages.</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div className=" flex items-center space-x-4 rounded-md border p-4">
					<BellRing />
					<div className="flex-1 space-y-1">
						<p className="text-sm font-medium leading-none">
							Push Notifications
						</p>
						<p className="text-sm text-muted-foreground">
							Send notifications to device.
						</p>
					</div>
				</div>
			</CardContent>
			<CardFooter>Footer</CardFooter>
		</Card>
	);
}
