/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { createArtist, updateComponent } from '../../services/api';

const ArtistForm = ({ artist = {}, onSave }) => {
  // Formulario para crear o editar un artista
  const [name, setName] = useState(artist.name || '');
  const [bio,setBio] = useState(artist.bio || '');
  const [website, setWebsite] = useState(artist.website || '');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    // Manejador de cambio de imagen
    setImage(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    // Manejador de envio de formulario
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('website', website);


    if (image) {
      formData.append('image', image);
    }

    try {
      setIsLoading(true);
      if (artist.id) {
        await updateComponent(formData,'artists',artist.id); // Enviamos FormData para crear
      }
      else{
        await createArtist(formData); // Enviamos FormData para crear
      }
      onSave();
      console.log("guardado");
      setIsLoading(false);
      alert('Artist saved successfully');
      location.reload();

    } catch (error) {
      setIsLoading(false);
      alert('Error saving artist: ' + error.message);
    }

  };

  return (
    <div className="is-centered">
    <div className='card'
        style={{width: "600px", 
        height: "100%",}}> 
      <form className='box' onSubmit={handleSubmit}>
            
            <div className="field">
              <label className="label">Nombre: </label>
              <div className="control">
                <input className="input" type="text" placeholder="Nombre del Artista" value={name} onChange={(e) => setName(e.target.value)} required/>
              </div>
              
            </div>
            <div className="field">
              <label className="label">Bio: </label>
              <input className="input" type="text" placeholder="Info del Artista" value={bio} onChange={(e)=> setBio(e.target.value)} />
            </div>

            <div className="field">
              <label className="label">Sitio Web: </label>
              <input className="input" type="text" placeholder="www" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>

            <div className="field">
              <label className="label">Imagen (.png .jpeg)</label>
              <input className="input" type="file" accept=".png, .jpeg, .jpg" onChange={handleImageChange}/>
            </div >

              {isLoading ? <h1>Cargando...</h1>
              : 
              (<div className="field is-grouped">
                  <div className="control">
                    <button className='button is-link' type="submit">Guardar</button>
                  </div>

                  <div className="control">
                    <button className='button is-light' onClick={()=>{onSave();}}>Salir</button>
                  </div> 
                </div> 
                )}
          </form>
      </div>
      </div>
  );
};

export default ArtistForm;