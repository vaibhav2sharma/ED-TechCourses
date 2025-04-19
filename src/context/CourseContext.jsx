import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CourseContext = createContext();

const DB_URL = 'https://ed-tech-66044-default-rtdb.firebaseio.com/courses';


export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${DB_URL}.json`);
      const data = res.data || {};
      const formatted = Object.values(data);
      setCourses(formatted);
    } catch (err) {
      setError('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const addCourse = async (newCourse) => {
    try {
      const res = await axios.post(`${DB_URL}.json`, newCourse);
      const added = { ...newCourse, id: res.data.name };
      setCourses((prev) => [...prev, added]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateCourse = async (id, updatedCourse) => {
    try {
      await axios.patch(`${DB_URL}/${id}.json`, updatedCourse);
      setCourses((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...updatedCourse } : c))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`${DB_URL}/${id}.json`);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <CourseContext.Provider
      value={{ courses, fetchCourses, addCourse, updateCourse, deleteCourse, loading, error }}
    >
      {children}
    </CourseContext.Provider>
  );
};

