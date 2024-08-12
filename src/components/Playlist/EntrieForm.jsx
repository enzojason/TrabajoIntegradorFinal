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
    <div className="is-centered">
    <div className='card'
        style={{width: "600px", 
        height: "100%",}}> 
    <form lassName='box' onSubmit={handleSubmit}>
      <div className="field">
        <label class="label">Orden: </label>
        <div class="control">
          <input class="input" type="number" value={order} onChange={(e) => setOrder(e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label class="label">Playlist: </label>
        <div class="control">
          <input class="input" type="number" value={playlist} onChange={(e) => setPlaylist(e.target.value)}  />
        </div>
      </div>
      <div className="field">
        <label class="label">Canción: </label>
        <div class="control">
          <input class="input" type="number" value={song} onChange={(e)=> setSong(e.target.value)} />
        </div>
      </div>
      
      {isLoading ? <h1>Cargando...</h1>
      : 
      (<div class="field is-grouped">
        <div className="control">
          <button className='button is-link' type="submit">Guardar</button>
        </div>
        <div className="control">
        <button className='button is-light' onClick={()=>onSave()} type="button">Salir</button>
        </div>

        
      </div> )}

    </form>
    </div>
  </div>
  );
};

export default EntrieForm;