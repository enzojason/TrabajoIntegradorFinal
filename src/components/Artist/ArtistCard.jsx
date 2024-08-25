/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { DataContext } from '../../contexts/DataContext';
import { useContext } from 'react';
import { useState } from 'react';
import ArtistForm from './ArtistForm';
import { deleteComponent } from '../../services/api';
import SongArtistForm from './SongArtistForm';

const ArtistCard = ({item:artist}) => {  
  //componente card de cada artista, se muestra los datos del artista y se puede editar o eliminar
  const { albumData, isLoading,isError } = useContext(DataContext);
  const { profileData } = useContext(DataContext);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoad,setIsLoad] = useState(false);
  const [showEntries, setIsShowEntries] = useState(false);
  const [showFormEntry, setShowFormEntry] = useState(false);
  const {song_artistData} = useContext(DataContext);
  const {songData} = useContext(DataContext);


  const handleSave = () => {
    //manejador de guardar artista
    setIsCreating(false);
  }

  const handleShowEntries = () => {
    setIsShowEntries(!showEntries);

  }

  const handleshowFormEntry = () => {
    setShowFormEntry(!showFormEntry);
}
  const handleDeleteEntry = async (id) => {
    //manejadaor de eliminar entrada de una playlisty
    setIsLoad(true);
    try{
      await deleteComponent('song-artists', id);  
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
    //manejador de eliminar artista y las elimina en un fetch
    try{
      setIsLoad(true);  
      await deleteComponent('artists', id);  
      console.log("delete artist: ",id);
      console.log("eliminado");
      alert('Artist deleted successfully');
      setIsLoad(false);
      location.reload();
    }
    catch(error){
      alert('Error deleting artist: ' + error.message);
      setIsLoad(false);

    }
    
    
}

const handleEdit = (artist) => {
  //manejador de editar artista
    setIsCreating(true);  
    console.log('EDITAR', artist);
    
  };

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar los datos</p>;

  return ( 
    <div>
      {isCreating ? (<ArtistForm onSave={handleSave} artist={artist} />) : (
   <div className="card">
   <div className="card-content">
     <div className="media">
       <div className="media-left">
         <figure className="image is-30x30">
           <img src={artist.image} style={{ maxWidth: '120px', maxHeight: '120px' }} alt="" />
         </figure>
       </div>
       
       <div className="media-content">
         <h1 className="title is-4"><strong>{artist.name}</strong></h1>
          {artist.bio && <p className="subtitle is-6">Bio: {artist.bio}</p> }
         {artist.website &&  <p className="subtitle is-6">Sitio Web: <a href={artist.website}>{artist.website}</a></p>}
         <p className="subtitle is-6">Última Actualización: {new Date(artist.created_at).toLocaleDateString()}</p>
         {showFormEntry && <SongArtistForm onSave={handleSave}  id_artista={artist.id} />}
         <br />
         {showFormEntry && <button className="button is-success" onClick={handleshowFormEntry}>Volver</button>}
        </div>
     </div>



     {!showFormEntry &&
                    <>
                      <button  className= {` is-small button ${!showEntries ? 'is-link is-outlined' : 'is-danger is-outlined'}`} onClick={handleShowEntries}>
                      {showEntries ? 'Ocultar Canciones' : `Mostrar Canciones ${artist.songs.length > 0 ? `(${artist.songs.length})` : ''}`}
                      </button>
                      <br />
                      <br />
                    </>
                    }


        {showEntries && !showFormEntry &&
        <button className="button" onClick={handleshowFormEntry} > Agregar cancion </button>}

     {profileData.user__id === artist.owner && (
       <div className="buttons">
                   {isLoad ? <h1>Cargando...</h1>
        : 
        <>
          {!showEntries &&
          <>
          <button className="button is-warning" onClick={() => handleEdit(artist)}>Editar</button>
          <button className="button is-danger" onClick={() => handleDelete(artist.id)}>Eliminar</button>
        </>
          }
          </>
        }
       </div>
     )}



        {showEntries && (
                    <div>
                      {isLoad ? <h1>Cargando...</h1> :
                      <div>
                        {song_artistData.map( song_artist => (
                          song_artist.artist === artist.id && (
                            <div key={song_artist.id} >
                              {songData.map(song => (
                                song.id === song_artist.song && (
                                <div key={song.id} className='card'>
                                  <div className='content'>
                                    <strong># {song.title} </strong><i>    ({song_artist.role})</i>   
                                    <small><br />Fecha: {new Date(song_artist.created_at).toLocaleDateString()}</small>
                                    <br />
                                    <audio controls>                          
                                      <source src={song.song_file} type="audio/mpeg" />
                                    </audio>
                                    {profileData.user__id===song_artist.owner && 
                                    <button  onClick={() => handleDeleteEntry(song_artist.id)} className='button is-ghost'>-</button>}                            
                                    <br />
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

export default ArtistCard;