import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSanctuary } from './context/SanctuaryContext';
import { Leaf, LogOut, ShieldAlert, User } from 'lucide-react';
import Login from './pages/Login';
import Home from './pages/Home';
import AnimalHotspots from './pages/AnimalHotspots';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSanctuary();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const Navbar = () => {
  const { logout, user, isAdmin } = useSanctuary();
  
  return (
    <nav className="navbar">
      <div className="logo-container">
        <Leaf className="logo-icon" size={28} />
        WildReserve
      </div>
      <div className="nav-links">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)' }}>
          {isAdmin ? <ShieldAlert size={18} /> : <User size={18} />}
          <span style={{ fontWeight: 600 }}>{user?.uid}</span>
          <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.2)', padding: '0.1rem 0.5rem', borderRadius: '10px' }}>
            {isAdmin ? 'Admin' : 'User'}
          </span>
        </div>
        <button className="btn btn-outline" onClick={logout} style={{ padding: '0.5rem 1rem' }}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </nav>
  );
};

const App = () => {
  const { isAuthenticated } = useSanctuary();

  return (
    <div className="app-container">
      {isAuthenticated && <Navbar />}
      
      <main className={isAuthenticated ? "main-content" : ""}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/animal/:id" 
            element={
              <ProtectedRoute>
                <AnimalHotspots />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
