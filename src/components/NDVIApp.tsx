import React, { useState } from 'react';
import CommunityUserDashboard from './CommunityUserDashboard';
import NGODashboard from './NGODashboard';
import NCCRAdminDashboard from './NCCRAdminDashboard';

type UserRole = 'community' | 'ngo' | 'nccr' | null;

const NDVIApp: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    if (role === currentRole) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentRole(role);
      setIsTransitioning(false);
    }, 300);
  };

  const handleBackToLanding = () => {
    handleRoleSelect(null);
  };

  const renderDashboard = () => {
    switch (currentRole) {
      case 'community':
        return <CommunityUserDashboard />;
      case 'ngo':
        return <NGODashboard />;
      case 'nccr':
        return <NCCRAdminDashboard />;
      default:
        return (
          <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 25%, #90E0EF 75%, #F8FAF9 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '3rem',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              maxWidth: '600px'
            }}>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#0077B6' }}>
                Select Your Role
              </h1>
              <p style={{ marginBottom: '2rem', color: '#64748b' }}>
                Choose your dashboard to access NDVI satellite monitoring
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  onClick={() => handleRoleSelect('community')}
                  style={{
                    padding: '1rem 2rem',
                    background: '#22c55e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  🌱 Community User
                </button>
                <button
                  onClick={() => handleRoleSelect('ngo')}
                  style={{
                    padding: '1rem 2rem',
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  🌿 NGO Verifier
                </button>
                <button
                  onClick={() => handleRoleSelect('nccr')}
                  style={{
                    padding: '1rem 2rem',
                    background: '#8b5cf6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  🏛️ NCCR Admin
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: '#F8FAF9',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    backButton: {
      position: 'fixed' as const,
      top: '2rem',
      left: '2rem',
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.9)',
      border: '1px solid rgba(0, 119, 182, 0.2)',
      borderRadius: '50px',
      padding: '0.75rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#0077B6',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px rgba(0, 119, 182, 0.1)'
    },
    content: {
      transition: 'all 0.3s ease',
      opacity: isTransitioning ? 0 : 1,
      transform: isTransitioning ? 'scale(0.98)' : 'scale(1)'
    }
  };

  return (
    <div style={styles.container}>
      {/* Back Button */}
      {currentRole && (
        <button
          style={styles.backButton}
          onClick={handleBackToLanding}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 119, 182, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 119, 182, 0.1)';
          }}
        >
          ← Back to Role Selection
        </button>
      )}

      {/* Main Content */}
      <div style={styles.content}>
        {renderDashboard()}
      </div>
    </div>
  );
};

export default NDVIApp;
