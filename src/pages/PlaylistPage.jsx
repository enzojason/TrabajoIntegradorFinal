import ListaElemento from '../components/WorkerList';
import PlaylistCard from '../components/Playlist/PlaylistCard';
import PlaylistForm from '../components/Playlist/PlaylistForm';
import EntrieForm from '../components/Playlist/EntrieForm';
import { useState } from 'react';

const PlaylistPage = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [currentForm,setForm] = useState("");

    const handleCreate = () => {
        //manejador de crear playlist
        setIsCreating(true);
        setForm("playlist");
    };
        const handleCreateEntrie = () => {
            //manejador de crear entrada
            setIsCreating(true);
            setForm("entrie");
        }

    const handleSave = () => {
        //manejador de guardar playlist
        setIsCreating(false);
        setForm("playlist");
    };

    const handleSaveEntrie = () => {
        //manejador de guardar entrada
        setIsCreating(false);
        setForm("entrie");
    }
    
    return (
        <div className="mr-5">
            <div className="hero-body">
          <div className='column .is-offset-x'></div>
          <div className='column .is-offset-x'></div>

          <p className="title has-text-centered is-size-1">Playlists</p>
        </div>
            <div className='column .is-offset-x'></div>
        <div className='column .is-offset-x'></div>
            <div  class="field is-grouped">
                <button className='button is-white' onClick={handleCreate}>Nueva Playlist</button>
                <button className='button is-white' onClick={handleCreateEntrie}>Nueva Entrada</button>
            </div>
            <div>
                {isCreating ? (
                    currentForm === 'playlist' ? (
                    <PlaylistForm onSave={handleSave} />
                    ) : (
                    <EntrieForm onSave={handleSaveEntrie} />
                    )
                ) : (
                    <ListaElemento ruta="playlists" nombre="Playlists" ItemComponent={PlaylistCard } />
                )}
            </div>
        </div>
    );
  };
  
  export default PlaylistPage;