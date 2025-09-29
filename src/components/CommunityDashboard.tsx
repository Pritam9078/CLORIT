import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnalyticsWidget from './shared/AnalyticsWidget';
import NotificationSystem from './shared/NotificationSystem';
import ProgressTracker from './shared/ProgressTracker';
import WeatherWidget from './shared/WeatherWidget';
import PerformanceMonitor from './shared/PerformanceMonitor';
import ResourceUsageWidget from './shared/ResourceUsageWidget';
import ActivityFeed from './shared/ActivityFeed';
import DataVisualizationHub from './shared/DataVisualizationHub';
import SettingsPreferences from './shared/SettingsPreferences';
import WalletConnectModal from './WalletConnectModal';
import { AuthUtils } from '../utils/auth';
import { CurrencyUtils } from '../utils/currency';
import { WalletUtils } from '../utils/walletUtils';

const CommunityDashboard = () => {
  const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletBalance, setWalletBalance] = useState('0');

  // Get current user info
  const currentUser = AuthUtils.getCurrentUser() || {
    name: 'Rajesh Kumar',
    email: 'community@example.com',
    role: 'community'
  };

  // Menu items for navigation
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠', route: '/community-dashboard' },
    { id: 'register-land', label: 'Register Land', icon: '🌳', route: '/land-registration' },
    { id: 'track-impact', label: 'Track Impact', icon: '📊', route: '/track-impact' },
    { id: 'input-data', label: 'Input Data', icon: '🌿', route: '/plantation-data-input' },
    { id: 'earn-credits', label: 'Earn Credits', icon: '💳', route: '/earn-credits' }
  ];

  useEffect(() => {
    // Initialize mock user profile if not exists
    const currentUser = AuthUtils.getCurrentUser();
    if (!currentUser) {
      const mockUser = {
        id: 'community-001',
        name: 'Rajesh Kumar',
        email: 'community@example.com',
        role: 'community',
      };
      AuthUtils.saveUserProfile(mockUser);
    }
    
    // Check wallet connection status
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    try {
      // Check if wallet is connected from localStorage
      if (WalletUtils.isConnected()) {
        const storedAddress = localStorage.getItem('CLORIT_WALLET_ADDRESS');
        if (storedAddress) {
          setWalletConnected(true);
          setWalletAddress(storedAddress);
          
          // Try to get current balance from provider
          const provider = WalletUtils.getEthereumProvider();
          if (provider) {
            try {
              const balance = await provider.request({
                method: 'eth_getBalance',
                params: [storedAddress, 'latest']
              });
              setWalletBalance(WalletUtils.weiToEth(balance));
            } catch (error) {
              console.log('Could not get balance:', error);
              setWalletBalance('0');
            }
          }
        }
      }
    } catch (error) {
      console.log('No wallet connected');
    }
  };

  const handleWalletConnect = async (address: string, provider: any) => {
    setWalletConnected(true);
    setWalletAddress(address);
    
    try {
      const balance = await provider.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
      });
      setWalletBalance(WalletUtils.weiToEth(balance));
    } catch (error) {
      console.error('Error getting wallet balance:', error);
      setWalletBalance('0');
    }
  };

  const handleWalletDisconnect = () => {
    try {
      WalletUtils.disconnectWallet();
      setWalletConnected(false);
      setWalletAddress('');
      setWalletBalance('0');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const styles = {
    container: {
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      lineHeight: 1.6
    },
    navbar: {
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      position: 'sticky' as const,
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid #e2e8f0',
      backdropFilter: 'blur(10px)',
      height: '80px'
    },
    navContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      height: '80px',
      gap: '1rem',
      minHeight: '80px',
      overflow: 'hidden'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      flex: '0 0 auto',
      minWidth: 'fit-content'
    },
    logoIcon: {
      width: '44px',
      height: '44px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.6rem',
      color: 'white',
      boxShadow: '0 4px 16px rgba(14, 165, 233, 0.4)',
      fontWeight: 600,
      border: '2px solid rgba(255, 255, 255, 0.2)',
      position: 'relative' as const,
      overflow: 'hidden' as const
    },
    logoText: {
      fontSize: '1.6rem',
      fontWeight: 800,
      color: '#0f172a',
      letterSpacing: '-0.025em',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      userSelect: 'none' as const
    },
    navMenuContainer: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    navMenu: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      listStyle: 'none',
      margin: 0,
      padding: '0.5rem',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e2e8f0'
    },
    navMenuItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      textDecoration: 'none',
      color: '#64748b',
      fontWeight: 600,
      fontSize: '0.875rem',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      whiteSpace: 'nowrap'
    },
    navMenuItemActive: {
      backgroundColor: '#0ea5e9',
      color: 'white',
      boxShadow: '0 4px 12px rgba(14, 165, 233, 0.4)',
      transform: 'translateY(-1px)'
    },
    navMenuItemHover: {
      backgroundColor: '#e2e8f0',
      color: '#0ea5e9'
    },
    mobileMenuButton: {
      display: 'none',
      padding: '0.75rem',
      backgroundColor: 'transparent',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#64748b',
      transition: 'all 0.2s ease',
      height: '48px',
      width: '48px',
      alignItems: 'center',
      justifyContent: 'center'
    },
    mobileMenu: {
      position: 'absolute' as const,
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: 'white',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
      display: 'none',
      flexDirection: 'column' as const,
      padding: '1rem 0',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid #e2e8f0',
      maxHeight: '90vh',
      overflowY: 'auto' as const
    },
    profileContainer: {
      position: 'relative' as const,
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      flex: '0 0 auto',
      minWidth: 'fit-content',
      maxWidth: '400px',
      justifyContent: 'flex-end',
      marginLeft: 'auto'
    },
    profileButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 0.75rem',
      backgroundColor: 'transparent',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      cursor: 'pointer',
      color: '#64748b',
      fontWeight: 500,
      fontSize: '0.8rem',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      minWidth: '120px',
      justifyContent: 'center',
      maxWidth: '180px',
      whiteSpace: 'nowrap' as const,
      overflow: 'hidden' as const,
      textOverflow: 'ellipsis' as const
    },
    profileButtonHover: {
      backgroundColor: '#f8fafc',
      borderColor: '#0ea5e9',
      color: '#0ea5e9',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
    },
    profileAvatar: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: '0.875rem',
      boxShadow: '0 2px 8px rgba(14, 165, 233, 0.3)'
    },
    profileDropdown: {
      position: 'absolute' as const,
      top: '100%',
      right: 0,
      marginTop: '0.75rem',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
      border: '1px solid #e2e8f0',
      minWidth: '220px',
      zIndex: 1000,
      display: 'none',
      overflow: 'hidden'
    },
    profileDropdownOpen: {
      display: 'block',
      animation: 'slideDown 0.2s ease-out'
    },
    profileDropdownItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.875rem 1.25rem',
      cursor: 'pointer',
      fontSize: '0.875rem',
      color: '#374151',
      transition: 'all 0.2s ease',
      borderBottom: '1px solid #f3f4f6'
    },
    profileDropdownItemHover: {
      backgroundColor: '#f8fafc',
      color: '#0ea5e9'
    },
    profileDropdownHeader: {
      padding: '1.25rem',
      borderBottom: '1px solid #e5e7eb',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
    },
    profileName: {
      fontWeight: 700,
      color: '#1f2937',
      fontSize: '1rem',
      marginBottom: '0.25rem'
    },
    profileEmail: {
      color: '#6b7280',
      fontSize: '0.75rem'
    },
    main: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2.5rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem',
      marginBottom: '3rem'
    },
    statCard: {
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    statIcon: {
      fontSize: '2.5rem',
      width: '70px',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '16px',
      color: 'white',
      fontWeight: 600,
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
      flexShrink: 0
    },
    statContent: {
      flex: 1
    },
    statNumber: {
      fontSize: '2rem',
      fontWeight: 800,
      color: '#1e293b',
      marginBottom: '0.5rem',
      lineHeight: 1.2
    },
    statLabel: {
      color: '#64748b',
      fontSize: '0.875rem',
      fontWeight: 600,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em'
    },
    actionCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '2.5rem',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e2e8f0',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      textAlign: 'center' as const,
      minHeight: '280px',
      justifyContent: 'space-between'
    },
    actionIcon: {
      fontSize: '3.5rem',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80px',
      height: '80px',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      borderRadius: '20px',
      border: '2px solid #0077B6'
    },
    actionTitle: {
      fontSize: '1.375rem',
      fontWeight: 700,
      marginBottom: '1rem',
      color: '#1e293b',
      textAlign: 'center' as const
    },
    actionDescription: {
      color: '#64748b',
      lineHeight: 1.6,
      marginBottom: '2rem',
      fontSize: '0.95rem',
      textAlign: 'center' as const,
      flex: 1,
      display: 'flex',
      alignItems: 'center'
    },
    actionButton: {
      background: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '12px',
      border: 'none',
      fontWeight: 700,
      cursor: 'pointer',
      fontSize: '0.95rem',
      transition: 'all 0.3s ease',
      width: '100%',
      maxWidth: '200px',
      boxShadow: '0 6px 20px rgba(0, 119, 182, 0.25)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px'
    },
    // Wallet Connection Styles
    walletConnectBtn: {
      background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
      color: 'white',
      padding: '0.5rem 0.75rem',
      borderRadius: '8px',
      border: 'none',
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: '0.8rem',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)',
      whiteSpace: 'nowrap' as const,
      minWidth: '120px',
      justifyContent: 'center'
    },
    walletConnected: {
      display: 'flex',
      alignItems: 'center',
      background: 'rgba(34, 197, 94, 0.1)',
      border: '2px solid rgba(34, 197, 94, 0.2)',
      borderRadius: '8px',
      padding: '0.4rem 0.6rem',
      gap: '0.4rem',
      minWidth: '140px',
      maxWidth: '180px'
    },
    walletIcon: {
      fontSize: '1.2rem',
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(34, 197, 94, 0.2)',
      borderRadius: '6px'
    },
    walletInfo: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.125rem'
    },
    walletAddress: {
      fontSize: '0.75rem',
      fontWeight: 600,
      color: '#16a34a',
      fontFamily: 'monospace'
    },
    walletBalance: {
      fontSize: '0.7rem',
      color: '#64748b',
      fontWeight: 500
    },
    walletDisconnectBtn: {
      background: 'rgba(239, 68, 68, 0.1)',
      color: '#dc2626',
      border: '1px solid rgba(239, 68, 68, 0.2)',
      borderRadius: '4px',
      width: '24px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 'bold',
      transition: 'all 0.2s ease'
    }
  };

  const handleMenuClick = (menuItem: typeof menuItems[0]) => {
    setActiveMenuItem(menuItem.id);
    if (menuItem.route !== '/community-dashboard') {
      navigate(menuItem.route);
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsProfileDropdownOpen(false); // Close profile dropdown when mobile menu opens
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsMobileMenuOpen(false); // Close mobile menu when profile dropdown opens
  };

  const handleProfileAction = (action: string) => {
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false); // Close mobile menu when action is taken
    
    switch (action) {
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        try {
          // Clear all local storage and auth data
          localStorage.removeItem('CLORIT_USER');
          localStorage.removeItem('CLORIT_AUTH_TOKEN');
          localStorage.removeItem('CLORIT_WALLET_ADDRESS');
          
          // Use AuthUtils if available
          if (AuthUtils && typeof AuthUtils.logout === 'function') {
            AuthUtils.logout();
          }
          
          // Force navigation to login
          window.location.href = '/login';
        } catch (error) {
          console.error('Logout error:', error);
          // Fallback logout
          window.location.href = '/login';
        }
        break;
    }
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-container') && !target.closest('.mobile-menu')) {
        setIsProfileDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={styles.container}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
          
          * {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .stat-card {
            animation: fadeInUp 0.6s ease-out;
          }

          .stat-card:nth-child(1) { animation-delay: 0.1s; }
          .stat-card:nth-child(2) { animation-delay: 0.2s; }
          .stat-card:nth-child(3) { animation-delay: 0.3s; }
          .stat-card:nth-child(4) { animation-delay: 0.4s; }

          @media (max-width: 1024px) {
            .nav-menu {
              gap: 0.25rem !important;
            }
            .nav-menu-item {
              padding: 0.5rem 1rem !important;
              font-size: 0.8rem !important;
            }
            .logo-text {
              font-size: 1.4rem !important;
            }
            .profile-container {
              gap: 0.5rem !important;
              max-width: 350px !important;
            }
            .profile-button {
              padding: 0.4rem 0.6rem !important;
              font-size: 0.75rem !important;
              min-width: 100px !important;
              max-width: 150px !important;
            }
            .profile-name {
              max-width: 80px !important;
              overflow: hidden !important;
              text-overflow: ellipsis !important;
            }
            .wallet-connect-btn {
              padding: 0.4rem 0.6rem !important;
              font-size: 0.75rem !important;
              min-width: 100px !important;
            }
            .wallet-connected {
              min-width: 120px !important;
              max-width: 150px !important;
            }
            .nav-container {
              gap: 0.75rem !important;
            }
          }

          @media (max-width: 768px) {
            .nav-menu {
              display: none !important;
            }
            .profile-container {
              display: none !important;
            }
            .mobile-menu-button {
              display: flex !important;
            }
            .mobile-menu {
              display: ${isMobileMenuOpen ? 'flex' : 'none'} !important;
            }
            .nav-container {
              padding: 0 1rem !important;
              gap: 0.5rem !important;
            }
            .logo-container {
              flex: 1 !important;
            }
            .logo-text {
              font-size: 1.3rem !important;
            }
            .logo-icon {
              width: 36px !important;
              height: 36px !important;
            }
          }
          
          @media (min-width: 769px) {
            .nav-menu {
              display: flex !important;
            }
            .profile-container {
              display: flex !important;
            }
            .profile-name {
              display: inline !important;
            }
            .mobile-menu-button {
              display: none !important;
            }
            .mobile-menu {
              display: none !important;
            }
          }

          /* Tablet landscape optimization */
          @media (min-width: 769px) and (max-width: 1024px) {
            .nav-container {
              padding: 0 1.5rem !important;
            }
            .profile-container {
              margin-left: 0.5rem !important;
            }
          }

          @media (max-width: 480px) {
            .stats-grid {
              grid-template-columns: 1fr !important;
            }
            .welcome-section h1 {
              font-size: 1.75rem !important;
            }
            .nav-container {
              padding: 0 0.75rem !important;
            }
            .logo-text {
              font-size: 1.2rem !important;
            }
          }
          
          /* Enhanced hover effects */
          .nav-menu-item:hover {
            background-color: #e2e8f0 !important;
            color: #0ea5e9 !important;
            transform: translateY(-1px) !important;
          }

          .mobile-menu-button:hover {
            background-color: #f1f5f9 !important;
            border-color: #0ea5e9 !important;
            color: #0ea5e9 !important;
          }

          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: #f1f5f9;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }

          .stat-card:hover {
            transform: translateY(-4px) !important;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12) !important;
          }

          .nav-menu-item {
            position: relative !important;
          }

          .nav-menu-item::before {
            content: '' !important;
            position: absolute !important;
            bottom: -2px !important;
            left: 50% !important;
            width: 0 !important;
            height: 2px !important;
            background: #0ea5e9 !important;
            transition: all 0.2s ease !important;
            transform: translateX(-50%) !important;
          }

          .nav-menu-item:hover::before {
            width: 80% !important;
          }

          /* Mobile menu animations */
          .mobile-menu {
            transition: all 0.3s ease !important;
          }

          /* Profile dropdown animations */
          .profile-dropdown {
            transition: all 0.2s ease !important;
          }

          /* Ensure proper spacing and alignment */
          .profile-container {
            flex-shrink: 0 !important;
          }

          .nav-container {
            min-width: 0 !important;
          }

          /* Responsive notification icon */
          @media (max-width: 1024px) {
            .notification-icon {
              width: 36px !important;
              height: 36px !important;
            }
          }

          /* Very small screen adjustments */
          @media (max-width: 320px) {
            .nav-container {
              padding: 0 0.5rem !important;
            }
            .logo-text {
              font-size: 1.1rem !important;
            }
            .logo-icon {
              width: 32px !important;
              height: 32px !important;
            }
          }

          /* Ensure profile elements don't break on overflow */
          .profile-container * {
            flex-shrink: 0;
          }

          .profile-name {
            max-width: 120px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        `}
      </style>

      {/* Top Navigation Bar */}
      <nav style={styles.navbar}>
        <div className="nav-container" style={styles.navContainer}>
          {/* Logo Section */}
          <div style={styles.logoContainer} className="logo-container">
            <div style={styles.logoIcon} className="logo-icon">
              {/* Enhanced Logo with fallback */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* Primary logo - Tree/Leaf icon */}
                <span style={{
                  fontSize: '1.3rem',
                  fontWeight: 900,
                  color: 'white',
                  textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                  fontFamily: 'Inter, -apple-system, sans-serif',
                  letterSpacing: '-0.05em'
                }}>CL</span>
                
              </div>
            </div>
            <div style={styles.logoText} className="logo-text">
              CLORIT
            </div>
          </div>
          
          {/* Desktop Navigation Menu */}
          <div style={styles.navMenuContainer}>
            <ul className="nav-menu" style={styles.navMenu}>
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    style={{
                      ...styles.navMenuItem,
                      ...(activeMenuItem === item.id ? styles.navMenuItemActive : {})
                    }}
                    onClick={() => handleMenuClick(item)}
                    className="nav-menu-item"
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Profile Section */}
          <div className="profile-container" style={styles.profileContainer}>
            {/* Notifications */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
            className="notification-icon"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e2e8f0';
              e.currentTarget.style.borderColor = '#0ea5e9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
            >
              <span style={{ fontSize: '1.1rem' }}>🔔</span>
              <div style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '8px',
                height: '8px',
                backgroundColor: '#ef4444',
                borderRadius: '50%',
                border: '2px solid white'
              }} />
            </div>

            {/* Wallet Connection Button */}
            {walletConnected ? (
              <div style={styles.walletConnected} className="wallet-connected">
                <div style={styles.walletIcon}>🔗</div>
                <div style={styles.walletInfo}>
                  <div style={styles.walletAddress}>
                    {WalletUtils.formatAddress(walletAddress)}
                  </div>
                  <div style={styles.walletBalance}>
                    {parseFloat(walletBalance).toFixed(4)} ETH
                  </div>
                </div>
                <button
                  style={styles.walletDisconnectBtn}
                  onClick={handleWalletDisconnect}
                  title="Disconnect Wallet"
                >
                  ×
                </button>
              </div>
            ) : (
              <button
                style={styles.walletConnectBtn}
                className="wallet-connect-btn"
                onClick={() => setIsWalletModalOpen(true)}
              >
                <span style={{ marginRight: '0.5rem' }}>🔗</span>
                Connect Wallet
              </button>
            )}

            <button
              style={styles.profileButton}
              className="profile-button"
              onClick={toggleProfileDropdown}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, styles.profileButtonHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, styles.profileButton);
              }}
            >
              <div style={styles.profileAvatar}>
                {getUserInitials(currentUser.name)}
              </div>
              <span className="profile-name">{currentUser.name}</span>
              <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>
                {isProfileDropdownOpen ? '▲' : '▼'}
              </span>
            </button>

            {/* Profile Dropdown */}
            <div
              style={{
                ...styles.profileDropdown,
                ...(isProfileDropdownOpen ? styles.profileDropdownOpen : {})
              }}
            >
              <div style={styles.profileDropdownHeader}>
                <div style={styles.profileName}>{currentUser.name}</div>
                <div style={styles.profileEmail}>{currentUser.email}</div>
              </div>
              <div
                style={styles.profileDropdownItem}
                onClick={() => handleProfileAction('profile')}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, styles.profileDropdownItemHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, styles.profileDropdownItem);
                }}
              >
                <span>👤</span>
                View Profile
              </div>
              <div
                style={styles.profileDropdownItem}
                onClick={() => handleProfileAction('settings')}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, styles.profileDropdownItemHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, styles.profileDropdownItem);
                }}
              >
                <span>⚙️</span>
                Settings
              </div>
              <div
                style={{
                  ...styles.profileDropdownItem,
                  borderBottom: 'none'
                }}
                onClick={() => handleProfileAction('logout')}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, {
                    ...styles.profileDropdownItemHover,
                    color: '#ef4444'
                  });
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, styles.profileDropdownItem);
                }}
              >
                <span>🚪</span>
                Logout
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            style={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="mobile-menu" style={styles.mobileMenu}>
          {/* Mobile Profile Section */}
          <div style={{
            padding: '1.25rem',
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: '#f8fafc'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <div style={styles.profileAvatar}>
                {getUserInitials(currentUser.name)}
              </div>
              <div>
                <div style={styles.profileName}>{currentUser.name}</div>
                <div style={styles.profileEmail}>{currentUser.email}</div>
              </div>
            </div>
            
            {/* Mobile Wallet & Notifications */}
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'center'
            }}>
              {/* Notifications */}
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                backgroundColor: 'white',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                cursor: 'pointer'
              }}>
                <span style={{ fontSize: '1.1rem' }}>🔔</span>
                <div style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#ef4444',
                  borderRadius: '50%',
                  border: '2px solid white'
                }} />
              </div>

              {/* Mobile Wallet */}
              {walletConnected ? (
                <div style={{
                  ...styles.walletConnected,
                  marginRight: 0,
                  flex: 1
                }}>
                  <div style={styles.walletIcon}>🔗</div>
                  <div style={styles.walletInfo}>
                    <div style={styles.walletAddress}>
                      {WalletUtils.formatAddress(walletAddress)}
                    </div>
                    <div style={styles.walletBalance}>
                      {parseFloat(walletBalance).toFixed(4)} ETH
                    </div>
                  </div>
                  <button
                    style={styles.walletDisconnectBtn}
                    onClick={handleWalletDisconnect}
                    title="Disconnect Wallet"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button
                  style={{
                    ...styles.walletConnectBtn,
                    marginRight: 0,
                    flex: 1,
                    justifyContent: 'center'
                  }}
                  onClick={() => setIsWalletModalOpen(true)}
                >
                  <span style={{ marginRight: '0.5rem' }}>🔗</span>
                  Connect Wallet
                </button>
              )}
            </div>
          </div>

          {/* Navigation Menu Items */}
          {menuItems.map((item) => (
            <button
              key={item.id}
              style={{
                ...styles.navMenuItem,
                ...(activeMenuItem === item.id ? styles.navMenuItemActive : {}),
                width: '100%',
                justifyContent: 'flex-start',
                margin: '0.25rem 1rem',
                borderRadius: '8px'
              }}
              onClick={() => handleMenuClick(item)}
            >
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}

          {/* Mobile Profile Actions */}
          <div style={{ 
            borderTop: '1px solid #e5e7eb', 
            marginTop: '0.5rem',
            paddingTop: '0.5rem'
          }}>
            <button
              style={{
                ...styles.navMenuItem,
                width: '100%',
                justifyContent: 'flex-start',
                margin: '0.25rem 1rem',
                borderRadius: '8px'
              }}
              onClick={() => handleProfileAction('profile')}
            >
              <span style={{ fontSize: '1.2rem' }}>👤</span>
              View Profile
            </button>
            <button
              style={{
                ...styles.navMenuItem,
                width: '100%',
                justifyContent: 'flex-start',
                margin: '0.25rem 1rem',
                borderRadius: '8px'
              }}
              onClick={() => handleProfileAction('settings')}
            >
              <span style={{ fontSize: '1.2rem' }}>⚙️</span>
              Settings
            </button>
            <button
              style={{
                ...styles.navMenuItem,
                width: '100%',
                justifyContent: 'flex-start',
                margin: '0.25rem 1rem',
                color: '#ef4444',
                borderRadius: '8px'
              }}
              onClick={() => handleProfileAction('logout')}
            >
              <span style={{ fontSize: '1.2rem' }}>🚪</span>
              Logout
            </button>
          </div>
        </div>
      </nav>
      
      <main style={styles.main}>
        {/* Professional Welcome Section */}
        <div style={{
          background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
          borderRadius: '20px',
          padding: '3rem 2rem',
          marginBottom: '3rem',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(14, 165, 233, 0.3)'
        }}>
          {/* Background decoration */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                backdropFilter: 'blur(10px)'
              }}>
                👋
              </div>
              <div>
                <h1 style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  marginBottom: '0.5rem',
                  lineHeight: 1.2
                }}>
                  Welcome back, {currentUser.name}!
                </h1>
                <p style={{
                  fontSize: '1.125rem',
                  opacity: 0.9,
                  margin: 0,
                  fontWeight: 400
                }}>
                  Ready to make a positive environmental impact today?
                </p>
              </div>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginTop: '2rem'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                padding: '1.5rem',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎯</div>
                <div style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>Today's Goal</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Plant 5 more trees</div>
              </div>
              
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                padding: '1.5rem',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚡</div>
                <div style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>Quick Action</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Update plantation data</div>
              </div>
            </div>
          </div>
        </div>
        {/* Enhanced Stats Grid */}
        <div style={styles.statsGrid}>
          <div 
            style={styles.statCard}
            className="stat-card"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
            }}
          >
            <div style={{
              ...styles.statIcon,
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
            }}>🌱</div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>156</div>
              <div style={styles.statLabel}>Trees Planted</div>
            </div>
          </div>
          
          <div 
            style={styles.statCard}
            className="stat-card"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
            }}
          >
            <div style={{
              ...styles.statIcon,
              background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)'
            }}>🌍</div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>2.4 tons</div>
              <div style={styles.statLabel}>CO₂ Captured</div>
            </div>
          </div>
          
          <div 
            style={styles.statCard}
            className="stat-card"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
            }}
          >
            <div style={{
              ...styles.statIcon,
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
            }}>💰</div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>
                ₹24,500
                {CurrencyUtils.shouldShowConversion("24500", "Earnings") && (
                  <span style={{...CurrencyUtils.getConversionStyle(), fontSize: '0.6em'}}>
                    {CurrencyUtils.getConversionString("24500", "Earnings")}
                  </span>
                )}
              </div>
              <div style={styles.statLabel}>Total Earnings</div>
            </div>
          </div>
          
          <div 
            style={styles.statCard}
            className="stat-card"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
            }}
          >
            <div style={{
              ...styles.statIcon,
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
            }}>🏆</div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>8</div>
              <div style={styles.statLabel}>Active Projects</div>
            </div>
          </div>
        </div>

        {/* Professional Action Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem',
          padding: '0 1rem'
        }}>
          <div 
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative' as const,
              overflow: 'hidden' as const
            }}
            onClick={() => setCurrentView('plantation')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(16, 185, 129, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
            }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
              color: 'white',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.25)'
            }}>🌱</div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '0.75rem',
              margin: '0 0 0.75rem 0'
            }}>Plant Trees</h3>
            <p style={{
              color: '#64748b',
              lineHeight: 1.6,
              fontSize: '0.95rem',
              margin: '0 0 1.5rem 0'
            }}>
              Register new plantations and contribute to environmental restoration
            </p>
            <div style={{
              color: '#10b981',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Get Started <span style={{ fontSize: '1.2rem' }}>→</span>
            </div>
          </div>

          <div 
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative' as const,
              overflow: 'hidden' as const
            }}
            onClick={() => setCurrentView('voting')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(14, 165, 233, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
            }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
              color: 'white',
              boxShadow: '0 8px 24px rgba(14, 165, 233, 0.25)'
            }}>🗳️</div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '0.75rem',
              margin: '0 0 0.75rem 0'
            }}>Vote on Proposals</h3>
            <p style={{
              color: '#64748b',
              lineHeight: 1.6,
              fontSize: '0.95rem',
              margin: '0 0 1.5rem 0'
            }}>
              Participate in DAO governance and shape community decisions
            </p>
            <div style={{
              color: '#0ea5e9',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Vote Now <span style={{ fontSize: '1.2rem' }}>→</span>
            </div>
          </div>

          <div 
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative' as const,
              overflow: 'hidden' as const
            }}
            onClick={() => setCurrentView('trading')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(245, 158, 11, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
            }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
              color: 'white',
              boxShadow: '0 8px 24px rgba(245, 158, 11, 0.25)'
            }}>💰</div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '0.75rem',
              margin: '0 0 0.75rem 0'
            }}>Trade Credits</h3>
            <p style={{
              color: '#64748b',
              lineHeight: 1.6,
              fontSize: '0.95rem',
              margin: '0 0 1.5rem 0'
            }}>
              Buy and sell carbon credits in the marketplace
            </p>
            <div style={{
              color: '#f59e0b',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Start Trading <span style={{ fontSize: '1.2rem' }}>→</span>
            </div>
          </div>

          <div 
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative' as const,
              overflow: 'hidden' as const
            }}
            onClick={() => setCurrentView('impact')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(139, 92, 246, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
            }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
              color: 'white',
              boxShadow: '0 8px 24px rgba(139, 92, 246, 0.25)'
            }}>📊</div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '0.75rem',
              margin: '0 0 0.75rem 0'
            }}>View Impact</h3>
            <p style={{
              color: '#64748b',
              lineHeight: 1.6,
              fontSize: '0.95rem',
              margin: '0 0 1.5rem 0'
            }}>
              Track your environmental impact and project analytics
            </p>
            <div style={{
              color: '#8b5cf6',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              View Report <span style={{ fontSize: '1.2rem' }}>→</span>
            </div>
          </div>
        </div>

        {/* New Enhanced Widgets Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Analytics Widget */}
          <AnalyticsWidget userRole="community" />
          
          {/* Progress Tracker */}
          <ProgressTracker userRole="community" />
        </div>

        {/* Second Row of Widgets - Weather Widget */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
          marginBottom: '3rem',
          maxWidth: '600px',
          margin: '0 auto 3rem auto'
        }}>
          {/* Weather Widget */}
          <WeatherWidget location="Your Plantation Area" />
        </div>

        {/* Third Row of Widgets - System Performance & Activity */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Performance Monitor */}
          <PerformanceMonitor className="h-auto" />
          
          {/* Resource Usage Widget */}
          <ResourceUsageWidget className="h-auto" />
        </div>

        {/* Fourth Row - Activity Feed (Full Width) */}
        <div style={{
          marginBottom: '3rem'
        }}>
          <ActivityFeed 
            className="w-full" 
            userRole="community" 
            maxItems={15}
            filterByRole={false}
          />
        </div>

        {/* Fifth Row - Advanced Analytics & Settings */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Data Visualization Hub */}
          <DataVisualizationHub 
            className="h-auto" 
            userRole="community" 
          />
          
          {/* Settings & Preferences */}
          <SettingsPreferences 
            className="h-auto" 
            userRole="community" 
          />
        </div>

        {/* Recent Activity Summary */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e2e8f0',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#1e293b',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📈 Recent Activity & Quick Stats
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌱</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0077B6' }}>12</div>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>New Trees This Month</div>
            </div>
            
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#10b981' }}>2.3 tons</div>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>CO₂ Captured This Month</div>
            </div>
            
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#f59e0b' }}>₹3,200</div>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Earned This Month</div>
            </div>
            
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏆</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#8b5cf6' }}>85%</div>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Goal Completion</div>
            </div>
          </div>
          
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: '#e0f2fe',
            borderRadius: '8px',
            border: '1px solid #0077B6'
          }}>
            <p style={{
              margin: 0,
              fontSize: '0.9rem',
              color: '#1e293b',
              textAlign: 'center'
            }}>
              🎯 <strong>Tip:</strong> Use the navigation menu above to quickly access Register Land, Track Impact, Input Data, or Earn Credits features.
            </p>
          </div>
        </div>

      </main>

      {/* Wallet Connect Modal */}
      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleWalletConnect}
      />
    </div>
  );
};

export default CommunityDashboard;
