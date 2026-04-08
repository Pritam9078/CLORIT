import React, { useState } from 'react';
import { useNDVIStore, LayerType } from '../../stores/useNDVIStore';
import { Layers, ThermometerSun, Leaf, Activity, Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

// Map of searchable region names → store IDs
const REGION_INDEX: { keywords: string[]; id: string; label: string }[] = [
  { keywords: ['west bengal', 'bengal', 'wb', 'sundarban', 'kolkata', 'delta'], id: 'reg-wb', label: 'West Bengal Delta' },
  { keywords: ['kerala', 'ghats', 'kl', 'kochi', 'calicut', 'trivandrum', 'backwater'], id: 'reg-kl', label: 'Kerala Ghats' },
  { keywords: ['odisha', 'orissa', 'od', 'bhubaneswar', 'coast', 'puri'], id: 'reg-od', label: 'Odisha Coast' },
  { keywords: ['tamil nadu', 'tn', 'chennai', 'reserve', 'madurai'], id: 'reg-tn', label: 'Tamil Nadu Reserve' },
  { keywords: ['gujarat', 'gj', 'ahmedabad', 'arid', 'kutch', 'saurashtra'], id: 'reg-gj', label: 'Gujarat Arid Zone' },
];

function findRegion(query: string): { id: string; label: string } | null {
  const q = query.toLowerCase().trim();
  if (!q) return null;
  for (const region of REGION_INDEX) {
    if (region.keywords.some(k => q.includes(k) || k.includes(q))) {
      return { id: region.id, label: region.label };
    }
  }
  return null;
}

export const NDVIControls: React.FC = () => {
  const { activeLayer, setActiveLayer, timeSliderValue, setTimeSliderValue, setSelectedRegion, selectedRegion } = useNDVIStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<{ id: string; label: string } | null>(null);
  const [searchError, setSearchError] = useState(false);

  const layers: { id: LayerType; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'NDVI', label: 'Vegetation (NDVI)', icon: <Leaf size={16} />, color: 'text-green-400' },
    { id: 'Temperature', label: 'Surface Temp', icon: <ThermometerSun size={16} />, color: 'text-orange-400' },
    { id: 'Carbon', label: 'Carbon Density', icon: <Layers size={16} />, color: 'text-blue-400' },
    { id: 'Deforestation', label: 'Deforestation Risk', icon: <Activity size={16} />, color: 'text-red-400' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const match = findRegion(searchQuery);
    if (match) {
      setSearchResult(match);
      setSelectedRegion(match.id);
      setSearchError(false);
    } else {
      setSearchResult(null);
      setSearchError(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResult(null);
    setSearchError(false);
    setSelectedRegion(null);
  };

  return (
    <motion.div 
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="absolute top-24 left-6 w-80 bg-slate-950/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 shadow-2xl z-40"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-500/20 rounded-lg">
          <Layers className="text-green-400 w-5 h-5" />
        </div>
        <div>
          <h3 className="text-white font-bold tracking-tight">Data Layers</h3>
          <p className="text-slate-400 text-xs">Switch satellite feeds</p>
        </div>
      </div>

      <div className="space-y-3">
        {layers.map((layer) => (
          <button
            key={layer.id}
            onClick={() => setActiveLayer(layer.id)}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all border ${
              activeLayer === layer.id 
                ? 'bg-white/10 border-white/20 shadow-lg shadow-black/20' 
                : 'bg-transparent border-transparent hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={layer.color}>{layer.icon}</span>
              <span className={`text-sm font-semibold ${activeLayer === layer.id ? 'text-white' : 'text-slate-300'}`}>
                {layer.label}
              </span>
            </div>
            {activeLayer === layer.id && (
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Region Search — now functional */}
      <div className="mt-8">
        <h4 className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-4">Region Search</h4>
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchError(false);
                if (!e.target.value) clearSearch();
              }}
              placeholder="West Bengal, Kerala, Odisha..."
              className={`w-full bg-slate-900/50 border rounded-xl py-2.5 pl-10 pr-9 text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all ${
                searchError
                  ? 'border-red-500/50 focus:border-red-500/70 focus:ring-1 focus:ring-red-500/50'
                  : searchResult
                  ? 'border-green-500/50 focus:border-green-500/70 focus:ring-1 focus:ring-green-500/50'
                  : 'border-slate-700/50 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50'
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-2 rounded-xl bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider border border-green-500/30 hover:bg-green-500/30 transition-all"
          >
            Search Region
          </button>
        </form>

        {/* Search feedback */}
        {searchResult && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-xl"
          >
            <p className="text-[10px] text-green-400 uppercase font-bold tracking-wider mb-0.5">Target Locked</p>
            <p className="text-sm text-white font-semibold">{searchResult.label}</p>
            <p className="text-[10px] text-slate-400 mt-1">Analytics panel updated →</p>
          </motion.div>
        )}

        {searchError && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-xl"
          >
            <p className="text-xs text-red-400">Region not found. Try: West Bengal, Kerala, Odisha, Tamil Nadu, Gujarat</p>
          </motion.div>
        )}

        {/* Quick suggestion pills */}
        {!searchResult && !searchError && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {['West Bengal', 'Kerala', 'Odisha', 'Tamil Nadu', 'Gujarat'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSearchQuery(s);
                  const match = findRegion(s);
                  if (match) {
                    setSearchResult(match);
                    setSelectedRegion(match.id);
                    setSearchError(false);
                  }
                }}
                className="px-2 py-1 text-[10px] text-slate-400 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-green-500/40 hover:text-green-400 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-slate-300 text-xs font-bold uppercase tracking-wider">Time Slider</h4>
          <span className="text-green-400 font-mono text-xs">{timeSliderValue}</span>
        </div>
        <input 
          type="range" 
          min="2010" 
          max="2026" 
          value={timeSliderValue}
          onChange={(e) => setTimeSliderValue(parseInt(e.target.value))}
          className="w-full accent-green-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
          <span>2010</span>
          <span>PRESENT</span>
        </div>
      </div>
    </motion.div>
  );
};
