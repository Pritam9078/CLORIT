import React, { useState, useEffect } from 'react';

const NCCRWelcomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Carousel images - representing coastal research and mangrove ecosystems
  const carouselImages = [
    {
      src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      alt: 'Mangrove Forest Coastal Research',
      caption: 'Advanced Coastal Ecosystem Monitoring'
    },
    {
      src: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80',
      alt: 'Coastal Research and Development',
      caption: 'Satellite-Based Environmental Analysis'
    },
    {
      src: 'https://images.unsplash.com/photo-1569163139394-de4e5f43e4e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      alt: 'Marine Biodiversity Conservation',
      caption: 'Blue Carbon Credit Verification System'
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const styles = {
    welcomeContainer: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    
    // Government Header Section
    govHeader: {
      background: '#0066cc',
      color: 'white',
      padding: '1rem 0',
      borderBottom: '3px solid #004499'
    },
    govHeaderContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
      padding: '0 2rem'
    },
    govLogo: {
      width: '60px',
      height: '60px',
      background: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      color: '#0066cc',
      fontWeight: 'bold'
    },
    govDetails: {
      flex: 1
    },
    govTitle: {
      fontSize: '1.8rem',
      fontWeight: 700,
      marginBottom: '0.25rem',
      letterSpacing: '0.5px'
    },
    govSubtitle: {
      fontSize: '1rem',
      opacity: 0.9,
      fontWeight: 500
    },
    govMinistry: {
      fontSize: '0.875rem',
      opacity: 0.8,
      marginTop: '0.25rem'
    },
    
    // Main Content
    mainContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    },
    
    // Hero Section with Carousel
    heroSection: {
      background: 'white',
      borderRadius: '1rem',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0, 102, 204, 0.1)',
      marginBottom: '3rem',
      border: '1px solid rgba(0, 102, 204, 0.1)'
    },
    carouselContainer: {
      position: 'relative' as const,
      height: '400px',
      overflow: 'hidden'
    },
    carouselSlide: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
      transition: 'opacity 1s ease-in-out'
    },
    carouselSlideActive: {
      opacity: 1
    },
    carouselImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const
    },
    carouselOverlay: {
      position: 'absolute' as const,
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(transparent, rgba(0, 102, 204, 0.8))',
      color: 'white',
      padding: '3rem 2rem 2rem',
      fontSize: '1.5rem',
      fontWeight: 600,
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
    },
    carouselDots: {
      position: 'absolute' as const,
      bottom: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '0.5rem'
    },
    carouselDot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.5)',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    carouselDotActive: {
      background: 'white',
      transform: 'scale(1.2)'
    },
    
    // About NCCR Section
    aboutSection: {
      background: 'white',
      borderRadius: '1rem',
      padding: '3rem',
      boxShadow: '0 8px 25px rgba(0, 102, 204, 0.08)',
      marginBottom: '3rem',
      border: '1px solid rgba(0, 102, 204, 0.1)'
    },
    aboutTitle: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#0066cc',
      marginBottom: '1.5rem',
      textAlign: 'center' as const
    },
    aboutContent: {
      fontSize: '1.1rem',
      lineHeight: 1.7,
      color: '#4a5568',
      textAlign: 'justify' as const,
      marginBottom: '2rem'
    },
    
    // Research Highlights Grid
    highlightsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      marginBottom: '3rem'
    },
    highlightCard: {
      background: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 6px 20px rgba(0, 102, 204, 0.08)',
      border: '1px solid rgba(0, 102, 204, 0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    highlightIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
      display: 'block'
    },
    highlightTitle: {
      fontSize: '1.3rem',
      fontWeight: 600,
      color: '#0066cc',
      marginBottom: '1rem'
    },
    highlightDescription: {
      color: '#64748b',
      lineHeight: 1.6,
      fontSize: '0.95rem'
    },
    
    // News & Announcements
    newsSection: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '3rem',
      marginBottom: '3rem'
    },
    newsMain: {
      background: 'white',
      borderRadius: '1rem',
      padding: '2.5rem',
      boxShadow: '0 8px 25px rgba(0, 102, 204, 0.08)',
      border: '1px solid rgba(0, 102, 204, 0.1)'
    },
    newsTitle: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#0066cc',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    newsItem: {
      padding: '1.5rem 0',
      borderBottom: '1px solid #e2e8f0'
    },
    newsItemTitle: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#1e293b',
      marginBottom: '0.5rem',
      lineHeight: 1.4
    },
    newsItemDate: {
      fontSize: '0.875rem',
      color: '#64748b',
      marginBottom: '0.5rem'
    },
    newsItemSummary: {
      fontSize: '0.95rem',
      color: '#4a5568',
      lineHeight: 1.5
    },
    
    // Quick Links Sidebar
    quickLinks: {
      background: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 8px 25px rgba(0, 102, 204, 0.08)',
      border: '1px solid rgba(0, 102, 204, 0.1)',
      height: 'fit-content'
    },
    quickLinksTitle: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#0066cc',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    linkItem: {
      display: 'block',
      padding: '1rem',
      color: '#4a5568',
      textDecoration: 'none',
      borderRadius: '0.5rem',
      marginBottom: '0.5rem',
      transition: 'all 0.3s ease',
      border: '1px solid transparent'
    },
    
    // Statistics Section
    statsSection: {
      background: 'linear-gradient(135deg, #0066cc 0%, #004499 100%)',
      color: 'white',
      borderRadius: '1rem',
      padding: '3rem',
      marginBottom: '3rem'
    },
    statsTitle: {
      fontSize: '2rem',
      fontWeight: 700,
      textAlign: 'center' as const,
      marginBottom: '2rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem'
    },
    statCard: {
      textAlign: 'center' as const,
      padding: '1.5rem'
    },
    statNumber: {
      fontSize: '3rem',
      fontWeight: 800,
      marginBottom: '0.5rem',
      color: '#ffd700'
    },
    statLabel: {
      fontSize: '1.1rem',
      opacity: 0.9,
      fontWeight: 500
    },
    
    // Footer Section
    footerSection: {
      background: '#1e293b',
      color: 'white',
      borderRadius: '1rem',
      padding: '2.5rem',
      textAlign: 'center' as const
    },
    footerTitle: {
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBottom: '1rem'
    },
    footerContent: {
      fontSize: '1rem',
      opacity: 0.8,
      lineHeight: 1.6,
      marginBottom: '1.5rem'
    },
    contactInfo: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      marginTop: '2rem'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      justifyContent: 'center'
    }
  };

  const researchHighlights = [
    {
      icon: '🛰️',
      title: 'Satellite Remote Sensing',
      description: 'Advanced satellite-based monitoring of coastal ecosystems using multi-spectral imagery and AI analysis for real-time environmental assessment.'
    },
    {
      icon: '🌊',
      title: 'Coastal Zone Management',
      description: 'Comprehensive coastal zone management strategies integrating climate change adaptation and sustainable development practices.'
    },
    {
      icon: '🔬',
      title: 'Marine Biodiversity',
      description: 'Research on marine biodiversity conservation, ecosystem services, and sustainable fisheries management in coastal regions.'
    },
    {
      icon: '📊',
      title: 'Environmental Modeling',
      description: 'Development of predictive models for coastal erosion, sea-level rise impacts, and ecosystem vulnerability assessments.'
    },
    {
      icon: '🌱',
      title: 'Blue Carbon Research',
      description: 'Investigation of blue carbon ecosystems including mangroves, seagrass beds, and salt marshes for climate mitigation.'
    },
    {
      icon: '⚡',
      title: 'Renewable Energy',
      description: 'Research on offshore renewable energy potential including wind, wave, and tidal energy systems for sustainable coastal development.'
    }
  ];

  const newsItems = [
    {
      title: 'NCCR Launches Advanced Blue Carbon Verification System',
      date: 'September 15, 2025',
      summary: 'New blockchain-based verification system for blue carbon credits launched in collaboration with coastal communities across India.'
    },
    {
      title: 'Successful Mangrove Restoration Project in Sundarbans',
      date: 'September 10, 2025',
      summary: 'NCCR announces successful completion of 500-hectare mangrove restoration project with 85% survival rate and significant carbon sequestration.'
    },
    {
      title: 'International Workshop on Coastal Resilience',
      date: 'September 5, 2025',
      summary: 'NCCR hosts international workshop on coastal resilience strategies, bringing together researchers from 15 countries.'
    }
  ];

  return (
    <div style={styles.welcomeContainer}>
      {/* Government Header */}
      <header style={styles.govHeader}>
        <div style={styles.govHeaderContent}>
          <div style={styles.govLogo}>
            🇮🇳
          </div>
          <div style={styles.govDetails}>
            <h1 style={styles.govTitle}>National Centre for Coastal Research</h1>
            <div style={styles.govSubtitle}>भारत सरकार - पृथ्वी विज्ञान मंत्रालय</div>
            <div style={styles.govMinistry}>Ministry of Earth Sciences, Government of India</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.mainContent}>
        {/* Hero Section with Carousel */}
        <section style={styles.heroSection}>
          <div style={styles.carouselContainer}>
            {carouselImages.map((image, index) => (
              <div
                key={index}
                style={{
                  ...styles.carouselSlide,
                  ...(index === currentSlide ? styles.carouselSlideActive : {})
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  style={styles.carouselImage}
                />
                <div style={styles.carouselOverlay}>
                  {image.caption}
                </div>
              </div>
            ))}
            
            {/* Carousel Dots */}
            <div style={styles.carouselDots}>
              {carouselImages.map((_, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.carouselDot,
                    ...(index === currentSlide ? styles.carouselDotActive : {})
                  }}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* About NCCR Section */}
        <section style={styles.aboutSection}>
          <h2 style={styles.aboutTitle}>About National Centre for Coastal Research</h2>
          <div style={styles.aboutContent}>
            In 1997, Government of India implemented Environment Management Capacity Building (EMCB) 
            programme for Asia and the Pacific as a part of the Asian Development Bank. 
            The Department of Ocean Development (DOD) established a Project Directorate, 
            Integrated Coastal and Marine Area Management (ICMAM), Project Directorate at Chennai in 
            January 1998 with the approval of Cabinet Committee on Economic Affairs to implement the 
            EMCB programme. After completion of the World Bank funded demonstration projects, 
            the Government of India decided and directed ICMAM-PD to continue the activities of ICMAM-PD.
          </div>
        </section>

        {/* Research Highlights */}
        <section style={styles.highlightsGrid}>
          {researchHighlights.map((highlight, index) => (
            <div
              key={index}
              style={styles.highlightCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 102, 204, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 102, 204, 0.08)';
              }}
            >
              <span style={styles.highlightIcon}>{highlight.icon}</span>
              <h3 style={styles.highlightTitle}>{highlight.title}</h3>
              <p style={styles.highlightDescription}>{highlight.description}</p>
            </div>
          ))}
        </section>

        {/* News & Quick Links */}
        <section style={styles.newsSection}>
          <div style={styles.newsMain}>
            <h2 style={styles.newsTitle}>
              📰 News & Announcements
            </h2>
            {newsItems.map((news, index) => (
              <div key={index} style={styles.newsItem}>
                <h3 style={styles.newsItemTitle}>{news.title}</h3>
                <div style={styles.newsItemDate}>{news.date}</div>
                <p style={styles.newsItemSummary}>{news.summary}</p>
              </div>
            ))}
          </div>

          <div style={styles.quickLinks}>
            <h3 style={styles.quickLinksTitle}>
              🔗 Quick Links
            </h3>
            <a href="#research" style={styles.linkItem}
               onMouseEnter={(e) => {
                 e.currentTarget.style.background = '#f1f5f9';
                 e.currentTarget.style.borderColor = '#0066cc';
                 e.currentTarget.style.color = '#0066cc';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.background = 'transparent';
                 e.currentTarget.style.borderColor = 'transparent';
                 e.currentTarget.style.color = '#4a5568';
               }}>
              🔬 Research Programs
            </a>
            <a href="#publications" style={styles.linkItem}
               onMouseEnter={(e) => {
                 e.currentTarget.style.background = '#f1f5f9';
                 e.currentTarget.style.borderColor = '#0066cc';
                 e.currentTarget.style.color = '#0066cc';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.background = 'transparent';
                 e.currentTarget.style.borderColor = 'transparent';
                 e.currentTarget.style.color = '#4a5568';
               }}>
              📚 Publications
            </a>
            <a href="#datasets" style={styles.linkItem}
               onMouseEnter={(e) => {
                 e.currentTarget.style.background = '#f1f5f9';
                 e.currentTarget.style.borderColor = '#0066cc';
                 e.currentTarget.style.color = '#0066cc';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.background = 'transparent';
                 e.currentTarget.style.borderColor = 'transparent';
                 e.currentTarget.style.color = '#4a5568';
               }}>
              📊 Data & Resources
            </a>
            <a href="#collaborations" style={styles.linkItem}
               onMouseEnter={(e) => {
                 e.currentTarget.style.background = '#f1f5f9';
                 e.currentTarget.style.borderColor = '#0066cc';
                 e.currentTarget.style.color = '#0066cc';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.background = 'transparent';
                 e.currentTarget.style.borderColor = 'transparent';
                 e.currentTarget.style.color = '#4a5568';
               }}>
              🤝 Collaborations
            </a>
            <a href="#events" style={styles.linkItem}
               onMouseEnter={(e) => {
                 e.currentTarget.style.background = '#f1f5f9';
                 e.currentTarget.style.borderColor = '#0066cc';
                 e.currentTarget.style.color = '#0066cc';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.background = 'transparent';
                 e.currentTarget.style.borderColor = 'transparent';
                 e.currentTarget.style.color = '#4a5568';
               }}>
              📅 Events & Workshops
            </a>
          </div>
        </section>

        {/* Statistics Section */}
        <section style={styles.statsSection}>
          <h2 style={styles.statsTitle}>Research Impact & Achievements</h2>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>150+</div>
              <div style={styles.statLabel}>Research Projects</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>500+</div>
              <div style={styles.statLabel}>Publications</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>25+</div>
              <div style={styles.statLabel}>Patents Filed</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>50+</div>
              <div style={styles.statLabel}>International Collaborations</div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section style={styles.footerSection}>
          <h3 style={styles.footerTitle}>Contact Information</h3>
          <div style={styles.footerContent}>
            National Centre for Coastal Research (NCCR)<br />
            (Formerly ICMAM Project Directorate)<br />
            NIOT Campus, Pallikaranai, Chennai - 600 100
          </div>
          <div style={styles.contactInfo}>
            <div style={styles.contactItem}>
              <span>📞</span>
              <span>+91 44 66783500</span>
            </div>
            <div style={styles.contactItem}>
              <span>📧</span>
              <span>nccr@nccr.gov.in</span>
            </div>
            <div style={styles.contactItem}>
              <span>🌐</span>
              <span>www.nccr.gov.in</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NCCRWelcomePage;
