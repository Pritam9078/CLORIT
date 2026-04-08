import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../state/authStore';
import Sidebar from './admin/layout/Sidebar';
import TopNavbar from './admin/layout/TopNavbar';
import DashboardOverview from './admin/pages/DashboardOverview';
import ProjectManagement from './admin/pages/ProjectManagement';
import CarbonControl from './admin/pages/CarbonControl';
import MarketplaceMonitor from './admin/pages/MarketplaceMonitor';
import Analytics from './admin/pages/Analytics';
import Compliance from './admin/pages/Compliance';
import SystemControl from './admin/pages/SystemControl';
import UserManagement from './admin/pages/UserManagement';

const AdminDashboard: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('overview');
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || currentUser?.role !== 'admin') {
      navigate('/admin-login');
    }
  }, [currentUser, isAuthenticated, navigate]);

  if (!isAuthenticated || currentUser?.role !== 'admin') return null;

  const renderPage = () => {
    switch (activePage) {
      case 'overview':
        return <DashboardOverview />;
      case 'projects':
        return <ProjectManagement />;
      case 'carbon':
        return <CarbonControl />;
      case 'marketplace':
        return <MarketplaceMonitor />;
      case 'analytics':
        return <Analytics />;
      case 'compliance':
        return <Compliance />;
      case 'system':
        return <SystemControl />;
      case 'users':
        return <UserManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Fixed Sidebar */}
      <Sidebar activePage={activePage} onPageChange={setActivePage} />

      {/* Main Content Wrapper */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <TopNavbar />

        {/* Dynamic Page Content */}
        <main className="flex-1 mt-16 p-8 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto">
            {renderPage()}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="p-6 text-center text-slate-400 border-t border-slate-200 mt-auto bg-white/50 backdrop-blur-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest">
            © 2024 CLORIT Protocol • <span className="text-green-600">Secure Administrative Node</span> • Registry v2.4.1
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;
