import React from 'react';
import { Link } from 'react-router-dom';
import Buscar from '../Music/Buscar.jsx'

const Sidebar = () => (
  <aside className="is-dark">
    <div className="brand">
      <p className="title is-3 has-text-white">Recursos</p>
      <div className="column is-15">
        <nav>
          <aside className='menu'>
          <ul className='menu-list'>
          <li><Link to="/buscar">Buscar Canciones</Link></li>
          <div className='column .is-offset-x'></div>
          <div className='column .is-offset-x'></div>

         <li>  <Link to="/songs">Canciones</Link> </li>
         <li>  <Link to="/albums">Albunes</Link> </li>         
         <li>  <Link to="/playlists">Playlists</Link> </li>
         <li>  <Link to="/artists">Artistas</Link> </li>
         <li>  <Link to="/genres">Géneros</Link> </li>


         <li>  <button className="button is-primary is-light"> <Link to="/myBiblioteca">Mi Biblioteca</Link>  </button> </li>

      </ul>
          </aside>
        </nav>
      
      </div>
    </div>

  </aside>
);

export default Sidebar;
