interface MyPaginationProps {
  currentPage: number;
  totalPage: number;
}

export function Pagination({ currentPage, totalPage }: MyPaginationProps) {
  const pages = [];

  for (let i = 1; i <= totalPage; i++) {
    const active = i === currentPage ? "btn-active" : "";
    pages.push(
      <a key={i} href={`/page/${i}`} class={`join-item btn ${active}`}>
        {i}
      </a>,
    );
  }

  return (
    <nav aria-label="Pagination" class="join mt-8 mx-auto flex w-full justify-center">
      {pages}
    </nav>
  );
}
