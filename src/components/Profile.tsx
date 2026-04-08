import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthUtils, UserProfile } from '../utils/auth';
import { WalletUtils } from '../utils/walletUtils';
import CommunityLayout from './shared/CommunityLayout';
import CommunityCard from './shared/CommunityCard';
import {
  User,
  Shield,
  MapPin,
  Calendar,
  Wallet,
  Copy,
  CheckCircle,
  AlertCircle,
  Edit3,
  Save,
  X,
  TreePine,
  Wind,
  Trophy,
  FileText,
  Download,
  ExternalLink,
  ChevronRight,
  Loader2
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const currentUser = AuthUtils.getCurrentUser() || {
    name: 'Rajesh Kumar',
    email: 'community@example.com',
    role: 'community',
    location: 'Sundarbans, West Bengal',
    phone: '+91 98765 43210'
  };

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: currentUser?.name || 'Community Member',
    email: currentUser?.email || 'community@example.com',
    phone: currentUser?.phone || '+91 98765 43210',
    location: currentUser?.location || 'Sundarbans, West Bengal',
    joinDate: 'Jan 2024',
    bio: 'Dedicated to restoring the mangrove ecosystem. Leading a community of 50+ families in sustainable blue carbon practices.',
    walletConnected: false,
    walletAddress: '',
  });

  const [walletStatus, setWalletStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [walletError, setWalletError] = useState('');
  const [availableWallets, setAvailableWallets] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize wallet check
  useEffect(() => {
    const checkWallets = () => {
      const wallets = [];
      if (WalletUtils.isMetaMaskAvailable()) wallets.push('MetaMask');
      if (WalletUtils.isCoinbaseWalletAvailable()) wallets.push('Coinbase');
      if (WalletUtils.isPhantomAvailable()) wallets.push('Phantom');
      setAvailableWallets(wallets);

      const savedAddress = localStorage.getItem('CLORIT_WALLET_ADDRESS');
      if (savedAddress && WalletUtils.isWalletAvailable()) {
        setProfile(prev => ({ ...prev, walletConnected: true, walletAddress: savedAddress }));
        setWalletStatus('connected');
      }
    };
    checkWallets();
  }, []);

  const connectWallet = async (type?: 'metamask' | 'coinbase' | 'phantom') => {
    setWalletStatus('connecting');
    try {
      const result = await WalletUtils.connectWallet(type);
      if (result.success && result.address) {
        setProfile(prev => ({ ...prev, walletConnected: true, walletAddress: result.address! }));
        setWalletStatus('connected');

        // Update user profile
        AuthUtils.saveUserProfile({
          ...currentUser,
          walletAddress: result.address
        } as UserProfile);
      } else {
        setWalletStatus('error');
        setWalletError(result.error || 'Connection failed');
      }
    } catch (err: any) {
      setWalletStatus('error');
      setWalletError(err.message);
    }
  };

  const disconnectWallet = () => {
    WalletUtils.disconnectWallet();
    setProfile(prev => ({ ...prev, walletConnected: false, walletAddress: '' }));
    setWalletStatus('disconnected');
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    AuthUtils.saveUserProfile({
      ...currentUser,
      name: profile.name,
      email: profile.email,
      location: profile.location,
      phone: profile.phone
    } as UserProfile);

    setIsEditing(false);
    setIsLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add toast here
  };

  return (
    <CommunityLayout>
      {/* Hero Header */}
      <div className="relative mb-12 rounded-[2.5rem] overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
        {/* Abstract Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[80px] -ml-20 -mb-20" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        </div>

        <div className="relative z-10 px-8 py-12 md:px-12 md:py-16 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          {/* Avatar */}
          <div className="relative group">
            <div className="absolute inset-0 bg-emerald-500 rounded-[2rem] blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] bg-gradient-to-br from-emerald-400 to-teal-600 p-1 relative z-10 shadow-xl">
              <div className="w-full h-full bg-slate-800 rounded-[1.8rem] flex items-center justify-center overflow-hidden">
                <span className="text-5xl md:text-6xl font-black text-white/90">
                  {(profile.name || 'User').charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-white rounded-full border-4 border-slate-900 flex items-center justify-center text-emerald-600 shadow-lg z-20">
              <Shield className="w-6 h-6 fill-current" />
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4">
              <CheckCircle className="w-3 h-3" /> Verified Community
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
              {profile.name}
            </h1>
            <p className="text-slate-400 text-lg font-medium mb-6 max-w-2xl flex items-center justify-center md:justify-start gap-2">
              <MapPin className="w-4 h-4 text-emerald-500" /> {profile.location}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <div className="px-6 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-white/80 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-400" />
                {profile.walletConnected ? 'Wallet Active' : 'No Wallet'}
              </div>
              <div className="px-6 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-white/80 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                Joined {profile.joinDate}
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <div className="absolute top-8 right-8">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all backdrop-blur-md"
            >
              {isEditing ? <X className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

        {/* Left Col: Identity & Docs */}
        <div className="lg:col-span-2 space-y-8">
          {/* Identity Card */}
          <CommunityCard className="overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Community Identity</h2>
                <p className="text-slate-500 text-sm font-medium">Core verification details</p>
              </div>
              <User className="w-8 h-8 text-slate-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 font-bold text-slate-700 outline-none focus:border-emerald-500 focus:bg-white transition-all disabled:opacity-70 disabled:bg-slate-50/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={e => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                  className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 font-bold text-slate-700 outline-none focus:border-emerald-500 focus:bg-white transition-all disabled:opacity-70 disabled:bg-slate-50/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={e => setProfile({ ...profile, phone: e.target.value })}
                  disabled={!isEditing}
                  className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 font-bold text-slate-700 outline-none focus:border-emerald-500 focus:bg-white transition-all disabled:opacity-70 disabled:bg-slate-50/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={e => setProfile({ ...profile, location: e.target.value })}
                  disabled={!isEditing}
                  className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 font-bold text-slate-700 outline-none focus:border-emerald-500 focus:bg-white transition-all disabled:opacity-70 disabled:bg-slate-50/50"
                />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Community Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={e => setProfile({ ...profile, bio: e.target.value })}
                  disabled={!isEditing}
                  className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl p-4 font-medium text-slate-700 outline-none focus:border-emerald-500 focus:bg-white transition-all disabled:opacity-70 disabled:bg-slate-50/50 resize-none"
                />
              </div>
            </div>

            {isEditing && (
              <div className="mt-8 flex justify-end gap-4">
                <button onClick={() => setIsEditing(false)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="px-8 py-3 rounded-xl bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 active:scale-95 transition-all flex items-center gap-2"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </button>
              </div>
            )}
          </CommunityCard>

          {/* Document Vault */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-100 rounded-[2rem] p-6 hover:shadow-xl hover:shadow-emerald-900/5 transition-all group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-black text-slate-800 mb-1">Land Ownership</h3>
                <p className="text-xs text-slate-400 font-medium mb-4">Verified by Panchayat</p>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Document <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-[2rem] p-6 hover:shadow-xl hover:shadow-blue-900/5 transition-all group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-black text-slate-800 mb-1">Identity Proof</h3>
                <p className="text-xs text-slate-400 font-medium mb-4">Govt. ID Verified</p>
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Document <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Wallet & Impact */}
        <div className="space-y-8">
          {/* Premium Wallet Card */}
          <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-emerald-500/20 rounded-full blur-[60px]" />
            <div className="absolute bottom-[-50px] left-[-20px] w-48 h-48 bg-blue-500/20 rounded-full blur-[40px]" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-bold text-slate-400 text-sm uppercase tracking-1">Connected Wallet</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className={`w-2 h-2 rounded-full ${profile.walletConnected ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                    <span className="font-black tracking-tight text-lg">
                      {profile.walletConnected ? 'Active Connection' : 'Disconnected'}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
              </div>

              {profile.walletConnected ? (
                <div className="space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Wallet Address</label>
                    <div className="flex items-center gap-3">
                      <code className="flex-1 font-mono text-xs text-emerald-400 truncate">
                        {profile.walletAddress}
                      </code>
                      <button onClick={() => copyToClipboard(profile.walletAddress)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <Copy className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                  <button onClick={disconnectWallet} className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 font-bold text-sm hover:bg-red-500/10 transition-colors uppercase tracking-wide">
                    Disconnect
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {availableWallets.includes('MetaMask') && (
                    <button onClick={() => connectWallet('metamask')} className="w-full py-3 rounded-xl bg-orange-500 text-white font-bold shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all flex items-center justify-center gap-2">
                      Connect MetaMask
                    </button>
                  )}
                  <button onClick={() => connectWallet()} className="w-full py-3 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors">
                    Connect Other Wallet
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Impact Quick Stats */}
          <CommunityCard>
            <h3 className="font-black text-slate-800 text-lg mb-6 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" /> Impact Overview
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <TreePine className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-800">1,245</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trees</p>
                  </div>
                </div>
                <span className="text-emerald-500 font-bold text-xs">+12%</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                    <Wind className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-800">84.5t</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CO2 Captured</p>
                  </div>
                </div>
                <span className="text-blue-500 font-bold text-xs">+5%</span>
              </div>
            </div>
          </CommunityCard>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default Profile;
