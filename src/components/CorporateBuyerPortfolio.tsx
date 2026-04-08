import React, { useState } from 'react';
import CorporateBuyerCard from './shared/CorporateBuyerCard';
import {
    PieChart,
    TrendingUp,
    Download,
    ExternalLink,
    CheckCircle2,
    XCircle,
    Clock
} from 'lucide-react';

const CorporateBuyerPortfolio = () => {
    const [selectedTab, setSelectedTab] = useState('holdings');

    const holdings = [
        { project: 'Sundarbans Mangrove Restoration', credits: 2500, purchasePrice: 12.5, currentPrice: 13.2, purchaseDate: 'Nov 15, 2024', status: 'Active', gain: 5.6 },
        { project: 'Kerala Seagrass Protection', credits: 1800, purchasePrice: 15.8, currentPrice: 16.5, purchaseDate: 'Oct 22, 2024', status: 'Active', gain: 4.4 },
        { project: 'Andhra Coastal Saltmarsh', credits: 3120, purchasePrice: 10.2, currentPrice: 10.8, purchaseDate: 'Sep 10, 2024', status: 'Active', gain: 5.9 },
        { project: 'Tamil Nadu Coral Reef', credits: 1000, purchasePrice: 18.0, currentPrice: 17.5, purchaseDate: 'Aug 5, 2024', status: 'Retired', gain: -2.8 },
    ];

    const retirements = [
        { project: 'Tamil Nadu Coral Reef', credits: 1000, retiredDate: 'Dec 1, 2024', reason: 'Q4 2024 Carbon Offset', certificate: 'CERT-2024-Q4-001' },
        { project: 'Sundarbans Mangrove', credits: 500, retiredDate: 'Sep 15, 2024', reason: 'Q3 2024 Carbon Offset', certificate: 'CERT-2024-Q3-001' },
    ];

    const totalValue = holdings.reduce((sum, h) => sum + (h.credits * h.currentPrice), 0);
    const totalCredits = holdings.reduce((sum, h) => sum + h.credits, 0);
    const totalRetired = retirements.reduce((sum, r) => sum + r.credits, 0);
    const avgGain = holdings.reduce((sum, h) => sum + h.gain, 0) / holdings.length;

    return (
        <div>
            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
                    Carbon Credit <span className="text-blue-600">Portfolio</span>
                </h1>
                <p className="text-slate-500 font-medium text-lg">
                    Manage your carbon credit holdings and track performance
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <CorporateBuyerCard className="hover:scale-105 transition-transform">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            <PieChart className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xs font-bold px-2 py-1 rounded bg-blue-50 text-blue-600">
                            {holdings.filter(h => h.status === 'Active').length} Active
                        </span>
                    </div>
                    <div className="text-3xl font-black text-slate-800 mb-1">{totalCredits.toLocaleString()} CCT</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Holdings</div>
                </CorporateBuyerCard>

                <CorporateBuyerCard className="hover:scale-105 transition-transform">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xs font-bold px-2 py-1 rounded bg-emerald-50 text-emerald-600">
                            +{avgGain.toFixed(1)}%
                        </span>
                    </div>
                    <div className="text-3xl font-black text-blue-600 mb-1">${totalValue.toLocaleString()}</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Portfolio Value</div>
                </CorporateBuyerCard>

                <CorporateBuyerCard className="hover:scale-105 transition-transform">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xs font-bold px-2 py-1 rounded bg-amber-50 text-amber-600">
                            {retirements.length} Retired
                        </span>
                    </div>
                    <div className="text-3xl font-black text-emerald-600 mb-1">{totalRetired.toLocaleString()} CCT</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Retired</div>
                </CorporateBuyerCard>

                <CorporateBuyerCard className="hover:scale-105 transition-transform">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xs font-bold px-2 py-1 rounded bg-indigo-50 text-indigo-600">
                            ROI
                        </span>
                    </div>
                    <div className="text-3xl font-black text-indigo-600 mb-1">+{avgGain.toFixed(1)}%</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg. Performance</div>
                </CorporateBuyerCard>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setSelectedTab('holdings')}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${selectedTab === 'holdings'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    Holdings
                </button>
                <button
                    onClick={() => setSelectedTab('retired')}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${selectedTab === 'retired'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    Retired Credits
                </button>
                <button
                    onClick={() => setSelectedTab('analytics')}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${selectedTab === 'analytics'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    Analytics
                </button>
            </div>

            {/* Holdings Table */}
            {selectedTab === 'holdings' && (
                <CorporateBuyerCard>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Project</th>
                                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Credits</th>
                                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Purchase Price</th>
                                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Current Price</th>
                                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Value</th>
                                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Gain/Loss</th>
                                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {holdings.map((holding, i) => (
                                    <tr key={i} className="border-b border-slate-100 hover:bg-blue-50 transition-colors">
                                        <td className="py-4 px-4 font-semibold text-slate-800">{holding.project}</td>
                                        <td className="py-4 px-4 font-bold text-blue-600">{holding.credits.toLocaleString()} CCT</td>
                                        <td className="py-4 px-4 text-slate-600">${holding.purchasePrice}</td>
                                        <td className="py-4 px-4 font-bold text-slate-800">${holding.currentPrice}</td>
                                        <td className="py-4 px-4 font-bold text-blue-600">${(holding.credits * holding.currentPrice).toLocaleString()}</td>
                                        <td className="py-4 px-4">
                                            <span className={`font-bold ${holding.gain >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                                {holding.gain >= 0 ? '+' : ''}{holding.gain.toFixed(1)}%
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${holding.status === 'Active'
                                                ? 'bg-emerald-50 text-emerald-600'
                                                : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                {holding.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex gap-2">
                                                <button className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all">
                                                    <Download className="w-4 h-4 text-blue-600" />
                                                </button>
                                                <button className="p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all">
                                                    <ExternalLink className="w-4 h-4 text-slate-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CorporateBuyerCard>
            )}

            {/* Retired Credits */}
            {selectedTab === 'retired' && (
                <CorporateBuyerCard>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Project</th>
                                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Credits Retired</th>
                                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Retired Date</th>
                                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Reason</th>
                                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Certificate</th>
                                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {retirements.map((retirement, i) => (
                                    <tr key={i} className="border-b border-slate-100 hover:bg-emerald-50 transition-colors">
                                        <td className="py-4 px-4 font-semibold text-slate-800">{retirement.project}</td>
                                        <td className="py-4 px-4 font-bold text-emerald-600">{retirement.credits.toLocaleString()} CCT</td>
                                        <td className="py-4 px-4 text-slate-600">{retirement.retiredDate}</td>
                                        <td className="py-4 px-4 text-slate-700">{retirement.reason}</td>
                                        <td className="py-4 px-4">
                                            <span className="font-mono text-xs text-blue-600">{retirement.certificate}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg font-bold hover:bg-emerald-100 transition-all">
                                                <Download className="w-4 h-4" />
                                                Certificate
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CorporateBuyerCard>
            )}

            {/* Analytics */}
            {selectedTab === 'analytics' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <CorporateBuyerCard>
                        <h3 className="text-xl font-black text-slate-800 mb-6">Portfolio Value Over Time</h3>
                        <div className="h-64 bg-gradient-to-t from-blue-50 to-transparent rounded-2xl flex items-end justify-center p-6 relative">
                            <svg width="100%" height="200" viewBox="0 0 1000 200" preserveAspectRatio="none">
                                <path d="M0,180 Q100,160 200,150 T400,130 T600,110 T800,100 T1000,80 L1000,200 L0,200 Z" fill="rgba(59, 130, 246, 0.1)" />
                                <path d="M0,180 Q100,160 200,150 T400,130 T600,110 T800,100 T1000,80" fill="none" stroke="#3b82f6" strokeWidth="4" />
                            </svg>
                        </div>
                    </CorporateBuyerCard>

                    <CorporateBuyerCard>
                        <h3 className="text-xl font-black text-slate-800 mb-6">Holdings Distribution</h3>
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-40 h-40 rounded-full border-[20px] border-slate-100 border-t-blue-500 border-r-emerald-500 border-b-amber-500 flex items-center justify-center">
                                <PieChart className="w-10 h-10 text-slate-300" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            {holdings.map((h, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-emerald-500' : i === 2 ? 'bg-amber-500' : 'bg-slate-300'}`} />
                                        <span className="text-sm font-semibold text-slate-700">{h.project.split(' ')[0]}</span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-800">{((h.credits / totalCredits) * 100).toFixed(1)}%</span>
                                </div>
                            ))}
                        </div>
                    </CorporateBuyerCard>
                </div>
            )}
        </div>
    );
};

export default CorporateBuyerPortfolio;
