import React from 'react';
import { Link } from 'react-router-dom';
import Buscar from '../Music/Buscar.jsx'

const Sidebar = () => (
  <aside className="is-dark">
    <div className="brand">
      <p className="title is-3 has-text-white">Recursos</p>
      <ul>
         <li> <a className ="box" > <Link to="/songs">Canciones</Link></a> </li>
         <li> <a className ="box" > <Link to="/playlists">Playlists</Link></a> </li>
         <li> <a className ="box" > <Link to="/artistas">Artistas</Link></a> </li>
         <li> <a className ="box" > <Link to="/albumes">Álbumes</Link></a> </li>
         <li> <a className ="box" > <Link to="/generos">Géneros</Link></a> </li>
      </ul>
    </div>


    <div>
      <Buscar/>
    </div>
  </aside>
);

export default Sidebar;
