import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between border-t border-slate-800 bg-[#0B1120] px-6 py-3">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 text-slate-400 hover:text-slate-100 disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      <div className="text-sm text-slate-400">
        Page {currentPage} of {totalPages}
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 text-slate-400 hover:text-slate-100 disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
