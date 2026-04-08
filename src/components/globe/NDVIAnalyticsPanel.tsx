import React, { useEffect, useState } from 'react';
import { useNDVIStore } from '../../stores/useNDVIStore';
import { RegionData, getLiveRegionData } from '../../lib/mockBlockchainData';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { ShieldCheck, TrendingUp, AlertTriangle } from 'lucide-react';

export const NDVIAnalyticsPanel: React.FC = () => {
  const { selectedRegion, timeSliderValue } = useNDVIStore();
  const [data, setData] = useState<RegionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      setLoading(true);
      const res = await getLiveRegionData();
      if (active) {
        setData(res);
        setLoading(false);
      }
    };
    fetchData();
    // Simulate real-time polling
    const interval = setInterval(fetchData, 10000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [timeSliderValue]);

  const activeRegionData = selectedRegion 
    ? data.find(d => d.id === selectedRegion) 
    : null;

  return (
    <motion.div 
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="absolute top-24 right-6 w-96 max-h-[80vh] overflow-y-auto custom-scrollbar bg-slate-950/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 shadow-2xl z-40"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-bold tracking-tight">Analytics Engine</h3>
          <p className="text-slate-400 text-xs mt-1">Live from satellite relays</p>
        </div>
        <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Syncing</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-8 h-8 border-4 border-slate-700 border-t-green-500 rounded-full animate-spin mb-4" />
            <p className="text-slate-400 text-xs font-mono">Decrypting payload...</p>
          </motion.div>
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            
            {/* Status Card based on selection */}
            {activeRegionData ? (
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-4 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">Target Locked</span>
                    <h4 className="text-white font-bold text-lg">{activeRegionData.name}</h4>
                  </div>
                  {activeRegionData.status === 'Degraded' ? (
                    <div className="p-1.5 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30">
                      <AlertTriangle size={16} />
                    </div>
                  ) : (
                    <div className="p-1.5 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30">
                      <ShieldCheck size={16} />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
                     <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Health Index (NDVI)</p>
                     <p className={`text-xl font-black ${activeRegionData.ndvi < 0.4 ? 'text-red-400' : 'text-green-400'}`}>
                        {(activeRegionData.ndvi * 100).toFixed(1)}%
                     </p>
                  </div>
                  <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
                     <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Carbon Density</p>
                     <p className="text-xl font-black text-blue-400">
                        {activeRegionData.carbonDensity} <span className="text-sm font-normal text-slate-500">t/ha</span>
                     </p>
                  </div>
                </div>
              </div>
            ) : (
               <div className="bg-slate-900/30 border border-slate-700/30 border-dashed rounded-2xl p-6 mb-6 text-center">
                 <p className="text-slate-500 text-xs">Select a region on the globe to isolate local analytical data.</p>
               </div>
            )}

            {/* Global Stats Chart */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-slate-300 text-xs font-bold uppercase tracking-wider">National Mint Volume</h4>
                <TrendingUp size={14} className="text-slate-500" />
              </div>
              <div className="h-40 bg-slate-900/50 rounded-xl border border-slate-700/50 p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 9}} angle={-25} textAnchor="end" height={40} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                    <Tooltip 
                      cursor={{fill: '#1e293b'}}
                      contentStyle={{backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px', fontSize: '12px', color: '#fff'}} 
                    />
                    <Bar dataKey="creditsMinted" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Simulated Blockchain Log */}
            <div>
               <h4 className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-4">Recent Chain Events</h4>
               <div className="space-y-3">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex gap-3 items-start p-3 bg-slate-900/30 rounded-xl border border-slate-800/50">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                      <div>
                        <p className="text-xs text-white">Minted <span className="text-green-400 font-mono">140 CCT</span> for Odisha</p>
                        <p className="text-[10px] text-slate-500 font-mono mt-1">Tx: 0x48a...9f2b • 2 mins ago</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
