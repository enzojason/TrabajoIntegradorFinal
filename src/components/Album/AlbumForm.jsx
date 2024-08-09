import React, { useEffect, useState } from 'react';
import { createComponent } from '../../services/api';

const AlbumForm = ({ album = {}, onSave }) => {
  const [title, setTitle] = useState(album.title || '');
  const [year, setYear] = useState(album.year || '');
  const [artist, setArtist] = useState(album.artist || '');


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('year', year);
    formData.append('artist', artist);

    console.log("FORM DATA ",formData);
    try {
      
      const data = await createComponent(formData,"albums"); // Enviamos FormData para crear
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
        <label>Título: </label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Año: </label>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
      </div>
      <div>
        <label>Artista: </label>
        <input type="number" value={artist} onChange={(e) => setArtist(e.target.value)} />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default AlbumForm;