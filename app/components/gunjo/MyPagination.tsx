import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

interface MyPaginationProps {
	currentPage: number;
	totalPage: number;
}

export function MyPagination({ currentPage, totalPage }: MyPaginationProps) {
	const pages = [];

	for (let i = 1; i <= totalPage; i++) {
		pages.push(
			<PaginationItem key={i}>
				<PaginationLink href={`/page/${i}`} isActive={i === currentPage}>
					{i}
				</PaginationLink>
			</PaginationItem>,
		);
	}

	return (
		<Pagination>
			<PaginationContent>
				{currentPage > 1 && (
					<PaginationItem>
						<PaginationPrevious href={`/page/${currentPage - 1}`} />
					</PaginationItem>
				)}
				{pages}
				{currentPage < totalPage && (
					<PaginationItem>
						<PaginationNext href={`/page/${currentPage + 1}`} />
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
}
