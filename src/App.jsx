import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Dashboard from './pages/Dashboard';
import NewCourse from './pages/NewCourse';
import EditCourse from './pages/EditCourse';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CourseProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/new"
              element={
                <ProtectedRoute>
                  <NewCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/edit/:id"
              element={
                <ProtectedRoute>
                  <EditCourse />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </CourseProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
