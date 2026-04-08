import React, { useState } from 'react';
import PanchayatLayout from './shared/PanchayatLayout';
import PanchayatCard from './shared/PanchayatCard';
import {
    Users,
    MapPin,
    TrendingUp,
    Phone,
    Mail,
    Building2,
    CheckCircle2,
    AlertCircle,
    Search
} from 'lucide-react';

const PanchayatCommunities = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const communities = [
        {
            id: 1,
            name: 'Sundarbans Group A',
            location: 'Sundarbans, West Bengal',
            members: 45,
            landParcels: 8,
            projects: 12,
            status: 'active',
            contact: { email: 'sundarbans@example.com', phone: '+91 98765 43210' },
            performance: 92
        },
        {
            id: 2,
            name: 'Coastal Defenders',
            location: 'Odisha Coast',
            members: 32,
            landParcels: 5,
            projects: 8,
            status: 'active',
            contact: { email: 'coastal@example.com', phone: '+91 98765 43211' },
            performance: 88
        },
        {
            id: 3,
            name: 'Mangrove Protectors',
            location: 'Kerala Backwaters',
            members: 28,
            landParcels: 6,
            projects: 10,
            status: 'pending',
            contact: { email: 'mangrove@example.com', phone: '+91 98765 43212' },
            performance: 75
        },
    ];

    const filteredCommunities = communities.filter(c =>
        (filterStatus === 'all' || c.status === filterStatus) &&
        (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <PanchayatLayout>
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
                    Community <span className="text-purple-600">Oversight</span>
                </h1>
                <p className="text-slate-500 font-medium text-lg">
                    Manage and monitor all communities in your jurisdiction
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search communities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    {['all', 'active', 'pending', 'suspended'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${filterStatus === status
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:border-purple-200'
                                }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Communities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCommunities.map((community) => (
                    <PanchayatCard key={community.id} className="hover:scale-105 transition-transform cursor-pointer">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-purple-200">
                                    {community.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-800">{community.name}</h3>
                                    <p className="text-xs text-slate-500 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {community.location}
                                    </p>
                                </div>
                            </div>
                            <span className={`px-2 py-1 text-[10px] font-black uppercase rounded-lg ${community.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                    community.status === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                        'bg-red-50 text-red-700 border border-red-100'
                                }`}>
                                {community.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-3 gap-3 py-4 border-t border-b border-slate-100 mb-4">
                            <div className="text-center">
                                <p className="text-2xl font-black text-slate-800">{community.members}</p>
                                <p className="text-[10px] text-slate-400 uppercase font-bold">Members</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-black text-purple-600">{community.landParcels}</p>
                                <p className="text-[10px] text-slate-400 uppercase font-bold">Land Parcels</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-black text-violet-600">{community.projects}</p>
                                <p className="text-[10px] text-slate-400 uppercase font-bold">Projects</p>
                            </div>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                <Mail className="w-3 h-3 text-slate-400" />
                                {community.contact.email}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                <Phone className="w-3 h-3 text-slate-400" />
                                {community.contact.phone}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-500">Performance</span>
                            <div className="flex items-center gap-2">
                                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-purple-500 to-violet-600 rounded-full"
                                        style={{ width: `${community.performance}%` }}
                                    />
                                </div>
                                <span className="text-xs font-black text-purple-600">{community.performance}%</span>
                            </div>
                        </div>
                    </PanchayatCard>
                ))}
            </div>

            {filteredCommunities.length === 0 && (
                <PanchayatCard className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 mb-2">No Communities Found</h3>
                    <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
                </PanchayatCard>
            )}
        </PanchayatLayout>
    );
};

export default PanchayatCommunities;
