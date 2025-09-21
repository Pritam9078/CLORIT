import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProjectSubmission {
  id: string;
  projectName: string;
  community: string;
  location: string;
  area: string;
  species: string;
  seedlings: number;
  submissionDate: string;
  photos: number;
  droneImages: number;
  voiceNotes: boolean;
  gpsCoordinates: string;
  status: 'Pending Review' | 'Verified' | 'Needs Correction' | 'Rejected';
  fieldNotes: string;
}

const NGOVerification = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [verificationComments, setVerificationComments] = useState<{[key: string]: string}>({});
  const [currentTab, setCurrentTab] = useState('pending');

  const styles = {
    dashboard: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      margin: 0,
      padding: 0
    },
    header: {
      background: 'white',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      position: 'sticky' as const,
      top: 0,
      zIndex: 100
    },
    navContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#1e40af'
    },
    navMenu: {
      display: 'flex',
      gap: '2rem'
    },
    navLink: {
      textDecoration: 'none',
      color: '#64748b',
      fontWeight: 500,
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      transition: 'all 0.2s'
    },
    navLinkActive: {
      color: '#1e40af',
      backgroundColor: '#eff6ff'
    },
    userSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      color: '#64748b',
      cursor: 'pointer'
    },
    userAvatar: {
      width: '32px',
      height: '32px',
      background: '#e2e8f0',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    mainContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    },
    pageHeader: {
      marginBottom: '3rem'
    },
    pageTitle: {
      fontSize: '2.5rem',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem'
    },
    pageSubtitle: {
      fontSize: '1.1rem',
      color: '#6b7280',
      lineHeight: 1.6
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    statCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      textAlign: 'center' as const,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: 700,
      marginBottom: '0.5rem'
    },
    statLabel: {
      fontSize: '0.8rem',
      color: '#6b7280',
      textTransform: 'uppercase' as const,
      fontWeight: 500
    },
    tabNavigation: {
      display: 'flex',
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '0.5rem',
      marginBottom: '2rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    },
    tab: {
      flex: 1,
      padding: '0.75rem 1rem',
      textAlign: 'center' as const,
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 500,
      color: '#6b7280',
      transition: 'all 0.2s'
    },
    tabActive: {
      backgroundColor: '#8b5cf6',
      color: 'white'
    },
    projectsGrid: {
      display: 'grid',
      gridTemplateColumns: selectedProject ? '1fr 400px' : '1fr',
      gap: '2rem'
    },
    projectsList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem'
    },
    projectCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    projectHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem'
    },
    projectTitle: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '0.25rem'
    },
    projectCommunity: {
      color: '#6b7280',
      fontSize: '0.9rem'
    },
    statusBadge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.7rem',
      fontWeight: 500
    },
    statusPending: {
      backgroundColor: '#fef3c7',
      color: '#92400e'
    },
    statusVerified: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    },
    statusRejected: {
      backgroundColor: '#fee2e2',
      color: '#dc2626'
    },
    projectDetails: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1rem',
      marginBottom: '1rem',
      fontSize: '0.8rem'
    },
    detailItem: {
      display: 'flex',
      flexDirection: 'column' as const
    },
    detailLabel: {
      color: '#6b7280',
      fontWeight: 500
    },
    detailValue: {
      color: '#1f2937',
      fontWeight: 600
    },
    projectActions: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap' as const
    },
    actionButton: {
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      border: 'none',
      fontSize: '0.8rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    viewButton: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    verifyButton: {
      backgroundColor: '#10b981',
      color: 'white'
    },
    rejectButton: {
      backgroundColor: '#ef4444',
      color: 'white'
    },
    correctionsButton: {
      backgroundColor: '#f59e0b',
      color: 'white'
    },
    verificationPanel: {
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      height: 'fit-content',
      position: 'sticky' as const,
      top: '2rem'
    },
    panelTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '1rem'
    },
    closeButton: {
      background: 'transparent',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      float: 'right' as const,
      color: '#6b7280'
    },
    evidenceSection: {
      marginBottom: '1.5rem'
    },
    evidenceTitle: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    evidenceGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '0.5rem',
      marginBottom: '1rem'
    },
    evidenceItem: {
      background: '#f8f9fa',
      padding: '0.75rem',
      borderRadius: '6px',
      textAlign: 'center' as const,
      fontSize: '0.8rem'
    },
    commentsSection: {
      marginBottom: '1.5rem'
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '0.9rem',
      minHeight: '100px',
      resize: 'vertical' as const,
      outline: 'none'
    },
    actionButtonsPanel: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem'
    }
  };

  const projectSubmissions: ProjectSubmission[] = [
    {
      id: 'PLT-001',
      projectName: 'Mangrove Restoration Phase 1',
      community: 'Sundarbans Fishing Community',
      location: 'West Bengal, India',
      area: '2.5 Ha',
      species: 'Rhizophora mucronata',
      seedlings: 1500,
      submissionDate: '2024-03-15',
      photos: 12,
      droneImages: 3,
      voiceNotes: true,
      gpsCoordinates: '22.5°N, 89.0°E',
      status: 'Pending Review',
      fieldNotes: 'Plantation carried out during low tide. Soil conditions were excellent with good water access.'
    },
    {
      id: 'PLT-002',
      projectName: 'Coastal Restoration Project',
      community: 'Coastal Farmers Collective',
      location: 'Odisha, India',
      area: '1.8 Ha',
      species: 'Avicennia marina',
      seedlings: 900,
      submissionDate: '2024-03-20',
      photos: 8,
      droneImages: 2,
      voiceNotes: false,
      gpsCoordinates: '19.8°N, 85.8°E',
      status: 'Pending Review',
      fieldNotes: 'Challenging terrain but seedlings planted successfully. Community participation was excellent.'
    },
    {
      id: 'PLT-003',
      projectName: 'Backwater Mangrove Enhancement',
      community: 'Mangrove Restoration Group',
      location: 'Kerala, India',
      area: '3.2 Ha',
      species: 'Bruguiera gymnorrhiza',
      seedlings: 2000,
      submissionDate: '2024-02-28',
      photos: 15,
      droneImages: 5,
      voiceNotes: true,
      gpsCoordinates: '9.9°N, 76.3°E',
      status: 'Verified',
      fieldNotes: 'High survival rate expected. Area has optimal conditions for mangrove growth.'
    }
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Verified': return styles.statusVerified;
      case 'Rejected': return styles.statusRejected;
      default: return styles.statusPending;
    }
  };

  const handleVerification = (projectId: string, action: string) => {
    const comments = verificationComments[projectId] || '';
    console.log(`${action} project ${projectId} with comments: ${comments}`);
    
    switch (action) {
      case 'verify':
        alert(`Project ${projectId} verified and forwarded to Panchayat review!`);
        break;
      case 'reject':
        alert(`Project ${projectId} rejected. Comments sent to community.`);
        break;
      case 'corrections':
        alert(`Correction request sent for project ${projectId}.`);
        break;
    }
    
    setSelectedProject(null);
    setVerificationComments(prev => ({
      ...prev,
      [projectId]: ''
    }));
  };

  const filteredProjects = projectSubmissions.filter(project => {
    if (currentTab === 'pending') return project.status === 'Pending Review';
    if (currentTab === 'verified') return project.status === 'Verified';
    if (currentTab === 'rejected') return project.status === 'Rejected';
    return true;
  });

  const selectedProjectData = projectSubmissions.find(p => p.id === selectedProject);

  const stats = {
    pending: projectSubmissions.filter(p => p.status === 'Pending Review').length,
    verified: projectSubmissions.filter(p => p.status === 'Verified').length,
    rejected: projectSubmissions.filter(p => p.status === 'Rejected').length,
    total: projectSubmissions.length
  };

  return (
    <div style={styles.dashboard}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.navContainer}>
          <div style={styles.logo}>
            <span style={{fontSize: '1.5rem'}}>🔍</span>
            <span>NGO Verification Portal</span>
          </div>
          <nav style={styles.navMenu}>
            <span style={{...styles.navLink, ...styles.navLinkActive}}>Verification</span>
            <button onClick={() => alert('My Projects functionality coming soon')} style={{...styles.navLink, background: 'none', border: 'none', cursor: 'pointer'}}>My Projects</button>
            <button onClick={() => navigate('/community-dashboard')} style={{...styles.navLink, background: 'none', border: 'none', cursor: 'pointer'}}>Communities</button>
            <button onClick={() => navigate('/impact-reporting')} style={{...styles.navLink, background: 'none', border: 'none', cursor: 'pointer'}}>Reports</button>
          </nav>
          <div style={styles.userSection}>
            <span>Marine Conservation Society</span>
            <div style={styles.userAvatar}>🏢</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Page Header */}
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>Community-Level Verification</h1>
          <p style={styles.pageSubtitle}>
            Review plantation data submitted by communities, cross-check evidence, and verify credible projects 
            before forwarding to Panchayat approval.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{...styles.statValue, color: '#f59e0b'}}>{stats.pending}</div>
            <div style={styles.statLabel}>Pending Review</div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statValue, color: '#10b981'}}>{stats.verified}</div>
            <div style={styles.statLabel}>Verified</div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statValue, color: '#ef4444'}}>{stats.rejected}</div>
            <div style={styles.statLabel}>Rejected</div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statValue, color: '#6366f1'}}>{stats.total}</div>
            <div style={styles.statLabel}>Total Projects</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={styles.tabNavigation}>
          <button
            style={{
              ...styles.tab,
              ...(currentTab === 'pending' ? styles.tabActive : {})
            }}
            onClick={() => setCurrentTab('pending')}
          >
            ⏳ Pending Review ({stats.pending})
          </button>
          <button
            style={{
              ...styles.tab,
              ...(currentTab === 'verified' ? styles.tabActive : {})
            }}
            onClick={() => setCurrentTab('verified')}
          >
            ✅ Verified ({stats.verified})
          </button>
          <button
            style={{
              ...styles.tab,
              ...(currentTab === 'rejected' ? styles.tabActive : {})
            }}
            onClick={() => setCurrentTab('rejected')}
          >
            ❌ Rejected ({stats.rejected})
          </button>
          <button
            style={{
              ...styles.tab,
              ...(currentTab === 'all' ? styles.tabActive : {})
            }}
            onClick={() => setCurrentTab('all')}
          >
            📋 All Projects ({stats.total})
          </button>
        </div>

        {/* Projects Grid */}
        <div style={styles.projectsGrid}>
          {/* Projects List */}
          <div style={styles.projectsList}>
            {filteredProjects.map(project => (
              <div
                key={project.id}
                style={styles.projectCard}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)')}
              >
                <div style={styles.projectHeader}>
                  <div>
                    <div style={styles.projectTitle}>{project.projectName}</div>
                    <div style={styles.projectCommunity}>📍 {project.community}</div>
                  </div>
                  <span style={{...styles.statusBadge, ...getStatusStyle(project.status)}}>
                    {project.status}
                  </span>
                </div>

                <div style={styles.projectDetails}>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Species</span>
                    <span style={styles.detailValue}>{project.species}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Seedlings</span>
                    <span style={styles.detailValue}>{project.seedlings}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Area</span>
                    <span style={styles.detailValue}>{project.area}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Photos</span>
                    <span style={styles.detailValue}>{project.photos}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Drone Images</span>
                    <span style={styles.detailValue}>{project.droneImages}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Voice Notes</span>
                    <span style={styles.detailValue}>{project.voiceNotes ? 'Yes' : 'No'}</span>
                  </div>
                </div>

                <div style={styles.projectActions}>
                  <button
                    style={{...styles.actionButton, ...styles.viewButton}}
                    onClick={() => setSelectedProject(project.id)}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
                  >
                    🔍 Review Evidence
                  </button>
                  
                  {project.status === 'Pending Review' && (
                    <>
                      <button
                        style={{...styles.actionButton, ...styles.verifyButton}}
                        onClick={() => handleVerification(project.id, 'verify')}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#059669')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#10b981')}
                      >
                        ✅ Verify
                      </button>
                      <button
                        style={{...styles.actionButton, ...styles.correctionsButton}}
                        onClick={() => handleVerification(project.id, 'corrections')}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d97706')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f59e0b')}
                      >
                        📝 Request Corrections
                      </button>
                      <button
                        style={{...styles.actionButton, ...styles.rejectButton}}
                        onClick={() => handleVerification(project.id, 'reject')}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#dc2626')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ef4444')}
                      >
                        ❌ Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Verification Panel */}
          {selectedProject && selectedProjectData && (
            <div style={styles.verificationPanel}>
              <button
                style={styles.closeButton}
                onClick={() => setSelectedProject(null)}
              >
                ×
              </button>
              
              <h3 style={styles.panelTitle}>📋 Project Review</h3>
              
              <div style={styles.evidenceSection}>
                <div style={styles.evidenceTitle}>📸 Evidence Summary</div>
                <div style={styles.evidenceGrid}>
                  <div style={styles.evidenceItem}>
                    <div>📷 Photos</div>
                    <div><strong>{selectedProjectData.photos}</strong></div>
                  </div>
                  <div style={styles.evidenceItem}>
                    <div>🚁 Drone Images</div>
                    <div><strong>{selectedProjectData.droneImages}</strong></div>
                  </div>
                  <div style={styles.evidenceItem}>
                    <div>🎤 Voice Notes</div>
                    <div><strong>{selectedProjectData.voiceNotes ? 'Available' : 'None'}</strong></div>
                  </div>
                  <div style={styles.evidenceItem}>
                    <div>📍 GPS Data</div>
                    <div><strong>Verified</strong></div>
                  </div>
                </div>
              </div>

              <div style={styles.evidenceSection}>
                <div style={styles.evidenceTitle}>📝 Field Notes</div>
                <div style={{fontSize: '0.9rem', color: '#374151', lineHeight: 1.5}}>
                  "{selectedProjectData.fieldNotes}"
                </div>
              </div>

              <div style={styles.commentsSection}>
                <div style={styles.evidenceTitle}>💬 Verification Comments</div>
                <textarea
                  placeholder="Add your verification comments, observations, or correction requests..."
                  value={verificationComments[selectedProject] || ''}
                  onChange={(e) => setVerificationComments(prev => ({
                    ...prev,
                    [selectedProject]: e.target.value
                  }))}
                  style={styles.textarea}
                />
              </div>

              <div style={styles.actionButtonsPanel}>
                <button
                  style={{...styles.actionButton, ...styles.verifyButton, width: '100%'}}
                  onClick={() => handleVerification(selectedProject, 'verify')}
                >
                  ✅ Verify & Forward to Panchayat
                </button>
                <button
                  style={{...styles.actionButton, ...styles.correctionsButton, width: '100%'}}
                  onClick={() => handleVerification(selectedProject, 'corrections')}
                >
                  📝 Request Corrections
                </button>
                <button
                  style={{...styles.actionButton, ...styles.rejectButton, width: '100%'}}
                  onClick={() => handleVerification(selectedProject, 'reject')}
                >
                  ❌ Reject Project
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NGOVerification;
