import React, { useState, useContext } from 'react';
import { CourseContext } from '../context/CourseContext';
import { useNavigate } from 'react-router-dom';
import '../app.css';

const NewCourse = () => {
  const { addCourse } = useContext(CourseContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('');
  const [level, setLevel] = useState('');
  const [syllabus, setSyllabus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !tag || !level || !syllabus) {
      setError('All fields are required!');
      return;
    }

    const newCourse = {
      title,
      price: parseFloat(price),
      tag,
      level,
      syllabus: syllabus.split(','),
      createdBy: 'instructor@example.com',
    };

    addCourse(newCourse);
    navigate('/dashboard');
  };

  return (
    <div className="new-course">
      <h2>Add New Course</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit} className="new-course-form">
        <label>Course Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Tag</label>
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />

        <label>Level</label>
        <input
          type="text"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />

        <label>Syllabus (comma-separated)</label>
        <input
          type="text"
          value={syllabus}
          onChange={(e) => setSyllabus(e.target.value)}
        />

        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default NewCourse;
