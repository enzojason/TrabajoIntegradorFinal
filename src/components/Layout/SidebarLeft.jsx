import { Link } from 'react-router-dom';

const SidebarLeft = () => {
  //componente de la barra lateral izquierda, muestra las rutas de la aplicacion


  return (
    <div className='column is-one-fifth'>

      <div className='column .is-offset-x'></div>
      
      <div className="column is-11">
        <nav>
          <aside className='menu'>
            <ul className='menu-list'>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/buscar">Buscar Canciones</Link></li>
            </ul>
        </aside>
        </nav>
      </div>
      
      <div className='column .is-offset-x'></div>
      <div className='column .is-offset-x'></div>
      <div className='column .is-offset-x'></div>


      <div className='column is -11'>
        <aside className='menu'>
          <nav>
            <ul className='menu-list'>            
              <li><Link to="/songs">Canciones</Link></li>
              <li><Link to="/albums">Albunes</Link></li>
              <li><Link to ="/artists">Artistas</Link></li>
              <li><Link to="playlists">Playlists</Link></li>
              <li><Link to="genres">Generos</Link></li>
            </ul>
          </nav>
      </aside>
      </div>
    </div>
  );
};

export default SidebarLeft;
