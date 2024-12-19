import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import qs from 'query-string';

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

  const addPageButton = (page) => {
    return (
      <button
        key={page}
        className={cn(
          'px-4 py-2 rounded-md',
          currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-300'
        )}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    // Add the first page button
    pageButtons.push(addPageButton(1));
    // Add the dots before the current page if there are more than 3 pages
    if (currentPage > 3) {
      pageButtons.push(
        <span className='page-btn dots' key='dots-1'>
          ....
        </span>
      );
    }
    // one before current page
    if (currentPage > 2) {
      pageButtons.push(addPageButton(currentPage - 1));
    }

    // Add the current page button
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageButtons.push(addPageButton(currentPage));
    }

    // one after current page
    if (currentPage !== totalPages && currentPage !== totalPages - 1) {
      pageButtons.push(addPageButton(currentPage + 1));
    }
    if (currentPage < totalPages - 2) {
      pageButtons.push(
        <span className=' page-btn dots' key='dots+1'>
          ....
        </span>
      );
    }

    // Add the last page button
    pageButtons.push(addPageButton(totalPages));

    return pageButtons;
  };

  return (
    <div className=''>
      {totalPages > 1 && currentPage <= totalPages && (
        <div className='flex justify-center space-x-3'>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 text-white'
            }`}
          >
            Previous
          </button>

          {renderPageButtons()}

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 text-white'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginationWrapper;
