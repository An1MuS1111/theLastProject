import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

interface PaginationNavProps {
  currentPage: number;
  totalPages: number;
  basePath: string; // Base path for the routes, e.g., "/products?page="
}

export default function TablePaginationNav({
  currentPage,
  totalPages,
  basePath,
}: PaginationNavProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex items-center justify-between text-sm py-3 left-0 right-0 border-t border-gray-200 dark:border-gray-700">
      {/* Show Dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-gray-500">Show</span>
        <select
          className="w-16 bg-gray-800 border border-gray-800 text-white rounded px-2 py-2 border-r-8"
          defaultValue="5"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <span className="text-gray-500">per page</span>
      </div>
      <div className="flex items-center gap-4 text-gray-500">
        <span>1-5 of 9</span>
        <div className="flex gap-1">
          {/* <!-- Previous Button (disabled) --> */}
          <Link
            to={`${basePath}${currentPage - 1}`}
            className={`h-8 w-8 flex items-center justify-center rounded ${
              isFirstPage
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
            aria-disabled={isFirstPage}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Link>

          {/* <!-- Next Button --> */}

          <Link
            to={`${basePath}${currentPage + 1}`}
            className={`h-8 w-8 flex items-center justify-center rounded ${
              isLastPage
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
            aria-disabled={isLastPage}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
