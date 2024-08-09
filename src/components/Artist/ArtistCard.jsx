/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { DataContext } from '../../contexts/DataContext';
import { useContext } from 'react';
import AlbumCard from '../Album/AlbumCard';


const ArtistCard = ({item:artist}) => {  
  const { albumData, isLoading, isError } = useContext(DataContext);
  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar los datos</p>;
  

  return ( 
    <li>
    <div>
      <img src={artist.image} alt="" style={{width:'70px',height:'70px'}} />
      <h1>Artista: <strong>{artist.name}</strong></h1>
      <p> Bio: {artist.bio}</p>
      <p>Sitio Web: {artist.website}</p>
      <p>Ulitma Actualización: {new Date(artist.created_at).toLocaleDateString()}</p>
      <br />
    </div>
  </li>
  );
};

export default ArtistCard;