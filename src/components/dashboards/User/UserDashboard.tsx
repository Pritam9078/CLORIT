import React, { useState } from 'react';
import { 
  BarChart3, TreePine, Vote, 
  Coins, LineChart, Target, 
  Zap, Award, Users, 
  MessageSquare, ArrowUpRight, Plus,
  Leaf, CheckCircle2
} from 'lucide-react';
import DashboardLayout from '../../shared/DashboardLayout';
import { useAuthStore } from '../../../state/authStore';
import KPIBox from '../../admin/shared/KPIBox';
import { Button } from '../../ui/button';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { currentUser } = useAuthStore();

  const sidebarItems = [
    { id: 'overview', label: 'My Journey', icon: BarChart3 },
    { id: 'plant', label: 'Plant Trees', icon: TreePine },
    { id: 'vote', label: 'Governance', icon: Vote },
    { id: 'rewards', label: 'Rewards', icon: Award },
    { id: 'community', label: 'Community', icon: Users },
  ];

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
    >
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Welcome Section */}
        <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-8 md:p-10 shadow-xl shadow-emerald-200/50 group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-white/20 transition-colors duration-700" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl -ml-20 -mb-20" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
              <div className="w-20 h-20 rounded-[24px] bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner border border-white/20">
                🌱
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
                  Hi, {currentUser?.fullName || 'Rajesh'}!
                </h1>
                <p className="text-lg text-emerald-50 font-medium opacity-90 max-w-2xl">
                  You've planted <span className="font-bold underline decoration-emerald-400">156 trees</span> so far. Ready to grow your forest today?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-emerald-100/70 text-[10px] font-black uppercase tracking-wider mb-1">Weekly Goal</p>
                  <p className="text-white font-bold text-lg">5/10 Plants Registered</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-emerald-100/70 text-[10px] font-black uppercase tracking-wider mb-1">New Streak</p>
                  <p className="text-white font-bold text-lg">4 Days Consistent</p>
                </div>
              </div>

              <Button className="bg-white text-emerald-800 hover:bg-emerald-50 font-black rounded-2xl p-7 flex items-center justify-center gap-3 shadow-lg shadow-emerald-900/20 h-full text-lg">
                <Plus className="w-6 h-6 text-emerald-600" /> New Registration
              </Button>
            </div>
          </div>
        </section>

        {/* User KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <KPIBox 
            label="Trees Registered" 
            value="156" 
            icon={TreePine} 
            color="green" 
            trend={{ value: 15, isUp: true }}
           />
           <KPIBox 
            label="CO2 Offset" 
            value="2.4 Tons" 
            icon={Leaf} 
            color="blue" 
           />
           <KPIBox 
            label="CLORIT Earnings" 
            value="₹24,500" 
            icon={Coins} 
            color="orange" 
           />
           <KPIBox 
            label="Impact Badge" 
            value="Silver" 
            icon={Award} 
            color="purple" 
           />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Detailed Progress */}
           <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm min-h-[400px]">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-slate-800">Impact Analytics</h3>
                    <Button variant="ghost" className="text-emerald-600 font-bold hover:bg-emerald-50">View Full Reports</Button>
                 </div>
                 <div className="w-full h-80 bg-slate-50/50 rounded-2xl flex flex-col items-center justify-center border border-dashed border-slate-200">
                    <LineChart className="w-12 h-12 text-slate-300 mb-2" />
                    <p className="text-slate-400 font-medium italic">Environmental growth chart loading...</p>
                 </div>
              </div>

              {/* Timeline */}
              <div className="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm">
                 <h3 className="text-xl font-bold text-slate-800 mb-8">Recent Milestones</h3>
                 <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                    {[
                       { title: 'Verified 10 Mangrove Saplings', desc: 'Sunderbans Restoration Project', time: '2 hours ago', icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" /> },
                       { title: 'Earned Silver Shield Badge', desc: 'Top 5% of community contributors', time: 'Yesterday', icon: <Award className="w-4 h-4 text-amber-500" /> },
                       { title: 'New Proposal Vote Cast', desc: 'Site Expansion in Kochi', time: '3 days ago', icon: <Vote className="w-4 h-4 text-blue-500" /> },
                    ].map((step, i) => (
                       <div key={i} className="relative group">
                          <div className="absolute -left-[27px] top-1 px-1.5 py-1.5 bg-white border-2 border-slate-100 rounded-full group-hover:border-emerald-500 transition-colors">
                             <div className="w-2 h-2 bg-slate-200 group-hover:bg-emerald-500 rounded-full" />
                          </div>
                          <div>
                             <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{step.title}</h4>
                                <span className="text-[10px] text-slate-400 font-bold uppercase">{step.time}</span>
                             </div>
                             <p className="text-sm text-slate-500">{step.desc}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Community Sidebar */}
           <div className="space-y-8">
              {/* Rewards Card */}
              <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-[32px] text-white overflow-hidden relative shadow-lg">
                 <h3 className="text-xl font-bold mb-6">Community Perks</h3>
                 <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                       <div className="text-2xl">🎟️</div>
                       <div>
                          <p className="text-sm font-bold">Free Event Pass</p>
                          <p className="text-[10px] text-indigo-100 opacity-70">Eco-Summit 2026 Mumbai</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                       <div className="text-2xl">💳</div>
                       <div>
                          <p className="text-sm font-bold">CLORIT Premium Card</p>
                          <p className="text-[10px] text-indigo-100 opacity-70">Coming Q3 2026</p>
                       </div>
                    </div>
                 </div>
                 <Button className="w-full mt-6 bg-white text-indigo-700 hover:bg-indigo-50 font-black py-3 rounded-xl border-none">
                    Redeem Tokens
                 </Button>
              </div>

              {/* Chat/Engagement */}
              <div className="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm">
                 <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-emerald-500" /> Community Buzz
                 </h3>
                 <div className="space-y-4">
                    {[1, 2].map((_, i) => (
                       <div key={i} className="flex gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex-shrink-0" />
                          <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none">
                             <p className="text-xs text-slate-400 font-bold mb-1">Amit (Field Agent)</p>
                             <p className="text-xs text-slate-600">Site #4 Mangroves are showing great resilience! Check photos.</p>
                          </div>
                       </div>
                    ))}
                 </div>
                 <Button className="w-full mt-6 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold py-2.5 rounded-xl border-none">
                    Join Discussion
                 </Button>
              </div>
           </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
