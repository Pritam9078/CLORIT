import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Search, User, LogOut, 
  Menu, X, LayoutDashboard, 
  Settings, HelpCircle, ChevronRight
} from 'lucide-react';
import { useAuthStore } from '../../state/authStore';
import { useNavigate } from 'react-router-dom';
import { LOGO_CONFIG } from '../../constants/branding';

interface SidebarItem {
  icon: any;
  label: string;
  id: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarItems: SidebarItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  sidebarItems, 
  activeTab, 
  onTabChange 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { currentUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans selection:bg-emerald-500/20">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-white border-r border-[#E2E8F0] flex flex-col z-50 sticky top-0 h-screen transition-all"
      >
        {/* Sidebar Header */}
        <div className="h-[88px] flex items-center px-8 gap-3 border-b border-[#F1F5F9]">
          <motion.div 
            whileHover={{ rotate: 10 }}
            className="p-1.5 bg-emerald-50 rounded-[14px] shadow-inner border border-emerald-100 flex items-center justify-center shrink-0"
          >
             <img src={LOGO_CONFIG.MAIN_LOGO} alt={LOGO_CONFIG.LOGO_ALT} className="w-8 h-8 object-contain" />
          </motion.div>
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-extrabold text-[22px] text-[#1E293B] tracking-tight ml-1"
              >
                CLORIT
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group relative ${
                activeTab === item.id 
                  ? 'bg-[#F0FDF4] text-[#059669]' 
                  : 'text-[#64748B] hover:bg-[#F8FAFC]'
              }`}
            >
              <item.icon className={`w-5 h-5 shrink-0 transition-colors ${activeTab === item.id ? 'text-[#059669] stroke-[2.5px]' : 'group-hover:text-[#475569] stroke-[2px]'}`} />
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`text-sm whitespace-nowrap ${activeTab === item.id ? 'font-bold' : 'font-semibold'}`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {activeTab === item.id && isSidebarOpen && (
                <motion.div layoutId="active-pill" className="absolute right-3 w-1.5 h-6 bg-[#10B981] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#F1F5F9]">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[#EF4444] hover:bg-[#FEF2F2] transition-all group"
          >
            <LogOut className="w-5 h-5 stroke-[2.5px] group-hover:translate-x-1 transition-transform" />
            {isSidebarOpen && <span className="font-bold text-sm">Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-[88px] bg-white border-b border-[#E2E8F0] z-40 flex items-center justify-between px-8 sticky top-0">
          <div className="flex items-center gap-4">
             <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 lg:hidden"
             >
                <Menu className="w-6 h-6" />
             </button>
             <h2 className="text-xl font-bold text-[#1E293B]">
               {sidebarItems.find(i => i.id === activeTab)?.label}
             </h2>
          </div>

          <div className="flex items-center gap-4">
             {/* Search Bar */}
             <div className="hidden md:flex relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Quick lookup..."
                  className="bg-[#F1F5F9] border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none w-64"
                />
             </div>

             {/* Notifications */}
             <button className="p-2.5 rounded-xl text-gray-400 hover:bg-gray-50 relative group">
                <Bell className="w-5 h-5 group-hover:text-emerald-500 transition-colors" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white" />
             </button>

             {/* User Profile */}
             <div className="flex items-center gap-3 pl-4 border-l border-[#E2E8F0]">
                <div className="text-right hidden sm:block">
                   <p className="text-sm font-bold text-[#1E293B] leading-tight">{currentUser?.fullName}</p>
                   <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{currentUser?.role}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-blue-100 border-2 border-white shadow-sm flex items-center justify-center font-bold text-emerald-700">
                   {currentUser?.fullName.charAt(0)}
                </div>
             </div>
          </div>
        </header>

        {/* Dynamic Viewport */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
