type CategoryProps = {
	viewTransitionStyleCategory: string;
	categories: string[];
};

export function Category({
	viewTransitionStyleCategory,
	categories,
}: CategoryProps) {
	return (
		<p>
			{categories?.map((category) => (
				<span key={category} class="text-sm text-muted-foreground">
					<a
						href={`/categories/${category}`}
						style={`${viewTransitionStyleCategory}-${category}`}
						class="mr-2"
					>
						#{category}
					</a>
				</span>
			))}
		</p>
	);
}
