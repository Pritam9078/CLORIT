import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EarthScene } from './globe/EarthScene';
import { useNDVIStore } from '../stores/useNDVIStore';
import { RegionData, generateMockRegionData } from '../lib/mockBlockchainData';

interface SatelliteGlobeProps {
  userRole?: 'community' | 'ngo' | 'admin';
  onRegionClick?: (region: { id: string }) => void;
  selectedProjectId?: string;
  showNDVILayer?: boolean;
}

const SatelliteGlobe: React.FC<SatelliteGlobeProps> = ({ userRole = 'admin', onRegionClick, selectedProjectId, showNDVILayer }) => {
  const { selectedRegion, setSelectedRegion, activeLayer, isFullscreen } = useNDVIStore();
  
  // Convert RegionData into the format expected by EarthScene
  const regionDataToMarkers = (regions: RegionData[]) => {
    return regions.map(r => ({
      id: r.id,
      name: r.name,
      latitude: r.lat,
      longitude: r.lng,
      status: r.status === 'Healthy' ? 'active' : r.status === 'Moderate' ? 'pending' : 'completed',
      ndviValue: r.ndvi,
      description: `Temperature: ${r.temperature}°C | Carbon: ${r.carbonDensity}t/ha`,
      carbonCredits: r.creditsMinted,
      area: r.area
    }));
  };

  const markers = regionDataToMarkers(generateMockRegionData() as any);

  return (
    <div className="relative w-full h-full rounded-[inherit] overflow-hidden bg-slate-950">
      <div className="absolute inset-0 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, isFullscreen ? 5 : 6], fov: 45 }}>
          <Suspense fallback={null}>
            <EarthScene 
              markers={markers as any} 
              selectedProjectId={selectedRegion || undefined}
              onMarkerClick={(marker: any) => setSelectedRegion(marker.id)}
              activeLayer={activeLayer}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default SatelliteGlobe;
