import { Link } from 'react-router-dom';
import IsAuth from './IsAuth';
const SidebarRight = () => {
  //componente de la barra lateral derecha, muestra las rutas de perfil y autenticacion
    return (
        <aside>
          <nav>
            <ul>
              <li><Link to="/profile">Perfil</Link></li>
            <li><IsAuth/></li>
              <li></li>
            </ul>
          </nav>
        </aside>
      );
}

export default SidebarRight;