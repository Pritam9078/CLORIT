import React, { useState } from 'react';
import PanchayatLayout from './shared/PanchayatLayout';
import PanchayatCard from './shared/PanchayatCard';
import {
    FileText,
    Download,
    Calendar,
    BarChart3,
    TrendingUp,
    Users,
    MapPin,
    CheckCircle2
} from 'lucide-react';

const PanchayatReports = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('monthly');

    const reportTypes = [
        {
            id: 1,
            title: 'Land Verification Summary',
            description: 'Comprehensive report of all land verifications',
            icon: MapPin,
            color: 'from-purple-500 to-violet-600',
            lastGenerated: '2024-01-20'
        },
        {
            id: 2,
            title: 'Community Performance',
            description: 'Performance metrics for all communities',
            icon: Users,
            color: 'from-emerald-500 to-teal-600',
            lastGenerated: '2024-01-18'
        },
        {
            id: 3,
            title: 'Project Approvals',
            description: 'Summary of approved and pending projects',
            icon: CheckCircle2,
            color: 'from-blue-500 to-indigo-600',
            lastGenerated: '2024-01-15'
        },
        {
            id: 4,
            title: 'Carbon Credit Allocation',
            description: 'Carbon credits issued and pending',
            icon: TrendingUp,
            color: 'from-amber-500 to-orange-600',
            lastGenerated: '2024-01-12'
        },
    ];

    const recentReports = [
        { name: 'January 2024 - Land Verification Report', date: '2024-01-20', size: '2.4 MB' },
        { name: 'December 2023 - Community Performance', date: '2023-12-28', size: '1.8 MB' },
        { name: 'Q4 2023 - Quarterly Summary', date: '2023-12-31', size: '3.2 MB' },
    ];

    return (
        <PanchayatLayout>
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
                    Reports & <span className="text-purple-600">Analytics</span>
                </h1>
                <p className="text-slate-500 font-medium text-lg">
                    Generate and download comprehensive reports
                </p>
            </div>

            {/* Period Selector */}
            <div className="flex gap-2 mb-8">
                {['weekly', 'monthly', 'quarterly', 'yearly'].map((period) => (
                    <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedPeriod === period
                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                                : 'bg-white text-slate-600 border border-slate-200 hover:border-purple-200'
                            }`}
                    >
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                    </button>
                ))}
            </div>

            {/* Report Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {reportTypes.map((report) => {
                    const Icon = report.icon;
                    return (
                        <PanchayatCard key={report.id} className="hover:scale-105 transition-transform cursor-pointer group">
                            <div className="flex items-start gap-4">
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${report.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                                    <Icon className="w-7 h-7 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-black text-slate-800 text-lg mb-1">{report.title}</h3>
                                    <p className="text-sm text-slate-500 mb-3">{report.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            Last: {new Date(report.lastGenerated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </span>
                                        <button className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition-colors opacity-0 group-hover:opacity-100 flex items-center gap-2">
                                            <Download className="w-3 h-3" /> Generate
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </PanchayatCard>
                    );
                })}
            </div>

            {/* Recent Reports */}
            <div>
                <h2 className="text-2xl font-black text-slate-800 mb-6">Recent Reports</h2>
                <div className="space-y-3">
                    {recentReports.map((report, index) => (
                        <PanchayatCard key={index} className="hover:border-purple-300 transition-all cursor-pointer group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800">{report.name}</p>
                                        <p className="text-xs text-slate-400">PDF • {report.size}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs text-slate-400">{new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    <button className="w-10 h-10 rounded-lg bg-slate-50 hover:bg-purple-50 flex items-center justify-center text-slate-500 hover:text-purple-600 transition-colors">
                                        <Download className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </PanchayatCard>
                    ))}
                </div>
            </div>
        </PanchayatLayout>
    );
};

export default PanchayatReports;
