import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  onPageChange: (selectedPage: number) => void;
  pageCount: number;
  forcePage: number;
}

export default function Pagination({
  onPageChange,
  pageCount,
  forcePage,
}: PaginationProps) {
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
