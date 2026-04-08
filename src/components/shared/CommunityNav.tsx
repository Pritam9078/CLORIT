import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Map,
    TreePine,
    BarChart3,
    Coins,
    Menu,
    X,
    Bell,
    User,
    LogOut,
    Settings,
    HelpCircle,
    Wallet,
    ChevronDown,
    Trophy
} from 'lucide-react';
import { AuthUtils, UserProfile } from '../../utils/auth';
import { WalletUtils, WalletState } from '../../utils/walletUtils';
import { LOGO_CONFIG } from '../../constants/branding';

const CommunityNav: React.FC = () => {
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
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, route: '/user/dashboard' },
        { id: 'land-registration', label: 'Land Registration', icon: Map, route: '/land-registration' },
        { id: 'track-impact', label: 'Track Impact', icon: BarChart3, route: '/track-impact' },
        { id: 'input-data', label: 'Input Data', icon: TreePine, route: '/plantation-data-input' },
        { id: 'earn-credits', label: 'Earn Credits', icon: Coins, route: '/earn-credits' },
        { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, route: '/community/leaderboard' }
    ];

    const handleLogout = () => {
        AuthUtils.logout();
        WalletUtils.disconnectWallet();
        navigate('/login');
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="sticky top-0 z-[100] w-full bg-white/80 backdrop-blur-md border-b border-emerald-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-3 group transition-all"
                        >
                            <div className="relative w-10 h-10 overflow-hidden rounded-xl shadow-lg shadow-emerald-200 group-hover:scale-105 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-20" />
                                <img
                                    src={LOGO_CONFIG.MAIN_LOGO}
                                    alt={LOGO_CONFIG.LOGO_ALT}
                                    className="w-full h-full object-cover relative z-10"
                                    onError={(e) => {
                                        // Fallback if image fails to load
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        target.parentElement?.insertAdjacentHTML('afterbegin', '<div class="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg></div>');
                                    }}
                                />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
                                {LOGO_CONFIG.BRAND_NAME}
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
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${active
                                        ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-600'
                                        }`}
                                >
                                    <Icon className={`w-4.5 h-4.5 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Right Section: Profile */}
                    <div className="hidden xl:flex items-center gap-4">
                        {/* Wallet Info */}
                        {walletState?.isConnected ? (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg text-xs font-medium text-emerald-700">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                <span>{WalletUtils.formatAddress(walletState.address!)}</span>
                                <span className="text-emerald-500 bg-white px-1.5 py-0.5 rounded border border-emerald-100">
                                    {parseFloat(walletState.balance).toFixed(3)} ETH
                                </span>
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate('/wallet-test')}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-md shadow-slate-200"
                            >
                                <Wallet className="w-4 h-4" />
                                Connect
                            </button>
                        )}

                        {/* Notifications */}
                        <button className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-slate-100">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl hover:border-emerald-200 hover:bg-slate-50 transition-all"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                                    {currentUser?.name?.charAt(0).toUpperCase() || '?'}
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-slate-800 line-clamp-1 max-w-[100px]">{currentUser?.name || 'User'}</p>
                                    <p className="text-[10px] text-emerald-600 font-medium tracking-wide border px-1 rounded bg-emerald-50 border-emerald-100 inline-block uppercase">Community</p>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileDropdownOpen(false)} />
                                    <div className="absolute right-0 mt-2 mr-1 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 origin-top-right">
                                        <div className="px-4 py-2 border-b border-slate-50 mb-1">
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Account Settings</p>
                                        </div>
                                        <button
                                            onClick={() => { setIsProfileDropdownOpen(false); navigate('/profile'); }}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                                        >
                                            <User className="w-4 h-4" /> Profile
                                        </button>
                                        <button
                                            onClick={() => { setIsProfileDropdownOpen(false); navigate('/settings'); }}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                                        >
                                            <Settings className="w-4 h-4" /> Settings
                                        </button>
                                        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                                            <HelpCircle className="w-4 h-4" /> Help Center
                                        </button>
                                        <div className="h-px bg-slate-50 my-1" />
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold"
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
                        <button className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 border border-slate-100">
                            <Bell className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Content */}
            {isMobileMenuOpen && (
                <div className="xl:hidden bg-white border-t border-emerald-50 px-4 py-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
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
                                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-bold transition-all ${active
                                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100'
                                        : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-400'}`} />
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-3 px-4 py-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
                                {currentUser?.name?.charAt(0).toUpperCase() || '?'}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">{currentUser?.name || 'User'}</p>
                                <p className="text-xs text-emerald-600 font-medium uppercase tracking-tight">Community Member</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-red-600 font-bold hover:bg-red-50 rounded-xl"
                        >
                            <LogOut className="w-5 h-5" /> Log out
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default CommunityNav;
