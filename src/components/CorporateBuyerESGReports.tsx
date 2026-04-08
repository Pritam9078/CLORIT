import React, { useState } from 'react';
import CorporateBuyerLayout from './shared/CorporateBuyerLayout';
import CorporateBuyerCard from './shared/CorporateBuyerCard';
import {
    FileText,
    Download,
    Calendar,
    TrendingUp,
    Globe,
    Leaf,
    Users,
    Award
} from 'lucide-react';

const CorporateBuyerESGReports = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('monthly');

    const reportTemplates = [
        { name: 'Monthly Impact Summary', description: 'Carbon offset achieved, projects supported, SDG alignment', icon: Calendar, color: 'from-blue-500 to-indigo-600', lastGenerated: 'Dec 2024' },
        { name: 'Annual ESG Report', description: 'Full year sustainability metrics, compliance tracking', icon: TrendingUp, color: 'from-emerald-500 to-green-600', lastGenerated: 'Dec 2024' },
        { name: 'Compliance Report (GRI)', description: 'GRI Standards compliance documentation', icon: Award, color: 'from-amber-500 to-orange-600', lastGenerated: 'Nov 2024' },
        { name: 'TCFD Framework Report', description: 'Task Force on Climate-related Financial Disclosures', icon: FileText, color: 'from-purple-500 to-pink-600', lastGenerated: 'Oct 2024' },
        { name: 'CDP Disclosure', description: 'Carbon Disclosure Project submission', icon: Globe, color: 'from-cyan-500 to-blue-600', lastGenerated: 'Sep 2024' },
        { name: 'Custom Report', description: 'Build your own report with selected metrics', icon: Users, color: 'from-indigo-500 to-purple-600', lastGenerated: 'On demand' },
    ];

    const impactMetrics = [
        { label: 'Total Carbon Offset', value: '4,210 tCO2e', change: '+15.3%', icon: Leaf },
        { label: 'Projects Supported', value: '12', change: '+2', icon: Globe },
        { label: 'SDGs Aligned', value: '8', change: '0', icon: Award },
        { label: 'Compliance Score', value: '98%', change: '+3%', icon: TrendingUp },
    ];

    return (
        <CorporateBuyerLayout>
            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
                    ESG <span className="text-blue-600">Reports</span>
                </h1>
                <p className="text-slate-500 font-medium text-lg">
                    Generate and download sustainability reports for compliance
                </p>
            </div>

            {/* Impact Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {impactMetrics.map((metric, i) => {
                    const Icon = metric.icon;
                    return (
                        <CorporateBuyerCard key={i} className="hover:scale-105 transition-transform">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded ${metric.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'}`}>
                                    {metric.change}
                                </span>
                            </div>
                            <div className="text-3xl font-black text-slate-800 mb-1">{metric.value}</div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{metric.label}</div>
                        </CorporateBuyerCard>
                    );
                })}
            </div>

            {/* Report Templates */}
            <div className="mb-8">
                <h2 className="text-2xl font-black text-slate-800 mb-6">Report Templates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reportTemplates.map((template, i) => {
                        const Icon = template.icon;
                        return (
                            <CorporateBuyerCard key={i} className="hover:scale-105 transition-transform cursor-pointer group">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center shadow-lg`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <button className="p-2.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all group-hover:scale-110">
                                        <Download className="w-5 h-5 text-blue-600" />
                                    </button>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-2">{template.name}</h3>
                                <p className="text-sm text-slate-600 mb-4">{template.description}</p>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-500">Last generated:</span>
                                    <span className="font-bold text-slate-700">{template.lastGenerated}</span>
                                </div>
                            </CorporateBuyerCard>
                        );
                    })}
                </div>
            </div>

            {/* Generate New Report */}
            <CorporateBuyerCard className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg flex-shrink-0">
                        <FileText className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-2xl font-black text-slate-800 mb-2">Generate New Report</h3>
                        <p className="text-slate-600 mb-6">
                            Create a custom ESG report with your selected metrics, date range, and format preferences.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div>
                                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                                    Report Type
                                </label>
                                <select className="w-full px-4 py-3 border border-blue-200 rounded-xl font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                                    <option>Monthly Impact</option>
                                    <option>Annual ESG</option>
                                    <option>Compliance (GRI)</option>
                                    <option>TCFD Framework</option>
                                    <option>CDP Disclosure</option>
                                    <option>Custom</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                                    Date Range
                                </label>
                                <select className="w-full px-4 py-3 border border-blue-200 rounded-xl font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                                    <option>Last Month</option>
                                    <option>Last Quarter</option>
                                    <option>Last Year</option>
                                    <option>Custom Range</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                                    Format
                                </label>
                                <select className="w-full px-4 py-3 border border-blue-200 rounded-xl font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                                    <option>PDF</option>
                                    <option>Excel</option>
                                    <option>Both</option>
                                </select>
                            </div>
                        </div>

                        <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Generate Report
                        </button>
                    </div>
                </div>
            </CorporateBuyerCard>

            {/* Recent Reports */}
            <div className="mt-8">
                <h2 className="text-2xl font-black text-slate-800 mb-6">Recent Reports</h2>
                <CorporateBuyerCard>
                    <div className="space-y-4">
                        {[
                            { name: 'December 2024 Impact Summary', date: 'Jan 2, 2025', size: '2.4 MB', format: 'PDF' },
                            { name: 'Q4 2024 ESG Report', date: 'Dec 31, 2024', size: '5.1 MB', format: 'PDF' },
                            { name: 'November 2024 Compliance Report', date: 'Dec 1, 2024', size: '3.2 MB', format: 'Excel' },
                        ].map((report, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">{report.name}</h4>
                                        <p className="text-xs text-slate-500">Generated on {report.date} • {report.size} • {report.format}</p>
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg font-bold text-sm hover:bg-blue-50 hover:border-blue-200 transition-all flex items-center gap-2 group-hover:scale-105">
                                    <Download className="w-4 h-4" />
                                    Download
                                </button>
                            </div>
                        ))}
                    </div>
                </CorporateBuyerCard>
            </div>
        </CorporateBuyerLayout>
    );
};

export default CorporateBuyerESGReports;
