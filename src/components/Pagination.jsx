// ===========================================
// #00119
// ===========================================

import React from 'react';
import ReactPaginate from 'react-paginate';

export default function Pagination({ itemsPerPage, totalItems, setPageNo }) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };

  return (
    <>
      <ReactPaginate
        className={`btn-group shadow-lg`}
        pageLinkClassName={`btn rounded-none bg-base-100 text-secondary hover:bg-info border-white border-2 hover:border-info`}
        disabledClassName={`btn btn-disabled bg-neutral  border-white border-2 `}
        breakClassName={`btn btn-disabled bg-secondary border-secondary border-2`}
        activeLinkClassName={`btn text-white bg-secondary border-white border-2`}
        previousClassName={`btn bg-secondary hover:bg-base-100 w-0 text-white border-secondary border-2 hover:border-secondary hover:text-secondary`}
        nextClassName={`btn bg-secondary hover:bg-base-100 w-0 text-white border-secondary border-2 hover:border-secondary hover:text-secondary`}
        breakLabel={pageCount > 2 ? '...' : ''}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        previousLabel="<"
        nextLabel=">"
        pageCount={pageCount}
        renderOnZeroPageCount={null}
      />
    </>
  );
}
