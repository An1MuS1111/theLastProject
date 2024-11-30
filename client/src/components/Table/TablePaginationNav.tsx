import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

interface PaginationNavProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function TablePaginationNav({
  currentPage,
  totalPages,
  basePath,
}: PaginationNavProps) {
  return (
    <nav className=" left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-3 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Previous Button */}
        <Link
          to={
            currentPage < totalPages
              ? `${basePath}/${currentPage + 1}`
              : `${basePath}/${totalPages}`
          }
          className={`inline-flex items-center justify-center gap-2.5 rounded-md bg-black py-2 px-5 text-center font-medium dark:text-grey-900 hover:bg-opacity-90 lg:px-8 xl:px-10 ${
            currentPage === totalPages ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <span>
            <ChevronLeftIcon className="w-5 h-5" />
          </span>
          Previous
        </Link>

        {/* Page Info */}
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </div>

        {/* Next Button */}
        <Link
          to={
            currentPage < totalPages
              ? `${basePath}/${currentPage + 1}`
              : `${basePath}/${totalPages}`
          }
          className={`inline-flex items-center justify-center gap-2.5 rounded-md bg-black py-2 px-5 text-center font-medium dark:text-grey-900 hover:bg-opacity-90 lg:px-8 xl:px-10 ${
            currentPage === 1 ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Next
          <span>
            <ChevronRightIcon className="w-5 h-5" />
          </span>
        </Link>
      </div>
    </nav>
  );
}
