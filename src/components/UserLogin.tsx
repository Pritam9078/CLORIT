import React, { useState } from 'react';
import { AuthUtils } from '../utils/auth';

const UserLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
    },
    errorMessage: {
      color: '#dc2626',
      fontSize: '0.875rem',
      marginBottom: '1rem',
      padding: '0.75rem',
      backgroundColor: '#fee2e2',
      borderRadius: '6px',
      border: '1px solid #fecaca'
    },
    loadingButton: {
      opacity: 0.7,
      cursor: 'not-allowed'
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Mock authentication - in real app this would be an API call
      const userProfiles = {
        'community@example.com': {
          id: 'community-001',
          name: 'Rajesh Kumar',
          email: 'community@example.com',
          role: 'community'
        },
        'ngo@example.com': {
          id: 'ngo-001',
          name: 'Green Earth NGO',
          email: 'ngo@example.com',
          role: 'ngo'
        },
        'panchayat@example.com': {
          id: 'panchayat-001',
          name: 'Village Panchayat',
          email: 'panchayat@example.com',
          role: 'panchayat'
        }
      };
      
      const userProfile = userProfiles[credentials.email as keyof typeof userProfiles];
      
      if (!userProfile) {
        setError('Invalid email or password. Please use demo accounts listed below.');
        setIsLoading(false);
        return;
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set authentication data
      localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('refreshToken', 'mock-refresh-token-' + Date.now());
      AuthUtils.saveUserProfile(userProfile);
      
      // Redirect based on role
      switch (userProfile.role) {
        case 'community':
          window.location.href = '/community-dashboard';
          break;
        case 'ngo':
          window.location.href = '/ngo-dashboard';
          break;
        case 'panchayat':
          window.location.href = '/panchayat-dashboard';
          break;
        default:
          window.location.href = '/community-dashboard';
          break;
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      setIsLoading(false);
    }
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
          {error && (
            <div style={styles.errorMessage}>
              {error}
            </div>
          )}
          
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
              disabled={isLoading}
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
              disabled={isLoading}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.loginButton,
              ...(isLoading ? styles.loadingButton : {})
            }}
            disabled={isLoading}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {isLoading ? 'Logging in...' : 'Login to Dashboard'}
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
          Password: any
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
