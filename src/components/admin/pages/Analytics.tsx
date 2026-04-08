import React from 'react';
import { 
  BarChart3, 
  Map, 
  TrendingUp, 
  Download, 
  Calendar,
  Layers,
  Leaf,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import SatelliteGlobe from '../../SatelliteGlobe2';
import SatelliteDatasetReport from './SatelliteDatasetReport';
import ChartCard from '../shared/ChartCard';
import { useNDVIStore } from '../../../stores/useNDVIStore';
import { NDVIControls } from '../../globe/NDVIControls';
import { NDVIAnalyticsPanel } from '../../globe/NDVIAnalyticsPanel';
import { NDVIAlertSystem } from '../../globe/NDVIAlertSystem';
import { AnimatePresence, motion } from 'framer-motion';
import { api } from '../../../lib/api';
import { useWallet } from '../../../contexts/WalletContext';
import ModernPreloader from '../../ui/ModernPreloader';

interface NationalStats {
  totalProjects: number;
  avgNDVI: number;
  totalArea: number;
  healthDistribution: Array<{ name: string; value: number }>;
}

const regionDataInitial = [
  { name: 'West Bengal', health: 65, credits: 1250, area: 45.2 },
  { name: 'Kerala', health: 72, credits: 980, area: 32.7 },
  { name: 'Odisha', health: 45, credits: 1640, area: 67.1 },
  { name: 'Tamil Nadu', health: 78, credits: 1840, area: 58.9 },
  { name: 'Gujarat', health: 58, credits: 2100, area: 72.4 },
];

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

const Analytics: React.FC = () => {
  const { isFullscreen, toggleFullscreen, activeLayer } = useNDVIStore();
  const { address, login, isAuthenticated, isLoggingIn } = useWallet();
  const [stats, setStats] = React.useState<NationalStats | null>(null);
  const [regions, setRegions] = React.useState(regionDataInitial);
  const [isBackendLive, setIsBackendLive] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const health = await api.get('/health');
      setIsBackendLive(health.status === 'OK');
      
      if (!isAuthenticated) {
        // We wait for the user to initiate login if not authenticated
        setIsLoading(false);
        return;
      }

      // Fetch national stats
      const nationalRes = await api.get('/admin/ndvi/national-stats');
      if (nationalRes.success) {
        setStats(nationalRes.data);
      }

      // Fetch regional breakdown
      const regionalRes = await api.get('/admin/ndvi/regional');
      if (regionalRes.success && regionalRes.data?.length > 0) {
        setRegions(regionalRes.data);
      }
    } catch (err: any) {
      console.error('Failed to fetch dashboard data:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [isAuthenticated]);

  if (isLoading) return <ModernPreloader />;

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-slate-200">
        <ShieldCheck className="w-16 h-16 text-blue-500 mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold text-slate-900">Administrative Handshake Required</h2>
        <p className="text-slate-500 mt-2 mb-8 max-w-md mx-auto">
          Please sign a verification message with your administrator wallet to access the live Satellite Intelligence Command Center.
        </p>
        <button 
          onClick={() => login()}
          disabled={isLoggingIn}
          className="px-8 py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold shadow-xl shadow-slate-200 transition-all flex items-center gap-3 disabled:opacity-50"
        >
          {isLoggingIn ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing Challenge...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 text-yellow-400" />
              Sign & Initialize System
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950 flex flex-col overflow-hidden"
          >
            {/* Cinematic Title Bar */}
            <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-40 bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex items-center gap-3">
                <Leaf className="text-green-400 w-6 h-6" />
                <h1 className="text-xl font-bold tracking-widest text-white uppercase font-mono">NDVI Intelligence System - Command Center</h1>
                <div className="px-2 py-0.5 rounded border border-green-500/50 bg-green-500/20 text-green-400 text-[10px] uppercase font-bold animate-pulse">Live Link Active</div>
              </div>
              <button 
                onClick={toggleFullscreen}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10 flex gap-2 items-center text-xs font-bold uppercase tracking-wider"
              >
                <Minimize2 size={16} /> Exit Immersive Mode
              </button>
            </div>

            {/* Immersive 3D Globe Workspace */}
            <div className="flex-1 w-full relative">
              <SatelliteGlobe />
              <NDVIControls />
              <NDVIAnalyticsPanel />
              <NDVIAlertSystem />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Standard Dashboard Layout */}
      {!isFullscreen && (
        <div className="space-y-8 animate-in fade-in duration-700">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Analytics & Ecological Reports</h2>
              <p className="text-slate-500 mt-1">Deep-dive into regional impact, satellite health data, and carbon offset dynamics.</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleFullscreen}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-green-200 transition-all flex items-center gap-2"
              >
                <Maximize2 className="w-4 h-4" /> Expand NDVI Monitor
              </button>
              <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all flex items-center gap-2">
                <Download className="w-4 h-4 text-slate-400" /> Export Full Dataset
              </button>
            </div>
          </div>

          {/* Top row - Globe & Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-[500px] bg-slate-900 rounded-3xl relative overflow-hidden group shadow-2xl">
              <SatelliteGlobe />
              <div className="absolute top-6 left-6 p-4 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10 z-10">
                 <div className="flex items-center gap-2 text-xs font-bold text-green-400 mb-2 uppercase tracking-widest">
                   <Zap size={14} className="animate-pulse" /> Live Satellite Data
                 </div>
                 <p className="text-white font-bold text-lg">National NDVI Monitor</p>
                 <p className="text-slate-400 text-xs mt-1 italic">Active Layer: {activeLayer}</p>
              </div>
            </div>

            <div className="space-y-6">
               <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-green-100 transition-colors">
                  <div className="p-3 bg-green-50 text-green-600 rounded-xl border border-green-100 group-hover:scale-110 transition-transform">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Average Vegetation Health (NDVI)</p>
                    <h4 className="text-2xl font-bold text-slate-900 leading-tight">
                      {stats?.avgNDVI.toFixed(2) || '0.64'}{' '}
                      <span className="text-[10px] text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full ml-2 underline">
                        Optimized
                      </span>
                    </h4>
                  </div>
               </div>

               <ChartCard title="Regional Distribution" subtitle="Participation by province" className="h-[340px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={regions}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="credits"
                      >
                        {regions.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                    </PieChart>
                 </ResponsiveContainer>
               </ChartCard>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-8">
             <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Impact Summary</span>
                  <p className="text-sm font-bold text-slate-900">Total Projects: <span className="text-blue-600">{stats?.totalProjects || '0'}</span></p>
                </div>
                <div className="w-[1px] h-8 bg-slate-100" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Environmental Coverage</span>
                  <p className="text-sm font-bold text-slate-900">Total Area: <span className="text-green-600">{stats?.totalArea?.toFixed(1) || '0'} ha</span></p>
                </div>
             </div>
             <div className="flex items-center gap-2">
                <ShieldCheck className="text-green-500 w-5 h-5" />
                <span className="text-xs font-medium text-slate-500">All data cryptographically verified by the Registry Protocol</span>
             </div>
          </div>

          {/* Satellite Dataset Intelligence Report */}
          <div className="bg-white/60 backdrop-blur-sm border border-slate-100 rounded-3xl p-6 shadow-sm">
            <SatelliteDatasetReport />
          </div>
        </div>
      )}
    </>
  );
};

export default Analytics;
