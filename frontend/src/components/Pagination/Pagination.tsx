import React from 'react';
import { useAppSelector } from '../../store/hooks';

interface PaginationProps {
    currentPage: number;
    totalResults: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   totalResults,
                                                   pageSize,
                                                   onPageChange,
                                               }) => {
    const darkMode = useAppSelector((state) => state.news.darkMode);
    const totalPages = Math.ceil(totalResults / pageSize);

    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const showPages = 5;

        if (totalPages <= showPages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="flex flex-col items-center gap-4 mt-10 mb-8">
            <div className="flex items-center gap-2 flex-wrap justify-center">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-3 px-4 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none font-semibold disabled:opacity-40 disabled:cursor-not-allowed ${
                        darkMode
                            ? 'bg-slate-800 hover:bg-slate-700'
                            : 'bg-white hover:bg-gray-50'
                    }`}
                >
                    ◀
                </button>

                {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                        {page === '...' ? (
                            <span className={`px-3 py-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                ...
              </span>
                        ) : (
                            <button
                                onClick={() => onPageChange(page as number)}
                                className={`px-5 py-3 rounded-lg shadow-md transition-all duration-300 font-semibold min-w-[44px] ${
                                    currentPage === page
                                        ? 'bg-accent text-white scale-110 shadow-lg'
                                        : darkMode
                                            ? 'bg-slate-800 hover:bg-slate-700 hover:shadow-lg transform hover:-translate-y-0.5'
                                            : 'bg-white hover:bg-gray-50 hover:shadow-lg transform hover:-translate-y-0.5'
                                }`}
                            >
                                {page}
                            </button>
                        )}
                    </React.Fragment>
                ))}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-3 px-4 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none font-semibold disabled:opacity-40 disabled:cursor-not-allowed ${
                        darkMode
                            ? 'bg-slate-800 hover:bg-slate-700'
                            : 'bg-white hover:bg-gray-50'
                    }`}
                >
                    ▶
                </button>
            </div>

            <div className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Page <span className="text-accent font-bold">{currentPage}</span> of{' '}
                <span className={`font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {totalPages}
        </span>
            </div>
        </div>
    );
};

export default Pagination;
