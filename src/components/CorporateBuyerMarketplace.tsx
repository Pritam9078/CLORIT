import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CorporateBuyerCard from './shared/CorporateBuyerCard';
import {
    ShoppingCart,
    Search,
    Filter,
    Globe,
    ShieldCheck,
    Heart,
    ArrowUpRight,
    ExternalLink,
    Leaf
} from 'lucide-react';

// Mock Data for Marketplace
const MARKETPLACE_PROJECTS = [
    {
        id: 'PRJ-2001',
        name: 'Sundarbans Mangrove Restoration',
        type: 'Blue Carbon',
        location: 'West Bengal',
        price: 12.5,
        available: 15400,
        impact: '850 tCO2e/yr',
        health: 92,
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'PRJ-2002',
        name: 'Kerala Seagrass Protection',
        type: 'Seagrass',
        location: 'Kerala',
        price: 15.8,
        available: 8200,
        impact: '420 tCO2e/yr',
        health: 88,
        image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'PRJ-2003',
        name: 'Andhra Coastal Saltmarsh',
        type: 'Saltmarsh',
        location: 'Andhra Pradesh',
        price: 10.2,
        available: 25000,
        impact: '310 tCO2e/yr',
        health: 79,
        image: 'https://images.unsplash.com/photo-1505142446710-c3d39c4fdc58?auto=format&fit=crop&w=400&q=80'
    }
];

