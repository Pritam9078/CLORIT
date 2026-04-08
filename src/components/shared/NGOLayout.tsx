import React from 'react';
import NGONav from './NGONav';
import AiEcoAssistant from '../AiEcoAssistant';

interface NGOLayoutProps {
    children: React.ReactNode;
}

const NGOLayout: React.FC<NGOLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-cyan-100 selection:text-cyan-900 relative overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-cyan-50/80 via-white to-transparent" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-100/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
            </div>

            <NGONav />

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
                {children}
            </main>

            <AiEcoAssistant />
        </div>
    );
};

export default NGOLayout;
