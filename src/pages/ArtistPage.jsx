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
        <button onClick={handleCreate}>Nuevo Artista</button>
        {isCreating ? (<ArtistForm onSave={handleSave} />) :
         (<ListaElemento ruta="artists" nombre="Artistas" ItemComponent={ArtistCard} />)}
        
        </div>
    );
  };
  
  export default ArtistPage;
  
