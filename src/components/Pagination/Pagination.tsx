import React, { useMemo } from 'react';
import { clsx } from 'clsx';
import './Pagination.css';

export interface PaginationProps {
  /**
   * The current active page (1-based index).
   */
  currentPage: number;
  /**
   * total number of pages.
   */
  totalPages: number;
  /**
   * Callback when a page number is clicked.
   */
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {

  const paginationRange = useMemo(() => {
    // Basic rules:
    // 1. Always show first and last page.
    // 2. Show current page and neighbors (1 on each side).
    // 3. Use '...' (null in our array) for gaps.
    
    // Safety check
    if (totalPages <= 1) return [1];

    const range: (number | null)[] = [];
    const siblingCount = 1;

    // Logic to calculate range
    // Start page of the "window" around current
    let startPage = Math.max(2, currentPage - siblingCount);
    // End page of the "window" around current
    let endPage = Math.min(totalPages - 1, currentPage + siblingCount);

    // Adjust if near start
    if (currentPage <= siblingCount + 2) { 
       startPage = 2;
       endPage = Math.min(totalPages - 1, 5); // Show first 5 pages if near start
    }

    // Adjust if near end
    if (currentPage >= totalPages - (siblingCount + 1)) {
        startPage = Math.max(2, totalPages - 4); // Show last 5 pages if near end
        endPage = totalPages - 1;
    }

    // Always add first page
    range.push(1);

    // Add dots before if needed
    if (startPage > 2) {
      range.push(null);
    }

    // Add middle block
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    // Add dots after if needed
    if (endPage < totalPages - 1) {
      range.push(null);
    }

    // Always add last page if total > 1
    if (totalPages > 1) {
        range.push(totalPages);
    }

    return range;
  }, [currentPage, totalPages]);

  // Handler for previous/next arrows
  const onNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  if (totalPages === 0) return null;

  return (
    <div className={clsx("pagination-container", className)}>
      {/* Left Arrow */}
      <button
        className="pagination-button"
        onClick={onPrevious}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
         <svg className="pagination-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
         </svg>
      </button>

      {/* Page Numbers */}
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === null) {
          return (
            <span key={`dots-${index}`} className="pagination-ellipsis">
               ...
            </span>
          );
        }

        return (
          <button
            key={pageNumber}
            className={clsx("pagination-button", {
              active: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Right Arrow */}
      <button
        className="pagination-button"
        onClick={onNext}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        <svg className="pagination-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
         </svg>
      </button>
    </div>
  );
};
