import React, { useState, useEffect } from 'react';
import { WalletUtils } from '../utils/walletUtils';

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (address: string, provider: any) => void;
}

const WalletConnectModal: React.FC<WalletConnectModalProps> = ({ isOpen, onClose, onConnect }) => {
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');
  const [availableWallets, setAvailableWallets] = useState<Array<{
    name: string;
    icon: string;
    available: boolean;
    type: 'metamask' | 'coinbase' | 'phantom';
  }>>([]);

  useEffect(() => {
    if (isOpen) {
      checkWalletAvailability();
    }
  }, [isOpen]);

  const checkWalletAvailability = () => {
    const wallets = [
      {
        name: 'MetaMask',
        icon: '🦊',
        available: WalletUtils.isMetaMaskAvailable(),
        type: 'metamask' as const
      },
      {
        name: 'Coinbase Wallet',
        icon: '🔵',
        available: WalletUtils.isCoinbaseWalletAvailable(),
        type: 'coinbase' as const
      },
      {
        name: 'Phantom',
        icon: '👻',
        available: WalletUtils.isPhantomAvailable(),
        type: 'phantom' as const
      }
    ];
    
    setAvailableWallets(wallets);
  };

  const handleConnect = async (walletType: 'metamask' | 'coinbase' | 'phantom') => {
    setConnecting(true);
    setError('');

    try {
      const result = await WalletUtils.connectWallet(walletType);
      
      if (result.success && result.address && result.provider) {
        onConnect(result.address, result.provider);
        onClose();
      } else {
        setError(result.error || 'Failed to connect wallet');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setConnecting(false);
    }
  };

  const installWallet = (walletType: string) => {
    const urls: Record<string, string> = {
      MetaMask: 'https://metamask.io/download/',
      'Coinbase Wallet': 'https://wallet.coinbase.com/',
      Phantom: 'https://phantom.app/'
    };
    
    window.open(urls[walletType], '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '1rem'
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '2rem',
      maxWidth: '480px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
      position: 'relative' as const
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1.5rem'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#1e293b',
      margin: 0
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#64748b',
      padding: '0.5rem',
      borderRadius: '8px',
      transition: 'background-color 0.2s'
    },
    description: {
      fontSize: '0.875rem',
      color: '#64748b',
      marginBottom: '2rem',
      lineHeight: 1.5
    },
    walletList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem'
    },
    walletItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      backgroundColor: '#fafafa'
    },
    walletItemHover: {
      borderColor: '#0ea5e9',
      backgroundColor: '#f0f9ff',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(14, 165, 233, 0.1)'
    },
    walletItemDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
      backgroundColor: '#f8fafc'
    },
    walletInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    walletIcon: {
      fontSize: '2rem',
      width: '48px',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '12px',
      backgroundColor: 'white',
      border: '1px solid #e2e8f0'
    },
    walletName: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#1e293b'
    },
    walletStatus: {
      fontSize: '0.75rem',
      color: '#64748b',
      marginTop: '0.25rem'
    },
    connectButton: {
      padding: '0.5rem 1rem',
      backgroundColor: '#0ea5e9',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    installButton: {
      padding: '0.5rem 1rem',
      backgroundColor: '#64748b',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    error: {
      backgroundColor: '#fee2e2',
      border: '1px solid #fca5a5',
      borderRadius: '8px',
      padding: '1rem',
      marginTop: '1rem',
      fontSize: '0.875rem',
      color: '#dc2626'
    },
    loadingSpinner: {
      display: 'inline-block',
      width: '16px',
      height: '16px',
      border: '2px solid #ffffff',
      borderTop: '2px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
        
        <div style={styles.header}>
          <h2 style={styles.title}>Connect Wallet</h2>
          <button
            style={styles.closeButton}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f1f5f9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            ×
          </button>
        </div>

        <p style={styles.description}>
          Connect your Web3 wallet to access all features of the CLORIT platform. 
          Your wallet will be used to sign transactions and store your carbon credits.
        </p>

        <div style={styles.walletList}>
          {availableWallets.map((wallet) => (
            <div
              key={wallet.name}
              style={{
                ...styles.walletItem,
                ...(wallet.available ? {} : styles.walletItemDisabled)
              }}
              onClick={() => {
                if (wallet.available && !connecting) {
                  handleConnect(wallet.type);
                }
              }}
              onMouseEnter={(e) => {
                if (wallet.available && !connecting) {
                  Object.assign(e.currentTarget.style, styles.walletItemHover);
                }
              }}
              onMouseLeave={(e) => {
                if (wallet.available) {
                  Object.assign(e.currentTarget.style, styles.walletItem);
                }
              }}
            >
              <div style={styles.walletInfo}>
                <div style={styles.walletIcon}>
                  {wallet.icon}
                </div>
                <div>
                  <div style={styles.walletName}>{wallet.name}</div>
                  <div style={styles.walletStatus}>
                    {wallet.available ? 'Available' : 'Not Installed'}
                  </div>
                </div>
              </div>

              {wallet.available ? (
                <button
                  style={{
                    ...styles.connectButton,
                    opacity: connecting ? 0.7 : 1
                  }}
                  disabled={connecting}
                >
                  {connecting ? (
                    <>
                      <div style={styles.loadingSpinner}></div>
                      <span style={{ marginLeft: '0.5rem' }}>Connecting...</span>
                    </>
                  ) : (
                    'Connect'
                  )}
                </button>
              ) : (
                <button
                  style={styles.installButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    installWallet(wallet.name);
                  }}
                >
                  Install
                </button>
              )}
            </div>
          ))}
        </div>

        {error && (
          <div style={styles.error}>
            <strong>Connection Error:</strong> {error}
          </div>
        )}

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f0f9ff',
          borderRadius: '8px',
          fontSize: '0.75rem',
          color: '#0c4a6e'
        }}>
          <strong>Security Note:</strong> Always ensure you're on the correct website before connecting your wallet. 
          CLORIT will never ask for your private keys or seed phrase.
        </div>
      </div>
    </div>
  );
};

export default WalletConnectModal;
