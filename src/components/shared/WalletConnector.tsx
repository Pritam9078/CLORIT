import React, { useState, useEffect } from 'react';
import { WalletUtils, WalletState } from '../../utils/walletUtils';
import { WalletConflictHandler } from '../../utils/walletConflictHandler';

interface WalletConnectorProps {
  onWalletChange?: (walletState: WalletState | null) => void;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({ onWalletChange }) => {
  const [walletState, setWalletState] = useState<WalletState | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  // Error boundary-like error handling
  const handleError = (error: any, context: string) => {
    console.error(`WalletConnector error in ${context}:`, error);
    setError(`Error in ${context}: ${error.message || 'Unknown error'}`);
    setHasError(true);
  };

  useEffect(() => {
    try {
      // Initialize wallet-compatible environment
      WalletConflictHandler.initializeWalletCompatibleEnvironment();
      
      // Check for existing wallet connection
      checkExistingConnection();
      
      // Listen for account changes if available
      const provider = WalletUtils.getEthereumProvider();
      if (provider && typeof provider.on === 'function') {
        const handleAccountsChanged = (accounts: string[]) => {
          try {
            if (accounts.length === 0) {
              handleDisconnect();
            } else {
              // Update wallet state with new account
              setWalletState(prev => prev ? { ...prev, address: accounts[0] } : null);
            }
          } catch (error) {
            handleError(error, 'account change handler');
          }
        };

        const handleChainChanged = () => {
          try {
            // Refresh wallet state when chain changes
            if (walletState?.isConnected) {
              checkExistingConnection();
            }
          } catch (error) {
            handleError(error, 'chain change handler');
          }
        };

        try {
          provider.on('accountsChanged', handleAccountsChanged);
          provider.on('chainChanged', handleChainChanged);

          return () => {
            try {
              if (provider.removeListener && typeof provider.removeListener === 'function') {
                provider.removeListener('accountsChanged', handleAccountsChanged);
                provider.removeListener('chainChanged', handleChainChanged);
              }
            } catch (error) {
              console.warn('Error removing wallet event listeners:', error);
            }
          };
        } catch (error) {
          handleError(error, 'event listener setup');
        }
      }
    } catch (error) {
      handleError(error, 'useEffect initialization');
    }
  }, []);

  const checkExistingConnection = async () => {
    try {
      const provider = WalletUtils.getEthereumProvider();
      if (provider && typeof provider.request === 'function') {
        const accounts = await provider.request({ method: 'eth_accounts' });
        if (accounts && accounts.length > 0) {
          const chainId = await provider.request({ method: 'eth_chainId' });
          const existingWalletState: WalletState = {
            isConnected: true,
            address: accounts[0],
            chainId: chainId || '0x1',
          };
          
          setWalletState(existingWalletState);
          onWalletChange?.(existingWalletState);
        }
      }
    } catch (error) {
      console.warn('Error checking existing connection:', error);
    }
  };

  const handleConnect = async () => {
    try {
      if (!WalletUtils.isMetaMaskAvailable()) {
        setError('MetaMask is not installed. Please install MetaMask to continue.');
        return;
      }

      setIsConnecting(true);
      setError(null);
      setHasError(false);

      const result = await WalletUtils.connectWallet();
      
      if (result.success && result.address) {
        const newWalletState: WalletState = {
          isConnected: true,
          address: result.address,
          chainId: result.chainId || '0x1',
        };
        
        setWalletState(newWalletState);
        onWalletChange?.(newWalletState);
      } else {
        throw new Error(result.error || 'Failed to connect wallet');
      }
    } catch (error: any) {
      handleError(error, 'wallet connection');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    try {
      WalletUtils.disconnectWallet();
      setWalletState(null);
      onWalletChange?.(null);
      setError(null);
      setHasError(false);
    } catch (error: any) {
      handleError(error, 'wallet disconnection');
    }
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

  // Error boundary protection
  if (hasError) {
    return (
      <div style={styles.container}>
        <div style={styles.errorMessage}>
          ⚠️ Wallet component error: {error || 'Unknown error occurred'}
        </div>
        <button 
          style={styles.connectButton} 
          onClick={() => {
            setHasError(false);
            setError(null);
            window.location.reload();
          }}
        >
          Reload Page
        </button>
      </div>
    );
  }

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
            Chain ID: {walletState.chainId}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {walletState.chainId !== '0x1' && (
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
