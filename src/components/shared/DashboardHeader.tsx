import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthUtils, UserProfile } from '../../utils/auth';
import { WalletUtils, WalletState } from '../../utils/wallet';
import LogoutModal from './LogoutModal';
import ProfileManager from './ProfileManager';

interface DashboardHeaderProps {
  title: string;
  userRole: 'community' | 'ngo' | 'panchayat' | 'corporate' | 'nccr';
  subtitle?: string;
  hideTitle?: boolean; // New prop to hide the title section
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, userRole, subtitle, hideTitle = false }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [walletState, setWalletState] = useState<WalletState | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const user = AuthUtils.getCurrentUser();
    setCurrentUser(user);
    
    const wallet = WalletUtils.getWalletState();
    setWalletState(wallet);
  }, []);

  const handleLogout = () => {
    AuthUtils.logout();
    WalletUtils.disconnectWallet();
    navigate('/');
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'community': return '🏘️';
      case 'ngo': return '🌱';
      case 'panchayat': return '🏛️';
      case 'corporate': return '🏭';
      case 'nccr': return '🛰️';
      default: return '👤';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'community': return 'Community Member';
      case 'ngo': return 'NGO Verifier';
      case 'panchayat': return 'Panchayat Official';
      case 'corporate': return 'Corporate Buyer';
      case 'nccr': return 'NCCR Admin';
      default: return 'User';
    }
  };

  const styles = {
    header: {
      background: 'white',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      position: 'sticky' as const,
      top: 0,
      zIndex: 100,
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
    },
    leftSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      flex: 1,
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#0077B6',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      padding: '0.5rem 0.75rem',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.05) 0%, rgba(76, 175, 80, 0.05) 100%)',
      border: '1px solid rgba(0, 119, 182, 0.1)',
    },
    logoImage: {
      width: '40px',
      height: '40px',
      borderRadius: '8px',
      filter: 'drop-shadow(0 2px 8px rgba(0, 119, 182, 0.2))',
    },
    titleSection: {
      borderLeft: '2px solid #e5e7eb',
      paddingLeft: '1rem',
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#1f2937',
      margin: 0,
    },
    subtitle: {
      fontSize: '0.875rem',
      color: '#6b7280',
      margin: 0,
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    walletInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      background: '#f3f4f6',
      borderRadius: '8px',
      fontSize: '0.875rem',
      color: '#374151',
    },
    userSection: {
      position: 'relative' as const,
    },
    userButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.5rem 1rem',
      background: 'transparent',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    userAvatar: {
      width: '32px',
      height: '32px',
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.875rem',
      color: 'white',
      fontWeight: 600,
    },
    userInfo: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'flex-start',
    },
    userName: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#1f2937',
    },
    userRole: {
      fontSize: '0.75rem',
      color: '#6b7280',
    },
    dropdownArrow: {
      fontSize: '0.75rem',
      color: '#6b7280',
      transition: 'transform 0.2s ease',
    },
    userMenu: {
      position: 'absolute' as const,
      top: '100%',
      right: 0,
      marginTop: '0.5rem',
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
      minWidth: '200px',
      zIndex: 1000,
    },
    menuItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      borderBottom: '1px solid #f3f4f6',
    },
    menuItemLast: {
      borderBottom: 'none',
    },
    menuIcon: {
      fontSize: '1rem',
    },
    menuText: {
      fontSize: '0.875rem',
      color: '#374151',
    },
    overlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
    },
    profileModal: {
      position: 'fixed' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'white',
      borderRadius: '12px',
      maxWidth: '600px',
      width: '90%',
      maxHeight: '80vh',
      overflow: 'auto',
      zIndex: 1000,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    },
    profileHeader: {
      padding: '1.5rem',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#6b7280',
      padding: '0.25rem',
      borderRadius: '4px',
      transition: 'color 0.2s ease',
    },
  };

  return (
    <>
      <header style={styles.header}>
        <div style={styles.container}>
          <div style={styles.leftSection}>
            <a 
              href="/" 
              style={styles.logo}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.color = '#00B4D8';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 180, 216, 0.1) 0%, rgba(76, 175, 80, 0.1) 100%)';
                e.currentTarget.style.borderColor = 'rgba(0, 180, 216, 0.2)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 119, 182, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.color = '#0077B6';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 119, 182, 0.05) 0%, rgba(76, 175, 80, 0.05) 100%)';
                e.currentTarget.style.borderColor = 'rgba(0, 119, 182, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <img 
                src="/clorit-logo.png" 
                alt="CLORIT Logo" 
                style={styles.logoImage}
              />
              <span style={{ 
                background: 'linear-gradient(135deg, #0077B6 0%, #4CAF50 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.5px'
              }}>
                CLORIT
              </span>
            </a>
            
            {!hideTitle && (
              <div style={styles.titleSection}>
                <h1 style={styles.title}>{title}</h1>
                {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
              </div>
            )}
          </div>

          <div style={styles.rightSection}>
            {walletState?.isConnected && (
              <div style={styles.walletInfo}>
                🦊 {WalletUtils.formatAddress(walletState.address!)} 
                <span style={{ color: '#10b981', fontWeight: 500 }}>
                  {walletState.balance} ETH
                </span>
              </div>
            )}

            <div style={styles.userSection}>
              <button
                style={styles.userButton}
                onClick={() => setShowUserMenu(!showUserMenu)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.background = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={styles.userAvatar}>
                  {currentUser?.name?.charAt(0).toUpperCase() || '?'}
                </div>
                <div style={styles.userInfo}>
                  <div style={styles.userName}>
                    {currentUser?.name || 'User'}
                  </div>
                  <div style={styles.userRole}>
                    {getRoleIcon(userRole)} {getRoleLabel(userRole)}
                  </div>
                </div>
                <span 
                  style={{
                    ...styles.dropdownArrow,
                    transform: showUserMenu ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                >
                  ▼
                </span>
              </button>

              {showUserMenu && (
                <div style={styles.userMenu}>
                  <div
                    style={styles.menuItem}
                    onClick={() => {
                      setShowProfile(true);
                      setShowUserMenu(false);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span style={styles.menuIcon}>👤</span>
                    <span style={styles.menuText}>Profile Settings</span>
                  </div>
                  
                  <div
                    style={{ ...styles.menuItem, ...styles.menuItemLast }}
                    onClick={() => {
                      setShowLogoutModal(true);
                      setShowUserMenu(false);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#fef2f2';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span style={styles.menuIcon}>🚪</span>
                    <span style={{ ...styles.menuText, color: '#ef4444' }}>Logout</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      {showProfile && (
        <>
          <div style={styles.overlay} onClick={() => setShowProfile(false)} />
          <div style={styles.profileModal}>
            <div style={styles.profileHeader}>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>
                Profile Settings
              </h2>
              <button
                style={styles.closeButton}
                onClick={() => setShowProfile(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#1f2937';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#6b7280';
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <ProfileManager 
                userRole={userRole}
                onProfileUpdate={(profile) => setCurrentUser(profile)}
              />
            </div>
          </div>
        </>
      )}

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        userName={currentUser?.name}
      />

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99,
          }}
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </>
  );
};

export default DashboardHeader;
