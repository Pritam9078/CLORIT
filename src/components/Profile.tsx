import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthUtils, UserProfile } from '../utils/auth';
import { WalletUtils } from '../utils/walletUtils';

const Profile = () => {
  const navigate = useNavigate();
  const currentUser = AuthUtils.getCurrentUser() || {
    name: 'Rajesh Kumar',
    email: 'community@example.com',
    role: 'community'
  };

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: '+91 98765 43210',
    location: 'Rural Maharashtra, India',
    joinDate: '2024-01-15',
    bio: 'Environmental enthusiast committed to sustainable farming and carbon credit generation.',
    walletConnected: false,
    walletAddress: ''
  });

  const [walletStatus, setWalletStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [walletError, setWalletError] = useState<string>('');
  const [availableWallets, setAvailableWallets] = useState<string[]>([]);

  // Check wallet availability on component mount
  useEffect(() => {
    const checkWalletAvailability = () => {
      const wallets = [];
      
      if (WalletUtils.isMetaMaskAvailable()) {
        wallets.push('MetaMask');
      }
      if (WalletUtils.isCoinbaseWalletAvailable()) {
        wallets.push('Coinbase Wallet');
      }
      if (WalletUtils.isPhantomAvailable()) {
        wallets.push('Phantom');
      }
      
      setAvailableWallets(wallets);
      
      // Check if wallet is already connected
      const savedAddress = localStorage.getItem('CLORIT_WALLET_ADDRESS');
      if (savedAddress && WalletUtils.isWalletAvailable()) {
        setProfile(prev => ({
          ...prev,
          walletConnected: true,
          walletAddress: savedAddress
        }));
        setWalletStatus('connected');
      }
    };

    checkWalletAvailability();
  }, []);

  const connectWallet = async (walletType?: 'metamask' | 'coinbase' | 'phantom') => {
    setWalletStatus('connecting');
    setWalletError('');
    
    try {
      const result = await WalletUtils.connectWallet(walletType);
      
      if (result.success && result.address) {
        setProfile(prev => ({
          ...prev,
          walletConnected: true,
          walletAddress: result.address!
        }));
        setWalletStatus('connected');
        
        // Update user profile with wallet info
        const updatedProfile: UserProfile = {
          id: (currentUser as any).id || 'community-001',
          name: profile.name,
          email: profile.email,
          role: currentUser.role,
          walletAddress: result.address
        };
        AuthUtils.saveUserProfile(updatedProfile);
        
      } else {
        setWalletStatus('error');
        setWalletError(result.error || 'Failed to connect wallet');
      }
    } catch (error: any) {
      console.error('Wallet connection error:', error);
      setWalletStatus('error');
      setWalletError(error.message || 'An unexpected error occurred');
    }
  };

  const disconnectWallet = () => {
    WalletUtils.disconnectWallet();
    localStorage.removeItem('CLORIT_WALLET_CONNECTED');
    localStorage.removeItem('CLORIT_WALLET_ADDRESS');
    localStorage.removeItem('CLORIT_WALLET_CHAIN_ID');
    
    setProfile(prev => ({
      ...prev,
      walletConnected: false,
      walletAddress: ''
    }));
    setWalletStatus('disconnected');
    setWalletError('');
  };

  const handleSave = () => {
    // Save profile changes
    const updatedProfile: UserProfile = {
      id: (currentUser as any).id || 'community-001',
      name: profile.name,
      email: profile.email,
      role: currentUser.role
    };
    AuthUtils.saveUserProfile(updatedProfile);
    setIsEditing(false);
  };

  const styles = {
    container: {
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      padding: '2rem'
    },
    header: {
      maxWidth: '1200px',
      margin: '0 auto 2rem auto',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    backButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#64748b',
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1e293b',
      margin: 0
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2rem'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e2e8f0'
    },
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: 700,
      color: '#1e293b',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#374151',
      marginBottom: '0.5rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '0.875rem',
      transition: 'border-color 0.2s ease',
      boxSizing: 'border-box' as const
    },
    textarea: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '0.875rem',
      resize: 'vertical' as const,
      minHeight: '100px',
      boxSizing: 'border-box' as const
    },
    button: {
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      fontSize: '0.875rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    primaryButton: {
      backgroundColor: '#0ea5e9',
      color: 'white',
      boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)'
    },
    secondaryButton: {
      backgroundColor: '#f8fafc',
      color: '#64748b',
      border: '1px solid #e2e8f0'
    },
    walletSection: {
      padding: '1.5rem',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e2e8f0'
    },
    walletStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1rem',
      fontSize: '0.875rem',
      fontWeight: 600
    },
    connectedStatus: {
      color: '#10b981'
    },
    disconnectedStatus: {
      color: '#ef4444'
    },
    walletAddress: {
      fontSize: '0.75rem',
      color: '#64748b',
      backgroundColor: '#f1f5f9',
      padding: '0.5rem',
      borderRadius: '6px',
      wordBreak: 'break-all' as const,
      marginBottom: '1rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f1f5f9';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          ← Back to Dashboard
        </button>
        <h1 style={styles.title}>User Profile</h1>
      </div>

      <div style={styles.main}>
        {/* Profile Information */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            👤 Profile Information
          </h2>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              disabled={!isEditing}
              style={{
                ...styles.input,
                backgroundColor: isEditing ? 'white' : '#f8fafc'
              }}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
              disabled={!isEditing}
              style={{
                ...styles.input,
                backgroundColor: isEditing ? 'white' : '#f8fafc'
              }}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Phone Number</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
              disabled={!isEditing}
              style={{
                ...styles.input,
                backgroundColor: isEditing ? 'white' : '#f8fafc'
              }}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Location</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
              disabled={!isEditing}
              style={{
                ...styles.input,
                backgroundColor: isEditing ? 'white' : '#f8fafc'
              }}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              disabled={!isEditing}
              style={{
                ...styles.textarea,
                backgroundColor: isEditing ? 'white' : '#f8fafc'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            {!isEditing ? (
              <button
                style={{ ...styles.button, ...styles.primaryButton }}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  style={{ ...styles.button, ...styles.primaryButton }}
                  onClick={handleSave}
                >
                  Save Changes
                </button>
                <button
                  style={{ ...styles.button, ...styles.secondaryButton }}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Wallet Connection */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            🔗 Wallet Connection
          </h2>

          <div style={styles.walletSection}>
            <div style={{
              ...styles.walletStatus,
              ...(profile.walletConnected ? styles.connectedStatus : styles.disconnectedStatus)
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: profile.walletConnected ? '#10b981' : '#ef4444'
              }} />
              {profile.walletConnected ? 'Wallet Connected' : 'Wallet Not Connected'}
            </div>

            {/* Available Wallets */}
            {availableWallets.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Available Wallets:
                </div>
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap'
                }}>
                  {availableWallets.map(wallet => (
                    <span
                      key={wallet}
                      style={{
                        fontSize: '0.75rem',
                        backgroundColor: '#e0f2fe',
                        color: '#0891b2',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        border: '1px solid #0891b2'
                      }}
                    >
                      {wallet}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.walletConnected && (
              <div style={styles.walletAddress}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Wallet Address:
                </div>
                {profile.walletAddress}
              </div>
            )}

            {/* Wallet Error Display */}
            {walletStatus === 'error' && walletError && (
              <div style={{
                backgroundColor: '#fee2e2',
                border: '1px solid #fca5a5',
                borderRadius: '6px',
                padding: '0.75rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#dc2626',
                  fontWeight: 600
                }}>
                  Connection Error:
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#7f1d1d',
                  marginTop: '0.25rem'
                }}>
                  {walletError}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {!profile.walletConnected ? (
                <>
                  {availableWallets.length === 0 ? (
                    <div style={{
                      width: '100%',
                      padding: '1rem',
                      backgroundColor: '#fef3c7',
                      border: '1px solid #fbbf24',
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#92400e',
                        marginBottom: '0.5rem'
                      }}>
                        No Web3 Wallet Detected
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#78350f'
                      }}>
                        Please install MetaMask, Coinbase Wallet, or another Web3 wallet to continue.
                      </div>
                      <div style={{ marginTop: '0.5rem' }}>
                        <a
                          href="https://metamask.io/download/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: '0.75rem',
                            color: '#0ea5e9',
                            textDecoration: 'underline'
                          }}
                        >
                          Download MetaMask
                        </a>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button
                        style={{
                          ...styles.button,
                          ...styles.primaryButton,
                          opacity: walletStatus === 'connecting' ? 0.6 : 1
                        }}
                        onClick={() => connectWallet()}
                        disabled={walletStatus === 'connecting'}
                      >
                        {walletStatus === 'connecting' ? 'Connecting...' : 'Connect Wallet'}
                      </button>
                      
                      {availableWallets.length > 1 && (
                        <div style={{ width: '100%', marginTop: '0.5rem' }}>
                          <div style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: '#374151',
                            marginBottom: '0.5rem'
                          }}>
                            Or choose specific wallet:
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {availableWallets.includes('MetaMask') && (
                              <button
                                style={{
                                  ...styles.button,
                                  ...styles.secondaryButton,
                                  fontSize: '0.75rem'
                                }}
                                onClick={() => connectWallet('metamask')}
                                disabled={walletStatus === 'connecting'}
                              >
                                MetaMask
                              </button>
                            )}
                            {availableWallets.includes('Coinbase Wallet') && (
                              <button
                                style={{
                                  ...styles.button,
                                  ...styles.secondaryButton,
                                  fontSize: '0.75rem'
                                }}
                                onClick={() => connectWallet('coinbase')}
                                disabled={walletStatus === 'connecting'}
                              >
                                Coinbase
                              </button>
                            )}
                            {availableWallets.includes('Phantom') && (
                              <button
                                style={{
                                  ...styles.button,
                                  ...styles.secondaryButton,
                                  fontSize: '0.75rem'
                                }}
                                onClick={() => connectWallet('phantom')}
                                disabled={walletStatus === 'connecting'}
                              >
                                Phantom
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                <button
                  style={{ ...styles.button, ...styles.secondaryButton }}
                  onClick={disconnectWallet}
                >
                  Disconnect Wallet
                </button>
              )}
            </div>
          </div>

          {/* Account Stats */}
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: '#374151',
              marginBottom: '1rem'
            }}>
              Account Statistics
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f0f9ff',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0ea5e9' }}>156</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Trees Planted</div>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: '#f0fdf4',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>2.4</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>CO₂ Tons Captured</div>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: '#fefce8',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b' }}>₹24,500</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Total Earnings</div>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: '#faf5ff',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#8b5cf6' }}>8</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Active Projects</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
