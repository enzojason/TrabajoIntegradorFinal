import React, { useEffect, useState } from 'react';
import { createComponent } from '../../services/api';

const AlbumForm = ({ album = {}, onSave }) => {
  // Formulario para crear o editar un album
  const [title, setTitle] = useState(album.title || '');
  const [year, setYear] = useState(album.year || '');
  const [artist, setArtist] = useState(album.artist || '');
  const [cover, setCover] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    // Manejador de cambio de imagen
    setCover(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    // Manejador de envio de formulario
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('year', year);
    formData.append('artist', artist);

    console.log("FORM DATA ",formData);
    
    if (cover) {
      formData.append('cover', cover);
    }
    try {
      setIsLoading(true);
      const data = await createComponent(formData,"albums"); // Enviamos FormData para crear
      console.log("DATA ",data);
      onSave();
      console.log("guardado");
      setIsLoading(false);
      alert('Album saved successfully');
      window.location.reload();

    } catch (error) {
      setIsLoading(false);
      alert('Error saving album: ' + error.message);
      window.location.reload();

    }
  };

  return (
    <div className="is-centered">
    <div className='card'
        style={{width: "600px", 
        height: "100%",}}> 
    <form className='box' onSubmit={handleSubmit}>

      <div className="field">
        <label class="label">Título: </label>
        <div class="control">
          <input class="input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
      </div>

      <div className="field">
        <label class="label">Año: </label>
        <div class="control">
          <input class="input" type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
        </div>
      </div>

      <div className="field">
        <label class="label">Artista: </label>
        <div class="control">
         <input class="input" type="number" value={artist} onChange={(e) => setArtist(e.target.value)} />
        </div>
      </div>

      <div className="field">
        <label class="label">Imagen (.png .jpeg)</label>
        <div class="control">
          <input class="input" type="file" accept=".png, .jpeg, .jpg" onChange={handleImageChange}/>
        </div>

      </div>
      {isLoading ? <h1>Cargando...</h1>
      : 
      (<div class="field is-grouped">
        <div className="control">
          <button className='button is-link' type="submit">Guardar</button>
        </div> 
        <div className="control">
          <button className='button is-ligth' onClick={()=>{onSave();}}>Salir</button>
        </div> 
      </div> )}
    </form>
    </div>
    </div>
  );
};

export default AlbumForm;