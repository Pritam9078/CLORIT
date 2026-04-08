import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, UserPlus, Globe, Shield, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
    onAboutClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAboutClick }) => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Analytics', href: '#features', icon: <TrendingUp className="w-4 h-4" /> },
        { name: 'Impact', href: '#how-it-works', icon: <Globe className="w-4 h-4" /> },
        { name: 'Web3', href: '#web3', icon: <Shield className="w-4 h-4" /> },
    ];

    return (
        <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className={`relative flex items-center justify-between rounded-2xl transition-all duration-500 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 ${scrolled ? 'shadow-2xl shadow-emerald-500/10' : ''}`}>
                    
                    {/* Logo */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => navigate('/')}
                    >
                        <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-cyan-500/20 p-1 group-hover:bg-cyan-500/30 transition-colors">
                            <img src="/clorit-logo.png" alt="Logo" className="w-full h-full object-contain" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent tracking-tight">
                            CLORIT
                        </span>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i }}
                                className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                            >
                                {link.icon}
                                {link.name}
                            </motion.a>
                        ))}
                        <motion.button
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            onClick={onAboutClick}
                            className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                        >
                            About Protocol
                        </motion.button>
                    </div>

                    {/* Action Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/login')}
                            className="bg-white/5 hover:bg-white/10 text-white px-5 py-2 rounded-xl text-sm font-semibold border border-white/10 transition-all"
                        >
                            Sign In
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/register')}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] text-white px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 border border-cyan-400/30"
                        >
                            <UserPlus className="w-4 h-4" />
                            Sign Up
                        </motion.button>
                    </div>

                    {/* Mobile Toggle */}
                    <button 
                        className="md:hidden p-2 text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-900/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-6 py-8 space-y-6">
                            {navLinks.map((link) => (
                                <a 
                                    key={link.name} 
                                    href={link.href}
                                    className="block text-lg font-bold text-white hover:text-cyan-400"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <button 
                                className="block text-lg font-bold text-white hover:text-cyan-400"
                                onClick={() => { onAboutClick?.(); setMobileMenuOpen(false); }}
                            >
                                About Protocol
                            </button>
                            <div className="pt-6 space-y-4">
                                <button 
                                    onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                                    className="w-full py-3 bg-white/10 text-white rounded-xl font-bold border border-white/10"
                                >
                                    Sign In
                                </button>
                                <button 
                                    onClick={() => { navigate('/register'); setMobileMenuOpen(false); }}
                                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 border border-cyan-400/30 text-white rounded-xl font-bold"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
