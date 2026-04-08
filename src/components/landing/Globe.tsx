import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Globe: React.FC = () => {
    const globeRef = useRef<THREE.Mesh>(null);
    const atmosphereRef = useRef<THREE.Mesh>(null);
    
    // Fallback textures or local paths
    const [colorMap, bumpMap] = useTexture([
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    ]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (globeRef.current) {
            globeRef.current.rotation.y = time * 0.05;
        }
        if (atmosphereRef.current) {
            atmosphereRef.current.rotation.y = time * 0.04;
            atmosphereRef.current.scale.setScalar(1.02 + Math.sin(time * 0.5) * 0.005);
        }
    });

    return (
        <group>
            {/* Main Earth Sphere */}
            <Sphere ref={globeRef} args={[3, 64, 64]}>
                <meshStandardMaterial
                    map={colorMap}
                    bumpMap={bumpMap}
                    bumpScale={0.05}
                    metalness={0.4}
                    roughness={0.7}
                    emissive={new THREE.Color('#3b82f6')}
                    emissiveIntensity={0.25} // Electric blue glow
                />
            </Sphere>

            {/* Glassy Atmosphere Layer */}
            <Sphere ref={atmosphereRef} args={[3.08, 64, 64]}>
                <meshPhysicalMaterial
                    transparent
                    opacity={0.4}
                    color="#93c5fd"
                    transmission={0.8}
                    thickness={1}
                    roughness={0.1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                />
            </Sphere>

            {/* Glowing Aura */}
            <Sphere args={[3.3, 32, 32]}>
                <meshBasicMaterial
                    color="#3b82f6"
                    transparent
                    opacity={0.08}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </Sphere>
        </group>
    );
};

export default Globe;
