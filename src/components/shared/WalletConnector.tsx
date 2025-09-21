import React, { useState, useEffect } from 'react';
import { WalletUtils, WalletState } from '../../utils/wallet';

interface WalletConnectorProps {
  onWalletChange?: (walletState: WalletState | null) => void;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({ onWalletChange }) => {
  const [walletState, setWalletState] = useState<WalletState | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load existing wallet state
    const savedWalletState = WalletUtils.getWalletState();
    if (savedWalletState) {
      setWalletState(savedWalletState);
      onWalletChange?.(savedWalletState);
    }

    // Listen for account changes
    WalletUtils.onAccountChange((accounts) => {
      if (accounts.length === 0) {
        handleDisconnect();
      } else {
        // Refresh wallet state
        handleConnect();
      }
    });

    // Listen for chain changes
    WalletUtils.onChainChange(() => {
      // Refresh wallet state when chain changes
      if (walletState?.isConnected) {
        handleConnect();
      }
    });

    return () => {
      WalletUtils.removeListeners();
    };
  }, []);

  const handleConnect = async () => {
    if (!WalletUtils.isMetaMaskInstalled()) {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const newWalletState = await WalletUtils.connectWallet();
      setWalletState(newWalletState);
      onWalletChange?.(newWalletState);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    WalletUtils.disconnectWallet();
    setWalletState(null);
    onWalletChange?.(null);
  };

  const handleSwitchToSepolia = async () => {
    try {
      await WalletUtils.switchToSepolia();
      // Refresh wallet state after switching
      if (walletState?.isConnected) {
        await handleConnect();
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem',
    },
    walletCard: {
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    walletInfo: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.25rem',
    },
    walletAddress: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#1f2937',
    },
    walletBalance: {
      fontSize: '0.75rem',
      color: '#6b7280',
    },
    connectButton: {
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      border: 'none',
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      color: 'white',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    disconnectButton: {
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      border: '1px solid #e5e7eb',
      background: 'white',
      color: '#6b7280',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    chainButton: {
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      border: '1px solid #f59e0b',
      background: '#fef3c7',
      color: '#92400e',
      fontSize: '0.75rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    errorMessage: {
      background: '#fee2e2',
      border: '1px solid #fca5a5',
      borderRadius: '6px',
      padding: '0.75rem',
      color: '#dc2626',
      fontSize: '0.875rem',
    },
    loadingSpinner: {
      width: '16px',
      height: '16px',
      border: '2px solid transparent',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
  };

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorMessage}>
          ⚠️ {error}
        </div>
        <button style={styles.connectButton} onClick={handleConnect}>
          Try Again
        </button>
      </div>
    );
  }

  if (!walletState?.isConnected) {
    return (
      <div style={styles.container}>
        <button 
          style={styles.connectButton} 
          onClick={handleConnect}
          disabled={isConnecting}
          onMouseEnter={(e) => {
            if (!isConnecting) {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {isConnecting ? (
            <>
              <div style={styles.loadingSpinner}></div>
              Connecting...
            </>
          ) : (
            <>
              🦊 Connect MetaMask
            </>
          )}
        </button>
        
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.walletCard}>
        <div style={styles.walletInfo}>
          <div style={styles.walletAddress}>
            🦊 {WalletUtils.formatAddress(walletState.address!)}
          </div>
          <div style={styles.walletBalance}>
            Balance: {walletState.balance} ETH
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {walletState.chainId !== 11155111 && (
            <button 
              style={styles.chainButton}
              onClick={handleSwitchToSepolia}
              title="Switch to Sepolia testnet"
            >
              Switch to Sepolia
            </button>
          )}
          <button 
            style={styles.disconnectButton}
            onClick={handleDisconnect}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#ef4444';
              e.currentTarget.style.color = '#ef4444';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.color = '#6b7280';
            }}
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletConnector;
