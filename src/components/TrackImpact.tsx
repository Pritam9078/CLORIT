import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  TreePine,
  Leaf,
  Coins,
  Trophy,
  Mic,
  MicOff,
  Copy,
  Upload,
  ShieldCheck,
  Activity,
  Map as MapIcon,
  ChevronRight,
  Clock,
  AlertCircle,
  TrendingUp,
  History
} from 'lucide-react';

import CommunityLayout from './shared/CommunityLayout';
import CommunityCard from './shared/CommunityCard';
import { AuthUtils } from '../utils/auth';

type Project = {
  id: string;
  name: string;
  treesPlanted: number;
  co2Captured: number; // in tons
  status: "submitted" | "ngo" | "panchayat" | "admin" | "verified";
  createdAt: string;
};

const sampleProjects: Project[] = [
  {
    id: "p-001",
    name: "Mangrove Restoration - Bay Village",
    treesPlanted: 120,
    co2Captured: 1.8,
    status: "ngo",
    createdAt: "2025-07-14",
  },
  {
    id: "p-002",
    name: "Coastal Buffer - Sundarbans Fringe",
    treesPlanted: 450,
    co2Captured: 6.1,
    status: "panchayat",
    createdAt: "2025-06-01",
  },
  {
    id: "p-003",
    name: "Community Grove - Keralan Estuary",
    treesPlanted: 80,
    co2Captured: 0.9,
    status: "submitted",
    createdAt: "2025-08-28",
  },
];

