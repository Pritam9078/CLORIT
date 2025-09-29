import React, { useState } from 'react';
import RealisticGlobe from './RealisticGlobe';
import Legend from './Legend';

interface ProjectMarker {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'pending' | 'completed';
  ndviValue: number;
  description: string;
  carbonCredits?: number;
  area?: number;
}

const RealisticGlobeDemo: React.FC = () => {
  const [userRole, setUserRole] = useState<'ngo' | 'nccr'>('nccr');
  const [showNDVILayer, setShowNDVILayer] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<ProjectMarker | null>(null);

  const handleMarkerClick = (marker: ProjectMarker) => {
    setSelectedMarker(marker);
  };

  const toggleRole = () => {
    setUserRole(prev => prev === 'nccr' ? 'ngo' : 'nccr');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F8FAF9 0%, #E3F2FD 100%)',
      fontFamily: 'Inter, system-ui, sans-serif',
      position: 'relative' as const
    },
    header: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(0, 119, 182, 0.1)',
      padding: '1.5rem 2rem',
      position: 'sticky' as const,
      top: 0,
      zIndex: 1000
    },
    headerContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#0077B6',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    subtitle: {
      fontSize: '0.9rem',
      color: '#64748b',
      marginTop: '0.25rem'
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    toggleButton: {
      background: userRole === 'nccr' ? '#4CAF50' : '#2196F3',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '0.75rem 1.5rem',
      fontSize: '0.875rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    ndviToggle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#64748b',
      fontSize: '0.875rem'
    },
    checkbox: {
      width: '18px',
      height: '18px',
      cursor: 'pointer'
    },
    main: {
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    globeContainer: {
      height: '700px',
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '20px',
      boxShadow: '0 20px 50px rgba(0, 119, 182, 0.1)',
      border: '1px solid rgba(0, 119, 182, 0.1)',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    statsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginTop: '2rem'
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '16px',
      padding: '1.5rem',
      border: '1px solid rgba(0, 119, 182, 0.1)',
      boxShadow: '0 10px 25px rgba(0, 119, 182, 0.05)'
    },
    statTitle: {
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#64748b',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
      marginBottom: '0.75rem'
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#0077B6',
      marginBottom: '0.5rem'
    },
    statDescription: {
      fontSize: '0.875rem',
      color: '#64748b',
      lineHeight: 1.4
    },
    infoPanel: {
      position: 'absolute' as const,
      bottom: '1rem',
      right: '1rem',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '12px',
      padding: '1rem',
      border: '1px solid rgba(0, 119, 182, 0.1)',
      backdropFilter: 'blur(10px)',
      zIndex: 100,
      fontSize: '0.75rem',
      color: '#64748b',
      maxWidth: '200px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.title}>
              🌍 Realistic Earth NDVI Monitor
            </h1>
            <p style={styles.subtitle}>
              Interactive 3D satellite visualization for mangrove forest monitoring
            </p>
          </div>
          <div style={styles.controls}>
            {userRole === 'nccr' && (
              <label style={styles.ndviToggle}>
                <input
                  type="checkbox"
                  checked={showNDVILayer}
                  onChange={(e) => setShowNDVILayer(e.target.checked)}
                  style={styles.checkbox}
                />
                Show NDVI Overlay
              </label>
            )}
            <button
              style={styles.toggleButton}
              onClick={toggleRole}
            >
              {userRole === 'nccr' ? '🏛️ NCCR Admin' : '🌿 NGO Verifier'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Globe Container */}
        <div style={styles.globeContainer}>
          <RealisticGlobe
            userRole={userRole}
            showNDVILayer={showNDVILayer}
            onMarkerClick={handleMarkerClick}
          />
          
          {/* Legend */}
          <Legend
            showNDVILayer={showNDVILayer}
            userRole={userRole}
          />

          {/* Info Panel */}
          <div style={styles.infoPanel}>
            <strong>🎮 Controls:</strong><br />
            • Drag to rotate<br />
            • Scroll to zoom<br />
            • Click markers for details<br />
            • Use controls to reset view
          </div>
        </div>

        {/* Statistics */}
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <div style={styles.statTitle}>Total Projects</div>
            <div style={styles.statValue}>
              {userRole === 'nccr' ? '5' : '3'}
            </div>
            <div style={styles.statDescription}>
              {userRole === 'nccr' 
                ? 'All mangrove restoration projects across India'
                : 'Projects assigned for NGO verification'
              }
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statTitle}>Average NDVI</div>
            <div style={styles.statValue}>0.636</div>
            <div style={styles.statDescription}>
              Overall vegetation health index across monitored regions
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statTitle}>Total Area</div>
            <div style={styles.statValue}>
              {userRole === 'nccr' ? '230.2' : '143.0'} ha
            </div>
            <div style={styles.statDescription}>
              Cumulative restoration area under monitoring
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statTitle}>Carbon Credits</div>
            <div style={styles.statValue}>
              {userRole === 'nccr' ? '5,820' : '2,230'}
            </div>
            <div style={styles.statDescription}>
              Total carbon credits generated from projects
            </div>
          </div>
        </div>

        {/* Selected Marker Details */}
        {selectedMarker && (
          <div style={{
            ...styles.statCard,
            marginTop: '2rem',
            background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.05) 0%, rgba(21, 101, 192, 0.05) 100%)'
          }}>
            <div style={styles.statTitle}>Selected Project Details</div>
            <h3 style={{ color: '#0077B6', margin: '0 0 1rem 0' }}>
              {selectedMarker.name}
            </h3>
            <p style={{ color: '#64748b', marginBottom: '1rem' }}>
              {selectedMarker.description}
            </p>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
              gap: '1rem' 
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>NDVI Value</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#4CAF50' }}>
                  {selectedMarker.ndviValue.toFixed(3)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Area</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0077B6' }}>
                  {selectedMarker.area} ha
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Credits</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FF9800' }}>
                  {selectedMarker.carbonCredits}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Status</div>
                <div style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 600, 
                  color: selectedMarker.status === 'active' ? '#2196F3' : 
                        selectedMarker.status === 'pending' ? '#FF9800' : '#4CAF50'
                }}>
                  {selectedMarker.status.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RealisticGlobeDemo;
