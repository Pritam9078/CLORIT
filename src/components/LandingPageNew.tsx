import React, { useState, useEffect, Suspense } from 'react';
import Navbar from './landing/Navbar';
import Hero from './landing/Hero';
import FeatureSection from './landing/FeatureSection';
import StatsSection from './landing/StatsSection';
import HowItWorks from './landing/HowItWorks';
import Stakeholders from './landing/Stakeholders';
import Web3Section from './landing/Web3Section';
import RedesignedFooter from './landing/RedesignedFooter';
import AboutModal from './landing/AboutModal';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, ArrowRight, ArrowUp } from 'lucide-react';

const LandingPageNew: React.FC = () => {
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 1000);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="relative bg-slate-950 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
            {/* Overlay Grid */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
            </div>

            {/* Navigation */}
            <Navbar onAboutClick={() => setIsAboutModalOpen(true)} />

            {/* Page Sections */}
            <main className="relative z-10">
                {/* Hero with immersive 3D Scene */}
                <Hero />

                {/* Data Transparency Stats */}
                <StatsSection />

                {/* Core Features */}
                <FeatureSection />

                {/* Marketplace Integration Highlights */}
                <section className="py-32 bg-slate-950 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="bg-gradient-to-br from-blue-600/10 to-emerald-600/10 border border-white/10 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                            
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <motion.div 
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 mb-8"
                                >
                                    <TrendingUp className="w-12 h-12 text-emerald-500" />
                                </motion.div>
                                
                                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                                    The Future of <span className="text-emerald-400 italic">Carbon Trading.</span>
                                </h2>
                                
                                <p className="text-xl text-slate-400 font-medium mb-12 max-w-2xl leading-relaxed">
                                    Access institutional-grade liquidity for verified blue carbon credits. 
                                    Trade, retire, or hold assets with radical transparency on the ClaFin Trade Platform.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-6">
                                    <a
                                        href="https://clafin.netlify.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-12 py-6 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xl rounded-2xl transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-3"
                                    >
                                        Launch Trade Platform <ArrowRight className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Workflow */}
                <HowItWorks />

                {/* Stakeholder Personas */}
                <Stakeholders />

                {/* Web3 Security Layers */}
                <Web3Section />

                {/* Final Call to Action */}
                <section className="py-40 relative bg-slate-950 flex flex-col items-center text-center overflow-hidden">
                    {/* Animated Neon Rings */}
                    <div className="absolute w-[800px] h-[800px] border border-white/5 rounded-full animate-pulse-slow opacity-20" />
                    <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full animate-reverse-spin opacity-10" />

                    <div className="relative z-10 max-w-4xl px-6">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter"
                        >
                            RESTORE. <br />
                            <span className="text-emerald-500">MONETIZE.</span> <br />
                            SCALE.
                        </motion.h2>
                        
                        <p className="text-2xl text-slate-400 font-medium mb-16 leading-relaxed">
                            Join the protocol that's turning ecological health into the <br className="hidden md:block" />
                            primary global currency. Start your journey today.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-14 py-6 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-black text-2xl rounded-[2.5rem] shadow-2xl shadow-emerald-500/20"
                            >
                                Get Priority Access
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-14 py-6 bg-transparent border-2 border-white/20 text-white font-black text-2xl rounded-[2.5rem] hover:bg-white/5 transition-all"
                            >
                                Read Registry Specs
                            </motion.button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Immersive Footer */}
            <RedesignedFooter />

            {/* Modals & Overlays */}
            <AboutModal 
                isOpen={isAboutModalOpen} 
                onClose={() => setIsAboutModalOpen(false)} 
            />

            {/* Scroll To Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        onClick={scrollToTop}
                        className="fixed bottom-10 right-10 z-[100] w-14 h-14 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/30 hover:scale-110 transition-all border border-emerald-400/50"
                    >
                        <ArrowUp className="w-6 h-6 stroke-[3]" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Global Smooth Scroll Support */}
            <style>{`
                html {
                    scroll-behavior: smooth;
                    background-color: #020617;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
};

export default LandingPageNew;
