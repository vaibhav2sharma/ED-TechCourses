import React from 'react';
import { Link } from 'react-router-dom';
import '../app.css';

const Landing = () => {
  return (
    <div className="landing">
      <div className="hero-banner">
        <h1>Welcome to EduLite</h1>
        <p>Your gateway to fast, focused learning.</p>
        <Link to="/courses" className="cta-button">Browse Courses</Link>
      </div>
    </div>
  );
};

export default Landing;