const CorporateBuyerMarketplace = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [selectedStandard, setSelectedStandard] = useState('All');
    const [watchlist, setWatchlist] = useState<string[]>([]);

    const toggleWatchlist = (projectId: string) => {
        setWatchlist(prev =>
            prev.includes(projectId)
                ? prev.filter(id => id !== projectId)
                : [...prev, projectId]
        );
    };

    const handlePurchase = (projectName: string) => {
        alert(`Successfully purchased credits from ${projectName}!\n\nTransaction ID: CCT-${Math.random().toString(36).substr(2, 9).toUpperCase()}\nStatus: Success on-chain`);
    };

    const filteredProjects = MARKETPLACE_PROJECTS.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === 'All' || p.type === selectedType;
        return matchesSearch && matchesType;
    });

    return (
        <div>
            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
                    Carbon Credit <span className="text-blue-600">Marketplace</span>
                </h1>
                <p className="text-slate-500 font-medium text-lg">
                    Browse and purchase verified blue carbon credits
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <CorporateBuyerCard>
                        <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                            <Filter className="w-5 h-5 text-blue-600" />
                            Filters
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                                    Project Category
                                </label>
                                {['All', 'Blue Carbon', 'Seagrass', 'Saltmarsh', 'Coral Reef'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedType(type)}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all mb-2 ${selectedType === type
                                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                            : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                                            }`}
                                    >
                                        <div className={`w-2 h-2 rounded-full ${selectedType === type ? 'bg-blue-600' : 'bg-slate-300'}`} />
                                        {type}
                                    </button>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-slate-200">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                                    Certification Standard
                                </label>
                                {['All', 'Admin Verified', 'Verra (VCS)', 'Gold Standard'].map(std => (
                                    <button
                                        key={std}
                                        onClick={() => setSelectedStandard(std)}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all mb-2 ${selectedStandard === std
                                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                            : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                                            }`}
                                    >
                                        <ShieldCheck className={`w-4 h-4 ${selectedStandard === std ? 'text-blue-600' : 'text-slate-400'}`} />
                                        {std}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </CorporateBuyerCard>

                    {/* Market Tip */}
                    <CorporateBuyerCard className="bg-blue-50 border-blue-200">
                        <div className="flex items-center gap-2 text-blue-700 font-bold text-sm mb-2">
                            <ExternalLink className="w-4 h-4" />
                            Buying Tip
                        </div>
                        <p className="text-xs text-blue-600 leading-relaxed">
                            Projects with "Blue Carbon" designation currently offer 2.5x higher co-benefits for marine biodiversity.
                        </p>
                    </CorporateBuyerCard>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Search Bar */}
                    <CorporateBuyerCard>
                        <div className="flex items-center gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search by location, project ID..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <select className="px-4 py-3 border border-slate-200 rounded-xl font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Sort by: Newest</option>
                                <option>Price: Low to High</option>
                                <option>Impact: High to Low</option>
                            </select>
                        </div>
                    </CorporateBuyerCard>

                    {/* Featured Project */}
                    <CorporateBuyerCard className="bg-gradient-to-br from-slate-800 to-slate-900 text-white overflow-hidden relative">
                        <div className="relative z-10">
                            <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4">
                                Project of the Quarter
                            </span>
                            <h2 className="text-3xl font-black mb-3">Andaman Deep Sea Seagrass Reserve</h2>
                            <p className="text-slate-300 text-lg mb-6">
                                The largest seagrass restoration initiative in the Indian Ocean. High-integrity credits verified on-chain via Admin Protocol.
                            </p>
                            <div className="flex gap-8 mb-6">
                                <div>
                                    <div className="text-xs text-slate-400 uppercase mb-1">Credits Available</div>
                                    <div className="text-2xl font-bold">45,200 CCT</div>
                                </div>
                                <div className="border-l border-slate-700 pl-8">
                                    <div className="text-xs text-slate-400 uppercase mb-1">Unit Price</div>
                                    <div className="text-2xl font-bold">$18.50</div>
                                </div>
                            </div>
                            <button
                                onClick={() => handlePurchase('Andaman Deep Sea Seagrass Reserve')}
                                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
                            >
                                Invest in Project
                            </button>
                        </div>
                        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20">
                            <Globe className="w-full h-full" />
                        </div>
                    </CorporateBuyerCard>

                    {/* Project Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredProjects.map(project => (
                            <CorporateBuyerCard key={project.id} className="hover:scale-105 transition-transform cursor-pointer group">
                                <div className="relative mb-4 rounded-xl overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <button
                                        onClick={(e) => { e.stopPropagation(); toggleWatchlist(project.id); }}
                                        className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                                    >
                                        <Heart className={`w-5 h-5 ${watchlist.includes(project.id) ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
                                    </button>
                                    <div className="absolute bottom-3 left-3 flex gap-2">
                                        {[13, 14, 15].map(sdg => (
                                            <div key={sdg} className="w-7 h-7 bg-emerald-600 rounded text-white text-xs font-bold flex items-center justify-center">
                                                {sdg}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-3">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold">
                                        {project.type}
                                    </span>
                                    <span className="text-xs text-slate-500 flex items-center gap-1">
                                        <Globe className="w-3 h-3" />
                                        {project.location}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-slate-800 mb-2">{project.name}</h3>
                                <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                                    Admin Verified • {project.id}
                                </div>

                                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-xs text-slate-500 uppercase mb-1">Price per tCO2e</div>
                                            <div className="text-2xl font-black text-slate-800">${project.price}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500 uppercase mb-1">Annual Impact</div>
                                            <div className="text-lg font-bold text-emerald-600">{project.impact}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="text-xs text-slate-500">Availability</div>
                                        <div className="text-sm font-bold text-slate-800">{project.available.toLocaleString()} t</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500">Health Score</div>
                                        <div className="text-sm font-bold text-emerald-600">{project.health}%</div>
                                    </div>
                                </div>

                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${project.health}%` }} />
                                </div>

                                <button
                                    onClick={() => handlePurchase(project.name)}
                                    className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Purchase Credits
                                </button>
                            </CorporateBuyerCard>
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <CorporateBuyerCard>
                            <div className="text-center py-12">
                                <Search className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-700 mb-2">No projects found</h3>
                                <p className="text-slate-500">Try adjusting your search or filters</p>
                            </div>
                        </CorporateBuyerCard>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CorporateBuyerMarketplace;
