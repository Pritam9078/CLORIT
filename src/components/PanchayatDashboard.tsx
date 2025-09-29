import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGO_CONFIG } from '../constants/branding';
import WelcomeOnboarding from './WelcomeOnboarding';
import JurisdictionMapping from './JurisdictionMapping';
import GovernmentAnalytics from './GovernmentAnalytics';
import More from './More';

interface ProjectData {
  id: string;
  name: string;
  ngoVerified: string;
  area: string;
  status: string;
}

interface MetricData {
  icon: string;
  value: string;
  label: string;
  color: string;
}

const PanchayatDashboard = () => {
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('welcome');
  const [showProfileDropdown, setShowProfileDropdown] = useState<boolean>(false);

  // Styles object
  const styles = {
    panchayatDashboard: {
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
      transition: 'all 0.2s',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem'
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
      position: 'relative' as const
    },
    userAvatar: {
      width: '32px',
      height: '32px',
      background: '#e2e8f0',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
      ':hover': {
        background: '#cbd5e1'
      }
    },
    profileDropdown: {
      position: 'absolute' as const,
      top: '100%',
      right: '0',
      marginTop: '0.5rem',
      background: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      minWidth: '280px',
      zIndex: 1000,
      overflow: 'hidden'
    },
    profileHeader: {
      padding: '1rem',
      borderBottom: '1px solid #f1f5f9',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    },
    profileInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    profileAvatar: {
      width: '48px',
      height: '48px',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem'
    },
    profileDetails: {
      flex: 1
    },
    profileName: {
      fontSize: '1.1rem',
      fontWeight: '600',
      marginBottom: '0.25rem'
    },
    profileRole: {
      fontSize: '0.875rem',
      opacity: 0.9
    },
    profileMenuItems: {
      padding: '0.5rem 0'
    },
    profileMenuItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      border: 'none',
      background: 'none',
      width: '100%',
      textAlign: 'left' as const,
      color: '#374151',
      fontSize: '0.9rem'
    },
    profileMenuDivider: {
      height: '1px',
      background: '#f1f5f9',
      margin: '0.5rem 0'
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
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    pageSubtitle: {
      fontSize: '1.1rem',
      color: '#6b7280',
      lineHeight: 1.6
    },
    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '2rem',
      marginBottom: '3rem'
    },
    metricCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      textAlign: 'center' as const
    },
    metricIcon: {
      fontSize: '2rem',
      marginBottom: '1rem'
    },
    metricValue: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    metricLabel: {
      fontSize: '1rem',
      color: '#6b7280',
      fontWeight: 500
    },
    projectsSection: {
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    sectionSubtitle: {
      fontSize: '1rem',
      color: '#6b7280',
      marginBottom: '2rem'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const
    },
    tableHeader: {
      background: '#f8f9fa'
    },
    tableHeaderCell: {
      padding: '1rem',
      textAlign: 'left' as const,
      fontSize: '0.9rem',
      fontWeight: 600,
      color: '#374151',
      borderBottom: '2px solid #e5e7eb'
    },
    tableRow: {
      borderBottom: '1px solid #f3f4f6',
      transition: 'background-color 0.2s'
    },
    tableCell: {
      padding: '1rem',
      fontSize: '0.9rem',
      color: '#1f2937'
    },
    statusBadge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: 500
    },
    statusVerified: {
      background: '#d1fae5',
      color: '#065f46'
    },
    ngoYes: {
      background: '#d1fae5',
      color: '#065f46'
    },
    actionButton: {
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '6px',
      fontSize: '0.8rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s',
      marginRight: '0.5rem'
    },
    viewButton: {
      background: '#3b82f6',
      color: 'white'
    },
    approveButton: {
      background: '#10b981',
      color: 'white'
    },
    rejectButton: {
      background: '#ef4444',
      color: 'white'
    },
    footer: {
      background: '#1f2937',
      color: 'white',
      padding: '2rem',
      textAlign: 'center' as const,
      marginTop: '4rem'
    },
    footerLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      marginBottom: '1rem'
    },
    footerLink: {
      color: '#9ca3af',
      textDecoration: 'none',
      transition: 'color 0.2s'
    },
    socialLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem'
    },
    socialLink: {
      display: 'inline-block',
      width: '40px',
      height: '40px',
      background: '#374151',
      borderRadius: '50%',
      textAlign: 'center' as const,
      lineHeight: '40px',
      textDecoration: 'none',
      transition: 'background-color 0.2s'
    }
  };

  const metricsData: MetricData[] = [
    {
      icon: '⏳',
      value: '7',
      label: 'Projects Awaiting Review',
      color: '#f59e0b'
    },
    {
      icon: '✅',
      value: '32',
      label: 'Approved Projects',
      color: '#10b981'
    },
    {
      icon: '❌',
      value: '3',
      label: 'Rejected Projects',
      color: '#ef4444'
    },
    {
      icon: '📊',
      value: '42',
      label: 'Total Projects',
      color: '#3b82f6'
    }
  ];

  const projectsData: ProjectData[] = [
    {
      id: 'PRJ-MANG-001',
      name: 'Project Alpha - Mangrove Restoration',
      ngoVerified: 'Yes',
      area: '5',
      status: 'Verified by NGO'
    },
    {
      id: 'PRJ-MANG-002',
      name: 'Project Beta - Coastal Mangrove Growth',
      ngoVerified: 'Yes',
      area: '8',
      status: 'Verified by NGO'
    },
    {
      id: 'PRJ-MANG-003',
      name: 'Project Gamma - Estuary Protection',
      ngoVerified: 'Yes',
      area: '12',
      status: 'Verified by NGO'
    },
    {
      id: 'PRJ-MANG-004',
      name: 'Project Delta - Ecosystem Restoration',
      ngoVerified: 'Yes',
      area: '3',
      status: 'Verified by NGO'
    },
    {
      id: 'PRJ-MANG-005',
      name: 'Project Epsilon - Biodiversity Boost',
      ngoVerified: 'Yes',
      area: '6',
      status: 'Verified by NGO'
    }
  ];

  const handleViewDetails = (projectId: string) => {
    alert(`Viewing detailed information for ${projectId}`);
  };

  const handleApprove = (projectId: string) => {
    alert(`Project ${projectId} approved by Panchayat!`);
    // Update project status logic here
  };

  const handleReject = (projectId: string) => {
    const reason = prompt(`Please provide reason for rejecting ${projectId}:`);
    if (reason) {
      alert(`Project ${projectId} rejected. Reason: ${reason}`);
      // Update project status logic here
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      navigate('/');
    }
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  // Click outside to close profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={styles.panchayatDashboard}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.navContainer}>
          <div style={styles.logo}>
            <img 
              src={LOGO_CONFIG.MAIN_LOGO} 
              alt={LOGO_CONFIG.LOGO_ALT} 
              style={{
                width: '32px',
                height: '32px',
                marginRight: '0.75rem'
              }}
            />
            <span>CLORIT</span>
          </div>
          <nav style={styles.navMenu}>
            <button 
              onClick={() => setActiveTab('welcome')} 
              style={{...styles.navLink, ...(activeTab === 'welcome' ? styles.navLinkActive : {})}}
            >
              Welcome
            </button>
            <button 
              onClick={() => setActiveTab('dashboard')} 
              style={{...styles.navLink, ...(activeTab === 'dashboard' ? styles.navLinkActive : {})}}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('analytics')} 
              style={{...styles.navLink, ...(activeTab === 'analytics' ? styles.navLinkActive : {})}}
            >
              Analytics
            </button>
            <button 
              onClick={() => setActiveTab('mapping')} 
              style={{...styles.navLink, ...(activeTab === 'mapping' ? styles.navLinkActive : {})}}
            >
              Jurisdiction Map
            </button>
            <button 
              onClick={() => setActiveTab('projects')} 
              style={{...styles.navLink, ...(activeTab === 'projects' ? styles.navLinkActive : {})}}
            >
              Projects
            </button>
            <button 
              onClick={() => setActiveTab('more')} 
              style={{...styles.navLink, ...(activeTab === 'more' ? styles.navLinkActive : {})}}
            >
              More
            </button>
          </nav>
          <div style={styles.userSection} ref={profileRef}>
            <div 
              style={styles.userAvatar}
              onClick={handleProfileClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#cbd5e1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#e2e8f0';
              }}
            >
              👤
            </div>
            
            {showProfileDropdown && (
              <div style={styles.profileDropdown}>
                <div style={styles.profileHeader}>
                  <div style={styles.profileInfo}>
                    <div style={styles.profileAvatar}>👤</div>
                    <div style={styles.profileDetails}>
                      <div style={styles.profileName}>Rahul Sharma</div>
                      <div style={styles.profileRole}>Panchayat Officer</div>
                    </div>
                  </div>
                </div>
                
                <div style={styles.profileMenuItems}>
                  <button
                    style={styles.profileMenuItem}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'none';
                    }}
                    onClick={() => {
                      setShowProfileDropdown(false);
                      alert('Profile settings coming soon!');
                    }}
                  >
                    ⚙️ Settings
                  </button>
                  
                  <button
                    style={styles.profileMenuItem}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'none';
                    }}
                    onClick={() => {
                      setShowProfileDropdown(false);
                      alert('Help & Support coming soon!');
                    }}
                  >
                    ❓ Help & Support
                  </button>
                  
                  <button
                    style={styles.profileMenuItem}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'none';
                    }}
                    onClick={() => {
                      setShowProfileDropdown(false);
                      alert('Notification preferences coming soon!');
                    }}
                  >
                    � Notifications
                  </button>
                  
                  <div style={styles.profileMenuDivider}></div>
                  
                  <button
                    style={{
                      ...styles.profileMenuItem,
                      color: '#ef4444'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#fef2f2';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'none';
                    }}
                    onClick={() => {
                      setShowProfileDropdown(false);
                      handleLogout();
                    }}
                  >
                    � Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      {activeTab === 'more' ? (
        <More />
      ) : (
        <div style={styles.mainContent}>
          {activeTab === 'welcome' && <WelcomeOnboarding />}
          
          {activeTab === 'dashboard' && (
            <>
              {/* Page Header */}
              <div style={styles.pageHeader}>
                <h1 style={styles.pageTitle}>Panchayat Dashboard</h1>
                <p style={styles.pageSubtitle}>
                  Review NGO-verified projects within your jurisdiction, approve or reject them, and monitor progress.
                </p>
              </div>

              {/* Metrics Grid */}
              <div style={styles.metricsGrid}>
                {metricsData.map((metric, index) => (
                  <div key={index} style={styles.metricCard}>
                    <div style={{...styles.metricIcon, color: metric.color}}>{metric.icon}</div>
                    <div style={{...styles.metricValue, color: metric.color}}>{metric.value}</div>
                    <div style={styles.metricLabel}>{metric.label}</div>
                  </div>
                ))}
              </div>

              {/* NGO-Verified Projects Section */}
              <div style={styles.projectsSection}>
                <h2 style={styles.sectionTitle}>NGO-Verified Projects for Review</h2>
                <p style={styles.sectionSubtitle}>
                  Review and take action on projects within your jurisdiction.
                </p>

                <table style={styles.table}>
                  <thead style={styles.tableHeader}>
                    <tr>
                      <th style={styles.tableHeaderCell}>Project ID</th>
                      <th style={styles.tableHeaderCell}>Project Name</th>
                      <th style={styles.tableHeaderCell}>NGO Verified</th>
                      <th style={styles.tableHeaderCell}>Area (Ha)</th>
                      <th style={styles.tableHeaderCell}>Status</th>
                      <th style={styles.tableHeaderCell}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectsData.map((project, index) => (
                      <tr 
                        key={index} 
                        style={styles.tableRow}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <td style={styles.tableCell}>{project.id}</td>
                        <td style={styles.tableCell}>{project.name}</td>
                        <td style={styles.tableCell}>
                          <span style={{...styles.statusBadge, ...styles.ngoYes}}>
                            {project.ngoVerified}
                          </span>
                        </td>
                        <td style={styles.tableCell}>{project.area}</td>
                        <td style={styles.tableCell}>
                          <span style={{...styles.statusBadge, ...styles.statusVerified}}>
                            {project.status}
                          </span>
                        </td>
                        <td style={styles.tableCell}>
                          <button 
                            style={{...styles.actionButton, ...styles.viewButton}}
                            onClick={() => handleViewDetails(project.id)}
                            onMouseEnter={(e) => (e.currentTarget.style.background = '#2563eb')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = '#3b82f6')}
                          >
                            View Details
                          </button>
                          <button 
                            style={{...styles.actionButton, ...styles.approveButton}}
                            onClick={() => handleApprove(project.id)}
                            onMouseEnter={(e) => (e.currentTarget.style.background = '#059669')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = '#10b981')}
                          >
                            Approve
                          </button>
                          <button 
                            style={{...styles.actionButton, ...styles.rejectButton}}
                            onClick={() => handleReject(project.id)}
                            onMouseEnter={(e) => (e.currentTarget.style.background = '#dc2626')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = '#ef4444')}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          
          {activeTab === 'analytics' && <GovernmentAnalytics />}
          
          {activeTab === 'mapping' && <JurisdictionMapping />}
          
          {activeTab === 'projects' && (
            <div style={styles.pageHeader}>
              <h1 style={styles.pageTitle}>Projects Management</h1>
              <p style={styles.pageSubtitle}>Manage all projects in your jurisdiction</p>
            </div>
          )}
        </div>
      )}

      {/* Footer - Hidden when More section is active */}
      {activeTab !== 'more' && (
        <footer style={styles.footer}>
          <div style={styles.footerLinks}>
            <a href="#about" style={styles.footerLink}>About</a>
            <a href="#resources" style={styles.footerLink}>Resources</a>
            <a href="#legal" style={styles.footerLink}>Legal</a>
          </div>
          <div style={styles.socialLinks}>
            <a href="#facebook" style={styles.socialLink}>📘</a>
            <a href="#twitter" style={styles.socialLink}>🐦</a>
            <a href="#linkedin" style={styles.socialLink}>💼</a>
            <a href="#instagram" style={styles.socialLink}>📷</a>
          </div>
        </footer>
      )}
    </div>
  );
};

export default PanchayatDashboard;
