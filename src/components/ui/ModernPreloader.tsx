import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ModernPreloaderProps {
  message?: string;
  className?: string;
}

const ModernPreloader: React.FC<ModernPreloaderProps> = ({ 
  message = "Loading high-fidelity data...", 
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center space-y-8 p-12", className)}>
      <div className="relative w-32 h-32">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-4 border-dashed border-primary/30 rounded-full"
        />

        {/* Liquid Container */}
        <div className="absolute inset-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border-2 border-primary/20">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "20%" }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "reverse", 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 bg-gradient-to-t from-emerald-500/40 to-blue-500/40"
            style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}
          >
             {/* Bubbles */}
             {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: -60, opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.5 + Math.random(),
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                  className="absolute bg-white/40 rounded-full"
                  style={{
                    width: Math.random() * 8 + 4,
                    height: Math.random() * 8 + 4,
                    left: `${10 + Math.random() * 80}%`
                  }}
                />
              ))}
          </motion.div>
        </div>

        {/* Center Icon/Logo placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl shadow-xl flex items-center justify-center border border-primary/10"
            >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-emerald-500" />
            </motion.div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-600 dark:from-blue-400 dark:to-emerald-400"
        >
          {message}
        </motion.span>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernPreloader;
