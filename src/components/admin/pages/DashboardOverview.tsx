import React from 'react';
import { 
  Users, 
  MapPin, 
  ShieldCheck, 
  Coins, 
  TrendingUp, 
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import KPIBox from '../shared/KPIBox';
import ChartCard from '../shared/ChartCard';
import ActivityFeed from '../shared/ActivityFeed';
import AlertPanel from '../shared/AlertPanel';
import { useAuthStore } from '../../../state/authStore';

const data = [
  { name: 'Jan', credits: 400, rate: 24, volume: 2400 },
  { name: 'Feb', credits: 300, rate: 13, volume: 2210 },
  { name: 'Mar', credits: 200, rate: 98, volume: 2290 },
  { name: 'Apr', credits: 278, rate: 39, volume: 2000 },
  { name: 'May', credits: 189, rate: 48, volume: 2181 },
  { name: 'Jun', credits: 239, rate: 38, volume: 2500 },
  { name: 'Jul', credits: 349, rate: 43, volume: 2100 },
];

const DashboardOverview: React.FC = () => {
  const { users } = useAuthStore();
  const ngoCount = users.filter(u => u.role === 'ngo').length;
  const corporateCount = users.filter(u => u.role === 'corporate').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">System Overview</h2>
        <p className="text-slate-500 mt-1">Real-time metrics and performance indicators for CLORIT.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <KPIBox 
          label="Total Projects" 
          value="128" 
          icon={MapPin} 
          trend={{ value: 12, isUp: true }}
          color="blue"
        />
        <KPIBox 
          label="Verified Projects" 
          value="94" 
          icon={ShieldCheck} 
          trend={{ value: 8, isUp: true }}
          color="green"
        />
        <KPIBox 
          label="Total Credits (CCT)" 
          value="452.8k" 
          icon={Coins} 
          trend={{ value: 24, isUp: true }}
          color="purple"
        />
        <KPIBox 
          label="Active NGOs" 
          value={ngoCount.toString()} 
          icon={Users} 
          trend={{ value: ngoCount > 0 ? 5 : 0, isUp: ngoCount > 0 }}
          color="orange"
        />
        <KPIBox 
          label="Corporate Buyers" 
          value={corporateCount.toString()} 
          icon={TrendingUp} 
          trend={{ value: corporateCount > 0 ? 15 : 0, isUp: corporateCount > 0 }}
          color="green"
        />
      </div>

      {/* Main Charts & Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Column */}
        <div className="lg:col-span-2 space-y-8">
          <ChartCard title="Carbon Credit Growth" subtitle="Monthly accumulation of CCT across all regions">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="credits" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorCredits)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ChartCard title="Approval Rate" subtitle="Percentage of projects verified successfully">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="rate" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Trading Volume" subtitle="Marketplace activity (CCT traded)">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  <Line type="monotone" dataKey="volume" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4, fill: '#8b5cf6'}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>

        {/* Alerts & Feed Column */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-slate-900 tracking-tight px-1">Attention Required</h4>
            <AlertPanel 
              type="error"
              title="Fraud Alert Detected"
              description="Unusual activity detected in Sundarbans region. Verification pending manual audit."
              onAction={() => console.log('Investigating fraud')}
              actionLabel="Investigate"
            />
            <AlertPanel 
              type="warning"
              title="System Upgrade Pending"
              description="A new version of core contracts is available. Please review deployment docs."
            />
            <AlertPanel 
              type="info"
              title="NDVI Intelligence Report"
              description="New satellite dataset comparison (Sentinel-2, Landsat, MODIS) and GEE snippets are now available in the Analytics tab."
              actionLabel="View Report"
              onAction={() => console.log('Redirecting to Analytics')}
            />
          </div>

          <ActivityFeed 
            items={[
              { id: 1, title: 'Project Approved', description: 'Kerala Backwaters restoration was successfully verified.', time: '2m ago', type: 'success' },
              { id: 2, title: 'New CCT Minted', description: '12,500 CCT tokens minted for Odisha Coast project.', time: '15m ago', type: 'info' },
              { id: 3, title: 'Market Alert', description: 'High trading volume detected in the East Coast segment.', time: '1h ago', type: 'warning' },
              { id: 4, title: 'New NGO Joined', description: 'Marine Ecosystem Foundation has registered an account.', time: '3h ago', type: 'info' },
              { id: 5, title: 'User Banned', description: 'Account terminated due to non-compliance in Tamil Nadu.', time: '5h ago', type: 'error' },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
