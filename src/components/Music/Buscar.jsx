import React, { useState, useEffect } from 'react';
import { fetchSongs, fetchGenres, fetchArtists } from '../../services/api';
import SongCard from '../Songs/SongCard';

const SongSearch = () => {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false); // Nuevo estado

  useEffect(() => {
    const loadData = async () => {
      const songData = await fetchSongs();
      setSongs(songData.results);
      
      const genreData = await fetchGenres();
      setGenres(genreData.results);
      
      const artistData = await fetchArtists();
      setArtists(artistData.results);
    };

    loadData();
  }, []);

  const handleGenreChange = (e) => {
    setSelectedGenre(parseInt(e.target.value));
  };

  const handleArtistChange = (e) => {
    setSelectedArtist(parseInt(e.target.value));
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSearch = () => {
    let filtered = songs;

    if (selectedGenre) {
      filtered = filtered.filter(song => song.genres.includes(selectedGenre));
    }

    if (selectedArtist) {
      filtered = filtered.filter(song => song.artists.includes(selectedArtist));
    }

    if (searchTerm) {
      filtered = filtered.filter(song => 
        song.title.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredSongs(filtered);
    setSearchPerformed(true); // Establece que la búsqueda se realizó
  };

  return (
    <div>
      <div className="field">
        <label className="label">Filtrar por Género:</label>
        <div className="control">
            <div className="select">
                <select onChange={handleGenreChange} value={selectedGenre}>
                  <option value=''>Todos</option>
                  {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                  ))}
                </select>
            </div>
        </div>


      </div>
      
      <div className="field">
        <label className="label">Filtrar por Artista:</label>
        <div className="control">
            <div className="select">
                  <select onChange={handleArtistChange} value={selectedArtist}>
                    <option value=''>Todos</option>
                    {artists.map(artist => (
                      <option key={artist.id} value={artist.id}>{artist.name}</option>
                    ))}
                </select>
            </div>
          </div>
      </div>

      <div className="field">
        <label className="label">Buscar Canción:</label>
        <input className="input is-focused" type="text" onChange={handleSearchTermChange} placeholder="Título de la canción" />
      </div >

      <div className="field">
        <button className="button is-success" onClick={handleSearch}>Buscar</button>
      </div>

      

      {searchPerformed && ( // Solo mostrara resultados si se hizo una búsqueda
        <div>
        <h2>Lista de Canciones</h2>
        <ul>
          {filteredSongs.length > 0 ? (
            filteredSongs.map(song => ( 
               <div key={song.id}>
                  <SongCard item={song} />
                  
               </div>
            ))
          ) : (
            <p>No se encontraron canciones.</p>
          )}
        </ul>
      </div>
    )}
      
    </div>
  );
};

export default SongSearch;


