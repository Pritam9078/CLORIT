import React, { useEffect, useRef, useState } from 'react';

// NDVI color mapping
const NDVI_COLORS = {
  healthy: '#4CAF50',    // Green
  moderate: '#FFEB3B',   // Yellow
  poor: '#F44336'        // Red
};

interface ProjectMarker {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'pending' | 'completed';
  ndviValue: number;
  description: string;
  carbonCredits?: number;
  area?: number; // in hectares
}

interface SatelliteGlobeProps {
  userRole: 'community' | 'ngo' | 'nccr';
  onRegionClick?: (region: ProjectMarker) => void;
  selectedProjectId?: string;
  showNDVILayer?: boolean;
  timeSliderValue?: string;
}

const SatelliteGlobe: React.FC<SatelliteGlobeProps> = ({
  userRole,
  onRegionClick,
  selectedProjectId,
  showNDVILayer = true,
  timeSliderValue
}) => {
  const globeRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<ProjectMarker | null>(null);
  const [rotation, setRotation] = useState(0);
  const [viewMode, setViewMode] = useState<'satellite' | 'ndvi'>('ndvi');

  // Sample project data based on user role
  const getProjectMarkers = (): ProjectMarker[] => {
    const allMarkers: ProjectMarker[] = [
      {
        id: 'proj-1',
        name: 'Sundarbans Restoration',
        latitude: 22.5,
        longitude: 89.0,
        status: 'active',
        ndviValue: 0.65,
        description: 'Mangrove restoration in Sundarbans delta',
        carbonCredits: 1250,
        area: 45.2
      },
      {
        id: 'proj-2',
        name: 'Kerala Backwaters',
        latitude: 9.9,
        longitude: 76.3,
        status: 'active',
        ndviValue: 0.72,
        description: 'Coastal mangrove enhancement project',
        carbonCredits: 980,
        area: 32.7
      },
      {
        id: 'proj-3',
        name: 'Odisha Coast',
        latitude: 19.8,
        longitude: 85.8,
        status: 'pending',
        ndviValue: 0.45,
        description: 'New mangrove plantation initiative',
        carbonCredits: 0,
        area: 67.1
      },
      {
        id: 'proj-4',
        name: 'Tamil Nadu Estuary',
        latitude: 11.1,
        longitude: 79.8,
        status: 'completed',
        ndviValue: 0.78,
        description: 'Completed restoration project',
        carbonCredits: 1840,
        area: 58.9
      },
      {
        id: 'proj-5',
        name: 'Gujarat Coastal Zone',
        latitude: 22.3,
        longitude: 69.8,
        status: 'active',
        ndviValue: 0.58,
        description: 'Mangrove conservation and expansion',
        carbonCredits: 750,
        area: 28.5
      }
    ];

    // Filter based on user role
    switch (userRole) {
      case 'community':
        return allMarkers.filter(m => m.id === 'proj-1'); // Only their project
      case 'ngo':
        return allMarkers.filter(m => ['proj-1', 'proj-2', 'proj-3'].includes(m.id)); // Assigned projects
      case 'nccr':
      default:
        return allMarkers; // All projects
    }
  };

  const getNDVIColor = (ndviValue: number): string => {
    if (ndviValue >= 0.6) return NDVI_COLORS.healthy;
    if (ndviValue >= 0.4) return NDVI_COLORS.moderate;
    return NDVI_COLORS.poor;
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return '#0077B6';
      case 'pending': return '#FF9800';
      case 'completed': return '#4CAF50';
      default: return '#64748b';
    }
  };

  // Convert lat/lng to 3D sphere coordinates
  const latLngToXYZ = (lat: number, lng: number, radius: number = 150) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    
    return { x, y, z };
  };

  const handleMarkerClick = (marker: ProjectMarker) => {
    setSelectedRegion(marker);
    onRegionClick?.(marker);
  };

  const renderMarkers = () => {
    const markers = getProjectMarkers();
    return markers.map(marker => {
      // Convert lat/lng to percentage positions on the Earth image
      // This is a simplified projection for India region
      const latRange = [6, 38]; // India's approximate latitude range
      const lngRange = [68, 98]; // India's approximate longitude range
      
      const latPercent = ((marker.latitude - latRange[0]) / (latRange[1] - latRange[0])) * 100;
      const lngPercent = ((marker.longitude - lngRange[0]) / (lngRange[1] - lngRange[0])) * 100;
      
      // Clamp values to image bounds
      const top = Math.max(10, Math.min(90, 100 - latPercent));
      const left = Math.max(10, Math.min(90, lngPercent));
      
      const isSelected = marker.id === selectedProjectId;
      const color = viewMode === 'ndvi' ? getNDVIColor(marker.ndviValue) : getStatusColor(marker.status);
      
      return (
        <div
          key={marker.id}
          className="marker"
          style={{
            position: 'absolute',
            top: `${top}%`,
            left: `${left}%`,
            transform: 'translate(-50%, -50%)',
            width: isSelected ? '16px' : '12px',
            height: isSelected ? '16px' : '12px',
            background: color,
            borderRadius: '50%',
            border: `2px solid ${isSelected ? '#FFD700' : '#FFFFFF'}`,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: `0 0 ${isSelected ? '20px' : '10px'} ${color}80`,
            zIndex: isSelected ? 1000 : 100,
            animation: isSelected ? 'pulse 2s infinite' : 'none'
          }}
          onClick={() => handleMarkerClick(marker)}
          title={`${marker.name} (NDVI: ${marker.ndviValue})`}
        />
      );
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const styles = {
    container: {
      position: 'relative' as const,
      width: '100%',
      height: '100%',
      borderRadius: '1rem',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0a 70%, #000000 100%)',
      perspective: '1000px'
    },
    globeContainer: {
      position: 'relative' as const,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transformStyle: 'preserve-3d' as const
    },
    globe: {
      width: '500px',
      height: '500px',
      borderRadius: '1rem',
      position: 'relative' as const,
      backgroundImage: 'url(/earth-satellite-view.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      boxShadow: `
        0 0 50px rgba(0, 119, 182, 0.3),
        inset 0 0 50px rgba(0, 0, 0, 0.2)
      `,
      border: '2px solid rgba(255, 255, 255, 0.1)',
      overflow: 'hidden'
    },
    loadingOverlay: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(248, 250, 249, 0.95)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    },
    loadingContent: {
      textAlign: 'center' as const,
      color: '#0077B6'
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '4px solid rgba(0, 119, 182, 0.1)',
      borderTop: '4px solid #0077B6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '1rem'
    },
    controls: {
      position: 'absolute' as const,
      top: '1rem',
      right: '1rem',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem',
      zIndex: 100
    },
    controlButton: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: '1px solid rgba(0, 119, 182, 0.2)',
      borderRadius: '8px',
      padding: '0.5rem 0.75rem',
      cursor: 'pointer',
      color: '#0077B6',
      fontSize: '0.875rem',
      fontWeight: 500,
      transition: 'all 0.2s',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    activeControl: {
      background: 'rgba(0, 119, 182, 0.1)',
      color: '#0077B6',
      borderColor: '#0077B6'
    },
    legend: {
      position: 'absolute' as const,
      bottom: '1rem',
      left: '1rem',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '12px',
      padding: '1rem',
      border: '1px solid rgba(0, 119, 182, 0.1)',
      backdropFilter: 'blur(10px)',
      zIndex: 100,
      minWidth: '200px'
    },
    legendTitle: {
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#0077B6',
      marginBottom: '0.75rem'
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '0.5rem',
      fontSize: '0.75rem',
      color: '#64748b'
    },
    legendColor: {
      width: '14px',
      height: '14px',
      borderRadius: '50%',
      border: '1px solid rgba(255, 255, 255, 0.5)'
    },
    regionInfo: {
      position: 'absolute' as const,
      top: '1rem',
      left: '1rem',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '12px',
      padding: '1rem',
      border: '1px solid rgba(0, 119, 182, 0.1)',
      backdropFilter: 'blur(10px)',
      zIndex: 100,
      maxWidth: '300px'
    },
    regionTitle: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#0077B6',
      marginBottom: '0.5rem'
    },
    regionStats: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.5rem',
      marginTop: '0.75rem'
    },
    statItem: {
      textAlign: 'center' as const,
      padding: '0.5rem',
      background: 'rgba(0, 119, 182, 0.05)',
      borderRadius: '6px'
    },
    statValue: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#0077B6'
    },
    statLabel: {
      fontSize: '0.75rem',
      color: '#64748b',
      marginTop: '0.25rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.globeContainer}>
        <div ref={globeRef} style={styles.globe}>
          {!isLoading && renderMarkers()}
        </div>
      </div>
      
      {isLoading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loadingContent}>
            <div style={styles.spinner}></div>
            <div>Loading National NDVI Satellite Monitoring...</div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div style={styles.controls}>
        <button 
          style={{
            ...styles.controlButton,
            ...(viewMode === 'satellite' ? styles.activeControl : {})
          }}
          onClick={() => setViewMode('satellite')}
        >
          🛰️ Satellite View
        </button>
        <button 
          style={{
            ...styles.controlButton,
            ...(viewMode === 'ndvi' ? styles.activeControl : {})
          }}
          onClick={() => setViewMode('ndvi')}
        >
          🌱 NDVI Analysis
        </button>
        <button 
          style={styles.controlButton}
          onClick={() => setSelectedRegion(null)}
        >
          � Clear Selection
        </button>
      </div>

      {/* Selected Region Info */}
      {selectedRegion && (
        <div style={styles.regionInfo}>
          <div style={styles.regionTitle}>{selectedRegion.name}</div>
          <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
            {selectedRegion.description}
          </div>
          <div style={styles.regionStats}>
            <div style={styles.statItem}>
              <div style={styles.statValue}>{selectedRegion.ndviValue.toFixed(2)}</div>
              <div style={styles.statLabel}>NDVI Index</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>{selectedRegion.area}ha</div>
              <div style={styles.statLabel}>Area</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>{selectedRegion.carbonCredits}</div>
              <div style={styles.statLabel}>Credits</div>
            </div>
            <div style={styles.statItem}>
              <div style={{ 
                ...styles.statValue, 
                color: getStatusColor(selectedRegion.status) 
              }}>
                {selectedRegion.status.toUpperCase()}
              </div>
              <div style={styles.statLabel}>Status</div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div style={styles.legend}>
        <div style={styles.legendTitle}>
          {viewMode === 'ndvi' ? 'NDVI Health Index' : 'Project Status'}
        </div>
        {viewMode === 'ndvi' ? (
          <>
            <div style={styles.legendItem}>
              <div style={{...styles.legendColor, background: NDVI_COLORS.healthy}}></div>
              <span>Healthy (0.6+)</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{...styles.legendColor, background: NDVI_COLORS.moderate}}></div>
              <span>Moderate (0.4-0.6)</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{...styles.legendColor, background: NDVI_COLORS.poor}}></div>
              <span>Poor (&lt;0.4)</span>
            </div>
          </>
        ) : (
          <>
            <div style={styles.legendItem}>
              <div style={{...styles.legendColor, background: '#0077B6'}}></div>
              <span>Active</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{...styles.legendColor, background: '#FF9800'}}></div>
              <span>Pending</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{...styles.legendColor, background: '#4CAF50'}}></div>
              <span>Completed</span>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 currentColor; }
          70% { box-shadow: 0 0 0 10px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }
        
        .marker:hover {
          transform: translate(-50%, -50%) scale(1.3) !important;
          transition: all 0.2s ease !important;
        }
      `}</style>
    </div>
  );
};

export default SatelliteGlobe;
