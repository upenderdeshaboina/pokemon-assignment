interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const maxVisiblePages = 5;

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return pages;
    }
    const halfMax = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - halfMax, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }
    return pages.slice(start - 1, end);
  };

  return (
    <nav className="d-flex justify-content-center mt-4">
      <ul className="pagination pagination-lg">
        <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)} tabIndex={-1} aria-disabled={currentPage === 1}>
            Previous
          </button>
        </li>
        {getVisiblePages().map((page) => (
          <li key={page} className={`page-item${currentPage === page ? ' active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(page)}>{page}</button>
          </li>
        ))}
        <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)} tabIndex={-1} aria-disabled={currentPage === totalPages}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination; 