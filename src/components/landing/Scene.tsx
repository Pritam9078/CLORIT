import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import Globe from './Globe';
import Satellites from './Satellites';

const Scene: React.FC = () => {
    return (
        <div className="absolute inset-0 w-full h-full bg-slate-950 -z-10">
            <Canvas
                shadows
                gl={{ antialias: true, alpha: true }}
                style={{ width: '100%', height: '100%' }}
                dpr={[1, 2]}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
                
                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#22c55e" />
                <spotLight
                    position={[0, 5, 10]}
                    angle={0.3}
                    penumbra={1}
                    intensity={2}
                    castShadow
                    color="#ffffff"
                />

                <Suspense fallback={null}>
                    <group>
                        {/* Background Elements */}
                        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                        
                        {/* Main Globe */}
                        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                            <Globe />
                        </Float>

                        {/* Interactive Satellites */}
                        <Satellites />
                    </group>
                    
                    <Environment preset="night" />
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>
            
            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 opacity-40 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)] pointer-events-none" />
        </div>
    );
};

export default Scene;
