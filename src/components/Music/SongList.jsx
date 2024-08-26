import useFetch from "../../hooks/useFetch";
import SongCard from "./SongCard";
import SongForm from './SongForm';
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import AlbumDetail from "./AlbumDetail";
import ArtistDetail from "./ArtistDetail";
import PlaylistDetail from "./PlaylistDetail";
import GenreDetail from "./GenreDetail";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import '../../../node_modules/bulma/css/bulma.min.css';
import Buscar from "./Buscar"

function SongList({tipo}) {
    const { user } = useAuth("state");
    //const { user } = state;

    const [selectedItem, setSelectedItem] = useState(null); //Para modal
    const [isModalOpen, setIsModalOpen] = useState(false); //Para modal

    const [type, setType] = useState(tipo); // Estado para el tipo de contenido (por defecto filta por canción.)
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/${type}s/`, // Cambia la URL según el tipo  (?page_size=100)
        {}
    );

    const [items, setItems] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [filterByUser, setFilterByUser] = useState(false);

    const [isCreating, setIsCreating] = useState(false);
    //const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);

    //Para modal
    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    useEffect(() => {
        doFetch();
    }, [type]); // Hace un Refetch cuando cambia el tipo

    useEffect(() => {
        if (data && Array.isArray(data.results)) {
            let filteredData = data.results;
            if (filterByUser && user) {
                filteredData = filteredData.filter(item => item.owner === user.user__id);
            }
            setItems(filteredData);
            setNextPage(data.next);
            setPreviousPage(data.previous);
        } else {
            setItems([]);
        }
    }, [data, filterByUser, user]);


    const handleSave = () => {
    setEditingItem(null);
    };

    const fetchPage = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        setItems(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
    };

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar los ítems.</p>;
    if (!data) return <p>No hay ítems disponibles</p>;

    return (
        <div>
            <div className="my-5">
                <div className="select">
                    <select onChange={(e) => setType(e.target.value)} value={type}>
                        <option value="song">Canciones</option>
                        <option value="album">Álbumes</option>
                        <option value="artist">Artistas</option>
                        <option value="playlist">Playlists</option>
                        <option value="genre">Géneros</option>
                    </select>
                </div>

                  <div className="columns is-vcentered is-mobile">

                    <div className="column is-narrow">
                        {previousPage && 
                        <button className="button has-background-light" onClick={() => fetchPage(previousPage)}>
                                <span className="icon has-text-primary">
                                        <i className="fas fa-arrow-left"></i>
                                </span>
                        </button>
                        }
                    </div>
                    <div className="column">
                        <div className="columns is-mobile is-2">
                            {items.slice(0,5).map((item) => (
                                <div key={item.id} className="column is-one-fifth">
                                    <SongCard 
                                        item={item} 
                                        type={type}
                                        onClick={() => handleItemClick(item)}
                                        onDelete={() => handleDelete(item.id)} 
                                        onEdit={() => handleEdit(item)} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {isModalOpen && (
                        <div className="modal is-active">
                            <div className="modal-background" onClick={closeModal}></div>
                            <div className="modal-content">
                                {/* Renderiza el componente de detalle basado en el tipo */}
                                {type === "artist" && <ArtistDetail artist={selectedItem} />}
                                {type === "genre" && <GenreDetail genre={selectedItem} />}
                                {type === "playlist" && <PlaylistDetail playlist={selectedItem} />}
                                {type === "album" && <AlbumDetail album={selectedItem} />}
                                {/* Agrega más condiciones para otros tipos */}
                            </div>
                            <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
                        </div>
                    )}

                    <div className="column is-narrow">
                        {nextPage && 
                        <button className="button has-background-light" onClick={() => fetchPage(nextPage)}>
                                <span className="icon has-text-primary">
                                        <i className="fas fa-arrow-right"></i>
                                </span>
                        </button>
                        }
                    </div>
                </div>


                {editingItem && (
                    <SongForm 
                    item={editingItem} 
                    onSave={handleSave} 
                    />
                )}
            </div>
        </div>
    );
}

export default SongList;

/*

              {user && (
                    <div className="field">
                        <input 
                            type="checkbox" 
                            id="filterByUser" 
                            checked={filterByUser}
                            onChange={(e) => setFilterByUser(e.target.checked)}
                        />
                        <label className='label' htmlFor="filterByUser">Filtrar por mi usuario</label>
                    </div>
                )}

                <span c class="icon is-small is-left">
                    <FontAwesomeIcon icon={faUser} />
                </span>
                <div className="select">
                    <select onChange={(e) => setType(e.target.value)} value={type}>
                        <option value="song">Canciones</option>
                        <option value="album">Álbumes</option>
                        <option value="artist">Artistas</option>
                        <option value="playlist">Playlists</option>
                        <option value="genre">Géneros</option>
                    </select>
                </div>
                                <h2 className="title">Lista de {type.charAt(0).toUpperCase() + type.slice(1)}s</h2>
                <h2 className="title">Lista de {type}</h2>
*/