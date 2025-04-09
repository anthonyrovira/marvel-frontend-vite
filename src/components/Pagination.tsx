import ReactPaginate from "react-paginate";

interface PaginationProps {
  count: number;
  handleSkip: (
    e: {
      selected: number;
    },
    limit: number
  ) => void;
  limit: number;
}

const Pagination = ({ count, limit, handleSkip }: PaginationProps) => {
  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      pageCount={count}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={(e) => handleSkip(e, limit)}
      breakClassName={"break-me"}
      containerClassName={"pagination"}
      nextLinkClassName={"next-page"}
      previousLinkClassName={"prev-page"}
      activeClassName={"activePage"}
    />
  );
};

export default Pagination;
