import React from 'react';
import CommunityNav from './CommunityNav';
import AiEcoAssistant from '../AiEcoAssistant';

interface CommunityLayoutProps {
    children: React.ReactNode;
    activeTab?: string;
}

const CommunityLayout: React.FC<CommunityLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Shared Navigation */}
            <CommunityNav />

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 md:pb-12">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {children}
                </div>
            </main>

            {/* AI Assistant */}
            <AiEcoAssistant />

            {/* Footer (Optional) */}
            <footer className="bg-white border-t border-slate-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                                🌱
                            </div>
                            <span className="font-bold text-slate-800 tracking-tight">CLORIT</span>
                        </div>

                        <p className="text-sm text-slate-500">
                            © 2025 Blue Carbon Registry & MRV System. All rights reserved.
                        </p>

                        <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
                            <button className="hover:text-emerald-600 transition-colors">Privacy Policy</button>
                            <button className="hover:text-emerald-600 transition-colors">Terms of Service</button>
                            <button className="hover:text-emerald-600 transition-colors">Contact Support</button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CommunityLayout;
