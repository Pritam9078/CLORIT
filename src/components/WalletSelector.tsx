import React, { useState } from 'react';
import { Wallet, X, AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface WalletOption {
    id: 'metamask' | 'coinbase' | 'walletconnect';
    name: string;
    icon: string;
    description: string;
    installed: boolean;
}

interface WalletSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    onWalletSelected: (walletType: string, address: string) => void;
}

export const WalletSelector: React.FC<WalletSelectorProps> = ({
    isOpen,
    onClose,
    onWalletSelected
}) => {
    const [connecting, setConnecting] = useState<string | null>(null);
    const [error, setError] = useState<string>('');

    const walletOptions: WalletOption[] = [
        {
            id: 'metamask',
            name: 'MetaMask',
            icon: '🦊',
            description: 'Connect with MetaMask wallet',
            installed: typeof window !== 'undefined' && window.ethereum?.isMetaMask
        },
        {
            id: 'coinbase',
            name: 'Coinbase Wallet',
            icon: '🔵',
            description: 'Connect with Coinbase Wallet',
            installed: typeof window !== 'undefined' && window.ethereum?.isCoinbaseWallet
        },
        {
            id: 'walletconnect',
            name: 'WalletConnect',
            icon: '🔗',
            description: 'Connect with WalletConnect',
            installed: true // Always available
        }
    ];

    const connectWallet = async (walletType: 'metamask' | 'coinbase' | 'walletconnect') => {
        setConnecting(walletType);
        setError('');

        try {
            let address: string;

            switch (walletType) {
                case 'metamask':
                    if (!window.ethereum?.isMetaMask) {
                        throw new Error('MetaMask is not installed. Please install MetaMask extension.');
                    }
                    const accounts = await window.ethereum.request({
                        method: 'eth_requestAccounts'
                    });
                    address = accounts[0];
                    break;

                case 'coinbase':
                    if (!window.ethereum?.isCoinbaseWallet) {
                        throw new Error('Coinbase Wallet is not installed. Please install Coinbase Wallet extension.');
                    }
                    const cbAccounts = await window.ethereum.request({
                        method: 'eth_requestAccounts'
                    });
                    address = cbAccounts[0];
                    break;

                case 'walletconnect':
                    // WalletConnect implementation
                    throw new Error('WalletConnect integration coming soon. Please use MetaMask or Coinbase Wallet.');

                default:
                    throw new Error('Unsupported wallet type');
            }

            // Store wallet preference
            localStorage.setItem('preferredWallet', walletType);

            onWalletSelected(walletType, address);
            onClose();
        } catch (err: any) {
            console.error('Wallet connection error:', err);
            if (err.code === 4001) {
                setError('Connection rejected. Please approve the connection request.');
            } else {
                setError(err.message || 'Failed to connect wallet');
            }
        } finally {
            setConnecting(null);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Wallet size={24} color="#0077B6" />
                        <h2 style={styles.title}>Connect Wallet</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <X size={20} />
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={styles.errorBox}>
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                {/* Wallet Options */}
                <div style={styles.walletList}>
                    {walletOptions.map((wallet) => (
                        <button
                            key={wallet.id}
                            onClick={() => connectWallet(wallet.id)}
                            disabled={!wallet.installed || connecting !== null}
                            style={{
                                ...styles.walletButton,
                                opacity: !wallet.installed || connecting !== null ? 0.5 : 1,
                                cursor: !wallet.installed || connecting !== null ? 'not-allowed' : 'pointer'
                            }}
                        >
                            <div style={styles.walletInfo}>
                                <div style={styles.walletIcon}>{wallet.icon}</div>
                                <div>
                                    <div style={styles.walletName}>
                                        {wallet.name}
                                        {!wallet.installed && (
                                            <span style={styles.notInstalledBadge}>Not Installed</span>
                                        )}
                                    </div>
                                    <div style={styles.walletDescription}>{wallet.description}</div>
                                </div>
                            </div>

                            {connecting === wallet.id ? (
                                <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} />
                            ) : wallet.installed ? (
                                <CheckCircle size={20} color="#10b981" />
                            ) : (
                                <AlertCircle size={20} color="#f59e0b" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Footer */}
                <div style={styles.footer}>
                    <p style={styles.footerText}>
                        🔒 Your wallet credentials are never stored. We only request signatures for authentication.
                    </p>
                </div>

                <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(4px)'
    },
    modal: {
        background: 'white',
        borderRadius: '16px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        animation: 'slideUp 0.3s ease-out'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem',
        borderBottom: '1px solid #e5e7eb'
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: 700,
        color: '#1f2937',
        margin: 0
    },
    closeButton: {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem',
        borderRadius: '8px',
        transition: 'background 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorBox: {
        margin: '1rem 1.5rem 0',
        background: '#fee2e2',
        border: '1px solid #fecaca',
        borderRadius: '8px',
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#dc2626',
        fontSize: '0.875rem'
    },
    walletList: {
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1rem'
    },
    walletButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.25rem',
        background: 'white',
        border: '2px solid #e5e7eb',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontSize: '1rem'
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
        background: '#f3f4f6',
        borderRadius: '12px'
    },
    walletName: {
        fontSize: '1rem',
        fontWeight: 600,
        color: '#1f2937',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    walletDescription: {
        fontSize: '0.875rem',
        color: '#6b7280',
        marginTop: '0.25rem'
    },
    notInstalledBadge: {
        fontSize: '0.75rem',
        padding: '0.125rem 0.5rem',
        background: '#fef3c7',
        color: '#92400e',
        borderRadius: '4px',
        fontWeight: 500
    },
    footer: {
        padding: '1rem 1.5rem 1.5rem',
        borderTop: '1px solid #e5e7eb'
    },
    footerText: {
        fontSize: '0.875rem',
        color: '#6b7280',
        margin: 0,
        textAlign: 'center' as const,
        lineHeight: '1.5'
    }
};

export default WalletSelector;
