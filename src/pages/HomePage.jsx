import React, { useState } from 'react';
import SongList from '../components/Music/SongList';
import SongForm from '../components/Music/SongForm';

const HomePage = () => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleSave = () => {
    setIsCreating(false);
  };

  return (
    <div className='has-text-light'>
      
            
      {isCreating ? (<SongForm onSave={handleSave} />) : 
      (<div> 
        <SongList  tipo="song"/>
        <SongList  tipo="artist" />
      </div>)}
    </div>
  );
};

export default HomePage;
