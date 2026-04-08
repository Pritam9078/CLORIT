import React from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { WalletUtils } from '../../utils/walletUtils';

interface WalletConnectorProps {
  onWalletChange?: (walletState: any | null) => void;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({ onWalletChange }) => {
  const wallet = useWallet();

  React.useEffect(() => {
    onWalletChange?.(wallet.isConnected ? wallet : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.isConnected, wallet.address, wallet.chainId]);

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

  // Error display
  if (wallet.error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorMessage}>⚠️ {wallet.error}</div>
        <button style={styles.connectButton} onClick={() => wallet.connect()}>Try Again</button>
      </div>
    );
  }

  // Not connected UI: show multiple wallet options if available
  if (!wallet.isConnected) {
    return (
      <div style={styles.container}>
        {wallet.availableWallets.length === 0 ? (
          <div style={styles.errorMessage}>No Web3 wallets detected. Please install MetaMask, Coinbase Wallet, or Phantom.</div>
        ) : (
          <>
            {wallet.availableWallets.includes('MetaMask') && (
              <button style={styles.connectButton} onClick={() => wallet.connect('metamask')} disabled={wallet.isConnecting}>🦊 MetaMask</button>
            )}
            {wallet.availableWallets.includes('Coinbase Wallet') && (
              <button style={styles.connectButton} onClick={() => wallet.connect('coinbase')} disabled={wallet.isConnecting}>🔵 Coinbase Wallet</button>
            )}
            {wallet.availableWallets.includes('Phantom') && (
              <button style={styles.connectButton} onClick={() => wallet.connect('phantom')} disabled={wallet.isConnecting}>🟣 Phantom</button>
            )}
          </>
        )}
      </div>
    );
  }

  // Connected UI
  return (
    <div style={styles.container}>
      <div style={styles.walletCard}>
        <div style={styles.walletInfo}>
          <div style={styles.walletAddress}>🦊 {WalletUtils.formatAddress(wallet.address)}</div>
          <div style={styles.walletBalance}>Chain ID: {wallet.chainId}</div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {wallet.chainId !== '0x1' && (
            <button style={styles.chainButton} onClick={() => wallet.switchToSepolia()} title="Switch to Sepolia testnet">Switch to Sepolia</button>
          )}
          <button style={styles.disconnectButton} onClick={() => wallet.disconnect()}>Disconnect</button>
        </div>
      </div>
    </div>
  );
};

export default WalletConnector;
