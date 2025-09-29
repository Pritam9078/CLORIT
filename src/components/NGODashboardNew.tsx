import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Sprout, 
  Shield, 
  Users, 
  BarChart3, 
  Settings, 
  Menu,
  X,
  ChevronDown,
  FileText,
  Award,
  Globe
} from 'lucide-react';
import DashboardHeader from './shared/DashboardHeader';
import { AuthUtils } from '../utils/auth';
import { CurrencyUtils } from '../utils/currency';
import ProjectVerification from './ProjectVerification';
import ComplianceMonitoring from './ComplianceMonitoring';
import CommunitySupport from './CommunitySupport';
import ImpactReports from './ImpactReports';
import NGOWelcomePage from './NGOWelcomePage';
import NGOMore from './NGOMore';

const NGODashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('welcome');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  useEffect(() => {
    // Initialize mock user profile if not exists
    const currentUser = AuthUtils.getCurrentUser();
    if (!currentUser) {
      const mockUser = {
        id: 'ngo-001',
        name: 'Green Earth Foundation',
        email: 'ngo@example.com',
        role: 'ngo',
      };
      AuthUtils.saveUserProfile(mockUser);
    }
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-dropdown]')) {
        setIsMoreDropdownOpen(false);
      }
    };

    if (isMoreDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMoreDropdownOpen]);

  // Navigation configuration with logical grouping
  const navigationConfig = {
    main: [
      { id: 'welcome', label: 'Welcome', icon: <Sprout size={16} /> },
      { id: 'dashboard', label: 'Dashboard', icon: <Home size={16} /> }
    ],
    projects: [
      { id: 'verification', label: 'Project Verification', icon: <Shield size={16} /> }
    ],
    community: [
      { id: 'compliance', label: 'Compliance', icon: <Award size={16} /> },
      { id: 'support', label: 'Community Support', icon: <Users size={16} /> }
    ],
    reports: [
      { id: 'reports', label: 'Impact Reports', icon: <BarChart3 size={16} /> }
    ]
  };

  const moreOptions = [
    { id: 'more', label: 'More Options', icon: <Settings size={16} /> }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    setIsMoreDropdownOpen(false);
  };

  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: 'linear-gradient(135deg, #F8FAF9 0%, #E8F5F0 100%)',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      position: 'relative' as const,
      overflow: 'hidden' as const
    },
    backgroundPattern: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.03,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234CAF50' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      pointerEvents: 'none' as const
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1rem 2rem 2rem',
      position: 'relative' as const,
      zIndex: 1
    },
    // Enhanced Navigation Styles
    navigation: {
      position: 'sticky' as const,
      top: 0,
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.98)',
      borderRadius: '0 0 1rem 1rem',
      boxShadow: '0 4px 20px rgba(0, 119, 182, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      marginBottom: '2rem',
      backdropFilter: 'blur(15px)'
    },
    navContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1rem 2rem'
    },
    navHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#0077B6',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    mobileMenuButton: {
      display: 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '0.5rem',
      transition: 'all 0.3s ease',
      color: '#0077B6'
    },
    // Desktop Navigation
    desktopNav: {
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap' as const
    },
    navGroup: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      position: 'relative' as const
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1rem',
      borderRadius: '0.75rem',
      cursor: 'pointer',
      fontWeight: 500,
      fontSize: '0.875rem',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap' as const,
      background: 'rgba(255, 255, 255, 0.7)',
      color: '#64748b',
      border: '1px solid rgba(226, 232, 240, 0.5)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      backdropFilter: 'blur(10px)'
    },
    navItemActive: {
      background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
      color: 'white',
      boxShadow: '0 4px 16px rgba(76, 175, 80, 0.4)',
      transform: 'translateY(-2px)',
      border: '1px solid rgba(76, 175, 80, 0.3)'
    },
    // Dropdown Styles
    dropdownTrigger: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1rem',
      borderRadius: '0.75rem',
      cursor: 'pointer',
      fontWeight: 500,
      fontSize: '0.875rem',
      transition: 'all 0.3s ease',
      background: 'rgba(255, 255, 255, 0.7)',
      color: '#64748b',
      border: '1px solid rgba(226, 232, 240, 0.5)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      backdropFilter: 'blur(10px)'
    },
    dropdownTriggerActive: {
      background: 'linear-gradient(135deg, #7B61FF 0%, #9D80FF 100%)',
      color: 'white',
      boxShadow: '0 4px 16px rgba(123, 97, 255, 0.4)',
      transform: 'translateY(-2px)'
    },
    dropdown: {
      position: 'absolute' as const,
      top: '100%',
      right: '0',
      marginTop: '0.5rem',
      background: 'rgba(255, 255, 255, 0.98)',
      borderRadius: '0.75rem',
      padding: '0.5rem',
      boxShadow: '0 12px 32px rgba(0, 119, 182, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(15px)',
      zIndex: 1000,
      minWidth: '200px'
    },
    dropdownItem: {
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
      width: '100%',
      textAlign: 'left' as const
    },
    dropdownItemActive: {
      background: 'linear-gradient(135deg, #7B61FF 0%, #9D80FF 100%)',
      color: 'white',
      boxShadow: '0 2px 8px rgba(123, 97, 255, 0.3)'
    },
    // Mobile Navigation
    mobileNav: {
      position: 'absolute' as const,
      top: '100%',
      left: '0',
      right: '0',
      background: 'rgba(255, 255, 255, 0.98)',
      borderRadius: '0 0 1rem 1rem',
      padding: '1rem',
      boxShadow: '0 8px 32px rgba(0, 119, 182, 0.2)',
      backdropFilter: 'blur(15px)',
      zIndex: 99
    },
    mobileNavGroup: {
      marginBottom: '1.5rem'
    },
    mobileNavGroupTitle: {
      fontSize: '0.75rem',
      fontWeight: 600,
      color: '#64748b',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
      marginBottom: '0.75rem',
      paddingLeft: '0.5rem'
    },
    mobileNavItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1rem',
      borderRadius: '0.75rem',
      cursor: 'pointer',
      fontWeight: 500,
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      background: 'transparent',
      color: '#64748b',
      border: '1px solid transparent',
      marginBottom: '0.5rem',
      width: '100%',
      textAlign: 'left' as const
    },
    mobileNavItemActive: {
      background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
      color: 'white',
      boxShadow: '0 4px 16px rgba(76, 175, 80, 0.3)'
    },
    // Main Content
    mainContent: {
      background: activeTab === 'more' ? 'transparent' : 'rgba(255, 255, 255, 0.95)',
      borderRadius: activeTab === 'more' ? '0' : '1rem',
      padding: activeTab === 'more' ? '0' : '2.5rem',
      boxShadow: activeTab === 'more' ? 'none' : '0 8px 32px rgba(0, 119, 182, 0.1)',
      border: activeTab === 'more' ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: activeTab === 'more' ? 'none' : 'blur(10px)',
      minHeight: '60vh'
    },
    // Stats Cards
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem',
      marginBottom: '3rem'
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 8px 32px rgba(0, 119, 182, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      transition: 'all 0.3s ease'
    }
  };

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
            e.currentTarget.style.background = 'rgba(76, 175, 80, 0.1)';
            e.currentTarget.style.color = '#4CAF50';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.borderColor = 'rgba(76, 175, 80, 0.3)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive && !isMobile) {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
            e.currentTarget.style.color = '#64748b';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.5)';
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

      {/* Projects Group */}
      <div style={styles.navGroup}>
        {navigationConfig.projects.map(item => 
          renderNavItem(item, activeTab === item.id)
        )}
      </div>

      {/* Community Group */}
      <div style={styles.navGroup}>
        {navigationConfig.community.map(item => 
          renderNavItem(item, activeTab === item.id)
        )}
      </div>

      {/* Reports Group */}
      <div style={styles.navGroup}>
        {navigationConfig.reports.map(item => 
          renderNavItem(item, activeTab === item.id)
        )}
      </div>

      {/* More Dropdown */}
      <div style={styles.navGroup} data-dropdown>
        <button
          style={{
            ...styles.dropdownTrigger,
            ...(activeTab === 'more' || isMoreDropdownOpen ? styles.dropdownTriggerActive : {})
          }}
          onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
          onMouseEnter={(e) => {
            if (!(activeTab === 'more' || isMoreDropdownOpen)) {
              e.currentTarget.style.background = 'rgba(123, 97, 255, 0.1)';
              e.currentTarget.style.color = '#7B61FF';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (!(activeTab === 'more' || isMoreDropdownOpen)) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
              e.currentTarget.style.color = '#64748b';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          <Settings size={16} />
          <span>More</span>
          <ChevronDown size={14} style={{
            transform: isMoreDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }} />
        </button>
        
        {isMoreDropdownOpen && (
          <div style={styles.dropdown}>
            {moreOptions.map(item => (
              <button
                key={item.id}
                style={{
                  ...styles.dropdownItem,
                  ...(activeTab === item.id ? styles.dropdownItemActive : {})
                }}
                onClick={() => handleTabClick(item.id)}
                onMouseEnter={(e) => {
                  if (activeTab !== item.id) {
                    e.currentTarget.style.background = 'rgba(123, 97, 255, 0.1)';
                    e.currentTarget.style.color = '#7B61FF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== item.id) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#64748b';
                  }
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
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

      {/* Projects Group */}
      <div style={styles.mobileNavGroup}>
        <div style={styles.mobileNavGroupTitle}>Projects</div>
        {navigationConfig.projects.map(item => 
          renderNavItem(item, activeTab === item.id, true)
        )}
      </div>

      {/* Community Group */}
      <div style={styles.mobileNavGroup}>
        <div style={styles.mobileNavGroupTitle}>Community</div>
        {navigationConfig.community.map(item => 
          renderNavItem(item, activeTab === item.id, true)
        )}
      </div>

      {/* Reports Group */}
      <div style={styles.mobileNavGroup}>
        <div style={styles.mobileNavGroupTitle}>Reports</div>
        {navigationConfig.reports.map(item => 
          renderNavItem(item, activeTab === item.id, true)
        )}
        {moreOptions.map(item => 
          renderNavItem(item, activeTab === item.id, true)
        )}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'welcome':
        return <NGOWelcomePage />;
      case 'verification':
        return <ProjectVerification />;
      case 'compliance':
        return <ComplianceMonitoring />;
      case 'support':
        return <CommunitySupport />;
      case 'reports':
        return <ImpactReports />;
      case 'more':
        return <NGOMore onClose={() => setActiveTab('dashboard')} />;
      default:
        return (
          <>
            {/* Dashboard Overview Content */}
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={{ fontSize: '2rem' }}>🌱</div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#4CAF50' }}>42</div>
                  <div style={{ color: '#64748b' }}>Projects Verified</div>
                </div>
              </div>
              <div style={styles.statCard}>
                <div style={{ fontSize: '2rem' }}>🌊</div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0077B6' }}>18</div>
                  <div style={{ color: '#64748b' }}>Communities Managed</div>
                </div>
              </div>
              <div style={styles.statCard}>
                <div style={{ fontSize: '2rem' }}>📋</div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#7B61FF' }}>156</div>
                  <div style={{ color: '#64748b' }}>Compliance Reports</div>
                </div>
              </div>
              <div style={styles.statCard}>
                <div style={{ fontSize: '2rem' }}>💰</div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0077B6' }}>
                    ₹1,24,000
                    {CurrencyUtils.shouldShowConversion("124000", "Total Earnings") && (
                      <span style={{...CurrencyUtils.getConversionStyle(), fontSize: '0.6em'}}>
                        {CurrencyUtils.getConversionString("124000", "Total Earnings")}
                      </span>
                    )}
                  </div>
                  <div style={{ color: '#64748b' }}>Total Earnings</div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>
      <DashboardHeader 
        title="NGO Dashboard"
        subtitle="Verify projects, monitor compliance, and support community initiatives"
        userRole="ngo"
      />
      
      <main style={styles.main}>
        {/* Enhanced Navigation */}
        <nav style={styles.navigation}>
          <div style={styles.navContainer}>
            {/* Navigation Header */}
            <div style={styles.navHeader}>
              <div style={styles.logo}>
                🌿 CLORIT
              </div>
              <button 
                style={{
                  ...styles.mobileMenuButton,
                  display: window.innerWidth <= 768 ? 'block' : 'none',
                  background: isMobileMenuOpen ? 'rgba(76, 175, 80, 0.1)' : 'transparent'
                }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div style={{ display: window.innerWidth <= 768 ? 'none' : 'block' }}>
              {renderDesktopNavigation()}
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && renderMobileNavigation()}
          </div>
        </nav>

        {/* Tab Content */}
        <div style={styles.mainContent}>
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default NGODashboard;
