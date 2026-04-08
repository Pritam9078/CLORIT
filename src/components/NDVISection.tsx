import React from 'react';
import RealisticSatelliteGlobe from './RealisticSatelliteGlobe';

const NDVISection: React.FC = () => {
  return (
    <div style={{ padding: '2rem', background: '#F8FAF9', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          color: '#0077B6',
          textAlign: 'center'
        }}>
          🛰️ National NDVI Satellite Monitoring
        </h2>
        <p style={{ 
          color: '#64748b', 
          marginBottom: '2rem',
          textAlign: 'center',
          fontSize: '1.125rem'
        }}>
          Real-time satellite monitoring and NDVI analysis for all mangrove
          restoration projects across India
        </p>
        
        <RealisticSatelliteGlobe 
          userRole="admin"
          showNDVILayer={true}
          onMarkerClick={(marker) => {
            console.log('Clicked marker:', marker);
          }}
        />
        
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h4 style={{ fontWeight: 600, marginBottom: '1rem', color: '#0077B6' }}>
            How to Use
          </h4>
          <ul style={{ color: '#64748b', lineHeight: 1.6 }}>
            <li>🖱️ <strong>Drag</strong> to rotate the Earth</li>
            <li>🖱️ <strong>Scroll</strong> to zoom in/out</li>
            <li>🎯 <strong>Click markers</strong> to view project details</li>
            <li>🔄 <strong>Toggle views</strong> between satellite and NDVI analysis</li>
            <li>✨ Earth rotates automatically - enjoy the view!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NDVISection;
