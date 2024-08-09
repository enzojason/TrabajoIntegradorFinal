// eslint-disable-next-line no-unused-vars
import  { useState } from 'react';
import ListaElemento from '../components/WorkerList';
import AlbumbCard from '../components/Album/AlbumCard';
import AlbumForm from '../components/Album/AlbumForm';

const AlbumPage = () => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleSave = () => {
    setIsCreating(false);
  };

  

  return (
    <div>
      <h1>Albunes </h1>
    
    <button onClick={handleCreate}>Nuevo Album</button>
    {isCreating ? (<AlbumForm onSave={handleSave} />) : (<ListaElemento ruta="albums" nombre="Albums" ItemComponent={AlbumbCard}/>)}
  </div>
  );
};

export default AlbumPage;
