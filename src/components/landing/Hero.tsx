import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Zap, Shield, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Scene from './Scene';

const Hero: React.FC = () => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
            {/* 3D Background Scene */}
            <Scene />

            {/* Foreground Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 text-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center"
                >
                    {/* Badge */}
                    <motion.div 
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 backdrop-blur-md"
                    >
                        <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                        <span className="text-sm font-bold text-emerald-400 uppercase tracking-widest">
                            New: Satellite MRV 2.0
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1 
                        variants={itemVariants}
                        className="text-5xl md:text-8xl font-black text-white mb-6 leading-tight tracking-tight px-4"
                    >
                        Monitor. Verify. <br />
                        <span className="bg-gradient-to-r from-emerald-400 via-blue-500 to-emerald-400 bg-[length:200%_auto] animate-gradient-text bg-clip-text text-transparent">
                            Monetize Nature.
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p 
                        variants={itemVariants}
                        className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
                    >
                        The futuristic geospatial intelligence protocol for coastal restoration. 
                        Tracking every mangrove growth with 30cm satellite precision and 
                        blockchain-certified integrity.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div 
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center gap-6"
                    >
                        <button
                            onClick={() => navigate('/register')}
                            className="group relative px-10 py-5 bg-emerald-500 text-slate-950 font-black text-lg rounded-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)]"
                        >
                            Explore Dashboard
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-x-0 -bottom-1 h-1 bg-emerald-700 rounded-full blur-sm opacity-50" />
                        </button>
                        
                        <button
                            onClick={() => navigate('/login')}
                            className="px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-bold text-lg rounded-2xl hover:bg-white/10 transition-all flex items-center gap-2"
                        >
                            Connect Protocol
                            <Shield className="w-5 h-5 opacity-60" />
                        </button>
                    </motion.div>

                    {/* Trust Signals */}
                    <motion.div 
                        variants={itemVariants}
                        className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
                    >
                        <div className="flex items-center gap-2 text-white font-bold tracking-tighter text-2xl italic">SENTINEL-2</div>
                        <div className="flex items-center gap-2 text-white font-bold tracking-tighter text-2xl italic">LANDSAT-9</div>
                        <div className="flex items-center gap-2 text-white font-bold tracking-tighter text-2xl italic">BLOCKCHAIN.CERT</div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
            >
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">Scroll to Explore</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <ChevronDown className="w-6 h-6 text-white" />
                </motion.div>
            </motion.div>

            {/* Decorative Edge Glows */}
            <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
        </section>
    );
};

export default Hero;
