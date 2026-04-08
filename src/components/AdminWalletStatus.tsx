import React, { useState, useEffect } from 'react';
import { Wallet, LogOut, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../state/authStore';

interface AdminWalletStatusProps {
    className?: string;
}

export const AdminWalletStatus: React.FC<AdminWalletStatusProps> = ({ className = '' }) => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        checkWalletConnection();

        // Listen for account changes
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
        };
    }, []);

    const checkWalletConnection = async () => {
        try {
            // Check localStorage for stored wallet
            const storedAddress = localStorage.getItem('walletAddress');
            const authToken = localStorage.getItem('authToken');

            if (storedAddress && authToken) {
                setWalletAddress(storedAddress);
                setIsConnected(true);
                return;
            }

            // Check MetaMask connection
            if (window.ethereum?.isMetaMask) {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts && accounts.length > 0) {
                    setWalletAddress(accounts[0]);
                    setIsConnected(true);
                }
            }
        } catch (error) {
            console.error('Error checking wallet:', error);
        }
    };

    const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
            setWalletAddress(null);
            setIsConnected(false);
        } else {
            setWalletAddress(accounts[0]);
            setIsConnected(true);
        }
    };

    const connectWallet = async () => {
        try {
            if (!window.ethereum?.isMetaMask) {
                alert('Please install MetaMask to connect your wallet');
                return;
            }

            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            if (accounts && accounts.length > 0) {
                setWalletAddress(accounts[0]);
                setIsConnected(true);
                localStorage.setItem('walletAddress', accounts[0]);
            }
        } catch (error: any) {
            console.error('Error connecting wallet:', error);
            if (error.code === 4001) {
                alert('Connection rejected. Please approve the connection request.');
            }
        }
    };

    const logout = useAuthStore(state => state.logout);

    const disconnectWallet = () => {
        logout();
        setWalletAddress(null);
        setIsConnected(false);
        localStorage.removeItem('walletAddress');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userProfile');

        // Redirect to login
        window.location.href = '/login';
    };

    const shortenAddress = (address: string): string => {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    if (!isConnected || !walletAddress) {
        return (
            <button
                onClick={connectWallet}
                className={className}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: 'linear-gradient(135deg, #0077B6 0%, #005f8a 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 8px rgba(0, 119, 182, 0.3)'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 119, 182, 0.4)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 119, 182, 0.3)';
                }}
            >
                <Wallet size={18} />
                <span>Connect Wallet</span>
            </button>
        );
    }

    return (
        <div
            className={className}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 1rem',
                background: '#f0f9ff',
                border: '1px solid #bfdbfe',
                borderRadius: '8px'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#10b981',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite'
                }} />
                <Wallet size={18} color="#0077B6" />
                <span style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#1e40af',
                    fontFamily: 'monospace'
                }}>
                    {shortenAddress(walletAddress)}
                </span>
            </div>

            <button
                onClick={disconnectWallet}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.25rem 0.5rem',
                    background: 'transparent',
                    color: '#dc2626',
                    border: '1px solid #fecaca',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.background = '#fee2e2';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.background = 'transparent';
                }}
                title="Disconnect wallet and logout"
            >
                <LogOut size={14} />
                <span>Disconnect</span>
            </button>

            <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
        </div>
    );
};

export default AdminWalletStatus;
