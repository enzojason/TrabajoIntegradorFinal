import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './Routes'//'./Routes'; // Importa tus rutas

const App = () => (
  <Router>
    <AuthProvider>
      <AppRoutes /> 
    </AuthProvider>
  </Router>
);

export default App;

