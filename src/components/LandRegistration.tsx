import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Map,
  Users,
  Compass,
  Layers,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Plus,
  AlertCircle,
  Clock,
  ShieldCheck,
  TreePine,
  Droplets
} from 'lucide-react';

import { AuthUtils } from '../utils/auth';
import CommunityLayout from './shared/CommunityLayout';
import CommunityCard from './shared/CommunityCard';

interface LandData {
  id: string;
  communityName: string;
  location: string;
  area: string;
  coordinates: string;
  registrationDate: string;
  status: string;
  ngoPartner: string;
}

const LandRegistration = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [newLandData, setNewLandData] = useState({
    communityName: '',
    location: '',
    area: '',
    coordinates: '',
    ngoPartner: '',
    vegetationStatus: '',
    soilType: '',
    waterAccess: ''
  });

  useEffect(() => {
    // Initialize mock user profile if not exists
    const currentUser = AuthUtils.getCurrentUser();
    if (!currentUser) {
      const mockUser = {
        id: 'community-001',
        name: 'Rajesh Kumar',
        email: 'community@example.com',
        role: 'community',
      };
      AuthUtils.saveUserProfile(mockUser);
    }
  }, []);

  const registeredLands: LandData[] = [
    {
      id: 'LAND-001',
      communityName: 'Sundarbans Fishing Community',
      location: 'West Bengal, India',
      area: '25.5 Ha',
      coordinates: '22.5°N, 89.0°E',
      registrationDate: '2024-01-15',
      status: 'Registered',
      ngoPartner: 'Marine Conservation Society'
    },
    {
      id: 'LAND-002',
      communityName: 'Coastal Farmers Collective',
      location: 'Odisha, India',
      area: '18.2 Ha',
      coordinates: '19.8°N, 85.8°E',
      registrationDate: '2024-02-10',
      status: 'Registered',
      ngoPartner: 'Blue Earth Foundation'
    },
    {
      id: 'LAND-003',
      communityName: 'Mangrove Restoration Group',
      location: 'Kerala, India',
      area: '12.8 Ha',
      coordinates: '9.9°N, 76.3°E',
      registrationDate: '2024-03-05',
      status: 'Pending Verification',
      ngoPartner: 'Coastal Care NGO'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setNewLandData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    console.log('Registering new land:', newLandData);
    alert('Land registration submitted successfully! Blockchain transaction initiated.');
    setIsRegistering(false);
    setCurrentStep(1);
    setNewLandData({
      communityName: '',
      location: '',
      area: '',
      coordinates: '',
      ngoPartner: '',
      vegetationStatus: '',
      soilType: '',
      waterAccess: ''
    });
  };

  const getStatusBadgeStyles = (status: string) => {
    if (status === 'Registered') {
      return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    }
    return 'bg-blue-50 text-blue-700 border-blue-100';
  };

  return (
    <CommunityLayout>
      {/* Page Header */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">
              Land Registration
            </h1>
            <p className="text-slate-500 max-w-2xl font-medium leading-relaxed">
              Register your restoration land on the blockchain for transparent record-keeping.
              Capture boundaries, coordinates, and initial vegetation status.
            </p>
          </div>

          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setCurrentStep(1);
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all shadow-lg active:scale-95 ${isRegistering
                ? 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                : 'bg-emerald-500 text-white shadow-emerald-200 hover:bg-emerald-600'
              }`}
          >
            {isRegistering ? (
              <>Cancel Registration</>
            ) : (
              <><Plus className="w-5 h-5" /> Register New Land</>
            )}
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      {!isRegistering && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <CommunityCard padding="small">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                <Map className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800 tracking-tight">3</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registered Lands</p>
              </div>
            </div>
          </CommunityCard>

          <CommunityCard padding="small">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800 tracking-tight">56.5</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Hectares</p>
              </div>
            </div>
          </CommunityCard>

          <CommunityCard padding="small">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800 tracking-tight">2</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active NGO Partners</p>
              </div>
            </div>
          </CommunityCard>
        </div>
      )}

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Registration Form (Conditionally shown) */}
        {isRegistering && (
          <div className="xl:col-span-8 animate-in slide-in-from-left-4 duration-500">
            <CommunityCard
              title="New Registration Explorer"
              icon={MapPin}
              padding="large"
              className="shadow-2xl shadow-emerald-500/5 ring-1 ring-emerald-100"
            >
              {/* Multi-step progress indicator */}
              <div className="flex items-center justify-between mb-12 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 -z-0" />
                {[1, 2, 3].map((step) => (
                  <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-4 ${currentStep === step
                        ? 'bg-emerald-500 text-white border-emerald-100 scale-110 shadow-lg'
                        : currentStep > step ? 'bg-emerald-100 text-emerald-600 border-white' : 'bg-white text-slate-400 border-slate-50'
                      }`}>
                      {currentStep > step ? <CheckCircle2 className="w-6 h-6" /> : step}
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${currentStep === step ? 'text-emerald-600' : 'text-slate-400'
                      }`}>
                      {step === 1 ? 'Location' : step === 2 ? 'Details' : 'Review'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Step 1: Location & Community */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Users className="w-4 h-4 text-emerald-500" /> Community Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Sundarbans Restoration Group"
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium"
                        value={newLandData.communityName}
                        onChange={(e) => handleInputChange('communityName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-500" /> Location
                      </label>
                      <input
                        type="text"
                        placeholder="State, District, Village"
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium"
                        value={newLandData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" /> NGO Partner
                    </label>
                    <div className="relative">
                      <select
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium appearance-none"
                        value={newLandData.ngoPartner}
                        onChange={(e) => handleInputChange('ngoPartner', e.target.value)}
                      >
                        <option value="">Select an NGO partner</option>
                        <option value="Marine Conservation Society">Marine Conservation Society</option>
                        <option value="Blue Earth Foundation">Blue Earth Foundation</option>
                        <option value="Coastal Care NGO">Coastal Care NGO</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ChevronRight className="rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Land Details */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-blue-500" /> Area (Hectares)
                      </label>
                      <input
                        type="number"
                        placeholder="Total land area"
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium"
                        value={newLandData.area}
                        onChange={(e) => handleInputChange('area', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Compass className="w-4 h-4 text-blue-500" /> GPS Coordinates
                      </label>
                      <input
                        type="text"
                        placeholder="Lat, Long coordinates"
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium"
                        value={newLandData.coordinates}
                        onChange={(e) => handleInputChange('coordinates', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-blue-500" /> Soil Type
                      </label>
                      <select
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium"
                        value={newLandData.soilType}
                        onChange={(e) => handleInputChange('soilType', e.target.value)}
                      >
                        <option value="">Select soil quality</option>
                        <option value="Sandy">Sandy</option>
                        <option value="Clay">Clay</option>
                        <option value="Muddy">Muddy</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Map className="w-4 h-4 text-blue-500" /> Water Access
                      </label>
                      <select
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium"
                        value={newLandData.waterAccess}
                        onChange={(e) => handleInputChange('waterAccess', e.target.value)}
                      >
                        <option value="">Select water availability</option>
                        <option value="High">High Tidal</option>
                        <option value="Medium">Medium Flow</option>
                        <option value="Low">Low Access</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Submit */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                  <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 space-y-4">
                    <h4 className="font-bold text-emerald-800 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" /> Review Information
                    </h4>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                      <div>
                        <p className="text-[10px] uppercase font-black text-emerald-600/50 tracking-widest">Community</p>
                        <p className="font-bold text-slate-800">{newLandData.communityName || '—'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black text-emerald-600/50 tracking-widest">Location</p>
                        <p className="font-bold text-slate-800">{newLandData.location || '—'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black text-emerald-600/50 tracking-widest">Area</p>
                        <p className="font-bold text-slate-800">{newLandData.area ? `${newLandData.area} Ha` : '—'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black text-emerald-600/50 tracking-widest">NGO Partner</p>
                        <p className="font-bold text-slate-800">{newLandData.ngoPartner || '—'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <TreePine className="w-4 h-4 text-emerald-500" /> Initial Vegetation Status
                    </label>
                    <textarea
                      placeholder="Describe current environmental state..."
                      className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium min-h-[120px]"
                      value={newLandData.vegetationStatus}
                      onChange={(e) => handleInputChange('vegetationStatus', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-50">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:bg-slate-50'
                    }`}
                >
                  <ChevronLeft className="w-5 h-5" /> Back
                </button>

                {currentStep < 3 ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center gap-2 px-8 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-200 active:scale-95 transition-all"
                  >
                    Continue <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-emerald-500/20 active:scale-[0.98] transition-all"
                  >
                    <ShieldCheck className="w-6 h-6" />
                    Register on Blockchain
                  </button>
                )}
              </div>
            </CommunityCard>
          </div>
        )}

        {/* Existing Lands Feed */}
        <div className={`${isRegistering ? 'xl:col-span-4' : 'xl:col-span-12'} space-y-8 animate-in slide-in-from-right-4 duration-500`}>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Registered Assets</h2>
            <div className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase">Official</div>
          </div>

          <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
            {registeredLands.map((land) => (
              <CommunityCard key={land.id} padding="normal" className="hover:ring-2 hover:ring-emerald-500/10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-emerald-500 border border-slate-100">
                      <TreePine className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 line-clamp-1">{land.communityName}</h4>
                      <p className="text-xs text-slate-400 font-bold flex items-center gap-1 uppercase tracking-tighter">
                        <MapPin className="w-3 h-3" /> {land.location}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase border transition-colors ${getStatusBadgeStyles(land.status)}`}>
                    {land.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Area</p>
                    <p className="text-sm font-bold text-slate-700">{land.area}</p>
                  </div>
                  <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Impact Partner</p>
                    <p className="text-sm font-bold text-slate-700 truncate">{land.ngoPartner}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-black text-slate-400 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> REGISTERED {land.registrationDate}
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-tighter">
                    <ShieldCheck className="w-3 h-3" /> Blockchain Verified
                  </div>
                </div>
              </CommunityCard>
            ))}
          </div>

          {/* Help Card */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-emerald-500/20 transition-all duration-700" />
            <div className="relative z-10">
              <h4 className="text-xl font-black mb-4 tracking-tight">Need Assistance?</h4>
              <p className="text-slate-400 text-sm mb-6 font-medium leading-relaxed">
                If you're unsure about coordinates or area measurement, contact your NGO partner for support.
              </p>
              <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 rounded-2xl font-black transition-all shadow-lg shadow-emerald-900/40 text-sm tracking-wide">
                GET SUPPORT NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default LandRegistration;
