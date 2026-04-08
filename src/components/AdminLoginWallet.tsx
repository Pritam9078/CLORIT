import React, { useState } from 'react';
import { Wallet, Key, AlertCircle, Loader } from 'lucide-react';
import { loginWithWallet, loginWithKey } from '../services/adminAuth';
import { isMetaMaskInstalled } from '../services/walletService';

const AdminLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showKeyLogin, setShowKeyLogin] = useState(false);
    const [adminKey, setAdminKey] = useState('');

    const handleWalletLogin = async () => {
        setError('');
        setIsLoading(true);

        try {
            if (!isMetaMaskInstalled()) {
                setError('MetaMask is not installed. Please install MetaMask extension to continue.');
                setIsLoading(false);
                return;
            }

            const response = await loginWithWallet();

            // Redirect to dashboard
            window.location.href = '/admin';
        } catch (err: any) {
            console.error('Wallet login error:', err);
            setError(err.message || 'Failed to login with wallet');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await loginWithKey(adminKey);

            // Redirect to dashboard
            window.location.href = '/admin';
        } catch (err: any) {
            console.error('Key login error:', err);
            setError(err.message || 'Invalid admin key');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {/* Header */}
                <div style={styles.header}>
                    <h1 style={styles.title}>CLORIT Admin</h1>
                    <p style={styles.subtitle}>Secure Admin Access</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={styles.errorBox}>
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                {!showKeyLogin ? (
                    /* Wallet Login */
                    <div style={styles.loginSection}>
                        <button
                            onClick={handleWalletLogin}
                            disabled={isLoading}
                            style={{
                                ...styles.walletButton,
                                opacity: isLoading ? 0.6 : 1,
                                cursor: isLoading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} />
                                    Connecting...
                                </>
                            ) : (
                                <>
                                    <Wallet size={20} />
                                    Connect Wallet to Login
                                </>
                            )}
                        </button>

                        <div style={styles.divider}>
                            <span>or</span>
                        </div>

                        <button
                            onClick={() => setShowKeyLogin(true)}
                            style={styles.keyLoginButton}
                            disabled={isLoading}
                        >
                            <Key size={18} />
                            Login with Admin Key
                        </button>

                        <div style={styles.infoBox}>
                            <p style={styles.infoText}>
                                🔐 <strong>Wallet Login:</strong> Connect your authorized admin wallet to access the dashboard.
                            </p>
                            <p style={styles.infoText}>
                                🔑 <strong>Emergency Key:</strong> Use admin key for backup access.
                            </p>
                        </div>
                    </div>
                ) : (
                    /* Key Login Form */
                    <form onSubmit={handleKeyLogin} style={styles.form}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Admin Key</label>
                            <input
                                type="password"
                                value={adminKey}
                                onChange={(e) => setAdminKey(e.target.value)}
                                placeholder="Enter admin key (e.g., ADMIN987)"
                                style={styles.input}
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !adminKey}
                            style={{
                                ...styles.submitButton,
                                opacity: isLoading || !adminKey ? 0.6 : 1,
                                cursor: isLoading || !adminKey ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
                                    Logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setShowKeyLogin(false);
                                setAdminKey('');
                                setError('');
                            }}
                            style={styles.backButton}
                            disabled={isLoading}
                        >
                            Back to Wallet Login
                        </button>
                    </form>
                )}

                {/* Footer */}
                <div style={styles.footer}>
                    <p style={styles.footerText}>
                        Powered by blockchain technology
                    </p>
                </div>
            </div>

            <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
    },
    card: {
        background: 'white',
        borderRadius: '16px',
        padding: '3rem',
        maxWidth: '480px',
        width: '100%',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
    },
    header: {
        textAlign: 'center' as const,
        marginBottom: '2rem'
    },
    title: {
        fontSize: '2rem',
        fontWeight: 700,
        background: 'linear-gradient(135deg, #0077B6 0%, #005f8a 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '0.5rem'
    },
    subtitle: {
        color: '#6b7280',
        fontSize: '1rem'
    },
    errorBox: {
        background: '#fee2e2',
        border: '1px solid #fecaca',
        borderRadius: '8px',
        padding: '0.75rem 1rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#dc2626',
        fontSize: '0.875rem'
    },
    loginSection: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1rem'
    },
    walletButton: {
        padding: '1rem 1.5rem',
        background: 'linear-gradient(135deg, #0077B6 0%, #005f8a 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        boxShadow: '0 4px 12px rgba(0, 119, 182, 0.3)'
    },
    divider: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center' as const,
        margin: '0.5rem 0',
        color: '#9ca3af',
        fontSize: '0.875rem'
    },
    keyLoginButton: {
        padding: '0.75rem 1.5rem',
        background: 'white',
        color: '#6b7280',
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        fontSize: '0.9rem',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
    },
    infoBox: {
        background: '#f0f9ff',
        border: '1px solid #bfdbfe',
        borderRadius: '8px',
        padding: '1rem',
        marginTop: '1rem'
    },
    infoText: {
        fontSize: '0.875rem',
        color: '#1e40af',
        margin: '0.5rem 0',
        lineHeight: '1.5'
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1.5rem'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '0.5rem'
    },
    label: {
        fontSize: '0.9rem',
        fontWeight: 600,
        color: '#374151'
    },
    input: {
        padding: '0.75rem 1rem',
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s'
    },
    submitButton: {
        padding: '0.875rem 1.5rem',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
    },
    backButton: {
        padding: '0.75rem 1.5rem',
        background: 'transparent',
        color: '#6b7280',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        fontSize: '0.9rem',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    footer: {
        textAlign: 'center' as const,
        marginTop: '2rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid #e5e7eb'
    },
    footerText: {
        fontSize: '0.875rem',
        color: '#9ca3af'
    }
};

export default AdminLogin;
