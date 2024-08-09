import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
//import { AuthContext } from '../../contexts/AuthContext';
import { useAuth } from "../../contexts/AuthContext";

//const isAuthenticated = localStorage.getItem("authToken") !== null;

const Header = () => {
  const { logout } = useAuth("actions");
  const { isAuthenticated } = useAuth("state");
  //const {actions} = useContext(AuthContext);

  return (
    <header class="navbar is-dark">
      
        <div class="navbar-brand">
          <Link to="/" class="navbar-item">
            <img src="/path/to/logo.png" alt="Logo" />
          </Link>
        </div>

        <div class="navbar-end">

          <Link to="/profile" class="navbar-item">

            <figure class="image is-32x32">
              <img class="is-rounded" src="/path/to/profile-pic.jpg" alt="User profile" />
            </figure>
            <span>User Name</span>
          </Link>

        </div>

        <a class ="button" ><Link to="/">Home</Link></a>

        <div>
        {isAuthenticated ? (<p>USUSARIO AUTENTICADO</p>) : 
                           (<p>USUSARIO NO AUTH.</p>)}
        </div>

        {isAuthenticated ? (
          <>
            <a class ="button"> <Link to="/profile"> Perfil </Link> </a>
            <button class="button is-danger is-outlined" onClick={logout}> Salir </button>
            
          </>
        ) : ( <button class="button is-primary is-light">
                      <Link to="/login">Iniciar Sesion</Link>
              </button>
        )}
      
    </header>
  );
};

export default Header;

/*
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const isAuthenticated = localStorage.getItem("authToken") !== null;

const Header = () => {
    const { authState } = useContext(AuthContext);

    return (
        <div>
            {isAuthenticated ? (
                <p>El usuario está autenticado.</p>
            ) : (
                <p>El usuario no está autenticado.</p>
            )}
        </div>
    );
};

export default Header;
*/



