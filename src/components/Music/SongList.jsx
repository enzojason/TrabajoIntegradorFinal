import useFetch from "../../hooks/useFetch";
import SongCard from "./SongCard";
import SongForm from './SongForm';
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Buscar from "./Buscar"

function SongList({tipo}) {
    const { user } = useAuth("state");
    //const { user } = state;

    const [type, setType] = useState(tipo); // Estado para el tipo de contenido (por defecto filta por canción.)
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/${type}s/?page_size=300`, // Cambia la URL según el tipo  (?page_size=100)
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

  /*
    useEffect(() => {

        if (data && Array.isArray(data.results)) {
            setFilteredItems(data.results);
            setItems(data.results);
            setNextPage(data.next);
            setPreviousPage(data.previous);
        }else {
            setFilteredItems([]);
            setItems([]);
        }
    }, [data]);


    useEffect(() => {
        const filtered = items.filter(item => {
          return item.title ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        });
        setFilteredItems(filtered);
      }, [searchTerm, items]);
*/

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


                {user && (
                    <div className="field">
                        <input 
                            type="checkbox" 
                            id="filterByUser" 
                            checked={filterByUser}
                            onChange={(e) => setFilterByUser(e.target.checked)}
                        />
                        <label htmlFor="filterByUser">Filtrar por mi usuario</label>
                    </div>
                )}

                <div className="columns is-vcentered is-mobile">

                    <div className="column is-narrow">
                        {previousPage && 
                        <button className="button" onClick={() => fetchPage(previousPage)}>
                            Anterior
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
                                        onDelete={() => handleDelete(item.id)} 
                                        onEdit={() => handleEdit(item)} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="column is-narrow">
                        {nextPage && 
                        <button className="button" onClick={() => fetchPage(nextPage)}>
                            Siguiente
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