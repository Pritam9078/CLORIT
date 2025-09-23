import React, { useEffect, useRef, useState } from 'react';

// NDVI color mapping
const NDVI_COLORS = {
  healthy: '#4CAF50',    // Green
  moderate: '#FFEB3B',   // Yellow
  poor: '#F44336'        // Red
};

// Project status colors
const STATUS_COLORS = {
  active: '#2196F3',     // Blue
  pending: '#FF9800',    // Orange
  completed: '#4CAF50'   // Green
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

interface RealisticGlobeProps {
  userRole: 'ngo' | 'nccr';
  showNDVILayer?: boolean;
  onMarkerClick?: (marker: ProjectMarker) => void;
}

const RealisticGlobe: React.FC<RealisticGlobeProps> = ({
  userRole,
  showNDVILayer = true,
  onMarkerClick
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  
  const [isLoading, setIsLoading] = useState(true);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [selectedMarker, setSelectedMarker] = useState<ProjectMarker | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

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
    if (userRole === 'ngo') {
      return projectMarkers.filter(m => ['proj-1', 'proj-2', 'proj-3'].includes(m.id));
    }
    return projectMarkers; // NCCR sees all
  };

  // Convert lat/lng to 3D coordinates
  const latLngTo3D = (lat: number, lng: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    
    return { x, y, z };
  };

  // Get NDVI color
  const getNDVIColor = (ndviValue: number): string => {
    if (ndviValue >= 0.6) return NDVI_COLORS.healthy;
    if (ndviValue >= 0.4) return NDVI_COLORS.moderate;
    return NDVI_COLORS.poor;
  };

  // Load and render the Earth image
  const [earthImage, setEarthImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setEarthImage(img);
    img.src = '/earth-satellite-view.jpg';
  }, []);

  // Render the globe with realistic Earth image
  const renderGlobe = () => {
    const canvas = canvasRef.current;
    if (!canvas || !earthImage) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.35 * zoom;

    // Clear canvas with space background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add stars background
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 2;
      ctx.fillRect(x, y, size, size);
    }

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation.y * 0.01);

    // Create circular clipping path for Earth
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.clip();

    // Draw the realistic Earth image
    const imgSize = radius * 2;
    ctx.drawImage(earthImage, -imgSize/2, -imgSize/2, imgSize, imgSize);

    ctx.restore();

    // Add atmospheric glow effect
    ctx.save();
    ctx.translate(centerX, centerY);
    const atmosphereGradient = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.15);
    atmosphereGradient.addColorStop(0, 'rgba(135, 206, 250, 0)');
    atmosphereGradient.addColorStop(0.7, 'rgba(135, 206, 250, 0.3)');
    atmosphereGradient.addColorStop(1, 'rgba(135, 206, 250, 0.6)');
    
    ctx.beginPath();
    ctx.arc(0, 0, radius * 1.15, 0, Math.PI * 2);
    ctx.fillStyle = atmosphereGradient;
    ctx.fill();
    ctx.restore();

    // Render NDVI overlay regions if enabled
    if (showNDVILayer && userRole === 'nccr') {
      renderNDVIOverlay(ctx, centerX, centerY, radius);
    }

    // Render project markers
    renderMarkers(ctx, centerX, centerY, radius);
  };

  // Render NDVI overlay patches
  const renderNDVIOverlay = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
    const overlayRegions = [
      { lat: 22.5, lng: 89.0, ndvi: 0.65, size: 30 },
      { lat: 9.9, lng: 76.3, ndvi: 0.72, size: 25 },
      { lat: 19.8, lng: 85.8, ndvi: 0.45, size: 35 },
      { lat: 11.1, lng: 79.8, ndvi: 0.78, size: 28 },
      { lat: 22.3, lng: 69.8, ndvi: 0.58, size: 22 },
      { lat: 15.0, lng: 75.0, ndvi: 0.52, size: 20 },
      { lat: 20.0, lng: 82.0, ndvi: 0.38, size: 18 }
    ];

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation.y * 0.01);

    overlayRegions.forEach(region => {
      const pos3D = latLngTo3D(region.lat, region.lng, radius * 0.98);
      
      // Only render if facing the viewer (simple z-depth check)
      if (pos3D.z > -radius * 0.3) {
        const overlayGradient = ctx.createRadialGradient(
          pos3D.x, pos3D.y, 0,
          pos3D.x, pos3D.y, region.size * zoom
        );
        
        const color = getNDVIColor(region.ndvi);
        overlayGradient.addColorStop(0, color + '80'); // Semi-transparent
        overlayGradient.addColorStop(0.7, color + '40');
        overlayGradient.addColorStop(1, color + '10');
        
        ctx.beginPath();
        ctx.arc(pos3D.x, pos3D.y, region.size * zoom, 0, Math.PI * 2);
        ctx.fillStyle = overlayGradient;
        ctx.fill();
      }
    });

    ctx.restore();
  };

  // Render project markers
  const renderMarkers = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
    const visibleMarkers = getVisibleMarkers();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation.y * 0.01);

    visibleMarkers.forEach(marker => {
      const pos3D = latLngTo3D(marker.latitude, marker.longitude, radius * 1.02);
      
      // Only render if facing the viewer
      if (pos3D.z > -radius * 0.2) {
        const markerSize = selectedMarker?.id === marker.id ? 12 : 8;
        const color = STATUS_COLORS[marker.status];
        
        // Marker shadow
        ctx.beginPath();
        ctx.arc(pos3D.x + 2, pos3D.y + 2, markerSize, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fill();

        // Marker
        ctx.beginPath();
        ctx.arc(pos3D.x, pos3D.y, markerSize, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        // Marker border
        ctx.beginPath();
        ctx.arc(pos3D.x, pos3D.y, markerSize, 0, Math.PI * 2);
        ctx.strokeStyle = selectedMarker?.id === marker.id ? '#FFD700' : '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Pulsing effect for selected marker
        if (selectedMarker?.id === marker.id) {
          const pulseRadius = markerSize + Math.sin(Date.now() * 0.01) * 5;
          ctx.beginPath();
          ctx.arc(pos3D.x, pos3D.y, pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = color + '40';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }
    });

    ctx.restore();
  };

  // Handle mouse interactions
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - lastMouse.x;
      const deltaY = e.clientY - lastMouse.y;
      
      setRotation(prev => ({
        x: prev.x + deltaY * 0.5,
        y: prev.y + deltaX * 0.5
      }));
      
      setLastMouse({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.5, Math.min(2, prev * zoomFactor)));
  };

  const handleMarkerClick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - canvas.width / 2;
    const y = e.clientY - rect.top - canvas.height / 2;

    const visibleMarkers = getVisibleMarkers();
    const radius = Math.min(canvas.width, canvas.height) * 0.35 * zoom;

    // Check if click is near any marker
    for (const marker of visibleMarkers) {
      const pos3D = latLngTo3D(marker.latitude, marker.longitude, radius * 1.02);
      const adjustedX = pos3D.x * Math.cos(rotation.y * 0.01) - pos3D.z * Math.sin(rotation.y * 0.01);
      const adjustedY = pos3D.y;
      
      const distance = Math.sqrt((x - adjustedX) ** 2 + (y - adjustedY) ** 2);
      
      if (distance <= 15) {
        setSelectedMarker(marker);
        onMarkerClick?.(marker);
        break;
      }
    }
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setZoom(1);
    setSelectedMarker(null);
  };

  // Animation loop
  useEffect(() => {
    const animate = () => {
      if (earthImage) {
        renderGlobe();
        
        if (!isDragging) {
          setRotation(prev => ({ ...prev, y: prev.y + 0.2 }));
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    const timer = setTimeout(() => {
      setIsLoading(false);
      animate();
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, rotation, zoom, selectedMarker, showNDVILayer, userRole, earthImage]);

  // Resize canvas
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const styles = {
    container: {
      position: 'relative' as const,
      width: '100%',
      height: '100%',
      borderRadius: '1rem',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0a 70%, #000000 100%)',
      userSelect: 'none' as const,
      cursor: isDragging ? 'grabbing' : 'grab'
    },
    canvas: {
      width: '100%',
      height: '100%',
      display: 'block'
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
      width: '50px',
      height: '50px',
      border: '5px solid rgba(0, 119, 182, 0.1)',
      borderTop: '5px solid #0077B6',
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
      gap: '0.75rem',
      zIndex: 100
    },
    controlButton: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: '1px solid rgba(0, 119, 182, 0.2)',
      borderRadius: '10px',
      padding: '0.75rem',
      cursor: 'pointer',
      color: '#0077B6',
      fontSize: '0.875rem',
      fontWeight: 600,
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '45px',
      height: '45px'
    },
    zoomControls: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem'
    },
    markerInfo: {
      position: 'absolute' as const,
      top: '1rem',
      left: '1rem',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '12px',
      padding: '1.5rem',
      border: '1px solid rgba(0, 119, 182, 0.1)',
      backdropFilter: 'blur(10px)',
      zIndex: 100,
      maxWidth: '320px',
      boxShadow: '0 10px 25px rgba(0, 119, 182, 0.15)'
    },
    markerTitle: {
      fontSize: '1.1rem',
      fontWeight: 700,
      color: '#0077B6',
      marginBottom: '0.5rem'
    },
    markerDescription: {
      fontSize: '0.9rem',
      color: '#64748b',
      marginBottom: '1rem',
      lineHeight: 1.4
    },
    markerStats: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.75rem'
    },
    statItem: {
      textAlign: 'center' as const,
      padding: '0.75rem',
      background: 'rgba(0, 119, 182, 0.05)',
      borderRadius: '8px'
    },
    statValue: {
      fontSize: '1.4rem',
      fontWeight: 700,
      color: '#0077B6'
    },
    statLabel: {
      fontSize: '0.75rem',
      color: '#64748b',
      marginTop: '0.25rem',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px'
    }
  };

  return (
    <div
      ref={containerRef}
      style={styles.container}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      onClick={handleMarkerClick}
    >
      <canvas ref={canvasRef} style={styles.canvas} />
      
      {isLoading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loadingContent}>
            <div style={styles.spinner}></div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>
              Loading National NDVI Satellite Monitoring...
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div style={styles.controls}>
        <div style={styles.zoomControls}>
          <button 
            style={styles.controlButton}
            onClick={() => setZoom(prev => Math.min(2, prev * 1.2))}
            title="Zoom In"
          >
            🔍+
          </button>
          <button 
            style={styles.controlButton}
            onClick={() => setZoom(prev => Math.max(0.5, prev * 0.8))}
            title="Zoom Out"
          >
            🔍-
          </button>
        </div>
        <button 
          style={styles.controlButton}
          onClick={resetView}
          title="Reset View"
        >
          🏠
        </button>
      </div>

      {/* Selected Marker Info */}
      {selectedMarker && (
        <div style={styles.markerInfo}>
          <div style={styles.markerTitle}>{selectedMarker.name}</div>
          <div style={styles.markerDescription}>{selectedMarker.description}</div>
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
              <div 
                style={{
                  ...styles.statValue, 
                  color: STATUS_COLORS[selectedMarker.status]
                }}
              >
                {selectedMarker.status.toUpperCase()}
              </div>
              <div style={styles.statLabel}>Status</div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default RealisticGlobe;
