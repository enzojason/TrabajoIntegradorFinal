import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside>
      <nav>
        <ul>
          
          <li><Link to="/songs">Canciones</Link></li>
          <li><Link to="/profile">Perfil</Link></li>
          <li><Link to="/buscar">Buscar</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