export default function TrackImpact(): JSX.Element {
  const navigate = useNavigate();
  const [projects] = useState<Project[]>(sampleProjects);

  // Upload / Geo photos
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setUploadedFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  }

  // Simple sparkline data from sample projects
  const sparkData = useMemo(() => projects.map((p) => p.treesPlanted), [projects]);

  // Voice to text
  const [voiceText, setVoiceText] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

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

    // Setup speech recognition
    const w = window as any;
    const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const r = new SpeechRecognition();
    r.interimResults = true;
    r.lang = "en-IN";
    r.onresult = (ev: any) => {
      const transcript = Array.from(ev.results)
        .map((res: any) => res[0].transcript)
        .join(" ");
      setVoiceText(transcript);
    };
    r.onend = () => setListening(false);
    recognitionRef.current = r;
  }, []);

  function toggleListening() {
    const r = recognitionRef.current;
    if (!r) return alert("Voice recognition not supported in this browser.");
    if (listening) {
      r.stop();
    } else {
      try {
        r.start();
        setListening(true);
      } catch (e) {
        console.warn(e);
      }
    }
  }

  const getStatusConfig = (s: Project["status"]) => {
    switch (s) {
      case "submitted":
        return { text: "Submitted", color: "amber", icon: Clock };
      case "ngo":
        return { text: "NGO Review", color: "blue", icon: Activity };
      case "panchayat":
        return { text: "Panchayat", color: "indigo", icon: ShieldCheck };
      case "admin":
        return { text: "ADMIN", color: "violet", icon: ShieldCheck };
      case "verified":
        return { text: "Verified", color: "emerald", icon: CheckCircle };
    }
  };

  const stats = [
    { label: "Trees Planted", value: "730", icon: TreePine, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "CO₂ Captured", value: "9.2 tons", icon: Leaf, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Earnings", value: "₹24,500", icon: Coins, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Active Projects", value: projects.length, icon: Trophy, color: "text-violet-600", bg: "bg-violet-50" }
  ];

  return (
    <CommunityLayout>
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">Track Impact</h1>
        <p className="text-slate-500 max-w-2xl font-medium leading-relaxed">
          Monitor your plantation progress, review geo-tagged evidence, and track verification stages in real-time.
        </p>
      </div>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <CommunityCard key={idx} padding="normal" className="group">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm font-semibold mb-0.5">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-800 tracking-tight">{stat.value}</p>
                </div>
              </div>
            </CommunityCard>
          );
        })}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Visualization & Assets */}
        <div className="lg:col-span-8 space-y-8">
          {/* Map & Upload Seciton */}
          <CommunityCard title="Interactive Impact Explorer" icon={MapIcon} padding="large">
            <div className="aspect-video rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-4 mb-8">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                <MapIcon className="w-8 h-8" />
              </div>
              <p className="font-bold text-sm tracking-wide">MAP VISUALIZATION COMING SOON</p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Growth Trend</p>
                  <div className="flex items-center gap-3">
                    <Sparkline data={sparkData} />
                    <span className="text-emerald-600 font-black text-sm flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" /> +12%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <label className="flex-1 md:flex-none">
                  <input type="file" multiple accept="image/*" onChange={onFileChange} className="hidden" />
                  <span className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 text-slate-600 rounded-xl font-bold cursor-pointer hover:bg-slate-100 transition-all active:scale-95 text-sm whitespace-nowrap">
                    <Upload className="w-4 h-4" /> Upload Geophotos
                  </span>
                </label>
                <button
                  onClick={() => alert('Verification process initiated')}
                  className="flex-1 md:flex-none px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-200 active:scale-95 transition-all text-sm whitespace-nowrap"
                >
                  Verify Now
                </button>
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                {uploadedFiles.map((f, idx) => (
                  <div key={idx} className="aspect-square bg-white border border-slate-200 rounded-xl p-2 flex flex-col items-center justify-center text-center gap-2 shadow-sm animate-in zoom-in-50 duration-300">
                    <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <p className="text-[8px] font-bold text-slate-400 truncate w-full px-1">{f.name}</p>
                  </div>
                ))}
              </div>
            )}
          </CommunityCard>

          {/* Verification Timeline */}
          <CommunityCard title="Verification Milestones" icon={Clock} padding="large">
            <Timeline projects={projects} />
          </CommunityCard>
        </div>

        {/* Right Column: Tools & Feed */}
        <div className="lg:col-span-4 space-y-8">
          {/* Voice Command Card */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-emerald-500/40 transition-all duration-700" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 ${listening ? 'bg-red-500/20 border-red-500 animate-pulse' : 'bg-white/10 border-white/20'
                  }`}>
                  {listening ? <Mic className="w-6 h-6 text-red-500" /> : <Mic className="w-6 h-6 text-white" />}
                </div>
                <div>
                  <h4 className="font-black text-lg tracking-tight leading-none mb-1">Observation Voice Input</h4>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Accessibility Mode</p>
                </div>
              </div>

              <div className="space-y-4">
                <textarea
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-medium focus:bg-white/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-600 resize-none"
                  value={voiceText}
                  onChange={(e) => setVoiceText(e.target.value)}
                  placeholder="Tap record and speak your observation..."
                />

                <div className="flex gap-3">
                  <button
                    onClick={toggleListening}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm tracking-tight transition-all active:scale-95 ${listening ? 'bg-red-500 text-white shadow-lg shadow-red-900/40' : 'bg-white text-slate-900'
                      }`}
                  >
                    {listening ? 'Stop Recording' : 'Start Recording'}
                  </button>
                  <button
                    onClick={() => { navigator.clipboard?.writeText(voiceText); alert('Copied to clipboard'); }}
                    disabled={!voiceText}
                    className="px-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all disabled:opacity-30 flex items-center justify-center"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Project Activity List */}
          <CommunityCard title="Project Activity" icon={Activity}>
            <div className="space-y-4 mt-4">
              {projects.map((p) => (
                <div key={p.id} className="flex items-center gap-4 group p-1">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-xs text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                    {p.treesPlanted}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-slate-800 text-sm truncate group-hover:text-emerald-600 transition-colors">{p.name}</h5>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{p.createdAt}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${p.status === 'verified' ? 'bg-emerald-500' :
                      p.status === 'submitted' ? 'bg-amber-500' : 'bg-blue-500'
                    }`} />
                </div>
              ))}
            </div>
          </CommunityCard>

          {/* History Records */}
          <CommunityCard title="Historical Logs" icon={History}>
            <div className="mt-4 border border-slate-100 rounded-2xl overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">
                    <th className="px-4 py-3">Project</th>
                    <th className="px-4 py-3 text-right">Trees</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {projects.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 font-bold text-slate-700">{p.name}</td>
                      <td className="px-4 py-3 text-right font-black text-slate-900">{p.treesPlanted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CommunityCard>
        </div>
      </div>
    </CommunityLayout>
  );
}

// ----- HELPERS -----

function Sparkline({ data }: { data: number[] }) {
  const width = 120;
  const height = 30;
  if (!data || data.length === 0) return <div className="text-[10px] text-slate-300 font-bold uppercase">NO DATA</div>;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = max === min ? height / 2 : height - ((d - min) / (max - min)) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke="#10b981"
        strokeWidth={3}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Timeline({ projects }: { projects: Project[] }) {
  const stages = [
    { id: "submitted", label: "Signed" },
    { id: "ngo", label: "NGO Review" },
    { id: "panchayat", label: "Panchayat" },
    { id: "admin", label: "ADMIN Verify" },
    { id: "verified", label: "On Chain" }
  ];

  return (
    <div className="space-y-12 relative before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-0.5 before:bg-slate-100">
      {projects.map((p) => (
        <div key={p.id} className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded-full bg-white border-4 border-emerald-500 shadow-sm" />
            <div className="flex-1 flex items-center justify-between">
              <h5 className="font-black text-slate-800 tracking-tight">{p.name}</h5>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.createdAt}</span>
            </div>
          </div>

          <div className="ml-10 grid grid-cols-5 gap-2">
            {stages.map((stage, idx) => {
              const stagesIds = stages.map(s => s.id);
              const currentIndex = stagesIds.indexOf(p.status);
              const isActive = idx <= currentIndex;
              const isLastActive = idx === currentIndex;

              return (
                <div key={stage.id} className="group relative">
                  <div className={`h-2 rounded-full mb-2 transition-all duration-500 ${isActive ? 'bg-emerald-500' : 'bg-slate-100'
                    } ${isLastActive ? 'ring-4 ring-emerald-100' : ''}`} />
                  <p className={`text-[8px] font-black uppercase tracking-tight text-center truncate ${isActive ? 'text-emerald-600' : 'text-slate-300'
                    }`}>
                    {stage.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function CheckCircle(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
