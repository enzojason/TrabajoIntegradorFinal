/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { DataContext } from '../../contexts/DataContext';
import { useContext } from 'react';
import { useState } from 'react';
import ArtistForm from './ArtistForm';
import { deleteComponent } from '../../services/api';

const ArtistCard = ({item:artist}) => {  
  const { albumData, isLoading, isError } = useContext(DataContext);
  const { profileData } = useContext(DataContext);
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = () => {
    setIsCreating(false);
  }

  const handleDelete = async (id) => {
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
    setIsCreating(true);  
    console.log('EDITAR', artist);
    
  };

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar los datos</p>;

  return ( 
    <div>
      {isCreating ? (<ArtistForm onSave={handleSave} artist={artist} />) : (
      <div className='card'>
        <div className='card-content'>
          <div className='media'>
              <div className=''>  
                <img src={artist.image} alt="" style={{width:'80px',height:'80px'}} />
                <h1 >Artista: <strong>{artist.name}</strong></h1>
                <p> Bio: {artist.bio}</p>
                <p>Sitio Web: {artist.website}</p>
                <p>Ulitma Actualización: {new Date(artist.created_at).toLocaleDateString()}</p>
                <br />
              </div>
              {profileData.user__id===artist.owner && 
              <div className="buttons">
                <button className="button is-warning" onClick={() => handleEdit(artist)}>Editar</button>
                <button className="button is-danger" onClick={() => handleDelete(artist.id)}>Eliminar</button>
              </div>
              }
              
          </div>
        </div>
      </div>   


          )}
    </div>
    
  );
};

export default ArtistCard;