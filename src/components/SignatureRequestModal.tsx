import React, { useState } from 'react';
import { X, FileText, Clock, AlertTriangle } from 'lucide-react';

interface SignatureRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSign: () => Promise<void>;
    action: {
        type: string;
        title: string;
        description: string;
        details: Record<string, any>;
    };
    walletAddress: string;
}

export const SignatureRequestModal: React.FC<SignatureRequestModalProps> = ({
    isOpen,
    onClose,
    onSign,
    action,
    walletAddress
}) => {
    const [signing, setSigning] = useState(false);
    const [error, setError] = useState('');

    const handleSign = async () => {
        setSigning(true);
        setError('');

        try {
            await onSign();
            onClose();
        } catch (err: any) {
            console.error('Signature error:', err);
            if (err.code === 4001) {
                setError('Signature rejected. Please approve the signature request in your wallet.');
            } else {
                setError(err.message || 'Failed to sign message');
            }
        } finally {
            setSigning(false);
        }
    };

    if (!isOpen) return null;

    const shortenAddress = (address: string) => {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={styles.iconCircle}>
                            <FileText size={20} color="#0077B6" />
                        </div>
                        <h2 style={styles.title}>Signature Required</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton} disabled={signing}>
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div style={styles.content}>
                    {/* Action Info */}
                    <div style={styles.actionBox}>
                        <h3 style={styles.actionTitle}>{action.title}</h3>
                        <p style={styles.actionDescription}>{action.description}</p>
                    </div>

                    {/* Details */}
                    <div style={styles.detailsBox}>
                        <h4 style={styles.detailsTitle}>Action Details</h4>
                        {Object.entries(action.details).map(([key, value]) => (
                            <div key={key} style={styles.detailRow}>
                                <span style={styles.detailKey}>{key}:</span>
                                <span style={styles.detailValue}>{String(value)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Wallet Info */}
                    <div style={styles.walletBox}>
                        <div style={styles.walletRow}>
                            <span style={styles.walletLabel}>Signing with:</span>
                            <span style={styles.walletAddress}>{shortenAddress(walletAddress)}</span>
                        </div>
                        <div style={styles.walletRow}>
                            <Clock size={14} color="#6b7280" />
                            <span style={styles.timestamp}>
                                {new Date().toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Warning */}
                    <div style={styles.warningBox}>
                        <AlertTriangle size={16} color="#f59e0b" />
                        <p style={styles.warningText}>
                            Only sign if you understand and approve this action. Your signature authorizes this operation.
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div style={styles.errorBox}>
                            <AlertTriangle size={16} />
                            <span>{error}</span>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={styles.footer}>
                    <button
                        onClick={onClose}
                        disabled={signing}
                        style={{
                            ...styles.button,
                            ...styles.cancelButton,
                            opacity: signing ? 0.5 : 1
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSign}
                        disabled={signing}
                        style={{
                            ...styles.button,
                            ...styles.signButton,
                            opacity: signing ? 0.7 : 1
                        }}
                    >
                        {signing ? 'Signing...' : 'Sign & Approve'}
                    </button>
                </div>
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
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        backdropFilter: 'blur(4px)'
    },
    modal: {
        background: 'white',
        borderRadius: '16px',
        width: '90%',
        maxWidth: '550px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column' as const
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem',
        borderBottom: '1px solid #e5e7eb'
    },
    iconCircle: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: '#eff6ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: '1.25rem',
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
        transition: 'background 0.2s'
    },
    content: {
        padding: '1.5rem',
        overflowY: 'auto' as const,
        flex: 1
    },
    actionBox: {
        marginBottom: '1.5rem'
    },
    actionTitle: {
        fontSize: '1.125rem',
        fontWeight: 600,
        color: '#0077B6',
        margin: '0 0 0.5rem 0'
    },
    actionDescription: {
        fontSize: '0.875rem',
        color: '#6b7280',
        margin: 0,
        lineHeight: '1.5'
    },
    detailsBox: {
        background: '#f9fafb',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem'
    },
    detailsTitle: {
        fontSize: '0.875rem',
        fontWeight: 600,
        color: '#374151',
        margin: '0 0 0.75rem 0'
    },
    detailRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.5rem 0',
        borderBottom: '1px solid #e5e7eb',
        fontSize: '0.875rem'
    },
    detailKey: {
        color: '#6b7280',
        fontWeight: 500
    },
    detailValue: {
        color: '#1f2937',
        fontWeight: 600,
        fontFamily: 'monospace'
    },
    walletBox: {
        background: '#eff6ff',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem'
    },
    walletRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        marginBottom: '0.5rem'
    },
    walletLabel: {
        color: '#6b7280',
        fontWeight: 500
    },
    walletAddress: {
        color: '#0077B6',
        fontWeight: 600,
        fontFamily: 'monospace'
    },
    timestamp: {
        color: '#6b7280',
        fontSize: '0.75rem'
    },
    warningBox: {
        background: '#fffbeb',
        border: '1px solid #fef3c7',
        borderRadius: '8px',
        padding: '0.75rem 1rem',
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1rem'
    },
    warningText: {
        fontSize: '0.875rem',
        color: '#92400e',
        margin: 0,
        lineHeight: '1.5'
    },
    errorBox: {
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
    footer: {
        display: 'flex',
        gap: '1rem',
        padding: '1rem 1.5rem',
        borderTop: '1px solid #e5e7eb'
    },
    button: {
        flex: 1,
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
        border: 'none'
    },
    cancelButton: {
        background: 'white',
        color: '#6b7280',
        border: '2px solid #e5e7eb'
    },
    signButton: {
        background: 'linear-gradient(135deg, #0077B6 0%, #005f8a 100%)',
        color: 'white',
        boxShadow: '0 4px 12px rgba(0, 119, 182, 0.3)'
    }
};

export default SignatureRequestModal;
