import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NGOLayout from './shared/NGOLayout';
import NGOCard from './shared/NGOCard';
import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Search,
  MapPin,
  TreePine,
  FileText,
  Camera,
  Mic,
  MoreHorizontal,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';

const NGOVerification = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'pending' | 'verified' | 'rejected'>('pending');

  // Mock Data
  const verificationProjects = [
    {
      id: 'VER-001',
      community: 'Sundarbans Guardians',
      location: 'West Bengal',
      species: 'Rhizophora mucronata',
      count: 1500,
      date: 'Just now',
      status: 'pending',
      evidence: { photos: 12, drones: 3, audio: true }
    },
    {
      id: 'VER-002',
      community: 'Coastal Farmers Collective',
      location: 'Odisha',
      species: 'Avicennia marina',
      count: 850,
      date: '2 hours ago',
      status: 'pending',
      evidence: { photos: 8, drones: 1, audio: false }
    },
    {
      id: 'VER-003',
      community: 'Blue Delta Group',
      location: 'Kerala',
      species: 'Sonneratia alba',
      count: 2100,
      date: '1 day ago',
      status: 'verified',
      evidence: { photos: 25, drones: 5, audio: true }
    }
  ];

  const filteredProjects = verificationProjects.filter(p => p.status === activeTab);

  return (
    <NGOLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Verification <span className="text-cyan-600">Portal</span></h1>
          <p className="text-slate-500 font-medium">Review and validate community plantation data.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search ID or Community..."
              className="h-12 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-sm font-bold focus:border-cyan-500 outline-none w-64 shadow-sm"
            />
          </div>
          <button className="h-12 w-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-cyan-600 hover:border-cyan-200 shadow-sm transition-all">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Verification Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <button
          onClick={() => setActiveTab('pending')}
          className={`p-6 rounded-3xl border text-left transition-all ${activeTab === 'pending'
            ? 'bg-amber-50 border-amber-500 shadow-lg shadow-amber-500/10'
            : 'bg-white border-slate-200 hover:border-amber-200'
            }`}
        >
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-4">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-slate-800 mb-1">12</div>
          <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">Pending Review</div>
        </button>

        <button
          onClick={() => setActiveTab('verified')}
          className={`p-6 rounded-3xl border text-left transition-all ${activeTab === 'verified'
            ? 'bg-emerald-50 border-emerald-500 shadow-lg shadow-emerald-500/10'
            : 'bg-white border-slate-200 hover:border-emerald-200'
            }`}
        >
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-slate-800 mb-1">845</div>
          <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Verified Projects</div>
        </button>

        <button
          onClick={() => setActiveTab('rejected')}
          className={`p-6 rounded-3xl border text-left transition-all ${activeTab === 'rejected'
            ? 'bg-red-50 border-red-500 shadow-lg shadow-red-500/10'
            : 'bg-white border-slate-200 hover:border-red-200'
            }`}
        >
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-4">
            <XCircle className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-slate-800 mb-1">8</div>
          <div className="text-xs font-bold text-red-600 uppercase tracking-wider">Rejected / Flagged</div>
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <NGOCard key={project.id} className="hover:border-cyan-200 transition-all p-0 overflow-hidden">
            <div className="p-6 flex flex-col lg:flex-row items-center gap-6">
              {/* Icon & ID */}
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold shrink-0">
                  <TreePine className="w-8 h-8 opacity-50" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{project.community}</h3>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mt-1 uppercase tracking-wide">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">{project.id}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {project.location}</div>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Species</p>
                  <p className="font-bold text-slate-700 text-sm">{project.species}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Count</p>
                  <p className="font-bold text-slate-700 text-sm">{project.count.toLocaleString()} Trees</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Evidence</p>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Camera className="w-4 h-4" /> <span className="text-xs font-bold">{project.evidence.photos}</span>
                    {project.evidence.audio && <Mic className="w-4 h-4 text-cyan-500 ml-1" />}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Submitted</p>
                  <p className="font-bold text-slate-700 text-sm">{project.date}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 w-full lg:w-auto mt-4 lg:mt-0">
                <button className="flex-1 lg:flex-none px-6 py-3 bg-cyan-50 text-cyan-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-cyan-100 transition-colors border border-cyan-100">
                  Review
                </button>
                {activeTab === 'pending' && (
                  <>
                    <button className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center hover:bg-emerald-100 transition-colors border border-emerald-100" title="Verify">
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button className="h-10 w-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors border border-red-100" title="Reject">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </NGOCard>
        ))}
      </div>
    </NGOLayout>
  );
};

export default NGOVerification;
