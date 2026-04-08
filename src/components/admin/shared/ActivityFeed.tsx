import React from 'react';
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string | number;
  title: string;
  description: string;
  time: string;
  type?: "info" | "success" | "warning" | "error";
}

interface ActivityFeedProps {
  items: ActivityItem[];
  title?: string;
  className?: string;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ 
  items, 
  title = "Recent Activity", 
  className 
}) => {
  const typeColors = {
    info: "bg-blue-500",
    success: "bg-green-500",
    warning: "bg-orange-500",
    error: "bg-red-500",
  };

  return (
    <div className={cn(
      "bg-white p-6 rounded-2xl border border-slate-100 shadow-sm",
      className
    )}>
      <h4 className="text-lg font-bold text-slate-900 tracking-tight mb-6">{title}</h4>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={item.id} className="flex gap-4 relative group">
            {/* Connector Line */}
            {index !== items.length - 1 && (
              <div className="absolute left-[11px] top-6 bottom-[-24px] w-[2px] bg-slate-100 group-hover:bg-slate-200 transition-colors" />
            )}
            
            {/* Timeline Dot */}
            <div className={cn(
              "w-[24px] h-[24px] rounded-full border-4 border-white shadow-sm flex-shrink-0 mt-1 z-10",
              typeColors[item.type || "info"]
            )} />
            
            <div className="flex-1">
              <div className="flex items-center justify-between gap-4 mb-1">
                <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                <span className="text-xs text-slate-400 whitespace-nowrap">{item.time}</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-slate-400 italic text-center py-8">No activity recorded.</p>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
