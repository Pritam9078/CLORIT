import React, { useState } from 'react';
import {
    Trophy,
    Medal,
    TrendingUp,
    Users,
    TreePine,
    Zap,
    ChevronUp,
    ChevronDown,
    Search,
    Filter,
    ArrowRight,
    Globe,
    Calendar
} from 'lucide-react';

import CommunityLayout from './shared/CommunityLayout';
import CommunityCard from './shared/CommunityCard';

// ---------------------------
// Interfaces
// ---------------------------
interface CommunityRank {
    rank: number;
    name: string;
    location: string;
    trees: number;
    co2: number;
    credits: number;
    trend: 'up' | 'down' | 'stable';
    isUser: boolean;
}

const CommunityLeaderboard: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'monthly' | 'regional'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const leaderboardData: CommunityRank[] = [
        { rank: 1, name: "Sundarbans Guardians", location: "West Bengal, India", trees: 12450, co2: 840, credits: 15600, trend: 'up', isUser: false },
        { rank: 2, name: "Blue Mangrove Alliance", location: "Banten, Indonesia", trees: 11200, co2: 760, credits: 14200, trend: 'up', isUser: false },
        { rank: 3, name: "Coastal Rejuvenators", location: "Mombasa, Kenya", trees: 9800, co2: 680, credits: 12100, trend: 'stable', isUser: false },
        { rank: 4, name: "Delta Saviors", location: "Nile Delta, Egypt", trees: 8500, co2: 590, credits: 10500, trend: 'up', isUser: true },
        { rank: 5, name: "Queensland Coast Collective", location: "QLD, Australia", trees: 7200, co2: 480, credits: 8900, trend: 'down', isUser: false },
        { rank: 6, name: "Amazon Delta Group", location: "Pará, Brazil", trees: 6800, co2: 450, credits: 8400, trend: 'up', isUser: false },
        { rank: 7, name: "Mekong Impact NGO", location: "Can Tho, Vietnam", trees: 5900, co2: 410, credits: 7200, trend: 'stable', isUser: false },
    ];

    const filteredData = leaderboardData.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const topThree = leaderboardData.slice(0, 3);

    return (
        <CommunityLayout>
            {/* Page Header */}
            <div className="mb-16 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-100">
                    <Trophy className="w-4 h-4" /> Global Impact Standings
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 tracking-tighter uppercase">
                    Community <span className="text-emerald-500 italic">Leaderboard</span>
                </h1>
                <p className="text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed italic opacity-80">
                    Celebrating the world's most active blue carbon communities. Track your rank, monitor global impact, and climb the standings through verified plantation.
                </p>
            </div>

            {/* Podium Section */}
            <div className="max-w-6xl mx-auto mb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                    {/* Silver - Rank 2 */}
                    <div className="order-2 md:order-1 flex flex-col items-center">
                        <div className="relative mb-6 group">
                            <div className="absolute inset-0 bg-slate-300 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-slate-200 to-slate-400 p-1 relative z-10 shadow-xl">
                                <div className="w-full h-full bg-white rounded-[1.8rem] flex items-center justify-center text-3xl font-black text-slate-400">
                                    2
                                </div>
                            </div>
                            <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-slate-100 rounded-full border-4 border-white flex items-center justify-center text-slate-500 shadow-md">
                                <Medal className="w-5 h-5" />
                            </div>
                        </div>
                        <CommunityCard className="w-full text-center border-b-8 border-b-slate-300">
                            <h3 className="font-black text-slate-800 mb-1 uppercase text-sm truncate">{topThree[1].name}</h3>
                            <p className="text-[10px] font-bold text-slate-400 mb-4">{topThree[1].location}</p>
                            <div className="py-3 px-4 bg-slate-50 rounded-2xl">
                                <span className="text-lg font-black text-slate-700">{topThree[1].trees.toLocaleString()}</span>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Trees Planted</p>
                            </div>
                        </CommunityCard>
                    </div>

                    {/* Gold - Rank 1 */}
                    <div className="order-1 md:order-2 flex flex-col items-center">
                        <div className="relative mb-8 group">
                            <div className="absolute inset-0 bg-amber-400 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity animate-pulse" />
                            <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-amber-300 to-amber-500 p-1 relative z-10 shadow-2xl scale-110">
                                <div className="w-full h-full bg-white rounded-[2.3rem] flex items-center justify-center text-5xl font-black text-amber-500">
                                    1
                                </div>
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-amber-100 rounded-full border-4 border-white flex items-center justify-center text-amber-600 shadow-lg">
                                <Trophy className="w-6 h-6" />
                            </div>
                        </div>
                        <CommunityCard className="w-full text-center border-b-8 border-b-amber-400 scale-105 shadow-2xl relative z-20">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-amber-500 text-white text-[9px] font-black rounded-full shadow-lg uppercase tracking-[0.2em]">
                                Current Champion
                            </div>
                            <h3 className="font-black text-slate-800 text-lg mb-1 mt-2 uppercase truncate">{topThree[0].name}</h3>
                            <p className="text-[10px] font-bold text-slate-400 mb-6">{topThree[0].location}</p>
                            <div className="py-4 px-6 bg-amber-50 rounded-[2rem] border border-amber-100 mb-2">
                                <span className="text-2xl font-black text-amber-600">{topThree[0].trees.toLocaleString()}</span>
                                <p className="text-[10px] font-black text-amber-500/60 uppercase tracking-widest">Global Trees</p>
                            </div>
                            <div className="flex justify-around pt-4 text-[10px] font-black text-slate-400 uppercase">
                                <div>
                                    <p className="text-slate-800 font-black">{topThree[0].co2}t</p>
                                    <p>CO2</p>
                                </div>
                                <div className="w-px h-8 bg-slate-100" />
                                <div>
                                    <p className="text-emerald-500 font-black">{topThree[0].credits} CLB</p>
                                    <p>EARNED</p>
                                </div>
                            </div>
                        </CommunityCard>
                    </div>

                    {/* Bronze - Rank 3 */}
                    <div className="order-3 md:order-3 flex flex-col items-center">
                        <div className="relative mb-6 group">
                            <div className="absolute inset-0 bg-orange-300 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-orange-200 to-orange-400 p-1 relative z-10 shadow-xl">
                                <div className="w-full h-full bg-white rounded-[1.8rem] flex items-center justify-center text-3xl font-black text-orange-400">
                                    3
                                </div>
                            </div>
                            <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-orange-50 rounded-full border-4 border-white flex items-center justify-center text-orange-500 shadow-md">
                                <Medal className="w-5 h-5" />
                            </div>
                        </div>
                        <CommunityCard className="w-full text-center border-b-8 border-b-orange-300">
                            <h3 className="font-black text-slate-800 mb-1 uppercase text-sm truncate">{topThree[2].name}</h3>
                            <p className="text-[10px] font-bold text-slate-400 mb-4">{topThree[2].location}</p>
                            <div className="py-3 px-4 bg-slate-50 rounded-2xl">
                                <span className="text-lg font-black text-slate-700">{topThree[2].trees.toLocaleString()}</span>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Trees Planted</p>
                            </div>
                        </CommunityCard>
                    </div>
                </div>
            </div>

            {/* Main Ranking Table */}
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Table Filters & Search */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit border border-slate-200">
                        {['all', 'monthly', 'regional'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f as any)}
                                className={`px-6 py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${filter === f ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search communities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-12 pl-12 pr-6 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 outline-none focus:border-emerald-500 transition-all text-sm"
                        />
                    </div>
                </div>

                {/* Table Head */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-10 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-5">Community</div>
                    <div className="col-span-2 text-center">Trees</div>
                    <div className="col-span-2 text-center">CO2 Seq.</div>
                    <div className="col-span-2 text-right">CLB Credits</div>
                </div>

                {/* Table Body */}
                <div className="space-y-4 mb-32">
                    {filteredData.map((item) => (
                        <div
                            key={item.rank}
                            className={`group relative bg-white border border-slate-100 rounded-[2.5rem] p-6 pr-10 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-300 ${item.isUser ? 'border-emerald-500 ring-4 ring-emerald-500/10' : ''
                                }`}
                        >
                            {item.isUser && (
                                <div className="absolute -top-3 left-10 px-3 py-1 bg-emerald-500 text-white text-[8px] font-black rounded-full shadow-lg uppercase tracking-widest">
                                    Your Community
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                                <div className="col-span-1 flex items-center gap-4">
                                    <span className="text-xl font-black text-slate-300 min-w-[1.5rem] group-hover:text-emerald-500 transition-colors">{item.rank}</span>
                                    {item.trend === 'up' ? <ChevronUp className="w-4 h-4 text-emerald-500" /> :
                                        item.trend === 'down' ? <ChevronDown className="w-4 h-4 text-red-400" /> :
                                            <div className="w-4 h-px bg-slate-200" />}
                                </div>

                                <div className="col-span-5 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 font-black text-sm group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                                        {item.name.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-800 tracking-tight uppercase group-hover:text-emerald-600 transition-colors">{item.name}</h4>
                                        <div className="flex items-center gap-1.5 opacity-50">
                                            <Globe className="w-3 h-3" />
                                            <span className="text-[9px] font-bold uppercase tracking-widest">{item.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-2 text-center">
                                    <span className="text-sm font-black text-slate-700">{item.trees.toLocaleString()}</span>
                                    <p className="text-[8px] font-black text-slate-400 uppercase md:hidden pt-1">Trees Planted</p>
                                </div>

                                <div className="col-span-2 text-center">
                                    <span className="text-sm font-black text-slate-500 group-hover:text-emerald-600 transition-colors">{item.co2}t</span>
                                    <p className="text-[8px] font-black text-slate-400 uppercase md:hidden pt-1">CO2 Captured</p>
                                </div>

                                <div className="col-span-2 text-right">
                                    <div className="flex items-center justify-end gap-2 text-emerald-600">
                                        <Zap className="w-4 h-4 fill-emerald-600/20" />
                                        <span className="text-lg font-black">{item.credits.toLocaleString()}</span>
                                    </div>
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">CLB Total</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Personal Rank (Sticky) */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50">
                <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-6 shadow-2xl flex items-center justify-between text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-1000" />

                    <div className="flex items-center gap-8 relative z-10">
                        <div className="flex items-center gap-4 border-r border-white/10 pr-8">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Your Rank</span>
                            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-xl font-black shadow-lg shadow-emerald-500/30">
                                4
                            </div>
                        </div>

                        <div>
                            <h5 className="font-black text-white tracking-widest uppercase mb-1">Delta Saviors</h5>
                            <div className="flex items-center gap-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                <span className="flex items-center gap-1.5"><TreePine className="w-3 h-3 text-emerald-400" /> 8,500 Trees</span>
                                <span className="flex items-center gap-1.5"><TrendingUp className="w-3 h-3 text-blue-400" /> +3 Places this month</span>
                            </div>
                        </div>
                    </div>

                    <button className="h-14 px-8 bg-emerald-500 text-white rounded-2xl font-black text-[10px] tracking-[0.2em] shadow-xl hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all relative z-10 flex items-center gap-3">
                        IMPACT DASHBOARD <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </CommunityLayout>
    );
};

export default CommunityLeaderboard;
