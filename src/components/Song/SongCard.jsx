/* eslint-disable react/prop-types */
import React from 'react';
import { DataContext } from '../../contexts/DataContext';
import { useContext } from 'react';
import SongForm from './SongForm';
import { useState } from 'react';

const SongCard = ({ item:song }) => {
  const { profileData, isLoading, isError } = useContext(DataContext);

  const [isCreating, setIsCreating] = useState(false);

  const handleSave = () => {
    setIsCreating(false);
  };

const handleDelete = (song) => {
    console.log("DELETE song ",song);   
}

  

const handleEdit = (song) => {
    setIsCreating(true);  
    console.log('EDITAR', song);
    
  };




if (isLoading) return <p>Cargando...</p>;
if (isError) return <p>Error al cargar las canciones.</p>;

  return (
  <div>
    {isCreating ? (<SongForm onSave={handleSave} song={song} />) : (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="">
            <p className="title is-4">{song.title}</p>
            <p className='subtitle is-6'>Año: {song.year}</p>
            <p className="subtitle is-6">{song.view_count} reproducciones</p>
          </div>
        </div>
        <div className="content">
          <audio controls>
            <source src={song.song_file} type="audio/mpeg" />
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>

        {profileData.user__id===song.owner && 
        <div className="buttons">
          <button className="button is-warning" onClick={() => handleEdit(song)}>Editar</button>
          <button className="button is-danger" onClick={() => handleDelete(song.id)}>Eliminar</button>
        </div>
        }

      </div>
    </div>
    )}
  </div>
    
  );
};

export default SongCard;
