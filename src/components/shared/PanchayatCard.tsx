import React, { ReactNode } from 'react';

interface PanchayatCardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

const PanchayatCard: React.FC<PanchayatCardProps> = ({
    children,
    className = '',
    onClick
}) => {
    return (
        <div
            onClick={onClick}
            className={`
        bg-white/90 
        backdrop-blur-xl 
        border 
        border-slate-200 
        rounded-[2rem] 
        p-6 
        md:p-8 
        shadow-lg 
        shadow-purple-100/50 
        hover:shadow-xl 
        hover:shadow-purple-200/50 
        transition-all 
        duration-300
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export default PanchayatCard;
