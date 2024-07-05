import React from 'react';
import usePagination from '../../hook/usePagination';

const Pagination = ({ currentPage, totalCount, pageSize, onPageChange, siblingCount = 1 }) => {
    const paginationRange = usePagination(currentPage, totalCount, siblingCount, pageSize);

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <div className="flex items-center justify-end text-primary">
            <div
                onClick={onPrevious}
                className={`px-5 py-3 border border-primary cursor-pointer hover:bg-hprimary hover:text-white ${
                    currentPage === 1 && 'disabled'
                }`}
            >
                Prev
            </div>
            {paginationRange.map((pageNumber) => {
                if (pageNumber === '...') {
                    return <div className="pagination-item dots">&#8230;</div>;
                }

                return (
                    <div
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                        className={`px-5 py-3 border border-primary cursor-pointer hover:bg-hprimary hover:text-white ${
                            pageNumber === currentPage && 'bg-primary text-white'
                        }`}
                    >
                        {pageNumber}
                    </div>
                );
            })}
            <div
                onClick={onNext}
                className={`px-5 py-3 border border-primary cursor-pointer hover:bg-hprimary hover:text-white ${
                    currentPage === lastPage && 'disabled'
                }`}
            >
                Next
            </div>
        </div>
    );
};

export default Pagination;
