import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CourseContext } from '../context/CourseContext';
import '../app.css';

const CourseDetail = () => {
  const { id } = useParams();
  const { courses, fetchCourses } = useContext(CourseContext);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (courses.length === 0) {
      fetchCourses();
    }
  }, [courses, fetchCourses]);

  useEffect(() => {
    const found = courses.find(c => c.id === id);
    setCourse(found);
  }, [courses, id]);

  if (!course) {
    return <div className="course-detail"><p>Loading course details...</p></div>;
  }

  return (
    <div className="course-detail">
      <h2>{course.title}</h2>
      <p><strong>Price:</strong> ₹{course.price}</p>
      <p><strong>Tag:</strong> {course.tag}</p>
      <p><strong>Level:</strong> {course.level}</p>
      <p><strong>Instructor:</strong> {course.createdBy}</p>
      <div>
        <h4>Syllabus:</h4>
        <ul>
          {course.syllabus.map((topic, idx) => (
            <li key={idx}>{topic}</li>
          ))}
        </ul>
      </div>
      <Link to="/courses" className="back-link">← Back to Courses</Link>
    </div>
  );
};

export default CourseDetail;
