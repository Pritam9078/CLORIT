import React from 'react';
import { 
  Store, 
  TrendingUp, 
  Activity, 
  BarChart2, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  AlertCircle,
  PauseCircle,
  Eye,
  MoreVertical,
  History,
  ShoppingCart,
  LayoutGrid
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import KPIBox from '../shared/KPIBox';
import DataTable from '../shared/DataTable';
import ChartCard from '../shared/ChartCard';
import AlertPanel from '../shared/AlertPanel';
import { cn } from "@/lib/utils";
import { useMarketplaceStore, Order as StoreOrder } from '../../../state/marketplaceStore';

// REMOVED LOCAL DUMMY DATA: Now using marketplaceStore.ts

const MarketplaceMonitor: React.FC = () => {
  const { 
    avgPrice, 
    tradingVolume, 
    activeOrdersCount, 
    marketStability, 
    orders, 
    priceHistory 
  } = useMarketplaceStore();

  return (
    <div className="space-y-8 animate-in slide-in-from-top-4 duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Marketplace Monitoring</h2>
          <p className="text-slate-500 mt-1">Live surveillance of the CCT trading floor and transaction integrity.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-red-900/10 hover:bg-red-700 transition-all flex items-center gap-2 active:scale-95">
             <PauseCircle className="w-4 h-4" /> Emergency Trade Pause
           </button>
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIBox label="Avg. CCT Price" value={avgPrice} icon={TrendingUp} color="green" trend={{value: 8.4, isUp: true}} />
        <KPIBox label="Trading Volume (24h)" value={tradingVolume} icon={Activity} color="blue" trend={{value: 12, isUp: true}} />
        <KPIBox label="Active Buy Orders" value={activeOrdersCount.toLocaleString()} icon={ShoppingCart} color="purple" />
        <KPIBox label="Market Stability Index" value={marketStability} icon={ShieldCheck} color="green" />
      </div>

      {/* Market Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ChartCard title="CCT Price Movement" subtitle="Intraday price fluctuations (USD)">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceHistory}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
        <div>
          <ChartCard title="Volume Distribution" subtitle="Trading volume by time interval">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceHistory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="vol" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* Orders Surveillance Table */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
               <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                 <History className="w-5 h-5 text-slate-500" /> Live Order Book Surveillance
               </h4>
               <div className="flex items-center gap-2">
                 <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                   <LayoutGrid size={16} />
                 </button>
               </div>
             </div>
             <DataTable 
              data={orders} 
              columns={[
                { header: 'Time', accessor: 'date', className: 'text-xs text-slate-400 font-mono' },
                { header: 'Account ID', accessor: (item: StoreOrder) => (
                  <span className="font-mono text-xs font-bold text-slate-900">{item.account}</span>
                )},
                { header: 'Type', accessor: (item: StoreOrder) => (
                   <span className={cn(
                    "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase",
                    item.type === 'Buy' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  )}>{item.type}</span>
                )},
                { header: 'Amount', accessor: 'amount', className: 'font-bold text-slate-800' },
                { header: 'Price', accessor: 'price' },
                { header: 'Total (USD)', accessor: 'total', className: 'font-bold text-slate-900' },
                { header: 'Status', accessor: (item: StoreOrder) => (
                   <div className="flex items-center gap-1.5">
                     <div className={cn("w-2 h-2 rounded-full", item.status === 'Live' ? "bg-green-500 animate-pulse" : item.status === 'Suspended' ? "bg-red-500" : "bg-blue-500")} />
                     <span className="text-xs font-medium">{item.status}</span>
                   </div>
                )},
                { header: 'Security', accessor: (item: StoreOrder) => (
                  <div className="flex items-center gap-1">
                    <button className="p-1 px-2.5 rounded-lg border border-slate-200 text-[10px] font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-200" title="Flag Account">Flag</button>
                    <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"><Eye size={12}/></button>
                  </div>
                )}
              ]}
             />
          </div>
        </div>

        {/* Admin Controls Column */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm border-t-4 border-t-blue-600">
            <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" /> Market Controls
            </h4>
            
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors group">
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-500 group-hover:text-blue-600 transition-colors">
                     <AlertCircle size={18} />
                   </div>
                   <div className="text-left">
                     <p className="text-sm font-bold text-slate-900">Flag Suspicious Account</p>
                     <p className="text-[10px] text-slate-500 italic">Enter Address to monitor</p>
                   </div>
                 </div>
                 <ArrowUpRight size={14} className="text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors group">
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-500 group-hover:text-red-600 transition-colors">
                     <PauseCircle size={18} />
                   </div>
                   <div className="text-left">
                     <p className="text-sm font-bold text-slate-900">Freeze Local Segment</p>
                     <p className="text-[10px] text-slate-500 italic">Temporary trade lock</p>
                   </div>
                 </div>
                 <ArrowUpRight size={14} className="text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
                 <h5 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Market Integrity Status</h5>
                 <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-100">
                    <span className="text-xs font-bold text-green-800">Fraud Protection</span>
                    <span className="text-[10px] px-2 py-0.5 bg-green-600 text-white rounded-full font-bold">ACTIVE</span>
                 </div>
                 <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100">
                    <span className="text-xs font-bold text-blue-800">Order Matching</span>
                    <span className="text-[10px] px-2 py-0.5 bg-blue-600 text-white rounded-full font-bold">ONLINE</span>
                 </div>
              </div>
            </div>
          </div>

          <AlertPanel 
            type="warning"
            title="Slippage Alert"
            description="High price volatility detected in high-volume bundles. Review matching engine logs."
          />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceMonitor;
