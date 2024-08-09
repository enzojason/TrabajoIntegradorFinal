/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const GenreCard = ({item:genres }) => {  
  return (
    <div>
      <p ><strong>{genres.name}</strong></p>
      <p >{genres.description}</p>
      <p >Creado en: {genres.created_at}</p>
      <p >Ultima Actualización: {genres.updated_at} </p>
      <br />
    </div>
  );
};

export default GenreCard;
