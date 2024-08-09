/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { createComponent, updateComponent } from '../../services/api';


const SongForm = ({ song = {}, onSave }) => {
  const [title, setTitle] = useState(song.title ? song.title :'');
  const [year, setYear] = useState(song.year ? song.year : '');
  const [album, setAlbum] = useState(song.album ? song.album : '');
  const [songFile, setSongFile] = useState(null); // Inicializamos como null para almacenar el archivo
  
  const handleFileChange = (e) => {
    setSongFile(e.target.files[0]); // Almacenamos el archivo seleccionado
  };

  const handleSubmit = async (e) => {
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

    try { 
      if (song.id) {
        await updateComponent(formData,'songs',song.id) // Enviamos FormData para actualizar
      } else {
      await createComponent(formData,"songs"); // Enviamos FormData para crear
      }
      onSave();
      console.log("guardado");
      alert('Song saved successfully');
      window.location.reload(); //Rescarga la pagina

    } catch (error) {
      alert('Error saving song: ' + error.message);
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
      <button type="submit">Guardar</button>
      <button onClick={()=>{onSave();}}>Salir</button>
    </form>
  );
};

export default SongForm;