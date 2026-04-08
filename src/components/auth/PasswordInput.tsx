import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, Check, X } from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from "@/lib/utils";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  showStrength?: boolean;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ 
  label, 
  showStrength = false, 
  error, 
  className, 
  value, 
  onChange,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0); // 0-3

  const val = typeof value === 'string' ? value : '';

  useEffect(() => {
    if (!showStrength) return;
    
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    
    setStrength(score);
  }, [val, showStrength]);

  const getStrengthConfig = () => {
    if (!val) return { label: '', color: 'bg-transparent', width: 'w-0' };
    if (strength === 1) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/3' };
    if (strength === 2) return { label: 'Medium', color: 'bg-yellow-500', width: 'w-2/3' };
    if (strength === 3) return { label: 'Strong', color: 'bg-emerald-500', width: 'w-full' };
    return { label: 'Very Weak', color: 'bg-red-700', width: 'w-4' };
  };

  const config = getStrengthConfig();

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest pl-1">
          {label}
        </label>
      )}
      
      <div className="relative group">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <Input
          {...props}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className={cn(
            "bg-white/5 border-white/10 text-white pl-10 pr-10 h-11 focus-visible:ring-emerald-500 rounded-xl transition-all",
            error && "border-red-500/50 focus-visible:ring-red-500",
            className
          )}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-400 transition-colors focus:outline-none"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {showStrength && val.length > 0 && (
        <div className="px-1 space-y-2 pt-1">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tighter">
            <span className={cn("transition-colors", 
              strength === 3 ? "text-emerald-400" : strength === 2 ? "text-yellow-400" : "text-red-400"
            )}>
              {config.label}
            </span>
            <span className="text-gray-600">Security Score</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className={cn("h-full transition-all duration-500", config.color, config.width)} />
          </div>
          
          <div className="grid grid-cols-3 gap-1 pt-1">
            <div className={cn("flex items-center gap-1 text-[8px] font-bold uppercase", val.length >= 8 ? "text-emerald-500" : "text-gray-600")}>
              {val.length >= 8 ? <Check size={8} /> : <X size={8} />} 8+ Chars
            </div>
            <div className={cn("flex items-center gap-1 text-[8px] font-bold uppercase", /[A-Z]/.test(val) ? "text-emerald-500" : "text-gray-600")}>
              {/[A-Z]/.test(val) ? <Check size={8} /> : <X size={8} />} Uppercase
            </div>
            <div className={cn("flex items-center gap-1 text-[8px] font-bold uppercase", /[0-9]/.test(val) ? "text-emerald-500" : "text-gray-600")}>
              {/[0-9]/.test(val) ? <Check size={8} /> : <X size={8} />} Number
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="text-[10px] text-red-400 font-bold italic pl-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
