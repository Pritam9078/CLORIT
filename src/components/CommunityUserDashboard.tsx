import React, { useState } from 'react';
import { LOGO_CONFIG } from '../constants/branding';
import SatelliteGlobe from './SatelliteGlobe2';

interface NDVIGraphData {
  date: string;
  ndvi: number;
  temperature: number;
  rainfall: number;
}

interface CommunityUserDashboardProps {
  userInfo?: {
    name: string;
    landArea: number;
    location: string;
  };
}

const CommunityUserDashboard: React.FC<CommunityUserDashboardProps> = ({
  userInfo = {
    name: "Rajesh Kumar",
    landArea: 45.2,
    location: "Sundarbans, West Bengal"
  }
}) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('6months');
  const [selectedProject, setSelectedProject] = useState<string>('proj-1');
  const [showAlerts, setShowAlerts] = useState(true);

  // Sample NDVI trend data
  const ndviTrendData: NDVIGraphData[] = [
    { date: '2024-01', ndvi: 0.45, temperature: 22, rainfall: 35 },
    { date: '2024-02', ndvi: 0.52, temperature: 25, rainfall: 28 },
    { date: '2024-03', ndvi: 0.58, temperature: 28, rainfall: 15 },
    { date: '2024-04', ndvi: 0.62, temperature: 32, rainfall: 45 },
    { date: '2024-05', ndvi: 0.65, temperature: 35, rainfall: 120 },
    { date: '2024-06', ndvi: 0.68, temperature: 33, rainfall: 95 },
  ];

  const handleRegionClick = (region: any) => {
    setSelectedProject(region.id);
  };

  const styles = {
    dashboard: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F8FAF9 0%, #E0F2F1 100%)',
      fontFamily: 'Inter, system-ui, sans-serif'
    },
    header: {
      background: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)',
      color: 'white',
      padding: '2rem 0',
      borderRadius: '0 0 2rem 2rem'
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 600,
      margin: 0
    },
    subtitle: {
      fontSize: '1rem',
      opacity: 0.9,
      margin: '0.5rem 0 0 0'
    },
    userInfo: {
      textAlign: 'right' as const,
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.25rem'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      display: 'grid',
      gap: '2rem',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'auto auto auto'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 10px 25px rgba(0, 119, 182, 0.1)',
      border: '1px solid rgba(0, 119, 182, 0.1)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease'
    },
    globeCard: {
      gridColumn: '1 / -1',
      height: '500px',
      padding: 0,
      overflow: 'hidden'
    },
    metricsCard: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem'
    },
    metricItem: {
      textAlign: 'center' as const,
      padding: '1rem',
      background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.05) 0%, rgba(76, 175, 80, 0.05) 100%)',
      borderRadius: '8px',
      border: '1px solid rgba(0, 119, 182, 0.1)'
    },
    metricValue: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#0077B6',
      marginBottom: '0.5rem'
    },
    metricLabel: {
      fontSize: '0.875rem',
      color: '#64748b',
      fontWeight: 500
    },
    chartContainer: {
      padding: '1rem 0'
    },
    chartTitle: {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: '#0077B6',
      marginBottom: '1rem'
    },
    timeSelector: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '1rem'
    },
    timeButton: {
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      border: '1px solid rgba(0, 119, 182, 0.2)',
      background: 'transparent',
      color: '#64748b',
      cursor: 'pointer',
      fontSize: '0.875rem',
      transition: 'all 0.2s'
    },
    activeTimeButton: {
      background: '#0077B6',
      color: 'white',
      borderColor: '#0077B6'
    },
    alertsContainer: {
      background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 152, 0, 0.1) 100%)',
      borderRadius: '8px',
      padding: '1rem',
      border: '1px solid rgba(255, 193, 7, 0.2)'
    },
    alertsTitle: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#FF9800',
      marginBottom: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    alertItem: {
      padding: '0.75rem',
      background: 'rgba(255, 255, 255, 0.7)',
      borderRadius: '6px',
      marginBottom: '0.5rem',
      fontSize: '0.875rem',
      color: '#64748b',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    alertDate: {
      fontSize: '0.75rem',
      color: '#94a3b8'
    },
    chartBar: {
      display: 'flex',
      alignItems: 'end',
      gap: '0.25rem',
      height: '150px',
      padding: '1rem',
      background: 'rgba(0, 119, 182, 0.02)',
      borderRadius: '8px'
    },
    bar: {
      flex: 1,
      borderRadius: '4px 4px 0 0',
      minHeight: '20px',
      display: 'flex',
      alignItems: 'end',
      justifyContent: 'center',
      fontSize: '0.75rem',
      color: 'white',
      fontWeight: 600
    }
  };

  const renderNDVIChart = () => {
    const maxNDVI = Math.max(...ndviTrendData.map(d => d.ndvi));
    
    return (
      <div style={styles.chartBar}>
        {ndviTrendData.map((data, index) => {
          const height = (data.ndvi / maxNDVI) * 100;
          const color = data.ndvi >= 0.6 ? '#4CAF50' : data.ndvi >= 0.4 ? '#FFEB3B' : '#F44336';
          
          return (
            <div
              key={index}
              style={{
                ...styles.bar,
                height: `${height}%`,
                background: `linear-gradient(180deg, ${color} 0%, ${color}99 100%)`
              }}
              title={`${data.date}: NDVI ${data.ndvi}`}
            >
              {data.ndvi.toFixed(2)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={styles.dashboard}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <img 
              src={LOGO_CONFIG.MAIN_LOGO} 
              alt={LOGO_CONFIG.LOGO_ALT} 
              style={{
                width: '40px',
                height: '40px',
                marginRight: '1rem'
              }}
            />
            <div>
              <h1 style={styles.title}>🌱 CLORIT Community Dashboard</h1>
              <p style={styles.subtitle}>Mangrove Forest Health Monitoring</p>
            </div>
          </div>
          <div style={styles.userInfo}>
            <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>{userInfo.name}</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>{userInfo.location}</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>{userInfo.landArea} hectares</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.container}>
        {/* Satellite Globe */}
        <div style={{...styles.card, ...styles.globeCard}}>
          <SatelliteGlobe
            userRole="community"
            onRegionClick={handleRegionClick}
            selectedProjectId={selectedProject}
            showNDVILayer={true}
          />
        </div>

        {/* Key Metrics */}
        <div style={styles.card}>
          <h3 style={styles.chartTitle}>Your Land Health Metrics</h3>
          <div style={styles.metricsCard}>
            <div style={styles.metricItem}>
              <div style={styles.metricValue}>0.65</div>
              <div style={styles.metricLabel}>Current NDVI</div>
            </div>
            <div style={styles.metricItem}>
              <div style={styles.metricValue}>1,250</div>
              <div style={styles.metricLabel}>Carbon Credits</div>
            </div>
            <div style={styles.metricItem}>
              <div style={styles.metricValue}>85%</div>
              <div style={styles.metricLabel}>Health Score</div>
            </div>
            <div style={styles.metricItem}>
              <div style={styles.metricValue}>2.3k</div>
              <div style={styles.metricLabel}>Trees Planted</div>
            </div>
          </div>
        </div>

        {/* NDVI Trend Chart */}
        <div style={styles.card}>
          <div style={styles.chartTitle}>NDVI Health Trend</div>
          <div style={styles.timeSelector}>
            {['3months', '6months', '1year'].map(range => (
              <button
                key={range}
                style={{
                  ...styles.timeButton,
                  ...(selectedTimeRange === range ? styles.activeTimeButton : {})
                }}
                onClick={() => setSelectedTimeRange(range)}
              >
                {range === '3months' ? '3M' : range === '6months' ? '6M' : '1Y'}
              </button>
            ))}
          </div>
          {renderNDVIChart()}
        </div>

        {/* Alerts & Notifications */}
        <div style={styles.card}>
          <div style={styles.alertsContainer}>
            <div style={styles.alertsTitle}>
              🚨 Recent Alerts
            </div>
            <div style={styles.alertItem}>
              <div>
                <div>NDVI improvement detected in Zone A</div>
                <div style={styles.alertDate}>2 days ago</div>
              </div>
              <div style={{ color: '#4CAF50', fontWeight: 600 }}>Good</div>
            </div>
            <div style={styles.alertItem}>
              <div>
                <div>Scheduled satellite imagery update</div>
                <div style={styles.alertDate}>5 days ago</div>
              </div>
              <div style={{ color: '#0077B6', fontWeight: 600 }}>Info</div>
            </div>
            <div style={styles.alertItem}>
              <div>
                <div>New carbon credits awarded</div>
                <div style={styles.alertDate}>1 week ago</div>
              </div>
              <div style={{ color: '#4CAF50', fontWeight: 600 }}>Credit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityUserDashboard;
