import React, { useState } from 'react';
import BuyerMarketplace from './BuyerMarketplace';
import NCCRAdminDashboard from './NCCRAdminDashboard';
import PanchayatDashboard from './PanchayatDashboard';

type DashboardType = 'buyer' | 'admin' | 'panchayat';

const DashboardNavigator = () => {
  const [currentDashboard, setCurrentDashboard] = useState<DashboardType>('buyer');

  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    navigation: {
      background: '#1f2937',
      padding: '1rem 0',
      position: 'sticky' as const,
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    navContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      padding: '0 2rem'
    },
    navButton: {
      background: 'transparent',
      border: '2px solid #374151',
      color: '#9ca3af',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      minWidth: '200px'
    },
    navButtonActive: {
      background: '#3b82f6',
      borderColor: '#3b82f6',
      color: 'white',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
    },
    dashboardContainer: {
      minHeight: '100vh',
      background: '#f8f9fa'
    }
  };

  const dashboards = [
    { key: 'buyer' as DashboardType, label: '🛒 Buyer Marketplace', component: BuyerMarketplace },
    { key: 'admin' as DashboardType, label: '⚙️ NCCR Admin Dashboard', component: NCCRAdminDashboard },
    { key: 'panchayat' as DashboardType, label: '🏛️ Panchayat Dashboard', component: PanchayatDashboard },
  ];

  const currentComponent = dashboards.find(d => d.key === currentDashboard)?.component || BuyerMarketplace;
  const CurrentComponent = currentComponent;

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.navigation}>
        <div style={styles.navContainer}>
          {dashboards.map((dashboard) => (
            <button
              key={dashboard.key}
              style={{
                ...styles.navButton,
                ...(currentDashboard === dashboard.key ? styles.navButtonActive : {})
              }}
              onClick={() => setCurrentDashboard(dashboard.key)}
              onMouseEnter={(e) => {
                if (currentDashboard !== dashboard.key) {
                  e.currentTarget.style.borderColor = '#6b7280';
                  e.currentTarget.style.color = '#d1d5db';
                }
              }}
              onMouseLeave={(e) => {
                if (currentDashboard !== dashboard.key) {
                  e.currentTarget.style.borderColor = '#374151';
                  e.currentTarget.style.color = '#9ca3af';
                }
              }}
            >
              {dashboard.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Dashboard Content */}
      <div style={styles.dashboardContainer}>
        <CurrentComponent />
      </div>
    </div>
  );
};

export default DashboardNavigator;
