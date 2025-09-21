import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './shared/DashboardHeader';
import { AuthUtils } from '../utils/auth';
import { CurrencyUtils } from '../utils/currency';

const PanchayatAdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize mock user profile if not exists
    const currentUser = AuthUtils.getCurrentUser();
    if (!currentUser) {
      const mockUser = {
        id: 'panchayat-admin-001',
        name: 'Sarpanch Priya Sharma',
        email: 'admin@panchayat.gov',
        role: 'panchayat-admin',
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
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
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
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
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
        title="Panchayat Admin Dashboard"
        subtitle="Oversee regional projects, manage policies, and coordinate community initiatives"
        userRole="panchayat"
      />
      
      <main style={styles.main}>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>🏗️</div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>24</div>
              <div style={styles.statLabel}>Approved Projects</div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>👥</div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>156</div>
              <div style={styles.statLabel}>Community Members</div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📊</div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>89%</div>
              <div style={styles.statLabel}>Performance Rating</div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>💰</div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>
                ₹2,45,000
                {CurrencyUtils.shouldShowConversion("245000", "Regional Revenue") && (
                  <span style={{...CurrencyUtils.getConversionStyle(), fontSize: '0.6em'}}>
                    {CurrencyUtils.getConversionString("245000", "Regional Revenue")}
                  </span>
                )}
              </div>
              <div style={styles.statLabel}>Regional Revenue</div>
            </div>
          </div>
        </div>

        <div style={styles.actionsGrid}>
          <div style={styles.actionCard}>
            <div style={styles.actionIcon}>✅</div>
            <h3 style={styles.actionTitle}>Project Approvals</h3>
            <p style={styles.actionDescription}>
              Review and approve community-submitted blue carbon projects in your jurisdiction
            </p>
            <button 
              style={styles.actionButton}
              onClick={() => navigate('/panchayat-dashboard')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Review Projects
            </button>
          </div>

          <div style={styles.actionCard}>
            <div style={styles.actionIcon}>📋</div>
            <h3 style={styles.actionTitle}>Policy Management</h3>
            <p style={styles.actionDescription}>
              Create and manage local policies for environmental conservation and carbon projects
            </p>
            <button 
              style={styles.actionButton}
              onClick={() => alert('Policy management portal coming soon!')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Manage Policies
            </button>
          </div>

          <div style={styles.actionCard}>
            <div style={styles.actionIcon}>🤝</div>
            <h3 style={styles.actionTitle}>Community Coordination</h3>
            <p style={styles.actionDescription}>
              Facilitate communication and coordination between community members and NGOs
            </p>
            <button 
              style={styles.actionButton}
              onClick={() => alert('Community coordination tools coming soon!')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Coordinate Activities
            </button>
          </div>

          <div style={styles.actionCard}>
            <div style={styles.actionIcon}>📈</div>
            <h3 style={styles.actionTitle}>Performance Reports</h3>
            <p style={styles.actionDescription}>
              Generate reports on regional environmental performance and project outcomes
            </p>
            <button 
              style={styles.actionButton}
              onClick={() => navigate('/impact-reporting')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              View Reports
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PanchayatAdminDashboard;
