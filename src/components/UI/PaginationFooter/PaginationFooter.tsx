import { cn } from '@/lib/utils';

interface PaginationFooterProps {
  totalPageNumber: number;
  currPage: number;
  callback: (pageNumber: number) => void;
  classNameHeight?: number;
}

const PaginationFooter = ({
  totalPageNumber: totalPages,
  currPage,
  callback,
  classNameHeight = 10,
}: PaginationFooterProps) => {
  const totalPageNumber = totalPages === 0 ? 1 : totalPages;

  const startPage =
    currPage - 4 < 1
      ? 2
      : currPage > totalPageNumber - 4
      ? totalPageNumber - 4 < 2
        ? 2
        : totalPageNumber - 4
      : currPage - 1;

  const endPage =
    currPage + 4 > totalPageNumber
      ? totalPageNumber - 1
      : currPage < 5
      ? 5 > totalPageNumber - 1
        ? totalPageNumber - 1
        : 5
      : currPage + 1;

  return (
    <div className="flex w-full justify-center gap-2 p-2">
      <button
        key={1}
        disabled={1 === currPage}
        onClick={() => callback(1)}
        className={cn(
          `aspect-square h-${classNameHeight} border`,
          1 === currPage
            ? 'border-orange text-orange'
            : 'border-dark text-dark hover:border-none hover:bg-orange hover:text-light',
        )}>
        {1}
      </button>
      {startPage !== 2 && <p className="place-self-end">...</p>}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNumber) => (
        <button
          key={pageNumber}
          disabled={pageNumber === currPage}
          onClick={() => callback(pageNumber)}
          className={cn(
            `aspect-square h-${classNameHeight} border`,
            pageNumber === currPage
              ? 'border-orange text-orange'
              : 'border-dark text-dark hover:border-none hover:bg-orange hover:text-light',
          )}>
          {pageNumber}
        </button>
      ))}
      {endPage !== totalPageNumber - 1 && <p className="place-self-end">...</p>}
      {totalPageNumber !== 1 && (
        <button
          disabled={totalPageNumber === currPage}
          onClick={() => callback(totalPageNumber)}
          className={cn(
            `aspect-square h-${classNameHeight} border p-2`,
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
