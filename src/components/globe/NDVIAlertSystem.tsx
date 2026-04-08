import React, { useEffect } from 'react';
import { useNDVIStore } from '../../stores/useNDVIStore';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { getLiveRegionData } from '../../lib/mockBlockchainData';

export const NDVIAlertSystem: React.FC = () => {
  const { alerts, addAlert, setTimeSliderValue, timeSliderValue } = useNDVIStore();

  useEffect(() => {
    // Simulate detecting anomalies when syncing data
    const checkForAnomalies = async () => {
      const data = await getLiveRegionData();
      const degradedRegions = data.filter(r => r.status === 'Degraded');
      
      degradedRegions.forEach(region => {
        const msg = `CRITICAL: NDVI dropped to ${(region.ndvi * 100).toFixed(1)}% in ${region.name}. Immediate review required.`;
        if (!alerts.includes(msg)) {
          addAlert(msg);
        }
      });
    };

    if (timeSliderValue === 2026) {
      checkForAnomalies();
    }
  }, [timeSliderValue]);

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50 pointer-events-none">
      <AnimatePresence>
        {alerts.map((alert, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.9 }}
            className="pointer-events-auto flex items-center gap-3 bg-red-950/80 backdrop-blur-md border border-red-500/50 text-white p-4 rounded-2xl shadow-2xl shadow-red-900/30 w-[450px]"
          >
            <div className="p-2 bg-red-500/20 rounded-full animate-pulse border border-red-500/50">
              <AlertTriangle className="text-red-400 w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-red-300 uppercase font-black tracking-widest mb-0.5">Ecological Alert</p>
              <p className="text-sm font-medium">{alert}</p>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              <X size={16} className="text-slate-400 group-hover:text-white" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
