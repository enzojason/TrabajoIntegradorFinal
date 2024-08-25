import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
//import { AuthContext } from '../../contexts/AuthContext';
import { useAuth } from "../../contexts/AuthContext";
import drstrange from '../../assets/drstrange.png';
import musica from '../../assets/musica.png'


//const isAuthenticated = localStorage.getItem("authToken") !== null;

//const [userData, setUserData] = useState(null);
//const { token } = useAuth("state");
//setUserData(getProfile(token));

const Header = () => {
  const { logout } = useAuth("actions");
  const { isAuthenticated } = useAuth("state");
  //const {actions} = useContext(AuthContext);


  return (
    <header className="navbar is-dark">
       <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img className='is-rounded'
            src={musica} alt="Logo" />
          </Link>
          <Link to="/" className="button">Home</Link>        
          </div>

        {isAuthenticated ? (
                          <>
                            
                            <div className="navbar-end">
                              
                              <Link to="/profile" className="navbar-item">

                                <figure className="image is-35x35">
                                  <img className="is-rounded" src={drstrange} alt="User profile" />
                                </figure>
                                <span>  </span>
                              </Link>
                            </div>

                            <Link to="/profile"> Perfil </Link>
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
