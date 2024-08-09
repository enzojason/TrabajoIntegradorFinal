/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../contexts/DataContext';
import { useContext } from 'react';



const PlaylistCard = ({item:playlist }) => {
  const [showEntries, setIsShowEntries] = useState(false);
  const [entries, setEntries]= useState([]);

  const { entriesData, isLoading, isError } = useContext(DataContext);
  const {songData} = useContext(DataContext);

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar los datos</p>;

  const handleShowEntries = () => {
    setIsShowEntries(!showEntries);
  }
  return (
    
    <div>
        {playlist.entries.length > 0 ? 
        <div onClick={handleShowEntries}>
          
          <p ><strong>{playlist.name}</strong></p>
          <p >{playlist.description}</p>
          <p >Creado en: {new Date(playlist.created_at).toLocaleDateString()}</p>
          <p >Ultima Actualización: {new Date(playlist.updated_at).toLocaleDateString()}</p>
          {playlist.entries.length === 1 ? <p>{playlist.entries.length} Canción</p> : <p>{playlist.entries.length} Canciónes</p> }  
          {showEntries && 
          <div>
            {entriesData.map(entry => (
              entry.playlist === playlist.id &&(
                <div key={entry.id}>
                  {songData.map(song => (
                      song.id === entry.song &&(
                      <div key={song.id}>
                      <h1> * {song.title}</h1>
                      </div>
                    ))
                  )}
                </div>
                )
            ))}

          </div>}
        </div>
        :
        <div>
          <p ><strong>{playlist.name}</strong></p>
          <p >{playlist.description}</p>
          <p >Creado en: {playlist.created_at}</p>
          <p >Ultima Actualización: {new Date(playlist.updated_at).toLocaleDateString()}</p>
          <p >Sin canciones</p>  
        </div>}
        <br />
    </div>
  );
};

export default PlaylistCard;
