import React, { useEffect, useState } from 'react';
import './App.css';
import { getGigs } from './services/gigService';
import GigList from './components/GigList';
import AddGigForm from './components/AddGigForm';
import GigView from './components/GigView';

import Register from './components/Register';
import Login from './components/Login';

import LogoutButton from "./components/LogoutButton";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const [gigs, setGigs] = useState([]);
  const fetchGigs = async () => {
    const gigsData = await getGigs();
    setGigs(gigsData);
  };

  const [showPast, setShowPast] = useState(false);
  const toggleView = () => {
      setShowPast(!showPast);
  };

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchGigs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };  

  return (
    <Router>
    <div className="App">
    <header className="main-header">
        <div className="logo">Keikat</div>
        
        {/* Desktop-valikko */}
        <nav className="nav-links">
          {!isLoggedIn && <Link to="/register">Rekisteröidy</Link>}
          {!isLoggedIn && <Link to="/login">Kirjaudu</Link>}

          <Link to="/">Näytä keikat</Link>

          {isLoggedIn && (
            <>
              <Link to="/lisaa" className="primary" onClick={() => setMenuOpen(false)}>
                Lisää keikka
              </Link>
              <LogoutButton onLogout={handleLogout} />
            </>
          )}
        </nav>

        {/* Hamburger */}
        <label className="hamburger" onClick={() => setMenuOpen(true)}>
          <span></span>
          <span></span>
          <span></span>
        </label>

        {/* Mobiilivalikko */}
        <nav className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <div className="close-menu" onClick={() => setMenuOpen(false)}>✕</div>
          {!isLoggedIn && <Link to="/register" onClick={() => setMenuOpen(false)}>Rekisteröidy</Link>}
          {!isLoggedIn && <Link to="/login" onClick={() => setMenuOpen(false)}>Kirjaudu</Link>}

          <Link to="/" onClick={() => setMenuOpen(false)}>Näytä keikat</Link>

          {isLoggedIn && (
            <>
              <Link to="/lisaa" className="primary" onClick={() => setMenuOpen(false)}>
                Lisää keikka
              </Link>

              <LogoutButton
                onLogout={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
              />
            </>
          )}
        </nav>
      </header>

      <Routes>
        <Route 
          path='/register'
          element={<Register/>}
        />
          <Route 
          path='/login'
          element={<Login/>}
        />
        <Route
        path='/'
        element={<GigView gigs={gigs} showPast={showPast} toggleView={toggleView}/>}
        />
        <Route
          path='/lisaa'
          element={<AddGigForm onGigAdded={fetchGigs} />}
        />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
