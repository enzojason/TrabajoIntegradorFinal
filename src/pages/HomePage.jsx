import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchSongs } from '../services/api';

const HomePage = () => {
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    try {
      const data = await fetchSongs();
      const filteredResults = data.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.artist.toLowerCase().includes(query.toLowerCase()) ||
        item.genre.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    } catch (error) {
      console.error('Error fetching music:', error);
    }
  };

  return (
    <div>
      <p>Bienvenido a Salta Music!</p>
      <Link to="/songs">Ver Canciones</Link>
      
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


