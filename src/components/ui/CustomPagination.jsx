import { cn } from "@/lib/utils";
import React from "react";
import ReactPaginate from "react-paginate";

const CustomPagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="pt-5 sm:pt-7 lg:pt-[34px] 2xl:pt-11">
      <ReactPaginate
        className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-gray-800"
        activeLinkClassName={cn("!bg-orange-500 text-white border-orange-500")}
        pageLinkClassName="border border-gray-200 rounded bg-white px-3 py-1.5"
        previousLinkClassName={cn(
          "px-3 py-1.5 rounded border bg-white border-gray-200",
          currentPage === 1 && "cursor-not-allowed opacity-70",
        )}
        nextLinkClassName={cn(
          "px-3 py-1.5 rounded border border-gray-200 bg-white",
          currentPage === totalPages && "cursor-not-allowed opacity-70",
        )}
        breakClassName="px-2 py-1"
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        pageCount={totalPages || 0}
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1}
      />
    </div>
  );
};

export default CustomPagination;
