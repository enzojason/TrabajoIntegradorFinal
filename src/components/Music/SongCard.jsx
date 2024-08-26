import React , { useState } from 'react';

import "./App.css" 
import album from '../../assets/album.png'
import artist from '../../assets/artista.png'
import playlist from '../../assets/playlist.png'
import genre from '../../assets/genero.png'

import AlbumDetail from "./AlbumDetail";
import ArtistDetail from "./ArtistDetail";
import PlaylistDetail from "./PlaylistDetail";
import GenreDetail from "./GenreDetail";
import Modal from './Modal'; 

const SongCard = ({ item, type, onDelete, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleCardClick = () => {
    setModalContent(type);
    setIsModalOpen(true);
  };

const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const renderContent = () => {

    switch (type) {
      case 'song':
        return (
          <div className="card" >
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
                          <p className="title is-6" style={{  maxHeight: '100px' }}>{item.title}</p>
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
          <div className="card" onClick={handleCardClick}
              style={{width: "100%", 
                      height: "100%",}}
          >
              <div className="card-image">
                <figure className="image is-4by3">
                  <img
                    src={item.cover || album}
                    alt={item.title}
                  />
                </figure>
              </div>
            
              <div className="media">
                      <div className="media-content ">
                        <p className="title is-6 " style={{ maxHeight: '100px' }}>{item.title}</p>
                      </div>
              </div>
                
              <div className="media">
                      <div className="media-content" style={{ fontSize: '13px' }}>
                        <p >Año: {item.year}</p>

                      </div>

              </div>
          </div>

        );
      case 'artist':
        return (
        <div className="card" onClick={handleCardClick}
          style={{width: "100%", 
                height: "100%",}}>
            <div className="card-image">
              <figure className="image is-4by3">
                <img  src={item.image || artist} alt={item.name} />
              </figure>
            </div>

            <div className="media">
                <div className="media-content">
                  <p className="title is-6" style={{  maxHeight: '100px' }}>{item.name}</p>
                </div>
            </div>

            <div className="media">
                <div className="media-content" style={{ fontSize: '13px' }}>
                <a href={item.website} className="button is-link is-small">Website</a>

                <div className="media-content" style={{ fontSize: '13px' }} >
                        {item.entries>0 ? (<p className="has-text-info">Numero de Entrdas: {item.entries}</p>)
                                        :(<div className="has-text-info">Sin Entrdas</div>)}
                      </div>
                </div>
  
            </div>

          </div>
        );

      case 'playlist':
        return (
          <div className="card" onClick={handleCardClick}
          style={{width: "100%", 
                  height: "100%",}}
          >
              <div className="card-image">
                <figure className="image is-4by3">
                  <img  src={item.image || playlist} alt={item.name} />
                </figure>
              </div>

              <div className="media">
                      <div className="media-content ">
                        <p className="title is-6 " >{item.name}</p>
                      </div>
              </div>
                
              <div className="media">
                      <div className="media-content">
                        <p className="subtitle is-6 " style={{ overflow: 'auto', maxHeight: '100px', fontSize: '13px' }}><span className="has-text-weight-bold">Descripción:</span> {item.description}</p>
                      </div>
                </div>
          
          </div>

        );
      case 'genre':
        return (
          <div className="card" onClick={handleCardClick}
          style={{width: "100%", 
                  height: "100%",}}
          >
              <div className="card-image">
                <figure className="image is-4by3">
                  <img  src={item.image || genre} alt={item.name} />
                </figure>
              </div>
              <div className="media">
                      <div className="media-content ">
                        <p className="title is-6 " >{item.name}</p>
                      </div>
              </div>
                
              <div className="media">
                      <div className="media-content">
                        <p className="subtitle is-6" style={{ overflow: 'auto', maxHeight: '100px', fontSize: '13px'  }}><span className="has-text-weight-bold">Descripción:</span> {item.description}</p>
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
          {isModalOpen && (
            <Modal onClose={handleCloseModal}>
              {modalContent === 'song' && <SongDetail song={item} />}  {/* Suponiendo que tienes un componente SongDetail */}
              {modalContent === 'album' && <AlbumDetail album={item} />}
              {modalContent === 'artist' && <ArtistDetail artist={item} />}
              {modalContent === 'playlist' && <PlaylistDetail playlist={item} />}
              {modalContent === 'genre' && <GenreDetail genres={item} />}
            </Modal>
      )}
        </div>
  );
};

export default SongCard;

/*
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
                          {/* <p className="subtitle is-6">{item.artist}</p>/}
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
*/