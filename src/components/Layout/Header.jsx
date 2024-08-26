import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
//import { AuthContext } from '../../contexts/AuthContext';
import { useAuth } from "../../contexts/AuthContext";
import drstrange from '../../assets/drstrange.png';
import musica from '../../assets/musica.png'
import { DataContext } from '../../contexts/DataContext';


//const isAuthenticated = localStorage.getItem("authToken") !== null;

//const [userData, setUserData] = useState(null);
//const { token } = useAuth("state");
//setUserData(getProfile(token));

const Header = () => {
  const { logout } = useAuth("actions");
  const { isAuthenticated } = useAuth("state");
  //const {actions} = useContext(AuthContext);
  const { profileData } = useContext(DataContext);


  return (
    <header className="navbar" role="navigation" aria-label="main navigation">
       <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img className='is-rounded' src={musica} alt="Logo" />
          </Link>
          <Link to="/" className ="button is-inverted">Home</Link>
        </div>

        {isAuthenticated ? (
                          <>
                            
                            <div className="navbar-end">
                              
                              <p className='subtitle is-size-6'>{profileData.email}</p>
                              <Link to="/profile" className="navbar-item">
                                <figure className="image is-40x40">
                                  <img className="is-rounded" src={drstrange} alt="User profile" />
                                </figure>
                              </Link>
                            </div>

                            <Link to="/profile" className ="button is-primary is-light"> Perfil </Link>
                            
                            <button className="button is-danger is-outlined" onClick={logout}> Salir </button>
                            
                          </>
                        ) : ( 
                          <div className="navbar-end">
                                
                                              <Link to="/login" className="button is-primary is-light">Iniciar Sesion</Link>
                                
                          </div>
                        )}
      
    </header>
  );
};

export default Header;
