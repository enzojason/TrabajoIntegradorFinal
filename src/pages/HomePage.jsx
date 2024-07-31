import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Music Application!</p>
      
      <Link to="/songs">View Songs</Link>
    </div>
  );
};

export default HomePage;