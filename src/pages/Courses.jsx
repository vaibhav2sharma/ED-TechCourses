import React, { useContext, useState, useEffect } from 'react';
import { CourseContext } from '../context/CourseContext';
import { Link } from 'react-router-dom';
import '../app.css';

const Courses = () => {
  const { courses, fetchCourses } = useContext(CourseContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = courses
    .filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedTag || course.tag === selectedTag)
    )
    .sort((a, b) => {
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      if (sortBy === 'title-desc') return b.title.localeCompare(a.title);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  const paginatedCourses = filteredCourses.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(filteredCourses.length / pageSize);

  const uniqueTags = [...new Set(courses.map(course => course.tag))];

  return (
    <div className="courses-page">
      <h2>Available Courses</h2>
      
      <div className="controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="">Sort</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="price-asc">Price Low-High</option>
          <option value="price-desc">Price High-Low</option>
        </select>
      </div>

      <div className="tag-filters">
        {uniqueTags.map(tag => (
          <button
            key={tag}
            className={`tag-pill ${selectedTag === tag ? 'active' : ''}`}
            onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="course-grid">
        {paginatedCourses.length > 0 ? paginatedCourses.map(course => (
          <div key={course.id} className="course-card">
            <h3>{course.title}</h3>
            <p><strong>Price:</strong> ₹{course.price}</p>
            <p><strong>Tag:</strong> {course.tag}</p>
            <p><strong>Level:</strong> {course.level}</p>
            <Link to={`/courses/${course.id}`} className="detail-link">View Details</Link>
          </div>
        )) : (
          <p>No courses found.</p>
        )}
      </div>

      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Courses;
