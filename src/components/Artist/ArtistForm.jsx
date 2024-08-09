/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { createComponent } from '../../services/api';

const ArtistForm = ({ artist = {}, onSave }) => {
  const [name, setName] = useState(artist.name || '');
  const [bio,setBio] = useState(artist.bio || '');
  const [year, setYear] = useState(artist.year || '');
  const [website, setWebsite] = useState(artist.website || '');
  const[songs,setSongs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('year', year);
    formData.append('website', website);

    console.log("FORM DATA ",formData);
    try {
      
      const data = await createComponent(formData,"artists"); // Enviamos FormData para crear
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
        <input type="text" value={bio} onChange={(e)=> setBio(e.target.value)} />
      </div>
      <div>
        <label>Año: </label>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)}  />
      </div>
      <div>
        <label>Sitio Web: </label>
        <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ArtistForm;