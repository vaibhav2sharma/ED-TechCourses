import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = ({ course, showActions = false, onEdit, onDelete }) => {
  return (
    <div className="card">
      <h3>{course.title}</h3>
      <p><strong>Tag:</strong> {course.tag}</p>
      <p><strong>Level:</strong> {course.level}</p>
      <p><strong>Price:</strong> ₹{course.price}</p>
      <Link to={`/courses/${course.id}`} className="button mt-2">View Details</Link>

      {showActions && (
        <div className="flex mt-2">
          <button className="button" onClick={() => onEdit(course.id)}>Edit</button>
          <button className="button" style={{ backgroundColor: '#dc3545' }} onClick={() => onDelete(course.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};
export default CourseCard;