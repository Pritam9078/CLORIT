import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import * as THREE from "three";

// Load Earth texture
import EarthTexture from "../assets/earth.jpeg";

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
  area?: number;
}

interface RealisticSatelliteGlobeProps {
  userRole?: 'community' | 'ngo' | 'nccr';
  onMarkerClick?: (marker: ProjectMarker) => void;
  showNDVILayer?: boolean;
}

// Earth component with texture
const Earth = ({ showNDVILayer = true }: { showNDVILayer?: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = new THREE.TextureLoader().load(EarthTexture);
  
  // Auto-rotate Earth
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group>
      {/* Earth sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial 
          map={texture} 
          transparent={showNDVILayer}
          opacity={showNDVILayer ? 0.9 : 1}
        />
      </mesh>
      
      {/* Atmospheric glow */}
      <mesh scale={[2.6, 2.6, 2.6]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial 
          color="#87CEEB" 
          transparent 
          opacity={0.1} 
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

// NDVI Marker component
const NDVIMarker = ({ 
  position, 
  color, 
  isSelected = false, 
  onClick 
}: { 
  position: [number, number, number];
  color: string;
  isSelected?: boolean;
  onClick?: () => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && isSelected) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.3);
    }
  });

  return (
    <mesh 
      ref={meshRef}
      position={position} 
      onClick={onClick}
      scale={isSelected ? 1.5 : 1}
    >
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.9}
      />
      {/* Glow effect */}
      <mesh scale={[2, 2, 2]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.2}
        />
      </mesh>
    </mesh>
  );
};

const RealisticSatelliteGlobe: React.FC<RealisticSatelliteGlobeProps> = ({
  userRole = 'nccr',
  onMarkerClick,
  showNDVILayer = true
}) => {
  const [selectedMarker, setSelectedMarker] = useState<ProjectMarker | null>(null);
  const [viewMode, setViewMode] = useState<'satellite' | 'ndvi'>('ndvi');

  // Sample project data
  const projectMarkers: ProjectMarker[] = [
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

  // Filter markers based on user role
  const getVisibleMarkers = () => {
    switch (userRole) {
      case 'community':
        return projectMarkers.filter(m => m.id === 'proj-1');
      case 'ngo':
        return projectMarkers.filter(m => ['proj-1', 'proj-2', 'proj-3'].includes(m.id));
      case 'nccr':
      default:
        return projectMarkers;
    }
  };

  // Convert lat/lng to 3D position on sphere
  const latLngTo3D = (lat: number, lng: number, radius: number = 2.6) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    
    return [x, y, z] as [number, number, number];
  };

  // Get NDVI color
  const getNDVIColor = (ndviValue: number): string => {
    if (ndviValue >= 0.6) return NDVI_COLORS.healthy;
    if (ndviValue >= 0.4) return NDVI_COLORS.moderate;
    return NDVI_COLORS.poor;
  };

  // Get status color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return '#0077B6';
      case 'pending': return '#FF9800';
      case 'completed': return '#4CAF50';
      default: return '#64748b';
    }
  };

  const handleMarkerClick = (marker: ProjectMarker) => {
    setSelectedMarker(marker);
    onMarkerClick?.(marker);
  };

  const styles = {
    container: {
      width: '100%',
      height: '600px',
      position: 'relative' as const,
      borderRadius: '1rem',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)'
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
    markerInfo: {
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
    markerTitle: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#0077B6',
      marginBottom: '0.5rem'
    },
    markerStats: {
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
      <Canvas camera={{ position: [6, 3, 6], fov: 60 }}>
        <Suspense fallback={null}>
          {/* Background stars */}
          <Stars radius={100} depth={50} count={5000} factor={4} fade speed={0.5} />

          {/* Earth model */}
          <Earth showNDVILayer={showNDVILayer} />

          {/* NDVI Markers */}
          {showNDVILayer && getVisibleMarkers().map(marker => {
            const position = latLngTo3D(marker.latitude, marker.longitude);
            const color = viewMode === 'ndvi' ? getNDVIColor(marker.ndviValue) : getStatusColor(marker.status);
            
            return (
              <NDVIMarker
                key={marker.id}
                position={position}
                color={color}
                isSelected={selectedMarker?.id === marker.id}
                onClick={() => handleMarkerClick(marker)}
              />
            );
          })}

          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />

          {/* Controls for rotation */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            rotateSpeed={0.6}
            zoomSpeed={0.5}
            minDistance={4}
            maxDistance={15}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>

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
          onClick={() => setSelectedMarker(null)}
        >
          🎯 Clear Selection
        </button>
      </div>

      {/* Selected Marker Info */}
      {selectedMarker && (
        <div style={styles.markerInfo}>
          <div style={styles.markerTitle}>{selectedMarker.name}</div>
          <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
            {selectedMarker.description}
          </div>
          <div style={styles.markerStats}>
            <div style={styles.statItem}>
              <div style={styles.statValue}>{selectedMarker.ndviValue.toFixed(2)}</div>
              <div style={styles.statLabel}>NDVI Index</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>{selectedMarker.area}ha</div>
              <div style={styles.statLabel}>Area</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>{selectedMarker.carbonCredits}</div>
              <div style={styles.statLabel}>Credits</div>
            </div>
            <div style={styles.statItem}>
              <div style={{ 
                ...styles.statValue, 
                color: getStatusColor(selectedMarker.status) 
              }}>
                {selectedMarker.status.toUpperCase()}
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
    </div>
  );
};

export default RealisticSatelliteGlobe;
