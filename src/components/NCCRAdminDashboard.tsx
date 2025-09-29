import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGO_CONFIG } from '../constants/branding';
import { 
  Home, 
  BarChart3, 
  Sprout, 
  Coins, 
  ShoppingCart, 
  FileText, 
  Satellite, 
  LogOut,
  Menu,
  X,
  User
} from 'lucide-react';
import NCCRCarbonCreditMinting from './NCCRCarbonCreditMinting';
import ImpactReporting from './ImpactReporting';
import EnhancedMarketplace from './Marketplace';
import SatelliteGlobe from './SatelliteGlobe2';
import NCCRWelcomePage from './NCCRWelcomePage';
import NCCRProjectsPage from './NCCRProjectsPage';

interface ProjectData {
  id: string;
  name: string;
  aiStatus: string;
  treeCount: string;
  survivalRate: string;
  panchayatStatus: string;
  overallStatus: string;
}

interface MetricData {
  label: string;
  value: string;
  icon: string;
}

const NCCRAdminDashboard = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('welcome');
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation configuration with logical grouping
  const navigationConfig = {
    main: [
      { id: 'welcome', label: 'Welcome', icon: <Home size={18} /> },
      { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={18} /> }
    ],
    operations: [
      { id: 'projects', label: 'Projects', icon: <Sprout size={18} /> },
      { id: 'minting', label: 'Carbon Minting', icon: <Coins size={18} /> },
      { id: 'marketplace', label: 'Marketplace', icon: <ShoppingCart size={18} /> }
    ],
    analytics: [
      { id: 'reporting', label: 'Reporting', icon: <FileText size={18} /> },
      { id: 'ndvi', label: 'NDVI', icon: <Satellite size={18} /> }
    ]
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    // Logout logic here
    navigate('/');
  };

  // Navigation rendering functions
  const renderNavItem = (item: any, isActive: boolean, isMobile = false) => {
    const baseStyle = isMobile ? styles.mobileNavItem : styles.navItem;
    const activeStyle = isMobile ? styles.mobileNavItemActive : styles.navItemActive;
    
    return (
      <button
        key={item.id}
        style={{
          ...baseStyle,
          ...(isActive ? activeStyle : {})
        }}
        onClick={() => handleTabClick(item.id)}
        onMouseEnter={(e) => {
          if (!isActive && !isMobile) {
            e.currentTarget.style.background = '#f1f5f9';
            e.currentTarget.style.color = '#1e40af';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive && !isMobile) {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#64748b';
          }
        }}
      >
        {item.icon}
        <span>{item.label}</span>
      </button>
    );
  };

  const renderDesktopNavigation = () => (
    <div style={styles.desktopNav}>
      {/* Main Group */}
      <div style={styles.navGroup}>
        {navigationConfig.main.map(item => 
          renderNavItem(item, activeTab === item.id)
        )}
      </div>

      {/* Operations Group */}
      <div style={styles.navGroup}>
        {navigationConfig.operations.map(item => 
          renderNavItem(item, activeTab === item.id)
        )}
      </div>

      {/* Analytics Group */}
      <div style={styles.navGroup}>
        {navigationConfig.analytics.map(item => 
          renderNavItem(item, activeTab === item.id)
        )}
      </div>
    </div>
  );

  const renderMobileNavigation = () => (
    <div style={styles.mobileNav}>
      {/* Main Group */}
      <div style={styles.mobileNavGroup}>
        <div style={styles.mobileNavGroupTitle}>Main</div>
        {navigationConfig.main.map(item => 
          renderNavItem(item, activeTab === item.id, true)
        )}
      </div>

      {/* Operations Group */}
      <div style={styles.mobileNavGroup}>
        <div style={styles.mobileNavGroupTitle}>Operations</div>
        {navigationConfig.operations.map(item => 
          renderNavItem(item, activeTab === item.id, true)
        )}
      </div>

      {/* Analytics Group */}
      <div style={styles.mobileNavGroup}>
        <div style={styles.mobileNavGroupTitle}>Analytics</div>
        {navigationConfig.analytics.map(item => 
          renderNavItem(item, activeTab === item.id, true)
        )}
      </div>

      {/* Account Section in Mobile */}
      <div style={styles.mobileNavGroup}>
        <div style={styles.mobileNavGroupTitle}>Account</div>
        <button
          style={styles.mobileNavItem}
          onClick={() => {
            setIsMobileMenuOpen(false);
            console.log('Profile clicked');
          }}
        >
          <User size={18} />
          <span>Profile</span>
        </button>
        <button
          style={{
            ...styles.mobileNavItem,
            background: '#fef2f2',
            color: '#dc2626',
            border: '1px solid #fecaca'
          }}
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  // Styles object
  const styles = {
    adminDashboard: {
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
      maxWidth: 'none', // Remove max width constraint
      margin: '0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem 1.5rem',
      gap: '1rem',
      minHeight: '70px',
      width: '100%',
      boxSizing: 'border-box' as const
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontSize: '1.25rem',
      fontWeight: 700,
      color: '#1e40af',
      minWidth: 'fit-content',
      flexShrink: 0
    },
    // Desktop Navigation - Center
    desktopNavContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      overflow: 'hidden',
      maxWidth: 'calc(100vw - 400px)' // Reserve space for logo and right section
    },
    desktopNav: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      flexWrap: 'nowrap' as const,
      overflow: 'hidden'
    },
    navGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 0.75rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      fontWeight: 500,
      fontSize: '0.875rem',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap' as const,
      background: 'transparent',
      color: '#64748b',
      border: 'none',
      textDecoration: 'none'
    },
    navItemActive: {
      background: '#dbeafe',
      color: '#1e40af',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    navItemHover: {
      background: '#f1f5f9',
      color: '#1e40af'
    },
    // Right Section - Always visible
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      flexShrink: 0,
      minWidth: 'fit-content'
    },
    // Mobile Navigation
    mobileMenuButton: {
      display: 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '0.5rem',
      transition: 'all 0.3s ease',
      color: '#1e40af',
      flexShrink: 0
    },
    mobileNav: {
      position: 'absolute' as const,
      top: '100%',
      left: '0',
      right: '0',
      background: 'white',
      borderTop: '1px solid #e5e7eb',
      padding: '1rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 99
    },
    mobileNavGroup: {
      marginBottom: '1rem'
    },
    mobileNavGroupTitle: {
      fontSize: '0.75rem',
      fontWeight: 600,
      color: '#6b7280',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
      marginBottom: '0.5rem',
      paddingLeft: '0.5rem'
    },
    mobileNavItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      fontWeight: 500,
      fontSize: '0.875rem',
      transition: 'all 0.3s ease',
      background: 'transparent',
      color: '#64748b',
      border: 'none',
      marginBottom: '0.25rem',
      width: '100%',
      textAlign: 'left' as const,
      textDecoration: 'none'
    },
    mobileNavItemActive: {
      background: '#dbeafe',
      color: '#1e40af'
    },
    // Logout Button
    logoutButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 0.75rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      fontWeight: 500,
      fontSize: '0.875rem',
      transition: 'all 0.3s ease',
      background: '#fef2f2',
      color: '#dc2626',
      border: '1px solid #fecaca',
      textDecoration: 'none',
      whiteSpace: 'nowrap' as const,
      flexShrink: 0
    },
    logoutButtonHover: {
      background: '#fee2e2',
      borderColor: '#fca5a5'
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#64748b',
      flexShrink: 0
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
      textAlign: 'center' as const,
      marginBottom: '2rem'
    },
    pageTitle: {
      fontSize: '2.5rem',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem'
    },
    pageSubtitle: {
      fontSize: '1rem',
      color: '#6b7280',
      lineHeight: 1.6
    },
    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '1.5rem',
      marginBottom: '3rem'
    },
    metricCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      textAlign: 'center' as const
    },
    metricIcon: {
      fontSize: '1.5rem',
      marginBottom: '0.5rem'
    },
    metricValue: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    metricLabel: {
      fontSize: '0.8rem',
      color: '#6b7280',
      fontWeight: 500,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px'
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: '400px 1fr',
      gap: '2rem',
      marginBottom: '2rem'
    },
    chartSection: {
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    },
    chartTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    chartSubtitle: {
      fontSize: '0.9rem',
      color: '#6b7280',
      marginBottom: '2rem'
    },
    pieChart: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '250px',
      position: 'relative' as const
    },
    pieContainer: {
      position: 'relative' as const,
      width: '200px',
      height: '200px'
    },
    pieLegend: {
      marginTop: '1.5rem'
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '0.5rem',
      fontSize: '0.9rem'
    },
    legendColor: {
      width: '12px',
      height: '12px',
      borderRadius: '2px',
      marginRight: '0.5rem'
    },
    legendLabel: {
      flex: 1,
      color: '#374151'
    },
    legendValue: {
      fontWeight: 600,
      color: '#1f2937'
    },
    tableSection: {
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    },
    tableTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    tableSubtitle: {
      fontSize: '0.9rem',
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
      padding: '0.75rem',
      textAlign: 'left' as const,
      fontSize: '0.8rem',
      fontWeight: 600,
      color: '#374151',
      borderBottom: '2px solid #e5e7eb'
    },
    tableRow: {
      borderBottom: '1px solid #f3f4f6',
      transition: 'background-color 0.2s'
    },
    tableCell: {
      padding: '0.75rem',
      fontSize: '0.8rem',
      color: '#1f2937'
    },
    statusBadge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.7rem',
      fontWeight: 500
    },
    statusPassed: {
      background: '#d1fae5',
      color: '#065f46'
    },
    statusFailed: {
      background: '#fee2e2',
      color: '#dc2626'
    },
    statusPending: {
      background: '#fef3c7',
      color: '#92400e'
    },
    panchayatBadge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.7rem',
      fontWeight: 500,
      background: '#dbeafe',
      color: '#1e40af'
    },
    overallStatus: {
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.7rem',
      fontWeight: 500
    },
    statusVerified: {
      background: '#d1fae5',
      color: '#065f46'
    },
    statusReview: {
      background: '#fef3c7',
      color: '#92400e'
    },
    statusRejected: {
      background: '#fee2e2',
      color: '#dc2626'
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
      background: '#f3f4f6',
      color: '#374151'
    },
    auditButton: {
      background: '#f3f4f6',
      color: '#374151'
    },
    approveButton: {
      background: '#3b82f6',
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
    { label: 'Total Blue Carbon Sites', value: '50', icon: '📋' },
    { label: 'Sites with High Survival Rate (>80%)', value: '31', icon: '🌱' },
    { label: 'Total Area Restored', value: '3,245 ha', icon: '🌍' },
    { label: 'Total Carbon Sequestered', value: '425,891 t CO2e', icon: '💰' },
    { label: 'Average Survival Rate', value: '73.2%', icon: '📊' }
  ];

  // Blue Carbon Dataset - First 10 sites from NCCR SIH Template
  // Data includes Mangrove, Seagrass, and Saltmarsh restoration sites across Indian coastal states
  const projectsData: ProjectData[] = [
    {
      id: 'NCCR-2000',
      name: 'Site_2000 - Saltmarsh Restoration',
      aiStatus: 'Passed',
      treeCount: '185,753', // 38.64 ha * 4805 density
      survivalRate: '67.6%',
      panchayatStatus: 'Approved',
      overallStatus: 'Verified'
    },
    {
      id: 'NCCR-2001',
      name: 'Site_2001 - Mangrove Restoration',
      aiStatus: 'Passed',
      treeCount: '121,650', // 97.95 ha * 1242 density
      survivalRate: '95.4%',
      panchayatStatus: 'Approved',
      overallStatus: 'Verified'
    },
    {
      id: 'NCCR-2002',
      name: 'Site_2002 - Mangrove Restoration',
      aiStatus: 'Passed',
      treeCount: '280,730', // 104.75 ha * 2680 density
      survivalRate: '77.9%',
      panchayatStatus: 'Approved',
      overallStatus: 'Verified'
    },
    {
      id: 'NCCR-2003',
      name: 'Site_2003 - Seagrass Restoration',
      aiStatus: 'Failed',
      treeCount: '282,193', // 106.94 ha * 2639 density
      survivalRate: '52.4%',
      panchayatStatus: 'Approved',
      overallStatus: 'Pending Review'
    },
    {
      id: 'NCCR-2004',
      name: 'Site_2004 - Mangrove Restoration',
      aiStatus: 'Failed',
      treeCount: '282,538', // 82.94 ha * 3407 density
      survivalRate: '47.4%',
      panchayatStatus: 'Approved',
      overallStatus: 'Pending Review'
    },
    {
      id: 'NCCR-2005',
      name: 'Site_2005 - Saltmarsh Restoration',
      aiStatus: 'Passed',
      treeCount: '258,509', // 109.96 ha * 2351 density
      survivalRate: '90.9%',
      panchayatStatus: 'Approved',
      overallStatus: 'Verified'
    },
    {
      id: 'NCCR-2006',
      name: 'Site_2006 - Seagrass Restoration',
      aiStatus: 'Failed',
      treeCount: '120,934', // 49.16 ha * 2460 density
      survivalRate: '56.1%',
      panchayatStatus: 'Approved',
      overallStatus: 'Pending Review'
    },
    {
      id: 'NCCR-2007',
      name: 'Site_2007 - Mangrove Restoration',
      aiStatus: 'Passed',
      treeCount: '41,773', // 19.93 ha * 2096 density
      survivalRate: '85.8%',
      panchayatStatus: 'Approved',
      overallStatus: 'Verified'
    },
    {
      id: 'NCCR-2008',
      name: 'Site_2008 - Mangrove Restoration',
      aiStatus: 'Passed',
      treeCount: '73,958', // 22.5 ha * 3287 density
      survivalRate: '73.1%',
      panchayatStatus: 'Approved',
      overallStatus: 'Verified'
    },
    {
      id: 'NCCR-2009',
      name: 'Site_2009 - Saltmarsh Restoration',
      aiStatus: 'Passed',
      treeCount: '42,930', // 27.24 ha * 1576 density
      survivalRate: '94.1%',
      panchayatStatus: 'Approved',
      overallStatus: 'Verified'
    }
  ];

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'passed': return styles.statusPassed;
      case 'failed': return styles.statusFailed;
      case 'pending review': return styles.statusPending;
      case 'verified': return styles.statusVerified;
      case 'pending': return styles.statusReview;
      case 'rejected': return styles.statusRejected;
      default: return styles.statusPending;
    }
  };

  const PieChart = () => (
    <div style={styles.pieChart}>
      <div style={styles.pieContainer}>
        <svg width="200" height="200" viewBox="0 0 200 200">
          {/* Passed - 85% - Black */}
          <circle 
            cx="100" cy="100" r="80" 
            fill="transparent" 
            stroke="#1f2937" 
            strokeWidth="40"
            strokeDasharray="425 500"
            strokeDashoffset="0"
            transform="rotate(-90 100 100)"
          />
          {/* Failed - 10% - Pink */}
          <circle 
            cx="100" cy="100" r="80" 
            fill="transparent" 
            stroke="#ec4899" 
            strokeWidth="40"
            strokeDasharray="50 500"
            strokeDashoffset="-425"
            transform="rotate(-90 100 100)"
          />
          {/* Pending - 5% - Light */}
          <circle 
            cx="100" cy="100" r="80" 
            fill="transparent" 
            stroke="#e5e7eb" 
            strokeWidth="40"
            strokeDasharray="25 500"
            strokeDashoffset="-475"
            transform="rotate(-90 100 100)"
          />
        </svg>
      </div>
    </div>
  );

  const handleApproveProject = (projectId: string) => {
    alert(`Project ${projectId} approved for verification!`);
  };

  const handleViewResults = (projectId: string) => {
    setSelectedProject(projectId);
    alert(`Viewing AI results for ${projectId}`);
  };

  const handleManualAudit = (projectId: string) => {
    alert(`Initiating manual audit for ${projectId}`);
  };

  return (
    <div style={styles.adminDashboard}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.navContainer}>
          {/* Logo - Far Left */}
          <div style={styles.logo}>
            <img 
              src={LOGO_CONFIG.MAIN_LOGO} 
              alt={LOGO_CONFIG.LOGO_ALT} 
              style={{
                width: "32px",
                height: "32px",
                objectFit: "contain"
              }}
            />
            <span>CLORIT</span>
          </div>

          {/* Desktop Navigation - Center */}
          {!isMobile && (
            <div style={styles.desktopNavContainer}>
              {renderDesktopNavigation()}
            </div>
          )}

          {/* Right Section - Always Visible */}
          <div style={styles.rightSection}>
            {/* Desktop Profile and Logout */}
            {!isMobile && (
              <>
                <button 
                  style={styles.logoutButton}
                  onClick={handleLogout}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#fee2e2';
                    e.currentTarget.style.borderColor = '#fca5a5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fef2f2';
                    e.currentTarget.style.borderColor = '#fecaca';
                  }}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
                <div style={styles.userProfile}>
                  <div style={styles.userAvatar}>
                    <User size={16} />
                  </div>
                </div>
              </>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <button 
                style={styles.mobileMenuButton}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && isMobile && (
          <div style={styles.mobileNav}>
            {renderMobileNavigation()}
          </div>
        )}
      </header>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {activeTab === 'welcome' ? (
          <NCCRWelcomePage />
        ) : activeTab === 'projects' ? (
          <NCCRProjectsPage />
        ) : activeTab === 'minting' ? (
          <NCCRCarbonCreditMinting />
        ) : activeTab === 'reporting' ? (
          <ImpactReporting />
        ) : activeTab === 'marketplace' ? (
          <EnhancedMarketplace />
        ) : activeTab === 'ndvi' ? (
          <div style={{ padding: '2rem' }}>
            <div style={{ 
              background: 'white', 
              borderRadius: '1rem', 
              padding: '2rem', 
              boxShadow: '0 10px 25px rgba(0, 119, 182, 0.1)',
              border: '1px solid rgba(0, 119, 182, 0.1)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: 700, 
                color: '#0077B6', 
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                🛰️ National NDVI Satellite Monitoring
              </h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                Real-time satellite monitoring and NDVI analysis for all mangrove restoration projects across India
              </p>
              
              <div style={{ height: '600px', marginBottom: '2rem' }}>
                <SatelliteGlobe
                  userRole="nccr"
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
                  </div>
                </div>

                {/* Data Export */}
                <div style={{ padding: '1.5rem', background: 'rgba(224, 231, 233, 0.5)', borderRadius: '12px' }}>
                  <h4 style={{ color: '#0077B6', marginBottom: '1rem' }}>💾 Export NDVI Data</h4>
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
                  </div>
                </div>

              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Page Header */}
            <div style={styles.pageHeader}>
              <h1 style={styles.pageTitle}>NCCR Super Admin Dashboard</h1>
              <p style={styles.pageSubtitle}>
                Oversee project verification, AI analysis, and manual audits across all blue carbon restoration initiatives.
              </p>
            </div>

            {/* Metrics Grid */}
            <div style={styles.metricsGrid}>
              {metricsData.map((metric, index) => (
                <div key={index} style={styles.metricCard}>
                  <div style={styles.metricIcon}>{metric.icon}</div>
                  <div style={styles.metricValue}>{metric.value}</div>
                  <div style={styles.metricLabel}>{metric.label}</div>
                </div>
              ))}
            </div>

        {/* Content Grid */}
        <div style={styles.contentGrid}>
          {/* AI Verification Chart */}
          <div style={styles.chartSection}>
            <h3 style={styles.chartTitle}>AI Verification Status Overview</h3>
            <p style={styles.chartSubtitle}>Distribution of projects by AI verification outcome</p>
            
            <PieChart />

            <div style={styles.pieLegend}>
              <div style={styles.legendItem}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <div style={{...styles.legendColor, background: '#1f2937'}}></div>
                  <span style={styles.legendLabel}>Passed</span>
                </div>
                <span style={styles.legendValue}>85%</span>
              </div>
              <div style={styles.legendItem}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <div style={{...styles.legendColor, background: '#ec4899'}}></div>
                  <span style={styles.legendLabel}>Failed</span>
                </div>
                <span style={styles.legendValue}>10%</span>
              </div>
              <div style={styles.legendItem}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <div style={{...styles.legendColor, background: '#e5e7eb'}}></div>
                  <span style={styles.legendLabel}>Pending AI Review</span>
                </div>
                <span style={styles.legendValue}>5%</span>
              </div>
              <div style={styles.legendItem}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <div style={{...styles.legendColor, background: '#f59e0b'}}></div>
                  <span style={styles.legendLabel}>Requires Manual Audit</span>
                </div>
                <span style={styles.legendValue}>-</span>
              </div>
            </div>
          </div>

          {/* Recent Activity Summary */}
          <div style={styles.tableSection}>
            <h3 style={styles.tableTitle}>Recent Activities & Alerts</h3>
            <p style={styles.tableSubtitle}>
              Latest updates and priority actions across all blue carbon restoration sites.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              {/* High Priority Sites */}
              <div style={{ padding: '1.5rem', background: '#fee2e2', borderRadius: '12px', border: '1px solid #fecaca' }}>
                <h4 style={{ color: '#dc2626', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🚨 Sites Requiring Immediate Attention
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ padding: '0.75rem', background: 'rgba(255, 255, 255, 0.7)', borderRadius: '8px' }}>
                    <div style={{ fontWeight: 600, color: '#dc2626' }}>NCCR-2003 (Puducherry)</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Seagrass site with 52.4% survival rate - needs intervention</div>
                  </div>
                  <div style={{ padding: '0.75rem', background: 'rgba(255, 255, 255, 0.7)', borderRadius: '8px' }}>
                    <div style={{ fontWeight: 600, color: '#dc2626' }}>NCCR-2004 (Lakshadweep)</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Mangrove site with 47.4% survival rate - urgent review needed</div>
                  </div>
                </div>
              </div>

              {/* Recent Successes */}
              <div style={{ padding: '1.5rem', background: '#dcfce7', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                <h4 style={{ color: '#166534', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  ✅ Recent Success Stories
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ padding: '0.75rem', background: 'rgba(255, 255, 255, 0.7)', borderRadius: '8px' }}>
                    <div style={{ fontWeight: 600, color: '#166534' }}>NCCR-2001 (West Bengal)</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Mangrove site achieved 95.4% survival rate - excellent performance</div>
                  </div>
                  <div style={{ padding: '0.75rem', background: 'rgba(255, 255, 255, 0.7)', borderRadius: '8px' }}>
                    <div style={{ fontWeight: 600, color: '#166534' }}>NCCR-2009 (Andhra Pradesh)</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Saltmarsh site with 94.1% survival rate - ready for certification</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ padding: '1.5rem', background: '#dbeafe', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
              <h4 style={{ color: '#1e40af', marginBottom: '1rem' }}>🎯 Quick Actions</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <button 
                  style={{
                    padding: '1rem',
                    background: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left' as const,
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setActiveTab('projects')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>Review All Sites</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Detailed site management and monitoring</div>
                </button>
                <button 
                  style={{
                    padding: '1rem',
                    background: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left' as const,
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setActiveTab('minting')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>Carbon Credit Minting</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Process and mint verified credits</div>
                </button>
                <button 
                  style={{
                    padding: '1rem',
                    background: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left' as const,
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setActiveTab('reporting')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>Generate Reports</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Impact and compliance reporting</div>
                </button>
                <button 
                  style={{
                    padding: '1rem',
                    background: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left' as const,
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setActiveTab('ndvi')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>NDVI Monitoring</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Satellite imagery and analysis</div>
                </button>
              </div>
            </div>
          </div>
        </div>
        </>
        )}
      </div>

      {/* Footer */}
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
    </div>
  );
};

export default NCCRAdminDashboard;
