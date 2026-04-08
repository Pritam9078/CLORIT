import React, { useState } from 'react';
import { 
  BarChart3, ShoppingCart, PieChart, 
  History, ShieldCheck, Globe, 
  Leaf, TrendingUp, Wallet, 
  ArrowUpRight, Search, Filter,
  CheckCircle2, Lock
} from 'lucide-react';
import DashboardLayout from '../../shared/DashboardLayout';
import { useAuthStore } from '../../../state/authStore';
import KPIBox from '../../admin/shared/KPIBox';
import { Button } from '../../ui/button';
import { Progress } from '../../ui/progress';

// Import sub-components
import CorporateBuyerMarketplace from '../../CorporateBuyerMarketplace';
import CorporateBuyerPortfolio from '../../CorporateBuyerPortfolio';
import CorporateBuyerTransactions from '../../CorporateBuyerTransactions';
import CorporateBuyerProfile from '../../CorporateBuyerProfile';

const CommandCenterContent = ({ currentUser }: { currentUser: any }) => {
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
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Hero Impact Section */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[32px] text-white relative overflow-hidden shadow-2xl">
           <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold mb-6 border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> KYB VERIFIED ENTERPRISE
              </div>
              <h1 className="text-3xl font-black mb-3 tracking-tight">
                Sustainability Command: {currentUser?.fullName || currentUser?.organization || 'Acme Corp'}
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                You have neutralized <span className="text-white font-bold">4,210 tonnes</span> of CO2e this fiscal year. You are <span className="text-emerald-400 font-bold">84%</span> towards your Net-Zero 2030 goal.
              </p>
              <div className="flex gap-4">
                 <Button className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-3 rounded-xl h-auto">
                    Invest More
                 </Button>
                 <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 font-bold px-8 py-3 rounded-xl h-auto">
                    Download ESG Report
                 </Button>
              </div>
           </div>
           <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-500/10 blur-[120px] rounded-full -mr-20" />
           <Globe className="absolute -right-12 -bottom-12 w-64 h-64 text-slate-700/20 rotate-12" />
        </div>

        {/* Corporate KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <KPIBox 
            label="Total Carbon Assets" 
            value="$124,500" 
            icon={Wallet} 
            color="blue" 
            trend={{ value: 12.5, isUp: true }}
           />
           <KPIBox 
            label="Retired Credits" 
            value="8,420" 
            icon={Leaf} 
            color="green" 
           />
           <KPIBox 
            label="Verification Score" 
            value="100%" 
            icon={ShieldCheck} 
            color="purple" 
           />
           <KPIBox 
            label="Active Investments" 
            value="12" 
            icon={TrendingUp} 
            color="orange" 
           />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Portfolio Distribution */}
           <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm">
                 <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-indigo-500" /> Impact Mix
                 </h3>
                 <div className="relative h-48 flex items-center justify-center mb-6">
                    <div className="w-36 h-36 rounded-full border-[12px] border-slate-50 flex items-center justify-center relative">
                       <div className="absolute inset-0 rounded-full border-t-[12px] border-emerald-500 rotate-[45deg]" />
                       <div className="absolute inset-0 rounded-full border-r-[12px] border-blue-500 rotate-[120deg]" />
                       <div className="absolute inset-0 rounded-full border-b-[12px] border-orange-500 rotate-[210deg]" />
                       <div className="text-center">
                          <p className="text-2xl font-black text-slate-900">12</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Projects</p>
                       </div>
                    </div>
                 </div>
                 <div className="space-y-4">
                    {[
                       { label: 'Mangroves', color: 'bg-emerald-500', percent: 45 },
                       { label: 'Seagrass', color: 'bg-blue-500', percent: 30 },
                       { label: 'Saltmarsh', color: 'bg-orange-500', percent: 25 },
                    ].map((item, i) => (
                       <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                             <div className={`w-2 h-2 rounded-full ${item.color}`} />
                             <span className="text-sm font-medium text-slate-600">{item.label}</span>
                          </div>
                          <span className="text-sm font-bold text-slate-900">{item.percent}%</span>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Goal Tracking */}
              <div className="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm">
                 <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-500" /> Goal Trajectory
                 </h3>
                 <div className="space-y-6">
                    <div>
                       <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-slate-600">Net Zero 2030</span>
                          <span className="font-bold text-slate-900">84%</span>
                       </div>
                       <Progress value={84} className="h-2 bg-slate-100" />
                    </div>
                    <div>
                       <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-slate-600">Biodiversity Units</span>
                          <span className="font-bold text-slate-900">62%</span>
                       </div>
                       <Progress value={62} className="h-2 bg-slate-100" />
                    </div>
                 </div>
              </div>
           </div>

           {/* Marketplace Quick Look */}
           <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm">
                 <div className="flex items-center justify-between mb-8">
                    <div>
                       <h3 className="text-xl font-bold text-slate-900">Marketplace Opportunity</h3>
                       <p className="text-sm text-slate-400">Freshly minted high-integrity credits</p>
                    </div>
                    <Button variant="ghost" className="text-blue-600 font-bold gap-1 hover:bg-blue-50">
                       Explore All <ArrowUpRight className="w-4 h-4" />
                    </Button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MARKETPLACE_PROJECTS.map((project, idx) => (
                       <div key={idx} className="group cursor-pointer">
                          <div className="relative rounded-2xl overflow-hidden aspect-video mb-4">
                             <img src={project.image} alt={project.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                             <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur rounded-lg text-[10px] font-black text-slate-900 shadow-sm uppercase tracking-tight">
                                {project.type}
                             </div>
                          </div>
                          <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{project.name}</h4>
                          <div className="flex items-center justify-between mt-2">
                             <span className="text-lg font-black text-slate-900">${project.price} <span className="text-[10px] text-slate-400 font-normal uppercase">/ tCO2e</span></span>
                             <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-lg">
                                <TrendingUp className="w-3 h-3" /> {project.health}% Health
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Recent Portfolio Activity */}
              <div className="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm">
                 <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Retirements</h3>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="border-b border-slate-50">
                             <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Project</th>
                             <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                             <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                             <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Proof</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                          {[
                             { name: 'Kochi Blue Carbon', amount: '120 tCO2e', date: 'Oct 24, 2025', hash: '0x3ef...91a' },
                             { name: 'Sundarbans Reforest', amount: '450 tCO2e', date: 'Oct 12, 2025', hash: '0x9a2...bb1' },
                          ].map((row, i) => (
                             <tr key={i} className="group">
                                <td className="py-4 font-bold text-slate-900">{row.name}</td>
                                <td className="py-4 text-slate-600 font-medium">{row.amount}</td>
                                <td className="py-4 text-slate-400 text-sm font-medium">{row.date}</td>
                                <td className="py-4">
                                   <div className="px-2 py-1 bg-slate-50 rounded-lg text-[10px] font-mono text-slate-500 w-fit group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                      {row.hash}
                                   </div>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>
        </div>
    </div>
  );
};

const CorporateDashboard = () => {
  const [activeTab, setActiveTab] = useState('verification');
  const { currentUser } = useAuthStore();
  
  // Compute kybStatus globally using the persistent user store
  const kybStatus = currentUser?.status === 'verified' ? 'Verified' : 
                    currentUser?.status === 'rejected' ? 'Rejected' :
                    currentUser?.organization ? 'Under Review' : 'Pending';

  const sidebarItems = [
    { id: 'overview', label: 'Command Center', icon: BarChart3 },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
    { id: 'portfolio', label: 'ESG Portfolio', icon: PieChart },
    { id: 'history', label: 'History', icon: History },
    { id: 'verification', label: 'KYB Status', icon: ShieldCheck },
  ];

  const renderLockedTab = (Component: React.ReactNode) => {
    if (kybStatus === 'Verified') {
      return <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">{Component}</div>;
    }
    return (
      <div className="relative min-h-[500px]">
        <div className="pointer-events-none opacity-20 blur-sm select-none">
          {Component}
        </div>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 max-w-sm text-center">
                <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-3">KYB Verification Required</h3>
                <p className="text-slate-500 mb-6 text-sm font-medium">Please complete your business verification application to unlock the carbon marketplace.</p>
                <Button onClick={() => setActiveTab('verification')} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl">
                    Go to Verification
                </Button>
            </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
    >
      {activeTab === 'overview' && renderLockedTab(<CommandCenterContent currentUser={currentUser} />)}
      {activeTab === 'marketplace' && renderLockedTab(<CorporateBuyerMarketplace />)}
      {activeTab === 'portfolio' && renderLockedTab(<CorporateBuyerPortfolio />)}
      {activeTab === 'history' && renderLockedTab(<CorporateBuyerTransactions />)}
      {activeTab === 'verification' && <div className="animate-in fade-in slide-in-from-bottom-4 duration-500"><CorporateBuyerProfile /></div>}
    </DashboardLayout>
  );
};

export default CorporateDashboard;
