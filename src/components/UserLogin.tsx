import React, { useState, useEffect } from 'react';
import prototypeAuth, { initializeSampleData } from '../utils/api';

const UserLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize sample data for demo
    initializeSampleData();
  }, []);

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
    setLoading(true);
    
    try {
      // Use prototype authentication
      const result = prototypeAuth.login(credentials);
      
      if (result.success && result.user) {
        const roleNames = {
          community: 'Community Member',
          ngo: 'NGO Representative', 
          panchayat: 'Panchayat Official'
        };

        alert(`🎉 Welcome back!\n\nLogged in as: ${roleNames[result.user.role]}\nName: ${result.user.fullName}`);
        
        // Redirect to appropriate dashboard
        switch (result.user.role) {
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
            window.location.href = '/dashboard';
        }
      } else {
        alert(`❌ Login failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('❌ Login failed. Please try again.');
    } finally {
      setLoading(false);
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
            disabled={loading}
            style={{
              ...styles.loginButton,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {loading ? 'Logging in...' : 'Login to Dashboard'}
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
          <strong>🎭 Prototype Demo Accounts:</strong><br />
          <div style={{ marginTop: '0.5rem', lineHeight: '1.4' }}>
            • <strong>Community:</strong> rajesh@community.com<br />
            • <strong>NGO:</strong> priya@greenngo.org<br />
            • <strong>Panchayat:</strong> lakshmi@panchayat.gov.in<br />
            <em>Password: any (prototype mode)</em>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
