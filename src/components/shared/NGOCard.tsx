import React from 'react';

interface NGOCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const NGOCard: React.FC<NGOCardProps> = ({ children, className = '', onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`bg-white/90 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl shadow-slate-200/50 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-900/5 ${onClick ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : ''} ${className}`}
        >
            {children}
        </div>
    );
};

export default NGOCard;
