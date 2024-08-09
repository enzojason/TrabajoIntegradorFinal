import useFetch from "../../hooks/useFetch";
import AlbumCard from "./AlbumCard";
import AlbumForm from "./AlbumForm";

import { useEffect, useState } from "react";

function AlbumList() {
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        "https://sandbox.academiadevelopers.com/harmonyhub/albums/",
        {}
    );
    const [album, setAlbum] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);


    useEffect(() => {
        doFetch();
    }, []);

    useEffect(() => {
        if (data) {
            setAlbum(data.results);
            setNextPage(data.next);
            setPreviousPage(data.previous);
        }
    }, [data]);



    const fetchPage = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        setAlbum(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
    };

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar albunes.</p>;
    if (!data) return <p>No hay albunes disponibles</p>;

    
    
    return (
        <div>
            <h1>Lista de Albunes</h1>
                <ul>
                    {album.map((album) => (
                        <div key={album.id}>
                            <AlbumCard album={album}  />
                            <br />
                        </div>
                    ))}
                </ul>
            <div>
                {previousPage && <button onClick={() => fetchPage(previousPage)}>Anterior</button>}
                {nextPage && <button onClick={() => fetchPage(nextPage)}>Siguiente</button>}
            </div>
            
        </div>
    );
}

export default AlbumList;

