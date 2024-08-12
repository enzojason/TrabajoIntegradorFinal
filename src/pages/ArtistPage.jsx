import ListaElemento from '../components/WorkerList';
import ArtistCard from '../components/Artist/ArtistCard';
import ArtistForm from '../components/Artist/ArtistForm';
import { useState } from 'react';

const ArtistPage = () => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    //manejador de crear artista
    setIsCreating(true);
  };

  const handleSave = () => {
    //manejador de guardar artista
    setIsCreating(false);
  };

    return (
      <div>
        <div className="hero-body">
          <div className='column .is-offset-x'></div>
          <div className='column .is-offset-x'></div>

          <p className="title has-text-centered is-size-1">Artistas</p>
        </div>
        <div className='column .is-offset-x'></div>
        <div className='column .is-offset-x'></div>

        <button onClick={handleCreate} className='button is-white'>Nuevo Artista</button>
        <div className='column .is-offset-x'></div>

        {isCreating ? (<ArtistForm onSave={handleSave} />) :
         (<ListaElemento ruta="artists" nombre="Artistas" ItemComponent={ArtistCard} />)}
        
        </div>
    );
  };
  
  export default ArtistPage;
  
