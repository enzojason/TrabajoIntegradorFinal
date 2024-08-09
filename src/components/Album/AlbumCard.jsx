/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { DataContext } from '../../contexts/DataContext';
import { useContext } from 'react';


const AlbumCard = ({item:album }) => {  
  const { artistData, isLoading, isError } = useContext(DataContext);
  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar los datos</p>;

  return (
    <div>
        <img src={album.cover} alt="" style={{width:'70px',height:'70px'}} />
        <p>Albúm: <strong>{album.title}</strong></p>
  {artistData.map(artist => (
    artist.id === album.artist && (
      <div key={artist.id}>
        <h2>Artista: <strong>{artist.name}</strong></h2>

        <p>Año: {album.year}</p>
        <p>Fecha de creación: {new Date(album.created_at).toLocaleDateString()}</p>  
      </div>
    )
  ))}
  <br />
</div>

  );
};

export default AlbumCard;
