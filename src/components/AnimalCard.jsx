import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Info } from 'lucide-react';

const AnimalCard = ({ animal, hotspotCount }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="glass-panel animal-card"
      style={{
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      onClick={() => navigate(`/animal/${animal.id}`)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
    >
      <div style={{
        height: '220px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <img 
          src={animal.image} 
          alt={animal.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        />
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          padding: '0.25rem 0.75rem',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: '600',
          color: animal.conservationStatus === 'Endangered' ? 'var(--danger-color)' : 'var(--accent-orange)'
        }}>
          {animal.conservationStatus}
        </div>
      </div>
      
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{animal.name}</h3>
        <p style={{ 
          fontStyle: 'italic', 
          color: 'var(--text-secondary)', 
          fontSize: '0.9rem',
          marginBottom: '1rem' 
        }}>
          {animal.scientificName}
        </p>
        
        <p style={{ 
          fontSize: '0.95rem', 
          lineHeight: '1.5',
          marginBottom: '1.5rem',
          flex: 1
        }}>
          {animal.description}
        </p>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: '1rem',
          borderTop: '1px solid var(--surface-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-light)', fontWeight: '600' }}>
            <MapPin size={18} />
            <span>{hotspotCount} Hotspots</span>
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>
            <Info size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
