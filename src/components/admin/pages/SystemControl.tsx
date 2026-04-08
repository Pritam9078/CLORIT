import React from 'react';
import { 
  Settings, 
  Cpu, 
  Database, 
  Globe, 
  ShieldAlert, 
  Zap, 
  RefreshCcw, 
  Power,
  Key,
  Layers,
  Activity,
  History,
  Lock,
  Terminal,
  ExternalLink
} from 'lucide-react';
import KPIBox from '../shared/KPIBox';
import DataTable from '../shared/DataTable';
import AlertPanel from '../shared/AlertPanel';
import { cn } from "@/lib/utils";
import { useSystemStore, ContractInfo as StoreContractInfo, InfraLog as StoreInfraLog } from '../../../state/systemStore';

// REMOVED LOCAL DUMMY DATA: Now using systemStore.ts

const SystemControl: React.FC = () => {
  const { 
    networkLatency, 
    chainSync, 
    activeNodes, 
    gasPrice, 
    contracts, 
    infraLogs 
  } = useSystemStore();

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">System Infrastructure</h2>
          <p className="text-slate-500 mt-1">Manage core smart contracts, network connectivity, and security configuration.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all flex items-center gap-2">
            <Terminal className="w-4 h-4 text-slate-400" /> CLI Debug Console
          </button>
        </div>
      </div>

      {/* Infrastructure Heatmap */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIBox label="Network Latency" value={networkLatency} icon={Zap} color="green" />
        <KPIBox label="Chain Sync" value={chainSync} icon={Database} color="blue" />
        <KPIBox label="Active Nodes" value={activeNodes} icon={Globe} color="purple" />
        <KPIBox label="Gas Price (Gwei)" value={gasPrice} icon={Activity} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Smart Contract Registry */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
               <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                 <Layers className="w-5 h-5 text-blue-600" /> Contract Registry
               </h4>
               <button className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                  <RefreshCcw size={12} /> Sync Addresses
               </button>
             </div>
             <DataTable 
              data={contracts} 
              columns={[
                { header: 'Contract Name', accessor: 'name', className: 'font-bold text-slate-900' },
                { header: 'Version', accessor: (item: StoreContractInfo) => (
                   <span className="text-[10px] font-bold text-slate-400 border border-slate-100 px-1.5 py-0.5 rounded uppercase">{item.version}</span>
                )},
                { header: 'Address', accessor: 'address', className: 'font-mono text-xs text-blue-600 cursor-pointer hover:underline' },
                { header: 'Status', accessor: (item: StoreContractInfo) => (
                   <div className="flex items-center gap-1.5">
                     <div className={cn("w-1.5 h-1.5 rounded-full", item.status === 'Active' ? "bg-green-500" : "bg-red-500")} />
                     <span className={cn("text-xs font-medium", item.status === 'Active' ? "text-slate-900" : "text-red-600 font-bold")}>{item.status}</span>
                   </div>
                )},
                { header: 'Last Update', accessor: 'updated', className: 'text-[10px] text-slate-400 italic' },
                { header: 'Manage', accessor: () => (
                   <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900 transition-all border border-transparent hover:border-slate-100"><ExternalLink size={14} /></button>
                      <button className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition-all border border-transparent hover:border-red-100"><Power size={14} /></button>
                   </div>
                )}
              ]}
             />
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
             <Cpu className="w-48 h-48 absolute -right-8 -bottom-8 text-white/5 opacity-10 rotate-12" />
             <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                   <h5 className="text-xl font-bold text-white mb-4 italic flex items-center gap-2">
                      <Settings className="w-5 h-5 text-blue-400" /> Advanced Options
                   </h5>
                   <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                         <div>
                            <p className="text-sm font-bold text-white">Emergency Stop Protocol</p>
                            <p className="text-[10px] text-slate-400 mt-1 italic">Pause all activity across the network</p>
                         </div>
                         <div className="w-10 h-5 bg-red-600/20 border border-red-500/50 rounded-full relative cursor-pointer">
                            <div className="w-3 h-3 bg-red-500 rounded-full absolute left-1 top-1" />
                         </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                         <div>
                            <p className="text-sm font-bold text-white">Maintenance Mode</p>
                            <p className="text-[10px] text-slate-400 mt-1 italic">Restrict access for protocol upgrades</p>
                         </div>
                         <div className="w-10 h-5 bg-white/10 border border-white/20 rounded-full relative cursor-pointer">
                            <div className="w-3 h-3 bg-slate-400 rounded-full absolute right-1 top-1" />
                         </div>
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <h5 className="text-xl font-bold text-white mb-4 italic flex items-center gap-2">
                      <Key className="w-5 h-5 text-orange-400" /> Multi-Sig Authorizations
                   </h5>
                   <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                      <p className="text-xs text-slate-400 italic mb-2">Requirement: 3/5 Admins active</p>
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                           <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white uppercase">{String.fromCharCode(64 + i)}</div>
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800/50 flex items-center justify-center text-[10px] font-bold text-slate-500 italic">+2</div>
                      </div>
                      <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-900/40">Request Access Modification</button>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-8">
           <AlertPanel 
              type="error"
              icon={ShieldAlert}
              title="System Critical: Gas Spike"
              description="Network gas costs have exceeded the safety threshold of 100 Gwei. Marketplace fees adjusted."
           />

           <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm border-t-4 border-t-purple-600">
             <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 italic">
               <History className="w-5 h-5 text-purple-600" /> Infrastructure Logs
             </h4>
             <div className="space-y-6">
                {infraLogs.map((log, i) => (
                    <div key={i} className="flex flex-col gap-1 border-l-2 border-slate-100 pl-4 relative">
                       <div className="w-2 h-2 rounded-full bg-slate-200 absolute -left-[5px] top-1.5" />
                       <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800 uppercase tracking-tight">{log.event}</span>
                          <span className="text-[10px] font-bold text-slate-400 italic">{log.time}</span>
                       </div>
                       <span className="text-[9px] text-slate-500 font-medium">Type: {log.type}</span>
                    </div>
                ))}
             </div>
             <button className="w-full mt-8 py-2 text-xs font-bold text-purple-600 hover:bg-purple-50 rounded-lg border border-purple-100 transition-all uppercase tracking-widest">Open Full Console</button>
           </div>

           <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-inner">
              <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400">
                 <Lock size={16} />
              </div>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">Encryption layers active: TLS 1.3, AES-256-GCM. Session persistence: <span className="text-slate-900 font-bold uppercase underline">Blockchain Verified</span></p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SystemControl;
