import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import SongsPage from './pages/SongsPage';
import Login from './components/Auth/Login';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import Buscar from './components/Music/Buscar'
import ItemList from './components/AllItems/ItemList'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<SongsPage />} />
      <Route path="/songs" element={<SongsPage />} />
      <Route path="/songsForm" element={<SongsPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<PrivateRoute> <ProfilePage /> </PrivateRoute>} />
      <Route path="/buscar" element={<Buscar />} />
      <Route path="/itemList" element={<ItemList/>} />

    </Route>
  </Routes>
);

export default AppRoutes;

