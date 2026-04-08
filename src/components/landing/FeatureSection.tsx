import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, TrendingUp, Shield, Globe, Users, Award, ArrowUpRight } from 'lucide-react';

const FeatureSection: React.FC = () => {
    const features = [
        {
            icon: <Leaf className="w-8 h-8 text-emerald-400" />,
            title: "Blue Carbon Tracking",
            description: "Monitor and verify mangrove restoration projects with satellite-powered NDVI technology for real-time vegetation health assessment.",
            glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
            title: "Carbon Credit Marketplace",
            description: "Trade verified carbon credits on our secure blockchain-powered marketplace with transparent pricing and instant transactions.",
            glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
            link: "https://clafin.netlify.app/"
        },
        {
            icon: <Shield className="w-8 h-8 text-purple-400" />,
            title: "Verified & Secure",
            description: "All projects undergo rigorous NGO verification and government approval ensuring authenticity and environmental impact.",
            glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
        },
        {
            icon: <Globe className="w-8 h-8 text-emerald-400" />,
            title: "Satellite Monitoring",
            description: "Advanced NDVI satellite imagery provides accurate vegetation health data and carbon sequestration measurements.",
            glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
        },
        {
            icon: <Users className="w-8 h-8 text-blue-400" />,
            title: "Community Driven",
            description: "Empower local communities with direct earnings from carbon credits while promoting sustainable coastal restoration.",
            glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
        },
        {
            icon: <Award className="w-8 h-8 text-purple-400" />,
            title: "Blockchain Certified",
            description: "Immutable blockchain records ensure transparency, traceability, and trust in every carbon credit transaction.",
            glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="features" className="py-32 relative bg-slate-950 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest mb-4"
                    >
                        Core Capabilities
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-white mb-6"
                    >
                        Environmental Intelligence <br />
                        <span className="text-slate-500">at Planetary Scale</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto font-medium"
                    >
                        A unified protocol for the next generation of blue carbon offsets.
                    </motion.p>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -5 }}
                            className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl transition-all duration-300 ${feature.glow}`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                            
                            {/* Icon Container */}
                            <div className="relative w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-white/10 transition-colors">
                                {feature.icon}
                                <div className="absolute -inset-1 bg-gradient-to-tr from-white/20 to-transparent blur opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed mb-8 relative z-10 font-medium">{feature.description}</p>
                            
                            {feature.link && (
                                <a 
                                    href={feature.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-emerald-400 font-bold hover:gap-3 transition-all relative z-10"
                                >
                                    Access Protocol <ArrowUpRight className="w-4 h-4" />
                                </a>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FeatureSection;
