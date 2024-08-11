import React, { useState } from 'react';
import { createSong, updateSong } from '../../services/api';

const SongForm = ({ song = {}, onSave }) => {
  const [cover, setCover] = useState(song.cover || '');
  const [title, setTitle] = useState(song.title || '');
  const [year, setYear] = useState(song.year || '');
  const [album, setAlbum] = useState(song.album || '');
  const [songFile, setSongFile] = useState(null); // Inicializamos como null para almacenar el archivo

  const handleFileChange = (e) => {
    setSongFile(e.target.files[0]); // Almacenamos el archivo seleccionado
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('year', year);
    formData.append('album', album);

    if (songFile) {
      formData.append('song_file', songFile); // Añadimos el archivo al FormData
    }

    try {
      if (song.id) {
        await updateSong(song.id, formData); // Enviamos FormData para actualizar
      } else {
        await createSong(formData); // Enviamos FormData para crear
      }
      onSave();
    } catch (error) {
      alert('Error saving song: ' + error.message);
    }
  };

  return (
    <div className="card"
    style={{width: "700px",
      height: "100%",}}>
      <form onSubmit={handleSubmit}>
          <div className="card-content">
                <label className="label">Iagen de Portada:</label>
                <input class="input is-focused"
                    type="file"
                    accept=".jpg"//"image/*"
                    id="cover"
                    name="cover"
                    value={cover}
                    onChange={(e) => setCover(e.target.value)}
                    
                />
          </div>

          <div className="card-content">
            <label className='label' >Título</label>
            <input class="input is-focused" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="card-content">
            <label className='label'>Año</label>
            <input class="input is-focused" type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
          </div>

          <div className="card-content">
            <label className='label'>Álbum</label>
            <input class="input is-focused" type="number" value={album} onChange={(e) => setAlbum(e.target.value)} />
          </div>

          <div className="card-content">
            <label className='label'>Canción (Archivo .mp3)</label>
            <input class="input is-focused" type="file" accept=".mp3" onChange={handleFileChange} />
          </div>

          <div  class="field">
            <button className="button is-link" type="submit">Guardar</button>
          </div>
          
      </form>
    </div>
  );
};

export default SongForm;


/* 
import React, { useState } from 'react';
import { createSong, updateSong } from '../../services/api';

const SongForm = ({ song = {}, onSave }) => {
  const [title, setTitle] = useState(song.title || '');
  const [year, setYear] = useState(song.year);
  const [album, setAlbum] = useState(song.album);
  const [song_file, setSong_file] = useState(song.setSong_file);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const songData = { title, year, album, song_file };
    try {
      if (song.id) {
        await updateSong(song.id, songData);
      } else {
        await createSong(songData);
      }
      onSave();
    } catch (error) {
      alert('Error saving song: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Titulo</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Año</label>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
      </div>
      <div>
        <label>Album</label>
        <input type="number" value={album} onChange={(e) => setAlbum(e.target.value)} />
      </div>
     
      <div>
        <label>Cancion</label>
        <input type="file" value={song_file} onChange={(e) => setSong_file(e.target.value)} />
      </div>
     
      <button type="submit">Guardar</button>

    </form>
  );
};

export default SongForm;
*/
