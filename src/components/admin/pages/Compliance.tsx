import React from 'react';
import { 
  ShieldCheck, 
  FileCheck, 
  History, 
  AlertTriangle, 
  Clock, 
  Download, 
  Search,
  CheckCircle2,
  XCircle,
  FileText,
  UserCheck
} from 'lucide-react';
import DataTable from '../shared/DataTable';
import AlertPanel from '../shared/AlertPanel';
import { cn } from "@/lib/utils";

const complianceReports = [
  { id: 'AUD-001', name: 'Annual Registry Audit 2024', status: 'Approved', auditor: 'BigData Integrity Ltd.', date: '2024-08-15' },
  { id: 'AUD-002', name: 'West Bengal Project Verification', status: 'Pending', auditor: 'GreenWatch NGO', date: '2024-09-02' },
  { id: 'AUD-003', name: 'Protocol Upgrade Compliance', status: 'Approved', auditor: 'System Admin', date: '2024-07-10' },
  { id: 'AUD-004', name: 'Marketplace Volume Audit', status: 'Flagged', auditor: 'Compliance Bot 4.0', date: '2024-08-25' },
];

const verifyLogs = [
  { action: 'Proof of Sequestration', project: 'Sundarbans-R1', hash: '0x1de...9a22', time: '12 mins ago', status: 'Verified' },
  { action: 'Identity KYC Check', project: 'User: 0xabc...', hash: '0x3fe...88c4', time: '45 mins ago', status: 'Pending' },
  { action: 'Credit Minting Audit', project: '500 CCT Batch', hash: '0x002...ef09', time: '1 hour ago', status: 'Verified' },
];

const Compliance: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Compliance & Auditing</h2>
          <p className="text-slate-500 mt-1">Audit logs, regulatory reporting, and cryptographic integrity verification.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all flex items-center gap-2">
            <FileText className="w-4 h-4" /> Generate Audit Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Audit Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
               <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                 <FileCheck className="w-5 h-5 text-blue-600" /> Active Audit Records
               </h4>
               <div className="relative group min-w-[200px]">
                 <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input type="text" placeholder="Search ID..." className="w-full text-xs pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
               </div>
             </div>
             <DataTable 
              data={complianceReports} 
              columns={[
                { header: 'Report ID', accessor: 'id', className: 'font-mono text-[10px] font-bold text-slate-500' },
                { header: 'Audit Name', accessor: 'name', className: 'font-bold text-slate-900' },
                { header: 'Auditor', accessor: 'auditor', className: 'text-slate-600' },
                { header: 'Status', accessor: (item) => (
                   <span className={cn(
                    "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase",
                    item.status === 'Approved' ? "bg-green-100 text-green-700" : item.status === 'Pending' ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
                  )}>{item.status}</span>
                )},
                { header: 'Date', accessor: 'date', className: 'text-xs text-slate-400' },
                { header: 'Action', accessor: () => (
                   <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all rounded-lg">
                      <Download size={14} />
                   </button>
                )}
              ]}
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm border-l-4 border-l-green-500">
               <h5 className="font-bold text-slate-900 mb-4 flex items-center gap-2 italic">
                 <CheckCircle2 className="w-4 h-4 text-green-500" /> Verification Integrity
               </h5>
               <div className="space-y-4">
                 {verifyLogs.map((log, i) => (
                    <div key={i} className="flex flex-col p-3 bg-slate-50 border border-slate-100 rounded-xl">
                       <div className="flex justify-between items-center mb-1">
                         <span className="text-xs font-bold text-slate-800">{log.action}</span>
                         <span className={cn("text-[9px] font-bold", log.status === 'Verified' ? "text-green-600" : "text-orange-500")}>{log.status}</span>
                       </div>
                       <div className="flex justify-between items-center mt-1">
                          <span className="text-[10px] font-mono text-slate-400 italic">{log.hash}</span>
                          <span className="text-[9px] text-slate-400">{log.time}</span>
                       </div>
                    </div>
                 ))}
               </div>
             </div>

             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm border-l-4 border-l-orange-500">
               <h5 className="font-bold text-slate-900 mb-4 flex items-center gap-2 italic">
                 <AlertTriangle className="w-4 h-4 text-orange-500" /> Active Compliance Alerts
               </h5>
               <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-50 border border-orange-100 animate-pulse">
                     <Clock className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                     <div>
                       <p className="text-xs font-bold text-orange-900">Registry Sync Delayed</p>
                       <p className="text-[10px] text-orange-700 mt-1 italic">On-chain sync with UN Global Registry is delayed by 14 blocks. Immediate investigation required.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
                     <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                     <div>
                       <p className="text-xs font-bold text-red-900">Failed KYC Event</p>
                       <p className="text-[10px] text-red-700 mt-1 italic">Account 0xabc... failed AML verification levels during marketplace trade.</p>
                     </div>
                  </div>
               </div>
             </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-blue-600 text-white p-8 rounded-3xl relative overflow-hidden group shadow-2xl shadow-blue-500/20">
             <ShieldCheck className="w-32 h-32 absolute -right-4 -bottom-4 text-white/10 group-hover:rotate-12 transition-transform duration-500" />
             <div className="relative z-10">
               <h4 className="text-xl font-bold mb-4 flex items-center gap-2 italic">
                  <UserCheck size={20} /> Identity Assurance
               </h4>
               <p className="text-blue-100 text-sm leading-relaxed mb-6">Current compliance standard: <span className="font-bold bg-white/20 px-2 py-0.5 rounded-full text-xs">V2.4 Protocol</span></p>
               
               <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-blue-200">KYC/AML Score</span>
                     <span className="font-bold">99.8%</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-blue-200">On-chain Traceability</span>
                     <span className="font-bold">High</span>
                  </div>
               </div>
             </div>
          </div>

          <AlertPanel 
             type="info"
             title="Regulation Update"
             description="New EU-Standard Carbon Directives will be force-enabled on Oct 1st. Automated compliance module pre-staged."
          />

          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
             <h5 className="font-bold text-slate-900 mb-6 flex items-center gap-2 italic">
                <History className="w-4 h-4 text-slate-500" /> Protocol Log Access
             </h5>
             <div className="space-y-4">
                <button className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-[10px] font-bold text-left border border-slate-100 transition-all">Download Blockchain Registry Log</button>
                <button className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-[10px] font-bold text-left border border-slate-100 transition-all">Download Admin Action Log</button>
                <button className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-[10px] font-bold text-left border border-slate-100 transition-all">Download Financial Ledger CSV</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
