import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './shared/DashboardHeader';
import { AuthUtils } from '../utils/auth';
import { CurrencyUtils } from '../utils/currency';

const CorporateDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize mock user profile if not exists
    const currentUser = AuthUtils.getCurrentUser();
    if (!currentUser) {
      const mockUser = {
        id: 'corporate-001',
        name: 'Acme Corporation',
        email: 'buyer@company.com',
        role: 'corporate',
      };
      AuthUtils.saveUserProfile(mockUser);
    }
  }, []);

  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      margin: 0,
      padding: 0
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '3rem'
    },
    statCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    statIcon: {
      fontSize: '2.5rem',
      width: '60px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      borderRadius: '12px',
      color: 'white'
    },
    statContent: {
      flex: 1
    },
    statNumber: {
      fontSize: '1.75rem',
      fontWeight: 700,
      color: '#1e293b',
      marginBottom: '0.25rem'
    },
    statLabel: {
      color: '#64748b',
      fontSize: '0.875rem',
      fontWeight: 500
    },
    actionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem'
    },
    actionCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e2e8f0',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    actionIcon: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
      display: 'block'
    },
    actionTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      marginBottom: '0.5rem',
      color: '#1e293b'
    },
    actionDescription: {
      color: '#64748b',
      lineHeight: 1.6,
      marginBottom: '1.5rem'
    },
    actionButton: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: '0.875rem',
      transition: 'all 0.3s ease',
      width: '100%'
    }
  };

  return (
    <div style={styles.container}>
      <DashboardHeader 
        title="Corporate Dashboard"
        subtitle="Purchase carbon credits, manage sustainability portfolio, and track ESG metrics"
        userRole="corporate"
      />
      
      <main style={styles.main}>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>💳</div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>2,450</div>
              <div style={styles.statLabel}>Credits Purchased</div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>🔄</div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>1,200</div>
              <div style={styles.statLabel}>Credits Retired</div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📊</div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>68%</div>
              <div style={styles.statLabel}>Carbon Neutral</div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>💰</div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>
                $245,000
                {CurrencyUtils.shouldShowConversion("245000", "Total Investment") && (
                  <span style={{...CurrencyUtils.getConversionStyle(), fontSize: '0.6em'}}>
                    {CurrencyUtils.getConversionString("245000", "Total Investment")}
                  </span>
                )}
              </div>
              <div style={styles.statLabel}>Total Investment</div>
            </div>
          </div>
        </div>

        <div style={styles.actionsGrid}>
          <div style={styles.actionCard}>
            <div style={styles.actionIcon}>🏪</div>
            <h3 style={styles.actionTitle}>Carbon Marketplace</h3>
            <p style={styles.actionDescription}>
              Browse and purchase verified carbon credits from blue carbon projects
            </p>
            <button 
              style={styles.actionButton}
              onClick={() => navigate('/buyer-marketplace')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Browse Marketplace
            </button>
          </div>

          <div style={styles.actionCard}>
            <div style={styles.actionIcon}>📈</div>
            <h3 style={styles.actionTitle}>ESG Analytics</h3>
            <p style={styles.actionDescription}>
              Track your environmental impact and sustainability metrics for ESG reporting
            </p>
            <button 
              style={styles.actionButton}
              onClick={() => navigate('/corporate-analytics')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              View Analytics
            </button>
          </div>

          <div style={styles.actionCard}>
            <div style={styles.actionIcon}>📋</div>
            <h3 style={styles.actionTitle}>Portfolio Management</h3>
            <p style={styles.actionDescription}>
              Manage your carbon credit portfolio, retirements, and offset strategies
            </p>
            <button 
              style={styles.actionButton}
              onClick={() => navigate('/corporate-portfolio')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Manage Portfolio
            </button>
          </div>

          <div style={styles.actionCard}>
            <div style={styles.actionIcon}>📄</div>
            <h3 style={styles.actionTitle}>Sustainability Reports</h3>
            <p style={styles.actionDescription}>
              Generate comprehensive sustainability and carbon neutrality reports
            </p>
            <button 
              style={styles.actionButton}
              onClick={() => navigate('/impact-reporting')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Generate Reports
            </button>
          </div>

          <div style={styles.actionCard}>
            <div style={styles.actionIcon}>⚙️</div>
            <h3 style={styles.actionTitle}>Corporate Settings</h3>
            <p style={styles.actionDescription}>
              Manage company profile, billing, and sustainability preferences
            </p>
            <button 
              style={styles.actionButton}
              onClick={() => navigate('/corporate-settings')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Manage Settings
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CorporateDashboard;
