import React, { useState, useEffect } from 'react';

interface LandingPageProps {
  onRoleSelect?: (role: 'community' | 'ngo' | 'nccr') => void;
}

const LandingPage2: React.FC<LandingPageProps> = ({ onRoleSelect }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleRoleSelection = (role: 'community' | 'ngo' | 'nccr') => {
    setSelectedRole(role);
    setTimeout(() => {
      onRoleSelect?.(role);
    }, 300);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 25%, #90E0EF 75%, #F8FAF9 100%)',
      display: 'flex',
      flexDirection: 'column' as const,
      fontFamily: 'Inter, system-ui, sans-serif',
      overflow: 'hidden',
      position: 'relative' as const
    },
    backgroundElements: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
      pointerEvents: 'none' as const,
      background: `
        radial-gradient(circle at 20% 20%, rgba(76, 175, 80, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(0, 119, 182, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 40% 60%, rgba(144, 224, 239, 0.3) 0%, transparent 50%)
      `
    },
    header: {
      position: 'relative' as const,
      zIndex: 10,
      padding: '2rem 0',
      textAlign: 'center' as const
    },
    logo: {
      fontSize: '3rem',
      marginBottom: '1rem',
      animation: isLoaded ? 'fadeInDown 1s ease-out' : '',
      transform: isLoaded ? 'translateY(0)' : 'translateY(-50px)',
      opacity: isLoaded ? 1 : 0,
      transition: 'all 1s ease-out'
    },
    title: {
      fontSize: '3.5rem',
      fontWeight: 700,
      color: 'white',
      marginBottom: '1rem',
      textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      animation: isLoaded ? 'fadeInUp 1s ease-out 0.2s both' : '',
      transform: isLoaded ? 'translateY(0)' : 'translateY(50px)',
      opacity: isLoaded ? 1 : 0
    },
    subtitle: {
      fontSize: '1.5rem',
      color: 'rgba(255, 255, 255, 0.9)',
      fontWeight: 400,
      marginBottom: '3rem',
      textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      animation: isLoaded ? 'fadeInUp 1s ease-out 0.4s both' : '',
      transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
      opacity: isLoaded ? 1 : 0
    },
    main: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative' as const,
      zIndex: 10,
      padding: '0 2rem'
    },
    content: {
      maxWidth: '1200px',
      width: '100%'
    },
    description: {
      textAlign: 'center' as const,
      marginBottom: '4rem',
      animation: isLoaded ? 'fadeIn 1s ease-out 0.6s both' : '',
      opacity: isLoaded ? 1 : 0
    },
    descriptionTitle: {
      fontSize: '2rem',
      fontWeight: 600,
      color: 'white',
      marginBottom: '1rem',
      textShadow: '0 2px 15px rgba(0, 0, 0, 0.3)'
    },
    descriptionText: {
      fontSize: '1.125rem',
      color: 'rgba(255, 255, 255, 0.9)',
      lineHeight: 1.8,
      maxWidth: '800px',
      margin: '0 auto',
      textShadow: '0 1px 8px rgba(0, 0, 0, 0.2)'
    },
    roleGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem',
      animation: isLoaded ? 'fadeInUp 1s ease-out 0.8s both' : '',
      transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
      opacity: isLoaded ? 1 : 0
    },
    roleCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '2rem',
      padding: '2.5rem',
      boxShadow: '0 20px 40px rgba(0, 119, 182, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      backdropFilter: 'blur(20px)',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    roleCardHover: {
      transform: 'translateY(-10px) scale(1.02)',
      boxShadow: '0 30px 60px rgba(0, 119, 182, 0.3)',
      background: 'rgba(255, 255, 255, 0.98)'
    },
    roleCardSelected: {
      transform: 'translateY(-15px) scale(1.05)',
      boxShadow: '0 40px 80px rgba(0, 119, 182, 0.4)',
      background: 'rgba(255, 255, 255, 1)',
      borderColor: '#0077B6'
    },
    roleIcon: {
      fontSize: '4rem',
      marginBottom: '1.5rem',
      display: 'block',
      textAlign: 'center' as const
    },
    roleTitle: {
      fontSize: '1.75rem',
      fontWeight: 700,
      color: '#0077B6',
      marginBottom: '1rem',
      textAlign: 'center' as const
    },
    roleDescription: {
      fontSize: '1rem',
      color: '#64748b',
      lineHeight: 1.6,
      textAlign: 'center' as const,
      marginBottom: '1.5rem'
    },
    roleFeatures: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.75rem'
    },
    feature: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontSize: '0.875rem',
      color: '#475569'
    },
    featureIcon: {
      fontSize: '1.25rem'
    },
    footer: {
      position: 'relative' as const,
      zIndex: 10,
      padding: '2rem 0',
      textAlign: 'center' as const,
      animation: isLoaded ? 'fadeIn 1s ease-out 1s both' : '',
      opacity: isLoaded ? 1 : 0
    },
    footerText: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '0.875rem',
      textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)'
    },
    glowingOrb: {
      position: 'absolute' as const,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
      pointerEvents: 'none' as const,
      animation: 'float 6s ease-in-out infinite'
    },
    orb1: {
      width: '200px',
      height: '200px',
      top: '10%',
      left: '10%',
      animationDelay: '0s'
    },
    orb2: {
      width: '150px',
      height: '150px',
      top: '60%',
      right: '15%',
      animationDelay: '2s'
    },
    orb3: {
      width: '120px',
      height: '120px',
      bottom: '20%',
      left: '20%',
      animationDelay: '4s'
    }
  };

  const roleData = [
    {
      id: 'community',
      icon: '🌱',
      title: 'Community User',
      description: 'Track your land restoration progress and monitor mangrove health with satellite data',
      features: [
        { icon: '📊', text: 'View your registered land areas' },
        { icon: '🌿', text: 'Monitor NDVI health updates' },
        { icon: '💰', text: 'Track carbon credits earned' },
        { icon: '📱', text: 'Receive project alerts' }
      ]
    },
    {
      id: 'ngo',
      icon: '🌿',
      title: 'NGO Verifier',
      description: 'Verify restoration projects and upload field survey data for environmental assessment',
      features: [
        { icon: '✅', text: 'Verify restoration projects' },
        { icon: '📸', text: 'Upload geo-tagged survey photos' },
        { icon: '🔬', text: 'Compare satellite vs ground data' },
        { icon: '📋', text: 'Track verification stages' }
      ]
    },
    {
      id: 'nccr',
      icon: '🏛️',
      title: 'NCCR Admin',
      description: 'Government oversight with full national view and approval authority for restoration projects',
      features: [
        { icon: '🗺️', text: 'Full national project view' },
        { icon: '⚖️', text: 'Approve/reject submissions' },
        { icon: '📈', text: 'Access historical NDVI data' },
        { icon: '💾', text: 'Download national datasets' }
      ]
    }
  ];

  return (
    <div style={styles.container}>
      {/* Background Elements */}
      <div style={styles.backgroundElements}></div>
      
      {/* Floating Orbs */}
      <div style={{...styles.glowingOrb, ...styles.orb1}}></div>
      <div style={{...styles.glowingOrb, ...styles.orb2}}></div>
      <div style={{...styles.glowingOrb, ...styles.orb3}}></div>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>🌊</div>
        <h1 style={styles.title}>CLORIT</h1>
        <p style={styles.subtitle}>
          Climate & Land Observation for Restoration Impact Tracking
        </p>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.content}>
          {/* Description */}
          <div style={styles.description}>
            <h2 style={styles.descriptionTitle}>
              Mangrove Forest Monitoring & Blue Carbon Tracking
            </h2>
            <p style={styles.descriptionText}>
              Advanced satellite NDVI visualization platform for monitoring mangrove restoration, 
              tracking environmental health, and managing blue carbon credit programs. 
              Real-time satellite data meets ground-truth verification for transparent ecosystem management.
            </p>
          </div>

          {/* Role Selection */}
          <div style={styles.roleGrid}>
            {roleData.map((role, index) => (
              <div
                key={role.id}
                style={{
                  ...styles.roleCard,
                  ...(selectedRole === role.id ? styles.roleCardSelected : {}),
                  animationDelay: `${0.8 + index * 0.2}s`
                }}
                onClick={() => handleRoleSelection(role.id as 'community' | 'ngo' | 'nccr')}
                onMouseEnter={(e) => {
                  if (selectedRole !== role.id) {
                    Object.assign(e.currentTarget.style, styles.roleCardHover);
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedRole !== role.id) {
                    Object.assign(e.currentTarget.style, styles.roleCard);
                  }
                }}
              >
                <div style={styles.roleIcon}>{role.icon}</div>
                <h3 style={styles.roleTitle}>{role.title}</h3>
                <p style={styles.roleDescription}>{role.description}</p>
                <div style={styles.roleFeatures}>
                  {role.features.map((feature, featureIndex) => (
                    <div key={featureIndex} style={styles.feature}>
                      <span style={styles.featureIcon}>{feature.icon}</span>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Powered by satellite technology • Supporting UN SDG 14 & 15 • Blue Carbon Initiative
        </p>
      </footer>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.1);
          }
        }

        @media (max-width: 768px) {
          .role-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .title {
            font-size: 2.5rem;
          }
          
          .description-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage2;
