/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { DataContext } from '../../contexts/DataContext';
import { useContext } from 'react';
import { useState } from 'react';
import { deleteComponent,updateComponent } from '../../services/api';
import GenreForm from './GenreForm';

const GenreCard = ({item:genres }) => {  
  const { profileData,isLoading,isError} = useContext(DataContext);
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = () => {
    //manejador de guardar genero
    setIsCreating(false);
  }

  const handleDelete = async (id) => {
    //manejador de eliminar genero y las elimina en un fetch
    try{
      setIsCreating(true);  
      await deleteComponent('genres', id);  
      console.log("delete genre: ",id);
      console.log("eliminado");
      alert('Genre deleted successfully');
    }
    catch(error){
      setIsCreating(false); 
      alert('Error deleting genre: ' + error.message);

    }
    finally{
      setIsCreating(false);
      window.location.reload(); //Rescarga la pagina
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
    <div className='column is-offset-x m-4'>
      {isCreating ? (<GenreForm onSave={handleSave} artist={genres} />) : (
        <div className='card'>
          <div className='card-content'>
            <div className=''>
                  <p className="title is-4"><strong>{genres.name}</strong></p>
                  <br />
                  <p className="subtitle is-6">{genres.description}</p>
                  <p >Fecha de creación: {new Date(genres.created_at).toLocaleDateString()}</p>
                  <p >Ultima Actualización: {new Date(genres.updated_at).toLocaleDateString()} </p>
                  <br />
                  {profileData.user__id === genres.owner && (
                  <div className="buttons">
                    <button className="button is-warning" onClick={() => handleEdit(genres)}>Editar</button>
                    <button className="button is-danger" onClick={() => handleDelete(genres.id)}>Eliminar</button>
                  </div>
                )}
                </div>
                </div>
                </div>
                )}
    </div>
  );
};

export default GenreCard;
