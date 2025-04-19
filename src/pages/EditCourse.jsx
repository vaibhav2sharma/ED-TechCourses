import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CourseContext } from '../context/CourseContext';
import '../app.css';

const EditCourse = () => {
  const { id } = useParams();
  const { courses, updateCourse } = useContext(CourseContext);
  const navigate = useNavigate();

  const course = courses.find((course) => course.id === id);
  
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('');
  const [level, setLevel] = useState('');
  const [syllabus, setSyllabus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setPrice(course.price);
      setTag(course.tag);
      setLevel(course.level);
      setSyllabus(course.syllabus.join(','));
    }
  }, [course]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !tag || !level || !syllabus) {
      setError('All fields are required!');
      return;
    }

    const updatedCourse = {
      id,
      title,
      price: parseFloat(price),
      tag,
      level,
      syllabus: syllabus.split(','),
      createdBy: course.createdBy,
    };

    updateCourse(updatedCourse);
    navigate('/dashboard');
  };

  if (!course) {
    return <p>Course not found.</p>;
  }

  return (
    <div className="edit-course">
      <h2>Edit Course</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit} className="edit-course-form">
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

        <button type="submit">Update Course</button>
      </form>
    </div>
  );
};

export default EditCourse;
