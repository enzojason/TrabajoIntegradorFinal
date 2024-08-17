import { useState, useEffect } from "react";
import SongCard from "./SongCard";
import SongCard2 from "./SongCard2";
import PlaylistCard from "./PlaylistCard";
import PlaylistCard2 from "./PlaylistCard2";
import GenreCard from "./GenreCard";
import ArtistCard from "./ArtistCard";
import AlbumCard from "./AlbumCard";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ItemList() {
    const [page, setPage] = useState(1);
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [itemType, setItemType] = useState("songs");
    const [filterByUser, setFilterByUser] = useState(false);

    const endpointMap = {
        songs: `${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/?page=${page}&page_size=25`,
        playlists: `${import.meta.env.VITE_API_BASE_URL}harmonyhub/playlists/?page=${page}&page_size=25`,
        genres: `${import.meta.env.VITE_API_BASE_URL}harmonyhub/genres/?page=${page}&page_size=25`,
        artists: `${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/?page=${page}&page_size=25`,
        albums: `${import.meta.env.VITE_API_BASE_URL}harmonyhub/albums/?page=${page}&page_size=25`,
    };

    const { data } = useAuth("state");
    const userId = data?.user__id;
    const user = data;
    const navigate = useNavigate();

    const doFetch = async () => {
        setIsLoading(true);
        let allItems = [];
        let nextURL = endpointMap[itemType];
        
        while (nextURL) {
            try {
                const response = await fetch(nextURL);
                if (!response.ok) {
                    throw new Error("No se pudieron cargar los elementos");
                }
                const data = await response.json();
                allItems = [...allItems, ...data.results];
                nextURL = data.next;
            } catch (error) {
                setIsError(true);
                break;
            }
        }

        // Filtrar por usuario si el checkbox está activado
        if (filterByUser) {
            allItems = allItems.filter((item) => item.owner === userId);
        }

        setItems(allItems);
        setIsLoading(false);
    };

    const searchItems = async () => {
        setIsLoading(true);
        let results = [];
        let url = endpointMap[itemType].replace(`?page=${page}`, `?page=1`);

        while (url) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error al buscar elementos");
                }
                const data = await response.json();
                const filteredResults = data.results.filter((item) =>
                    item.name
                        ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
                        : item.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
                results = [...results, ...filteredResults];
                url = data.next;
            } catch (error) {
                setIsError(true);
                break;
            }
        }

        // Filtrar por usuario si el checkbox está activado
        if (filterByUser) {
            results = results.filter((item) => item.owner === userId);
        }

        setItems(results);
        setIsLoading(false);
    };
////////////////////////
    const handleDelete = async (itemId) => {
        try {
        await deleteItem(itemId);
        setItems(items.filter(item => item.id !== itemId)); // Actualizar el estado después de eliminar
        } catch (error) {
        alert('Error deleting item: ' + error.message);
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item); // Establece el ítem que se va a editar en el estado
      };
    
    const handleSave = () => {
    setEditingItem(null);
    };
