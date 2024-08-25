/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { createComponent, createSong, updateComponent } from '../../services/api';
import { DataContext } from '../../contexts/DataContext';
import { useContext } from 'react';

const SongForm = ({ song = {}, onSave }) => {
  //Formulario de creacion de canciones
  const [title, setTitle] = useState(song.title ? song.title :'');
  const [year, setYear] = useState(song.year ? song.year : '');
  const [album, setAlbum] = useState(song.album ? song.album : '');
  const [songFile, setSongFile] = useState(null); // Inicializamos como null para almacenar el archivo
  const [cover, setCover] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { albumData,isError} = useContext(DataContext);


  const handleFileChange = (e) => {
    // Manejador de cambio de archivo
    setSongFile(e.target.files[0]); 
  };

  const handleImageChange = (e) => {
    // Manejador de cambio de imagen
    setCover(e.target.files[0]);
  }

  const handleSelectChange = (e) => {
    setAlbum(e.target.value);
  };


  const handleSubmit = async (e) => {
    // Manejador de envio de formulario
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('year', year);
    formData.append('album', album);

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
        await createSong(formData); // Enviamos FormData para crear
        }
      onSave();
      console.log("guardado");
      setIsLoading(false);
      alert('Song saved successfully');
      location.reload();

    } catch (error) {
      setIsLoading(false);
      alert('Error saving song: ' + error.message);
    }
    
  };

  return (
    <div className="card"
          style={{width: "700px",
                  height: "100%",}}>

          <form className='box'onSubmit={handleSubmit}>

            <div className="field">
              <label className='label'>Título</label>
              <div className="control">
                  <input className="input is-focused" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
            </div>

            <div className="field">
              <label className='label'>Año</label>
                <div className="control">
                  <input className="input is-focused" type="number" value={year} onChange={(e) => setYear(e.target.value)}  />
                </div>
            </div>

            <div className="field">
              <label className='label'>Álbum</label>
              <div className="control">
                <div className="select">
                  <select onChange={handleSelectChange} required>


                      {song.album ?
                          <>
                            {albumData.map(album => (
                            song.album === album.id && (
                            <option key={album.id} value={song.album}>
                              {album.title}
                            </option>
                            
                          )))}
                          </>
                          :
                          <>
                            <option value={''}></option>
                          </>
                          }

                    {albumData.map(album => (
                    <option key={album.id} value={album.id}>
                    {album.title} {/* Muestra el nombre del álbum */}
                    </option>
                    ))}



                  </select>
                  </div>
              </div>
            </div>

            <div className="field">
              <label className='label'>Canción (archivo .mp3)</label>
              <div className="control">
                <input className="input is-focused" type="file" accept=".mp3" onChange={handleFileChange} />
              </div>
            </div>

            <div className="field">
              <label className='label'>Imagen (.png .jpeg)</label>
              <div className="control">
                <input className="input is-focused" type="file" accept=".png, .jpeg, .jpg" onChange={handleImageChange}/>
              </div>
            </div>
            {isLoading ? <h1>Cargando...</h1>
            : 
            (<div className="field is-grouped">
              <div className="control">
                <button className='button is-link' type="submit">Guardar</button>
              </div> 
              <div className="control">
                <button className='button is-ligth' onClick={()=>{onSave();}}>Salir</button>
              </div> 
            </div> )}
            
          </form>
    </div>
    
  );
};

export default SongForm;