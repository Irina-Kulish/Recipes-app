interface PaginationProps {
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / 10);

  const handleClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageButton = (page: number) => (
    <button
      key={page}
      onClick={() => handleClick(page)}
      className={`px-3 py-1 rounded ${currentPage === page ? 'border border-blue-500 font-bold' : ''}`}
    >
      {page}
    </button>
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageButton(i));
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, currentPage + 2);

      if (start > 1) {
        pageNumbers.push(renderPageButton(1));
        if (start > 2) pageNumbers.push(<span key="dots-start" className="px-3">…</span>);
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(renderPageButton(i));
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pageNumbers.push(<span key="dots-end" className="px-3">…</span>);
        pageNumbers.push(renderPageButton(totalPages));
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        className={`px-3 py-1 rounded border ${currentPage === 1 ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 'border-blue-500 text-blue-500'}`}
      >
        «
      </button>
      
      <div className="flex space-x-2">
        {renderPageNumbers()}
      </div>
      
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
        className={`px-3 py-1 rounded border ${currentPage === totalPages ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 'border-blue-500 text-blue-500'}`}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