///////////////////

    const handleCreateNewItem = () => {
        navigate(`/create/${itemType}`);
    };

    useEffect(() => {
        if (searchQuery) {
            searchItems();
        } else {
            doFetch();
        }
        
    }, [page, searchQuery, itemType, filterByUser]);

    return (
        <div style={{ margin: '20px' }}>
            <div className="my-5">
                <h2 className="title">Lista de {itemType.charAt(0).toUpperCase() + itemType.slice(1)}</h2>
                <div className="field">
                    <label className="label">Selecciona el tipo de elemento</label>
                    <div className="control">
                        <div className="select">
                            <select value={itemType} onChange={(e) => setItemType(e.target.value)}>
                                <option value="songs">Canciones</option>
                                <option value="playlists">Playlists</option>
                                <option value="playlistsModal">PlaylistsModal</option>
                                <option value="genres">Géneros</option>
                                <option value="artists">Artistas</option>
                                <option value="albums">Álbumes</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="checkbox">
                        <input
                            type="checkbox"
                            checked={filterByUser}
                            onChange={(e) => setFilterByUser(e.target.checked)}
                        />
                        Mostrar solo mis {itemType}
                    </label>
                </div>
                <input
                    type="text"
                    className="input"
                    placeholder={`Buscar ${itemType}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div>
                    <button className="button is-primary" onClick={handleCreateNewItem}>
                        Crear nuevo {itemType}
                    </button>
                </div>
                <div className="buttons">
                    <button className="button" onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}>
                        Página anterior
                    </button>
                    <button className="button" onClick={() => setPage((prevPage) => prevPage + 1)}>
                        Siguiente página
                    </button>
                </div>
                <div className="columns is-multiline is-centered" style={{ margin: '20px 0' }}>
                    {items.length > 0 ? (
                        items.slice((page - 1) * 25, page * 25).map((item) => (
                            <div key={item.id} className="column is-one-fifth">
                                {itemType === "songs" && <SongCard2 
                                                            item={item} 
                                                            type={"song"}
                                                            checked={filterByUser ? true : false}
                                                            onDelete={() => handleDelete(item.id)} 
                                                            onEdit={() => handleEdit(item)} 
                                                            />}
                                {itemType === "playlists" && <PlaylistCard playlist={item} user={user} />}
                                {itemType === "playlistsModal" && <PlaylistCard2 playlist={item} />}
                                {itemType === "genres" && <GenreCard genre={item} />}
                                {itemType === "artists" && <ArtistCard artist={item} />}
                                {itemType === "albums" && <AlbumCard album={item} />}
                            </div>
                        ))
                    ) : (
                        <div>
                            <p>Aún no has creado {itemType === "songs" ? "canciones" : itemType}</p>
                            <button className="button is-primary" onClick={handleCreateNewItem}>
                                Crear nuevo {itemType}
                            </button>
                        </div>
                    )}
                </div>
                {isLoading && <p>Cargando más {itemType}...</p>}
                <div className="buttons">
                    <button className="button" onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}>
                        Página anterior
                    </button>
                    <button className="button" onClick={() => setPage((prevPage) => prevPage + 1)}>
                        Siguiente página
                    </button>
                </div>
            </div>
            {isError && <p>Error al cargar los elementos</p>}
        </div>
    );
}

export default ItemList;



/*
import { useState, useEffect } from "react";
import SongCard from "./SongCard";
import PlaylistCard from "./PlaylistCard";
import PlaylistCard2 from "./PlaylistCard2";
import GenreCard from "./GenreCard";
import ArtistCard from "./ArtistCard";
import AlbumCard from "./AlbumCard";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ItemList() {
    
    const [page, setPage] = useState(1);
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [itemType, setItemType] = useState("songs");
    const [filterByUser, setFilterByUser] = useState(false);

    const endpointMap = {
        songs: `${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/?page=${page}&page_size=100`,
        playlists: `${import.meta.env.VITE_API_BASE_URL}harmonyhub/playlists/?page=${page}&page_size=100`,
        genres: `${import.meta.env.VITE_API_BASE_URL}harmonyhub/genres/?page=${page}&page_size=100`,
        artists: `${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/?page=${page}&page_size=100`,
        albums: `${import.meta.env.VITE_API_BASE_URL}harmonyhub/albums/?page=${page}&page_size=100`,
    };

    const { data } = useAuth("state");
    const userId = data?.user__id;
    const user = data;
    const navigate = useNavigate();

    const doFetch = async () => {
        setIsLoading(true);
        let allItems = [];
        let nextURL = endpointMap[itemType];
        
        while (nextURL) {
            try {
                const response = await fetch(nextURL);
                if (!response.ok) {
                    throw new Error("No se pudieron cargar los elementos");
                }
                const data = await response.json();
                allItems = [...allItems, ...data.results];
                nextURL = data.next;
            } catch (error) {
                setIsError(true);
                break;
            }
        }

        // Filtrar por usuario si el checkbox está activado
        if (filterByUser) {
            allItems = allItems.filter((item) => item.owner === userId);
        }

        setItems(allItems);
        setIsLoading(false);
    };

    const searchItems = async () => {
        setIsLoading(true);
        let results = [];
        let url = endpointMap[itemType].replace(`?page=${page}`, `?page=1`);

        while (url) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error al buscar elementos");
                }
                const data = await response.json();
                const filteredResults = data.results.filter((item) =>
                    item.name
                        ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
                        : item.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
                results = [...results, ...filteredResults];
                url = data.next;
            } catch (error) {
                setIsError(true);
                break;
            }
        }

        // Filtrar por usuario si el checkbox está activado
        if (filterByUser) {
            results = results.filter((item) => item.owner === userId);
        }

        setItems(results);
        setIsLoading(false);
    };

    const handleCreateNewItem = () => {
        navigate(`/create/${itemType}`);
    };

    useEffect(() => {
        if (searchQuery) {
            searchItems();
        } else {
            doFetch();
        }
        
        console.log("User ID:", userId);

    }, [page, searchQuery, itemType, filterByUser]);

    return (
        <div>
            <div className="my-5">
                <h2 className="title">Lista de {itemType.charAt(0).toUpperCase() + itemType.slice(1)}</h2>
                <div className="field">
                    <label className="label">Selecciona el tipo de elemento</label>
                    <div className="control">
                        <div className="select">
                            <select value={itemType} onChange={(e) => setItemType(e.target.value)}>
                                <option value="songs">Canciones</option>
                                <option value="playlists">Playlists</option>
                                <option value="playlistsModal">PlaylistsModal</option>
                                <option value="genres">Géneros</option>
                                <option value="artists">Artistas</option>
                                <option value="albums">Álbumes</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="checkbox">
                        <input
                            type="checkbox"
                            checked={filterByUser}
                            onChange={(e) => setFilterByUser(e.target.checked)}
                        />
                        Mostrar solo mis {itemType}
                    </label>
                </div>
                <input
                    type="text"
                    className="input"
                    placeholder={`Buscar ${itemType}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div>
                    <button className="button is-primary" onClick={handleCreateNewItem}>
                        Crear nuevo {itemType}
                    </button>
                </div>
                <ul>
                    {items.length > 0 ? ( 
                        items.map((item) => (
                            <div key={item.id} className="column is-two-thirds">
 
                                {itemType === "songs" && <SongCard song={item} />}
                                {itemType === "playlists" && <PlaylistCard playlist={item} user={user} />}
                                {itemType === "playlistsModal" && <PlaylistCard2 playlist={item} />}
                                {itemType === "genres" && <GenreCard genre={item} />}
                                {itemType === "artists" && <ArtistCard artist={item} />}
                                {itemType === "albums" && <AlbumCard album={item} />}
                            </div>
                        ))
                    ) : (
                        <div>
                            <p>Aún no has creado {itemType === "songs" ? "canciones" : itemType}</p>
                            <button className="button is-primary" onClick={handleCreateNewItem}>
                                Crear nuevo {itemType}
                            </button>
                        </div>
                    )}
                </ul>
                {isLoading && <p>Cargando más {itemType}...</p>}
            </div>
            {isError && <p>Error al cargar los elementos</p>}
        </div>
    );
}

export default ItemList;
*/


/*
import { useState, useEffect } from "react";
import SongCard from "./SongCard";
import PlaylistCard from "./PlaylistCard";
import PlaylistCard2 from "./PlaylistCard2";
import GenreCard from "./GenreCard";
import ArtistCard from "./ArtistCard";
import AlbumCard from "./AlbumCard";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext"; //para cargar el perfil (ID)

export default function SongList() {
    //const { state } = useAuth();
    //const userId = state.userData?.user__id;
    //const user = state.userData;

    const [page, setPage] = useState(1);
    const [nextURL, setNextURL] = useState(null);
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [itemType, setItemType] = useState("songs");
    
    const endpointMap = {
        songs: `${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/?page=${page}&page_size=10`,
        playlists: `${import.meta.env.VITE_API_BASE_URL}harmonyhub/playlists/?page=${page}&page_size=10`,
        genres: `${import.meta.env.VITE_API_BASE_URL}harmonyhub/genres/?page=${page}&page_size=10`,
        artists: `${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/?page=${page}&page_size=10`,
        albums: `${import.meta.env.VITE_API_BASE_URL}harmonyhub/albums/?page=${page}&page_size=10`,
    };

    const { data } = useAuth("state");
    const userId = data?.user__id;
    const user = data;
    const navigate = useNavigate();

    const doFetch = async (url) => {
        setIsLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("No se pudieron cargar los elementos");
            }
            const data = await response.json();
            if (data.results) {
                setItems((prevItems) => [...prevItems, ...data.results]);
                setNextURL(data.next);
            }
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const searchItems = async () => {
        let url = endpointMap[itemType].replace(`?page=${page}`, `?page=1`);
        let results = [];
        setIsLoading(true);
        setSearchResults([]);
        while (url) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error al buscar elementos");
                }
                const data = await response.json();
                const filteredResults = data.results.filter((item) =>
                    item.name
                        ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
                        : item.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
                results = [...results, ...filteredResults];
                url = data.next;
            } catch (error) {
                setIsError(true);
                break;
            }
        }
        setSearchResults(results);
        setIsLoading(false);
    };

    function handleLoadMore() {
        if (nextURL) {
            setPage((currentPage) => currentPage + 1);
        }
    }

    useEffect(() => {
        if (searchQuery) {
            searchItems();
        } else {
            doFetch(endpointMap[itemType]);
        }
    }, [page, searchQuery, itemType]);

    return (
        <div>
            <div className="my-5">
                <h2 className="title">Lista de {itemType.charAt(0).toUpperCase() + itemType.slice(1)}</h2>
                <div className="field">
                    <label className="label">Selecciona el tipo de elemento</label>
                    <div className="control">
                        <div className="select">
                            <select value={itemType} onChange={(e) => setItemType(e.target.value)}>
                                <option value="songs">Canciones</option>
                                <option value="playlists">Playlists</option>
                                <option value="playlistsModal">PlaylistsModal</option>
                                <option value="genres">Géneros</option>
                                <option value="artists">Artistas</option>
                                <option value="albums">Álbumes</option>
                            </select>
                        </div>
                    </div>
                </div>
                <input
                    type="text"
                    className="input"
                    placeholder={`Buscar ${itemType}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <ul>
                    {(searchQuery ? searchResults : items).map((item) => (
                        <div key={item.id} className="column is-two-thirds">
                            {itemType === "songs" && <SongCard song={item} />}
                            {itemType === "playlists" && <PlaylistCard playlist={item} user={user} />}
                            {itemType === "playlistsModal" && <PlaylistCard2 playlist={item} />}
                            {itemType === "genres" && <GenreCard genre={item} />}
                            {itemType === "artists" && <ArtistCard artist={item} />}
                            {itemType === "albums" && <AlbumCard album={item} />}
                        </div>
                    ))}
                </ul>
                {isLoading && <p>Cargando más {itemType}...</p>}
                {!searchQuery && nextURL && !isLoading && (
                    <button
                        className="button is-primary"
                        onClick={handleLoadMore}
                    >
                        Cargar más
                    </button>
                )}
            </div>
            {isError && <p>Error al cargar los elementos</p>}
        </div>
    );
}
*/
