import React from 'react';
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ 
  title, 
  subtitle, 
  children, 
  className 
}) => {
  return (
    <div className={cn(
      "bg-white p-6 rounded-2xl border border-slate-100 shadow-sm",
      className
    )}>
      <div className="mb-6">
        <h4 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h4>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
      <div className="h-[300px] w-full">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
