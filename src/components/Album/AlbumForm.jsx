/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { createComponent ,updateComponent} from '../../services/api';
import { DataContext } from '../../contexts/DataContext';
import { useContext } from 'react';

const AlbumForm = ({ album = {}, onSave }) => {
  // Formulario para crear o editar un album
  const [title, setTitle] = useState(album.title || '');
  const [year, setYear] = useState(album.year || '');
  const [artist, setArtist] = useState(album.artist || '');
  const [cover, setCover] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const{artistData} = useContext(DataContext);


  const handleImageChange = (e) => {
    // Manejador de cambio de imagen
    setCover(e.target.files[0]);
  }

  const handleSelectChange = (e) => {
    setArtist(e.target.value);
  };

  const handleSubmit = async (e) => {
    // Manejador de envio de formulario
    e.preventDefault();

  

    const formData = new FormData();
    formData.append('title', title);
    formData.append('year', year);
    formData.append('artist', artist);

    
    if (cover) {
      formData.append('cover', cover);
    }
    try {
      setIsLoading(true);

      if (album.id) {
        await updateComponent(formData,'albums',album.id) // Enviamos FormData para actualizar
      }
      else
      {
        await createComponent(formData,"albums"); // Enviamos FormData para crear

      }
      onSave();
      console.log("guardado");
      setIsLoading(false);
      alert('Album saved successfully');
      location.reload();

    } catch (error) {
      setIsLoading(false);
      alert('Error saving album: ' + error.message);

    }
  };

  return (
    <div className="is-centered">
        <div className='card'
            style={{width: "600px", 
            height: "100%",}}> 
            <form className='box' onSubmit={handleSubmit}>

              <div className="field">
                <label className="label">Título: </label>
                <div className="control">
                  <input className="input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
              </div>

              <div className="field">
                <label className="label">Año: </label>
                <div className="control">
                  <input className="input" type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
                </div>
              </div>

              <div className="field">
                <label className="label">Artista: </label>
                <div className="control">
                  <div className="select">
                    <select onChange={handleSelectChange} required>

                      {album.artist ?
                      <>
                        {artistData.map(artist => (
                        album.artist === artist.id && (
                        <option key={artist.id} value={album.artist}>
                          {artist.name}
                        </option>
                        
                      )))}
                      </>
                      :
                      <>
                        <option value={''}></option>
                      </>
                      }
                      
                        
                      {artistData.map(artist => (
                      <option key={artist.id} value={artist.id}>
                      {artist.name}
                      </option>
                      ))}


                    </select>
                    </div>

                </div>
              </div>

              <div className="field">
                <label className="label">Imagen (.png .jpeg)</label>
                <div className="control">
                  <input className="input" type="file" accept=".png, .jpeg, .jpg" onChange={handleImageChange}/>
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
    </div>
  );
};

export default AlbumForm;