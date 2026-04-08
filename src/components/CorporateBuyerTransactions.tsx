import React, { useState } from 'react';
import CorporateBuyerCard from './shared/CorporateBuyerCard';
import {
    History,
    ExternalLink,
    CheckCircle2,
    Clock,
    XCircle,
    Download,
    Filter,
    Search
} from 'lucide-react';
import { WalletUtils } from '../utils/walletUtils';

const CorporateBuyerTransactions = () => {
    const [filterType, setFilterType] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const transactions = [
        {
            id: 'TXN-2024-001',
            type: 'Purchase',
            project: 'Sundarbans Mangrove Restoration',
            quantity: '500 CCT',
            amount: '$6,250',
            date: '2 days ago',
            status: 'Confirmed',
            txHash: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
        },
        {
            id: 'TXN-2024-002',
            type: 'Purchase',
            project: 'Kerala Seagrass Protection',
            quantity: '300 CCT',
            amount: '$4,740',
            date: '1 week ago',
            status: 'Confirmed',
            txHash: '0x8ba1f109551bD432803012645Ac136ddd64DBA72'
        },
        {
            id: 'TXN-2024-003',
            type: 'Retirement',
            project: 'Andhra Coastal Saltmarsh',
            quantity: '200 CCT',
            amount: '$2,040',
            date: '2 weeks ago',
            status: 'Confirmed',
            txHash: '0x4e83362442B8d1beC281594cEa3050c8EB01311C'
        },
        {
            id: 'TXN-2024-004',
            type: 'Purchase',
            project: 'Tamil Nadu Coral Reef',
            quantity: '1000 CCT',
            amount: '$18,000',
            date: '3 weeks ago',
            status: 'Confirmed',
            txHash: '0x267be1C1D684F78cb4F6a176C4911b741E4Ffdc0'
        },
        {
            id: 'TXN-2024-005',
            type: 'Transfer',
            project: 'Sundarbans Mangrove',
            quantity: '100 CCT',
            amount: '$1,250',
            date: '1 month ago',
            status: 'Pending',
            txHash: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d'
        },
    ];

    const filteredTransactions = transactions.filter(tx => {
        const matchesType = filterType === 'All' || tx.type === filterType;
        const matchesSearch = tx.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tx.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Confirmed':
                return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
            case 'Pending':
                return <Clock className="w-4 h-4 text-amber-600" />;
            case 'Failed':
                return <XCircle className="w-4 h-4 text-red-600" />;
            default:
                return null;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Purchase':
                return 'bg-blue-50 text-blue-600';
            case 'Retirement':
                return 'bg-emerald-50 text-emerald-600';
            case 'Transfer':
                return 'bg-purple-50 text-purple-600';
            default:
                return 'bg-slate-50 text-slate-600';
        }
    };

    return (
        <div>
            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
                    Transaction <span className="text-blue-600">History</span>
                </h1>
                <p className="text-slate-500 font-medium text-lg">
                    View all carbon credit transactions with blockchain verification
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <CorporateBuyerCard className="hover:scale-105 transition-transform">
                    <div className="text-sm text-slate-500 mb-2">Total Transactions</div>
                    <div className="text-3xl font-black text-slate-800">{transactions.length}</div>
                </CorporateBuyerCard>
                <CorporateBuyerCard className="hover:scale-105 transition-transform">
                    <div className="text-sm text-slate-500 mb-2">Total Purchased</div>
                    <div className="text-3xl font-black text-blue-600">2,000 CCT</div>
                </CorporateBuyerCard>
                <CorporateBuyerCard className="hover:scale-105 transition-transform">
                    <div className="text-sm text-slate-500 mb-2">Total Spent</div>
                    <div className="text-3xl font-black text-emerald-600">$32,280</div>
                </CorporateBuyerCard>
                <CorporateBuyerCard className="hover:scale-105 transition-transform">
                    <div className="text-sm text-slate-500 mb-2">Pending</div>
                    <div className="text-3xl font-black text-amber-600">1</div>
                </CorporateBuyerCard>
            </div>

            {/* Filters */}
            <CorporateBuyerCard className="mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by project, transaction ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['All', 'Purchase', 'Retirement', 'Transfer'].map(type => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-4 py-3 rounded-xl font-bold text-sm transition-all ${filterType === type
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                    <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center gap-2">
                        <Download className="w-5 h-5" />
                        Export CSV
                    </button>
                </div>
            </CorporateBuyerCard>

            {/* Transactions Table */}
            <CorporateBuyerCard>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200">
                                <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Transaction ID</th>
                                <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Type</th>
                                <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Project</th>
                                <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Quantity</th>
                                <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Amount</th>
                                <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                                <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                                <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase">Blockchain</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((tx, i) => (
                                <tr key={i} className="border-b border-slate-100 hover:bg-blue-50 transition-colors">
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-sm text-blue-600 font-bold">{tx.id}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getTypeColor(tx.type)}`}>
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 font-semibold text-slate-700">{tx.project}</td>
                                    <td className="py-4 px-4 font-bold text-slate-800">{tx.quantity}</td>
                                    <td className="py-4 px-4 font-bold text-blue-600">{tx.amount}</td>
                                    <td className="py-4 px-4 text-sm text-slate-500">{tx.date}</td>
                                    <td className="py-4 px-4">
                                        <div className={`flex items-center gap-2 ${tx.status === 'Confirmed' ? 'text-emerald-600' : tx.status === 'Pending' ? 'text-amber-600' : 'text-red-600'}`}>
                                            {getStatusIcon(tx.status)}
                                            <span className="text-sm font-bold">{tx.status}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group">
                                            <span className="font-mono text-xs">{WalletUtils.formatAddress(tx.txHash)}</span>
                                            <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredTransactions.length === 0 && (
                    <div className="text-center py-12">
                        <History className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-700 mb-2">No transactions found</h3>
                        <p className="text-slate-500">Try adjusting your search or filters</p>
                    </div>
                )}
            </CorporateBuyerCard>

            {/* Blockchain Info */}
            <CorporateBuyerCard className="mt-8 bg-gradient-to-br from-slate-50 to-blue-50 border-blue-200">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center flex-shrink-0">
                        <ExternalLink className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Blockchain Verification</h3>
                        <p className="text-sm text-slate-600 mb-4">
                            All transactions are recorded on the Ethereum blockchain for transparency and immutability. Click on any transaction hash to view it on Etherscan.
                        </p>
                        <div className="flex gap-4 text-xs">
                            <div>
                                <span className="text-slate-500">Network:</span>
                                <span className="font-bold text-slate-800 ml-2">Ethereum Sepolia</span>
                            </div>
                            <div>
                                <span className="text-slate-500">Contract:</span>
                                <span className="font-mono font-bold text-blue-600 ml-2">0x742d...0bEb</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CorporateBuyerCard>
        </div>
    );
};

export default CorporateBuyerTransactions;
