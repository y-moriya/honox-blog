interface MyPaginationProps {
	currentPage: number;
	totalPage: number;
}

export function Pagination({ currentPage, totalPage }: MyPaginationProps) {
	const pages = [];

	for (let i = 1; i <= totalPage; i++) {
		const active = i === currentPage ? "btn-active" : "";
		pages.push(
			<a href={`/page/${i}`}>
				<button type="button" class={`join-item btn ${active}`}>
					{i}
				</button>
			</a>,
		);
	}

	return (
		<div class="join mt-8 mx-auto flex w-full justify-center">{pages}</div>
	);
}
