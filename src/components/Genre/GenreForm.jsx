/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {  useState } from 'react';
import { createComponent } from '../../services/api';

const GenreForm = ({ genero = {}, onSave }) => {
  const [name, setName] = useState(genero.name || '');
  const [description,setDescription] = useState(genero.description || '');
  const[songs,setSongs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);

    console.log("FORM DATA ",formData);
    try {
      
      const data = await createComponent(formData,"genres"); // Enviamos FormData para crear
      console.log("DATA ",data);
      onSave();
      console.log("guardado");
      alert('Song saved successfully');
    } catch (error) {
      alert('Error saving song: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre: </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label >Description: </label>
        <input type="text" value={description} onChange={(e)=> setDescription(e.target.value)} />
      </div>
      <button type="submit">Guardar</button>
      <button onClick={()=>{onSave();}}>Salir</button>
    </form>
  );
};

export default GenreForm;