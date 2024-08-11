import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

const MainLayout = () => (
  <>
    <Header />
    <div className="columns is-mobile">
      <div className="column is-narrow">
        <Sidebar />
      </div>
      <div className="column">
        <main>
        <Outlet />
        </main>
      </div>
    </div>
    <Footer />
  </>
);

export default MainLayout;


