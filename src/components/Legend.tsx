import React from 'react';

interface LegendProps {
  showNDVILayer?: boolean;
  userRole: 'ngo' | 'nccr';
}

const Legend: React.FC<LegendProps> = ({ showNDVILayer = true, userRole }) => {
  const ndviItems = [
    { color: '#4CAF50', label: 'Healthy (0.6+)', description: 'Thriving vegetation' },
    { color: '#FFEB3B', label: 'Moderate (0.4-0.6)', description: 'Stable growth' },
    { color: '#F44336', label: 'Poor (<0.4)', description: 'Requires attention' }
  ];

  const statusItems = [
    { color: '#2196F3', label: 'Active', description: 'Ongoing projects' },
    { color: '#FF9800', label: 'Pending', description: 'Awaiting approval' },
    { color: '#4CAF50', label: 'Completed', description: 'Finished projects' }
  ];

  const styles = {
    legend: {
      position: 'absolute' as const,
      bottom: '1rem',
      left: '1rem',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '16px',
      padding: '1.5rem',
      border: '1px solid rgba(0, 119, 182, 0.1)',
      backdropFilter: 'blur(15px)',
      zIndex: 100,
      minWidth: '280px',
      boxShadow: '0 15px 35px rgba(0, 119, 182, 0.1)'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1rem'
    },
    title: {
      fontSize: '1rem',
      fontWeight: 700,
      color: '#0077B6',
      margin: 0
    },
    rolebadge: {
      background: userRole === 'nccr' ? '#4CAF50' : '#2196F3',
      color: 'white',
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: 600,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px'
    },
    section: {
      marginBottom: '1.5rem'
    },
    sectionTitle: {
      fontSize: '0.9rem',
      fontWeight: 600,
      color: '#0077B6',
      marginBottom: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '0.75rem',
      padding: '0.5rem',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
      cursor: 'default'
    },
    legendColor: {
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      border: '2px solid rgba(255, 255, 255, 0.8)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      flexShrink: 0
    },
    legendText: {
      flex: 1
    },
    legendLabel: {
      fontSize: '0.85rem',
      fontWeight: 600,
      color: '#1e293b',
      marginBottom: '0.25rem'
    },
    legendDescription: {
      fontSize: '0.75rem',
      color: '#64748b',
      lineHeight: 1.3
    },
    accessNote: {
      background: 'rgba(0, 119, 182, 0.05)',
      border: '1px solid rgba(0, 119, 182, 0.1)',
      borderRadius: '8px',
      padding: '0.75rem',
      marginTop: '1rem'
    },
    accessText: {
      fontSize: '0.75rem',
      color: '#0077B6',
      fontWeight: 500,
      lineHeight: 1.4
    },
    icon: {
      fontSize: '1rem'
    }
  };

  return (
    <div style={styles.legend}>
      {/* Header */}
      <div style={styles.header}>
        <h3 style={styles.title}>Legend</h3>
        <span style={styles.rolebadge}>
          {userRole === 'nccr' ? 'NCCR Admin' : 'NGO Verifier'}
        </span>
      </div>

      {/* NDVI Section */}
      {showNDVILayer && userRole === 'nccr' && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <span style={styles.icon}>🌱</span>
            NDVI Health Index
          </div>
          {ndviItems.map((item, index) => (
            <div 
              key={index} 
              style={{
                ...styles.legendItem,
                background: 'rgba(76, 175, 80, 0.03)'
              }}
            >
              <div 
                style={{
                  ...styles.legendColor, 
                  background: item.color
                }}
              />
              <div style={styles.legendText}>
                <div style={styles.legendLabel}>{item.label}</div>
                <div style={styles.legendDescription}>{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Status Section */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>
          <span style={styles.icon}>📍</span>
          Project Status
        </div>
        {statusItems.map((item, index) => (
          <div 
            key={index} 
            style={{
              ...styles.legendItem,
              background: 'rgba(33, 150, 243, 0.03)'
            }}
          >
            <div 
              style={{
                ...styles.legendColor, 
                background: item.color
              }}
            />
            <div style={styles.legendText}>
              <div style={styles.legendLabel}>{item.label}</div>
              <div style={styles.legendDescription}>{item.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Access Note */}
      <div style={styles.accessNote}>
        <div style={styles.accessText}>
          {userRole === 'nccr' 
            ? '🌍 Full access: All projects and NDVI data visible'
            : '🔍 Limited access: Assigned projects only'
          }
        </div>
      </div>
    </div>
  );
};

export default Legend;
