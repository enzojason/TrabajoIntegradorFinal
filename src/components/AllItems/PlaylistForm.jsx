import React, {  useState } from 'react';
import { createComponent ,updateComponent} from '../../services/api';
import { useNavigate } from 'react-router-dom';


const PlaylistForm = ({ playlist = {}, onSave }) => {
  const navigate = useNavigate();
  //Formulario de creacion de playlist
  const [name, setName] = useState(playlist.name || '');
  const [description,setDescription] = useState(playlist.description || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(playlist.public || false);


  const handleSubmit = async (e) => {
    //manejador de datos del formulario
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('public', isPublic);

    console.log("FORM DATA ",formData);
    try {
      setIsLoading(true);
      if (playlist.id) {
        await updateComponent(formData,'playlists',playlist.id); // Enviamos FormData para actualizar
      }
      else{
        await createComponent(formData,"playlists"); // Enviamos FormData para crear
      }
      onSave; // para cerrar el modal y refrescar datos
      
      alert('Playlist Guardada Satisfactoriamente.');
    } catch (error) {
      alert('Error saving playlist: ' + error.message);
    }
    finally{
      setIsLoading(false);
      window.location.reload();

    }
    

  };

  return (
    <div className="is-centered">
      <div className='card'
          style={{width: "600px", 
          height: "100%",}}> 
          <form className='box' onSubmit={handleSubmit}>

            <div className="field">
              <label className="label">Nombre: </label>
              <div className="control">
                <input className="input" type="text" value={name} 
                        onChange={(e) => setName(e.target.value)} required />
              </div>
            </div>

            <div className="field">
              <label className="label">Descripción: </label>
              <div className="control">
                <input className="input" type="text" value={description} 
                        onChange={(e)=> setDescription(e.target.value)} />
              </div>
            </div>

            <div className="field">
                  <label className="checkbox">
                    <input type="checkbox" checked={isPublic} 
                            onChange={(e) => setIsPublic(e.target.checked)} />
                    &nbsp;¿Hacer pública esta playlist?
                  </label>
                </div>

            {isLoading ? <h1>Cargando...</h1>
            : 
            ( <div className="field is-grouped">
                  <div className="control">
                    <button className='button is-link' type="submit">Guardar</button>
                  </div>
                  <div className="control">
                    <button className='button is-light' type="button" onClick = {onSave}>Cancelar</button>
                  </div> 
              </div> 
            )}    
        </form>
      </div>
    </div>
  );
};

export default PlaylistForm;