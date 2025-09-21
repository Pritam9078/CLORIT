import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrencyUtils } from '../utils/currency';

const BuyerMarketplace = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [benefitsFilter, setBenefitsFilter] = useState('All Co-benefits');

  // Styles object
  const styles = {
    buyerMarketplace: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      margin: 0,
      padding: 0
    },
    header: {
      background: 'white',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      position: 'sticky' as const,
      top: 0,
      zIndex: 100
    },
    navContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#1e40af'
    },
    navMenu: {
      display: 'flex',
      gap: '2rem'
    },
    navLink: {
      textDecoration: 'none',
      color: '#64748b',
      fontWeight: 500,
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      transition: 'all 0.2s'
    },
    navLinkActive: {
      color: '#1e40af',
      backgroundColor: '#eff6ff'
    },
    userSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      color: '#64748b',
      cursor: 'pointer'
    },
    userAvatar: {
      width: '32px',
      height: '32px',
      background: '#e2e8f0',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    heroSection: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '4rem 2rem',
      textAlign: 'center' as const
    },
    heroTitle: {
      fontSize: '2.5rem',
      fontWeight: 700,
      marginBottom: '1rem'
    },
    heroSubtitle: {
      fontSize: '1.2rem',
      opacity: 0.9,
      maxWidth: '600px',
      margin: '0 auto'
    },
    searchSection: {
      padding: '3rem 2rem',
      background: 'white'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    sectionTitle: {
      fontSize: '1.75rem',
      fontWeight: 600,
      marginBottom: '2rem',
      color: '#1f2937'
    },
    searchFilters: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      flexWrap: 'wrap' as const
    },
    searchBar: {
      flex: 1,
      minWidth: '300px'
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s'
    },
    filters: {
      display: 'flex',
      gap: '1rem'
    },
    filterSelect: {
      padding: '0.75rem 1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      background: 'white',
      fontSize: '1rem',
      cursor: 'pointer',
      outline: 'none'
    },
    projectsSection: {
      padding: '3rem 2rem',
      background: '#f8f9fa'
    },
    projectsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem'
    },
    projectCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      border: '1px solid #e5e7eb',
      cursor: 'pointer'
    },
    projectTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    location: {
      color: '#6b7280',
      fontSize: '0.9rem',
      marginBottom: '1rem'
    },
    areaInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1rem'
    },
    areaLabel: {
      color: '#6b7280',
      fontSize: '0.9rem'
    },
    areaValue: {
      fontWeight: 600,
      color: '#1f2937'
    },
    benefitsLabel: {
      color: '#6b7280',
      fontSize: '0.9rem',
      display: 'block',
      marginBottom: '0.5rem'
    },
    benefitsList: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '0.5rem',
      marginBottom: '1.5rem'
    },
    benefitTag: {
      background: '#eff6ff',
      color: '#1e40af',
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: 500
    },
    creditsSection: {
      borderTop: '1px solid #e5e7eb',
      paddingTop: '1rem'
    },
    creditsAvailable: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#059669',
      marginBottom: '1rem'
    },
    actionButtons: {
      display: 'flex',
      gap: '0.75rem'
    },
    purchaseBtn: {
      flex: 1,
      background: '#3b82f6',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    detailsBtn: {
      flex: 1,
      background: 'transparent',
      color: '#3b82f6',
      border: '2px solid #3b82f6',
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    featuresSection: {
      padding: '4rem 2rem',
      background: 'white'
    },
    featuresTitle: {
      fontSize: '2rem',
      fontWeight: 600,
      textAlign: 'center' as const,
      marginBottom: '3rem',
      color: '#1f2937'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem'
    },
    featureCard: {
      textAlign: 'center' as const,
      padding: '2rem 1rem',
      background: '#f8f9fa',
      borderRadius: '12px',
      transition: 'transform 0.2s'
    },
    featureIcon: {
      fontSize: '3rem',
      marginBottom: '1rem'
    },
    featureTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      marginBottom: '1rem',
      color: '#1f2937'
    },
    featureDescription: {
      color: '#6b7280',
      lineHeight: 1.6
    },
    footer: {
      background: '#1f2937',
      color: 'white',
      padding: '2rem',
      textAlign: 'center' as const
    },
    footerLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      marginBottom: '1rem'
    },
    footerLink: {
      color: '#9ca3af',
      textDecoration: 'none',
      transition: 'color 0.2s'
    },
    socialLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem'
    },
    socialLink: {
      display: 'inline-block',
      width: '40px',
      height: '40px',
      background: '#374151',
      borderRadius: '50%',
      textAlign: 'center' as const,
      lineHeight: '40px',
      textDecoration: 'none',
      transition: 'background-color 0.2s'
    }
  };

  const carbonProjects = [
    {
      id: 1,
      title: 'Sundarbans Mangrove Restoration',
      location: 'Coastal Region, Bangladesh',
      area: '2.5k Ha',
      benefits: ['Co-benefits', 'Biodiversity Conservation', 'Flood Protection', 'Storm Surge Mitigation'],
      credits: '1,250 CCTs Available',
      type: 'Mangrove Restoration'
    },
    {
      id: 2,
      title: 'Andaman Seagrass Revitalization',
      location: 'Andaman Sea, India',
      area: '3.8 Ha',
      benefits: ['Co-benefits', 'Marine Ecosystem Health', 'Carbon Sequestration'],
      credits: '980 CCTs Available',
      type: 'Seagrass'
    },
    {
      id: 3,
      title: 'Chilika Lagoon Tidal Area Restoration',
      location: 'Odisha Coast, India',
      area: '5.1k Ha',
      benefits: ['Co-benefits', 'Wildlife Habitat', 'Water Quality Improvement', 'Erosion Control'],
      credits: '1,800 CCTs Available',
      type: 'Tidal Restoration'
    },
    {
      id: 4,
      title: 'Coral Reef Rejuvenation Project',
      location: 'Lakshadweep Islands, India',
      area: '1.2k Ha',
      benefits: ['Co-benefits', 'Marine Biodiversity', 'Ecosystem', 'Coastal Protection'],
      credits: '750 CCTs Available',
      type: 'Coral Reef'
    },
    {
      id: 5,
      title: 'Godavari Delta Mangrove Expansion',
      location: 'Andhra Pradesh, India',
      area: '4.7k Ha',
      benefits: ['Fisheries Enhancement', 'Storm Surge Mitigation'],
      credits: '1,100 CCTs Available',
      type: 'Mangrove'
    },
    {
      id: 6,
      title: 'Gulf of Mannar Seaweed Cultivation',
      location: 'Tamil Nadu, India',
      area: '2.3k Ha',
      benefits: ['Co-benefits', 'Marine Life Support', 'Sustainable Aquaculture'],
      credits: '600 CCTs Available',
      type: 'Seaweed'
    }
  ];

  const features = [
    {
      icon: '💎',
      title: 'Instant NFT Certificates',
      description: 'Receive unique blockchain-backed certificates for every carbon credit purchased, proving ownership and impact.'
    },
    {
      icon: '📱',
      title: 'QR Code Traceability',
      description: 'Track the journey of your carbon credits with transparent QR code traceability.'
    },
    {
      icon: '♻️',
      title: 'Seamless Credit Retirement',
      description: 'Effortlessly retire your purchased credits to offset carbon footprint with permanent removal from circulation to achieve net-zero goals.'
    },
    {
      icon: '💰',
      title: 'Automated Revenue Distribution',
      description: 'Benefit from smart contract-governed revenue distribution, ensuring transparent fund allocation to communities and project developers.'
    }
  ];

  const filteredProjects = carbonProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === 'All Locations' || project.location.includes(locationFilter);
    const matchesType = typeFilter === 'All Types' || project.type === typeFilter;
    return matchesSearch && matchesLocation && matchesType;
  });

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      navigate('/');
    }
  };

  return (
    <div style={styles.buyerMarketplace}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.navContainer}>
          <div style={styles.logo}>
            <img 
              src="/clorit-logo.png" 
              alt="CLORIT Logo" 
              style={{
                width: '32px',
                height: '32px',
                marginRight: '0.75rem'
              }}
            />
            <span>CLORIT</span>
          </div>
          <nav style={styles.navMenu}>
            <button onClick={() => navigate('/corporate-dashboard')} style={{...styles.navLink, background: 'none', border: 'none', cursor: 'pointer'}}>Dashboard</button>
            <button onClick={() => navigate('/ndvi-dashboard')} style={{...styles.navLink, background: 'none', border: 'none', cursor: 'pointer'}}>Projects</button>
            <span style={{...styles.navLink, ...styles.navLinkActive}}>Marketplace</span>
            <button onClick={() => navigate('/impact-reporting')} style={{...styles.navLink, background: 'none', border: 'none', cursor: 'pointer'}}>Reporting</button>
          </nav>
          <div style={styles.userSection}>
            <button 
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                color: '#6b7280',
                cursor: 'pointer',
                fontSize: '0.9rem',
                padding: '0.5rem',
                borderRadius: '6px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f3f4f6';
                e.currentTarget.style.color = '#ef4444';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              🚪 Logout
            </button>
            <div style={styles.userAvatar}>👤</div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div>
          <h1 style={styles.heroTitle}>Corporate Buyer Marketplace</h1>
          <p style={styles.heroSubtitle}>Browse, purchase, and retire verified carbon credits from blue carbon projects.</p>
        </div>
      </section>

      {/* Search and Filters */}
      <section style={styles.searchSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Find Your Carbon Credit Project</h2>
          <div style={styles.searchFilters}>
            <div style={styles.searchBar}>
              <input
                type="text"
                placeholder="🔍 Search projects by name or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            <div style={styles.filters}>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                style={styles.filterSelect}
              >
                <option>All Locations</option>
                <option>India</option>
                <option>Bangladesh</option>
                <option>Coastal Regions</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                style={styles.filterSelect}
              >
                <option>All Types</option>
                <option>Mangrove Restoration</option>
                <option>Seagrass</option>
                <option>Coral Reef</option>
                <option>Seaweed</option>
              </select>
              <select
                value={benefitsFilter}
                onChange={(e) => setBenefitsFilter(e.target.value)}
                style={styles.filterSelect}
              >
                <option>All Co-benefits</option>
                <option>Biodiversity</option>
                <option>Coastal Protection</option>
                <option>Marine Health</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section style={styles.projectsSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Available Blue Carbon Projects</h2>
          <div style={styles.projectsGrid}>
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                style={styles.projectCard}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLDivElement;
                  target.style.transform = 'translateY(-2px)';
                  target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLDivElement;
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div>
                  <h3 style={styles.projectTitle}>{project.title}</h3>
                  <p style={styles.location}>📍 {project.location}</p>
                </div>
                
                <div style={{marginBottom: '1.5rem'}}>
                  <div style={styles.areaInfo}>
                    <span style={styles.areaLabel}>🌿 Area:</span>
                    <span style={styles.areaValue}>{project.area}</span>
                  </div>
                  
                  <div>
                    <span style={styles.benefitsLabel}>🎯 Co-benefits:</span>
                    <div style={styles.benefitsList}>
                      {project.benefits.map((benefit, index) => (
                        <span key={index} style={styles.benefitTag}>{benefit}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={styles.creditsSection}>
                  <div style={styles.creditsAvailable}>
                    {project.credits}
                    {CurrencyUtils.shouldShowConversion(project.credits) && (
                      <span style={{...CurrencyUtils.getConversionStyle(), fontSize: '0.85em', color: '#059669'}}>
                        {CurrencyUtils.getConversionString(project.credits)}
                      </span>
                    )}
                  </div>
                  <div style={styles.actionButtons}>
                    <button 
                      style={styles.purchaseBtn}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#2563eb')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = '#3b82f6')}
                    >
                      Purchase Credits
                    </button>
                    <button 
                      style={styles.detailsBtn}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#3b82f6';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#3b82f6';
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section style={styles.featuresSection}>
        <div style={styles.container}>
          <h2 style={styles.featuresTitle}>Why Choose Blue Carbon Registry?</h2>
          <div style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div 
                key={index} 
                style={styles.featureCard}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerLinks}>
            <span style={styles.footerLink}>About</span>
            <span style={styles.footerLink}>Resources</span>
            <span style={styles.footerLink}>Legal</span>
          </div>
          <div style={styles.socialLinks}>
            <span style={styles.socialLink}>📘</span>
            <span style={styles.socialLink}>🐦</span>
            <span style={styles.socialLink}>💼</span>
            <span style={styles.socialLink}>📷</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BuyerMarketplace;
