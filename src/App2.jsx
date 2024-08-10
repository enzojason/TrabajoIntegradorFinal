import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import SongList from './components/Music/SongList';
import SongsPage from './pages/SongsPage';
const App2 = () => (
  <Router>
    <div className="columns is-mobile">
      <div className="column is-one-fifth">
        <Sidebar />
      </div>
      <div className="column">
        <main>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/songs" element={<SongList />} />
          </Routes>
        </main>
      </div>
    </div>
  </Router>
);

export default App2;
