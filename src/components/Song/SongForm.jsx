/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { createComponent, updateComponent } from '../../services/api';
import SongsPage from '../../pages/SongsPage';

const SongForm = ({ song = {}, onSave }) => {
  //Formulario de creacion de canciones
  const [title, setTitle] = useState(song.title ? song.title :'');
  const [year, setYear] = useState(song.year ? song.year : '');
  const [album, setAlbum] = useState(song.album ? song.album : '');
  const [songFile, setSongFile] = useState(null); // Inicializamos como null para almacenar el archivo
  const [cover, setCover] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleFileChange = (e) => {
    // Manejador de cambio de archivo
    setSongFile(e.target.files[0]); 
  };

  const handleImageChange = (e) => {
    // Manejador de cambio de imagen
    setCover(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    // Manejador de envio de formulario
    e.preventDefault();
    console.log("TITLE ",title);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('year', year);
    formData.append('album', album);

    console.log("FORM DATA ",formData);
    if (songFile) {
      formData.append('song_file', songFile); // Añadimos el archivo al FormData 
    }
    if (cover) {
      formData.append('cover', cover); // Añadimos la imagen al FormData
    }

    try { 
        setIsLoading(true);
        if (song.id) {
        await updateComponent(formData,'songs',song.id) // Enviamos FormData para actualizar
      } else {
        const response = await createComponent(formData,"songs"); // Enviamos FormData para crear
        console.log("song form data: ",response.results); 
        }
      onSave();
      console.log("guardado");
      setIsLoading(false);
      alert('Song saved successfully');
      window.location.reload();

    } catch (error) {
      setIsLoading(false);
      alert('Error saving song: ' + error.message);
      window.location.reload();
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Año</label>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
      </div>
      <div>
        <label>Álbum</label>
        <input type="number" value={album} onChange={(e) => setAlbum(e.target.value)} />
      </div>
      <div>
        <label>Canción (archivo .mp3)</label>
        <input type="file" accept=".mp3" onChange={handleFileChange} />
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

export default SongForm;