/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { DataContext } from '../../contexts/DataContext';
import { useContext } from 'react';
import SongForm from './SongForm';
import { useState } from 'react';
import { deleteComponent } from '../../services/api'; 

const SongCard = ({ item:song }) => {
  //componente card de cada cancion, se muestra los datos de la cancion y se puede editar o eliminar
  const { profileData, isLoading, isError } = useContext(DataContext);
  const {albumData} = useContext(DataContext);
  const {artistData} = useContext(DataContext);

  const [isCreating, setIsCreating] = useState(false);
  
  const handleSave = () => {
    //manejador de guardar cancion
    setIsCreating(false);
  };

const handleDelete = async (id) => {
  //manejador de eliminar cancion y las elimina en un fetch
    try{
      await deleteComponent('songs', id);  
      console.log("delete song: ",id);
      console.log("eliminado");
      alert('Song deleted successfully');
    }
    catch(error){
      alert('Error deleting song: ' + error.message);

    }
    finally{
      setIsCreating(false);
      window.location.reload(); //Rescarga la pagina
    }
    
}

  

const handleEdit = (song) => {
  //manejador de editar cancion
    setIsCreating(true);  
    console.log('EDITAR', song);
    
  };




if (isLoading) return <p>Cargando...</p>;
if (isError) return <p>Error al cargar las canciones.</p>;

  return (
  <div>
    {isCreating ? (<SongForm onSave={handleSave} song={song} />) : (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="">
            <p className="title is-4">{song.title}</p>
            { song.year && <p className='subtitle is-6'>Año: {song.year}</p>}
            {song.view_count ? <p className="subtitle is-6">{song.view_count} reproducciones</p> : <p>Sin reproducciones</p>}
            {albumData.map(album =>(
              album.id === song.album && (
                <div key={album.id}>
                  <p>Album: {album.title}</p>
                </div>
              )
            ))}
            {artistData.map(artista => 
                  song.artists.includes(artista.id) && (
                    <div key={artista.id}>
                      <p>Artista: {artista.name}</p>
                    </div>
                  )
                )}

            <img src={song.cover} alt="" style={{width:'80px',height:'80px'}} />
            
          </div>
        </div>
        <div className="content">
          <audio controls>
            <source src={song.song_file} type="audio/mpeg" />
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>

        {profileData.user__id===song.owner && 
        <div className="buttons">
          <button className="button is-warning" onClick={() => handleEdit(song)}>Editar</button>
          <button className="button is-danger" onClick={() => handleDelete(song.id)}>Eliminar</button>
        </div>
        }

      </div>
    </div> 
    )}
  </div>
    
  );
};

export default SongCard;
