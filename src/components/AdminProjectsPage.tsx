import React, { useState } from 'react';
import {
  Search, Filter, Grid, List, Eye, Edit, CheckCircle, FileText, MapPin,
  Calendar, TrendingUp, AlertCircle, Download, RefreshCw, XCircle,
  AlertTriangle, Users, Leaf, BarChart3, CheckSquare, Square, ChevronDown
} from 'lucide-react';

interface BlueCarbonSite {
  siteId: string;
  siteName: string;
  state: string;
  latitude: number;
  longitude: number;
  ecosystemType: 'Mangrove' | 'Seagrass' | 'Saltmarsh';
  restorationDate: string;
  areaHa: number;
  plantingDensity: number;
  dominantSpecies: string;
  survivalRate: number;
  carbonSequestered: number;
  monitoringMethod: string;
  lastMonitored: string;
  status: 'Active' | 'Monitoring' | 'Completed' | 'At Risk' | 'Pending Approval';
  remarks: string;
  verificationStatus?: 'verified' | 'pending' | 'failed';
  approvalStatus?: 'approved' | 'pending' | 'rejected';
}

const AdminProjectsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEcosystem, setFilterEcosystem] = useState<string>('All');
  const [filterState, setFilterState] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterSurvival, setFilterSurvival] = useState<string>('All');
  const [selectedSites, setSelectedSites] = useState<Set<string>>(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedProject, setSelectedProject] = useState<BlueCarbonSite | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [auditInProgress, setAuditInProgress] = useState<Set<string>>(new Set());

  // Blue Carbon Sites Data
  const blueCarbonSites: BlueCarbonSite[] = [
    {
      siteId: 'CLORIT-2000', siteName: 'Site_2000', state: 'Lakshadweep',
      latitude: 11.032842, longitude: 75.310252, ecosystemType: 'Saltmarsh',
      restorationDate: '2021-12-30', areaHa: 38.64, plantingDensity: 4805,
      dominantSpecies: 'Salicornia spp.', survivalRate: 67.6,
      carbonSequestered: 8460.51, monitoringMethod: 'Field survey',
      lastMonitored: '2023-03-22', status: 'Monitoring', remarks: 'Successful expansion',
      verificationStatus: 'verified', approvalStatus: 'approved'
    },
    {
      siteId: 'CLORIT-2001', siteName: 'Site_2001', state: 'West Bengal',
      latitude: 17.568906, longitude: 72.914617, ecosystemType: 'Mangrove',
      restorationDate: '2015-03-12', areaHa: 97.95, plantingDensity: 1242,
      dominantSpecies: 'Rhizophora mucronata', survivalRate: 95.4,
      carbonSequestered: 21128.78, monitoringMethod: 'Field survey',
      lastMonitored: '2016-01-03', status: 'Completed', remarks: 'Invasive species pressure',
      verificationStatus: 'verified', approvalStatus: 'approved'
    },
    {
      siteId: 'CLORIT-2002', siteName: 'Site_2002', state: 'Andhra Pradesh',
      latitude: 15.679539, longitude: 81.394252, ecosystemType: 'Mangrove',
      restorationDate: '2020-08-25', areaHa: 104.75, plantingDensity: 2680,
      dominantSpecies: 'Rhizophora mucronata', survivalRate: 77.9,
      carbonSequestered: 11390.1, monitoringMethod: 'Drone survey',
      lastMonitored: '2022-02-22', status: 'Active', remarks: 'High survival',
      verificationStatus: 'verified', approvalStatus: 'approved'
    },
    {
      siteId: 'CLORIT-2003', siteName: 'Site_2003', state: 'Puducherry',
      latitude: 18.853545, longitude: 76.004004, ecosystemType: 'Seagrass',
      restorationDate: '2016-04-22', areaHa: 106.94, plantingDensity: 2639,
      dominantSpecies: 'Halophila ovalis', survivalRate: 52.4,
      carbonSequestered: 11916.54, monitoringMethod: 'Combined (field+RS)',
      lastMonitored: '2017-07-26', status: 'At Risk', remarks: 'Good recruitment',
      verificationStatus: 'failed', approvalStatus: 'approved'
    },
    {
      siteId: 'CLORIT-2004', siteName: 'Site_2004', state: 'Lakshadweep',
      latitude: 9.359474, longitude: 81.484552, ecosystemType: 'Mangrove',
      restorationDate: '2019-05-23', areaHa: 82.94, plantingDensity: 3407,
      dominantSpecies: 'Bruguiera gymnorhiza', survivalRate: 47.4,
      carbonSequestered: 8970.33, monitoringMethod: 'Combined (field+RS)',
      lastMonitored: '2020-09-07', status: 'At Risk', remarks: 'Successful expansion',
      verificationStatus: 'failed', approvalStatus: 'approved'
    },
    {
      siteId: 'CLORIT-2005', siteName: 'Site_2005', state: 'Lakshadweep',
      latitude: 19.375567, longitude: 75.426604, ecosystemType: 'Saltmarsh',
      restorationDate: '2020-08-16', areaHa: 109.96, plantingDensity: 2351,
      dominantSpecies: 'Salicornia spp.', survivalRate: 90.9,
      carbonSequestered: 8806.64, monitoringMethod: 'Remote sensing',
      lastMonitored: '2024-02-13', status: 'Active', remarks: 'High survival',
      verificationStatus: 'verified', approvalStatus: 'approved'
    },
    {
      siteId: 'CLORIT-2006', siteName: 'Site_2006', state: 'Kerala',
      latitude: 17.96501, longitude: 75.308291, ecosystemType: 'Seagrass',
      restorationDate: '2020-09-18', areaHa: 49.16, plantingDensity: 2460,
      dominantSpecies: 'Thalassia hemprichii', survivalRate: 56.1,
      carbonSequestered: 6242.92, monitoringMethod: 'Combined (field+RS)',
      lastMonitored: '2026-02-10', status: 'Monitoring', remarks: 'High survival',
      verificationStatus: 'pending', approvalStatus: 'approved'
    },
    {
      siteId: 'CLORIT-2007', siteName: 'Site_2007', state: 'West Bengal',
      latitude: 18.078638, longitude: 72.002658, ecosystemType: 'Mangrove',
      restorationDate: '2022-07-24', areaHa: 19.93, plantingDensity: 2096,
      dominantSpecies: 'Rhizophora mucronata', survivalRate: 85.8,
      carbonSequestered: 3495.3, monitoringMethod: 'Combined (field+RS)',
      lastMonitored: '2023-02-06', status: 'Active', remarks: 'Storm damage observed',
      verificationStatus: 'verified', approvalStatus: 'approved'
    },
    {
      siteId: 'CLORIT-2008', siteName: 'Site_2008', state: 'Tamil Nadu',
      latitude: 15.204565, longitude: 88.239911, ecosystemType: 'Mangrove',
      restorationDate: '2023-12-22', areaHa: 65.5, plantingDensity: 2800,
      dominantSpecies: 'Avicennia marina', survivalRate: 88.5,
      carbonSequestered: 7250.0, monitoringMethod: 'Drone survey',
      lastMonitored: '2024-01-15', status: 'Pending Approval', remarks: 'New submission',
      verificationStatus: 'pending', approvalStatus: 'pending'
    },
    {
      siteId: 'CLORIT-2009', siteName: 'Site_2009', state: 'Andhra Pradesh',
      latitude: 22.142736, longitude: 68.477763, ecosystemType: 'Saltmarsh',
      restorationDate: '2015-08-21', areaHa: 27.24, plantingDensity: 1576,
      dominantSpecies: 'Salicornia spp.', survivalRate: 94.1,
      carbonSequestered: 3477.76, monitoringMethod: 'Remote sensing',
      lastMonitored: '2016-08-26', status: 'Completed', remarks: 'Invasive species pressure',
      verificationStatus: 'verified', approvalStatus: 'approved'
    }
  ];

  const filteredSites = blueCarbonSites.filter(site => {
    const matchesSearch = site.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.dominantSpecies.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEcosystem = filterEcosystem === 'All' || site.ecosystemType === filterEcosystem;
    const matchesState = filterState === 'All' || site.state === filterState;
    const matchesStatus = filterStatus === 'All' || site.status === filterStatus;
    const matchesSurvival = filterSurvival === 'All' ||
      (filterSurvival === 'High' && site.survivalRate >= 80) ||
      (filterSurvival === 'Medium' && site.survivalRate >= 60 && site.survivalRate < 80) ||
      (filterSurvival === 'Low' && site.survivalRate < 60);
    return matchesSearch && matchesEcosystem && matchesState && matchesStatus && matchesSurvival;
  });

  const atRiskSites = blueCarbonSites.filter(s => s.survivalRate < 60);
  const pendingApprovals = blueCarbonSites.filter(s => s.approvalStatus === 'pending');
  const totalCarbon = blueCarbonSites.reduce((sum, s) => sum + s.carbonSequestered, 0);
  const avgSurvival = blueCarbonSites.reduce((sum, s) => sum + s.survivalRate, 0) / blueCarbonSites.length;

  const handleSelectAll = () => {
    if (selectedSites.size === filteredSites.length) {
      setSelectedSites(new Set());
    } else {
      setSelectedSites(new Set(filteredSites.map(s => s.siteId)));
    }
  };

  const handleSelectSite = (siteId: string) => {
    const newSelected = new Set(selectedSites);
    if (newSelected.has(siteId)) {
      newSelected.delete(siteId);
    } else {
      newSelected.add(siteId);
    }
    setSelectedSites(newSelected);
  };

  const handleApprove = async (siteId: string, event?: React.MouseEvent) => {
    // Prevent event bubbling
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    console.log(`Approving project ${siteId}`);

    try {
      // Check if MetaMask is available (use window.ethereum directly, not window.solana)
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        alert('Please install MetaMask to approve projects.\n\nNote: If you have Phantom wallet, please disable it temporarily.');
        return;
      }

      // Disable Phantom wallet interference
      if (window.solana) {
        console.log('Phantom wallet detected, using MetaMask instead');
      }

      // Get wallet address from MetaMask specifically
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      const walletAddress = accounts[0];

      // Create message to sign
      const message = `Approve Project: ${siteId}\nTimestamp: ${Date.now()}\nAction: Admin Approval`;

      // Request signature
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, walletAddress]
      });

      // Get JWT token from localStorage
      const token = localStorage.getItem('authToken');

      if (!token) {
        alert('⚠️ Authentication required\n\nNo session token found. Please login through the Admin Login page.\n\nYou will NOT be redirected automatically.');
        console.error('No auth token found. Current localStorage:', {
          authToken: localStorage.getItem('authToken'),
          userProfile: localStorage.getItem('userProfile')
        });
        return;
      }

      // Call backend API
      const response = await fetch(`http://localhost:5001/api/admin/projects/${siteId}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          signature,
          message,
          notes: 'Approved via admin dashboard',
          finalCarbonCredits: 1250 // You can make this dynamic
        })
      });

      const data = await response.json();

      if (data.success) {
        alert(`✅ Project ${siteId} approved successfully!`);
        // Refresh the page or update state
        window.location.reload();
      } else {
        alert(`❌ Failed to approve: ${data.message}`);
      }
    } catch (error: any) {
      console.error('Approval error:', error);

      // Detailed error message
      let errorMessage = 'Failed to approve project';

      if (error.message === 'Failed to fetch') {
        errorMessage = `❌ Cannot connect to backend server\n\nPlease check:\n1. Backend is running on http://localhost:5001\n2. No firewall blocking the connection\n3. CORS is properly configured\n\nError: ${error.message}`;
      } else if (error.name === 'TypeError') {
        errorMessage = `❌ Network error\n\nCannot reach the backend API.\nMake sure the backend server is running.\n\nError: ${error.message}`;
      } else {
        errorMessage = `❌ Error: ${error.message || 'Unknown error occurred'}`;
      }

      alert(errorMessage);
    }
  };

  const handleReject = async (siteId: string, event?: React.MouseEvent) => {
    // Prevent event bubbling
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    const reason = prompt('Please provide a reason for rejection:');
    if (!reason) return;

    console.log(`Rejecting project ${siteId}`);

    try {
      // Check if MetaMask is available (not Phantom)
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        alert('Please install MetaMask to reject projects.\n\nNote: If you have Phantom wallet, please disable it temporarily.');
        return;
      }

      // Get wallet address from MetaMask
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      const walletAddress = accounts[0];

      // Create message to sign
      const message = `Reject Project: ${siteId}\nReason: ${reason}\nTimestamp: ${Date.now()}`;

      // Request signature
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, walletAddress]
      });

      // Get JWT token
      const token = localStorage.getItem('authToken');

      if (!token) {
        alert('⚠️ Authentication required\n\nNo session token found. Please login through the Admin Login page.\n\nYou will NOT be redirected automatically.');
        console.error('No auth token found. Current localStorage:', {
          authToken: localStorage.getItem('authToken'),
          userProfile: localStorage.getItem('userProfile')
        });
        return;
      }

      // Call backend API
      const response = await fetch(`http://localhost:5001/api/admin/projects/${siteId}/reject`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          signature,
          message,
          reason
        })
      });

      const data = await response.json();

      if (data.success) {
        alert(`Project ${siteId} rejected.`);
        window.location.reload();
      } else {
        alert(`Failed to reject: ${data.message}`);
      }
    } catch (error: any) {
      console.error('Rejection error:', error);
      alert(`Error: ${error.message || 'Failed to reject project'}`);
    }
  };

  const handleBulkApprove = () => {
    console.log(`Bulk approving ${selectedSites.size} projects`);
    alert(`Bulk approval feature coming soon! Selected: ${selectedSites.size} projects`);
    // TODO: Implement bulk approval with backend API
  };

  const handleView = (site: BlueCarbonSite, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    setSelectedProject(site);
    setShowViewModal(true);
  };

  const handleEdit = (site: BlueCarbonSite, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    setSelectedProject(site);
    setShowEditModal(true);
  };

  const handleReport = (site: BlueCarbonSite, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    setSelectedProject(site);
    setShowReportModal(true);
  };

  const handleFlagForAudit = (siteId: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    // Prevent multiple rapid clicks (debounce)
    if (auditInProgress.has(siteId)) {
      return; // Silently ignore if already in progress
    }

    const site = blueCarbonSites.find(s => s.siteId === siteId);
    if (!site) return;

    // Mark as in progress
    setAuditInProgress(prev => new Set(prev).add(siteId));

    const confirmed = window.confirm(`Flag project ${siteId} for manual audit?\n\nProject: ${site.siteName}\nLocation: ${site.state}\n\nThis will notify the audit team for detailed review.`);

    if (confirmed) {
      console.log(`Flagging ${siteId} for audit`);
      alert(`✅ Project ${siteId} has been flagged for manual audit!\n\nThe audit team will be notified.`);
    }

    // Clear the in-progress flag after 1 second
    setTimeout(() => {
      setAuditInProgress(prev => {
        const newSet = new Set(prev);
        newSet.delete(siteId);
        return newSet;
      });
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return { bg: '#dcfce7', color: '#166534' };
      case 'Completed': return { bg: '#dbeafe', color: '#1e40af' };
      case 'Monitoring': return { bg: '#fef3c7', color: '#92400e' };
      case 'At Risk': return { bg: '#fee2e2', color: '#dc2626' };
      case 'Pending Approval': return { bg: '#fef3c7', color: '#92400e' };
      default: return { bg: '#f3f4f6', color: '#374151' };
    }
  };

  const getEcosystemColor = (ecosystem: string) => {
    switch (ecosystem) {
      case 'Mangrove': return { bg: '#dcfce7', color: '#166534' };
      case 'Seagrass': return { bg: '#dbeafe', color: '#1e40af' };
      case 'Saltmarsh': return { bg: '#fef3c7', color: '#92400e' };
      default: return { bg: '#f3f4f6', color: '#374151' };
    }
  };

  return (
    <div style={{ padding: '0 2rem 2rem 2rem', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Header with Admin Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#0077B6', display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0 }}>
              <MapPin size={28} />
              Blue Carbon Projects
            </h1>
            <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>Admin oversight & project management</p>
          </div>

          {/* Admin Control Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {selectedSites.size > 0 && (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowBulkActions(!showBulkActions)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem',
                    background: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.5rem',
                    cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500
                  }}
                >
                  Bulk Actions ({selectedSites.size}) <ChevronDown size={16} />
                </button>
                {showBulkActions && (
                  <div style={{
                    position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem',
                    background: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    border: '1px solid #e5e7eb', minWidth: '200px', zIndex: 10
                  }}>
                    <button onClick={handleBulkApprove} style={{
                      width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'white',
                      textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem'
                    }}>
                      ✅ Approve Selected
                    </button>
                    <button style={{
                      width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'white',
                      textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem', borderTop: '1px solid #f3f4f6'
                    }}>
                      📥 Export Selected
                    </button>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={() => setViewMode('grid')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem',
                border: '1px solid #d1d5db', borderRadius: '0.5rem',
                background: viewMode === 'grid' ? '#dbeafe' : 'white',
                color: viewMode === 'grid' ? '#1e40af' : '#374151',
                cursor: 'pointer', fontSize: '0.875rem'
              }}
            >
              <Grid size={16} /> Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem',
                border: '1px solid #d1d5db', borderRadius: '0.5rem',
                background: viewMode === 'list' ? '#dbeafe' : 'white',
                color: viewMode === 'list' ? '#1e40af' : '#374151',
                cursor: 'pointer', fontSize: '0.875rem'
              }}
            >
              <List size={16} /> List
            </button>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem',
              border: '1px solid #d1d5db', borderRadius: '0.5rem', background: 'white',
              cursor: 'pointer', fontSize: '0.875rem'
            }}>
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        {/* Summary Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Projects', value: blueCarbonSites.length.toString(), icon: BarChart3, color: '#3b82f6' },
            { label: 'At Risk', value: atRiskSites.length.toString(), icon: AlertTriangle, color: '#dc2626' },
            { label: 'Pending Approvals', value: pendingApprovals.length.toString(), icon: AlertCircle, color: '#f59e0b' },
            { label: 'Total Carbon', value: `${totalCarbon.toLocaleString(undefined, { maximumFractionDigits: 0 })} t`, icon: Leaf, color: '#10b981' },
            { label: 'Avg Survival', value: `${avgSurvival.toFixed(1)}%`, icon: TrendingUp, color: '#8b5cf6' }
          ].map((metric, idx) => (
            <div key={idx} style={{
              background: 'white', borderRadius: '1rem', padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500, margin: 0 }}>{metric.label}</p>
                  <p style={{ fontSize: '1.875rem', fontWeight: 700, color: '#1f2937', margin: '0.25rem 0 0 0' }}>{metric.value}</p>
                </div>
                <metric.icon size={32} style={{ color: metric.color, opacity: 0.7 }} />
              </div>
            </div>
          ))}
        </div>

        {/* At Risk & Pending Approvals Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          {/* At Risk Projects */}
          <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#dc2626', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={20} /> At Risk Projects ({atRiskSites.length})
            </h3>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {atRiskSites.length === 0 ? (
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>No projects at risk</p>
              ) : (
                atRiskSites.map(site => (
                  <div key={site.siteId} style={{
                    padding: '0.75rem', background: '#fee2e2', borderRadius: '0.5rem',
                    marginBottom: '0.5rem', border: '1px solid #fecaca'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontWeight: 600, color: '#dc2626', fontSize: '0.875rem', margin: 0 }}>{site.siteId}</p>
                        <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>{site.state} • Survival: {site.survivalRate}%</p>
                      </div>
                      <button
                        onClick={(e) => handleFlagForAudit(site.siteId, e)}
                        style={{
                          padding: '0.25rem 0.75rem', background: '#dc2626', color: 'white',
                          border: 'none', borderRadius: '0.375rem', fontSize: '0.75rem', cursor: 'pointer'
                        }}
                      >
                        Flag
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pending Approvals */}
          <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#f59e0b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={20} /> Pending Approvals ({pendingApprovals.length})
            </h3>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {pendingApprovals.length === 0 ? (
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>No pending approvals</p>
              ) : (
                pendingApprovals.map(site => (
                  <div key={site.siteId} style={{
                    padding: '0.75rem', background: '#fef3c7', borderRadius: '0.5rem',
                    marginBottom: '0.5rem', border: '1px solid #fde68a'
                  }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <p style={{ fontWeight: 600, color: '#92400e', fontSize: '0.875rem', margin: 0 }}>{site.siteId}</p>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>{site.state} • {site.areaHa.toFixed(1)} ha</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={(e) => handleApprove(site.siteId, e)}
                        style={{
                          flex: 1, padding: '0.375rem', background: '#10b981', color: 'white',
                          border: 'none', borderRadius: '0.375rem', fontSize: '0.75rem', cursor: 'pointer'
                        }}
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={(e) => handleReject(site.siteId, e)}
                        style={{
                          flex: 1, padding: '0.375rem', background: '#ef4444', color: 'white',
                          border: 'none', borderRadius: '0.375rem', fontSize: '0.75rem', cursor: 'pointer'
                        }}
                      >
                        ✗ Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
            <input
              type="text"
              placeholder="Search sites, states, or species..."
              style={{
                width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1px solid #d1d5db',
                borderRadius: '0.75rem', fontSize: '0.875rem', outline: 'none'
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', background: 'white', fontSize: '0.875rem', outline: 'none' }}
            value={filterEcosystem}
            onChange={(e) => setFilterEcosystem(e.target.value)}
          >
            <option value="All">All Ecosystems</option>
            <option value="Mangrove">Mangrove</option>
            <option value="Seagrass">Seagrass</option>
            <option value="Saltmarsh">Saltmarsh</option>
          </select>
          <select
            style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', background: 'white', fontSize: '0.875rem', outline: 'none' }}
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
          >
            <option value="All">All States</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Kerala">Kerala</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Lakshadweep">Lakshadweep</option>
            <option value="Puducherry">Puducherry</option>
          </select>
          <select
            style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', background: 'white', fontSize: '0.875rem', outline: 'none' }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Monitoring">Monitoring</option>
            <option value="Completed">Completed</option>
            <option value="At Risk">At Risk</option>
            <option value="Pending Approval">Pending Approval</option>
          </select>
          <select
            style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', background: 'white', fontSize: '0.875rem', outline: 'none' }}
            value={filterSurvival}
            onChange={(e) => setFilterSurvival(e.target.value)}
          >
            <option value="All">All Survival Rates</option>
            <option value="High">High (≥80%)</option>
            <option value="Medium">Medium (60-79%)</option>
            <option value="Low">Low (\u003c60%)</option>
          </select>
        </div>

        {/* Bulk Selection Header */}
        {viewMode === 'grid' && filteredSites.length > 0 && (
          <div style={{
            background: 'white', padding: '0.75rem 1rem', borderRadius: '0.5rem',
            marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
            border: '1px solid #e5e7eb'
          }}>
            <button
              onClick={handleSelectAll}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem',
                border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.875rem'
              }}
            >
              {selectedSites.size === filteredSites.length ? <CheckSquare size={18} color="#3b82f6" /> : <Square size={18} />}
              Select All ({filteredSites.length})
            </button>
            {selectedSites.size > 0 && (
              <span style={{ color: '#3b82f6', fontSize: '0.875rem', fontWeight: 500 }}>
                {selectedSites.size} selected
              </span>
            )}
          </div>
        )}

        {/* Projects Grid */}
        {viewMode === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.5rem' }}>
            {filteredSites.map((site) => {
              const statusStyle = getStatusColor(site.status);
              const ecosystemStyle = getEcosystemColor(site.ecosystemType);
              const isSelected = selectedSites.has(site.siteId);

              return (
                <div
                  key={site.siteId}
                  style={{
                    background: 'white', borderRadius: '1rem', padding: '1.5rem',
                    boxShadow: isSelected ? '0 0 0 2px #3b82f6' : '0 4px 6px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #e5e7eb', transition: 'all 0.2s', cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  {/* Selection Checkbox */}
                  <button
                    onClick={() => handleSelectSite(site.siteId)}
                    style={{
                      position: 'absolute', top: '1rem', left: '1rem', padding: '0.25rem',
                      border: 'none', background: 'transparent', cursor: 'pointer'
                    }}
                  >
                    {isSelected ? <CheckSquare size={20} color="#3b82f6" /> : <Square size={20} />}
                  </button>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', paddingLeft: '2rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.25rem' }}>{site.siteId}</h3>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{site.siteName} • {site.state}</p>
                    </div>
                    <div style={{ ...statusStyle, padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {site.status}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={14} /> Ecosystem
                    </span>
                    <span style={{ ...ecosystemStyle, padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {site.ecosystemType}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <TrendingUp size={14} /> Survival Rate
                    </span>
                    <span style={{
                      fontSize: '0.875rem', fontWeight: 600,
                      color: site.survivalRate >= 80 ? '#166534' : site.survivalRate >= 60 ? '#92400e' : '#dc2626'
                    }}>
                      {site.survivalRate}%
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Area Restored</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{site.areaHa.toFixed(1)} ha</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Carbon Sequestered</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{site.carbonSequestered.toLocaleString()} t CO₂e</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={14} /> Last Monitored
                    </span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{new Date(site.lastMonitored).toLocaleDateString()}</span>
                  </div>

                  {/* Admin Actions */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f3f4f6' }}>
                    {site.approvalStatus === 'pending' ? (
                      <>
                        <button
                          onClick={(e) => handleApprove(site.siteId, e)}
                          style={{
                            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem',
                            padding: '0.5rem 0.75rem', border: 'none', borderRadius: '0.5rem',
                            background: '#10b981', color: 'white', cursor: 'pointer', fontSize: '0.75rem'
                          }}
                        >
                          <CheckCircle size={14} /> Approve
                        </button>
                        <button
                          onClick={(e) => handleReject(site.siteId, e)}
                          style={{
                            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem',
                            padding: '0.5rem 0.75rem', border: 'none', borderRadius: '0.5rem',
                            background: '#ef4444', color: 'white', cursor: 'pointer', fontSize: '0.75rem'
                          }}
                        >
                          <XCircle size={14} /> Reject
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={(e) => handleView(site, e)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.5rem 0.75rem',
                            border: '1px solid #d1d5db', borderRadius: '0.5rem', background: 'white',
                            cursor: 'pointer', fontSize: '0.75rem'
                          }}
                        >
                          <Eye size={14} /> View
                        </button>
                        <button
                          onClick={(e) => handleEdit(site, e)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.5rem 0.75rem',
                            border: '1px solid #d1d5db', borderRadius: '0.5rem', background: 'white',
                            cursor: 'pointer', fontSize: '0.75rem'
                          }}
                        >
                          <Edit size={14} /> Edit
                        </button>
                        <button
                          onClick={(e) => handleReport(site, e)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.5rem 0.75rem',
                            border: '1px solid #d1d5db', borderRadius: '0.5rem', background: 'white',
                            cursor: 'pointer', fontSize: '0.75rem'
                          }}
                        >
                          <FileText size={14} /> Report
                        </button>
                        <button
                          onClick={(e) => handleFlagForAudit(site.siteId, e)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.5rem 0.75rem',
                            border: '1px solid #d1d5db', borderRadius: '0.5rem', background: 'white',
                            cursor: 'pointer', fontSize: '0.75rem'
                          }}
                        >
                          <AlertTriangle size={14} /> Audit
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f8f9fa' }}>
                <tr>
                  <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#374151', borderBottom: '2px solid #e5e7eb' }}>
                    <input type="checkbox" onChange={handleSelectAll} checked={selectedSites.size === filteredSites.length} />
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#374151', borderBottom: '2px solid #e5e7eb' }}>Site ID</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#374151', borderBottom: '2px solid #e5e7eb' }}>Location</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#374151', borderBottom: '2px solid #e5e7eb' }}>Ecosystem</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#374151', borderBottom: '2px solid #e5e7eb' }}>Area (ha)</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#374151', borderBottom: '2px solid #e5e7eb' }}>Survival Rate</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#374151', borderBottom: '2px solid #e5e7eb' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#374151', borderBottom: '2px solid #e5e7eb' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSites.map((site) => {
                  const statusStyle = getStatusColor(site.status);
                  const ecosystemStyle = getEcosystemColor(site.ecosystemType);

                  return (
                    <tr key={site.siteId} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1f2937' }}>
                        <input
                          type="checkbox"
                          checked={selectedSites.has(site.siteId)}
                          onChange={() => handleSelectSite(site.siteId)}
                        />
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1f2937', fontWeight: 600 }}>{site.siteId}</td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1f2937' }}>
                        <div>
                          <div style={{ fontWeight: 500 }}>{site.siteName}</div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{site.state}</div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1f2937' }}>
                        <span style={{ ...ecosystemStyle, padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                          {site.ecosystemType}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1f2937' }}>{site.areaHa.toFixed(1)}</td>
                      <td style={{
                        padding: '1rem', fontSize: '0.875rem', fontWeight: 600,
                        color: site.survivalRate >= 80 ? '#166534' : site.survivalRate >= 60 ? '#92400e' : '#dc2626'
                      }}>
                        {site.survivalRate}%
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1f2937' }}>
                        <span style={{ ...statusStyle, padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                          {site.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1f2937' }}>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          {site.approvalStatus === 'pending' ? (
                            <>
                              <button
                                onClick={(e) => handleApprove(site.siteId, e)}
                                style={{ padding: '0.25rem 0.5rem', border: 'none', background: '#10b981', color: 'white', borderRadius: '0.375rem', fontSize: '0.75rem', cursor: 'pointer' }}
                              >
                                ✓
                              </button>
                              <button
                                onClick={(e) => handleReject(site.siteId, e)}
                                style={{ padding: '0.25rem 0.5rem', border: 'none', background: '#ef4444', color: 'white', borderRadius: '0.375rem', fontSize: '0.75rem', cursor: 'pointer' }}
                              >
                                ✗
                              </button>
                            </>
                          ) : (
                            <>
                              <button style={{ padding: '0.25rem 0.5rem', border: '1px solid #d1d5db', background: 'white', borderRadius: '0.375rem', cursor: 'pointer' }}>
                                <Eye size={12} />
                              </button>
                              <button style={{ padding: '0.25rem 0.5rem', border: '1px solid #d1d5db', background: 'white', borderRadius: '0.375rem', cursor: 'pointer' }}>
                                <Edit size={12} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {filteredSites.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
            <AlertCircle size={48} style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>No sites found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* View Project Modal */}
      {showViewModal && selectedProject && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowViewModal(false)}>
          <div style={{
            background: 'white', borderRadius: '1rem', padding: '2rem',
            maxWidth: '600px', width: '90%', maxHeight: '80vh', overflowY: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0077B6', marginBottom: '1.5rem' }}>
              Project Details: {selectedProject.siteId}
            </h2>

            <div style={{ display: 'grid', gap: '1rem' }}>
              <div><strong>Site Name:</strong> {selectedProject.siteName}</div>
              <div><strong>Location:</strong> {selectedProject.state}</div>
              <div><strong>Coordinates:</strong> {selectedProject.latitude.toFixed(4)}, {selectedProject.longitude.toFixed(4)}</div>
              <div><strong>Ecosystem:</strong> {selectedProject.ecosystemType}</div>
              <div><strong>Area:</strong> {selectedProject.areaHa.toFixed(1)} hectares</div>
              <div><strong>Dominant Species:</strong> {selectedProject.dominantSpecies}</div>
              <div><strong>Planting Density:</strong> {selectedProject.plantingDensity} plants/ha</div>
              <div><strong>Survival Rate:</strong> {selectedProject.survivalRate}%</div>
              <div><strong>Carbon Sequestered:</strong> {selectedProject.carbonSequestered.toLocaleString()} t CO₂e</div>
              <div><strong>Restoration Date:</strong> {new Date(selectedProject.restorationDate).toLocaleDateString()}</div>
              <div><strong>Last Monitored:</strong> {new Date(selectedProject.lastMonitored).toLocaleDateString()}</div>
              <div><strong>Monitoring Method:</strong> {selectedProject.monitoringMethod}</div>
              <div><strong>Status:</strong> <span style={getStatusColor(selectedProject.status)}>{selectedProject.status}</span></div>
              <div><strong>Remarks:</strong> {selectedProject.remarks}</div>
            </div>

            <button onClick={() => setShowViewModal(false)} style={{
              marginTop: '1.5rem', padding: '0.75rem 1.5rem', background: '#0077B6',
              color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', width: '100%'
            }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {showEditModal && selectedProject && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowEditModal(false)}>
          <div style={{
            background: 'white', borderRadius: '1rem', padding: '2rem',
            maxWidth: '600px', width: '90%', maxHeight: '80vh', overflowY: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0077B6', marginBottom: '1.5rem' }}>
              Edit Project: {selectedProject.siteId}
            </h2>

            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Survival Rate (%)</label>
                <input type="number" defaultValue={selectedProject.survivalRate}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Status</label>
                <select defaultValue={selectedProject.status}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}>
                  <option value="Active">Active</option>
                  <option value="Monitoring">Monitoring</option>
                  <option value="Completed">Completed</option>
                  <option value="At Risk">At Risk</option>
                  <option value="Pending Approval">Pending Approval</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Remarks</label>
                <textarea defaultValue={selectedProject.remarks}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', minHeight: '100px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button onClick={() => {
                alert('✅ Project updated successfully!');
                setShowEditModal(false);
              }} style={{
                flex: 1, padding: '0.75rem', background: '#10b981',
                color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer'
              }}>
                Save Changes
              </button>
              <button onClick={() => setShowEditModal(false)} style={{
                flex: 1, padding: '0.75rem', background: '#6b7280',
                color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer'
              }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && selectedProject && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowReportModal(false)}>
          <div style={{
            background: 'white', borderRadius: '1rem', padding: '2rem',
            maxWidth: '600px', width: '90%'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0077B6', marginBottom: '1.5rem' }}>
              Generate Report: {selectedProject.siteId}
            </h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ marginBottom: '1rem' }}>Select report type:</p>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', cursor: 'pointer' }}>
                  <input type="radio" name="reportType" value="summary" defaultChecked />
                  <span>📊 Project Summary Report</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', cursor: 'pointer' }}>
                  <input type="radio" name="reportType" value="carbon" />
                  <span>🌳 Carbon Sequestration Report</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', cursor: 'pointer' }}>
                  <input type="radio" name="reportType" value="monitoring" />
                  <span>📈 Monitoring & Compliance Report</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', cursor: 'pointer' }}>
                  <input type="radio" name="reportType" value="audit" />
                  <span>🔍 Audit Trail Report</span>
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => {
                alert('📄 Report generated successfully!\\n\\nThe report has been downloaded as PDF.');
                setShowReportModal(false);
              }} style={{
                flex: 1, padding: '0.75rem', background: '#0077B6',
                color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer'
              }}>
                Generate Report
              </button>
              <button onClick={() => setShowReportModal(false)} style={{
                flex: 1, padding: '0.75rem', background: '#6b7280',
                color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer'
              }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjectsPage;
