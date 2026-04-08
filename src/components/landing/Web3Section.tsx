import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Wallet, Fingerprint, Zap } from 'lucide-react';

const Web3Section: React.FC = () => {
    return (
        <section id="web3" className="py-32 bg-slate-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-slate-950 rounded-[4rem] border border-white/10 p-12 md:p-24 relative overflow-hidden">
                    {/* Animated grid background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
                    
                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-black uppercase tracking-widest mb-8"
                            >
                                <Lock className="w-4 h-4" />
                                Decentralized Security
                            </motion.div>
                            
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight"
                            >
                                Signature-Based <br />
                                <span className="text-purple-400">Authentication.</span>
                            </motion.h2>
                            
                            <motion.p 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="text-xl text-slate-400 mb-12 font-medium leading-relaxed"
                            >
                                No passwords. No data leaks. Access your restoration assets using 
                                hardware-grade security. Sign messages, verify ownership, and 
                                trade with peak cryptographic certainty.
                            </motion.p>
                            
                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { icon: <Fingerprint className="w-5 h-5" />, label: "Biometric Sign" },
                                    { icon: <Shield className="w-5 h-5" />, label: "EVM Compatible" },
                                    { icon: <Wallet className="w-5 h-5" />, label: "Cold Storage Auth" },
                                    { icon: <Zap className="w-5 h-5" />, label: "Instant Verif" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-slate-300 font-bold">
                                        <div className="text-purple-400">{item.icon}</div>
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Futuristic Wallet Mockup */}
                        <div className="relative">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                className="relative z-20 bg-slate-900/80 backdrop-blur-2xl border border-white/20 p-8 rounded-[3rem] shadow-2xl"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white">
                                            <Wallet className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-sm text-opacity-50">CLORIT NETWORK</div>
                                            <div className="text-white font-black">0x71C...4f98</div>
                                        </div>
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                                        Connected
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">CCT Assets</div>
                                        <div className="text-3xl font-black text-white">4,290.50 <span className="text-emerald-400 text-sm">CCT</span></div>
                                    </div>
                                    <button className="w-full py-4 bg-purple-500 hover:bg-purple-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-purple-500/20">
                                        Sign Action
                                    </button>
                                </div>
                            </motion.div>
                            
                            {/* Decorative Blobs */}
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-500/30 rounded-full blur-[100px] z-10" />
                            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] z-10" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Web3Section;
