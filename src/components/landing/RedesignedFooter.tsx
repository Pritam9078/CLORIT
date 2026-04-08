import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Twitter, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';

const RedesignedFooter: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 pt-32 pb-16 relative overflow-hidden">
            {/* Top Border with Glow */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-4 gap-16 mb-24">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-8">
                            <img src="/clorit-logo.png" alt="Logo" className="w-12 h-12 rounded-xl" />
                            <span className="text-2xl font-black text-white tracking-tight">CLORIT</span>
                        </div>
                        <p className="text-xl text-slate-400 font-medium mb-10 max-w-md leading-relaxed">
                            Pioneering planetary-scale ecological trust through satellite intelligence and decentralized finance.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: <Twitter />, link: "https://x.com/CLORIT_CO2", bg: "hover:bg-[#1DA1F2]" },
                                { icon: <Linkedin />, link: "https://www.linkedin.com/in/clorit-396b08382/", bg: "hover:bg-[#0077B5]" },
                                { icon: <Instagram />, link: "https://www.instagram.com/clorit.2025", bg: "hover:bg-gradient-to-br from-[#833AB4] to-[#FD1D1D]" },
                                { icon: <Mail />, link: "mailto:clorit2025@gmail.com", bg: "hover:bg-emerald-500" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:scale-110 transition-all ${social.bg}`}
                                >
                                    {React.cloneElement(social.icon as React.ReactElement, { size: 20 })}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Protocol</h4>
                        <ul className="space-y-4 font-bold">
                            {['Analytics', 'Global Map', 'Verification', 'Marketplace', 'Compliance'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-slate-500 hover:text-emerald-400 transition-colors flex items-center gap-1 group">
                                        {item}
                                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Resources</h4>
                        <ul className="space-y-4 font-bold">
                            {['Documentation', 'Whitepaper', 'API Access', 'Tokenomics', 'Governance'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-slate-500 hover:text-blue-400 transition-colors flex items-center gap-1 group">
                                        {item}
                                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-slate-500 font-bold text-sm">
                        © {currentYear} CLORIT Protocol. All rights reserved.
                    </div>
                    <div className="flex gap-8">
                        <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-bold">Privacy Protocol</a>
                        <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-bold">Terms of Access</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default RedesignedFooter;
