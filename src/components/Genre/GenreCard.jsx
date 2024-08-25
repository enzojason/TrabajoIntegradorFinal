/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { DataContext } from '../../contexts/DataContext';
import { useContext } from 'react';
import { useState } from 'react';
import { deleteComponent,fetchAll,updateComponent } from '../../services/api';
import GenreForm from './GenreForm';
import SongGenreForm from './SongGenreForm';


const GenreCard = ({item:genres }) => {  
  const { profileData,isLoading,isError} = useContext(DataContext);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [showEntries, setIsShowEntries] = useState(false);
  const [showFormEntry, setShowFormEntry] = useState(false);
  const {songData} = useContext(DataContext);
  const { song_genreData } = useContext(DataContext);

  const handleShowEntries = () => {
    //manejador de mostrar entradas de playlist
    setIsShowEntries(!showEntries);

  }

  const handleshowFormEntry = () => {
      setShowFormEntry(!showFormEntry);
  }
  const handleSave = () => {
    //manejador de guardar genero
    setIsCreating(false);
  }

  const handleDeleteEntry = async (id) => {
    //manejadaor de eliminar entrada de una playlisty
    setIsLoad(true);
    try{
      await deleteComponent('song-genres', id);  
      console.log("delete entry: ",id);
      console.log("eliminado");
      alert('Entry deleted successfully');
    }
    catch(error){
      alert('Error deleting entry: ' + error.message);

    }
    finally{
      setIsLoad(false);
      location.reload(); //Rescarga la pagina
    }
    
}

  const handleDelete = async (id) => {
    //manejador de eliminar genero y las elimina en un fetch
    try{
      setIsLoad(true);  
      await deleteComponent('genres', id);  
      console.log("delete genre: ",id);
      console.log("eliminado");
      alert('Genre deleted successfully');
      setIsLoad(false);
      location.reload();
    }
    catch(error){
      alert('Error deleting genre: ' + error.message);
      setIsLoad(false);

    }
    
    
}

const handleEdit = (genre) => {
  //manejador de editar genero
    setIsCreating(true);  
    console.log('EDITAR', genre);
    
  };

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar los datos</p>;


  return (
    <div>
      {isCreating ? (<GenreForm onSave={handleSave} genero={genres} />) : (
        <div className='card'>
          <div className='card-content'>
            <div className=''>

                  <p className="title is-4"><strong>{genres.name}</strong></p>
                  <br />
                  <p className="subtitle is-6">{genres.description}</p>
                  <p >Fecha de creación: {new Date(genres.created_at).toLocaleDateString()}</p>
                  <p >Ultima Actualización: {new Date(genres.updated_at).toLocaleDateString()} </p>
                  {showFormEntry && <SongGenreForm onSave={handleSave}  id_genero={genres.id} />}
                  <br />
                  {showFormEntry && <button className="button is-success" onClick={handleshowFormEntry}>Volver</button>}
                    <br />
                    {!showFormEntry &&
                    <>
                      <button  className= {` is-small button ${!showEntries ? 'is-link is-outlined' : 'is-danger is-outlined'}`} onClick={handleShowEntries}>
                      {showEntries ? 'Ocultar Canciones' : `Mostrar Canciones ${genres.songs.length > 0 ? `(${genres.songs.length})` : ''}`}
                      </button>
                      <br />
                      <br />
                    </>
                    }
                    {showEntries && !showFormEntry &&
                      <button className="button" onClick={handleshowFormEntry} > Agregar cancion </button>}
                  <br />
                    <br />
                  {profileData.user__id === genres.owner && (
                    <div className="buttons">
                    {isLoad ? <h1>Cargando...</h1> 
                      :
                      <>
                        {!showEntries &&
                        <>      
                        
                        <button className="button is-warning" onClick={() => handleEdit(genres)}>Editar</button>
                        <button className="button is-danger" onClick={() => handleDelete(genres.id)}>Eliminar</button>
                        </>
                        }
                      </>
                      }
                    </div>
                  )}
                  </div>
                     
                  {showEntries && (
                    <div>
                      {isLoad ? <h1>Cargando...</h1> :
                      <div>
                        {song_genreData.map( song_genre => (
                          song_genre.genre === genres.id && (
                            <div key={song_genre.id} >
                              {songData.map(song => (
                                song.id === song_genre.song && (
                                <div key={song.id} className='card'>
                                  <div className='content'>
                                    <p>{song.title}</p>      
                                    {profileData.user__id===song_genre.owner && 
                              <button  onClick={() => handleDeleteEntry(song_genre.id)} className='button is-ghost'>-</button>}                            
                                    <audio controls>                          
                                      <source src={song.song_file} type="audio/mpeg" />
                                    </audio>
                                  </div>
                                  
                                </div>
                                )
                              ) 

                              )}
                            </div>
                          )
                        ))}
                      </div>
                  }
                    </div>
                  )}
                </div>
                </div>
                )}
    </div>
  );
};

export default GenreCard;
