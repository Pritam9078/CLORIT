import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HowItWorks: React.FC = () => {
    const steps = [
        {
            number: "01",
            title: "Project Onboarding",
            description: "Register your coastal restoration project with precise geospatial coordinates and verification documentation."
        },
        {
            number: "02",
            title: "Deep Verification",
            description: "Proprietary AI audits your project using Sentinel-2 and Landsat multi-spectral imagery to confirm biomass growth."
        },
        {
            number: "03",
            title: "Credit Issuance",
            description: "Verified carbon credits are minted as secure blockchain assets linked to real-world sequestration data."
        },
        {
            number: "04",
            title: "Global Liquidity",
            description: "Trade your assets on our high-speed marketplace with institutional liquidity and automated settlement."
        }
    ];

    return (
        <section id="how-it-works" className="py-32 bg-slate-950 relative overflow-hidden">
             {/* Background blur */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.h2 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-6xl font-black text-white mb-6"
                    >
                        From Restoration <br />
                        <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">to Revenue</span>
                    </motion.h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
                        The end-to-end lifecycle of a CLORIT verified carbon asset.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="relative group"
                        >
                            <div className="h-full bg-white/[0.03] backdrop-blur-md border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/[0.07] transition-all duration-500">
                                <div className="text-7xl font-black text-white/5 mb-6 group-hover:text-emerald-500/10 transition-colors">
                                    {step.number}
                                </div>
                                <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-blue-400 transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed font-medium">
                                    {step.description}
                                </p>
                                
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-20">
                                        <div className="p-2 rounded-full bg-slate-900 border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                                            <ArrowRight className="w-4 h-4 text-emerald-500" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
