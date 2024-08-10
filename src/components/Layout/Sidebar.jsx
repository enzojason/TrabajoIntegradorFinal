import React from 'react';
import { Link } from 'react-router-dom';
import Buscar from '../Music/Buscar.jsx'

const Sidebar = () => (
  <aside className="menu">
    <p className="menu-label">Biblioteca</p>
    <ul className="menu-list">
      <li><Link to="/songs">Canciones</Link></li>
      <li><Link to="/playlists">Playlists</Link></li>
      <li><Link to="/artistas">Artistas</Link></li>
      <li><Link to="/albumes">Álbumes</Link></li>
      <li><Link to="/generos">Géneros</Link></li>
      
    </ul>
    <div>
      <Buscar/>
    </div>
  </aside>
);

export default Sidebar;
