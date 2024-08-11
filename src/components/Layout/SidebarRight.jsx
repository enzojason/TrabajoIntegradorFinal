import { Link } from 'react-router-dom';
import IsAuth from './IsAuth';
const SidebarRight = () => {
  //componente de la barra lateral derecha, muestra las rutas de perfil y autenticacion
    return (
      <div className='column is-one-fifth'>
        <div className='column .is-offset-x'></div>
        
        <div className='colum is-11'>
          <nav>
            <aside className='menu'>  
              <ul className='menu-list'> 
              <br />
              <li><IsAuth/></li>
              </ul>            
            </aside>
          </nav>
        </div>
        
      </div>
      );
}

export default SidebarRight;