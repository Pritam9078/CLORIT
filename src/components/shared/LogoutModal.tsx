import React, { useState } from 'react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm, userName }) => {
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
      zIndex: 1000,
    },
    modal: {
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      maxWidth: '400px',
      width: '90%',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      animation: 'modalSlideIn 0.3s ease-out',
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '1.5rem',
    },
    icon: {
      fontSize: '3rem',
      marginBottom: '1rem',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '0.5rem',
    },
    message: {
      color: '#6b7280',
      lineHeight: 1.5,
    },
    actions: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      marginTop: '2rem',
    },
    cancelButton: {
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: '2px solid #e5e7eb',
      background: 'white',
      color: '#374151',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    confirmButton: {
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      color: 'white',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <div style={styles.icon}>👋</div>
          <h3 style={styles.title}>Confirm Logout</h3>
          <p style={styles.message}>
            {userName ? `Hi ${userName}, are` : 'Are'} you sure you want to logout from CLORIT Platform?
            <br />
            You'll need to sign in again to access your dashboard.
          </p>
        </div>
        
        <div style={styles.actions}>
          <button
            style={styles.cancelButton}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#3b82f6';
              e.currentTarget.style.color = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.color = '#374151';
            }}
          >
            Cancel
          </button>
          <button
            style={styles.confirmButton}
            onClick={onConfirm}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Logout
          </button>
        </div>
      </div>
      
      <style>
        {`
          @keyframes modalSlideIn {
            from {
              opacity: 0;
              transform: scale(0.95) translateY(-10px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default LogoutModal;
