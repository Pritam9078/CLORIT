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
  Search
} from 'lucide-react';

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
  const [projects] = useState<Project[]>([
    {
      id: 'PRJ001',
      title: 'Mangrove Restoration Phase 1',
      community: 'Coastal Community Trust',
      location: 'Sundarbans, West Bengal',
      submissionDate: '2024-09-15',
      status: 'pending',
      area: 25.5,
      projectType: 'Mangrove Restoration',
      documents: ['before-photos.pdf', 'planting-plan.pdf', 'community-consent.pdf'],
      description: 'Large scale mangrove restoration project covering 25.5 hectares',
      coordinates: { lat: 21.9497, lng: 88.2529 }
    },
    {
      id: 'PRJ002',
      title: 'Urban Forest Development',
      community: 'Green City Initiative',
      location: 'Mumbai, Maharashtra',
      submissionDate: '2024-09-10',
      status: 'under-review',
      area: 12.3,
      projectType: 'Urban Forestry',
      documents: ['site-survey.pdf', 'species-list.pdf'],
      description: 'Creating green corridors in urban areas',
      coordinates: { lat: 19.0760, lng: 72.8777 }
    },
    {
      id: 'PRJ003',
      title: 'Grassland Conservation',
      community: 'Rural Development Collective',
      location: 'Rajasthan',
      submissionDate: '2024-09-08',
      status: 'approved',
      area: 45.2,
      projectType: 'Grassland Restoration',
      documents: ['baseline-study.pdf', 'restoration-plan.pdf'],
      description: 'Restoration of degraded grasslands',
      coordinates: { lat: 27.0238, lng: 74.2179 }
    }
  ]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredProjects = projects.filter(project => {
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.community.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleVerification = (projectId: string, action: 'approve' | 'reject') => {
    console.log(`${action} project ${projectId}`);
    // Implementation for verification actions
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
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Verified</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Eye className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Under Review</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Area</p>
              <p className="text-2xl font-bold text-gray-900">156.8 Ha</p>
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

      {/* Projects List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Users className="w-4 h-4 mr-1" />
                    {project.community}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.location}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(project.status)}`}>
                  {getStatusIcon(project.status)}
                  {project.status.replace('-', ' ').toUpperCase()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-sm">
                  <span className="text-gray-600">Area:</span>
                  <span className="ml-2 font-medium">{project.area} Ha</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="ml-2 font-medium">{project.projectType}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Submitted:</span>
                  <span className="ml-2 font-medium">{project.submissionDate}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Documents:</span>
                  <span className="ml-2 font-medium">{project.documents.length} files</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Review Details
                </button>
                {project.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleVerification(project.id, 'approve')}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleVerification(project.id, 'reject')}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

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
                    <div><span className="text-gray-600">Community:</span> <span className="ml-2">{selectedProject.community}</span></div>
                    <div><span className="text-gray-600">Location:</span> <span className="ml-2">{selectedProject.location}</span></div>
                    <div><span className="text-gray-600">Area:</span> <span className="ml-2">{selectedProject.area} hectares</span></div>
                    <div><span className="text-gray-600">Type:</span> <span className="ml-2">{selectedProject.projectType}</span></div>
                    <div><span className="text-gray-600">Submitted:</span> <span className="ml-2">{selectedProject.submissionDate}</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Documents</h3>
                  <div className="space-y-2">
                    {selectedProject.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{doc}</span>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600">{selectedProject.description}</p>
              </div>
              {selectedProject.status === 'pending' && (
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => {
                      handleVerification(selectedProject.id, 'approve');
                      setSelectedProject(null);
                    }}
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors font-medium"
                  >
                    Approve Project
                  </button>
                  <button
                    onClick={() => {
                      handleVerification(selectedProject.id, 'reject');
                      setSelectedProject(null);
                    }}
                    className="flex-1 bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors font-medium"
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
