/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { createComponent } from '../../services/api';

const EntrieForm = ({id_playlist, onSave} ) => {
  //Formulario de creacion de entradas de playlist

  const [order, setOrder] = useState('');
  const [playlist, setPlaylist] = useState(id_playlist ? id_playlist : '');
  const [song,setSong] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    //manejador de datos del formulario
    e.preventDefault();

    const formData = new FormData();
    formData.append('order', order);
    formData.append('playlist', playlist);
    formData.append('song', song);

    console.log("FORM DATA ",formData);
    try {
      setIsLoading(true); 
      const data = await createComponent(formData,"playlist-entries"); // Enviamos FormData para crear 
      console.log("DATA ",data);
      onSave();
      console.log("guardado");
      alert('Entry saved successfully');
    } catch (error) {
      alert('Error saving entry: ' + error.message);
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Orden: </label>
        <input type="number" value={order} onChange={(e) => setOrder(e.target.value)}  required/>
      </div>
      <div>
        <label>Playlist: </label>
        <input type="number" value={playlist} onChange={(e) => setPlaylist(e.target.value)}  />
      </div>
      <div>
        <label >Canción: </label>
        <input type="number" value={song} onChange={(e)=> setSong(e.target.value)} />
      </div>
      
      {isLoading ? <h1>Cargando...</h1>
      : 
      (<div>
        <button type="submit">Guardar</button>
      </div> )}

    </form>
  );
};

export default EntrieForm;