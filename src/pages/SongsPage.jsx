import  { useState } from 'react';
import SongForm from '../components/Song/SongForm';
import ListaElemento from '../components/WorkerList';
import SongCard from '../components/Song/SongCard';

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
      <section className="hero is-primary">
          <div className="hero-body">
          <p className="title">Canciones</p>
          <p className="subtitle">lista de todas las canciones</p>
          </div>
        </section>
        <div className='buttons'>
          <button onClick={handleCreate} className='button'>Nueva cancion</button>
        </div>
      
      {isCreating ? (<SongForm onSave={handleSave} />) : (<ListaElemento ruta="songs" nombre="Songs" ItemComponent={SongCard} />)}
    </div>
  );
};

export default SongsPage;
