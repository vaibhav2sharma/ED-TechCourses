import React from 'react';
import './Pagination.css';

const Pagination = ({ totalCourses, coursesPerPage, currentPage, setCurrentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalCourses / coursesPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex mt-2">
      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`button ${currentPage === num ? 'selected' : ''}`}
          onClick={() => setCurrentPage(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default Pagination;