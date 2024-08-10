import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './MainLayout'; // import the new layout component
import SongsPage from './pages/SongsPage';
import HomePage from './pages/HomePage';
import Login from './components/Auth/Login';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';


const App = () => (
  <Router>
    <AuthProvider>
        <Routes>

          <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/songs" element={<SongsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<PrivateRoute> <ProfilePage /> </PrivateRoute>} />

          </Route>
        </Routes>
    </AuthProvider>
  </Router>
);

export default App;

/*
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import Login from './components/Auth/Login';
import ProfilePage from './pages/ProfilePage';
import SongsPage from './pages/SongsPage';
import SongDetail from './components/Music/SongDetail';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Sidebar from './components/Layout/Sidebar';
import PrivateRoute from './components/PrivateRoute';
import NotFoundPage from './pages/NotFoundPage';
import SearchBar from './components/Music/SearchBar';
import Buscar from './components/Music/Buscar';

const App = () => (
  <Router>
    <AuthProvider>
      <Header />
      <Sidebar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<PrivateRoute> <ProfilePage /> </PrivateRoute>} />
          <Route path="/songs" element={<SongsPage />} />
          <Route path="/songs/:id" element={<SongDetail />} />
          
          <Route path="/buscar" element={<Buscar />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  </Router>
);

export default App;
*/