import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CorporateBuyerLayout from './shared/CorporateBuyerLayout';
import CorporateBuyerCard from './shared/CorporateBuyerCard';
import {
    TrendingUp,
    Wallet,
    Leaf,
    Globe,
    ShieldCheck,
    IndianRupee,
    Users,
    ArrowUpRight,
    ExternalLink,
    PieChart
} from 'lucide-react';
import { WalletUtils, WalletState } from '../utils/walletUtils';

const CorporateBuyerOverview = () => {
    const navigate = useNavigate();
    const [walletState, setWalletState] = useState<WalletState | null>(null);

    useEffect(() => {
        const wallet = WalletUtils.getWalletState();
        setWalletState(wallet);
    }, []);

    const platformStats = [
        { label: 'Total Assets', value: '$124,500', icon: Wallet, change: '+12.5%', trend: 'up', color: 'from-blue-500 to-indigo-600' },
        { label: 'Carbon Credits', value: '8,420', icon: Leaf, change: '+8.2%', trend: 'up', color: 'from-emerald-500 to-green-600' },
        { label: 'Impact Offset', value: '4,210t', icon: Globe, change: '+15.3%', trend: 'up', color: 'from-indigo-500 to-purple-600' },
        { label: 'Verified Proofs', value: '100%', icon: ShieldCheck, change: '0%', trend: 'stable', color: 'from-amber-500 to-orange-600' },
        { label: 'Active Projects', value: '12', icon: IndianRupee, change: '+2', trend: 'up', color: 'from-pink-500 to-rose-600' },
    ];

    const sustainabilityGoals = [
        { label: 'Net Zero Alignment', target: '5,000t', current: '4,210t', progress: 84, color: 'bg-emerald-500' },
        { label: 'Plastic Neutrality', target: '20,000kg', current: '12,000kg', progress: 60, color: 'bg-blue-500' },
        { label: 'Marine Diversity Support', target: '10 Sites', current: '8 Sites', progress: 80, color: 'bg-indigo-500' },
    ];

    const activityFeed = [
        { title: 'New Credits Minted', time: '2 hours ago', desc: '500 CCT from Sundarbans Site #4 verified and minted.', icon: '🌿', type: 'impact' },
        { title: 'KYB Verification Success', time: 'Yesterday', desc: 'Enterprise profile level 2 verified by CLORIT Protocol.', icon: '🛡️', type: 'system' },
        { title: 'Impact Report Ready', time: '2 days ago', desc: 'November 2024 sustainability audit is now available for download.', icon: '📊', type: 'report' },
    ];

    const impactDistribution = [
        { label: 'Mangroves', color: 'bg-emerald-500', percentage: 45 },
        { label: 'Seagrass', color: 'bg-blue-500', percentage: 30 },
        { label: 'Saltmarsh', color: 'bg-amber-500', percentage: 20 },
        { label: 'Others', color: 'bg-slate-300', percentage: 5 },
    ];

    return (
        <CorporateBuyerLayout>
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
                    Corporate <span className="text-blue-600">Overview</span>
                </h1>
                <p className="text-slate-500 font-medium text-lg">
                    Track your sustainability impact and carbon credit portfolio
                </p>
            </div>

            {/* Welcome Hero Section */}
            <CorporateBuyerCard className="mb-8 bg-gradient-to-br from-blue-600 to-indigo-700 border-blue-500 text-white overflow-hidden relative">
                <div className="relative z-10">
                    <h2 className="text-3xl font-black mb-2">Welcome to Sustainability Command, Acme Corp</h2>
                    <p className="text-blue-100 text-lg mb-6">
                        You have neutralized 4,210 tonnes of CO2e this year. Explore your impact trajectory.
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate('/corporate-esg-reports')}
                            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg"
                        >
                            View ESG Report <ArrowUpRight className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => navigate('/corporate-marketplace')}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-500/30 text-white border border-white/20 rounded-xl font-bold hover:bg-blue-500/50 transition-all backdrop-blur-sm"
                        >
                            Invest More
                        </button>
                    </div>
                </div>
                <div className="absolute right-0 top-0 opacity-10">
                    <Globe className="w-64 h-64 -rotate-12" />
                </div>
            </CorporateBuyerCard>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                {platformStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <CorporateBuyerCard key={index} className="hover:scale-105 transition-transform">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-3xl font-black text-slate-800 mb-1">{stat.value}</p>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                        </CorporateBuyerCard>
                    );
                })}
            </div>

            {/* 2-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Charts & Activity */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Portfolio Performance Chart */}
                    <CorporateBuyerCard>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-blue-600" />
                                Portfolio Trajectory
                            </h2>
                            <div className="flex gap-2">
                                {['1W', '1M', '3M', '6M', '1Y', 'ALL'].map(p => (
                                    <button key={p} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${p === '1Y' ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-50'}`}>
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="h-64 bg-gradient-to-t from-blue-50 to-transparent rounded-2xl flex items-end justify-center p-6 relative overflow-hidden">
                            <svg width="100%" height="200" viewBox="0 0 1000 200" preserveAspectRatio="none">
                                <path d="M0,180 Q100,160 200,170 T400,140 T600,100 T800,90 T1000,60 L1000,200 L0,200 Z" fill="rgba(59, 130, 246, 0.1)" />
                                <path d="M0,180 Q100,160 200,170 T400,140 T600,100 T800,90 T1000,60" fill="none" stroke="#3b82f6" strokeWidth="4" />
                            </svg>
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                                <div className="text-xs text-slate-500 uppercase mb-1">Current Cumulative Impact</div>
                                <div className="text-2xl font-black text-slate-800">4,210 tCO2e</div>
                            </div>
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-emerald-100">
                                <div className="text-xs text-slate-500 uppercase mb-1">Projected EOY</div>
                                <div className="text-2xl font-black text-emerald-600">5,500 tCO2e</div>
                            </div>
                        </div>
                    </CorporateBuyerCard>

                    {/* Activity Feed */}
                    <CorporateBuyerCard>
                        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2 mb-6">
                            <Users className="w-6 h-6 text-indigo-600" />
                            Pulse Feed
                        </h2>
                        <div className="space-y-4">
                            {activityFeed.map((item, i) => (
                                <div key={i} className={`flex gap-4 ${i < activityFeed.length - 1 ? 'pb-4 border-b border-slate-100' : ''}`}>
                                    <div className="text-3xl">{item.icon}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="font-bold text-slate-800">{item.title}</div>
                                            <div className="text-xs text-slate-400">{item.time}</div>
                                        </div>
                                        <div className="text-sm text-slate-600">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-blue-600 font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                            View Full Activity <ExternalLink className="w-4 h-4" />
                        </button>
                    </CorporateBuyerCard>
                </div>

                {/* Right Column: Goals & Insights */}
                <div className="space-y-8">
                    {/* Sustainability Goals */}
                    <CorporateBuyerCard>
                        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2 mb-6">
                            <ShieldCheck className="w-6 h-6 text-emerald-600" />
                            2024 Goal Progress
                        </h2>
                        {sustainabilityGoals.map((goal, i) => (
                            <div key={i} className="mb-6">
                                <div className="flex items-center justify-between mb-2 text-sm">
                                    <span className="font-bold text-slate-700">{goal.label}</span>
                                    <span className="text-slate-500">{goal.current} / {goal.target}</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${goal.color} rounded-full transition-all duration-1000`} style={{ width: `${goal.progress}%` }} />
                                </div>
                            </div>
                        ))}
                    </CorporateBuyerCard>

                    {/* Impact Distribution */}
                    <CorporateBuyerCard>
                        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2 mb-6">
                            <PieChart className="w-6 h-6 text-amber-600" />
                            Impact Distribution
                        </h2>
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-32 h-32 rounded-full border-[16px] border-slate-100 border-t-emerald-500 border-r-blue-500 border-b-amber-500 flex items-center justify-center">
                                <Globe className="w-8 h-8 text-slate-300" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {impactDistribution.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                    <span className="text-slate-600 font-semibold">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </CorporateBuyerCard>

                    {/* Market Insights */}
                    <CorporateBuyerCard className="bg-blue-50 border-blue-200 border-dashed">
                        <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            Market Index
                        </h3>
                        <div className="mb-4">
                            <div className="text-xs text-slate-500 uppercase mb-1">Verified Blue Carbon (CCT)</div>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-black text-slate-800">$15.42</span>
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+4.2%</span>
                            </div>
                        </div>
                        <p className="text-xs text-slate-600 italic">
                            Next compliance update: 15 Jan 2025. Prices projected to increase due to new ESG frameworks.
                        </p>
                    </CorporateBuyerCard>
                </div>
            </div>
        </CorporateBuyerLayout>
    );
};

export default CorporateBuyerOverview;
