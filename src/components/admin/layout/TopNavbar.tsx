import { useState } from 'react';
import { Search, Bell, User, LogOut, Settings as SettingsIcon, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../state/authStore';
import AdminWalletStatus from '../../AdminWalletStatus';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const TopNavbar: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuthStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 fixed top-0 right-0 left-64 z-40 px-8 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md relative group">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search projects, transactions, or users..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          {/* Wallet Status */}
          <AdminWalletStatus className="scale-90" />

          {/* Notifications */}
          <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 p-1 pr-3 hover:bg-slate-50 rounded-full transition-colors group outline-none">
              <div className="h-8 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white border border-slate-200 transition-all font-bold text-xs uppercase">
                  {currentUser?.fullName?.charAt(0) || 'A'}
                </div>
                <div className="text-left flex flex-col justify-center">
                  <p className="text-xs font-semibold text-slate-700 leading-none">{currentUser?.fullName || 'Main Admin'}</p>
                  <span className="text-[9px] font-bold text-red-600 bg-red-50 px-1 py-0.5 rounded mt-0.5 w-max">ADMIN</span>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer gap-2 py-2 text-sm" onClick={() => setIsProfileOpen(true)}>
                <User className="w-4 h-4 text-slate-400" /> View Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer gap-2 py-2 text-sm">
                <SettingsIcon className="w-4 h-4 text-slate-400" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer gap-2 py-2 text-sm text-red-600 focus:text-red-700 focus:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Admin Profile Modal */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-md border-none shadow-2xl overflow-hidden p-0">
          <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-r from-red-600 to-red-400 opacity-90"></div>
          <DialogHeader className="relative z-10 pt-10 px-6">
            <div className="mx-auto w-20 h-20 bg-slate-900 border-4 border-white rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-4">
              {currentUser?.fullName?.charAt(0) || 'A'}
            </div>
            <DialogTitle className="text-center text-2xl font-black text-slate-900">{currentUser?.fullName || 'Main Admin'}</DialogTitle>
            <DialogDescription className="text-center flex justify-center !mt-1">
              <span className="px-2.5 py-1 bg-red-100 text-red-700 font-bold text-xs rounded-full flex items-center gap-1.5 mt-2 uppercase tracking-wide border border-red-200">
                <Shield size={14} /> Global Administrator
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-6 px-6 bg-white">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-1 hover:border-slate-200 transition-colors">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Email Address</span>
              <span className="text-sm font-semibold text-slate-700">{currentUser?.email || 'admin@clorit.io'}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-1 hover:border-slate-200 transition-colors cursor-pointer group">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Wallet Identity</span>
              <span className="text-xs font-mono font-semibold text-slate-600 break-all group-hover:text-blue-600 transition-colors">{currentUser?.walletAddress || '0x0000000000000000000000000000000000000000'}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-1 hover:border-slate-200 transition-colors">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">System Permissions</span>
              <span className="text-xs font-semibold text-slate-600 leading-relaxed mt-1">
                Full platform control • Project Approval • Verification Protocol Overlay • Token Minting Access
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TopNavbar;
