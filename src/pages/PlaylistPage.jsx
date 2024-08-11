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
        <div>
        <button onClick={handleCreate}>Nueva Playlist</button>
        <br />
        <button onClick={handleCreateEntrie}>Nueva Entrada</button>
        <br />
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
    );
  };
  
  export default PlaylistPage;