import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  MapPin, 
  Calendar, 
  User, 
  Coins, 
  BarChart2,
  CheckCircle2,
  XCircle,
  Eye,
  Loader2
} from 'lucide-react';
import { adminApprove } from '../../../services/blockchain';
import DataTable from '../shared/DataTable';
import { cn } from "@/lib/utils";
import { useProjectStore, Project as StoreProject } from '../../../state/projectStore';

// REMOVED LOCAL DUMMY DATA: Now using projectStore.ts

const ProjectManagement: React.FC = () => {
  const { projects, updateProjectStatus } = useProjectStore();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handleProjectApproval = async (projectId: string, action: 'approve' | 'reject') => {
    setIsProcessing(projectId);
    try {
      const project = projects.find(p => p.id === projectId);
      const approve = action === 'approve';
      const dummyDataHash = "0x" + "3".repeat(64);
      const metadataURI = "ipfs://final-verification-report";
      const credits = project ? project.carbonCredits : 1000;

      // On-chain approval/rejection
      await adminApprove(projectId, dummyDataHash, credits, metadataURI, approve);
      
      // Update global store state for UI reactivity
      updateProjectStatus(projectId, approve ? 'admin-approved' : 'rejected');
      
      alert(`Project ${projectId} has been ${approve ? 'finally approved and credits minted' : 'rejected'} on-chain!`);
    } catch (error: any) {
      console.error(error);
      alert(`ADMIN Action failed: ${error.message}`);
    } finally {
      setIsProcessing(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'submitted': "bg-slate-100 text-slate-700",
      'ngo-verified': "bg-blue-100 text-blue-700",
      'panchayat-reviewed': "bg-orange-100 text-orange-700",
      'admin-approved': "bg-green-100 text-green-700",
      'rejected': "bg-red-100 text-red-700",
    };
    return (
      <span className={cn(
        "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
        variants[status as keyof typeof variants] || "bg-slate-100 text-slate-700"
      )}>
        {status.replace('-', ' ')}
      </span>
    );
  };

  const filteredProjects = filterStatus === 'all' 
    ? projects 
    : projects.filter(p => p.status === filterStatus);

  const columns = [
    { 
      header: 'Project Details', 
      accessor: (item: StoreProject) => (
        <div className="flex flex-col">
          <span className="font-bold text-slate-900">{item.name}</span>
          <span className="text-xs text-slate-500 flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3" /> {item.location}
          </span>
        </div>
      )
    },
    { 
      header: 'NGO', 
      accessor: (item: StoreProject) => (
        <span className="text-slate-600 flex items-center gap-2">
          <User className="w-4 h-4 text-slate-400" /> {item.ngoName}
        </span>
      ) 
    },
    { 
      header: 'Area / NDVI', 
      accessor: (item: StoreProject) => (
        <div className="flex flex-col">
          <span className="text-slate-800 font-medium">{item.area} ha</span>
          <span className="text-xs text-slate-500 flex items-center gap-1 border-t border-slate-50 mt-1 pt-1">
            <BarChart2 className="w-3 h-3 text-green-500" /> {item.ndviValue.toFixed(2)} NDVI
          </span>
        </div>
      )
    },
    { 
      header: 'Status', 
      accessor: (item: StoreProject) => getStatusBadge(item.status) 
    },
    { 
      header: 'Est. Credits', 
      accessor: (item: StoreProject) => (
        <span className="font-bold text-green-600 flex items-center gap-1">
          <Coins className="w-4 h-4" /> {item.carbonCredits.toLocaleString()}
        </span>
      ) 
    },
    { 
      header: 'Actions', 
      accessor: (item: StoreProject) => (
        <div className="flex items-center gap-2">
          {item.status === 'panchayat-reviewed' ? (
            <>
              <button 
                onClick={() => handleProjectApproval(item.id, 'approve')}
                disabled={!!isProcessing}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-green-200"
                title="Approve & Mint"
              >
                {isProcessing === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => handleProjectApproval(item.id, 'reject')}
                disabled={!!isProcessing}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                title="Reject Project"
              >
                {isProcessing === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
              </button>
            </>
          ) : (
            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200">
              <Eye className="w-4 h-4" />
            </button>
          )}
          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      ) 
    },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Project Management</h2>
          <p className="text-slate-500 mt-1">Review, verify and approve restoration projects on the blockchain.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-slate-50">
            <Calendar className="w-4 h-4" /> Export Report
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-green-900/20 hover:bg-green-700 transition-all flex items-center gap-2">
            <Filter className="w-4 h-4" /> Refresh Data
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          {['all', 'submitted', 'ngo-verified', 'panchayat-reviewed', 'admin-approved'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                "px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
                filterStatus === status 
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                  : "text-slate-500 hover:bg-slate-50"
              )}
            >
              {status === 'all' ? 'All Projects' : status.replace('-', ' ')}
            </button>
          ))}
        </div>
        <div className="relative group min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by ID or NGO..." 
            className="w-full text-sm pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
          />
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <DataTable data={filteredProjects} columns={columns} />
      </div>
    </div>
  );
};

export default ProjectManagement;
