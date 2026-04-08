import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Satellites: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);
    
    // Generate random satellite orbits
    const satelliteData = useMemo(() => {
        return Array.from({ length: 5 }).map((_, i) => ({
            id: i,
            radius: 4 + Math.random() * 2,
            speed: 0.1 + Math.random() * 0.2,
            offset: Math.random() * Math.PI * 2,
            tilt: (Math.random() - 0.5) * Math.PI,
            color: i % 2 === 0 ? '#22c55e' : '#3b82f6'
        }));
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.children.forEach((child, i) => {
                const data = satelliteData[i];
                const angle = time * data.speed + data.offset;
                
                // Orbit calculation
                const x = Math.cos(angle) * data.radius;
                const z = Math.sin(angle) * data.radius;
                const y = Math.sin(angle * 0.5) * data.radius * Math.sin(data.tilt);
                
                child.position.set(x, y, z);
                
                // Face the center
                child.lookAt(0, 0, 0);
            });
        }
    });

    return (
        <group ref={groupRef}>
            {satelliteData.map((data) => (
                <group key={data.id}>
                    {/* Satellite Body */}
                    <mesh>
                        <boxGeometry args={[0.05, 0.05, 0.1]} />
                        <meshStandardMaterial color={data.color} emissive={data.color} emissiveIntensity={2} />
                    </mesh>
                    
                    {/* Solar Panels */}
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[0.3, 0.01, 0.08]} />
                        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
                    </mesh>

                    {/* Data Beam (Light trail towards Earth) */}
                    <Line
                        points={[[0, 0, 0], [0, 0, -data.radius + 3]]}
                        color={data.color}
                        lineWidth={0.5}
                        transparent
                        opacity={0.3}
                    />

                    {/* Glowing point at contact */}
                    <Sphere args={[0.02, 8, 8]} position={[0, 0, -data.radius + 3]}>
                        <meshBasicMaterial color={data.color} transparent opacity={0.6} />
                    </Sphere>
                </group>
            ))}
        </group>
    );
};

export default Satellites;
