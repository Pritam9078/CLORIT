import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';

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

interface SatelliteGlobe3DProps {
    userRole: 'community' | 'ngo' | 'admin';
    onRegionClick?: (region: ProjectMarker) => void;
    selectedProjectId?: string;
    showNDVILayer?: boolean;
    timeSliderValue?: string;
}

const SatelliteGlobe3D: React.FC<SatelliteGlobe3DProps> = ({
    userRole,
    onRegionClick,
    selectedProjectId,
    showNDVILayer = true,
    timeSliderValue
}) => {
    const globeEl = useRef<any>();
    const containerRef = useRef<HTMLDivElement>(null);
    const [globeReady, setGlobeReady] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Handle responsive resizing and event isolation
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setDimensions({ width, height });
            }
        });

        observer.observe(containerRef.current);

        // Prevent scroll propagation when zooming on the globe
        const handleWheel = (e: WheelEvent) => {
            // Only stop propagation to prevent parent scrolling
            // The globe itself will still receive the event via Three.js
            e.stopPropagation();
        };

        const container = containerRef.current;
        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            observer.disconnect();
            container.removeEventListener('wheel', handleWheel);
        };
    }, []);

    // Sample project data based on user role
    const getProjectMarkers = (): ProjectMarker[] => {
        const allProjects: ProjectMarker[] = [
            {
                id: 'CLORIT-2001',
                name: 'Sundarban Mangrove Restoration',
                latitude: 21.95,
                longitude: 88.88,
                status: 'active',
                ndviValue: 0.65,
                description: 'Large-scale mangrove restoration in Sundarban delta',
                carbonCredits: 2500,
                area: 97.95
            },
            {
                id: 'CLORIT-2002',
                name: 'Kerala Backwater Conservation',
                latitude: 9.93,
                longitude: 76.27,
                status: 'active',
                ndviValue: 0.72,
                description: 'Seagrass restoration in Kerala backwaters',
                carbonCredits: 700,
                area: 49.16
            },
            {
                id: 'CLORIT-2003',
                name: 'Andhra Pradesh Coastal Project',
                latitude: 15.91,
                longitude: 80.33,
                status: 'active',
                ndviValue: 0.58,
                description: 'Mangrove restoration along Andhra coast',
                carbonCredits: 1800,
                area: 104.75
            },
            {
                id: 'CLORIT-2004',
                name: 'Puducherry Seagrass Initiative',
                latitude: 11.93,
                longitude: 79.83,
                status: 'pending',
                ndviValue: 0.42,
                description: 'Seagrass meadow restoration',
                carbonCredits: 0,
                area: 106.94
            },
            {
                id: 'CLORIT-2005',
                name: 'Lakshadweep Saltmarsh',
                latitude: 10.57,
                longitude: 72.64,
                status: 'active',
                ndviValue: 0.78,
                description: 'Saltmarsh ecosystem restoration',
                carbonCredits: 1200,
                area: 109.96
            },
            {
                id: 'CLORIT-2006',
                name: 'Tamil Nadu Mangrove Project',
                latitude: 11.13,
                longitude: 79.83,
                status: 'completed',
                ndviValue: 0.68,
                description: 'Completed mangrove restoration',
                carbonCredits: 1500,
                area: 65.5
            },
            {
                id: 'CLORIT-2007',
                name: 'Gujarat Coastal Restoration',
                latitude: 21.17,
                longitude: 72.83,
                status: 'active',
                ndviValue: 0.55,
                description: 'Mangrove restoration in Gujarat',
                carbonCredits: 900,
                area: 45.3
            },
            {
                id: 'CLORIT-2008',
                name: 'Odisha Mangrove Initiative',
                latitude: 20.27,
                longitude: 85.84,
                status: 'pending',
                ndviValue: 0.45,
                description: 'New mangrove project in Odisha',
                carbonCredits: 0,
                area: 78.2
            }
        ];

        return allProjects;
    };

    const projects = getProjectMarkers();

    // Get NDVI color
    const getNDVIColor = (ndviValue: number): string => {
        if (ndviValue >= 0.6) return NDVI_COLORS.healthy;
        if (ndviValue >= 0.4) return NDVI_COLORS.moderate;
        return NDVI_COLORS.poor;
    };

    // Get status color
    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'active': return '#4CAF50';
            case 'pending': return '#FF9800';
            case 'completed': return '#2196F3';
            default: return '#9E9E9E';
        }
    };

    // Convert projects to globe points
    const pointsData = projects.map(project => ({
        lat: project.latitude,
        lng: project.longitude,
        size: 0.5,
        color: showNDVILayer ? getNDVIColor(project.ndviValue) : getStatusColor(project.status),
        label: project.name,
        project: project
    }));

    // Auto-rotate globe
    useEffect(() => {
        if (globeEl.current && globeReady) {
            // Auto-rotate
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.5;

            // Set initial view to India
            globeEl.current.pointOfView({ lat: 20.5937, lng: 78.9629, altitude: 2.5 }, 1000);
        }
    }, [globeReady]);

    // Focus on selected project
    useEffect(() => {
        if (globeEl.current && selectedProjectId && globeReady) {
            const project = projects.find(p => p.id === selectedProjectId);
            if (project) {
                globeEl.current.pointOfView({
                    lat: project.latitude,
                    lng: project.longitude,
                    altitude: 1.5
                }, 1500);
            }
        }
    }, [selectedProjectId, globeReady]);

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            <Globe
                ref={globeEl}
                width={dimensions.width}
                height={dimensions.height}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

                // Points (Project Markers)
                pointsData={pointsData}
                pointAltitude={0.01}
                pointRadius={0.5}
                pointColor="color"
                pointLabel={(d: any) => `
          <div style="
            background: rgba(0, 0, 0, 0.85);
            padding: 12px 16px;
            border-radius: 8px;
            color: white;
            font-family: Arial, sans-serif;
            max-width: 250px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          ">
            <div style="font-weight: bold; font-size: 14px; margin-bottom: 6px; color: ${d.color};">
              ${d.label}
            </div>
            <div style="font-size: 12px; margin-bottom: 4px;">
              📍 ${d.project.description}
            </div>
            <div style="font-size: 11px; color: #aaa;">
              NDVI: ${d.project.ndviValue.toFixed(2)} | 
              Status: ${d.project.status}
            </div>
            ${d.project.carbonCredits ? `
              <div style="font-size: 11px; color: #4CAF50; margin-top: 4px;">
                💰 ${d.project.carbonCredits} CCTs
              </div>
            ` : ''}
          </div>
        `}
                onPointClick={(point: any) => {
                    if (onRegionClick) {
                        onRegionClick(point.project);
                    }
                }}

                // Atmosphere
                atmosphereColor="lightskyblue"
                atmosphereAltitude={0.15}

                // Controls
                enablePointerInteraction={true}

                // Animation
                animateIn={true}

                // Callback when globe is ready
                onGlobeReady={() => setGlobeReady(true)}
            />
        </div>
    );
};

export default SatelliteGlobe3D;
