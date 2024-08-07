import React, { useState } from 'react';
import SongList from '../components/Music/SongList';
import SongForm from '../components/Music/SongForm';

const SongsPage = () => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleSave = () => {
    setIsCreating(false);
  };

  return (
    <div className='has-text-light'>
      <h1>Canciones</h1>
      <button onClick={handleCreate}>Nueva Cancion</button>
      {isCreating ? (<SongForm onSave={handleSave} />) : (<SongList />)}
    </div>
  );
};

export default SongsPage;
