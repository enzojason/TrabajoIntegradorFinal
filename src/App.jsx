import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './Routes'//'./Routes'; // Importa tus rutas
import DataProvider from './Providers/DataProvider';

const App = () => (
  <Router>
    <AuthProvider>
    <DataProvider>
      <AppRoutes />
      
      </DataProvider> 
    </AuthProvider>
  </Router>
);

export default App;

