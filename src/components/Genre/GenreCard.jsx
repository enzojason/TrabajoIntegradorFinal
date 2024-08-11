/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const GenreCard = ({item:genres }) => {  
  return (
    <div>
      <p ><strong>{genres.name}</strong></p>
      <p >{genres.description}</p>
      <p >Creado en: {new Date(genres.created_at).toLocaleDateString()}</p>
      <p >Ultima Actualización: {new Date(genres.updated_at).toLocaleDateString()} </p>
      <br />
    </div>
  );
};

export default GenreCard;
