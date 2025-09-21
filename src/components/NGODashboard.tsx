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
  Globe,
  ShoppingCart,
  Coins,
  MapPin,
  Satellite,
  LogOut,
  User
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
  const [isMobile, setIsMobile] = useState(false);

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

  // Navigation configuration with all requested menu items
  const navigationConfig = {
    main: [
      { id: 'welcome', label: 'Welcome', icon: <Home size={16} /> },
      { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={16} /> },
      { id: 'projects', label: 'Projects', icon: <Sprout size={16} /> },
      { id: 'carbon-minting', label: 'Carbon Minting', icon: <Coins size={16} /> },
      { id: 'marketplace', label: 'Marketplace', icon: <ShoppingCart size={16} /> },
      { id: 'reporting', label: 'Reporting', icon: <FileText size={16} /> },
      { id: 'ndvi', label: 'NDVI', icon: <Satellite size={16} /> },
      { id: 'logout', label: 'Logout', icon: <LogOut size={16} /> }
    ]
  };

  const handleTabClick = (tabId: string) => {
    if (tabId === 'logout') {
      // Handle logout functionality
      AuthUtils.logout();
      navigate('/');
      return;
    }
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
      background: 'white',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '2rem'
    },
    navContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '70px'
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#0077B6',
      display: 'flex',
      alignItems: 'center',
      gap: '15px', // 15-20px spacing as requested
      minWidth: '120px'
    },
    logoIcon: {
      fontSize: '1.8rem',
      lineHeight: 1
    },
    mobileMenuButton: {
      display: 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '0.5rem',
      transition: 'all 0.3s ease',
      color: '#0077B6',
      '@media (max-width: 768px)': {
        display: 'block'
      }
    },
    // Desktop Navigation
    desktopNav: {
      display: 'flex',
      gap: '4px',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      paddingLeft: '2rem',
      paddingRight: '1rem'
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 18px',
      cursor: 'pointer',
      fontWeight: 500,
      fontSize: '14px',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap' as const,
      background: 'transparent',
      color: '#64748b',
      border: 'none',
      borderRadius: '8px',
      margin: '0 1px',
      lineHeight: 1.2,
      minHeight: '40px'
    },
    navItemActive: {
      background: '#4CAF50',
      color: 'white',
      boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)',
      transform: 'translateY(-1px)'
    },
    navItemLogout: {
      marginLeft: 'auto',
      background: '#ef4444',
      color: 'white'
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 12px',
      borderRadius: '8px',
      background: '#f8fafc',
      color: '#64748b',
      minWidth: '60px',
      justifyContent: 'center'
    },
    // Dropdown Styles (keeping for future use)
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
      background: 'white',
      borderTop: '1px solid #e2e8f0',
      padding: '1rem',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 99
    },
    mobileNavGroup: {
      marginBottom: '1rem'
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
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 500,
      fontSize: '14px',
      transition: 'all 0.3s ease',
      background: 'transparent',
      color: '#64748b',
      border: 'none',
      marginBottom: '4px',
      width: '100%',
      textAlign: 'left' as const
    },
    mobileNavItemActive: {
      background: '#4CAF50',
      color: 'white'
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
    const isLogout = item.id === 'logout';
    const baseStyle = isMobile ? styles.mobileNavItem : styles.navItem;
    const activeStyle = isMobile ? styles.mobileNavItemActive : styles.navItemActive;
    const logoutStyle = isLogout && !isMobile ? styles.navItemLogout : {};
    
    return (
      <button
        key={item.id}
        style={{
          ...baseStyle,
          ...(isActive ? activeStyle : {}),
          ...logoutStyle
        }}
        onClick={() => handleTabClick(item.id)}
        onMouseEnter={(e) => {
          if (!isActive && !isMobile) {
            if (isLogout) {
              e.currentTarget.style.background = '#dc2626';
              e.currentTarget.style.transform = 'translateY(-1px)';
            } else {
              e.currentTarget.style.background = '#f1f5f9';
              e.currentTarget.style.color = '#4CAF50';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive && !isMobile) {
            if (isLogout) {
              e.currentTarget.style.background = '#ef4444';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateY(0)';
            } else {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#64748b';
              e.currentTarget.style.transform = 'translateY(0)';
            }
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
      {navigationConfig.main.map(item => 
        renderNavItem(item, activeTab === item.id)
      )}
    </div>
  );

  const renderMobileNavigation = () => (
    <div style={styles.mobileNav}>
      <div style={styles.mobileNavGroup}>
        <div style={styles.mobileNavGroupTitle}>Navigation</div>
        {navigationConfig.main.map(item => 
          renderNavItem(item, activeTab === item.id, true)
        )}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'welcome':
        return <NGOWelcomePage />;
      case 'projects':
        return <ProjectVerification />;
      case 'carbon-minting':
        return <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Carbon Minting</h2>
          <p>Carbon credit minting and verification system coming soon...</p>
        </div>;
      case 'marketplace':
        return <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Carbon Credit Marketplace</h2>
          <p>Buy and sell carbon credits in our marketplace...</p>
        </div>;
      case 'reporting':
        return <ImpactReports />;
      case 'ndvi':
        return <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>NDVI Analysis</h2>
          <p>Satellite-based vegetation monitoring and analysis...</p>
        </div>;
      case 'dashboard':
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
            {/* Logo */}
            <div style={styles.logo}>
              <span style={styles.logoIcon}>🌿</span>
              <span>CLOR</span>
            </div>

            {/* Desktop Navigation */}
            <div style={{ 
              display: isMobile ? 'none' : 'flex',
              flex: 1
            }}>
              {renderDesktopNavigation()}
            </div>

            {/* User Profile Icon */}
            <div style={{
              ...styles.userProfile,
              display: isMobile ? 'none' : 'flex'
            }}>
              <User size={20} />
            </div>

            {/* Mobile Menu Button */}
            <button 
              style={{
                ...styles.mobileMenuButton,
                display: isMobile ? 'block' : 'none'
              }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && isMobile && renderMobileNavigation()}
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
