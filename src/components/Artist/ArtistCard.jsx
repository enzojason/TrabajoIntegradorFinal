/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { DataContext } from '../../contexts/DataContext';
import { useContext } from 'react';
import { useState } from 'react';
import ArtistForm from './ArtistForm';
import { deleteComponent } from '../../services/api';

const ArtistCard = ({item:artist}) => {  
  //componente card de cada artista, se muestra los datos del artista y se puede editar o eliminar
  const { albumData, isLoading, isError } = useContext(DataContext);
  const { profileData } = useContext(DataContext);
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = () => {
    //manejador de guardar artista
    setIsCreating(false);
  }

  const handleDelete = async (id) => {
    //manejador de eliminar artista y las elimina en un fetch
    try{
      setIsCreating(true);  
      await deleteComponent('artists', id);  
      console.log("delete artist: ",id);
      console.log("eliminado");
      alert('Artist deleted successfully');
    }
    catch(error){
      setIsCreating(false); 
      alert('Error deleting artist: ' + error.message);

    }
    finally{
      setIsCreating(false);
      window.location.reload(); //Rescarga la pagina
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
         <h1 className="title is-4">Artista: <strong>{artist.name}</strong></h1>
          {artist.bio && <p className="subtitle is-6">Bio: {artist.bio}</p> }
         {artist.website &&  <p className="subtitle is-6">Sitio Web: <a href={artist.website}>{artist.website}</a></p>}
         <p className="subtitle is-6">Última Actualización: {new Date(artist.created_at).toLocaleDateString()}</p>
       </div>
     </div>
 
     {profileData.user__id === artist.owner && (
       <div className="buttons">
         <button className="button is-warning" onClick={() => handleEdit(artist)}>Editar</button>
         <button className="button is-danger" onClick={() => handleDelete(artist.id)}>Eliminar</button>
       </div>
     )}
   </div>
 </div>


          )}
    </div>
    
  );
};

export default ArtistCard;