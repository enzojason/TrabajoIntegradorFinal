import ListaElemento from '../components/WorkerList';
import GenreCard from '../components/Genre/GenreCard';
import { useState } from 'react';
import GenreForm from '../components/Genre/GenreForm';

const GenrePage = () => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleSave = () => {
    setIsCreating(false);
  };
    return (
      <div>
        <div className="hero-body">
          <div className='column .is-offset-x'></div>
          <div className='column .is-offset-x'></div>

          <p className="title has-text-centered is-size-1">Generos</p>
        </div>
        <div className='column .is-offset-x'></div>
        <div className='column .is-offset-x'></div>

        <button onClick={handleCreate} className='button is-white'>Nuevo Genero</button>
        <div className='column .is-offset-x'></div>

        {isCreating ? (<GenreForm onSave={handleSave} />) :
         (<ListaElemento ruta="genres" nombre="Generos" ItemComponent={GenreCard} />)}
      </div>
    );
  };
  
  export default GenrePage;
  