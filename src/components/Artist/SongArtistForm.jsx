/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { createComponent } from '../../services/api';
import { DataContext } from '../../contexts/DataContext';
import { useContext } from 'react';

const SongArtistForm = ({id_artista,onSave} ) => {
  //Formulario de creacion de entradas de playlist
  const [role, setRole] = useState('');
  const [song,setSong] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {songData} = useContext(DataContext);
  const {playlistData} = useContext(DataContext);
  const {profileData}=useContext(DataContext);

  const handleSelectChange = (e) => {
    setSong(e.target.value);
  };

  
  const handleSubmit = async (e) => {
    //manejador de datos del formulario
    e.preventDefault();

    const formData = new FormData();
    formData.append('role', role);
    formData.append('song', song); 
    formData.append('artist', id_artista);
    
    try {
      setIsLoading(true); 
      const data = await createComponent(formData,"song-artists"); // Enviamos FormData para crear 
      console.log("DATA ",data);
      onSave();
      console.log("guardado");
      alert('Entry saved successfully');
      location.reload();

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
    <form className='box' onSubmit={handleSubmit}>
      
      <div className="field">
        <label className="label">Canción: </label>
        <div className="control">
                <div className="select">
                  <select onChange={handleSelectChange} required>

                  <option value={''}></option>      
                        
                    {songData.map(song => (
                    <option key={song.id} value={song.id}>
                    {song.title} {/* Muestra el nombre del álbum */}
                    </option>
                    ))}


                  </select>
                  </div>
              </div>
      </div>
      <div className='field'>
        <label className='label'>Rol: </label>
         <div className='control'>
            <input className='input' type='text' value={role} onChange={(e) => setRole(e.target.value)} required />
         </div>
      </div>
      {isLoading ? <h1>Cargando...</h1>
      : 
      (<div className="field is-grouped">
        <div className="control">
          <button className='button is-link' type="submit">Guardar</button>
        </div>

        
      </div> )}

    </form>
    </div>
  </div>
  );
};

export default SongArtistForm;