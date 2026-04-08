import React, { useState, useEffect } from 'react';
import {
  TreePine,
  MapPin,
  Waves,
  Camera,
  Mic,
  Send,
  CheckCircle2,
  ListTodo,
  AlertCircle,
  FileText,
  Clock,
  ChevronRight,
  Plus
} from 'lucide-react';

import CommunityLayout from './shared/CommunityLayout';
import CommunityCard from './shared/CommunityCard';

interface PlantationEntry {
  id: string;
  species: string;
  area: string;
  plantationDate: string;
  location: string;
  seedlings: number;
  photos: number;
  status: string;
  gpsCoordinates: string;
}

const PlantationDataInput = () => {
  const [currentTab, setCurrentTab] = useState('data-entry');
  const [formData, setFormData] = useState({
    landId: '',
    species: '',
    seedlingCount: '',
    area: '',
    plantationDate: '',
    gpsCoordinates: '',
    soilCondition: '',
    waterLevel: '',
    fieldNotes: '',
    photos: [] as File[],
    droneImages: [] as File[],
    voiceNotes: null as File | null
  });
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const registeredLands = [
    { id: 'LAND-001', name: 'Sundarbans Fishing Community' },
    { id: 'LAND-002', name: 'Coastal Farmers Collective' },
    { id: 'LAND-003', name: 'Mangrove Restoration Group' }
  ];

  const mangroveSpecies = [
    { name: 'Rhizophora mucronata', common: 'True Mangrove' },
    { name: 'Avicennia marina', common: 'Grey Mangrove' },
    { name: 'Sonneratia apetala', common: 'Mangrove Apple' },
    { name: 'Bruguiera gymnorrhiza', common: 'Large-leafed Mangrove' },
    { name: 'Ceriops decandra', common: 'Yellow Mangrove' },
    { name: 'Heritiera fomes', common: 'Sundari' },
    { name: 'Xylocarpus granatum', common: 'Cannonball Mangrove' }
  ];

  const plantationEntries: PlantationEntry[] = [
    {
      id: 'PLT-001',
      species: 'Rhizophora mucronata',
      area: '2.5 Ha',
      plantationDate: '2024-03-15',
      location: 'Block A1',
      seedlings: 1500,
      photos: 12,
      status: 'Verified',
      gpsCoordinates: '22.5°N, 89.0°E'
    },
    {
      id: 'PLT-002',
      species: 'Avicennia marina',
      area: '1.8 Ha',
      plantationDate: '2024-03-20',
      location: 'Block B2',
      seedlings: 900,
      photos: 8,
      status: 'Processing',
      gpsCoordinates: '22.4°N, 89.1°E'
    }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setFormData(prev => ({ ...prev, [field]: fileArray }));
    }
  };

  const calculateProgress = () => {
    const requiredFields = ['landId', 'species', 'seedlingCount', 'area', 'plantationDate'];
    const filledFields = requiredFields.filter(field => formData[field as keyof typeof formData]).length;
    return (filledFields / requiredFields.length) * 100;
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Plantation data submitted successfully! Data secured on blockchain with ID: 0x' + Math.random().toString(16).substr(2, 8));
      setIsSubmitting(false);
      setFormData({
        landId: '',
        species: '',
        seedlingCount: '',
        area: '',
        plantationDate: '',
        gpsCoordinates: '',
        soilCondition: '',
        waterLevel: '',
        fieldNotes: '',
        photos: [],
        droneImages: [],
        voiceNotes: null
      });
    }, 2000);
  };

  return (
    <CommunityLayout>
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">Plantation Data Input</h1>
          <p className="text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
            Record your restoration activities directly from the field with geo-tagged evidence.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-100/50 p-1.5 rounded-2xl mb-10 w-fit mx-auto border border-slate-200">
          <button
            onClick={() => setCurrentTab('data-entry')}
            className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${currentTab === 'data-entry'
                ? 'bg-white text-emerald-600 shadow-sm border border-slate-200'
                : 'text-slate-400 hover:text-slate-600'
              }`}
          >
            📝 DATA ENTRY
          </button>
          <button
            onClick={() => setCurrentTab('my-entries')}
            className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${currentTab === 'my-entries'
                ? 'bg-white text-emerald-600 shadow-sm border border-slate-200'
                : 'text-slate-400 hover:text-slate-600'
              }`}
          >
            📋 MY ENTRIES
          </button>
        </div>

        {currentTab === 'data-entry' ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
            {/* Progress Bar Component */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Entry Progress</span>
                <span className="text-sm font-black text-emerald-600">{Math.round(calculateProgress())}%</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-700 ease-out"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
            </div>

            {/* Form Section: Basic Information */}
            <CommunityCard title="Baseline Information" icon={TreePine} padding="large">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Registered Land *</label>
                  <select
                    value={formData.landId}
                    onChange={(e) => handleInputChange('landId', e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border-2 border-slate-100 bg-slate-50 font-bold text-slate-700 focus:border-emerald-500 focus:bg-white outline-none transition-all"
                  >
                    <option value="">Select Land</option>
                    {registeredLands.map(land => (
                      <option key={land.id} value={land.id}>{land.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Plantation Date *</label>
                  <input
                    type="date"
                    value={formData.plantationDate}
                    onChange={(e) => handleInputChange('plantationDate', e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border-2 border-slate-100 bg-slate-50 font-bold text-slate-700 focus:border-emerald-500 focus:bg-white outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Seedlings Planted *</label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="e.g. 500"
                      value={formData.seedlingCount}
                      onChange={(e) => handleInputChange('seedlingCount', e.target.value)}
                      className="w-full h-12 pl-4 pr-12 rounded-xl border-2 border-slate-100 bg-slate-50 font-bold text-slate-700 focus:border-emerald-500 focus:bg-white outline-none transition-all"
                    />
                    <TreePine className="absolute right-4 top-3.5 w-5 h-5 text-slate-300" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Area (Hectares) *</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 1.5"
                    value={formData.area}
                    onChange={(e) => handleInputChange('area', e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border-2 border-slate-100 bg-slate-50 font-bold text-slate-700 focus:border-emerald-500 focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="mt-8">
                <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1 mb-3 block">Species Verification *</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {mangroveSpecies.slice(0, 4).map((s) => (
                    <button
                      key={s.name}
                      onClick={() => handleInputChange('species', s.name)}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-2 ${formData.species === s.name
                          ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                          : 'border-slate-100 bg-white hover:border-slate-200'
                        }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${formData.species === s.name ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-400'}`}>
                        <Plus className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-black leading-tight uppercase tracking-tighter">{s.common}</span>
                    </button>
                  ))}
                  <button className="p-4 rounded-2xl border-2 border-slate-100 border-dashed hover:border-slate-200 transition-all flex flex-col items-center justify-center text-slate-400 gap-1 mt-auto">
                    <span className="text-[10px] font-black uppercase tracking-tight">OTHERS</span>
                  </button>
                </div>
              </div>
            </CommunityCard>

            {/* Section: Environmental & Documentation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <CommunityCard title="Field Environment" icon={Waves}>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-wider">Soil Condition</label>
                    <select
                      value={formData.soilCondition}
                      onChange={(e) => handleInputChange('soilCondition', e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border-2 border-slate-100 bg-slate-50 font-bold text-slate-700 focus:border-emerald-500 outline-none transition-all"
                    >
                      <option value="">Select Condition</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-wider">Tide Context</label>
                    <select
                      value={formData.waterLevel}
                      onChange={(e) => handleInputChange('waterLevel', e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border-2 border-slate-100 bg-slate-50 font-bold text-slate-700 focus:border-emerald-500 outline-none transition-all"
                    >
                      <option value="">Select Level</option>
                      <option value="High Tide">High Tide</option>
                      <option value="Low Tide">Low Tide</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-wider">GPS Evidence</label>
                    <div className="h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center px-4 gap-3 text-blue-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs font-black tracking-widest">{formData.gpsCoordinates || "WAITING FOR SIGNAL..."}</span>
                    </div>
                  </div>
                </div>
              </CommunityCard>

              <CommunityCard title="Documentation" icon={Camera}>
                <div className="grid grid-cols-1 gap-4">
                  <label className="cursor-pointer group">
                    <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleFileUpload('photos', e.target.files)} />
                    <div className="h-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-1 group-hover:border-emerald-500 group-hover:bg-emerald-50 transition-all">
                      <Camera className="w-6 h-6 text-slate-300 group-hover:text-emerald-500" />
                      <span className="text-[10px] font-black text-slate-400 uppercase group-hover:text-emerald-600">
                        {formData.photos.length > 0 ? `${formData.photos.length} PHOTOS READY` : "UPLOAD SITE PHOTOS"}
                      </span>
                    </div>
                  </label>

                  <button
                    onClick={() => setIsVoiceRecording(!isVoiceRecording)}
                    className={`h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${isVoiceRecording
                        ? 'bg-red-50 border-red-500 animate-pulse'
                        : 'bg-slate-50 border-slate-100 hover:border-slate-200'
                      }`}
                  >
                    <Mic className={`w-6 h-6 ${isVoiceRecording ? 'text-red-500' : 'text-slate-300'}`} />
                    <span className={`text-[10px] font-black uppercase ${isVoiceRecording ? 'text-red-600' : 'text-slate-400'}`}>
                      {isVoiceRecording ? "STOP RECORDING" : "TAP TO RECORD NOTES"}
                    </span>
                  </button>
                </div>
              </CommunityCard>
            </div>

            {/* Submission CTA */}
            <div className="flex flex-col gap-4 mt-8">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || calculateProgress() < 100}
                className={`w-full py-5 rounded-[2rem] font-black text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 ${calculateProgress() === 100
                    ? 'bg-emerald-500 text-white shadow-emerald-200 hover:bg-emerald-600'
                    : 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200'
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    <span>SECURING ON BLOCKCHAIN...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>SUBMIT RECOVERY DATA</span>
                  </>
                )}
              </button>
              <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <AlertCircle className="w-3 h-3 inline mr-1 mb-0.5" /> Data will be verified by ADMIN within 48 hours
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
            {plantationEntries.map((entry) => (
              <CommunityCard key={entry.id} padding="normal" className="group">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="font-black text-slate-800 tracking-tight text-lg mb-1 group-hover:text-emerald-600 transition-colors">{entry.species}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Clock className="w-3 h-3" /> {entry.plantationDate}
                    </p>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${entry.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                    {entry.status}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-tight mb-1">AREA</p>
                    <p className="text-xs font-black text-slate-700">{entry.area}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-tight mb-1">TREES</p>
                    <p className="text-xs font-black text-slate-700">{entry.seedlings}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-tight mb-1">PHOTOS</p>
                    <p className="text-xs font-black text-slate-700">{entry.photos}📸</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-slate-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    <span className="text-[10px] font-black tracking-tight">{entry.location}</span>
                  </div>
                  <button className="flex items-center gap-1 text-[10px] font-black text-emerald-600 hover:gap-2 transition-all">
                    VIEW REPORT <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </CommunityCard>
            ))}

            <button className="border-4 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center p-8 gap-3 group hover:border-emerald-200 transition-all">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-emerald-50 transition-all">
                <Plus className="w-8 h-8 text-slate-200 group-hover:text-emerald-500" />
              </div>
              <p className="text-xs font-black text-slate-300 group-hover:text-emerald-600 transition-colors uppercase tracking-widest">New Entry</p>
            </button>
          </div>
        )}
      </div>
    </CommunityLayout>
  );
};

export default PlantationDataInput;
