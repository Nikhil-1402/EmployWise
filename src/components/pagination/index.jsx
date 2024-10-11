import React, { useState } from 'react';

const Pagination = ({ totalPages, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const changePage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        onPageChange(page);
    };

    return (
        <div className="flex items-center justify-center my-4 mt-auto">
            <nav aria-label="Pagination">
                <ul className="flex space-x-2">
                    <li>
                        <button 
                            onClick={() => changePage(currentPage - 1)} 
                            className={`px-3 py-1 text-black bg-white font-medium rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} 
                            disabled={currentPage === 1}
                        >
                            &laquo; Previous
                        </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        return (
                            <li key={page}>
                                <button
                                    onClick={() => changePage(page)}
                                    className={`px-3 py-1 font-medium rounded ${currentPage === page ? 'bg-gray-800 text-white' : 'bg-white'}`}
                                >
                                    {page}
                                </button>
                            </li>
                        );
                    })}
                    <li>
                        <button 
                            onClick={() => changePage(currentPage + 1)} 
                            className={`px-3 py-1 text-black bg-white font-medium rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`} 
                            disabled={currentPage === totalPages}
                        >
                            Next &raquo;
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export {Pagination};
