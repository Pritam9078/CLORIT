import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Calendar, MapPin, FileText, Eye, Download, Search, Filter, Bell, TrendingUp, Activity } from 'lucide-react';

interface ComplianceRecord {
  id: string;
  projectId: string;
  projectTitle: string;
  communityName: string;
  complianceType: 'environmental' | 'documentation' | 'monitoring' | 'legal' | 'financial';
  status: 'compliant' | 'non_compliant' | 'pending_review' | 'under_investigation';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  lastAuditDate: string;
  nextAuditDate: string;
  issues: {
    id: string;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    dateIdentified: string;
    status: 'open' | 'in_progress' | 'resolved';
  }[];
  documents: {
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    status: 'approved' | 'pending' | 'rejected';
  }[];
  complianceScore: number; // 0-100
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

interface MonitoringAlert {
  id: string;
  type: 'deadline' | 'violation' | 'audit_due' | 'documentation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  projectId: string;
  dateCreated: string;
  isRead: boolean;
}

const ComplianceMonitoring: React.FC = () => {
  const [complianceRecords, setComplianceRecords] = useState<ComplianceRecord[]>([
    {
      id: 'COMP-001',
      projectId: 'SUB-2024-001',
      projectTitle: 'Mangrove Restoration Project',
      communityName: 'Green Valley Community',
      complianceType: 'environmental',
      status: 'compliant',
      riskLevel: 'low',
      lastAuditDate: '2024-08-15',
      nextAuditDate: '2024-11-15',
      issues: [],
      documents: [
        {
          id: 'doc1',
          name: 'Environmental Impact Assessment.pdf',
          type: 'pdf',
          uploadDate: '2024-08-10',
          status: 'approved'
        }
      ],
      complianceScore: 95,
      location: {
        lat: 12.9716,
        lng: 77.5946,
        address: 'Coastal Area, Green Valley'
      }
    },
    {
      id: 'COMP-002',
      projectId: 'SUB-2024-002',
      projectTitle: 'Urban Reforestation Drive',
      communityName: 'Forest Hills Initiative',
      complianceType: 'documentation',
      status: 'non_compliant',
      riskLevel: 'high',
      lastAuditDate: '2024-07-20',
      nextAuditDate: '2024-10-20',
      issues: [
        {
          id: 'issue1',
          description: 'Missing species verification documents',
          severity: 'high',
          dateIdentified: '2024-09-10',
          status: 'in_progress'
        },
        {
          id: 'issue2',
          description: 'Incomplete monitoring reports',
          severity: 'medium',
          dateIdentified: '2024-09-05',
          status: 'open'
        }
      ],
      documents: [
        {
          id: 'doc2',
          name: 'Monitoring Report Q2.pdf',
          type: 'pdf',
          uploadDate: '2024-07-15',
          status: 'rejected'
        }
      ],
      complianceScore: 65,
      location: {
        lat: 12.8716,
        lng: 77.6946,
        address: 'Forest Hills, Sector 12'
      }
    }
  ]);

  const [alerts, setAlerts] = useState<MonitoringAlert[]>([
    {
      id: 'ALERT-001',
      type: 'deadline',
      severity: 'high',
      message: 'Compliance audit due for Urban Reforestation Drive in 5 days',
      projectId: 'SUB-2024-002',
      dateCreated: '2024-09-14',
      isRead: false
    },
    {
      id: 'ALERT-002',
      type: 'violation',
      severity: 'critical',
      message: 'Missing documentation detected for Forest Hills Initiative',
      projectId: 'SUB-2024-002',
      dateCreated: '2024-09-10',
      isRead: false
    }
  ]);

  const [selectedRecord, setSelectedRecord] = useState<ComplianceRecord | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [newIssue, setNewIssue] = useState({
    description: '',
    severity: 'medium' as 'low' | 'medium' | 'high' | 'critical'
  });

  const filteredRecords = complianceRecords.filter(record => {
    const matchesSearch = record.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.communityName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    const matchesRisk = filterRisk === 'all' || record.riskLevel === filterRisk;
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-100';
      case 'non_compliant': return 'text-red-600 bg-red-100';
      case 'pending_review': return 'text-yellow-600 bg-yellow-100';
      case 'under_investigation': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      case 'critical': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      case 'critical': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getComplianceScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const handleMarkAlertRead = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const handleAddIssue = (recordId: string) => {
    if (!newIssue.description.trim()) return;

    const updatedRecords = complianceRecords.map(record => {
      if (record.id === recordId) {
        const updatedIssues = [...record.issues, {
          id: `issue-${Date.now()}`,
          description: newIssue.description,
          severity: newIssue.severity,
          dateIdentified: new Date().toISOString().split('T')[0],
          status: 'open' as const
        }];
        
        return {
          ...record,
          issues: updatedIssues,
          status: 'non_compliant' as const,
          complianceScore: Math.max(record.complianceScore - 15, 0)
        };
      }
      return record;
    });

    setComplianceRecords(updatedRecords);
    setNewIssue({ description: '', severity: 'medium' });
  };

  const handleResolveIssue = (recordId: string, issueId: string) => {
    const updatedRecords = complianceRecords.map(record => {
      if (record.id === recordId) {
        const updatedIssues = record.issues.map(issue =>
          issue.id === issueId ? { ...issue, status: 'resolved' as const } : issue
        );
        
        const openIssues = updatedIssues.filter(issue => issue.status !== 'resolved');
        const newStatus: 'compliant' | 'non_compliant' = openIssues.length === 0 ? 'compliant' : 'non_compliant';
        const scoreBonus = openIssues.length === 0 ? 10 : 5;
        
        return {
          ...record,
          issues: updatedIssues,
          status: newStatus,
          complianceScore: Math.min(record.complianceScore + scoreBonus, 100)
        };
      }
      return record;
    });

    setComplianceRecords(updatedRecords);
  };

  const unreadAlerts = alerts.filter(alert => !alert.isRead);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance Monitoring</h1>
          <p className="text-gray-600">Monitor project compliance, track violations, and ensure regulatory adherence</p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Shield className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">{complianceRecords.length}</p>
                  <p className="text-sm text-blue-600">Total Projects</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {complianceRecords.filter(r => r.status === 'compliant').length}
                  </p>
                  <p className="text-sm text-green-600">Compliant</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center">
                <XCircle className="w-8 h-8 text-red-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {complianceRecords.filter(r => r.status === 'non_compliant').length}
                  </p>
                  <p className="text-sm text-red-600">Non-Compliant</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-yellow-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {complianceRecords.filter(r => r.riskLevel === 'high' || r.riskLevel === 'critical').length}
                  </p>
                  <p className="text-sm text-yellow-600">High Risk</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Bell className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-purple-600">{unreadAlerts.length}</p>
                  <p className="text-sm text-purple-600">Active Alerts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        {unreadAlerts.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-red-500" />
                Active Alerts ({unreadAlerts.length})
              </h2>
              <button
                onClick={() => setAlerts(alerts.map(alert => ({ ...alert, isRead: true })))}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </button>
            </div>
            
            <div className="space-y-3">
              {unreadAlerts.slice(0, 3).map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.severity === 'critical' ? 'border-red-500 bg-red-50' :
                    alert.severity === 'high' ? 'border-orange-500 bg-orange-50' :
                    alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                    'border-blue-500 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <AlertTriangle className={`w-4 h-4 mr-2 ${getSeverityColor(alert.severity)}`} />
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          alert.severity === 'critical' ? 'bg-red-100 text-red-700' :
                          alert.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                          alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-900 font-medium mt-1">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(alert.dateCreated).toLocaleDateString()} • {alert.type}
                      </p>
                    </div>
                    <button
                      onClick={() => handleMarkAlertRead(alert.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by project title or community..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="compliant">Compliant</option>
                <option value="non_compliant">Non-Compliant</option>
                <option value="pending_review">Pending Review</option>
                <option value="under_investigation">Under Investigation</option>
              </select>
              
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
                <option value="critical">Critical Risk</option>
              </select>
              
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Compliance Records */}
        <div className="space-y-6">
          {filteredRecords.map((record) => (
            <div key={record.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{record.projectTitle}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {record.location.address}
                    </span>
                    <span>{record.communityName}</span>
                    <span className="capitalize">{record.complianceType}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                    {record.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(record.riskLevel)}`}>
                    {record.riskLevel.toUpperCase()} RISK
                  </span>
                  <div className={`text-2xl font-bold ${getComplianceScoreColor(record.complianceScore)}`}>
                    {record.complianceScore}%
                  </div>
                </div>
              </div>
              
              {/* Compliance Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Audit Information</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Last: {new Date(record.lastAuditDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Next: {new Date(record.nextAuditDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Documents ({record.documents.length})</h4>
                  <div className="space-y-1">
                    {record.documents.slice(0, 2).map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between text-sm">
                        <span className="truncate">{doc.name}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          doc.status === 'approved' ? 'bg-green-100 text-green-700' :
                          doc.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Issues ({record.issues.length})
                    {record.issues.filter(i => i.status === 'open').length > 0 && (
                      <span className="ml-1 text-red-600">
                        ({record.issues.filter(i => i.status === 'open').length} open)
                      </span>
                    )}
                  </h4>
                  <div className="space-y-1">
                    {record.issues.slice(0, 2).map((issue) => (
                      <div key={issue.id} className="flex items-start justify-between">
                        <span className="text-sm text-gray-700 flex-1">{issue.description}</span>
                        <div className="flex items-center space-x-2 ml-2">
                          <span className={`text-xs ${getSeverityColor(issue.severity)}`}>
                            {issue.severity}
                          </span>
                          {issue.status === 'open' && (
                            <button
                              onClick={() => handleResolveIssue(record.id, issue.id)}
                              className="text-green-600 hover:text-green-800"
                              title="Mark as resolved"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedRecord(record)}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </button>
                  
                  <button
                    onClick={() => setShowAuditModal(true)}
                    className="flex items-center text-green-600 hover:text-green-800 transition-colors"
                  >
                    <Activity className="w-4 h-4 mr-1" />
                    Schedule Audit
                  </button>
                  
                  <button className="flex items-center text-purple-600 hover:text-purple-800 transition-colors">
                    <Download className="w-4 h-4 mr-1" />
                    Export Data
                  </button>
                </div>
                
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Add Note
                  </button>
                  <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                    Report Issue
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed View Modal */}
        {selectedRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-semibold">{selectedRecord.projectTitle}</h3>
                  <p className="text-gray-600">{selectedRecord.communityName}</p>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Compliance Info */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Compliance Overview</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span>Compliance Score:</span>
                        <span className={`font-bold ${getComplianceScoreColor(selectedRecord.complianceScore)}`}>
                          {selectedRecord.complianceScore}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Risk Level:</span>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${getRiskColor(selectedRecord.riskLevel)}`}>
                          {selectedRecord.riskLevel.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(selectedRecord.status)}`}>
                          {selectedRecord.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-3">All Documents</h4>
                    <div className="space-y-2">
                      {selectedRecord.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <span className="font-medium">{doc.name}</span>
                            <p className="text-sm text-gray-600">
                              Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              doc.status === 'approved' ? 'bg-green-100 text-green-700' :
                              doc.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {doc.status}
                            </span>
                            <button className="text-blue-600 hover:text-blue-800">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Issues & Actions */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold">Issues & Violations</h4>
                      <button 
                        onClick={() => setShowAuditModal(true)}
                        className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200"
                      >
                        Report Issue
                      </button>
                    </div>
                    
                    {selectedRecord.issues.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
                        <p>No compliance issues found</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedRecord.issues.map((issue) => (
                          <div key={issue.id} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <p className="font-medium">{issue.description}</p>
                                <div className="flex items-center space-x-3 mt-1 text-sm text-gray-600">
                                  <span className={getSeverityColor(issue.severity)}>
                                    {issue.severity.toUpperCase()}
                                  </span>
                                  <span>{new Date(issue.dateIdentified).toLocaleDateString()}</span>
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    issue.status === 'resolved' ? 'bg-green-100 text-green-700' :
                                    issue.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                                    'bg-red-100 text-red-700'
                                  }`}>
                                    {issue.status.replace('_', ' ').toUpperCase()}
                                  </span>
                                </div>
                              </div>
                              {issue.status !== 'resolved' && (
                                <button
                                  onClick={() => handleResolveIssue(selectedRecord.id, issue.id)}
                                  className="ml-2 text-green-600 hover:text-green-800"
                                  title="Mark as resolved"
                                >
                                  <CheckCircle className="w-5 h-5" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Add New Issue Form */}
                  <div className="border-t pt-6">
                    <h5 className="font-medium mb-3">Report New Issue</h5>
                    <div className="space-y-3">
                      <textarea
                        placeholder="Describe the compliance issue..."
                        value={newIssue.description}
                        onChange={(e) => setNewIssue({...newIssue, description: e.target.value})}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <div className="flex items-center justify-between">
                        <select
                          value={newIssue.severity}
                          onChange={(e) => setNewIssue({...newIssue, severity: e.target.value as any})}
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="low">Low Severity</option>
                          <option value="medium">Medium Severity</option>
                          <option value="high">High Severity</option>
                          <option value="critical">Critical Severity</option>
                        </select>
                        <button
                          onClick={() => handleAddIssue(selectedRecord.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Report Issue
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplianceMonitoring;
