import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  ShieldAlert, 
  Search, 
  Filter, 
  MoreVertical, 
  Shield, 
  Mail, 
  Globe, 
  CheckCircle2, 
  XCircle,
  Clock,
  Eye,
  Key,
  Check,
  X,
  UserCheck,
  FileText
} from 'lucide-react';
import { useAuthStore, User as StoreUser } from '../../../state/authStore';
import DataTable from '../shared/DataTable';
import KPIBox from '../shared/KPIBox';
import { cn } from "@/lib/utils";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { WalletUtils } from '../../../utils/walletUtils';

const UserManagement: React.FC = () => {
  const { users, updateUserStatus } = useAuthStore();
  const [filterRole, setFilterRole] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [reviewUser, setReviewUser] = useState<StoreUser | null>(null);

  const nonAdminUsers = users.filter(u => u.role.toLowerCase() !== 'admin');
  const filteredUsers = nonAdminUsers.filter(u => {
    const matchesRole = filterRole === 'all' || u.role === filterRole;
    const matchesSearch = (u.fullName && u.fullName.toLowerCase().includes(searchQuery.toLowerCase())) || 
                          (u.email && u.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (u.walletAddress && u.walletAddress.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  const getRoleBadge = (role: string) => {
    const roles = {
      admin: { color: 'bg-red-100 text-red-700', icon: Shield },
      ngo: { color: 'bg-emerald-100 text-emerald-700', icon: Globe },
      corporate: { color: 'bg-blue-100 text-blue-700', icon: ShieldCheck },
      user: { color: 'bg-slate-100 text-slate-700', icon: Users },
    };
    const config = roles[role as keyof typeof roles] || roles.user;
    const Icon = config.icon;
    return (
      <span className={cn("px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase flex items-center gap-1.5 w-fit border border-transparent shadow-sm", config.color)}>
        <Icon size={12} /> {role}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const statuses = {
      verified: "bg-green-100 text-green-700",
      pending: "bg-orange-100 text-orange-700",
      rejected: "bg-red-100 text-red-700",
    };
    return (
      <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase", statuses[status as keyof typeof statuses])}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">User & Access Control</h2>
          <p className="text-slate-500 mt-1">Manage global access levels, verify new partners, and audit user permissions.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95 border-none h-auto">
            <UserPlus className="w-4 h-4" /> Invite New User
          </Button>
        </div>
      </div>

      {/* User Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIBox label="Total Platform Users" value={nonAdminUsers.length} icon={Users} color="blue" />
        <KPIBox label="Pending Verifications" value={nonAdminUsers.filter(u => u.status === 'pending').length} icon={Clock} color="orange" />
        <KPIBox label="Verified NGOs" value={nonAdminUsers.filter(u => u.role === 'ngo' && u.status === 'verified').length} icon={Globe} color="green" />
        <KPIBox label="Security Flags" value="0" icon={ShieldAlert} color="red" />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-4 min-w-0">
          {/* User Table Header */}
          <div className="bg-white p-4 rounded-xl border border-slate-100 flex flex-wrap items-center justify-between gap-4 mb-6 shadow-sm">
            <div className="flex items-center gap-1">
              {['all', 'ngo', 'corporate', 'user'].map(role => (
                <button
                  key={role}
                  onClick={() => setFilterRole(role)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-[10px] font-bold transition-all uppercase tracking-tight",
                    filterRole === role 
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                      : "text-slate-500 hover:bg-slate-50"
                  )}
                >
                  {role}s
                </button>
              ))}
            </div>
            <div className="relative group min-w-[240px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search name, wallet, or email..." 
                className="w-full text-xs pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
             <DataTable 
              data={filteredUsers} 
              columns={[
                { header: 'Profile Details', accessor: (item: StoreUser) => (
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 font-bold text-xs uppercase tracking-widest">{item.fullName?.[0] || '?'}</div>
                      {item.kybSubmitted && item.status === 'pending' && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 border-2 border-white rounded-full animate-pulse shadow-sm" title="Review Required" />
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                       <span className="font-bold text-slate-900 text-sm truncate max-w-[200px] flex items-center gap-2">
                         {item.fullName}
                         {item.kybSubmitted && item.status === 'pending' && (
                           <span className="text-[8px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">Review</span>
                         )}
                       </span>
                       <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 truncate max-w-[200px]"><Mail size={10} className="shrink-0"/> {item.email}</span>
                    </div>
                  </div>
                )},
                { header: 'Role', accessor: (item: StoreUser) => getRoleBadge(item.role) },
                { header: 'Wallet', accessor: (item: StoreUser) => (
                   <span className="font-mono text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">{WalletUtils.formatAddress(item.walletAddress)}</span>
                )},
                { header: 'Status', accessor: (item: StoreUser) => getStatusBadge(item.status) },
                 { header: 'Actions', accessor: (item: StoreUser) => (
                    <div className="flex items-center gap-2">
                       {item.kybSubmitted && item.status === 'pending' ? (
                         <button 
                            onClick={() => setReviewUser(item)}
                            className="px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 transition-all rounded-lg flex items-center gap-1.5 text-[10px] font-bold shadow-lg shadow-blue-500/20 active:scale-95"
                         >
                            <UserCheck size={14} /> Review KYB
                         </button>
                       ) : item.status === 'pending' ? (
                         <>
                           <button 
                             onClick={() => updateUserStatus(item.id, 'verified')}
                             className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all rounded-lg border border-emerald-100 flex items-center gap-1 text-[10px] font-bold"
                             title="Verify User"
                           >
                             <Check size={14} /> Verify
                           </button>
                           <button 
                             onClick={() => updateUserStatus(item.id, 'rejected')}
                             className="p-1.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all rounded-lg border border-red-100 flex items-center gap-1 text-[10px] font-bold"
                             title="Reject User"
                           >
                             <X size={14} /> Reject
                           </button>
                         </>
                       ) : null}
                       <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all rounded-xl border border-transparent hover:border-blue-100"><Eye size={14} /></button>
                       <button className="p-2 text-slate-300 hover:text-slate-600 transition-all"><MoreVertical size={14} /></button>
                    </div>
                 )}
              ]}
             />
          </div>
        </div>

        {/* Access Rights Info Panel */}
        <div className="space-y-8">
           <div className="bg-slate-900 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
              <ShieldCheck className="w-48 h-48 absolute -right-8 -bottom-8 text-white/5 opacity-10 rotate-12" />
              <div className="relative z-10">
                 <h4 className="text-xl font-extrabold text-white mb-6 italic tracking-tight underline underline-offset-4 decoration-emerald-500">Access Matrix</h4>
                 <div className="space-y-6">
                    <div className="group">
                       <div className="flex justify-between text-xs font-bold text-slate-300 mb-2 italic">
                          <span>Verified NGOs</span>
                          <span className="text-emerald-400">Submitter Level</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 group-hover:bg-emerald-500/10 transition-colors">
                          <div className="h-full bg-emerald-500 w-[60%]" />
                       </div>
                       <p className="mt-2 text-[9px] text-slate-500 font-medium italic">High activity region: Odisha, WB.</p>
                    </div>

                    <div className="group">
                       <div className="flex justify-between text-xs font-bold text-slate-300 mb-2 italic">
                          <span>Governance Participation</span>
                          <span className="text-blue-400">Voter Level</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 group-hover:bg-blue-500/10 transition-colors">
                          <div className="h-full bg-blue-500 w-[85%]" />
                       </div>
                    </div>
                 </div>

                 <button className="w-full mt-10 py-3 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-2xl text-xs font-extrabold transition-all border border-white/20 uppercase tracking-widest shadow-xl shadow-slate-900/40">Audit All Permissions</button>
              </div>
           </div>

           <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-md border-l-4 border-l-orange-500 relative overflow-hidden group">
              <ShieldAlert className="w-16 h-16 absolute -right-4 -bottom-4 text-orange-500/5 rotate-12 transition-transform group-hover:scale-125 group-hover:rotate-45" />
              <h5 className="text-sm font-bold text-slate-900 mb-2 italic flex items-center gap-2 tracking-tight">
                 <ShieldAlert size={16} className="text-orange-500" /> Pending Queue
              </h5>
              <p className="text-[10px] text-slate-500 leading-relaxed font-medium italic">
                {nonAdminUsers.filter(u => u.status === 'pending').length} users are currently awaiting identity verification.
              </p>
              <div className="mt-6 flex gap-2">
                 <button className="flex-1 py-1.5 bg-orange-600 text-white rounded-lg text-[9px] font-bold hover:bg-orange-700 transition-colors uppercase tracking-widest shadow-lg shadow-orange-900/20 active:scale-95">Open Queue</button>
                 <button className="flex-1 py-1.5 bg-slate-50 text-slate-500 rounded-lg text-[9px] font-bold hover:bg-slate-100 transition-colors uppercase tracking-widest border border-slate-100 shadow-sm active:scale-95">Mute</button>
              </div>
           </div>
        </div>
      </div>

      {/* KYB Review Modal */}
      <Dialog open={!!reviewUser} onOpenChange={(open) => !open && setReviewUser(null)}>
        <DialogContent className="max-w-2xl bg-white rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
          {reviewUser && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <div className="bg-slate-900 p-8 text-white relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <ShieldCheck size={120} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-500/30">Corporate KYB</span>
                    <span className="px-3 py-1 bg-white/10 text-white/60 text-[10px] font-bold rounded-full border border-white/10">v2.4 Audit Ready</span>
                  </div>
                  <h2 className="text-3xl font-black tracking-tight">{reviewUser.organization || reviewUser.fullName}</h2>
                  <p className="text-slate-400 text-sm mt-1 flex items-center gap-2 italic">
                    <Mail size={14} /> {reviewUser.email}
                  </p>
                </div>
              </div>

              <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar bg-slate-50/50">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Industry Segment</label>
                    <p className="text-sm font-bold text-slate-700">{reviewUser.industry || 'Not Specified'}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ESG Commitment</label>
                    <p className="text-sm font-bold text-slate-700">{reviewUser.esgGoals || 'Net Zero 2050'}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Physical Location</label>
                    <p className="text-sm font-bold text-slate-700 truncate" title={reviewUser.location}>{reviewUser.location || 'Bangelore, KA'}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Hash</label>
                    <p className="text-sm font-bold text-slate-700">{reviewUser.phone || 'Verified Phone'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" /> Submitted Documents
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {['Certificate of Incorporation', 'Company PAN Card', 'MOA & AOA', 'Director ID Proof'].map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-2xl hover:border-blue-400 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-blue-50 transition-colors">
                            <FileText size={16} className="text-slate-500 group-hover:text-blue-600" />
                          </div>
                          <span className="text-xs font-bold text-slate-700">{doc}.pdf</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">View Attachment</span>
                          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 text-amber-800 italic">
                   <ShieldAlert className="w-5 h-5 shrink-0" />
                   <p className="text-[10px] font-medium leading-relaxed">Identity match score: 98.4%. No active sanctions found. Blockchain address history cleared background check.</p>
                </div>
              </div>

              <div className="p-6 bg-white border-t border-slate-100 flex items-center justify-end gap-3">
                <button 
                  onClick={() => {
                    updateUserStatus(reviewUser.id, 'rejected');
                    setReviewUser(null);
                  }}
                  className="px-6 py-3 bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-2xl text-xs font-black transition-all uppercase tracking-widest border border-slate-200"
                >
                  Reject Application
                </button>
                <button 
                  onClick={() => {
                    updateUserStatus(reviewUser.id, 'verified');
                    setReviewUser(null);
                  }}
                  className="px-8 py-3 bg-slate-900 text-white hover:bg-emerald-600 rounded-2xl text-xs font-black transition-all uppercase tracking-widest shadow-xl shadow-slate-900/20 active:scale-95 flex items-center gap-2"
                >
                  <ShieldCheck size={16} /> Approve & Verify
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
