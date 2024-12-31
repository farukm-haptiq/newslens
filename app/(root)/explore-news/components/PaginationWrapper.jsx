import { useRouter } from 'next/navigation';

import qs from 'query-string';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';

const PaginationWrapper = ({ currentPage, totalPages }) => {
  const router = useRouter();

  const handlePageChange = (page) => {
    const existingQuery = qs.parse(window.location.search);
    const query = { ...existingQuery, page };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  const PageButton = ({ page }) => (
    <Button
      variant={currentPage === page ? 'default' : 'outline'}
      size='icon'
      onClick={() => handlePageChange(page)}
      className={cn(
        'w-10 h-10 transition-all duration-200',
        currentPage === page &&
          'bg-primary text-primary-foreground hover:bg-primary/90'
      )}
    >
      {page}
    </Button>
  );

  const Ellipsis = () => (
    <Button variant='ghost' size='icon' className='w-10 h-10 cursor-default'>
      <MoreHorizontal className='w-4 h-4' />
    </Button>
  );

  const renderPageButtons = () => {
    const pageButtons = [];

    pageButtons.push(<PageButton key={1} page={1} />);

    if (currentPage > 3) {
      pageButtons.push(<Ellipsis key='ellipsis-1' />);
    }

    if (currentPage > 2) {
      pageButtons.push(
        <PageButton key={currentPage - 1} page={currentPage - 1} />
      );
    }

    if (currentPage !== 1 && currentPage !== totalPages) {
      pageButtons.push(<PageButton key={currentPage} page={currentPage} />);
    }

    if (currentPage < totalPages - 1) {
      pageButtons.push(
        <PageButton key={currentPage + 1} page={currentPage + 1} />
      );
    }

    if (currentPage < totalPages - 2) {
      pageButtons.push(<Ellipsis key='ellipsis-2' />);
    }

    if (totalPages > 1) {
      pageButtons.push(<PageButton key={totalPages} page={totalPages} />);
    }

    return pageButtons;
  };

  if (totalPages <= 1) return null;

  return (
    <div>
      <div
        className='my-10 flex justify-center items-center space-x-2 mt-8'
        aria-label='Pagination'
      >
        <Button
          variant='outline'
          size='icon'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='w-10 h-10'
        >
          <span className='sr-only'>Previous page</span>
          <ChevronLeft className='w-4 h-4' />
        </Button>

        {renderPageButtons()}

        <Button
          variant='outline'
          size='icon'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='w-10 h-10'
        >
          <span className='sr-only'>Next page</span>
          <ChevronRight className='w-4 h-4' />
        </Button>
      </div>
    </div>
  );
};

export default PaginationWrapper;
