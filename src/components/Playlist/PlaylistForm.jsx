/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { createComponent } from '../../services/api';

const PlaylistForm = ({ playlist = {}, onSave }) => {
  const [name, setName] = useState(playlist.name || '');
  const [description,setDescription] = useState(playlist.description || '');


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);

    console.log("FORM DATA ",formData);
    try {
      
      const data = await createComponent(formData,"playlists"); // Enviamos FormData para crear
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
        <label>Nombre: </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label >Bio: </label>
        <input type="text" value={description} onChange={(e)=> setDescription(e.target.value)} />
      </div>
      
      <button type="submit">Guardar</button>
    </form>
  );
};

export default PlaylistForm;