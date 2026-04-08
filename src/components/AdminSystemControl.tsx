import React, { useState, useEffect } from 'react';
import AdminLayout from './shared/AdminLayout';
import AdminCard from './shared/AdminCard';
import {
    Activity,
    Zap,
    Database,
    Wifi,
    AlertTriangle,
    CheckCircle2,
    Clock,
    TrendingUp,
    Users,
    FileText,
    Coins,
    Shield,
    Wallet,
    Download,
    RefreshCw,
    Server,
    Globe,
    HardDrive
} from 'lucide-react';
import { WalletUtils, WalletState } from '../utils/walletUtils';
import { AuthUtils } from '../utils/auth';

interface SystemMetric {
    name: string;
    status: 'healthy' | 'warning' | 'error';
    value: string;
    lastChecked: string;
}

interface AuditLogEntry {
    id: number;
    action: string;
    admin: string;
    timestamp: string;
    status: 'success' | 'failed';
    details: string;
}

const AdminSystemControl = () => {
    const [walletState, setWalletState] = useState<WalletState | null>(null);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const wallet = WalletUtils.getWalletState();
        setWalletState(wallet);
        const user = AuthUtils.getCurrentUser();
        setCurrentUser(user);
    }, []);

    const systemMetrics: SystemMetric[] = [
        { name: 'API Server', status: 'healthy', value: '99.9% uptime', lastChecked: '2 min ago' },
        { name: 'Database', status: 'healthy', value: 'Connected', lastChecked: '1 min ago' },
        { name: 'Blockchain RPC', status: 'healthy', value: 'Sepolia Active', lastChecked: '30 sec ago' },
        { name: 'IPFS Gateway', status: 'healthy', value: 'Operational', lastChecked: '1 min ago' },
        { name: 'Avg Response Time', status: 'healthy', value: '142ms', lastChecked: 'Real-time' },
        { name: 'Failed Transactions', status: 'warning', value: '3 in last 24h', lastChecked: '5 min ago' },
    ];

    const auditLogs: AuditLogEntry[] = [
        {
            id: 1,
            action: 'Project Approved',
            admin: walletState?.address || '0x0000...0000',
            timestamp: '2 minutes ago',
            status: 'success',
            details: 'ADMIN-2024 - Mangrove Restoration'
        },
        {
            id: 2,
            action: 'Carbon Credits Minted',
            admin: walletState?.address || '0x0000...0000',
            timestamp: '15 minutes ago',
            status: 'success',
            details: '1,250 credits for Project ADMIN-2023'
        },
        {
            id: 3,
            action: 'Project Rejected',
            admin: walletState?.address || '0x0000...0000',
            timestamp: '1 hour ago',
            status: 'success',
            details: 'ADMIN-2025 - Insufficient documentation'
        },
        {
            id: 4,
            action: 'System Configuration Updated',
            admin: walletState?.address || '0x0000...0000',
            timestamp: '3 hours ago',
            status: 'success',
            details: 'Carbon calculation parameters adjusted'
        },
        {
            id: 5,
            action: 'Blockchain Transaction',
            admin: walletState?.address || '0x0000...0000',
            timestamp: '5 hours ago',
            status: 'failed',
            details: 'Gas estimation failed - retried successfully'
        },
    ];

    const platformStats = [
        { label: 'Total Projects', value: '156', change: '+12', trend: 'up', icon: FileText },
        { label: 'Carbon Credits Issued', value: '45,230', change: '+1,250', trend: 'up', icon: Coins },
        { label: 'Active Communities', value: '89', change: '+5', trend: 'up', icon: Users },
        { label: 'Pending Approvals', value: '7', change: '-3', trend: 'down', icon: Clock },
    ];

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'healthy': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
            case 'warning': return 'text-amber-600 bg-amber-50 border-amber-200';
            case 'error': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-slate-600 bg-slate-50 border-slate-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'healthy': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
            case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
            case 'error': return <AlertTriangle className="w-5 h-5 text-red-500" />;
            default: return <Activity className="w-5 h-5 text-slate-500" />;
        }
    };

    return (
        <AdminLayout>
            {/* Header */}
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
                        System <span className="text-orange-600">Control Center</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-lg">
                        Real-time monitoring, analytics, and system administration
                    </p>
                </div>
                <button
                    onClick={handleRefresh}
                    className={`flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 ${refreshing ? 'animate-pulse' : ''}`}
                >
                    <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            {/* Admin Wallet Info */}
            <AdminCard className="mb-8 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-200">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-slate-800 mb-1">Admin Wallet</h3>
                            {walletState?.isConnected ? (
                                <>
                                    <p className="text-sm font-mono text-slate-600 mb-1">{walletState.address}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-orange-600 bg-white px-2 py-1 rounded border border-orange-200">
                                            {parseFloat(walletState.balance).toFixed(4)} ETH
                                        </span>
                                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                                            Connected
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <p className="text-sm text-red-600 font-bold">Not Connected</p>
                            )}
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-slate-400 font-bold uppercase mb-1">Admin Role</p>
                        <p className="text-lg font-black text-orange-600">Super Admin</p>
                        <p className="text-xs text-slate-500 mt-1">Full System Access</p>
                    </div>
                </div>
            </AdminCard>

            {/* Platform Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {platformStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <AdminCard key={index} className="hover:scale-105 transition-transform">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${index % 2 === 0 ? 'from-orange-500 to-amber-600' : 'from-amber-500 to-orange-600'} flex items-center justify-center shadow-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-3xl font-black text-slate-800 mb-1">{stat.value}</p>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                        </AdminCard>
                    );
                })}
            </div>

            {/* System Health Monitoring */}
            <AdminCard className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                        <Activity className="w-6 h-6 text-orange-600" />
                        System Health
                    </h2>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                        All Systems Operational
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {systemMetrics.map((metric, index) => (
                        <div key={index} className={`p-4 rounded-xl border-2 ${getStatusColor(metric.status)} transition-all hover:scale-105`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-sm">{metric.name}</span>
                                {getStatusIcon(metric.status)}
                            </div>
                            <p className="text-lg font-black mb-1">{metric.value}</p>
                            <p className="text-xs opacity-75">Updated {metric.lastChecked}</p>
                        </div>
                    ))}
                </div>
            </AdminCard>

            {/* Audit Logs */}
            <AdminCard>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                        <FileText className="w-6 h-6 text-orange-600" />
                        Recent Admin Activity
                    </h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all">
                        <Download className="w-4 h-4" />
                        Export Logs
                    </button>
                </div>
                <div className="space-y-3">
                    {auditLogs.map((log) => (
                        <div key={log.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-orange-50 transition-all border border-slate-100 hover:border-orange-200">
                            <div className="flex items-center gap-4 flex-1">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${log.status === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                    {log.status === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-slate-800 mb-1">{log.action}</p>
                                    <p className="text-xs text-slate-500">{log.details}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-mono text-slate-400 mb-1">{WalletUtils.formatAddress(log.admin)}</p>
                                <p className="text-xs text-slate-500">{log.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </AdminCard>
        </AdminLayout>
    );
};

export default AdminSystemControl;
