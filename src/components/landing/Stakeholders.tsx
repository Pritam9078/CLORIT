import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Heart, Landmark, Building2, X, ArrowRight, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Stakeholders: React.FC = () => {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState<any>(null);

    const roles = [
        {
            id: 'communities',
            title: "Local Communities",
            desc: "Protect your ancestral lands and unlock direct global funding.",
            color: "from-emerald-500 to-teal-500",
            icon: <Home className="w-8 h-8 text-white" />,
            glow: "shadow-emerald-500/20",
            specs: {
                focus: "Direct Earnings & Ecosystem Health",
                features: ["Satellite monitoring dashboard", "QR-based credit issuance", "Automated payment settlement"],
                journey: ["Project onboarding", "Satellite health monitoring", "Credit issuance", "Automated marketplace sale"]
            }
        },
        {
            id: 'ngos',
            title: "Field Verifiers (NGOs)",
            desc: "The trust layer. Verify projects with professional ecological audits.",
            color: "from-blue-500 to-cyan-500",
            icon: <Heart className="w-8 h-8 text-white" />,
            glow: "shadow-blue-500/20",
            specs: {
                focus: "Trust & Impact Verification",
                features: ["Multi-project audit portal", "AI-assisted verification", "Impact reporting engine"],
                journey: ["Application review", "Field & Satellite audit", "Certification", "Annual impact reporting"]
            }
        },
        {
            id: 'government',
            title: "National Registry",
            desc: "Sovereign oversight of carbon assets and regulatory compliance.",
            color: "from-purple-500 to-pink-500",
            icon: <Landmark className="w-8 h-8 text-white" />,
            glow: "shadow-purple-500/20",
            specs: {
                focus: "National Registry & Compliance",
                features: ["Compliance management dashboard", "National carbon ledger", "Trade monitoring"],
                journey: ["Regulatory policy setting", "Project approval flow", "Credit issuance oversight", "Global trade reporting"]
            }
        },
        {
            id: 'corporates',
            title: "Sustainability Leaders",
            desc: "Audit-ready carbon offsets with radical data transparency.",
            color: "from-orange-500 to-red-500",
            icon: <Building2 className="w-8 h-8 text-white" />,
            glow: "shadow-orange-500/20",
            specs: {
                focus: "Scalable Offset & ESG compliance",
                features: ["Project portfolio management", "Real-time offset data", "Certified BRSR reports"],
                journey: ["Demand analysis", "Credit purchase", "Retirement & Branding", "Continuous impact monitoring"]
            }
        }
    ];

    return (
        <section className="py-32 bg-slate-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-24">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-emerald-500 font-black tracking-widest uppercase text-sm mb-4"
                    >
                        Ecosystem Distribution
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-white mb-6"
                    >
                        Built for Every <br />
                        <span className="text-slate-500 font-medium italic">Stakeholder.</span>
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {roles.map((role) => (
                        <motion.div
                            key={role.id}
                            whileHover={{ y: -10 }}
                            onClick={() => setSelectedRole(role)}
                            className="group relative bg-[#0a0f1a] rounded-[2rem] p-10 cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-500"
                        >
                            <div className={`absolute -inset-[1px] bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-10 rounded-[2rem] transition-opacity`} />
                            
                            <div className={`w-14 h-14 bg-gradient-to-br ${role.color} rounded-2xl flex items-center justify-center mb-8 shadow-2xl ${role.glow}`}>
                                {role.icon}
                            </div>
                            
                            <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:translate-x-1 transition-transform">{role.title}</h3>
                            <p className="text-slate-400 mb-8 font-medium leading-relaxed">{role.desc}</p>
                            
                            <div className="flex items-center gap-2 text-emerald-400 font-bold group-hover:gap-4 transition-all uppercase tracking-widest text-[10px]">
                                View Protocol Access <ArrowRight className="w-4 h-4" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Role Modal */}
            <AnimatePresence>
                {selectedRole && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedRole(null)}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" 
                        />
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-[#0a0f1a] rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl"
                        >
                            {/* Modal Header */}
                            <div className={`p-10 text-white bg-gradient-to-br ${selectedRole.color}`}>
                                <button
                                    onClick={() => setSelectedRole(null)}
                                    className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-md border border-white/10">
                                        {selectedRole.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black">{selectedRole.title}</h3>
                                        <p className="text-white/70 font-bold uppercase tracking-widest text-xs mt-1">
                                            {selectedRole.specs.focus}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-10 space-y-10">
                                <section>
                                    <div className="flex items-center gap-2 mb-6 text-slate-500">
                                        <Shield className="w-4 h-4" />
                                        <h4 className="text-xs font-black uppercase tracking-[0.2em]">Protocol Features</h4>
                                    </div>
                                    <div className="grid gap-4">
                                        {selectedRole.specs.features.map((feature: string, i: number) => (
                                            <div key={i} className="flex items-center gap-4 p-5 bg-white/[0.03] rounded-2xl border border-white/5 font-bold text-slate-300">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,1)]" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <div className="flex items-center gap-2 mb-6 text-slate-500">
                                        <Zap className="w-4 h-4" />
                                        <h4 className="text-xs font-black uppercase tracking-[0.2em]">Deployment Journey</h4>
                                    </div>
                                    <div className="space-y-4">
                                        {selectedRole.specs.journey.map((step: string, i: number) => (
                                            <div key={i} className="flex gap-4 group">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-8 h-8 rounded-full border-2 border-white/10 flex items-center justify-center text-xs font-black text-slate-500 group-hover:border-emerald-500 group-hover:text-emerald-500 transition-colors">
                                                        {i + 1}
                                                    </div>
                                                    {i < 3 && <div className="w-[2px] h-4 bg-white/5 flex-1 mt-2" />}
                                                </div>
                                                <p className="text-lg font-bold text-slate-400 group-hover:text-white transition-colors">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <button
                                    onClick={() => navigate('/register')}
                                    className={`w-full py-6 bg-gradient-to-r ${selectedRole.color} text-slate-950 font-black text-xl rounded-[2rem] shadow-xl hover:scale-[1.02] transition-all`}
                                >
                                    Initialize as {selectedRole.title}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Stakeholders;
