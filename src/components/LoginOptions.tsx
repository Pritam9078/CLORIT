import React from 'react';

const LoginOptions = () => {
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
      maxWidth: '500px',
      width: '100%',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      textAlign: 'center' as const
    },
    header: {
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
      fontSize: '1rem',
      lineHeight: 1.6
    },
    optionsContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem',
      marginBottom: '2rem'
    },
    optionButton: {
      padding: '1.5rem 2rem',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      background: 'white',
      cursor: 'pointer',
      transition: 'all 0.2s',
      textAlign: 'left' as const,
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    optionButtonHover: {
      borderColor: '#667eea',
      backgroundColor: '#f8faff',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)'
    },
    optionIcon: {
      fontSize: '2rem'
    },
    optionContent: {
      flex: 1
    },
    optionTitle: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '0.25rem'
    },
    optionDescription: {
      fontSize: '0.9rem',
      color: '#6b7280',
      lineHeight: 1.4
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
      transition: 'all 0.2s'
    }
  };

  const handleUserLogin = () => {
    window.location.href = '/user-login';
  };

  const handleAdminLogin = () => {
    window.location.href = '/admin-login';
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Choose Login Type</h1>
          <p style={styles.subtitle}>
            Select the appropriate login portal for your role
          </p>
        </div>

        <div style={styles.optionsContainer}>
          <button
            style={styles.optionButton}
            onClick={handleUserLogin}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, styles.optionButtonHover);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={styles.optionIcon}>👥</div>
            <div style={styles.optionContent}>
              <div style={styles.optionTitle}>User Login</div>
              <div style={styles.optionDescription}>
                Community Members • NGOs • Panchayat Officials
              </div>
            </div>
          </button>

          <button
            style={styles.optionButton}
            onClick={handleAdminLogin}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, styles.optionButtonHover);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={styles.optionIcon}>🏢</div>
            <div style={styles.optionContent}>
              <div style={styles.optionTitle}>Admin Login</div>
              <div style={styles.optionDescription}>
                Corporate Buyers • NCCR Super Admin
              </div>
            </div>
          </button>
        </div>

        <button
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
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default LoginOptions;
