import React from 'react';

interface CommunityCardProps {
    children: React.ReactNode;
    title?: string;
    icon?: React.ElementType;
    className?: string;
    variant?: 'white' | 'glass' | 'emerald';
    padding?: 'none' | 'small' | 'normal' | 'large';
    onClick?: () => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({
    children,
    title,
    icon: Icon,
    className = '',
    variant = 'white',
    padding = 'normal',
    onClick
}) => {
    const baseStyles = "rounded-3xl border transition-all duration-300 overflow-hidden";

    const variantStyles = {
        white: "bg-white border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1",
        glass: "bg-white/70 backdrop-blur-lg border-white/40 shadow-xl",
        emerald: "bg-gradient-to-br from-emerald-500 to-teal-600 border-emerald-400 text-white shadow-lg shadow-emerald-200"
    };

    const paddingStyles = {
        none: "p-0",
        small: "p-4",
        normal: "p-6",
        large: "p-8 md:p-10"
    };

    return (
        <div
            onClick={onClick}
            className={`
        ${baseStyles} 
        ${variantStyles[variant]} 
        ${paddingStyles[padding]} 
        ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''} 
        ${className}
      `}
        >
            {title && (
                <div className="flex items-center gap-3 mb-6">
                    {Icon && (
                        <div className={`p-2 rounded-xl ${variant === 'emerald' ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                            <Icon className="w-5 h-5" />
                        </div>
                    )}
                    <h3 className={`text-lg font-bold ${variant === 'emerald' ? 'text-white' : 'text-slate-800'}`}>
                        {title}
                    </h3>
                </div>
            )}
            {children}
        </div>
    );
};

export default CommunityCard;
