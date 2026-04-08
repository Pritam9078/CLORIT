import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModernIconProps {
  icon: LucideIcon;
  color?: 'green' | 'blue' | 'purple' | 'orange' | 'red' | 'indigo' | 'slate';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
  className?: string;
  animate?: boolean;
}

const colorMap = {
  green: 'text-emerald-500 bg-emerald-50 border-emerald-100 shadow-emerald-200/50',
  blue: 'text-blue-500 bg-blue-50 border-blue-100 shadow-blue-200/50',
  purple: 'text-purple-500 bg-purple-50 border-purple-100 shadow-purple-200/50',
  orange: 'text-orange-500 bg-orange-50 border-orange-100 shadow-orange-200/50',
  red: 'text-red-500 bg-red-50 border-red-100 shadow-red-200/50',
  indigo: 'text-indigo-500 bg-indigo-50 border-indigo-100 shadow-indigo-200/50',
  slate: 'text-slate-500 bg-slate-50 border-slate-100 shadow-slate-200/50',
};

const sizeMap = {
  sm: 'p-1.5 w-7 h-7',
  md: 'p-2 w-10 h-10',
  lg: 'p-3 w-14 h-14',
  xl: 'p-4 w-20 h-20',
};

const iconSizeMap = {
  sm: 14,
  md: 20,
  lg: 28,
  xl: 40,
};

export const ModernIcon: React.FC<ModernIconProps> = ({
  icon: Icon,
  color = 'blue',
  size = 'md',
  glow = true,
  className,
  animate = true,
}) => {
  return (
    <motion.div
      whileHover={animate ? { scale: 1.05, y: -2 } : {}}
      whileTap={animate ? { scale: 0.95 } : {}}
      className={cn(
        'relative flex items-center justify-center rounded-2xl border transition-all duration-300',
        colorMap[color],
        sizeMap[size],
        glow && 'shadow-lg',
        className
      )}
    >
      {glow && (
        <div 
          className={cn(
            'absolute inset-0 rounded-2xl opacity-20 blur-xl transition-opacity animate-pulse',
            colorMap[color].split(' ')[0].replace('text', 'bg')
          )} 
        />
      )}
      <Icon size={iconSizeMap[size]} className="relative z-10" />
    </motion.div>
  );
};

export default ModernIcon;
