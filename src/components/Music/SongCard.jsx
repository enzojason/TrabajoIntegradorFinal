import React from 'react';

const SongCard = ({ song, onDelete, onEdit }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{song.title}</p>
            <p className="subtitle is-6">{song.artist}</p>
          </div>
        </div>
        <div className="content">
          <audio controls>
            <source src={song.song_file} type="audio/mpeg" />
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>
        <div className="buttons">
          <button className="button is-warning" onClick={() => onEdit(song)}>Editar</button>
          <button className="button is-danger" onClick={() => onDelete(song.id)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
