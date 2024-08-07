import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import SearchBar from '../components/Music/SearchBar';
//import SearchResults from '../components/Music/SearchResults';
import { fetchSongs } from '../services/api';
import Buscar from '../components/Music/Buscar'

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
      
      <p>Vienvenido a Salta Music!</p>
      <Link to="/songs">Ver Canciones</Link>

      <Link to="/buscar">Buscar Canciones</Link>
      <Buscar onSearch={handleSearch} />

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
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={results} />
    </div>
  );
};

export default HomePage;

*/


