import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Leaf, MapPin, Ruler, BarChart3, Info } from 'lucide-react';
import { useProjectStore } from '../../../state/projectStore';
import { useAuthStore } from '../../../state/authStore';
import { Button } from '../../ui/button';
import { toast } from 'sonner';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({ isOpen, onClose }) => {
  const { addProject } = useProjectStore();
  const { currentUser } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    area: '',
    estimatedNdvi: '0.65',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location || !formData.area) {
      toast.error('Please fill in all required fields');
      return;
    }

    const areaNum = parseFloat(formData.area);
    const ndviNum = parseFloat(formData.estimatedNdvi);
    
    // Rough calculation for simulation: Area * NDVI * 10
    const carbonCredits = Math.round(areaNum * ndviNum * 25);

    addProject({
      name: formData.name,
      location: formData.location,
      area: areaNum,
      ndviValue: ndviNum,
      carbonCredits,
      ngoName: currentUser?.fullName || 'Anonymous NGO',
      ngoId: currentUser?.id || 'ngo-1',
      status: 'submitted'
    });

    toast.success('Project submitted successfully!');
    onClose();
    setFormData({ name: '', location: '', area: '', estimatedNdvi: '0.65' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-xl rounded-[32px] shadow-2xl overflow-hidden border border-slate-200"
          >
            {/* Header */}
            <div className="p-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                  <Leaf className="w-6 h-6" /> Submit New Project
                </h2>
                <p className="text-emerald-50/80 text-sm mt-1 font-medium italic">Initiate your blue carbon restoration movement</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Project Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                   Project Name <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                    <Info className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="e.g., Sunderbans Mangrove Initiative"
                    className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-4 text-slate-900 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-medium"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                     Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      placeholder="City, State"
                      className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-4 text-slate-900 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-medium"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>

                {/* Area */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                     Area (Hectares) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                      <Ruler className="w-5 h-5" />
                    </div>
                    <input
                      type="number"
                      placeholder="e.g., 45.5"
                      className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-4 text-slate-900 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-medium"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Estimated NDVI */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                   Initial NDVI Baseline (0.0 - 1.0)
                </label>
                <div className="flex gap-4 items-center p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                    <BarChart3 className="w-6 h-6 text-emerald-600" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      className="flex-1 accent-emerald-600 h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer"
                      value={formData.estimatedNdvi}
                      onChange={(e) => setFormData({ ...formData, estimatedNdvi: e.target.value })}
                    />
                    <span className="font-black text-emerald-700 w-12 text-center text-lg">{formData.estimatedNdvi}</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  className="flex-1 py-7 rounded-2xl font-bold border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 py-7 rounded-2xl font-black text-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                >
                  Submit Project
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NewProjectModal;
