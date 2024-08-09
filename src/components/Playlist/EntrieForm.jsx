/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { createComponent } from '../../services/api';

const EntrieForm = ({ entrie = {}, onSave }) => {
  const [order, setOrder] = useState(entrie.order || '');
  const [playlist, setPlaylist] = useState(entrie.playlist || '');
  const [song,setSong] = useState(entrie.song || '');


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('order', order);
    formData.append('playlist', playlist);
    formData.append('song', song);

    console.log("FORM DATA ",formData);
    try {
      
      const data = await createComponent(formData,"playlist-entries"); // Enviamos FormData para crear
      console.log("DATA ",data);
      onSave();
      console.log("guardado");
      alert('Song saved successfully');
    } catch (error) {
      alert('Error saving song: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Orden: </label>
        <input type="number" value={order} onChange={(e) => setOrder(e.target.value)} required />
      </div>
      <div>
        <label>Playlist: </label>
        <input type="number" value={playlist} onChange={(e) => setPlaylist(e.target.value)} required />
      </div>
      <div>
        <label >Canción: </label>
        <input type="number" value={song} onChange={(e)=> setSong(e.target.value)}required />
      </div>
      
      <button type="submit">Guardar</button>
    </form>
  );
};

export default EntrieForm;