import React from 'react';
import { useState } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { useContext } from 'react';
import { deleteComponent } from '../../services/api';
import PlaylistForm from '../Playlist/PlaylistForm';
import EntrieForm from '../Playlist/EntrieForm';
import PlaylistPage from '../../pages/PlaylistPage';
import ListaElemento from '../WorkerList';


import playlistIMG from '../../assets/playlist.png'


function PlaylistDetail({ playlist }) {
    const [showEntries, setIsShowEntries] = useState(false);
  const { profileData } = useContext(DataContext);
  const [isCreating, setIsCreating] = useState(false);
  const [showFormEntry, setShowFormEntry] = useState(false);
  const { entriesData, isLoading, isError } = useContext(DataContext);
  const {songData} = useContext(DataContext);
  const [isLoad,setIsLoad] = useState(false);
  
  const handleSave = () => {
    //manejador de guardar playlist
    setIsCreating(false);
  };
  
  const handleshowFormEntry = () => {
    setShowFormEntry(!showFormEntry);
  }

  const handleShowEntries = () => {
    //manejador de mostrar entradas de playlist
    setIsShowEntries(!showEntries);
  }

  const handleDelete = async (id) => {
    setIsLoad(true);
    //manejador de eliminar playlist y las elimina en un fetch
    try{
      await deleteComponent('playlists', id);  
      console.log("delete playlist: ",id);
      console.log("eliminado");
      alert('Playlist deleted successfully');
      location.reload();

    }
    catch(error){
      alert('Error deleting playlist: ' + error.message);

    }
    finally{
      setIsLoad(false);
      
    }

}


const handleEdit = (playlist) => {
  //manejador de editar playlist
    setIsCreating(true);  
    console.log('EDITAR', playlist);
    
  };
  
  const handleDeleteEntry = async (id) => {
    //manejadaor de eliminar entrada de una playlisty
    setIsLoad(true);
    try{
      await deleteComponent('playlist-entries', id);  
      console.log("delete entry: ",id);
      console.log("eliminado");
      alert('Entry deleted successfully');
    }
    catch(error){
      alert('Error deleting entry: ' + error.message);

    }
    finally{
      setIsLoad(false);
      <PlaylistPage></PlaylistPage> //Rescarga la pagina
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

                  <div className='media-left'>  
                    <figure className="image is-30x30">
                      <img  src={playlist.image || playlistIMG} style={{ maxWidth: '500px', maxHeight: '500px' }} />
                    </figure>
                  </div>
                 
                  <div className="media-content">
   
                        <p className="title is-4"><strong>{playlist.name}</strong></p> 
                        {playlist.public==="true" ? <i  className="subtitle is-6">Playlist Pública <small>ID: {playlist.id}</small></i> : <i  className="subtitle is-6">Playlist Privada <small>ID: {playlist.id}</small></i>}
                        <p className="subtitle is-4" > {playlist.description}</p>
                        <p>Fecha de Creación: {new Date(playlist.created_at).toLocaleDateString()}</p>
                        <p className="subtitle is-6" >Ultima Actualización: {new Date(playlist.updated_at).toLocaleDateString()}</p>
                        <div className="media-content" style={{ fontSize: '13px' }}>
                        {playlist.entries>0 ? (<p className="has-text-info">Numero de Reproducciónes: {playlist.entries}</p>)
                                        :(<div className="has-text-info">Sin Reproducciónes</div>)}
                        </div>
                        
                        
                        {playlist.entries.length > 0 ?
                          <button  className= {` is-small button ${!showEntries ? 'is-link is-outlined' : 'is-danger is-outlined'}`} 
                          onClick={handleShowEntries}>                            
                          {showEntries ? 'Ocultar Canciones' : `Mostrar Canciones (${playlist.entries.length})`}
                          </button>  
                          :
                          <button  className= {` is-small button ${!showEntries ? 'is-link is-outlined' : 'is-danger is-outlined'}`} 
                            onClick={handleShowEntries}>

                          {showEntries ? 'Sin Canciones  "Agrega una" ' : `Mostrar Canciones `}
                          </button>  
                        }
                          
                        <br />
                        <br />
                        {showEntries && playlist.owner === profileData.user__id && <button className="button" onClick={handleshowFormEntry} > Agregar entrada </button>}
                        <br />
                        {showFormEntry && <EntrieForm onSave={handleSave}  id_playlist={playlist.id}/>}
                      
                </div>
            </div>
        </div>


          {showEntries && 
                  <>
                  {isLoading ? <h1>Cargando...</h1>:
                        <div >

                          {entriesData.map(entry => (
                            entry.playlist === playlist.id &&(
                        <div key={entry.id}>
                            {songData.map(song => (
                            song.id === entry.song &&(
                        <div key={song.id} className='card'>
                          <div className="content">
                            <p><i>#{entry.order}  </i>{song.title}</p>
                            {profileData.user__id===playlist.owner && 
                            <button  onClick={() => handleDeleteEntry(entry.id)} className='button is-ghost'>-</button>}
                            
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

                        </div>
                  }
                  </>
                }

                {profileData.user__id===playlist.owner && 
                  <div className="buttons">
                    
                    {isLoad ? <h1>Cargando...</h1>
                    : 
                    <>
                    {showFormEntry ? 
                    <button className="button is-success" onClick={handleshowFormEntry} > Volver </button>
                    : 
                    <>
                    
                    {!showEntries &&
                      <>
                      <button className="button is-warning" onClick={() => handleEdit(playlist)}>Editar Playlist</button>
                      <button className="button is-danger" onClick={() => handleDelete(playlist.id)}>Eliminar Playlist</button>                  
                      </>
                      }
                    
                    </>
                    }
                    
                    </>
                    }
                    

                  </div>
                  }
                  <br />
                  
        </div>
        
        )}
    </div>
    
  );
}


export default PlaylistDetail;