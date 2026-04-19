import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSanctuary } from '../context/SanctuaryContext';
import { ArrowLeft, User, MapPin, Compass, Calendar } from 'lucide-react';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, hotspots, animals } = useSanctuary();

  if (!user) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <h2>Access Denied</h2>
        <p>Please log in to view your profile.</p>
        <button onClick={() => navigate('/login')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Go to Login
        </button>
      </div>
    );
  }

  // Get hotspots added by the current user
  const myHotspots = hotspots.filter(h => h.addedBy === user.uid).reverse();

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => navigate('/')}
          className="btn btn-outline"
          style={{ padding: '0.5rem 1rem' }}
        >
          <ArrowLeft size={18} /> Back
        </button>
        <div>
          <h1 className="page-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <User size={32} color="var(--primary-light)" />
            @{user.uid}'s Profile
          </h1>
          <p className="page-subtitle" style={{ margin: 0 }}>Role: <span style={{ color: user.role === 'admin' ? 'var(--accent-orange)' : 'var(--text-primary)' }}>{user.role}</span></p>
        </div>
      </div>

      <div className="container-boxed" style={{ padding: '0' }}>
        <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', color: 'var(--accent-color)' }}>
            <Compass size={28} />
            <h2 style={{ fontSize: '1.8rem', margin: 0 }}>My Contributions</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--surface-border)', textAlign: 'center' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem' }}>
                {myHotspots.length}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Hotspots Contributed</div>
            </div>
            
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--surface-border)', textAlign: 'center' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem' }}>
                {new Set(myHotspots.map(h => h.animalId)).size}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Unique Species</div>
            </div>
          </div>

          <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'white' }}>Contributed Hotspots</h3>
          
          {myHotspots.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
              <MapPin size={48} opacity={0.5} style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }} />
              <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>No Contributions Yet</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Head back to the home page to start documenting wildlife hotspots!</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              {myHotspots.map(hotspot => {
                const animal = animals.find(a => a.id === hotspot.animalId);
                return (
                  <div key={hotspot.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '1.5rem', 
                    background: 'var(--surface-color)', 
                    border: '1px solid var(--surface-border)', 
                    borderRadius: '12px',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseEnter={(e)=>e.currentTarget.style.background='rgba(255,255,255,0.05)'} 
                  onMouseLeave={(e)=>e.currentTarget.style.background='var(--surface-color)'}
                  >
                    <div>
                      <h4 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPin size={18} color="var(--primary-light)" />
                        {hotspot.name}
                      </h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
                        For: <span style={{ color: 'var(--accent-color)', fontWeight: '500' }}>{animal?.name || 'Unknown Subject'}</span>
                      </p>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={14} /> {hotspot.bestTimeToVisit}
                      </span>
                      <button 
                        onClick={() => navigate(`/animal/${hotspot.animalId}`)}
                        className="btn btn-outline" 
                        style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
                      >
                        View Subject
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
