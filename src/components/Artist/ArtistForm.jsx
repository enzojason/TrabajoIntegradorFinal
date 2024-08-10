/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { createComponent, updateComponent } from '../../services/api';

const ArtistForm = ({ artist = {}, onSave }) => {
  const [name, setName] = useState(artist.name || '');
  const [bio,setBio] = useState(artist.bio || '');
  const [website, setWebsite] = useState(artist.website || '');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('website', website);

    console.log("FORM DATA ",formData);

    if (image) {
      formData.append('image', image);
    }

    try {
      setIsLoading(true);
      if (artist.id) {
        await updateComponent(formData,'artists',artist.id); // Enviamos FormData para crear
      }
      else{
        const response = await createComponent(formData,"artists"); // Enviamos FormData para crear
      }
      onSave();
      console.log("guardado");
      setIsLoading(false);
      alert('Artist saved successfully');
      window.location.reload();

    } catch (error) {
      setIsLoading(false);
      alert('Error saving artist: ' + error.message);
      window.location.reload();
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre: </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label >Bio: </label>
        <input type="text" value={bio} onChange={(e)=> setBio(e.target.value)} />
      </div>
      <div>
        <label>Sitio Web: </label>
        <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <div>
        <label>Imagen (.png .jpeg)</label>
        <input type="file" accept=".png, .jpeg, .jpg" onChange={handleImageChange}/>
      </div>
      {isLoading ? <h1>Cargando...</h1>
      : 
      (<div>
        <button type="submit">Guardar</button>
        <button onClick={()=>{onSave();}}>Salir</button>
      </div> )}
    </form>
  );
};

export default ArtistForm;