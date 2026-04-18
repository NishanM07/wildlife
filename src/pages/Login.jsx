import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSanctuary } from '../context/SanctuaryContext';
import { Leaf, ChevronRight, UserPlus, AlertCircle } from 'lucide-react';
import '../index.css';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, registerUser } = useSanctuary();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (uid && password) {
      try {
        if (isRegistering) {
          registerUser(uid, password);
        } else {
          login(uid, password);
        }
        navigate('/');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="login-container" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'url(/images/asiatic_lion_1776440481034.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.3)',
        zIndex: -1
      }}></div>

      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '400px',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <Leaf size={48} color="var(--primary-light)" style={{ marginBottom: '1rem' }} />
          <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: '0.5rem' }}>WildReserve</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {isRegistering ? 'Create a new account' : 'Discover & track wildlife hotspots'}
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: 'rgba(208, 0, 0, 0.2)',
            border: '1px solid var(--danger-color)',
            color: '#ffcccc',
            padding: '0.75rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textAlign: 'left',
            fontSize: '0.9rem'
          }}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div className="form-group">
            <label className="form-label">User ID (UID)</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder={isRegistering ? "Choose a UID" : "Enter your UID"}
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder={isRegistering ? "Create a password" : "Enter your password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1.5rem' }}>
            {isRegistering ? (
              <><UserPlus size={18} /> Register & Enter</>
            ) : (
              <>Explore Sanctuaries <ChevronRight size={18} /></>
            )}
          </button>

          <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            {isRegistering ? "Already have an account? " : "Don't have an account? "}
            <button 
              type="button" 
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
              }}
              style={{
                background: 'none',
                color: 'var(--primary-light)',
                fontWeight: '600',
                border: 'none',
                textDecoration: 'underline'
              }}
            >
              {isRegistering ? 'Login here' : 'Register here'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
