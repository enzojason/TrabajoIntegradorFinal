import React from 'react';
import "./App.css" 


const SongCard = ({ item, type, onDelete, onEdit }) => {
  const renderContent = () => {

    switch (type) {
      case 'song':
        return (
          <div class="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src={item.cover}
                      alt={item.title}
                    />
                  </figure>
                </div>
              
                <div class="media">
                        <div class="media-content">
                          <p class="title is-6">{item.title}</p>
                          {/* <p class="subtitle is-6">{item.artist}</p>*/}
                        </div>
                    </div>

                <div className="media">
                    <div className="media-content">
                        <audio controls style={{ width: '90%' }}>
                          <source src={item.song_file} type="audio/mpeg" />
                          Tu navegador no soporta el elemento de audio.
                        </audio>
                      </div>
              </div>
          </div>
        );
      case 'album':
        return (
          <>
            <p className="card-header-title">{item.title}</p>
            <p className="subtitle is-6">Artista:{item.artist}</p>
            <p className="subtitle is-6">Año: {item.year}</p>
            <p className="subtitle is-6">Creado: {item.created_at}</p>
          </>
        );
      case 'artist':
        return (
          <><div className="card-image">
              <figure className="image is-128x128">
                <img className="is-rounded" src={item.image} alt={item.name} />
              </figure>
            </div>

            <p className="title is-4">{item.name}</p>
            <p className="content">{item.bio}</p>
            <a href={item.website} className="button is-link">Website</a>
            <p className="subtitle is-6">Actualizado: {item.updated_at}</p>
          </>
        );
      case 'playlist':
        return (
          <>
            <p className="title is-4">{item.name}</p>
            <p className="subtitle is-6">{item.description}</p>
            <p className="subtitle is-6">Creado: {item.created_at_min}</p>
            <p className="subtitle is-6">Actualizado: {item.updated_at_max}</p>
            <p className="subtitle is-6">Entradas: {item.entries.length}</p>
          </>
        );
      case 'genre':
        return (
          <>
            <p className="title is-4">{item.name}</p>
            <p className="subtitle is-6">{item.description}</p>
            <p className="subtitle is-6">Creado: {item.created_at}</p>
            <p className="subtitle is-6">Actualizado: {item.updated_at}</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
        <div className="card">
                {renderContent()}
            <div className="buttons">
              {type === 'song' && (
                <>
                  <button className="button is-warning" onClick={() => onEdit(song)}>Editar</button>
                  <button className="button is-danger" onClick={() => onDelete(song.id)}>Eliminar</button>
                </>
              )}
            </div>
        </div>
  );
};

export default SongCard;


/*

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

*/
