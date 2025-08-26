import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginateProps {
  onPageChange: (selectedPage: number) => void;
  pageCount: number;
  forcePage: number;
}

export default function Paginate({
  onPageChange,
  pageCount,
  forcePage,
}: PaginateProps) {
  return (
    <ReactPaginate
      nextLabel="→"
      onPageChange={({ selected }) => onPageChange(selected)}
      forcePage={forcePage}
      marginPagesDisplayed={1}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="←"
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
