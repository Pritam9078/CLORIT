import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TreePine,
  Leaf,
  Coins,
  Activity,
  TrendingUp,
  PlusCircle,
  Vote,
  LineChart,
  CircleDollarSign,
  ArrowUpRight,
  Target,
  Zap
} from 'lucide-react';

import AnalyticsWidget from './shared/AnalyticsWidget';
import ProgressTracker from './shared/ProgressTracker';
import WeatherWidget from './shared/WeatherWidget';
import PerformanceMonitor from './shared/PerformanceMonitor';
import ResourceUsageWidget from './shared/ResourceUsageWidget';
import ActivityFeed from './shared/ActivityFeed';
import DataVisualizationHub from './shared/DataVisualizationHub';
import SettingsPreferences from './shared/SettingsPreferences';
import WalletConnectModal from './WalletConnectModal';

import CommunityLayout from './shared/CommunityLayout';
import CommunityCard from './shared/CommunityCard';

import { AuthUtils } from '../utils/auth';
import { CurrencyUtils } from '../utils/currency';
import { WalletUtils } from '../utils/walletUtils';

const CommunityDashboard = () => {
  const navigate = useNavigate();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletBalance, setWalletBalance] = useState('0');

  // Get current user info
  const rawUser = AuthUtils.getCurrentUser() || {
    name: 'Rajesh Kumar',
    email: 'community@example.com',
    role: 'community'
  };

  const currentUser = {
    ...rawUser,
    name: (rawUser as any).fullName || rawUser.name || 'User'
  };

  useEffect(() => {
    // Initialize mock user profile if not exists
    const user = AuthUtils.getCurrentUser();
    if (!user) {
      const mockUser = {
        id: 'community-001',
        name: 'Rajesh Kumar',
        email: 'community@example.com',
        role: 'community',
      };
      AuthUtils.saveUserProfile(mockUser);
    }

    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    try {
      if (WalletUtils.isConnected()) {
        const storedAddress = localStorage.getItem('CLORIT_WALLET_ADDRESS');
        if (storedAddress) {
          setWalletConnected(true);
          setWalletAddress(storedAddress);

          const provider = WalletUtils.getEthereumProvider();
          if (provider) {
            try {
              const balance = await provider.request({
                method: 'eth_getBalance',
                params: [storedAddress, 'latest']
              });
              setWalletBalance(WalletUtils.weiToEth(balance));
            } catch (error) {
              setWalletBalance('0');
            }
          }
        }
      }
    } catch (error) {
      console.log('No wallet connected');
    }
  };

  const handleWalletConnect = async (address: string, provider: any) => {
    setWalletConnected(true);
    setWalletAddress(address);
    try {
      const balance = await provider.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
      });
      setWalletBalance(WalletUtils.weiToEth(balance));
    } catch (error) {
      setWalletBalance('0');
    }
  };

  // Quick Action Cards Data
  const quickActions = [
    {
      title: "Plant Trees",
      description: "Register new plantations and contribute to restoration.",
      icon: TreePine,
      color: "emerald",
      btnText: "Get Started",
      action: () => navigate('/land-registration')
    },
    {
      title: "Vote on Proposals",
      description: "Participate in DAO governance and shape decisions.",
      icon: Vote,
      color: "blue",
      btnText: "Vote Now",
      action: () => navigate('/dashboards') // Replace with actual voting route when ready
    },
    {
      title: "Trade Credits",
      description: "Buy and sell carbon credits in the marketplace.",
      icon: CircleDollarSign,
      color: "amber",
      btnText: "Start Trading",
      action: () => navigate('/earn-credits')
    },
    {
      title: "View Impact",
      description: "Track your environmental impact and project analytics.",
      icon: LineChart,
      color: "violet",
      btnText: "View Report",
      action: () => navigate('/track-impact')
    }
  ];

  const stats = [
    { label: "Trees Planted", value: "156", icon: TreePine, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "CO₂ Captured", value: "2.4 tons", icon: Leaf, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Earnings", value: "₹24,500", icon: CircleDollarSign, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Active Projects", value: "8", icon: Activity, color: "text-violet-600", bg: "bg-violet-50" }
  ];

  return (
    <CommunityLayout>
      {/* Welcome Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-8 md:p-12 mb-12 shadow-2xl shadow-emerald-200/50 group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-white/20 transition-colors duration-700" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl -ml-20 -mb-20" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl md:text-4xl shadow-inner border border-white/20 animate-bounce-slow">
              👋
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
                Welcome back, {currentUser.name}!
              </h1>
              <p className="text-lg text-emerald-50 font-medium opacity-90 max-w-2xl">
                You're making a real difference. Today is a great day to grow our impact even further!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex items-start gap-4 hover:bg-white/15 transition-all">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="text-emerald-100/70 text-sm font-bold uppercase tracking-wider mb-1">Today's Goal</p>
                <p className="text-white font-bold text-lg">Plant 5 more trees</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex items-start gap-4 hover:bg-white/15 transition-all">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <p className="text-emerald-100/70 text-sm font-bold uppercase tracking-wider mb-1">Quick Action</p>
                <p className="text-white font-bold text-lg">Update plantation data</p>
              </div>
            </div>

            <button
              onClick={() => setIsWalletModalOpen(true)}
              className="bg-white text-emerald-800 font-bold rounded-2xl p-6 flex items-center justify-center gap-3 hover:bg-emerald-50 transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98]"
            >
              <PlusCircle className="w-6 h-6 text-emerald-600" />
              New Registration
            </button>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <CommunityCard key={idx} padding="normal" className="group">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm font-semibold mb-0.5">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-800 tracking-tight">
                    {stat.value}
                    {stat.label === "Total Earnings" && CurrencyUtils.shouldShowConversion("24500", "Earnings") && (
                      <span className="block text-[10px] text-slate-400 font-medium">
                        {CurrencyUtils.getConversionString("24500", "Earnings")}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </CommunityCard>
          );
        })}
      </section>

      {/* Primary Actions */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-8 bg-emerald-500 rounded-full" />
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Take Action</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <CommunityCard
                key={idx}
                onClick={action.action}
                className="hover:ring-2 hover:ring-emerald-500/20"
              >
                <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110
                  ${action.color === 'emerald' ? 'bg-emerald-500 text-white shadow-emerald-100' : ''}
                  ${action.color === 'blue' ? 'bg-blue-500 text-white shadow-blue-100' : ''}
                  ${action.color === 'amber' ? 'bg-amber-500 text-white shadow-amber-100' : ''}
                  ${action.color === 'violet' ? 'bg-violet-500 text-white shadow-violet-100' : ''}
                `}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 truncate">{action.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                  {action.description}
                </p>
                <div className={`flex items-center gap-2 font-bold text-sm
                  ${action.color === 'emerald' ? 'text-emerald-600' : ''}
                  ${action.color === 'blue' ? 'text-blue-600' : ''}
                  ${action.color === 'amber' ? 'text-amber-600' : ''}
                  ${action.color === 'violet' ? 'text-violet-600' : ''}
                `}>
                  {action.btnText}
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </CommunityCard>
            );
          })}
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column: Analytics & Visualization */}
        <div className="lg:col-span-2 space-y-8">
          <CommunityCard title="Impact Analytics" icon={TrendingUp}>
            <div className="h-[400px]">
              <AnalyticsWidget userRole="community" />
            </div>
          </CommunityCard>

          <CommunityCard title="Data Visualization" icon={Activity}>
            <DataVisualizationHub userRole="community" />
          </CommunityCard>
        </div>

        {/* Right Column: Widgets & Feed */}
        <div className="space-y-8">
          <CommunityCard title="Local Weather" icon={Zap}>
            <WeatherWidget location="Your Plantation Area" />
          </CommunityCard>

          <CommunityCard title="Progress Tracker" icon={Target}>
            <ProgressTracker userRole="community" />
          </CommunityCard>

          <CommunityCard title="Account Settings" icon={SettingsPreferences}>
            <SettingsPreferences userRole="community" />
          </CommunityCard>
        </div>
      </div>

      {/* Activity Feed (Full Width) */}
      <section className="mb-12">
        <CommunityCard title="Recent Activity" icon={Activity}>
          <ActivityFeed
            className="w-full"
            userRole="community"
            maxItems={10}
            filterByRole={false}
          />
        </CommunityCard>
      </section>

      {/* Performance & Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CommunityCard title="System Performance" icon={TrendingUp}>
          <PerformanceMonitor />
        </CommunityCard>
        <CommunityCard title="Resource Usage" icon={Zap}>
          <ResourceUsageWidget />
        </CommunityCard>
      </div>

      {/* Wallet Modal */}
      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleWalletConnect}
      />
    </CommunityLayout>
  );
};

export default CommunityDashboard;
