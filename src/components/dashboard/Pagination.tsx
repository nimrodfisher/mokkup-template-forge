import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 7; // Show max 7 page numbers
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-1 mt-8">
      {visiblePages.map((page, index) => {
        if (page === '...') {
          return (
            <span key={index} className="px-3 py-2 text-gray-400">
              ...
            </span>
          );
        }
        
        const pageNum = page as number;
        const isActive = pageNum === currentPage;
        
        return (
          <Button
            key={pageNum}
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(pageNum)}
            className={cn(
              "w-10 h-10 p-0 text-sm font-medium",
              isActive 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {pageNum}
          </Button>
        );
      })}
    </div>
  );
}