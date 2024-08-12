import  { useState } from 'react';
import SongForm from '../components/Songs/SongForm';
import ListaElemento from '../components/WorkerList';
import SongCard from '../components/Songs/SongCard';

const SongsPage = () => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    //manejar la creacion de una nueva cancion
    setIsCreating(true);
  };

  const handleSave = () => {
    //manejar el guardado de una nueva
    setIsCreating(false);
  };

  

  return (
    <div>
          <div className="hero-body">
          <div className='column .is-offset-x'></div>
          <div className='column .is-offset-x'></div>
            <p className="title has-text-centered is-size-1">Canciones</p>
          </div>
          <div className='column .is-offset-x'></div>
        <div className='column .is-offset-x'></div>
        <div className='buttons'>
          <button onClick={handleCreate} className='button is-white'>Nueva cancion</button>
        </div>
      
      {isCreating ? (<SongForm onSave={handleSave} />) : (<ListaElemento ruta="songs" nombre="Songs" ItemComponent={SongCard} />)}
    </div>
  );
};

export default SongsPage;
