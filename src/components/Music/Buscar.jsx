import React, { useState, useEffect } from 'react';
import { fetchSongs, fetchGenres, fetchArtists } from '../../services/api';
import SongCard from './SongCard';

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
          <div className="column">
                <div className="columns is-mobile is-2">
                    {filteredSongs.slice(0,5).map((item) => (
                        <div key={item.id} className="column is-one-fifth">
                            <SongCard 
                                item={item} 
                                type={'song'}
                                onDelete={() => handleDelete(item.id)} 
                                onEdit={() => handleEdit(item)} 
                            />
                        </div>
                    ))}
                </div>
          </div>


        </div>
      )}
    </div>
  );
};

export default SongSearch;



/*

          <ul>
            {filteredSongs.length > 0 ? (
              filteredSongs.map(song => (
                <li key={song.id}>{song.title}</li>
              ))
            ) : (
              <p>No se encontraron canciones.</p>
            )}
          </ul>


import React, { useState, useEffect } from 'react';
import { fetchSongs, fetchGenres, fetchArtists } from '../../services/api';

const SongSearch = () => {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const songData = await fetchSongs();
      setSongs(songData.results);
      
      const genreData = await fetchGenres();
      setGenres(genreData.results);
      
      const artistData = await fetchArtists();
      setArtists(artistData.results);
      
      setFilteredSongs(songData.results);
    };

    loadData();
  }, []);

  const handleGenreChange = (e) => {
    const genreId = parseInt(e.target.value);
    setSelectedGenre(genreId);

    if (genreId === '') {
      setFilteredSongs(songs);
    } else {
      const filtered = songs.filter(song => song.genres.includes(genreId));
      setFilteredSongs(filtered);
    }
  };

  const handleArtistChange = (e) => {
    const artistId = parseInt(e.target.value);
    setSelectedArtist(artistId);

    if (artistId === '') {
      setFilteredSongs(songs);
    } else {
      const filtered = songs.filter(song => song.artists.includes(artistId));
      setFilteredSongs(filtered);
    }
  };

  return (
    <div>
      <div>
        <label>Filtrar por Género:</label>
        <select onChange={handleGenreChange} value={selectedGenre}>
          <option value=''>Todos</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label>Filtrar por Artista:</label>
        <select onChange={handleArtistChange} value={selectedArtist}>
          <option value=''>Todos</option>
          {artists.map(artist => (
            <option key={artist.id} value={artist.id}>{artist.name}</option>
          ))}
        </select>
      </div>

      <div>
        <h2>Lista de Canciones</h2>
        <ul>
          {filteredSongs.map(song => (
            <li key={song.id}>{song.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SongSearch;

/////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import { fetchSongs } from '../../services/api'; // Asegúrate de importar la función correctamente

const SongSearch = () => {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSongs();
        setSongs(data.results);
        setFilteredSongs(data.results); // Inicialmente, muestra todas las canciones
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = songs.filter(song => {
      return song.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredSongs(filtered);
  }, [searchTerm, songs]);

  return (
    <div>
      <input 
        type="text" 
        placeholder="Buscar por título" 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
      />
      <ul>
        {filteredSongs.length > 0 ? (
          filteredSongs.map(song => (
            <li key={song.id}>
              <h3>{song.title}</h3>
              <p>Año: {song.year}</p>
              <p>Duración: {song.duration} segundos</p>
            </li>
          ))
        ) : (
          <p>No se encontraron canciones que coincidan con la búsqueda.</p>
        )}
      </ul>
    </div>
  );
};

export default SongSearch;
*/
