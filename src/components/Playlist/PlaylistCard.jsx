/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useState } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { useContext } from 'react';
import { deleteComponent } from '../../services/api';
import PlaylistForm from './PlaylistForm';
import SongCard from '../Song/SongCard';
import EntrieForm from './EntrieForm';

const PlaylistCard = ({item:playlist }) => {
  //componente card de cada playlist, se muestra los datos de la playlist y se puede editar o eliminar 
  const [showEntries, setIsShowEntries] = useState(false);
  const { profileData } = useContext(DataContext);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditingEntry, setIsEditingEntry] = useState(false);
  const { entriesData, isLoading, isError } = useContext(DataContext);
  const {songData} = useContext(DataContext);

  
  const handleSave = () => {
    //manejador de guardar playlist
    setIsCreating(false);
  };
  
  const handleShowEntries = () => {
    //manejador de mostrar entradas de playlist
    setIsShowEntries(!showEntries);
  }

  const handleDelete = async (id) => {
    //manejador de eliminar playlist y las elimina en un fetch
    try{
      await deleteComponent('playlists', id);  
      console.log("delete playlist: ",id);
      console.log("eliminado");
      alert('Playlist deleted successfully');
    }
    catch(error){
      alert('Error deleting playlist: ' + error.message);

    }
    finally{
      setIsCreating(false);
      window.location.reload(); //Rescarga la pagina
    }
    
}

const handleCreateEntrie = (e) => {
  //manejador de crear entrada
  e.preventDefault();
  setIsEditingEntry(!isEditingEntry);

}

const handleEdit = (playlist) => {
  //manejador de editar playlist
    setIsCreating(true);  
    console.log('EDITAR', playlist);
    
  };
  const handleDeleteEntry = async (id) => {
    //manejadaor de eliminar entrada de una playlist
    try{
      await deleteComponent('playlist-entries', id);  
      console.log("delete song: ",id);
      console.log("eliminado");
      alert('Entry deleted successfully');
    }
    catch(error){
      alert('Error deleting entry: ' + error.message);

    }
    finally{
      setIsCreating(false);
      window.location.reload(); //Rescarga la pagina
    }
    
}

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar los datos</p>;
  

  return (
    
    <div>
        {isCreating ? (<PlaylistForm onSave={handleSave} playlist={playlist} />) : ( //aquie llamamos al formulario de playlist
         <div  className='card'>
          <div className='card-content'>
            <div className='media'>
              <div className=''>  
                {playlist.entries.length > 0 ? 
                  <div>
                        <p ><strong>{playlist.name}</strong></p> 
                        {playlist.public==="true" ? <i>Playlist Pública <small>ID: {playlist.id}</small></i> : <i>Playlist Privada <small>ID: {playlist.id}</small></i>}
                        <p >Descripcion: {playlist.description}</p>
                        <p >Ultima Actualización: {new Date(playlist.updated_at).toLocaleDateString()}</p>
                        <button onClick={handleCreateEntrie}> Agregar entrada </button>
                        {isEditingEntry && <EntrieForm onSave={handleSave}  id_playlist={playlist.id}/>}

                        <br />
                        <button onClick={handleShowEntries}>{playlist.entries.length === 1 ? <u>{playlist.entries.length} Canción</u> : <u>{playlist.entries.length} Canciónes</u> }
                        </button>  
                      
                </div>
                :
                <div>
                  <p ><strong>{playlist.name}</strong></p>
                  <p >{playlist.description}</p>
                  <p >Creado en: {playlist.created_at}</p>
                  <p >Ultima Actualización: {new Date(playlist.updated_at).toLocaleDateString()}</p>
                  <p >Sin canciones</p>  
                </div>}
                
              
              </div>
            </div>
          </div>
          {showEntries && 
                        <div>
                          {entriesData.map(entry => (
                            entry.playlist === playlist.id &&(
                        <div key={entry.id}>
                            {songData.map(song => (
                            song.id === entry.song &&(
                        <div key={song.id} className='card'>
                          <div className="content">
                            <i>#{entry.order}</i>
                            <p>{song.title}</p>
                            <button  onClick={() => handleDeleteEntry(entry.id)}>Eliminar entrada</button>      
                            <audio controls>                          
                              <source src={song.song_file} type="audio/mpeg" />
                            </audio>
                            
                        </div>
                        </div>
                        ))
                        )}
                        </div>
                  )
                ))}

                </div>}
                {profileData.user__id===playlist.owner && 
                  <div className="buttons">
                    <button className="button is-warning" onClick={() => handleEdit(playlist)}>Editar Playlist</button>
                    <button className="button is-danger" onClick={() => handleDelete(playlist.id)}>Eliminar Playlist</button>
                  </div>
                  }
        </div>
        
        )}
    </div>
    
  );
};

export default PlaylistCard;
