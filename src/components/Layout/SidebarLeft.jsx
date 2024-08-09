import { Link } from 'react-router-dom';
const SidebarLeft = () => {
  return (
    <aside>
      <nav>
        <ul>
          <li><Link to="/">Home Izquierdo</Link></li>
          <li><Link to="/search">Buscar</Link></li> 
          <li><Link to="/songs">Canciones</Link></li>
          <li><Link to="/albums">Albunes</Link></li>
          <li><Link to ="/artists">Artistas</Link></li>
          <li><Link to="playlists">Playlists</Link></li>
          <li><Link to="genres">Generos</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarLeft;
