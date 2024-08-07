//import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  //const isAuthenticated = localStorage.getItem("authToken") !== null;
  const { isAuthenticated } = useAuth("state");
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
}

return children;

  //return authState.isAuthenticated ? children : <Navigate to="/HomePage" />; //<Navigate to="/login" />;
};

export default PrivateRoute;
