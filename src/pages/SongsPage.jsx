import  { useState } from 'react';
import SongForm from '../components/Song/SongForm';
import ListaElemento from '../components/WorkerList';
import SongCard from '../components/Song/SongCard';

const SongsPage = () => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleSave = () => {
    setIsCreating(false);
  };

  

  return (
    <div>
      <h1>Canciones</h1>
      
      <button onClick={handleCreate}>Nueva Cancion</button>
      {isCreating ? (<SongForm onSave={handleSave} />) : (<ListaElemento ruta="songs" nombre="Songs" ItemComponent={SongCard} />)}
    </div>
  );
};

export default SongsPage;
