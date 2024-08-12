// eslint-disable-next-line no-unused-vars
import  { useState } from 'react';
import ListaElemento from '../components/WorkerList';
import AlbumbCard from '../components/Album/AlbumCard';
import AlbumForm from '../components/Album/AlbumForm';

const AlbumPage = () => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    //manejador de crear album
    setIsCreating(true);
  };

  const handleSave = () => {
    //manejador de guardar album
    setIsCreating(false);
  };

  

  return (
    <div>
      <div className="hero-body">
          <div className='column .is-offset-x'></div>
          <div className='column .is-offset-x'></div>

          <p className="title has-text-centered is-size-1">Albunes</p>
      </div>
      <div className='column .is-offset-x'></div>
      <div className='column .is-offset-x'></div>
    <button onClick={handleCreate}  className='button is-white'>Nuevo Album</button>
    <div className='column .is-offset-x'></div>

    {isCreating ? (<AlbumForm onSave={handleSave} />) : (<ListaElemento ruta="albums" nombre="Albums" ItemComponent={AlbumbCard}/>)}
    
  </div>
  );
};

export default AlbumPage;
