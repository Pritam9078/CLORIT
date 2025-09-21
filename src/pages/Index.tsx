import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    card: {
      background: 'white',
      borderRadius: '12px',
      padding: '3rem 2rem',
      maxWidth: '500px',
      width: '100%',
      margin: '0 1rem',
      textAlign: 'center' as const,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1f2937',
      marginBottom: '1rem'
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#6b7280',
      marginBottom: '2rem',
      lineHeight: 1.6
    },
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem'
    },
    primaryButton: {
      background: '#3b82f6',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
      textDecoration: 'none',
      display: 'inline-block'
    },
    secondaryButton: {
      background: 'transparent',
      color: '#3b82f6',
      border: '2px solid #3b82f6',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
      textDecoration: 'none',
      display: 'inline-block'
    }
  };

  const handleGoToMain = () => {
    navigate('/');
  };

  const handleGoToLogin = () => {
    navigate('/login-options');
  };

  const handleGoToDashboards = () => {
    navigate('/dashboards');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🌊 CLORIT</h1>
        <p style={styles.subtitle}>
          Blockchain-Based Blue Carbon Registry & MRV System
        </p>
        <div style={styles.buttonsContainer}>
          <button 
            style={styles.primaryButton}
            onClick={handleGoToMain}
            onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
          >
            Go to Main Platform
          </button>
          <button 
            style={styles.secondaryButton}
            onClick={handleGoToLogin}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#3b82f6';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#3b82f6';
            }}
          >
            Login / Sign Up
          </button>
          <button 
            style={styles.secondaryButton}
            onClick={handleGoToDashboards}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#3b82f6';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#3b82f6';
            }}
          >
            View Dashboards
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
