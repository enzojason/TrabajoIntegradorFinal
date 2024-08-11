import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchSongs } from '../services/api';

const HomePage = () => {

  return (
    <div>
      <p>Bienvenido a Salta Music!</p>
      
    </div>
  );
};

export default HomePage;

/*

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Vienvenido a Salta Music!</p>
      <Link to="/songs">View Songs</Link>
    </div>
  );
};

export default HomePage;

*/


