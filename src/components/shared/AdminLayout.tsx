import React from 'react';
import AdminNav from './AdminNav';
import AiEcoAssistant from '../AiEcoAssistant';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/20">
            <AdminNav />

            {/* Ambient Background Gradients */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-300/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-300/20 rounded-full blur-[120px]" />
            </div>

            {/* Main Content */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                {children}
            </main>

            {/* AI Eco Assistant */}
            <AiEcoAssistant />
        </div>
    );
};

export default AdminLayout;
