import React, { useState } from 'react';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [showNCCRModal, setShowNCCRModal] = useState(false);
  const [nccrKey, setNCCRKey] = useState('');
  const [nccrError, setNCCRError] = useState('');

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
      maxWidth: '450px',
      width: '100%',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '2.5rem'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '1rem'
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
      fontWeight: 500,
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
    loginButton: {
      padding: '0.875rem 1.5rem',
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
      marginTop: '0.5rem'
    },
    forgotPassword: {
      textAlign: 'center' as const,
      marginTop: '1rem'
    },
    forgotLink: {
      color: '#f59e0b',
      textDecoration: 'none',
      fontSize: '0.9rem',
      fontWeight: 500
    },
    backButton: {
      background: 'transparent',
      border: '1px solid #d1d5db',
      color: '#6b7280',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: 500,
      transition: 'all 0.2s',
      marginTop: '1.5rem'
    },
    nccrButton: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      border: 'none',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: 500,
      transition: 'all 0.2s',
      marginTop: '1rem',
      width: '100%'
    },
    modalOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modalContent: {
      background: 'white',
      borderRadius: '16px',
      padding: '2rem',
      maxWidth: '400px',
      width: '90%',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
    },
    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#1f2937',
      marginBottom: '1.5rem',
      textAlign: 'center' as const
    },
    modalButtons: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1.5rem'
    },
    modalLoginButton: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      border: 'none',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: 500,
      flex: 1
    },
    modalCancelButton: {
      background: 'transparent',
      border: '1px solid #d1d5db',
      color: '#6b7280',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: 500,
      flex: 1
    },
    errorMessage: {
      color: '#dc2626',
      fontSize: '0.8rem',
      marginTop: '0.5rem'
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock admin role detection - in real app this would come from backend
    const adminRoles = {
      'buyer@company.com': 'corporate-buyer',
      'admin@panchayat.gov': 'panchayat-admin',
      'admin@nccr.gov': 'nccr-admin'
    };
    
    const adminRole = adminRoles[credentials.email as keyof typeof adminRoles] || 'corporate-buyer';
    
    // Redirect based on admin role
    switch (adminRole) {
      case 'corporate-buyer':
        window.location.href = '/corporate-dashboard';
        break;
      case 'panchayat-admin':
        window.location.href = '/panchayat-admin-dashboard';
        break;
      default:
        window.location.href = '/corporate-dashboard';
    }
  };

  const handleBack = () => {
    window.location.href = '/login-options';
  };

  const handleNCCRLogin = () => {
    setNCCRError('');
    if (nccrKey === 'NCCR987') {
      setShowNCCRModal(false);
      setNCCRKey('');
      window.location.href = '/nccr-dashboard';
    } else {
      setNCCRError('Invalid NCCR Key. Please try again.');
    }
  };

  const handleNCCRModalClose = () => {
    setShowNCCRModal(false);
    setNCCRKey('');
    setNCCRError('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Admin Portal Login</h1>
          <p style={styles.subtitle}>Corporate & Government Access</p>
        </div>

        <form style={styles.form} onSubmit={handleLogin}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="Enter your admin email"
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = '#f59e0b')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = '#f59e0b')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              required
            />
          </div>

          <button
            type="submit"
            style={styles.loginButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Access Admin Dashboard
          </button>

          <div style={styles.forgotPassword}>
            <a href="#forgot" style={styles.forgotLink}>
              Forgot your password?
            </a>
          </div>

          <button
            type="button"
            style={styles.backButton}
            onClick={handleBack}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#9ca3af';
              e.currentTarget.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#d1d5db';
              e.currentTarget.style.color = '#6b7280';
            }}
          >
            ← Back to Login Options
          </button>

          <button
            type="button"
            style={styles.nccrButton}
            onClick={() => setShowNCCRModal(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            ☸️ NCCR Login
          </button>
        </form>

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#fef3c7',
          borderRadius: '8px',
          fontSize: '0.8rem',
          color: '#92400e'
        }}>
          <strong>Demo Accounts:</strong><br />
          Corporate Buyer: buyer@company.com<br />
          Password: any<br /><br />
          <strong>NCCR Super Admin:</strong><br />
          Key: NCCR987
        </div>
      </div>

      {/* NCCR Login Modal */}
      {showNCCRModal && (
        <div style={styles.modalOverlay} onClick={handleNCCRModalClose}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>NCCR Login</h2>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Enter NCCR Key</label>
              <input
                type="password"
                value={nccrKey}
                onChange={(e) => setNCCRKey(e.target.value)}
                placeholder="e.g., NCCR987"
                style={styles.input}
                onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
                onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleNCCRLogin();
                  }
                }}
              />
              {nccrError && (
                <div style={styles.errorMessage}>{nccrError}</div>
              )}
            </div>

            <div style={styles.modalButtons}>
              <button
                type="button"
                style={styles.modalCancelButton}
                onClick={handleNCCRModalClose}
              >
                Cancel
              </button>
              <button
                type="button"
                style={styles.modalLoginButton}
                onClick={handleNCCRLogin}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
