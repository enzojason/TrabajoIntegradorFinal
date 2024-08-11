import { Link } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";


const IsAuth = () => {
    //verifica si esta autenticado, y determina la ruta
    //HOME INICIAR  SALIR
  const { logout } = useAuth("actions");
  const { isAuthenticated } = useAuth("state");

  return (
    
        <div>
          <Link to="/">Home</Link>
        {isAuthenticated ? (
          <div>
            <Link to="/profile"> Perfil </Link>
            <br />
            <Link onClick={logout}>Salir</Link>
            </div>
        ) : (
          <div>
            
          <Link to="/login">Iniciar Sesion</Link>
          </div>
        )}
        </div>
      
  );
};

export default IsAuth;
