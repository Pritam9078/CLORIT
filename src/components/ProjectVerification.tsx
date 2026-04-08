import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin, 
  Calendar, 
  Users, 
  FileText, 
  Eye,
  Download,
  Filter,
  Search,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { ethers } from 'ethers';
import { ngoVerify } from '../services/blockchain';
import { useNGOStore } from '../stores/useNGOStore';

interface Project {
  id: string;
  title: string;
  community: string;
  location: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'under-review';
  area: number;
  projectType: string;
  documents: string[];
  description: string;
  coordinates: { lat: number; lng: number };
}

const ProjectVerification: React.FC = () => {
  const { 
    pendingProjects, 
    impactStats, 
    fetchPendingProjects, 
    fetchImpactSummary, 
    isLoading, 
    error 
  } = useNGOStore();

  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [verificationNotes, setVerificationNotes] = useState('');

  React.useEffect(() => {
    fetchPendingProjects();
    fetchImpactSummary();
  }, [fetchPendingProjects, fetchImpactSummary]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'under-review': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'under-review': return <Eye className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredProjects = pendingProjects.filter(project => {
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.submittedBy.communityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.region.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleVerification = async (projectId: string, action: 'approve' | 'reject') => {
    setIsProcessing(projectId);
    try {
      const approve = action === 'approve';
      
      // 1. Blockchain Transaction
      // Generate a data hash of the audit (for demo, using a placeholder)
      const auditData = {
        projectId,
        verifiedBy: 'NGO_USER',
        timestamp: new Date().toISOString(),
        notes: verificationNotes
      };
      const dataHash = ethers.id(JSON.stringify(auditData));
      
      console.log(`Starting blockchain verification for ${projectId}...`);
      await ngoVerify(projectId, dataHash, approve);
      
      // 2. Backend Update
      const token = localStorage.getItem('token');
      await fetch(`/api/ngo/verify/${projectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          status: approve ? 'approved' : 'rejected', 
          notes: verificationNotes 
        })
      });
      
      alert(`Project ${projectId} has been ${approve ? 'verified' : 'rejected'} successfully!`);
      fetchPendingProjects();
      fetchImpactSummary();
      setSelectedProject(null);
    } catch (error: any) {
      console.error(error);
      alert(`Verification failed: ${error.message || 'Blockchain transaction cancelled'}`);
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Verification</h1>
        <p className="text-gray-600">Review and verify community project submissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">{impactStats?.pendingVerification || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Verified</p>
              <p className="text-2xl font-bold text-gray-900">{impactStats?.approvedProjects || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Eye className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Managed Communities</p>
              <p className="text-2xl font-bold text-gray-900">{impactStats?.totalCommunities || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Area Impact</p>
              <p className="text-2xl font-bold text-gray-900">{impactStats?.totalArea || 0} Ha</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="under-review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-12">
          <Loader2 className="w-12 h-12 text-green-500 animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Synchronizing with node...</p>
        </div>
      )}

      {/* Projects List */}
      {!isLoading && filteredProjects.length === 0 ? (
        <div className="bg-white rounded-lg p-12 text-center border border-dashed border-gray-300">
          <CheckCircle className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500">Wait till communities submit new data. All caught up!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {!isLoading && filteredProjects.map((project: any) => (
            <div key={project.projectId} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Users className="w-4 h-4 mr-1" />
                      {project.submittedBy.communityName}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {project.location.region}, {project.location.state}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    {project.status.toUpperCase()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-sm">
                    <span className="text-gray-600">Area:</span>
                    <span className="ml-2 font-medium">{project.area} Ha</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">NDVI:</span>
                    <span className="ml-2 font-medium">{(project.ndviValue || 0).toFixed(2)}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Submitted:</span>
                    <span className="ml-2 font-medium">{new Date(project.submissionDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Review Details
                  </button>
                  {project.status === 'submitted' && (
                    <>
                      <button
                        disabled={isProcessing === project.projectId}
                        onClick={() => handleVerification(project.projectId, 'approve')}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50"
                      >
                        {isProcessing === project.projectId ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Approve'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">{selectedProject.title}</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Project Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">Community:</span> <span className="ml-2">{selectedProject.submittedBy.communityName}</span></div>
                    <div><span className="text-gray-600">Location:</span> <span className="ml-2">{selectedProject.location.region}, {selectedProject.location.state}</span></div>
                    <div><span className="text-gray-600">Area:</span> <span className="ml-2">{selectedProject.area} hectares</span></div>
                    <div><span className="text-gray-600">NDVI Value:</span> <span className="ml-2">{selectedProject.ndviValue}</span></div>
                    <div><span className="text-gray-600">Submitted:</span> <span className="ml-2">{new Date(selectedProject.submissionDate).toLocaleDateString()}</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Audit Verification</h3>
                  <div className="space-y-4">
                    <p className="text-xs text-gray-500 bg-blue-50 p-3 rounded border border-blue-100 italic">
                      "I hereby certify that I have reviewed the submitted documents and field data for this project."
                    </p>
                    <textarea 
                      placeholder="Add audit notes..."
                      value={verificationNotes}
                      onChange={(e) => setVerificationNotes(e.target.value)}
                      className="w-full h-24 border border-gray-300 rounded p-2 text-sm focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Blockchain Alert */}
              <div className="mt-6 flex items-start gap-3 bg-amber-50 p-4 rounded-lg border border-amber-200">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-amber-800">Manual Audit & Wallet Required</p>
                  <p className="text-xs text-amber-700">Approval triggers an immutable transaction on the blockchain. Ensure you have linked your verified wallet.</p>
                </div>
              </div>

              {selectedProject.status === 'submitted' && (
                <div className="mt-6 flex gap-4">
                  <button
                    disabled={isProcessing === selectedProject.projectId}
                    onClick={() => handleVerification(selectedProject.projectId, 'approve')}
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
                  >
                    {isProcessing === selectedProject.projectId ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Sign & Approve Project'}
                  </button>
                  <button
                    disabled={isProcessing === selectedProject.projectId}
                    onClick={() => handleVerification(selectedProject.projectId, 'reject')}
                    className="flex-1 bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
                  >
                    Reject Project
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectVerification;
