import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { latLngToVector3 } from '../../lib/globeUtils';

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

interface ProjectMarkersProps {
  markers: ProjectMarker[];
  globeRadius: number;
  onMarkerClick?: (marker: ProjectMarker) => void;
  selectedProjectId?: string;
  activeLayer: string;
}

const NDVI_COLORS = {
  healthy: '#4CAF50',
  moderate: '#FFEB3B',
  poor: '#F44336'
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

export const ProjectMarkers: React.FC<ProjectMarkersProps> = ({ 
  markers, 
  globeRadius, 
  onMarkerClick, 
  selectedProjectId, 
  activeLayer 
}) => {
  return (
    <group>
      {markers.map((marker) => {
        const [x, y, z] = latLngToVector3(marker.latitude, marker.longitude, globeRadius + 0.05); // slightly above surface
        const isSelected = marker.id === selectedProjectId;
        
        let baseColor = getStatusColor(marker.status);
        if (activeLayer === 'NDVI') baseColor = getNDVIColor(marker.ndviValue);
        else if (activeLayer === 'Temperature') baseColor = marker.ndviValue < 0.4 ? '#ef4444' : '#f97316';
        else if (activeLayer === 'Carbon') baseColor = marker.ndviValue > 0.6 ? '#3b82f6' : '#94a3b8';
        else if (activeLayer === 'Deforestation') baseColor = marker.ndviValue < 0.3 ? '#ef4444' : '#22c55e';

        return (
          <mesh 
            key={marker.id} 
            position={[x, y, z]} 
            onClick={(e) => {
              e.stopPropagation();
              onMarkerClick?.(marker);
            }}
          >
            {/* HTML Tooltip / Marker Pin */}
            <Html center zIndexRange={[100, 0]}>
              <div
                className="group relative flex items-center justify-center cursor-pointer"
                style={{
                  width: isSelected ? '16px' : '12px',
                  height: isSelected ? '16px' : '12px',
                  background: baseColor,
                  borderRadius: '50%',
                  border: `2px solid ${isSelected ? '#FFD700' : '#FFFFFF'}`,
                  boxShadow: `0 0 ${isSelected ? '20px' : '10px'} ${baseColor}aa`,
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Glow ring */}
                <div 
                  className="absolute inset-0 rounded-full animate-ping opacity-50"
                  style={{ backgroundColor: baseColor }}
                />

                {/* Hover Tooltip logic */}
                <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 bg-slate-900/90 backdrop-blur-md rounded-lg p-3 text-white shadow-xl shadow-black/50 border border-slate-700 pointer-events-none transform -translate-x-1/2 left-1/2 transition-opacity">
                  <p className="text-sm font-bold truncate text-green-400">{marker.name}</p>
                  <p className="text-xs text-slate-300 mt-1 lines-clamp-2">{marker.description}</p>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-400">NDVI</span>
                    <span style={{ color: getNDVIColor(marker.ndviValue) }}>{marker.ndviValue.toFixed(2)}</span>
                  </div>
                  {marker.carbonCredits !== undefined && (
                    <div className="mt-1 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-400">Credits</span>
                      <span className="text-blue-400">{marker.carbonCredits} CC</span>
                    </div>
                  )}
                </div>
              </div>
            </Html>
          </mesh>
        );
      })}
    </group>
  );
};
