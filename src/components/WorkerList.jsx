/* eslint-disable react/prop-types */
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";

//TRABAJA Y AÑADE LA LISTA
// Recibe la ruta, nombre (cualquier nombre) , ItemComponent (componente que se va a renderizar)
function ListaElemento({ruta,nombre,ItemComponent}) {
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/${ruta}`,
        {}
    );
        //elemento= album setElemento

    const [elemento, setElemento] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);


    useEffect(() => {
        doFetch();
    }, []);

    useEffect(() => {
        if (data) {
            setElemento(data.results);
            setNextPage(data.next);
            setPreviousPage(data.previous);
        }
    }, [data]);



    const fetchPage = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        setElemento(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
    };

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar {nombre}</p>;
    if (!data) return <p>No hay {nombre} disponibles</p>;

    return (
        <div>
            <h1><strong>Lista de {nombre}</strong></h1>
            <br />

            <div>
            {previousPage && (<button onClick={() => fetchPage(previousPage)}>Anterior</button>)}               
            {nextPage && <button onClick={() =>  fetchPage(nextPage)}>Siguiente</button>}
            </div>

            <ul>
                {elemento.map((item, index) => (
                <ItemComponent key={index} item={item} />
                ))}
            </ul>

            <div>
            {previousPage && (<button onClick={() => {
                fetchPage(previousPage);
                window.scrollTo({ top: 2, behavior: 'smooth' }); 
                }}>Anterior</button>)}  
                          
            {nextPage && <button onClick={() => { 
                fetchPage(nextPage);
                window.scrollTo({ top: 2, behavior: 'smooth' });
                }}>Siguiente</button>}
            </div>
            
        </div>
    );
}

export default ListaElemento;

