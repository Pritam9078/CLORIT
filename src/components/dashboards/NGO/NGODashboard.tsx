import React, { useState, useMemo } from 'react';
import { 
  BarChart3, Plus, FileText, 
  Leaf, Info, AlertTriangle, 
  CheckCircle, Clock, Settings,
  Users, Globe, TrendingUp, Search,
  Download, Tag, Activity
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import DashboardLayout from '../../shared/DashboardLayout';
import { useAuthStore } from '../../../state/authStore';
import { useProjectStore } from '../../../state/projectStore';
import KPIBox from '../../admin/shared/KPIBox';
import { Button } from '../../ui/button';
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';
import NewProjectModal from './NewProjectModal';
import NGOMarketplace from '../../NGOMarketplace';
import NGOImpactReports from '../../NGOImpactReports';
import NGOSettings from '../../NGOSettings';

const NGODashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const { currentUser } = useAuthStore();
  const { projects } = useProjectStore();

  const isVerified = currentUser?.status === 'verified';
  const isPending = currentUser?.status === 'pending';
  const isRejected = currentUser?.status === 'rejected';

  // Filter projects for the current NGO
  const myProjects = useMemo(() => {
    return projects.filter(p => p.ngoId === currentUser?.id || p.ngoName === currentUser?.fullName);
  }, [projects, currentUser]);

  // Calculate KPIs
  const kpiData = useMemo(() => {
    const totalCredits = myProjects.reduce((sum, p) => sum + (p.status === 'admin-approved' ? p.carbonCredits : 0), 0);
    const activeProjects = myProjects.filter(p => p.status !== 'rejected').length;
    const avgNdvi = myProjects.length > 0 
      ? (myProjects.reduce((sum, p) => sum + p.ndviValue, 0) / myProjects.length * 100).toFixed(1)
      : '0.0';
    const totalArea = myProjects.reduce((sum, p) => sum + p.area, 0);
    const reach = Math.round(totalArea * 12); // Mock reach calculation

    return { totalCredits, activeProjects, avgNdvi, reach };
  }, [myProjects]);

  // Chart Data preparation
  const chartData = useMemo(() => {
    // Group projects by month (simple mock for visualization)
    return [
      { name: 'Jan', credits: 400, ndvi: 0.54 },
      { name: 'Feb', credits: 300, ndvi: 0.58 },
      { name: 'Mar', credits: 600, ndvi: 0.62 },
      { name: 'Apr', credits: 800, ndvi: 0.65 },
      { name: 'May', credits: 500, ndvi: 0.68 },
      { name: 'Jun', credits: 900, ndvi: 0.72 },
      { name: 'Jul', credits: kpiData.totalCredits > 1000 ? 1100 : 700, ndvi: 0.75 },
    ];
  }, [kpiData.totalCredits]);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'projects', label: 'My Projects', icon: Leaf },
    { id: 'reports', label: 'Impact Reports', icon: FileText },
    { id: 'marketplace', label: 'Marketplace', icon: Globe },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Banner */}
      {isVerified && (
        <div className="flex items-center justify-between bg-gradient-to-r from-emerald-600 to-teal-700 p-8 rounded-[32px] text-white overflow-hidden relative shadow-xl shadow-emerald-500/20">
           <div className="relative z-10">
             <h2 className="text-3xl font-black flex items-center gap-3 tracking-tighter">
               Welcome back, {currentUser?.fullName} <CheckCircle className="w-8 h-8 text-emerald-300" />
             </h2>
             <p className="text-emerald-50/90 mt-2 font-medium max-w-lg">
               Your ecosystem restoration impact is growing. You have {kpiData.totalCredits} verified credits ready for exchange.
             </p>
           </div>
           <Button 
            onClick={() => setIsNewProjectModalOpen(true)}
            className="bg-white text-emerald-700 hover:bg-emerald-50 font-black px-8 py-4 rounded-2xl transition-all gap-2 relative z-10 shadow-lg"
           >
             <Plus className="w-6 h-6" /> New Project
           </Button>
           <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-[100px]" />
           <div className="absolute top-0 left-1/2 w-32 h-32 bg-emerald-400/20 rounded-full blur-[80px]" />
        </div>
      )}

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <KPIBox 
          label="Verified Credits" 
          value={kpiData.totalCredits.toLocaleString()} 
          icon={Leaf} 
          color="green" 
          trend={{ value: 12.4, isUp: true }}
         />
         <KPIBox 
          label="Active Projects" 
          value={kpiData.activeProjects.toString()} 
          icon={Globe} 
          color="blue" 
         />
         <KPIBox 
          label="Impact Score" 
          value={kpiData.avgNdvi} 
          icon={TrendingUp} 
          color="purple" 
          trend={{ value: 5.2, isUp: true }}
         />
         <KPIBox 
          label="Est. Reach" 
          value={kpiData.reach.toLocaleString()} 
          icon={Users} 
          color="orange" 
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            {/* Chart Section */}
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-[#1E293B] tracking-tight">Ecosystem Health</h3>
                    <p className="text-slate-400 text-sm font-medium">Monthly NDVI and Carbon Credit performance</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-lg text-[10px] font-bold text-emerald-600 uppercase">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" /> NDVI
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-lg text-[10px] font-bold text-blue-600 uppercase">
                      <div className="w-2 h-2 rounded-full bg-blue-500" /> Credits
                    </div>
                  </div>
               </div>
               
               <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dy={10} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="credits" stroke="#0EA5E9" strokeWidth={3} fillOpacity={1} fill="url(#colorCredits)" />
                      <Area type="monotone" dataKey="ndvi" stroke="#10B981" strokeWidth={3} fillOpacity={0} />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>

            {/* Recent Projects */}
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-[#1E293B] tracking-tight">Active In-Field</h3>
                  <Button variant="ghost" onClick={() => setActiveTab('projects')} className="text-emerald-600 font-bold hover:bg-emerald-50">View All</Button>
               </div>
               <div className="space-y-4">
                  {myProjects.length === 0 ? (
                    <div className="py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                      <Leaf className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-400 font-bold">No projects found. Start by submitting your first one!</p>
                    </div>
                  ) : (
                    myProjects.slice(0, 3).map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between p-5 rounded-3xl bg-gray-50/50 border border-gray-100 hover:border-emerald-200 hover:bg-white transition-all group cursor-pointer shadow-hover">
                         <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:bg-emerald-50 transition-colors">
                               <Leaf className="w-7 h-7 text-emerald-500" />
                            </div>
                            <div>
                               <h4 className="font-bold text-[#1E293B] group-hover:text-emerald-700 transition-colors uppercase tracking-tight text-lg leading-tight">{p.name}</h4>
                               <div className="flex gap-3 items-center mt-1">
                                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{p.id.slice(0, 8)}</span>
                                  <span className="text-xs text-slate-400 font-medium">•</span>
                                  <span className="text-xs text-slate-500 font-bold flex items-center gap-1 opacity-70">
                                    <MapPinIcon className="w-3 h-3" /> {p.location}
                                  </span>
                               </div>
                            </div>
                         </div>
                         <div className="text-right">
                            <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest inline-block mb-1 ${
                              p.status === 'admin-approved' ? 'bg-emerald-100 text-emerald-700' : 
                              p.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                               {p.status.split('-').join(' ')}
                            </div>
                            <p className="text-sm font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{p.carbonCredits} CCT</p>
                         </div>
                      </div>
                    ))
                  )}
               </div>
            </div>
         </div>

         {/* Right Sidebar Details */}
         <div className="space-y-8">
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
               <h3 className="text-xl font-black text-[#1E293B] mb-8 tracking-tight">Compliance Status</h3>
               <div className="space-y-8">
                  <div className="flex items-start gap-5">
                     <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle className="w-6 h-6 text-blue-500" />
                     </div>
                     <div>
                        <h4 className="font-bold text-base text-[#334155]">Documentation</h4>
                        <p className="text-xs text-slate-400 leading-relaxed mt-2 font-medium">Valid land deeds and restoration plans have been verified by the registry.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-5">
                     <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                        <TrendingUp className="w-6 h-6 text-emerald-500" />
                     </div>
                     <div>
                        <h4 className="font-bold text-base text-[#334155]">Growth Trajectory</h4>
                        <p className="text-xs text-slate-400 leading-relaxed mt-2 font-medium">Your projects show a 12% improvement in biomass compared to regional benchmarks.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-8 rounded-[40px] text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden group">
               <div className="relative z-10">
                 <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 backdrop-blur-md group-hover:scale-110 transition-transform">
                    <Info className="w-7 h-7 text-emerald-400" />
                 </div>
                 <h4 className="text-2xl font-black mb-3 tracking-tight">Global Visibility?</h4>
                 <p className="text-sm text-slate-400 mb-8 leading-relaxed font-medium">Submit for the Blue Carbon impact certification to unlock premium pricing in the global marketplace.</p>
                 <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-4 rounded-2xl shadow-lg transition-all active:scale-95">Upgrade Certification</Button>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px]" />
            </div>
         </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex justify-between items-center bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                <div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tighter">My <span className="text-emerald-500">Projects</span></h1>
                  <p className="text-slate-400 font-bold text-lg mt-1">Manage all your conservation initiatives</p>
                </div>
                <Button 
                  onClick={() => setIsNewProjectModalOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-8 py-6 rounded-[24px] text-lg gap-3 shadow-xl shadow-emerald-500/30"
                >
                  <Plus className="w-7 h-7" /> New Project
                </Button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
               {myProjects.map((p, i) => (
                 <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all group overflow-hidden relative active:scale-[0.98]">
                    <div className="flex justify-between items-start mb-8 relative z-10">
                       <div className="w-16 h-16 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform shadow-sm">
                          <Leaf className="w-8 h-8" />
                       </div>
                       <div className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
                          p.status === 'admin-approved' ? 'bg-emerald-100 text-emerald-600' : 
                          p.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                       }`}>
                          {p.status}
                       </div>
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors uppercase tracking-tighter leading-tight mb-2">{p.name}</h3>
                      <div className="flex items-center gap-2 text-slate-400 font-bold mb-6">
                        <MapPinIcon className="w-4 h-4" /> {p.location}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-50 mb-6">
                         <div>
                            <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-1">Area</p>
                            <p className="text-xl font-black text-slate-800">{p.area} <span className="text-xs text-slate-400">Ha</span></p>
                         </div>
                         <div>
                            <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-1">Credits</p>
                            <p className="text-xl font-black text-emerald-600">{p.carbonCredits} <span className="text-xs text-slate-400">CCT</span></p>
                         </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                         <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-300 uppercase">NDVI Value</span>
                            <span className="text-base font-black text-slate-900">{(p.ndviValue * 100).toFixed(1)}%</span>
                         </div>
                         <Button variant="ghost" className="rounded-2xl font-black text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700">Project Feed</Button>
                      </div>
                    </div>
                    <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>
               ))}
               {myProjects.length === 0 && (
                 <div className="col-span-full py-40 text-center bg-slate-50 rounded-[48px] border-4 border-dashed border-slate-200">
                    <Globe className="w-20 h-20 text-slate-200 mx-auto mb-6" />
                    <h3 className="text-3xl font-black text-slate-300">NO PROJECTS ACTIVE</h3>
                    <p className="text-slate-400 font-bold mt-2">Start your environmental journey today by adding a new project.</p>
                 </div>
               )}
             </div>
          </div>
        );
      case 'reports': return <NGOImpactReports standalone={true} />;
      case 'marketplace': return <NGOMarketplace standalone={true} />;
      case 'settings': return <NGOSettings standalone={true} />;
      default: return renderOverview();
    }
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
    >
      <div className="max-w-[1600px] mx-auto pb-20">
        {/* Status Banners - ONLY IF NOT VERIFIED */}
        {!isVerified && (
          <div className="mb-8 space-y-4">
            {isPending && (
              <Alert className="bg-amber-50 border-amber-200 text-amber-800 p-8 rounded-[32px] shadow-sm border-2 animate-pulse">
                <Clock className="h-8 w-8 text-amber-600 mb-4" />
                <AlertTitle className="text-2xl font-black tracking-tight mb-2 uppercase">Verification Pending</AlertTitle>
                <AlertDescription className="text-gray-600 text-lg font-medium leading-relaxed max-w-3xl">
                  Registry admins are reviewing your NGO credentials. Current estimated processing time: <span className="font-black text-amber-700">2-3 business days</span>. 
                  Prepare your project dossiers in the meantime.
                </AlertDescription>
              </Alert>
            )}

            {isRejected && (
              <Alert className="bg-red-50 border-red-200 text-red-800 p-8 rounded-[32px] border-2">
                <AlertTriangle className="h-8 w-8 text-red-600 mb-4" />
                <AlertTitle className="text-2xl font-black tracking-tight mb-2 uppercase">Compliance Check Failed</AlertTitle>
                <AlertDescription className="text-gray-600 text-lg font-medium leading-relaxed">
                  The registry was unable to verify your organizational status based on the documents provided. 
                  Please resubmit your 80G/12A certificates to resume platform access.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {renderContent()}

        <NewProjectModal 
          isOpen={isNewProjectModalOpen} 
          onClose={() => setIsNewProjectModalOpen(false)} 
        />
      </div>
    </DashboardLayout>
  );
};

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

export default NGODashboard;
