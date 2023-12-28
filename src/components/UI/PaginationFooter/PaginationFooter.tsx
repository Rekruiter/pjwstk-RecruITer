import { cn } from '@/lib/utils';

interface PaginationFooterProps {
  totalPageNumber: number;
  currPage: number;
  callback: (pageNumber: number) => void;
}

const PaginationFooter = ({ totalPageNumber, currPage, callback }: PaginationFooterProps) => {
  const pages = totalPageNumber > 5 ? 5 : totalPageNumber;

  return (
    <div className="flex w-full justify-center p-2">
      {Array.from(
        {
          length: pages,
        },
        (_, i) => i + 1,
      ).map((pageNumber) => (
        <button
          key={pageNumber}
          disabled={pageNumber === currPage}
          onClick={() => callback(pageNumber)}
          className={cn(
            'aspect-square h-10 border p-2',
            pageNumber === currPage
              ? 'border-orange text-orange'
              : 'border-dark text-dark hover:border-none hover:bg-orange hover:text-light',
          )}>
          {pageNumber}
        </button>
      ))}
      {totalPageNumber > 5 && (
        <button
          disabled={totalPageNumber === currPage}
          onClick={() => callback(totalPageNumber)}
          className={cn(
            'aspect-square h-10 border p-2',
            totalPageNumber === currPage
              ? 'border-orange text-orange'
              : 'border-dark text-dark hover:border-none hover:bg-orange hover:text-light',
          )}>
          {totalPageNumber}
        </button>
      )}
    </div>
  );
};

export default PaginationFooter;
