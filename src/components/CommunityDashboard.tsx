import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './shared/DashboardHeader';
import AnalyticsWidget from './shared/AnalyticsWidget';
import NotificationSystem from './shared/NotificationSystem';
import ProgressTracker from './shared/ProgressTracker';
import QuickActions from './shared/QuickActions';
import WeatherWidget from './shared/WeatherWidget';
import PerformanceMonitor from './shared/PerformanceMonitor';
import ResourceUsageWidget from './shared/ResourceUsageWidget';
import ActivityFeed from './shared/ActivityFeed';
import DataVisualizationHub from './shared/DataVisualizationHub';
import SettingsPreferences from './shared/SettingsPreferences';
import { AuthUtils } from '../utils/auth';
import { CurrencyUtils } from '../utils/currency';

const CommunityDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize mock user profile if not exists
    const currentUser = AuthUtils.getCurrentUser();
    if (!currentUser) {
      const mockUser = {
        id: 'community-001',
        name: 'Rajesh Kumar',
        email: 'community@example.com',
        role: 'community',
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
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
      background: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: '0.875rem',
      transition: 'all 0.3s ease',
      width: '100%',
      boxShadow: '0 4px 15px rgba(0, 119, 182, 0.2)'
    }
  };

  return (
    <div style={styles.container}>
      <DashboardHeader 
        title="Community Dashboard"
        subtitle="Manage your blue carbon projects and track environmental impact"
        userRole="community"
        hideTitle={true}
      />
      
      <main style={styles.main}>
        {/* Enhanced Stats Grid */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>🌱</div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>156</div>
              <div style={styles.statLabel}>Trees Planted</div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>🌍</div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>2.4 tons</div>
              <div style={styles.statLabel}>CO₂ Captured</div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>💰</div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>
                ₹24,500
                {CurrencyUtils.shouldShowConversion("24500", "Earnings") && (
                  <span style={{...CurrencyUtils.getConversionStyle(), fontSize: '0.6em'}}>
                    {CurrencyUtils.getConversionString("24500", "Earnings")}
                  </span>
                )}
              </div>
              <div style={styles.statLabel}>Earnings</div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>🏆</div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>8</div>
              <div style={styles.statLabel}>Active Projects</div>
            </div>
          </div>
        </div>

        {/* New Enhanced Widgets Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Analytics Widget */}
          <AnalyticsWidget userRole="community" />
          
          {/* Progress Tracker */}
          <ProgressTracker userRole="community" />
        </div>

        {/* Second Row of Widgets */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Quick Actions */}
          <QuickActions userRole="community" />
          
          {/* Weather Widget */}
          <WeatherWidget location="Your Plantation Area" />
        </div>

        {/* Third Row of Widgets - System Performance & Activity */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Performance Monitor */}
          <PerformanceMonitor className="h-auto" />
          
          {/* Resource Usage Widget */}
          <ResourceUsageWidget className="h-auto" />
        </div>

        {/* Fourth Row - Activity Feed (Full Width) */}
        <div style={{
          marginBottom: '3rem'
        }}>
          <ActivityFeed 
            className="w-full" 
            userRole="community" 
            maxItems={15}
            filterByRole={false}
          />
        </div>

        {/* Fifth Row - Advanced Analytics & Settings */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Data Visualization Hub */}
          <DataVisualizationHub 
            className="h-auto" 
            userRole="community" 
          />
          
          {/* Settings & Preferences */}
          <SettingsPreferences 
            className="h-auto" 
            userRole="community" 
          />
        </div>

        {/* Original Actions Grid - Now Enhanced */}
        <div style={styles.actionsGrid}>
          <div style={styles.actionCard}>
            <div style={styles.actionIcon}>🌳</div>
            <h3 style={styles.actionTitle}>Register Land</h3>
            <p style={styles.actionDescription}>
              Register your land for blue carbon projects and mangrove plantation
            </p>
            <button 
              style={styles.actionButton}
              onClick={() => navigate('/land-registration')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 119, 182, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Start Registration
            </button>
          </div>

          <div style={styles.actionCard}>
            <div style={styles.actionIcon}>📊</div>
            <h3 style={styles.actionTitle}>Track Impact</h3>
            <p style={styles.actionDescription}>
              Monitor your plantation progress and environmental impact metrics
            </p>
            <button 
              style={styles.actionButton}
              onClick={() => navigate('/track-impact')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 119, 182, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Track Impact
            </button>
          </div>

          <div style={styles.actionCard}>
            <div style={styles.actionIcon}>🌿</div>
            <h3 style={styles.actionTitle}>Input Data</h3>
            <p style={styles.actionDescription}>
              Submit plantation data and growth measurements for verification
            </p>
            <button 
              style={styles.actionButton}
              onClick={() => navigate('/plantation-data-input')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 119, 182, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Submit Data
            </button>
          </div>

          <div style={styles.actionCard}>
            <div style={styles.actionIcon}>💳</div>
            <h3 style={styles.actionTitle}>Earn Credits</h3>
            <p style={styles.actionDescription}>
              Convert your verified environmental impact into carbon credits and redeem rewards
            </p>
            <button 
              style={styles.actionButton}
              onClick={() => navigate('/earn-credits')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 119, 182, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Earn Credits
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommunityDashboard;
