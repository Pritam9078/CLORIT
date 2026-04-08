import React from 'react';
import { useNavigate } from 'react-router-dom';
import PanchayatLayout from './shared/PanchayatLayout';
import PanchayatCard from './shared/PanchayatCard';
import {
  Users,
  MapPin,
  FileCheck,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Building2,
  BarChart3
} from 'lucide-react';

const PanchayatAdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Communities', value: '12', icon: Users, color: 'from-purple-500 to-violet-600', trend: '+3 this month' },
    { label: 'Pending Verifications', value: '8', icon: Clock, color: 'from-amber-500 to-orange-600', trend: 'Requires action', alert: true },
    { label: 'Verified Projects', value: '45', icon: CheckCircle2, color: 'from-emerald-500 to-teal-600', trend: '89% approval rate' },
    { label: 'Total Area', value: '234 ha', icon: MapPin, color: 'from-indigo-500 to-purple-600', trend: 'Verified land' },
  ];

  const pendingActions = [
    { id: 1, type: 'Land Verification', community: 'Sundarbans Group A', area: '12.5 ha', days: 3, priority: 'high' },
    { id: 2, type: 'Land Verification', community: 'Coastal Defenders', area: '8.3 ha', days: 1, priority: 'urgent' },
    { id: 3, type: 'Community Registration', community: 'Mangrove Protectors', area: '15.2 ha', days: 5, priority: 'medium' },
    { id: 4, type: 'Project Approval', community: 'Blue Carbon Initiative', area: '20.1 ha', days: 2, priority: 'high' },
  ];

  const recentActivity = [
    { action: 'Verified land parcel', community: 'Ocean Guardians', time: '2 hours ago', status: 'approved' },
    { action: 'Rejected registration', community: 'Test Community', time: '5 hours ago', status: 'rejected' },
    { action: 'Approved project submission', community: 'Coastal Team', time: '1 day ago', status: 'approved' },
    { action: 'Verified land ownership', community: 'Mangrove Heroes', time: '2 days ago', status: 'approved' },
  ];

  return (
    <PanchayatLayout>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
          Panchayat <span className="text-purple-600">Dashboard</span>
        </h1>
        <p className="text-slate-500 font-medium text-lg">
          Manage land verification and community oversight
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <PanchayatCard key={index} className="relative overflow-hidden group hover:scale-105 transition-transform">
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -mr-8 -mt-8 blur-2xl group-hover:opacity-20 transition-opacity`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {stat.alert && (
                    <span className="px-2 py-1 bg-red-50 text-red-600 text-[10px] font-black uppercase rounded-lg border border-red-100 animate-pulse">
                      Alert
                    </span>
                  )}
                </div>

                <div className="text-3xl font-black text-slate-800 mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{stat.label}</div>
                <div className="text-xs text-purple-600 font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </div>
              </div>
            </PanchayatCard>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending Actions Queue */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black text-slate-800">Pending Actions</h2>
            <button
              onClick={() => navigate('/panchayat-land-verification')}
              className="text-sm font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {pendingActions.map((action) => (
              <PanchayatCard key={action.id} className="hover:border-purple-300 transition-all cursor-pointer group">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-black text-slate-800">{action.type}</h3>
                        <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded ${action.priority === 'urgent' ? 'bg-red-50 text-red-600 border border-red-100' :
                            action.priority === 'high' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                              'bg-blue-50 text-blue-600 border border-blue-100'
                          }`}>
                          {action.priority}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mb-2">{action.community}</p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded">
                          {action.area}
                        </span>
                        <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded">
                          Pending {action.days} days
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/panchayat-land-verification')}
                    className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    Review
                  </button>
                </div>
              </PanchayatCard>
            ))}
          </div>

          <button
            onClick={() => navigate('/panchayat-land-verification')}
            className="w-full py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
          >
            View All Pending Actions <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Recent Activity Timeline */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-slate-800 mb-4">Recent Activity</h2>

          <PanchayatCard>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="relative pl-6 pb-6 last:pb-0">
                  {index !== recentActivity.length - 1 && (
                    <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-slate-100" />
                  )}
                  <div className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-white ${activity.status === 'approved' ? 'bg-emerald-500' : 'bg-red-500'
                    } shadow-md`} />

                  <div>
                    <p className="text-sm font-bold text-slate-800 mb-1">{activity.action}</p>
                    <p className="text-xs text-slate-500 mb-1">{activity.community}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </PanchayatCard>

          {/* Quick Actions */}
          <PanchayatCard className="bg-gradient-to-br from-purple-500 to-violet-600 border-none text-white">
            <h3 className="font-black text-lg mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/panchayat-communities')}
                className="w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-sm font-bold transition-colors flex items-center justify-between px-4"
              >
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" /> View Communities
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/panchayat-reports')}
                className="w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-sm font-bold transition-colors flex items-center justify-between px-4"
              >
                <span className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" /> Generate Report
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/panchayat-settings')}
                className="w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-sm font-bold transition-colors flex items-center justify-between px-4"
              >
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Settings
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </PanchayatCard>
        </div>
      </div>
    </PanchayatLayout>
  );
};

export default PanchayatAdminDashboard;
