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
        <button onClick={handleCreate}>Nuevo Genero</button>
        {isCreating ? (<GenreForm onSave={handleSave} />) :
         (<ListaElemento ruta="genres" nombre="Generos" ItemComponent={GenreCard} />)}
      </div>
    );
  };
  
  export default GenrePage;
  