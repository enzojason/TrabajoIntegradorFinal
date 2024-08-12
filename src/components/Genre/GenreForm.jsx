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
    <div className="is-centered">
      <div className='card'
        style={{width: "600px", 
        height: "100%",}}> 
        <form className='box' onSubmit={handleSubmit}>

          <div className="field">
            <label class="label">Nombre: </label>
            <input class="input" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="field">
            <label class="label">Description: </label>
            <input class="input" type="text" value={description} onChange={(e)=> setDescription(e.target.value)} />
          </div>
          <div class="field is-grouped">
                  <div className="control">
                    <button className='button is-link' type="submit">Guardar</button>
                  </div>

                    <div className="control">
                    <button className='button is-light' onClick={()=>{onSave();}}>Salir</button>
                  </div> 
                </div> 

        </form>
      </div>
    </div>
  );
};

export default GenreForm;