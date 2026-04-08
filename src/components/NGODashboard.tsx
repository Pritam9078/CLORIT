import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NGOLayout from './shared/NGOLayout';
import NGOCard from './shared/NGOCard';
import {
  LayoutDashboard,
  TreePine,
  Wind,
  Droplets,
  ArrowUpRight,
  TrendingUp,
  Globe,
  Users,
  ChevronRight,
  Calendar,
  MapPin,
  AlertCircle
} from 'lucide-react';

const NGODashboard = () => {
  const navigate = useNavigate();

  // Mock Data
  const stats = [
    { label: 'Active Projects', value: '12', change: '+2', trend: 'up', icon: TreePine, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'CO2 Verified', value: '4,520 t', change: '+12%', trend: 'up', icon: Wind, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Funds Deployed', value: '$85.2K', change: '+5%', trend: 'up', icon: TrendingUp, color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { label: 'Community Partners', value: '8', change: 'Stable', trend: 'neutral', icon: Users, color: 'text-violet-500', bg: 'bg-violet-50' },
  ];

  const projects = [
    { id: 1, name: "Sundarbans Restoration Phase 2", location: "West Bengal, India", status: "Active", progress: 65, nextAction: "Verify Satellite Data" },
    { id: 2, name: "Coastal Mangrove Wall", location: "Odisha, India", status: "Pending Review", progress: 100, nextAction: "Submit Final Report" },
    { id: 3, name: "Blue Carbon Pilot", location: "Kerala, India", status: "Planning", progress: 15, nextAction: "Approve Budget" },
  ];

  return (
    <NGOLayout>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">NGO <span className="text-cyan-600">Dashboard</span></h1>
        <p className="text-slate-500 font-medium text-lg">Manage your conservation portfolio and verify community impact.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <NGOCard key={i} className="relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20 -mr-8 -mt-8 transition-transform group-hover:scale-150 ${stat.bg.replace('bg-', 'bg-')}`} />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} shadow-sm`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'}`}>
                  {stat.change} {stat.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                </div>
              </div>
              <h3 className="text-3xl font-black text-slate-800 mb-1 tracking-tight">{stat.value}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          </NGOCard>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Active Projects (Left - Larger) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-800">Priority Projects</h2>
            <button className="text-sm font-bold text-cyan-600 hover:text-cyan-700 transition-colors">View All</button>
          </div>

          {projects.map((project) => (
            <NGOCard key={project.id} className="group hover:border-cyan-200 transition-all">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-600 font-bold text-lg shadow-sm group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                    {project.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg group-hover:text-cyan-700 transition-colors">{project.name}</h3>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mt-1">
                      <MapPin className="w-3 h-3" /> {project.location}
                    </div>
                  </div>
                </div>

                <div className="flex-1 w-full md:w-auto md:px-8">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-slate-500">Progress</span>
                    <span className="text-cyan-600">{project.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-500 rounded-full transition-all duration-1000 group-hover:bg-cyan-400"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <button className="shrink-0 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-wide hover:bg-cyan-50 hover:text-cyan-600 transition-colors border border-slate-100">
                  {project.status}
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-500 bg-amber-50 px-3 py-1.5 rounded-lg">
                  <AlertCircle className="w-3 h-3" /> Next: {project.nextAction}
                </div>
                <button className="text-xs font-bold text-slate-400 hover:text-cyan-600 flex items-center gap-1 transition-colors">
                  Manage Project <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </NGOCard>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Action Center */}
          <NGOCard className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white border-none shadow-cyan-500/30">
            <h2 className="text-lg font-black mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/ngo-verification')}
                className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold text-left backdrop-blur-sm transition-all flex items-center justify-between border border-white/10"
              >
                Verify New Data <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
              <button className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold text-left backdrop-blur-sm transition-all flex items-center justify-between border border-white/10">
                Create Report <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
              <button className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold text-left backdrop-blur-sm transition-all flex items-center justify-between border border-white/10">
                Invite Community <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            </div>
          </NGOCard>

          {/* Upcoming Deadlines */}
          <NGOCard>
            <h2 className="text-lg font-black text-slate-800 mb-4">Upcoming Deadlines</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex flex-col items-center justify-center text-red-500 shrink-0">
                  <span className="text-[10px] font-black uppercase">JAN</span>
                  <span className="text-xl font-black leading-none">15</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Q4 Impact Report</h4>
                  <p className="text-xs text-slate-400 mt-1">Submission required for ADMIN verification.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex flex-col items-center justify-center text-orange-500 shrink-0">
                  <span className="text-[10px] font-black uppercase">FEB</span>
                  <span className="text-xl font-black leading-none">01</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Grant Renewal</h4>
                  <p className="text-xs text-slate-400 mt-1">Review application for Coastal Defense Fund.</p>
                </div>
              </div>
            </div>
          </NGOCard>
        </div>

      </div>
    </NGOLayout>
  );
};

export default NGODashboard;
