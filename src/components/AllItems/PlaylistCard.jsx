import React, { useState } from "react";
import SongCard from "./SongCard"; 
import Modal from "./Modal"; 
import PlaylistForm from "./PlaylistForm";
import playlistIco from "../../assets/playlist.png";

function PlaylistCard({ playlist, user }) {
    const [isModalActive, setIsModalActive] = useState(false);
    const [showSongs, setShowSongs] = useState(false);
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    if (!playlist) {
        return null;
    }

    const isOwner = user?.user__id === playlist.owner;
    const hasEntries = Array.isArray(playlist.entries) && playlist.entries.length > 0;

    const handleEditClick = () => {
        setIsModalActive(true);
    };

    const handleDeleteClick = async () => {
        const token = localStorage.getItem("authToken");
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/playlists/${playlist.id}/`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Token ${token}`
                  }
            });

            if (!response.ok) {
                throw new Error("Error al eliminar la playlist");
            }
            alert('Playlist Eliminada con EXITO.');
            // Aquí puedes agregar lógica para actualizar la UI después de eliminar la playlist
        } catch (error) {
            console.error("Error eliminando la playlist:", error);
            // Manejar el error
        }
        finally{
            window.location.reload();
          }
    };

    const handleAddItemClick = () => {
        // Aquí podrías abrir un modal o una ventana emergente para seleccionar y agregar una canción
    };

    const toggleShowSongs = () => {
        if (!showSongs && songs.length === 0) {
            setIsLoading(true);
            fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/playlist-entries/?playlist=${playlist.id}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.results) {
                        const songList = data.results.map(entry => entry.song);
                        setSongs(songList);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching songs:", error);
                    setIsError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        setShowSongs((prevShowSongs) => !prevShowSongs);
    };

    return (
        <div className="card has-background-dark" style={{width: "300px", height: "100%"}}>
            <div className="card-image">
                <figure className="image is-4by3">
                    {playlist.cover ? (
                        <img src={playlist.cover} alt={playlist.name} />
                    ) : (
                        <img src={playlistIco} alt="placeholder" />
                    )}
                </figure>
            </div>

            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4 has-text-white">{playlist.name}</p>
                        <p className="subtitle is-6 has-text-grey-light">
                            {playlist.description}
                        </p>
                    </div>
                </div>

                {isOwner && (
                    <div className="buttons">
                        <button className="button is-info" onClick={handleEditClick}>Editar</button>
                        <button className="button is-danger" onClick={handleDeleteClick}>Eliminar</button>
                        <button className="button is-primary" onClick={handleAddItemClick}>Agregar Elemento</button>
                    </div>
                )}

                {(hasEntries || (isOwner && songs.length > 0)) && (
                    <button className="button is-light mt-3" onClick={toggleShowSongs}>
                        {showSongs ? "Ocultar Canciones" : "Mostrar Canciones"}
                    </button>
                )}

                {showSongs && (
                    <div className="song-list mt-4">
                        {isLoading ? (
                            <p>Cargando canciones...</p>
                        ) : isError ? (
                            <p>Error al cargar las canciones.</p>
                        ) : (
                            songs.map((song) => (
                                <SongCard key={song.id} song={song} />
                            ))
                        )}
                    </div>
                )}

                {isModalActive && (
                    <Modal onClose={() => setIsModalActive(false)}>
                        <PlaylistForm playlist={playlist} onClose={handleCloseModal} />
                    </Modal>
                )}
            </div>
        </div>
    );
}

export default PlaylistCard;


/*
import React, { useState, useEffect } from "react";
import SongCard from "./SongCard"; 
import Modal from "./Modal"; 
import PlaylistForm from "./PlaylistForm";
import playlistIco from "../../assets/playlist.png"

function PlaylistCard({ playlist, user }) {
    const [isModalActive, setIsModalActive] = useState(false);

    //const [showModal, setShowModal] = useState(false);

    const [showSongs, setShowSongs] = useState(false);
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    // Validar si el objeto playlist existe antes de intentar acceder a sus propiedades
    if (!playlist) {
        return null;
    }

    const isOwner = user?.user__id === playlist.owner//?.id;
    const hasEntries = Array.isArray(playlist.entries) && playlist.entries.length > 0;

    const handleEditClick = () => {
        setIsModalActive(true);
    };
    const handleCloseModal = () => {
        setIsModalActive(false);
(false);
    };

    const handleDeleteClick = () => {
        // Lógica para eliminar la playlist
    };

    const handleAddItemClick = () => {
        setShowModal(true);
    };

    const toggleShowSongs = () => {
        if (!showSongs && songs.length === 0) {
            setIsLoading(true);
            fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/playlist-entries/?playlist=${playlist.id}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.results) {
                        const songList = data.results.map(entry => entry.song);
                        setSongs(songList);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching songs:", error);
                    setIsError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        setShowSongs((prevShowSongs) => !prevShowSongs);
    };

    return (
        <div className="card has-background-dark"
        style={{width: "300px", 
            height: "100%",}}
            >

            <div className="card-image">
                <figure className="image is-4by3">
                    {playlist.cover ? (
                        <img src={playlist.cover} alt={playlist.name} />
                    ) : (
                        <img
                            src={playlistIco} // Proporciona una imagen de marcador de posición si no hay imagen
                            alt="placeholder"
                        />
                    )}
                </figure>
            </div>

            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4 has-text-white">{playlist.name}</p>
                        <p className="subtitle is-6 has-text-grey-light">
                            {playlist.description}
                        </p>
                    </div>
                </div>

                {isOwner && (
                    <div className="buttons">
                        <button className="button is-info" onClick={handleEditClick}> Editar</button>
                        <button className="button is-danger" onClick={handleDeleteClick}>Eliminar</button>
                        <button className="button is-primary"onClick={handleAddItemClick}>Agregar Elemento</button>
                    </div>
                )}

                {(hasEntries || (isOwner && songs.length > 0)) && (
                    <button
                        className="button is-light mt-3"
                        onClick={toggleShowSongs}
                    >
                        {showSongs ? "Ocultar Canciones" : "Mostrar Canciones"}
                    </button>
                )}

                {showSongs && (
                    <div className="song-list mt-4">
                        {isLoading ? (
                            <p>Cargando canciones...</p>
                        ) : isError ? (
                            <p>Error al cargar las canciones.</p>
                        ) : (
                            songs.map((song) => (
                                <SongCard key={song.id} song={song} />
                            ))
                        )}
                    </div>
                )}

                {isModalActive && (
                    <Modal onClose={() => setShowModal(false)}>
                        <PlaylistForm />
                        {/* Formulario de edición/agregar nuevo elemento va aquí *}
                    </Modal>
                )}
            </div>
        </div>
    );
}

export default PlaylistCard;
*/



