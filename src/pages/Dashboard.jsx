import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CourseContext } from '../context/CourseContext';
import '../app.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { courses, deleteCourse } = useContext(CourseContext);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourse(id);
    }
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {user ? user.email : 'Guest'}</h2>
      <button className="logout-btn" onClick={logout}>Logout</button>

      <h3>Your Courses</h3>
      <Link to="/dashboard/new" className="new-course-btn">+ Add New Course</Link>

      <div className="course-list">
        {courses.length > 0 ? courses.map(course => (
          <div key={course.id} className="course-card">
            <h4>{course.title}</h4>
            <p><strong>Price:</strong> ₹{course.price}</p>
            <div>
              <Link to={`/dashboard/edit/${course.id}`} className="edit-btn">Edit</Link>
              <button onClick={() => handleDelete(course.id)} className="delete-btn">Delete</button>
            </div>
          </div>
        )) : (
          <p>No courses available. Start by adding one!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
