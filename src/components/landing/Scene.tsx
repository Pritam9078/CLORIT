import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera, Environment, Float, Sparkles } from '@react-three/drei';
import Globe from '@/components/landing/Globe';
import Satellites from '@/components/landing/Satellites';

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
                
                {/* Premium Celestial Lighting */}
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={2.5} color="#00d2ff" /> {/* Hyper-Cyan Rim */}
                <pointLight position={[-10, -10, -10]} intensity={1.5} color="#3b82f6" /> {/* Deep Blue Fill */}
                <spotLight
                    position={[0, 5, 10]}
                    angle={0.4}
                    penumbra={1}
                    intensity={2}
                    castShadow
                    color="#ffffff"
                />

                <Suspense fallback={null}>
                    <group>
                        {/* Background Elements */}
                        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                        <Sparkles count={200} scale={15} size={3} speed={0.4} opacity={0.8} color="#00d2ff" noise={1} />
                        
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
            
            {/* Space Cyber-Grid & Celestial Nebula Overlay */}
            <div className="absolute inset-0 bg-cyber-grid mix-blend-overlay opacity-30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[rgba(10,20,40,0.8)] to-slate-950 opacity-60 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,210,255,0.15),transparent_50%)] pointer-events-none animate-pulse duration-1000" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.15),transparent_40%)] pointer-events-none" />
        </div>
    );
};

export default Scene;
