import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Info, Trash2 } from 'lucide-react';
import { useSanctuary } from '../context/SanctuaryContext';

const AnimalCard = ({ animal, hotspotCount }) => {
  const navigate = useNavigate();
  const { isAdmin, deleteAnimal } = useSanctuary();

  return (
    <div 
      className="glass-panel animal-card"
      style={{
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: '24px'
      }}
      onClick={() => navigate(`/animal/${animal.id}`)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg), var(--shadow-glow)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
    >
      <div style={{
        height: '260px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <img 
          src={animal.image} 
          alt={animal.name}
          onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1549480017-d76466a4b8e8?auto=format&fit=crop&q=80&w=800"; }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.8s ease'
          }}
          className="card-image"
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        />
        {isAdmin && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm("Are you sure you want to delete this animal and all its hotspots?")) {
                deleteAnimal(animal.id);
              }
            }}
            style={{
              position: 'absolute',
              top: '1.25rem',
              left: '1.25rem',
              background: 'rgba(230, 57, 70, 0.8)',
              border: 'none',
              padding: '0.4rem',
              borderRadius: '50%',
              color: 'white',
              cursor: 'pointer',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            title="Delete Animal"
          >
            <Trash2 size={16} />
          </button>
        )}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(4, 15, 10, 0.9) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.25rem',
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.2)',
          padding: '0.4rem 1rem',
          borderRadius: '30px',
          fontSize: '0.85rem',
          fontWeight: '700',
          letterSpacing: '0.5px',
          color: animal.conservationStatus.includes('Endangered') ? 'var(--danger-color)' : 'var(--accent-gold)'
        }}>
          {animal.conservationStatus}
        </div>
        <div style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: '1.5rem',
          right: '1.5rem',
          pointerEvents: 'none'
        }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '0.2rem', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{animal.name}</h3>
          <p style={{ 
            fontStyle: 'italic', 
            color: 'rgba(255,255,255,0.8)', 
            fontSize: '0.95rem',
            margin: 0
          }}>
            {animal.scientificName}
          </p>
        </div>
      </div>
      
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.02)' }}>
        <p style={{ 
          fontSize: '1rem', 
          lineHeight: '1.6',
          color: 'var(--text-secondary)',
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
          paddingTop: '1.25rem',
          borderTop: '1px solid rgba(255,255,255,0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-light)', fontWeight: '600', fontSize: '1.05rem' }}>
            <MapPin size={20} />
            <span>{hotspotCount} Hotspots</span>
          </div>
          <div style={{ 
            color: 'var(--text-primary)', 
            background: 'rgba(255,255,255,0.1)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s'
          }}
          className="info-icon"
          >
            <Info size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
