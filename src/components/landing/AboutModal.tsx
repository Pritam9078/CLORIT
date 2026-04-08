import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Globe, Shield, Zap, Users } from 'lucide-react';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 translate-z-0">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" 
                    />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="relative w-full max-w-5xl bg-[#0a0f1a]/90 backdrop-blur-2xl rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[85vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 z-[210] p-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all border border-white/10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Left Side: Brand & Identity */}
                        <div className="md:w-[40%] bg-gradient-to-br from-emerald-600/20 to-blue-700/20 p-12 flex flex-col border-r border-white/10 overflow-y-auto">
                            <div className="flex items-center gap-4 mb-12">
                                <img src="/clorit-logo.png" alt="Logo" className="w-12 h-12 rounded-xl shadow-2xl" />
                                <span className="text-2xl font-black text-white tracking-widest uppercase">CLORIT</span>
                            </div>

                            <h3 className="text-4xl lg:text-5xl font-black text-white mb-8 leading-[1.1]">
                                Bridging Nature <br /> 
                                <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent italic">
                                    & Digital Trust.
                                </span>
                            </h3>

                            <div className="mt-auto space-y-6">
                                <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 backdrop-blur-md">
                                    <div className="font-black text-emerald-400 mb-2 flex items-center gap-2 text-xs uppercase tracking-widest">
                                        <Target size={16} /> Our Mission
                                    </div>
                                    <p className="text-sm text-slate-400 font-medium leading-relaxed">
                                        Accelerating global coastal restoration through heavy-duty geospatial audits and on-chain accountability.
                                    </p>
                                </div>
                                <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 backdrop-blur-md">
                                    <div className="font-black text-blue-400 mb-2 flex items-center gap-2 text-xs uppercase tracking-widest">
                                        <Globe size={16} /> Our Vision
                                    </div>
                                    <p className="text-sm text-slate-400 font-medium leading-relaxed">
                                        Transforming every hectare of mangrove into an liquid, tradable, and impact-verified carbon asset.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Detailed Narrative */}
                        <div className="md:w-[60%] p-12 lg:p-20 overflow-y-auto custom-scrollbar">
                            <div className="space-y-8 text-xl text-slate-300 font-medium leading-[1.8] mb-16">
                                <p>
                                    CLORIT (Coastal & Land Observation Research & Innovation Team) is the infrastructure layer for the next generation of environmental markets.
                                </p>
                                <p>
                                    By fusing <span className="text-white font-bold border-b-2 border-emerald-500/50">Multi-Spectral Satellite Imagery</span> with 
                                    <span className="text-white font-bold border-b-2 border-blue-500/50"> Decentralized Trust Layers</span>, we eliminate the gray areas in carbon offset certification.
                                </p>
                            </div>

                            <div className="grid gap-6">
                                {[
                                    {
                                        icon: <Shield className="w-6 h-6" />,
                                        title: "Precision MRV",
                                        desc: "Every credit is synthetically linked to specific lat/long coordinates with 10m resolution verification.",
                                        color: "text-emerald-400",
                                        bg: "bg-emerald-400/5"
                                    },
                                    {
                                        icon: <Zap className="w-6 h-6" />,
                                        title: "Atomic Settlement",
                                        desc: "Real-time verification triggers automatic credit issuance, reducing lead times from months to milliseconds.",
                                        color: "text-blue-400",
                                        bg: "bg-blue-400/5"
                                    },
                                    {
                                        icon: <Users className="w-6 h-6" />,
                                        title: "Equity First",
                                        desc: "Eliminating middle-layer leakage to ensure maximum value capture for local restoration stewards.",
                                        color: "text-purple-400",
                                        bg: "bg-purple-400/5"
                                    }
                                ].map((pillar, i) => (
                                    <div key={i} className="flex gap-6 items-center p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/5 transition-all group">
                                        <div className={`shrink-0 p-4 rounded-2xl ${pillar.bg} ${pillar.color} group-hover:scale-110 transition-transform`}>
                                            {pillar.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-white text-lg tracking-tight mb-1">{pillar.title}</h4>
                                            <p className="text-sm text-slate-400 font-medium">{pillar.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full mt-16 py-6 bg-white text-slate-950 rounded-[2rem] font-black text-xl hover:bg-emerald-400 hover:scale-[1.02] transition-all shadow-2xl"
                            >
                                Enter Protocol
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AboutModal;
