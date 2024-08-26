import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Login from './components/Auth/Login';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
//import Buscar from './components/Music/Buscar'
import HomePage from './pages/HomePage';
import SongsPage from './pages/SongsPage';
import AlbumPage from './pages/AlbumPage';
import ArtistPage from './pages/ArtistPage';
import PlaylistPage from './pages/PlaylistPage';
import GenrePage from './pages/GenrePage';
import NotFoundPage from './pages/NotFoundPage';

import ItemList from './components/AllItems/ItemList'
import PlaylistForm from './components/AllItems/PlaylistForm';
import MyBiblioteca from './components/AllItems/MyBiblioteca'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<PrivateRoute> <ProfilePage /> </PrivateRoute>} />
      <Route path="/buscar" element={<ItemList />} />
      <Route path="/songs" element={<SongsPage />} />
      <Route path="/albums" element={<AlbumPage />} />
      <Route path="/artists" element={<ArtistPage />} />
      <Route path="/playlists" element={<PlaylistPage />} />
      <Route path="/genres" element={<GenrePage />} />

      <Route path="/myBiblioteca" element={<MyBiblioteca/>} />
      <Route path="/itemList" element={<ItemList/>} />
      <Route path="/create/playLists" element={<PlaylistForm/>} />
      

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;

