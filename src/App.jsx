// eslint-disable-next-line no-unused-vars
import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import Login from './components/Auth/Login';
import ProfilePage from './pages/ProfilePage';

import SongsPage from './pages/SongsPage';

import AlbumPage from './pages/AlbumPage';
import ArtistPage from './pages/ArtistPage';
import PlaylistPage from './pages/PlaylistPage';
import GenresPage from './pages/GenrePage';
import InfoPage from './pages/InfoPage';

import Footer from './components/Layout/Footer';
import SidebarLeft from './components/Layout/SidebarLeft';
import SidebarRight from './components/Layout/SidebarRight';
import PrivateRoute from './components/PrivateRoute';
import NotFoundPage from './pages/NotFoundPage';
import DataProvider from './Providers/DataProvider';


import Buscar from './components/Song/Buscar';

const App = () => (
  <Router>
    <AuthProvider>
    <DataProvider>  
      <div className='columns'>
        <SidebarLeft />
        
        <main className='column'>
        
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<PrivateRoute> <ProfilePage /> </PrivateRoute>} />
            
            <Route path="/songs" element={<SongsPage />} />
            <Route path="/albums" element={<AlbumPage />} />
            <Route path="/artists" element={<ArtistPage />} />
            <Route path="/playlists" element={<PlaylistPage />} />
            <Route path="/genres" element={<GenresPage />} />
            <Route path='/info' element={<InfoPage/>}/>

            <Route path="/buscar" element={<Buscar />} />


            <Route path="*" element={<NotFoundPage />} />
          </Routes>

        </main>

        <SidebarRight />

      </div>

      <Footer />

      </DataProvider>
    </AuthProvider>
  </Router>
);

export default App;
