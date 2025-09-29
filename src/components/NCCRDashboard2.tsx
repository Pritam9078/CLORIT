import React, { useState } from 'react';
import SatelliteGlobe from './SatelliteGlobe2';

interface NCCRProject {
  id: string;
  name: string;
  location: string;
  status: 'submitted' | 'ngo-verified' | 'panchayat-reviewed' | 'nccr-approved' | 'rejected';
  ndviValue: number;
  area: number;
  carbonCredits: number;
  submissionDate: string;
  ngoName: string;
}

interface NCCRDashboardProps {
  adminInfo?: {
    name: string;
    region: string;
    totalProjects: number;
  };
}

const NCCRDashboard: React.FC<NCCRDashboardProps> = ({
  adminInfo = {
    name: "Dr. Priya Sharma",
    region: "National Coastal & Marine",
    totalProjects: 25
  }
}) => {
  const [selectedProject, setSelectedProject] = useState<string>('proj-1');
  const [activeTab, setActiveTab] = useState<'overview' | 'approvals' | 'analytics' | 'downloads' | 'ndvi'>('overview');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Sample projects for NCCR review
  const nCCRProjects: NCCRProject[] = [
    {
      id: 'proj-1',
      name: 'Sundarbans Restoration',
      location: 'West Bengal',
      status: 'ngo-verified',
      ndviValue: 0.65,
      area: 45.2,
      carbonCredits: 1250,
      submissionDate: '2024-08-15',
      ngoName: 'Green Earth Foundation'
    },
    {
      id: 'proj-2',
      name: 'Kerala Backwaters',
      location: 'Kerala',
      status: 'panchayat-reviewed',
      ndviValue: 0.72,
      area: 32.7,
      carbonCredits: 980,
      submissionDate: '2024-08-20',
      ngoName: 'Coastal Conservation Trust'
    },
    {
      id: 'proj-3',
      name: 'Odisha Coast',
      location: 'Odisha',
      status: 'nccr-approved',
      ndviValue: 0.45,
      area: 67.1,
      carbonCredits: 1640,
      submissionDate: '2024-07-10',
      ngoName: 'Marine Ecosystem Foundation'
    },
    {
      id: 'proj-4',
      name: 'Tamil Nadu Estuary',
      location: 'Tamil Nadu',
      status: 'submitted',
      ndviValue: 0.78,
      area: 58.9,
      carbonCredits: 1840,
      submissionDate: '2024-09-01',
      ngoName: 'Ocean Blue Initiative'
    }
  ];

  const handleRegionClick = (region: any) => {
    setSelectedProject(region.id);
  };

  const handleProjectApproval = (projectId: string, action: 'approve' | 'reject') => {
    console.log(`${action} project ${projectId}`);
    // Implementation would update project status
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return '#64748b';
      case 'ngo-verified': return '#0077B6';
      case 'panchayat-reviewed': return '#FF9800';
      case 'nccr-approved': return '#4CAF50';
      case 'rejected': return '#F44336';
      default: return '#64748b';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'submitted': 'Submitted',
      'ngo-verified': 'NGO Verified',
      'panchayat-reviewed': 'Panchayat Reviewed',
      'nccr-approved': 'NCCR Approved',
      'rejected': 'Rejected'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const downloadDataset = (format: 'csv' | 'excel' | 'json') => {
    // Mock download functionality
    const filename = `nccr-mangrove-data-${new Date().toISOString().split('T')[0]}.${format}`;
    console.log(`Downloading ${filename}`);
  };

  const styles = {
    dashboard: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F8FAF9 0%, #E3F2FD 100%)',
      fontFamily: 'Inter, system-ui, sans-serif'
    },
    header: {
      background: 'linear-gradient(135deg, #0077B6 0%, #1565C0 100%)',
      color: 'white',
      padding: '2rem 0',
      borderRadius: '0 0 2rem 2rem'
    },
    headerContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '2.25rem',
      fontWeight: 700,
      margin: 0
    },
    subtitle: {
      fontSize: '1.125rem',
      opacity: 0.9,
      margin: '0.5rem 0 0 0'
    },
    adminInfo: {
      textAlign: 'right' as const,
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.25rem'
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem'
    },
    tabContainer: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem'
    },
    tab: {
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      border: '1px solid rgba(0, 119, 182, 0.2)',
      background: 'rgba(255, 255, 255, 0.8)',
      color: '#64748b',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: 600,
      transition: 'all 0.2s',
      backdropFilter: 'blur(10px)'
    },
    activeTab: {
      background: '#0077B6',
      color: 'white',
      borderColor: '#0077B6',
      boxShadow: '0 4px 15px rgba(0, 119, 182, 0.3)'
    },
    mainGrid: {
      display: 'grid',
      gap: '2rem',
      gridTemplateColumns: '2fr 1fr'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 10px 25px rgba(0, 119, 182, 0.1)',
      border: '1px solid rgba(0, 119, 182, 0.1)',
      backdropFilter: 'blur(10px)'
    },
    globeCard: {
      gridRow: '1 / 3',
      height: '700px',
      padding: 0,
      overflow: 'hidden'
    },
    fullWidthCard: {
      gridColumn: '1 / -1'
    },
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#0077B6',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    },
    statItem: {
      textAlign: 'center' as const,
      padding: '1.5rem',
      background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.05) 0%, rgba(21, 101, 192, 0.05) 100%)',
      borderRadius: '12px',
      border: '1px solid rgba(0, 119, 182, 0.1)'
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#0077B6',
      marginBottom: '0.5rem'
    },
    statLabel: {
      fontSize: '0.875rem',
      color: '#64748b',
      fontWeight: 500
    },
    projectList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem'
    },
    projectItem: {
      padding: '1.5rem',
      background: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '12px',
      border: '1px solid rgba(0, 119, 182, 0.1)',
      transition: 'all 0.2s',
      cursor: 'pointer'
    },
    projectHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    projectName: {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: '#1e293b'
    },
    projectMeta: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '1rem',
      marginBottom: '1rem'
    },
    metaItem: {
      textAlign: 'center' as const
    },
    metaValue: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#0077B6'
    },
    metaLabel: {
      fontSize: '0.75rem',
      color: '#64748b'
    },
    badge: {
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: 600,
      color: 'white',
      textTransform: 'uppercase' as const
    },
    actionButtons: {
      display: 'flex',
      gap: '0.5rem',
      marginTop: '1rem'
    },
    button: {
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      border: 'none',
      fontSize: '0.875rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    approveButton: {
      background: '#4CAF50',
      color: 'white'
    },
    rejectButton: {
      background: '#F44336',
      color: 'white'
    },
    viewButton: {
      background: 'rgba(0, 119, 182, 0.1)',
      color: '#0077B6',
      border: '1px solid rgba(0, 119, 182, 0.2)'
    },
    filterContainer: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '1rem',
      flexWrap: 'wrap' as const
    },
    filterButton: {
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      border: '1px solid rgba(0, 119, 182, 0.2)',
      background: 'transparent',
      color: '#64748b',
      cursor: 'pointer',
      fontSize: '0.75rem',
      fontWeight: 500,
      transition: 'all 0.2s'
    },
    activeFilter: {
      background: '#0077B6',
      color: 'white',
      borderColor: '#0077B6'
    },
    downloadSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem'
    },
    downloadCard: {
      padding: '1.5rem',
      background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.05) 0%, rgba(76, 175, 80, 0.05) 100%)',
      borderRadius: '12px',
      border: '1px solid rgba(0, 119, 182, 0.1)',
      textAlign: 'center' as const
    },
    downloadIcon: {
      fontSize: '2rem',
      marginBottom: '1rem'
    },
    downloadTitle: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#0077B6',
      marginBottom: '0.5rem'
    },
    downloadDesc: {
      fontSize: '0.875rem',
      color: '#64748b',
      marginBottom: '1rem'
    },
    downloadButton: {
      width: '100%',
      padding: '0.75rem',
      background: '#0077B6',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '0.875rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s'
    }
  };

  const renderOverviewTab = () => (
    <>
      {/* Globe */}
      <div style={{...styles.card, ...styles.globeCard}}>
        <SatelliteGlobe
          userRole="nccr"
          onRegionClick={handleRegionClick}
          selectedProjectId={selectedProject}
          showNDVILayer={true}
        />
      </div>

      {/* National Statistics */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>🏛️ National Overview</h3>
        <div style={styles.statsGrid}>
          <div style={styles.statItem}>
            <div style={styles.statValue}>25</div>
            <div style={styles.statLabel}>Total Projects</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statValue}>1,247</div>
            <div style={styles.statLabel}>Hectares</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statValue}>18</div>
            <div style={styles.statLabel}>Approved</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statValue}>12.5k</div>
            <div style={styles.statLabel}>Carbon Credits</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>📊 Recent Activity</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(76, 175, 80, 0.1)', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, color: '#4CAF50' }}>Project Approved</div>
            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Tamil Nadu Estuary - 58.9 hectares</div>
          </div>
          <div style={{ padding: '1rem', background: 'rgba(0, 119, 182, 0.1)', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, color: '#0077B6' }}>New Submission</div>
            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Gujarat Coastal Zone - Under review</div>
          </div>
          <div style={{ padding: '1rem', background: 'rgba(255, 152, 0, 0.1)', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, color: '#FF9800' }}>Pending Review</div>
            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Odisha Coast - Awaiting final approval</div>
          </div>
        </div>
      </div>
    </>
  );

  const renderApprovalsTab = () => {
    const filteredProjects = filterStatus === 'all' 
      ? nCCRProjects 
      : nCCRProjects.filter(p => p.status === filterStatus);

    return (
      <div style={{...styles.card, ...styles.fullWidthCard}}>
        <h3 style={styles.cardTitle}>✅ Project Approvals</h3>
        
        {/* Status Filters */}
        <div style={styles.filterContainer}>
          {['all', 'submitted', 'ngo-verified', 'panchayat-reviewed', 'nccr-approved'].map(status => (
            <button
              key={status}
              style={{
                ...styles.filterButton,
                ...(filterStatus === status ? styles.activeFilter : {})
              }}
              onClick={() => setFilterStatus(status)}
            >
              {status === 'all' ? 'All Projects' : getStatusLabel(status)}
            </button>
          ))}
        </div>

        {/* Project List */}
        <div style={styles.projectList}>
          {filteredProjects.map(project => (
            <div key={project.id} style={styles.projectItem}>
              <div style={styles.projectHeader}>
                <div style={styles.projectName}>{project.name}</div>
                <div style={{
                  ...styles.badge,
                  background: getStatusColor(project.status)
                }}>
                  {getStatusLabel(project.status)}
                </div>
              </div>
              
              <div style={styles.projectMeta}>
                <div style={styles.metaItem}>
                  <div style={styles.metaValue}>{project.location}</div>
                  <div style={styles.metaLabel}>Location</div>
                </div>
                <div style={styles.metaItem}>
                  <div style={styles.metaValue}>{project.area} ha</div>
                  <div style={styles.metaLabel}>Area</div>
                </div>
                <div style={styles.metaItem}>
                  <div style={styles.metaValue}>{project.ndviValue.toFixed(2)}</div>
                  <div style={styles.metaLabel}>NDVI</div>
                </div>
                <div style={styles.metaItem}>
                  <div style={styles.metaValue}>{project.carbonCredits}</div>
                  <div style={styles.metaLabel}>Credits</div>
                </div>
                <div style={styles.metaItem}>
                  <div style={styles.metaValue}>{project.ngoName}</div>
                  <div style={styles.metaLabel}>NGO</div>
                </div>
              </div>

              {project.status === 'panchayat-reviewed' && (
                <div style={styles.actionButtons}>
                  <button
                    style={{...styles.button, ...styles.approveButton}}
                    onClick={() => handleProjectApproval(project.id, 'approve')}
                  >
                    ✅ Approve
                  </button>
                  <button
                    style={{...styles.button, ...styles.rejectButton}}
                    onClick={() => handleProjectApproval(project.id, 'reject')}
                  >
                    ❌ Reject
                  </button>
                  <button
                    style={{...styles.button, ...styles.viewButton}}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    👁️ View Details
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAnalyticsTab = () => (
    <div style={{...styles.card, ...styles.fullWidthCard}}>
      <h3 style={styles.cardTitle}>📈 National Analytics</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* NDVI Distribution */}
        <div style={{ padding: '1rem', background: 'rgba(76, 175, 80, 0.05)', borderRadius: '8px' }}>
          <h4 style={{ color: '#4CAF50', marginBottom: '1rem' }}>NDVI Health Distribution</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Healthy (0.6+)</span>
              <div style={{ width: '100px', height: '8px', background: '#E0E7E9', borderRadius: '4px' }}>
                <div style={{ width: '60%', height: '100%', background: '#4CAF50', borderRadius: '4px' }}></div>
              </div>
              <span style={{ fontWeight: 600, color: '#4CAF50' }}>60%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Moderate (0.4-0.6)</span>
              <div style={{ width: '100px', height: '8px', background: '#E0E7E9', borderRadius: '4px' }}>
                <div style={{ width: '30%', height: '100%', background: '#FFEB3B', borderRadius: '4px' }}></div>
              </div>
              <span style={{ fontWeight: 600, color: '#FFEB3B' }}>30%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Poor (&lt;0.4)</span>
              <div style={{ width: '100px', height: '8px', background: '#E0E7E9', borderRadius: '4px' }}>
                <div style={{ width: '10%', height: '100%', background: '#F44336', borderRadius: '4px' }}></div>
              </div>
              <span style={{ fontWeight: 600, color: '#F44336' }}>10%</span>
            </div>
          </div>
        </div>

        {/* Project Status Breakdown */}
        <div style={{ padding: '1rem', background: 'rgba(0, 119, 182, 0.05)', borderRadius: '8px' }}>
          <h4 style={{ color: '#0077B6', marginBottom: '1rem' }}>Project Status</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Approved</span>
              <span style={{ fontWeight: 600, color: '#4CAF50' }}>18</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Under Review</span>
              <span style={{ fontWeight: 600, color: '#FF9800' }}>5</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Submitted</span>
              <span style={{ fontWeight: 600, color: '#64748b' }}>2</span>
            </div>
          </div>
        </div>

        {/* Regional Distribution */}
        <div style={{ padding: '1rem', background: 'rgba(21, 101, 192, 0.05)', borderRadius: '8px' }}>
          <h4 style={{ color: '#1565C0', marginBottom: '1rem' }}>Regional Coverage</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>West Bengal</span>
              <span style={{ fontWeight: 600 }}>8 projects</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Tamil Nadu</span>
              <span style={{ fontWeight: 600 }}>6 projects</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Kerala</span>
              <span style={{ fontWeight: 600 }}>5 projects</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Odisha</span>
              <span style={{ fontWeight: 600 }}>4 projects</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Gujarat</span>
              <span style={{ fontWeight: 600 }}>2 projects</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDownloadsTab = () => (
    <div style={{...styles.card, ...styles.fullWidthCard}}>
      <h3 style={styles.cardTitle}>💾 Data Downloads</h3>
      <div style={styles.downloadSection}>
        
        <div style={styles.downloadCard}>
          <div style={styles.downloadIcon}>📊</div>
          <div style={styles.downloadTitle}>Excel Report</div>
          <div style={styles.downloadDesc}>Complete project data with NDVI metrics and verification status</div>
          <button 
            style={styles.downloadButton}
            onClick={() => downloadDataset('excel')}
          >
            Download Excel
          </button>
        </div>

        <div style={styles.downloadCard}>
          <div style={styles.downloadIcon}>📋</div>
          <div style={styles.downloadTitle}>CSV Dataset</div>
          <div style={styles.downloadDesc}>Raw data in CSV format for analysis and integration</div>
          <button 
            style={styles.downloadButton}
            onClick={() => downloadDataset('csv')}
          >
            Download CSV
          </button>
        </div>

        <div style={styles.downloadCard}>
          <div style={styles.downloadIcon}>🔧</div>
          <div style={styles.downloadTitle}>JSON API Data</div>
          <div style={styles.downloadDesc}>Structured data in JSON format for developers</div>
          <button 
            style={styles.downloadButton}
            onClick={() => downloadDataset('json')}
          >
            Download JSON
          </button>
        </div>

        <div style={styles.downloadCard}>
          <div style={styles.downloadIcon}>🗺️</div>
          <div style={styles.downloadTitle}>GIS Shapefiles</div>
          <div style={styles.downloadDesc}>Geographic boundaries and polygon data for mapping</div>
          <button 
            style={styles.downloadButton}
            onClick={() => console.log('Download GIS data')}
          >
            Download GIS
          </button>
        </div>

        <div style={styles.downloadCard}>
          <div style={styles.downloadIcon}>📸</div>
          <div style={styles.downloadTitle}>Satellite Imagery</div>
          <div style={styles.downloadDesc}>High-resolution satellite images and NDVI layers</div>
          <button 
            style={styles.downloadButton}
            onClick={() => console.log('Download imagery')}
          >
            Download Images
          </button>
        </div>

        <div style={styles.downloadCard}>
          <div style={styles.downloadIcon}>📄</div>
          <div style={styles.downloadTitle}>Compliance Reports</div>
          <div style={styles.downloadDesc}>Official verification and compliance documentation</div>
          <button 
            style={styles.downloadButton}
            onClick={() => console.log('Download reports')}
          >
            Download Reports
          </button>
        </div>

      </div>
    </div>
  );

  const renderNDVITab = () => (
    <div style={{...styles.card, ...styles.fullWidthCard}}>
      <h3 style={styles.cardTitle}>🛰️ National NDVI Satellite Monitoring</h3>
      
      {/* Full-width satellite globe */}
      <div style={{ height: '600px', marginBottom: '2rem' }}>
        <SatelliteGlobe
          userRole="nccr"
          onRegionClick={handleRegionClick}
          selectedProjectId={selectedProject}
          showNDVILayer={true}
        />
      </div>

      {/* National NDVI Analytics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        
        {/* National NDVI Overview */}
        <div style={{ padding: '1.5rem', background: 'rgba(76, 175, 80, 0.05)', borderRadius: '12px' }}>
          <h4 style={{ color: '#4CAF50', marginBottom: '1rem' }}>🇮🇳 National NDVI Status</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Average NDVI</span>
              <span style={{ fontWeight: 700, color: '#4CAF50', fontSize: '1.5rem' }}>0.63</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Healthy Areas</span>
              <span style={{ fontWeight: 600, color: '#4CAF50' }}>60% (1,480 ha)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>At Risk Areas</span>
              <span style={{ fontWeight: 600, color: '#FFEB3B' }}>30% (740 ha)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Critical Areas</span>
              <span style={{ fontWeight: 600, color: '#F44336' }}>10% (247 ha)</span>
            </div>
          </div>
        </div>

        {/* Regional Performance */}
        <div style={{ padding: '1.5rem', background: 'rgba(0, 119, 182, 0.05)', borderRadius: '12px' }}>
          <h4 style={{ color: '#0077B6', marginBottom: '1rem' }}>📊 Regional Performance</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>West Bengal</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 600, color: '#4CAF50' }}>0.65</span>
                <span style={{ color: '#4CAF50' }}>↗️ +12%</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Kerala</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 600, color: '#4CAF50' }}>0.72</span>
                <span style={{ color: '#4CAF50' }}>↗️ +8%</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Tamil Nadu</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 600, color: '#4CAF50' }}>0.78</span>
                <span style={{ color: '#4CAF50' }}>↗️ +15%</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Odisha</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 600, color: '#FFEB3B' }}>0.45</span>
                <span style={{ color: '#FF9800' }}>→ 0%</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Gujarat</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 600, color: '#4CAF50' }}>0.58</span>
                <span style={{ color: '#4CAF50' }}>↗️ +6%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Alerts */}
        <div style={{ padding: '1.5rem', background: 'rgba(244, 67, 54, 0.05)', borderRadius: '12px' }}>
          <h4 style={{ color: '#F44336', marginBottom: '1rem' }}>🚨 Critical Alerts</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(255, 235, 59, 0.1)', borderRadius: '6px' }}>
              <div style={{ fontWeight: 600, color: '#FF9800' }}>Degradation Alert</div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Odisha Coast - NDVI below 0.5 threshold</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Requires immediate intervention</div>
            </div>
            <div style={{ padding: '0.75rem', background: 'rgba(76, 175, 80, 0.1)', borderRadius: '6px' }}>
              <div style={{ fontWeight: 600, color: '#4CAF50' }}>Recovery Success</div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Tamil Nadu - 15% improvement detected</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Project showing excellent progress</div>
            </div>
            <div style={{ padding: '0.75rem', background: 'rgba(0, 119, 182, 0.1)', borderRadius: '6px' }}>
              <div style={{ fontWeight: 600, color: '#0077B6' }}>Monitoring Update</div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>New satellite data available for 12 projects</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Review required within 48 hours</div>
            </div>
          </div>
        </div>

        {/* National Data Export */}
        <div style={{ padding: '1.5rem', background: 'rgba(224, 231, 233, 0.5)', borderRadius: '12px' }}>
          <h4 style={{ color: '#0077B6', marginBottom: '1rem' }}>💾 National NDVI Data</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button 
              style={{
                padding: '0.75rem',
                background: '#0077B6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              onClick={() => console.log('Export National NDVI Report')}
            >
              📊 National NDVI Report
            </button>
            <button 
              style={{
                padding: '0.75rem',
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              onClick={() => console.log('Export Time Series')}
            >
              📈 Time Series Analysis
            </button>
            <button 
              style={{
                padding: '0.75rem',
                background: '#FF9800',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              onClick={() => console.log('Export Alert Report')}
            >
              🚨 Critical Areas Report
            </button>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <div style={styles.dashboard}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.title}>🏛️ NCCR Admin Dashboard</h1>
            <p style={styles.subtitle}>National Coastal & Marine Ecosystem Regulation</p>
          </div>
          <div style={styles.adminInfo}>
            <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{adminInfo.name}</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>{adminInfo.region}</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
              {adminInfo.totalProjects} Projects Managed
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={styles.container}>
        <div style={styles.tabContainer}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'overview' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('overview')}
          >
            🏛️ National Overview
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'approvals' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('approvals')}
          >
            ✅ Project Approvals
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'analytics' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('analytics')}
          >
            📈 Analytics
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'downloads' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('downloads')}
          >
            💾 Data Downloads
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'ndvi' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('ndvi')}
          >
            🛰️ NDVI Monitoring
          </button>
        </div>

        {/* Main Content */}
        <div style={styles.mainGrid}>
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'approvals' && renderApprovalsTab()}
          {activeTab === 'analytics' && renderAnalyticsTab()}
          {activeTab === 'downloads' && renderDownloadsTab()}
          {activeTab === 'ndvi' && renderNDVITab()}
        </div>
      </div>
    </div>
  );
};

export default NCCRDashboard;
