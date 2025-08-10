"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useMovies } from "@/lib/store/useMovies";

export function PaginationComponent() {
  const { currentPage, totalPages, setCurrentPage } = useMovies();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (currentPage === 0) {
    return null;
  }

  if (currentPage === totalPages) {
    // Disable next button on last page
  }

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            className={` ${
              currentPage === 1 ? "hidden" : "cursor-pointer"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {currentPage - 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="cursor-not-allowed" isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(currentPage + 1)} className="cursor-pointer">{currentPage + 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => handlePageChange(currentPage + 1)} className="cursor-pointer"/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
