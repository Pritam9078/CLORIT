import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { ProjectMarkers } from './ProjectMarkers';

const GLOBE_RADIUS = 2;

// Standard public textures for photorealistic earth
const TEXTURE_URLS = {
  diffuse: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
  bump: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
  specular: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
  clouds: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
};

// Atmospheric Glow Shader (Fresnel effect)
const atmosphereVertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = `
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
  }
`;

interface EarthSceneProps {
  markers: any[];
  selectedProjectId?: string;
  onMarkerClick?: (marker: any) => void;
  activeLayer?: string;
}

export const EarthScene: React.FC<EarthSceneProps> = ({ markers, selectedProjectId, onMarkerClick, activeLayer = 'NDVI' }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();

  const [targetPos, setTargetPos] = useState<THREE.Vector3 | null>(null);

  // Load High-Res Textures
  const [colorMap, bumpMap, specularMap, cloudsMap] = useTexture([
    TEXTURE_URLS.diffuse,
    TEXTURE_URLS.bump,
    TEXTURE_URLS.specular,
    TEXTURE_URLS.clouds
  ]);

  // Handle camera navigation when selection changes
  useEffect(() => {
    if (selectedProjectId) {
      const selectedMarker = markers.find(m => m.id === selectedProjectId);
      if (selectedMarker) {
        // Convert lat/lng to 3D coordinates
        const phi = (90 - selectedMarker.latitude) * (Math.PI / 180);
        const theta = (selectedMarker.longitude + 180) * (Math.PI / 180);
        
        const x = -(GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta));
        const z = (GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta));
        const y = (GLOBE_RADIUS * Math.cos(phi));
        
        const pos = new THREE.Vector3(x, y, z);
        setTargetPos(pos);
      }
    } else {
      setTargetPos(null);
    }
  }, [selectedProjectId, markers]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    
    // Auto-rotation only if no selection
    if (!selectedProjectId) {
      if (earthRef.current) {
        earthRef.current.rotation.y = elapsedTime / 15;
      }
      if (cloudsRef.current) {
        cloudsRef.current.rotation.y = elapsedTime / 12;
      }
    }

    // Smooth camera transition if target exists
    if (targetPos && controlsRef.current) {
      // Calculate camera position (zoom in on the target)
      const camTargetPos = targetPos.clone().normalize().multiplyScalar(4.5);
      
      // Smoothly move camera
      camera.position.lerp(camTargetPos, 0.05);
      
      // Smoothly move OrbitControls target
      controlsRef.current.target.lerp(targetPos, 0.05);
      controlsRef.current.update();
    } else if (!selectedProjectId && controlsRef.current) {
      // Return to center if navigation cleared
      controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
      controlsRef.current.update();
    }
  });

  const getLayerTint = () => {
    switch (activeLayer) {
      case 'NDVI': return new THREE.Color(0.7, 1.3, 0.7);
      case 'Temperature': return new THREE.Color(1.3, 0.8, 0.6);
      case 'Carbon': return new THREE.Color(0.8, 0.8, 1.3);
      case 'Deforestation': return new THREE.Color(1.3, 0.6, 0.6);
      default: return new THREE.Color(1, 1, 1);
    }
  };

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} />
      
      <Stars radius={300} depth={60} count={5000} factor={7} saturation={0} fade speed={1} />

      <OrbitControls 
        ref={controlsRef}
        enablePan={false}
        enableZoom={true}
        zoomSpeed={0.6}
        panSpeed={0.5}
        rotateSpeed={0.4}
        minDistance={3}
        maxDistance={10}
      />

      <group>
        <mesh ref={earthRef}>
          <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
          <meshPhongMaterial
            map={colorMap}
            bumpMap={bumpMap}
            bumpScale={0.015}
            specularMap={specularMap}
            specular={new THREE.Color('grey')}
            shininess={35}
            color={getLayerTint()}
          />

          <ProjectMarkers 
            markers={markers} 
            globeRadius={GLOBE_RADIUS} 
            activeLayer={activeLayer}
            selectedProjectId={selectedProjectId}
            onMarkerClick={onMarkerClick}
          />
        </mesh>

        <mesh ref={cloudsRef} scale={[1.006, 1.006, 1.006]}>
          <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
          <meshPhongMaterial
            map={cloudsMap}
            transparent={true}
            opacity={0.4}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        <mesh scale={[1.1, 1.1, 1.1]}>
          <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
          <shaderMaterial
            vertexShader={atmosphereVertexShader}
            fragmentShader={atmosphereFragmentShader}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
            transparent={true}
          />
        </mesh>
      </group>
    </>
  );
};

