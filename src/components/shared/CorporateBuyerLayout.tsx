import React from 'react';
import CorporateBuyerNav from './CorporateBuyerNav';
import AiEcoAssistant from '../AiEcoAssistant';

interface CorporateBuyerLayoutProps {
    children: React.ReactNode;
}

const CorporateBuyerLayout: React.FC<CorporateBuyerLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
            <CorporateBuyerNav />

            {/* Ambient Background Gradients */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-300/20 rounded-full blur-[120px]" />
            </div>

            {/* Main Content */}
            <main className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                {children}
            </main>

            {/* AI Eco Assistant */}
            <AiEcoAssistant />
        </div>
    );
};

export default CorporateBuyerLayout;
