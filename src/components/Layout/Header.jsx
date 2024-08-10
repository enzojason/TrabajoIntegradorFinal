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
    <header>
       <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img src="/path/to/logo.png" alt="Logo" />
          </Link>
        </div>

        {isAuthenticated ? (
                          <>
                            <a className ="button" ><Link to="/">Home</Link></a>

                            <div className="navbar-end">
                            
                              <Link to="/profile" className="navbar-item">

                                <figure className="image is-32x32">
                                  <img className="is-rounded" src="/path/to/profile-pic.jpg" alt="User profile" />
                                </figure>
                                <span>User Name</span>
                              </Link>
                            </div>

                            <a className ="button"> <Link to="/profile"> Perfil </Link> </a>
                            <button className="button is-danger is-outlined" onClick={logout}> Salir </button>
                            
                          </>
                        ) : ( 
                          <div className="navbar-end">
                                <button className="button is-primary is-light">
                                              <Link to="/login">Iniciar Sesion</Link>
                                </button>
                          </div>
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



