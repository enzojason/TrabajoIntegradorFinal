import useFetch from "../../hooks/useFetch";
import SongCard from "./SongCard";
import SongForm from './SongForm';
import { useEffect, useState } from "react";
import Buscar from "./Buscar"

function SongList() {
    const [type, setType] = useState('song'); // Estado para el tipo de contenido
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/${type}s/?page_size=200`, // Cambia la URL según el tipo
        {}
    );

    const [items, setItems] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);

    const [isCreating, setIsCreating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        doFetch();
    }, [type]); // Refetch cuando cambia el tipo

    useEffect(() => {
        if (data) {
            setItems(data.results);
            setNextPage(data.next);
            setPreviousPage(data.previous);
        }
    }, [data]);

    useEffect(() => {
        const filtered = items.filter(item => {
          return item.title ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        });
        setFilteredItems(filtered);
      }, [searchTerm, items]);

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
            <div class="my-5">
                <div>
                    <Buscar />
                </div>

                <div class="select">
                    <select onChange={(e) => setType(e.target.value)} value={type}>
                        <option value="song">Canciones</option>
                        <option value="album">Álbumes</option>
                        <option value="artist">Artistas</option>
                        <option value="playlist">Playlists</option>
                        <option value="genre">Géneros</option>
                    </select>
                </div>

                <h2 class="title">Lista de {type.charAt(0).toUpperCase() + type.slice(1)}s</h2>

                <div class="columns is-vcentered is-mobile">

                    <div class="column is-narrow">
                        {previousPage && 
                        <button class="button" onClick={() => fetchPage(previousPage)}>
                            Anterior
                        </button>
                        }
                    </div>
                    <div class="column">
                        <div class="columns is-mobile is-2">
                        {filteredItems.slice(0, 5).map((item) => (
                            <div key={item.id} class="column is-one-fifth">
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
                    <div class="column is-narrow">
                        {nextPage && 
                        <button class="button" onClick={() => fetchPage(nextPage)}>
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
