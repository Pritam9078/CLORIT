import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    ShieldCheck,
    FileText,
    Settings,
    Menu,
    X,
    Bell,
    User,
    LogOut,
    Wallet,
    ChevronDown,
    Building2,
    Briefcase
} from 'lucide-react';
import { AuthUtils, UserProfile } from '../../utils/auth';
import { WalletUtils, WalletState } from '../../utils/walletUtils';
import { LOGO_CONFIG } from '../../constants/branding';

const NGONav: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
    const [walletState, setWalletState] = useState<WalletState | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    useEffect(() => {
        const user = AuthUtils.getCurrentUser();
        setCurrentUser(user);

        const wallet = WalletUtils.getWalletState();
        setWalletState(wallet);
    }, []);

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, route: '/ngo/dashboard' },
        { id: 'verification', label: 'Verification Portal', icon: ShieldCheck, route: '/ngo-verification' },
        { id: 'marketplace', label: 'Marketplace', icon: Briefcase, route: '/ngo-marketplace' },
        { id: 'reports', label: 'Impact Reports', icon: FileText, route: '/impact-reporting' },
    ];

    const handleLogout = () => {
        AuthUtils.logout();
        WalletUtils.disconnectWallet();
        navigate('/');
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="sticky top-0 z-[100] w-full bg-white/90 backdrop-blur-xl border-b border-cyan-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <button
                            onClick={() => navigate('/ngo/dashboard')}
                            className="flex items-center gap-3 group transition-all"
                        >
                            <div className="relative w-10 h-10 overflow-hidden rounded-xl shadow-lg shadow-cyan-200 group-hover:scale-105 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-20" />
                                <img
                                    src={LOGO_CONFIG.MAIN_LOGO}
                                    alt={LOGO_CONFIG.LOGO_ALT}
                                    className="w-full h-full object-cover relative z-10"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        target.parentElement?.insertAdjacentHTML('afterbegin', '<div class="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg></div>');
                                    }}
                                />
                            </div>
                            <span className="text-2xl font-black bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent tracking-tight">
                                {LOGO_CONFIG.BRAND_NAME} <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest ml-1 align-top">NGO</span>
                            </span>
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden xl:flex items-center space-x-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.route);
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => navigate(item.route)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${active
                                        ? 'bg-cyan-50 text-cyan-700 shadow-sm border border-cyan-100'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-cyan-600'
                                        }`}
                                >
                                    <Icon className={`w-4.5 h-4.5 ${active ? 'text-cyan-600' : 'text-slate-400'}`} />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Right Section: Profile */}
                    <div className="hidden xl:flex items-center gap-4">
                        {/* Wallet Info */}
                        {walletState?.isConnected ? (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-50 border border-cyan-100 rounded-lg text-xs font-bold text-cyan-700">
                                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                                <span>{WalletUtils.formatAddress(walletState.address!)}</span>
                                <span className="text-cyan-600 bg-white px-1.5 py-0.5 rounded border border-cyan-100 ml-1">
                                    {parseFloat(walletState.balance).toFixed(3)} ETH
                                </span>
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate('/wallet-test')}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 hover:-translate-y-0.5"
                            >
                                <Wallet className="w-4 h-4" />
                                Connect
                            </button>
                        )}

                        {/* Notifications */}
                        <button className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all border border-slate-100">
                            <Bell className="w-5 h-5" />
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl hover:border-cyan-200 hover:bg-cyan-50/30 transition-all group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-cyan-200">
                                    {currentUser?.name?.charAt(0).toUpperCase() || <Building2 className="w-4 h-4" />}
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-slate-800 line-clamp-1 max-w-[100px]">{currentUser?.name || 'NGO Partner'}</p>
                                    <p className="text-[10px] text-cyan-600 font-bold tracking-wide uppercase">Verified</p>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 group-hover:text-cyan-500 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileDropdownOpen(false)} />
                                    <div className="absolute right-0 mt-2 mr-1 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 origin-top-right">
                                        <div className="px-5 py-3 border-b border-slate-50 mb-1">
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Organization Settings</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                navigate('/ngo-profile');
                                                setIsProfileDropdownOpen(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-5 py-3 text-sm text-slate-600 font-bold hover:bg-cyan-50 hover:text-cyan-700 transition-colors"
                                        >
                                            <Building2 className="w-4 h-4" /> Organization Profile
                                        </button>
                                        <button
                                            onClick={() => {
                                                navigate('/ngo-settings');
                                                setIsProfileDropdownOpen(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-5 py-3 text-sm text-slate-600 font-bold hover:bg-cyan-50 hover:text-cyan-700 transition-colors"
                                        >
                                            <Settings className="w-4 h-4" /> Settings
                                        </button>
                                        <div className="h-px bg-slate-50 my-1" />
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-bold"
                                        >
                                            <LogOut className="w-4 h-4" /> Log out
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex xl:hidden items-center gap-3">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-cyan-500 text-white shadow-lg shadow-cyan-200 active:scale-95 transition-transform"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Content */}
            {isMobileMenuOpen && (
                <div className="xl:hidden bg-white border-t border-cyan-50 px-4 py-6 space-y-4 animate-in slide-in-from-top-4 duration-300 shadow-xl">
                    {/* Navigation Items */}
                    <div className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.route);
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        navigate(item.route);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-base font-bold transition-all ${active
                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-200'
                                        : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-400'}`} />
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Profile & Settings Section */}
                    <div className="pt-4 border-t border-slate-100 space-y-2">
                        <div className="px-4 py-2">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Account</p>
                            <p className="text-sm font-bold text-slate-800 mt-1">{currentUser?.name || 'NGO Partner'}</p>
                        </div>
                        <button
                            onClick={() => {
                                navigate('/ngo-profile');
                                setIsMobileMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors"
                        >
                            <Building2 className="w-4 h-4" /> Organization Profile
                        </button>
                        <button
                            onClick={() => {
                                navigate('/ngo-settings');
                                setIsMobileMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors"
                        >
                            <Settings className="w-4 h-4" /> Settings
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 font-bold hover:bg-red-50 rounded-xl transition-colors"
                        >
                            <LogOut className="w-5 h-5" /> Log out
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default NGONav;
