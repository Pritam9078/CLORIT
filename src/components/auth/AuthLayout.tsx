import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, Globe } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050A0F] overflow-hidden relative font-sans selection:bg-emerald-500/30">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.15, 0.05],
            x: [0, -40, 0],
            y: [0, 60, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-1/4 -left-1/4 w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[140px]" 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)]" />
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay" />
      
      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row items-center gap-12 px-6 py-12 relative z-10">
        {/* Left Side: Branding & Info */}
        <div className="hidden lg:flex flex-col flex-1 text-white space-y-8 animate-in fade-in slide-in-from-left duration-1000">
          <div className="flex items-center gap-6">
             <div className="w-20 h-20 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 p-3 shadow-2xl shadow-emerald-500/10">
                <img src="/clorit-logo.png" alt="CLORIT" className="w-full h-full object-contain" />
             </div>
             <div>
                <span className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-emerald-400 uppercase">CLORIT</span>
                <p className="text-xs text-emerald-400 font-bold tracking-[0.3em] uppercase mt-1">Geospatial Protocol</p>
             </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-black leading-tight tracking-tighter">
              Accelerating the <br />
              <span className="text-emerald-400">Blue Carbon</span> Economy.
            </h1>
            <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
              The world's most advanced Web3 ecosystem for verfiying, trading, and managing blue carbon credits with unmatched transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 pt-6">
            {[
              { icon: ShieldCheck, title: "Military Grade Verification", desc: "Multi-layered protocol for project integrity." },
              { icon: Globe, title: "Global Marketplace", desc: "Connect with certified carbon buyers worldwide." }
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-200">{feature.title}</h4>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Auth Form Container */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md bg-[#0D151C]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 lg:p-10 shadow-2xl shadow-emerald-950/20 relative"
        >
          <div className="mb-10 flex flex-col items-center lg:items-start gap-8 text-center lg:text-left w-full">
            <a href="/" className="inline-flex flex-col items-center lg:items-start gap-4 group">
              <div className="w-16 h-16 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 p-2 group-hover:bg-white/10 transition-all shadow-xl shadow-emerald-500/5">
                <img src="/clorit-logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-black tracking-tighter text-white group-hover:text-emerald-400 transition-colors uppercase">CLORIT</span>
                <div className="h-0.5 w-full bg-gradient-to-r from-emerald-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </div>
            </a>

            <div className="w-full">
              <h2 className="text-3xl font-black text-white tracking-tight mb-2">{title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed mx-auto lg:mx-0 max-w-[280px]">{subtitle}</p>
            </div>
          </div>

          {children}

          <div className="mt-8 pt-8 border-t border-white/5 flex justify-center">
             <p className="text-xs text-gray-600">© 2026 CLORIT Ecosystem. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
