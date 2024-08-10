import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside className="menu">
    <p className="menu-label">Biblioteca</p>
    <ul className="menu-list">
      <li><Link to="/songs">Canciones</Link></li>
      <li><Link to="/playlists">Playlists</Link></li>
      <li><Link to="/artistas">Artistas</Link></li>
      <li><Link to="/albumes">Álbumes</Link></li>
      <li><Link to="/generos">Géneros</Link></li>
      <li><Link to="/buscar">Buscar</Link></li>
    </ul>
  </aside>
);

export default Sidebar;
