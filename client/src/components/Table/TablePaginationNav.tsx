import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

interface PaginationNavProps {
  currentPage: number; // Current active page
  totalPages: number; // Total pages
  pageSize: number; // Number of items per page
  totalItems: number; // Total number of items
  onPageChange: (page: number) => void; // Handler for page change
  onPageSizeChange: (size: number) => void; // Handler for page size change
}

export default function TablePaginationNav({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: PaginationNavProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  return (
    <div className="flex items-center justify-between text-sm py-3 left-0 right-0 border-t border-gray-200 dark:border-gray-700">
      {/* Show Dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-gray-500">Show</span>
        <select
          className="w-16 bg-gray-800 border border-gray-800 text-white rounded px-2 py-2 border-r-8"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <span className="text-gray-500">per page</span>
      </div>
      <div className="flex items-center gap-4 text-gray-500">
        {/* Pagination Info */}
        <span>
          {startItem}-{endItem} of {totalItems}
        </span>
        <div className="flex gap-1">
          {/* <!-- Previous Button (disabled) --> */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={isFirstPage}
            className={`h-8 w-8 flex items-center justify-center rounded ${
              isFirstPage
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
            aria-disabled={isFirstPage}
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>

          {/* <!-- Next Button --> */}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={isLastPage}
            className={`h-8 w-8 flex items-center justify-center rounded ${
              isLastPage
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
            aria-disabled={isLastPage}
          >
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
