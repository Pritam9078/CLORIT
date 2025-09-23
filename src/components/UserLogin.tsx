import React, { useState } from 'react';

const UserLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
    inputFocus: {
      borderColor: '#667eea'
    },
    loginButton: {
      padding: '0.875rem 1.5rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
      color: '#667eea',
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
    
    // Prevent wallet extension interference
    try {
      // Clear any wallet-related errors
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    } catch (error) {
      // Ignore wallet-related errors
      console.warn('Wallet extension detected but ignored for authentication');
    }
    
    // Mock role detection - in real app this would come from backend
    const userRoles = {
      'community@example.com': 'community',
      'ngo@example.com': 'ngo', 
      'panchayat@example.com': 'panchayat',
      'buyer@company.com': 'corporate'
    };
    
    const userRole = userRoles[credentials.email as keyof typeof userRoles] || 'community';
    
    // Save authentication token and user profile (wallet-free)
    const authToken = `auth_${Date.now()}_${userRole}`;
    localStorage.setItem('authToken', authToken);
    
    const userProfile = {
      id: `${userRole}-${Date.now()}`,
      name: getUserNameByRole(userRole),
      email: credentials.email,
      role: userRole,
    };
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    
    // Redirect based on role
    switch (userRole) {
      case 'community':
        window.location.href = '/community-dashboard';
        break;
      case 'ngo':
        window.location.href = '/ngo-dashboard';
        break;
      case 'panchayat':
        window.location.href = '/panchayat-dashboard';
        break;
      case 'corporate':
        window.location.href = '/corporate-dashboard';
        break;
      default:
        window.location.href = '/community-dashboard';
        break;
    }
  };

  const getUserNameByRole = (role: string): string => {
    const roleNames = {
      'community': 'Rajesh Kumar',
      'ngo': 'Environmental NGO',
      'panchayat': 'Panchayat Admin',
      'corporate': 'Acme Corporation'
    };
    return roleNames[role as keyof typeof roleNames] || 'User';
  };

  const handleBack = () => {
    window.location.href = '/login-options';
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>User Portal Login</h1>
          <p style={styles.subtitle}>Access your role-based dashboard</p>
        </div>

        <form style={styles.form} onSubmit={handleLogin}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = '#667eea')}
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
              onFocus={(e) => (e.target.style.borderColor = '#667eea')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              required
            />
          </div>

          <button
            type="submit"
            style={styles.loginButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Login to Dashboard
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
        </form>

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f3f4f6',
          borderRadius: '8px',
          fontSize: '0.8rem',
          color: '#6b7280'
        }}>
          <strong>Demo Accounts:</strong><br />
          Community: community@example.com<br />
          NGO: ngo@example.com<br />
          Panchayat: panchayat@example.com<br />
          Corporate Buyer: buyer@company.com<br />
          Password: any
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
