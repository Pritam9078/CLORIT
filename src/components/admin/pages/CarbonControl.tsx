import React from 'react';
import { 
  Coins, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Activity, 
  CircleDollarSign,
  History,
  Info,
  TrendingUp,
  Download
} from 'lucide-react';
import KPIBox from '../shared/KPIBox';
import DataTable from '../shared/DataTable';
import AlertPanel from '../shared/AlertPanel';
import { cn } from "@/lib/utils";
import { useCarbonStore, CarbonLog as StoreCarbonLog } from '../../../state/carbonStore';

// REMOVED LOCAL DUMMY DATA: Now using carbonStore.ts

const CarbonControl: React.FC = () => {
  const { 
    totalCCTSupply, 
    totalMintedYTD, 
    totalBurnedYTD, 
    circulatingSupply, 
    logs,
    addLog,
    updateSupplies
  } = useCarbonStore();

  const handleMint = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const amount = Number((form.elements.namedItem('amount') as HTMLInputElement).value);
    const address = (form.elements.namedItem('address') as HTMLInputElement).value;
    
    if (!amount || !address) return;

    updateSupplies(amount, 0);
    addLog({
      type: 'Mint',
      amount: `${amount.toLocaleString()} CCT`,
      project: 'Manual Admin Mint',
      sender: 'Admin',
      status: 'Success'
    });
    form.reset();
  };

  const handleBurn = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const amount = Number((form.elements.namedItem('amount') as HTMLInputElement).value);
    const address = (form.elements.namedItem('address') as HTMLInputElement).value;
    
    if (!amount || !address) return;

    updateSupplies(0, amount);
    addLog({
      type: 'Burn',
      amount: `${amount.toLocaleString()} CCT`,
      project: 'Manual Admin Burn',
      sender: 'Admin',
      status: 'Success'
    });
    form.reset();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Carbon Credit Control</h2>
          <p className="text-slate-500 mt-1">Manage global token supply, minting policies, and compliance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-green-900/20 hover:bg-green-700 transition-all flex items-center gap-2 active:scale-95">
            <ArrowUpCircle className="w-4 h-4" /> Bulk Mint Tokens
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIBox label="Total CCT Supply" value={totalCCTSupply.toLocaleString()} icon={Coins} color="blue" trend={{value: 4.2, isUp: true}} />
        <KPIBox label="Total Minted (YTD)" value={totalMintedYTD.toLocaleString()} icon={ArrowUpCircle} color="green" />
        <KPIBox label="Total Burned (YTD)" value={totalBurnedYTD.toLocaleString()} icon={ArrowDownCircle} color="red" />
        <KPIBox label="Circulating Supply" value={circulatingSupply.toLocaleString()} icon={Activity} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Controls */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <CircleDollarSign className="w-5 h-5 text-green-600" /> Manual Token Operations
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <form onSubmit={handleMint} className="space-y-4 p-6 rounded-2xl bg-blue-50/50 border border-blue-100">
                 <h5 className="font-bold text-blue-900 flex items-center gap-2">
                   <ArrowUpCircle className="w-4 h-4" /> Mint CCT
                 </h5>
                 <p className="text-xs text-blue-700">Authorize new carbon credit tokens for verified ecological impact.</p>
                 <div className="space-y-4 pt-2">
                   <div className="space-y-1">
                     <label className="text-[10px] font-bold text-blue-900/50 uppercase">Recipient Address</label>
                     <input name="address" type="text" placeholder="0x..." className="w-full text-sm px-3 py-2 bg-white border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                   </div>
                   <div className="space-y-1">
                     <label className="text-[10px] font-bold text-blue-900/50 uppercase">Amount (CCT)</label>
                     <input name="amount" type="number" placeholder="0.00" className="w-full text-sm px-3 py-2 bg-white border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                   </div>
                   <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95 transition-all">Execute Mint</button>
                 </div>
              </form>

              <form onSubmit={handleBurn} className="space-y-4 p-6 rounded-2xl bg-red-50/50 border border-red-100">
                 <h5 className="font-bold text-red-900 flex items-center gap-2">
                   <ArrowDownCircle className="w-4 h-4" /> Burn CCT
                 </h5>
                 <p className="text-xs text-red-700">Remove tokens from circulation for credit offsetting or retirement.</p>
                 <div className="space-y-4 pt-2">
                   <div className="space-y-1">
                     <label className="text-[10px] font-bold text-red-900/50 uppercase">Holder Address</label>
                     <input name="address" type="text" placeholder="0x..." className="w-full text-sm px-3 py-2 bg-white border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20" />
                   </div>
                   <div className="space-y-1">
                     <label className="text-[10px] font-bold text-red-900/50 uppercase">Amount (CCT)</label>
                     <input name="amount" type="number" placeholder="0.00" className="w-full text-sm px-3 py-2 bg-white border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20" />
                   </div>
                   <button type="submit" className="w-full py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 shadow-lg shadow-red-500/20 active:scale-95 transition-all">Execute Burn</button>
                 </div>
              </form>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <History className="w-5 h-5 text-slate-500" /> Transaction Logs
              </h4>
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                <Download className="w-3 h-3" /> Export Logs
              </button>
            </div>
            <DataTable 
              data={logs} 
              columns={[
                { header: 'Type', accessor: (item: StoreCarbonLog) => (
                  <span className={cn(
                    "px-2 py-1 rounded-md text-[10px] font-bold",
                    item.type === 'Mint' ? "bg-green-100 text-green-700" : item.type === 'Burn' ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                  )}>{item.type}</span>
                )},
                { header: 'Amount', accessor: 'amount', className: 'font-bold text-slate-900' },
                { header: 'Project / Context', accessor: 'project' },
                { header: 'Sender', accessor: 'sender' },
                { header: 'Status', accessor: (item: StoreCarbonLog) => (
                  <div className="flex items-center gap-1.5">
                    <div className={cn("w-2 h-2 rounded-full", item.status === 'Success' ? "bg-green-500" : "bg-orange-500 animate-pulse")} />
                    <span className="text-xs font-medium">{item.status}</span>
                  </div>
                )},
                { header: 'Date', accessor: 'date', className: 'text-xs text-slate-400' },
              ]} 
            />
          </div>
        </div>

        {/* Right Column - Info & Alerts */}
        <div className="space-y-8">
          <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-2xl shadow-slate-200">
            <TrendingUp className="w-24 h-24 absolute -right-4 -bottom-4 text-white/5 opacity-20 rotate-12" />
            <div className="relative z-10">
              <h4 className="text-xl font-bold mb-2">Token Policy</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">Current emission rate is locked at <span className="text-green-400 font-bold">1.2x growth base</span>. All project-based minting requires dual verification.</p>
              
              <div className="space-y-4 border-t border-white/10 pt-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Mint Limit (Daily)</span>
                  <span className="font-bold">50,000 CCT</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Verification Req.</span>
                  <span className="font-bold text-blue-400">Level 3</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Liquidity Index</span>
                  <span className="font-bold text-green-400">98.2%</span>
                </div>
              </div>
            </div>
          </div>

          <AlertPanel 
            type="info"
            icon={Info}
            title="Blockchain Latency"
            description="The RPC node is experiencing slight delays. Transactions may take longer to confirm."
          />

          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm border-l-4 border-l-orange-500">
            <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-2 italic">
              <Activity className="w-4 h-4 text-orange-500" /> Compliance Check
            </h5>
            <p className="text-xs text-slate-500 mb-4">Verification integrity score across all minting operations.</p>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 w-[88%]" />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] font-bold text-slate-400 italic">Score: 88/100</span>
              <span className="text-[10px] font-bold text-orange-600 underline cursor-pointer">Run Audit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonControl;
