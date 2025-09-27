import React, { useState } from 'react';
import { useDAO } from '../../contexts/DAOContext';

const DAOLandingPage = () => {
  const { proposals, stats } = useDAO();
  const [selectedRole, setSelectedRole] = useState<string>('');

  const handleGetStarted = () => {
    if (selectedRole) {
      window.location.href = `/dao-dashboard?role=${selectedRole}`;
    }
  };

  // Get sample proposals for preview
  const sampleProposals = proposals.filter(p => p.status === 'active').slice(0, 2);

  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#0f172a',
      minHeight: '100vh',
      color: 'white'
    },
    hero: {
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      padding: '4rem 2rem',
      textAlign: 'center' as const,
      position: 'relative' as const,
      overflow: 'hidden'
    },
    heroBackground: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
      backgroundImage: 'radial-gradient(circle at 25% 25%, #22d3ee 0%, transparent 50%), radial-gradient(circle at 75% 75%, #3b82f6 0%, transparent 50%)'
    },
    heroContent: {
      position: 'relative' as const,
      zIndex: 2,
      maxWidth: '800px',
      margin: '0 auto'
    },
    title: {
      fontSize: '3.5rem',
      fontWeight: 800,
      marginBottom: '1.5rem',
      background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 50%, #8b5cf6 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      lineHeight: 1.2
    },
    subtitle: {
      fontSize: '1.5rem',
      color: '#cbd5e1',
      marginBottom: '2.5rem',
      lineHeight: 1.6
    },
    ctaSection: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: '1.5rem'
    },
    roleSelector: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap' as const,
      justifyContent: 'center'
    },
    roleButton: {
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      border: '2px solid #334155',
      backgroundColor: 'transparent',
      color: '#cbd5e1',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '1rem',
      fontWeight: 600
    },
    roleButtonActive: {
      borderColor: '#22d3ee',
      backgroundColor: '#22d3ee',
      color: '#0f172a'
    },
    ctaButton: {
      padding: '1rem 2.5rem',
      fontSize: '1.2rem',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    section: {
      padding: '4rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: 700,
      textAlign: 'center' as const,
      marginBottom: '3rem',
      color: '#f1f5f9'
    },
    howItWorksGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      marginBottom: '3rem'
    },
    stepCard: {
      backgroundColor: '#1e293b',
      borderRadius: '16px',
      padding: '2rem',
      textAlign: 'center' as const,
      border: '1px solid #334155',
      transition: 'all 0.3s ease'
    },
    stepIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
      display: 'block'
    },
    stepTitle: {
      fontSize: '1.3rem',
      fontWeight: 600,
      marginBottom: '1rem',
      color: '#22d3ee'
    },
    stepDescription: {
      color: '#cbd5e1',
      lineHeight: 1.6
    },
    daoPreview: {
      backgroundColor: '#1e293b',
      borderRadius: '20px',
      padding: '2rem',
      border: '1px solid #334155',
      marginBottom: '3rem'
    },
    daoPreviewTitle: {
      fontSize: '2rem',
      fontWeight: 700,
      textAlign: 'center' as const,
      marginBottom: '2rem',
      color: '#22d3ee'
    },
    proposalGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    proposalCard: {
      backgroundColor: '#0f172a',
      borderRadius: '12px',
      padding: '1.5rem',
      border: '1px solid #334155'
    },
    proposalTitle: {
      fontSize: '1.2rem',
      fontWeight: 600,
      marginBottom: '0.5rem',
      color: '#f1f5f9'
    },
    proposalDescription: {
      color: '#94a3b8',
      fontSize: '0.9rem',
      marginBottom: '1rem',
      lineHeight: 1.5
    },
    progressBarContainer: {
      backgroundColor: '#334155',
      borderRadius: '6px',
      height: '8px',
      marginBottom: '0.5rem'
    },
    progressBar: {
      backgroundColor: '#22d3ee',
      height: '100%',
      borderRadius: '6px',
      transition: 'width 0.3s ease'
    },
    progressText: {
      fontSize: '0.8rem',
      color: '#94a3b8',
      textAlign: 'right' as const
    },
    benefitsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem'
    },
    benefitCard: {
      backgroundColor: '#1e293b',
      borderRadius: '16px',
      padding: '2rem',
      border: '1px solid #334155',
      textAlign: 'center' as const
    },
    benefitIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
      display: 'block'
    },
    benefitTitle: {
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBottom: '1rem',
      color: '#22d3ee'
    },
    benefitList: {
      color: '#cbd5e1',
      listStyle: 'none',
      padding: 0,
      lineHeight: 1.8
    },
    footer: {
      backgroundColor: '#0f172a',
      borderTop: '1px solid #334155',
      padding: '3rem 2rem',
      textAlign: 'center' as const
    },
    footerTitle: {
      fontSize: '2rem',
      fontWeight: 700,
      marginBottom: '1rem',
      color: '#f1f5f9'
    },
    footerSubtitle: {
      color: '#94a3b8',
      marginBottom: '2rem',
      fontSize: '1.1rem'
    }
  };

  const steps = [
    {
      icon: '👤',
      title: 'Register & Connect',
      description: 'Join the DAO by connecting your wallet and choosing your role in the ecosystem.'
    },
    {
      icon: '📝',
      title: 'Create Proposals',
      description: 'NGOs and officials can submit funding proposals for carbon credit projects.'
    },
    {
      icon: '🗳️',
      title: 'Vote & Decide',
      description: 'All members vote on proposals with weighted voting based on their role and stake.'
    },
    {
      icon: '✅',
      title: 'Execute & Verify',
      description: 'Approved projects receive funding and carbon credits are verified and distributed.'
    }
  ];

  const benefits = [
    {
      icon: '🏘️',
      title: 'Communities',
      benefits: ['Sustainable income from carbon projects', 'Job creation in green sectors', 'Environmental restoration', 'Transparent fund allocation']
    },
    {
      icon: '🏢',
      title: 'NGOs',
      benefits: ['Access to DAO funding', 'Transparent governance', 'Community partnerships', 'Impact measurement tools']
    },
    {
      icon: '🏭',
      title: 'Corporates',
      benefits: ['ESG compliance solutions', 'Verified carbon credits', 'Sustainable supply chains', 'Brand reputation enhancement']
    }
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroBackground}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>Decentralized Carbon Credit Platform</h1>
          <p style={styles.subtitle}>
            Empowering NGOs, Panchayats & Communities with DAO governance for transparent, 
            impactful carbon credit projects.
          </p>
          
          <div style={styles.ctaSection}>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Choose your role to get started:</p>
            <div style={styles.roleSelector}>
              {[
                { value: 'community', label: '🏘️ Community Member' },
                { value: 'ngo', label: '🏢 NGO Representative' },
                { value: 'panchayat', label: '🏛️ Panchayat Official' }
              ].map(role => (
                <button
                  key={role.value}
                  style={{
                    ...styles.roleButton,
                    ...(selectedRole === role.value ? styles.roleButtonActive : {})
                  }}
                  onClick={() => setSelectedRole(role.value)}
                >
                  {role.label}
                </button>
              ))}
            </div>
            <button
              style={{
                ...styles.ctaButton,
                opacity: selectedRole ? 1 : 0.6,
                cursor: selectedRole ? 'pointer' : 'not-allowed'
              }}
              onClick={handleGetStarted}
              disabled={!selectedRole}
              onMouseEnter={(e) => {
                if (selectedRole) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(34, 211, 238, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              🚀 Join DAO & Get Started
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <div style={styles.howItWorksGrid}>
          {steps.map((step, index) => (
            <div
              key={index}
              style={styles.stepCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = '#22d3ee';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#334155';
              }}
            >
              <span style={styles.stepIcon}>{step.icon}</span>
              <h3 style={styles.stepTitle}>{step.title}</h3>
              <p style={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DAO Preview Section */}
      <section style={styles.section}>
        <div style={styles.daoPreview}>
          <h2 style={styles.daoPreviewTitle}>🏛️ Live DAO Governance</h2>
          <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '2rem' }}>
            Transparent governance powered by community voting
          </p>
          
          <div style={styles.proposalGrid}>
            {sampleProposals.map(proposal => {
              const totalWeight = proposal.totalYesWeight + proposal.totalNoWeight;
              const yesPercentage = totalWeight > 0 ? (proposal.totalYesWeight / totalWeight) * 100 : 0;
              
              return (
                <div key={proposal.id} style={styles.proposalCard}>
                  <h4 style={styles.proposalTitle}>{proposal.title}</h4>
                  <p style={styles.proposalDescription}>
                    {proposal.description.substring(0, 100)}...
                  </p>
                  <div style={styles.progressBarContainer}>
                    <div 
                      style={{
                        ...styles.progressBar,
                        width: `${yesPercentage}%`
                      }}
                    ></div>
                  </div>
                  <div style={styles.progressText}>
                    {yesPercentage.toFixed(1)}% Yes votes • {totalWeight} total votes
                  </div>
                </div>
              );
            })}
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <button
              style={{
                ...styles.ctaButton,
                background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'
              }}
              onClick={() => window.location.href = '/dao-dashboard'}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(139, 92, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              🗳️ Explore DAO Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Who Benefits</h2>
        <div style={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              style={styles.benefitCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = '#22d3ee';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#334155';
              }}
            >
              <span style={styles.benefitIcon}>{benefit.icon}</span>
              <h3 style={styles.benefitTitle}>{benefit.title}</h3>
              <ul style={styles.benefitList}>
                {benefit.benefits.map((item, i) => (
                  <li key={i}>✓ {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Footer */}
      <footer style={styles.footer}>
        <h2 style={styles.footerTitle}>Ready to Shape the Future of Carbon Credits?</h2>
        <p style={styles.footerSubtitle}>
          Join our decentralized community and make a real impact on climate action
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { role: 'ngo', label: '🏢 Join as NGO', color: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)' },
            { role: 'panchayat', label: '🏛️ Join as Panchayat', color: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' },
            { role: 'community', label: '🏘️ Join as Community', color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }
          ].map(item => (
            <button
              key={item.role}
              style={{
                ...styles.ctaButton,
                background: item.color
              }}
              onClick={() => {
                setSelectedRole(item.role);
                handleGetStarted();
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #334155' }}>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            🌱 CLORIT DAO - Decentralized Carbon Credit Governance Platform
          </p>
          <div style={{ marginTop: '1rem' }}>
            <span style={{ 
              backgroundColor: '#1e293b', 
              padding: '0.5rem 1rem', 
              borderRadius: '20px',
              fontSize: '0.8rem',
              color: '#22d3ee',
              border: '1px solid #334155'
            }}>
              🎭 Prototype Demo Mode
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DAOLandingPage;
