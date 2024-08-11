import React from 'react';
import "./App.css" 


const SongCard = ({ item, type, onDelete, onEdit }) => {
  const renderContent = () => {

    switch (type) {
      case 'song':
        return (
          <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src={item.cover}
                      alt={item.title}
                    />
                  </figure>
                </div>
              
                <div className="media">
                        <div className="media-content">
                          <p className="title is-5" style={{  maxHeight: '100px' }}>{item.title}</p>
                          {/* <p className="subtitle is-6">{item.artist}</p>*/}
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
          <div className="card"
              style={{width: "100%", 
                      height: "100%",}}
          >
              <div className="card-image">
                <figure className="image is-4by3">
                  <img
                    src={item.cover}
                    alt={item.title}
                  />
                </figure>
              </div>
            
              <div className="media">
                      <div className="media-content ">
                        <p className="title is-6 has-text-link" style={{ maxHeight: '100px' }}>{item.title}</p>
                      </div>
              </div>
                
              <div className="media">
                      <div className="media-content">
                        <p className="subtitle is-6 ">Año: {item.year}</p>
                      </div>
              </div>

              <div className="media">
                      <div className="media-content">
                        <p className="subtitle is-6 has-text-info">Creado: {item.created_at}</p>
                      </div>
              </div>
          </div>

          
        );
      case 'artist':
        return (
        <div className="card"
          style={{width: "100%", 
                height: "100%",}}>
            <div className="card-image">
              <figure className="image is-4by3">
                <img  src={item.image} alt={item.name} />
              </figure>
            </div>

            <div className="media">
                <div className="media-content">
                  <p className="title is-6" style={{  maxHeight: '100px' }}>{item.name}</p>
                </div>
            </div>

            <div className="media"
            style={{height: "50px",}}>
                <div className="media-content">
                  <p className="subtitle is-6" style={{ overflow: 'auto', maxHeight: '60px' }}>{item.bio}</p>
                </div>
            </div>

            <div className="media">
                <div className="media-content">
                <a href={item.website} className="button is-link">Website</a>
                </div>
            </div>

            <div className="media">
                <div className="media-content">
                <p className="subtitle is-6">Actualizado: {item.updated_at}</p>
                </div>
            </div>
 
          </div>
        );
      case 'playlist':
        return (
          <div className="card"
          style={{width: "100%", 
                  height: "100%",}}
          >
              <div className="media">
                      <div className="media-content ">
                        <p className="title is-6 has-text-link" >{item.name}</p>
                      </div>
              </div>
                
              <div className="media">
                      <div className="media-content">
                        <p className="subtitle is-6 " style={{ overflow: 'auto', maxHeight: '100px' }}>Descripción: {item.description}</p>
                      </div>
              </div>

              <div className="media">
                      <div className="media-content">
                        <p className="subtitle is-6 has-text-info">Creado: {item.created_at}</p>
                      </div>
              </div>

              <div className="media">
                      <div className="media-content">
                        <p className="subtitle is-6 has-text-info">Actualizado: {item.updated_at}</p>
                      </div>
              </div>

              <div className="media">
                      <div className="media-content">
                        <p className="subtitle is-6 has-text-info">Entradas: {item.entries}</p>
                      </div>
              </div>
          </div>
          
            

          
        );
      case 'genre':
        return (
          <div className="card"
          style={{width: "100%", 
                  height: "100%",}}
          >
              <div className="media">
                      <div className="media-content ">
                        <p className="title is-5 has-text-link" >{item.name}</p>
                      </div>
              </div>
                
              <div className="media">
                      <div className="media-content">
                        <p className="subtitle is-6" style={{ overflow: 'auto', maxHeight: '100px' }}>Descripción: {item.description}</p>
                      </div>
              </div>

              <div className="media">
                      <div className="media-content">
                        <p className="subtitle is-6 has-text-info">Creado: {item.created_at}</p>
                      </div>
              </div>

              <div className="media">
                      <div className="media-content">
                        <p className="subtitle is-6 has-text-info">Actualizado: {item.updated_at}</p>
                      </div>
              </div>
        </div>
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
                 </>
              )}
            </div>
        </div>
  );
};

export default SongCard;
