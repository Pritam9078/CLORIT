import React, { ReactNode } from 'react';
import PanchayatNav from './PanchayatNav';
import AiEcoAssistant from '../AiEcoAssistant';

interface PanchayatLayoutProps {
    children: ReactNode;
}

const PanchayatLayout: React.FC<PanchayatLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-violet-50/20">
            <PanchayatNav />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative">
                {/* Ambient Background Gradients */}
                <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[100px] -ml-20 -mb-20" />
                    <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
                </div>

                {children}
            </main>

            {/* AI Eco Assistant */}
            <AiEcoAssistant />
        </div>
    );
};

export default PanchayatLayout;
