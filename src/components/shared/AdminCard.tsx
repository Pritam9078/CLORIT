import React from 'react';

interface AdminCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const AdminCard: React.FC<AdminCardProps> = ({ children, className = '', onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`
                bg-white/90 
                backdrop-blur-xl 
                border border-orange-200 
                rounded-[2rem] 
                p-6 
                shadow-lg shadow-orange-100/50 
                hover:shadow-xl hover:shadow-orange-200/50 
                transition-all duration-300
                ${onClick ? 'cursor-pointer' : ''}
                ${className}
            `}
        >
            {children}
        </div>
    );
};

export default AdminCard;
