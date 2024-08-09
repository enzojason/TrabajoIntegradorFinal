import React, { useState } from 'react';

const AddSongForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [songFile, setSongFile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && songFile) {
      onAdd({ title, song_file: songFile });
      setTitle('');
      setSongFile('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Título de la Canción</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="field">
        <label className="label">URL del Archivo de Canción</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={songFile}
            onChange={(e) => setSongFile(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button type="submit" className="button is-primary">Agregar Canción</button>
        </div>
      </div>
    </form>
  );
};

export default AddSongForm;
