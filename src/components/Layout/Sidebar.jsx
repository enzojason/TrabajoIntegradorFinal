import React from 'react';
import { Link } from 'react-router-dom';
import Buscar from '../Music/Buscar.jsx'

const Sidebar = () => (
  <aside className="is-dark">
    <div className="brand">
      <p className="title is-3 has-text-white">Recursos</p>
      <ul>
         <li>  <Link to="/songsForm">Nueva Canción</Link> </li>
         <li>  <Link to="/songs">Canciones</Link> </li>
         <li>  <Link to="/playlists">Playlists</Link> </li>
         <li>  <Link to="/artistas">Artistas</Link> </li>
         <li>  <Link to="/albumes">Álbumes</Link> </li>
         <li>  <Link to="/generos">Géneros</Link> </li>
      </ul>
    </div>


    <div>
      <Buscar/>
    </div>
  </aside>
);

export default Sidebar;
