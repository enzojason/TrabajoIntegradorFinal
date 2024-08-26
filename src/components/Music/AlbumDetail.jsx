import React from 'react';
import { useState } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { useContext } from 'react';
import { deleteComponent ,updateComponent} from '../../services/api';
import AlbumForm from '../Album/AlbumForm';

import albumIMG from '../../assets/album.png'

function AlbumDetail({ album }) {
    const { artistData, isLoading, isError } = useContext(DataContext);
    const { profileData } = useContext(DataContext);
  
    const [isCreating, setIsCreating] = useState(false);
    
    
    const handleSave = () => {
      //manejador de guardar album
      setIsCreating(false);
    };
  
    const handleDelete = async (id) => {
      //manejador de eliminar album y las elimina en un fetch
      try{
        await deleteComponent('albums', id);  
        console.log("delete album: ",id);
        console.log("eliminado");
        alert('Album deleted successfully');
      }
      catch(error){
        alert('Error deleting album: ' + error.message);
  
      }
      finally{
        setIsCreating(false);
        window.location.reload(); //Rescarga la pagina
      }
      
  }
  
  const handleEdit = (album) => {
    //manejador de editar album
      setIsCreating(true);  
      console.log('EDITAR', album);
      
    };
  
    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar los datos</p>;

    return (
        <div>
            {isCreating ? (<AlbumForm onSave={handleSave} album={album} />) : (
            <div className="card">
                <div className="card-content">
                    <div className="media">
                            <div className='media-left'>
                            <figure className="image is-30x30">
                            <img src={album.cover || albumIMG} alt="" style={{maxWidth:'500px',maxHeight:'500px'}} />
                            </figure>
                        </div>

                        <div className="media-content">
                                <p>Albúm: <strong>{album.title}</strong></p>
                            {artistData.map(artist => (
                                artist.id === album.artist && (
                                <div key={artist.id}>
                                    < h2>Artista: <strong>{artist.name}</strong></h2>
                                    <p>Año: {album.year}</p>
                                    <p>Fecha de creación: {new Date(album.created_at).toLocaleDateString()}</p>  
                                    <p> Actualizado: {new Date(album.updated_at).toLocaleDateString()}</p>
                                    <div className="media-content" style={{ fontSize: '13px' }}>
                                      {album.entries>0 ? (<p className="has-text-info">Entradas: {item.entries}</p>)
                                                      :(<div className="has-text-info">Sin Entradas</div>)}
                                    </div>
                                </div>
                                )
                            ))}
                        </div>

                    </div>
                        {profileData.user__id === album.owner && (
                            <div className="buttons">
                                <button className="button is-warning" onClick={() => handleEdit(album)}>Editar</button>
                                <button className="button is-danger" onClick={() => handleDelete(album.id)}>Eliminar</button>
                            </div>
                        )}
              

                </div>
            </div>  
         )}
             
        </div>
    );
}

export default AlbumDetail;