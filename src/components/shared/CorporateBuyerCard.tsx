import React from 'react';

interface CorporateBuyerCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const CorporateBuyerCard: React.FC<CorporateBuyerCardProps> = ({ children, className = '', onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`
                bg-white/90 
                backdrop-blur-xl 
                border border-blue-200 
                rounded-[2rem] 
                p-6 
                shadow-lg shadow-blue-100/50 
                hover:shadow-xl hover:shadow-blue-200/50 
                transition-all duration-300
                ${onClick ? 'cursor-pointer' : ''}
                ${className}
            `}
        >
            {children}
        </div>
    );
};

export default CorporateBuyerCard;
