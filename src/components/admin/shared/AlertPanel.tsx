import React from 'react';
import { AlertCircle, CheckCircle2, Info, XCircle, LucideIcon } from 'lucide-react';
import { cn } from "@/lib/utils";

type AlertType = "info" | "success" | "warning" | "error";

interface AlertPanelProps {
  title: string;
  description: string;
  type?: AlertType;
  icon?: LucideIcon;
  className?: string;
  onAction?: () => void;
  actionLabel?: string;
}

const AlertPanel: React.FC<AlertPanelProps> = ({ 
  title, 
  description, 
  type = "info", 
  icon: CustomIcon,
  className,
  onAction,
  actionLabel 
}) => {
  const typeVariants = {
    info: {
      container: "bg-blue-50 border-blue-100 text-blue-800",
      icon: Info,
      iconColor: "text-blue-500",
      button: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200",
    },
    success: {
      container: "bg-green-50 border-green-100 text-green-800",
      icon: CheckCircle2,
      iconColor: "text-green-500",
      button: "bg-green-600 hover:bg-green-700 text-white shadow-green-200",
    },
    warning: {
      container: "bg-orange-50 border-orange-100 text-orange-800",
      icon: AlertCircle,
      iconColor: "text-orange-500",
      button: "bg-orange-600 hover:bg-orange-700 text-white shadow-orange-200",
    },
    error: {
      container: "bg-red-50 border-red-100 text-red-800",
      icon: XCircle,
      iconColor: "text-red-500",
      button: "bg-red-600 hover:bg-red-700 text-white shadow-red-200",
    },
  };

  const { container, icon: DefaultIcon, iconColor, button } = typeVariants[type];
  const Icon = CustomIcon || DefaultIcon;

  return (
    <div className={cn(
      "flex items-start gap-4 p-5 rounded-2xl border shadow-sm transition-all animate-in fade-in slide-in-from-top-2 duration-300",
      container,
      className
    )}>
      <div className={cn("p-2 rounded-xl bg-white/50 border border-white/50 shrink-0", iconColor)}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <h5 className="font-bold text-sm mb-1">{title}</h5>
        <p className="text-sm opacity-80 leading-relaxed">{description}</p>
        
        {onAction && actionLabel && (
          <button 
            onClick={onAction}
            className={cn(
              "mt-3 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95",
              button
            )}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertPanel;
