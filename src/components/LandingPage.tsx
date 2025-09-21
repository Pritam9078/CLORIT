import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import ConnectWithUsSection from './ConnectWithUsSection';

// Social Media Icon Component with official brand colors and accessibility
interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  title: string;
  brandColor: string;
  glowColor: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'topBar' | 'footer';
}

const SocialIcon: React.FC<SocialIconProps> = ({ 
  href, 
  icon, 
  label, 
  title, 
  brandColor, 
  glowColor, 
  size = 'medium',
  variant = 'footer' 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const baseStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    outline: 'none',
    border: 'none',
  };

  const sizeStyles = {
    small: { width: '32px', height: '32px', fontSize: '1rem' },
    medium: { width: '48px', height: '48px', fontSize: '1.25rem' },
    large: { width: '56px', height: '56px', fontSize: '1.5rem' }
  };

  const variantStyles = {
    topBar: {
      borderRadius: '8px',
      background: isHovered ? brandColor : 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      boxShadow: isHovered ? `0 4px 20px ${glowColor}` : 'none'
    },
    footer: {
      borderRadius: '12px',
      background: isHovered ? brandColor : 'rgba(255, 255, 255, 0.95)',
      color: isHovered ? 'white' : brandColor,
      border: `2px solid ${isHovered ? brandColor : 'rgba(255, 255, 255, 0.8)'}`,
      transform: isHovered ? 'translateY(-3px) scale(1.05)' : 'translateY(0) scale(1)',
      boxShadow: isHovered ? `0 8px 25px ${glowColor}` : '0 4px 15px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)'
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={title}
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {icon}
    </a>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [counters, setCounters] = useState({
    projects: 0,
    co2: 0,
    credits: 0,
    traders: 0
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Animated counters effect
  useEffect(() => {
    const animateCounters = () => {
      const targets = { projects: 150, co2: 50000, credits: 45000, traders: 1200 };
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setCounters({
          projects: Math.floor(targets.projects * progress),
          co2: Math.floor(targets.co2 * progress),
          credits: Math.floor(targets.credits * progress),
          traders: Math.floor(targets.traders * progress)
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounters(targets);
        }
      }, stepTime);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id === 'metrics') {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    });

    const metricsElement = document.getElementById('metrics');
    if (metricsElement) {
      observer.observe(metricsElement);
    }

    return () => observer.disconnect();
  }, []);

  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      lineHeight: 1.6,
      color: '#333',
      margin: 0,
      padding: 0,
      overflow: 'hidden auto'
    },

    // Header / Navbar
    header: {
      position: 'sticky' as const,
      top: 0,
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(226, 232, 240, 0.5)'
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#2563eb',
      textDecoration: 'none'
    },
    logoImage: {
      width: '40px',
      height: '40px',
      borderRadius: '8px'
    },
    navMenu: {
      display: 'flex',
      gap: '2rem',
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    navLink: {
      color: '#64748b',
      textDecoration: 'none',
      fontWeight: 500,
      transition: 'color 0.3s ease',
      cursor: 'pointer'
    },
    ctaButton: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block'
    },
    authButtons: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    },
    loginButton: {
      background: 'transparent',
      color: '#374151',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: '2px solid #e5e7eb',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block'
    },

    // Hero Section
    hero: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #10b981 75%, #3b82f6 100%)',
      position: 'relative' as const,
      overflow: 'hidden',
      textAlign: 'center' as const,
      padding: isMobile ? '4rem 1rem 2rem 1rem' : '4rem 2rem 3rem 2rem'
    },
    heroContent: {
      maxWidth: '800px',
      zIndex: 2,
      position: 'relative' as const
    },
    heroHeadline: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: 800,
      color: 'white',
      marginBottom: isMobile ? '1rem' : '1.25rem',
      textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      lineHeight: 1.2
    },
    heroSubheadline: {
      fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: isMobile ? '2rem' : '2.5rem',
      lineHeight: 1.6,
      textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
    },
    heroButtons: {
      display: 'flex',
      gap: '1.5rem',
      justifyContent: 'center',
      flexWrap: 'wrap' as const
    },
    heroPrimaryBtn: {
      background: 'rgba(255, 255, 255, 0.95)',
      color: '#2563eb',
      padding: '1rem 2rem',
      borderRadius: '12px',
      border: 'none',
      fontSize: '1.1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
      minWidth: '180px'
    },
    heroSecondaryBtn: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '12px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      fontSize: '1.1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      minWidth: '180px'
    },

    // Impact Metrics Section
    metrics: {
      background: 'white',
      padding: isMobile ? '2rem 1rem' : '3rem 2rem',
      textAlign: 'center' as const
    },
    metricsContainer: {
      maxWidth: '1000px',
      margin: '0 auto'
    },
    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: isMobile ? '2rem' : '2.5rem',
      marginTop: isMobile ? '2rem' : '2.5rem'
    },
    metricCard: {
      padding: isMobile ? '1.5rem 0.75rem' : '2rem 1rem'
    },
    metricIcon: {
      fontSize: '3rem',
      marginBottom: isMobile ? '0.75rem' : '1rem',
      display: 'block'
    },
    metricNumber: {
      fontSize: '2.5rem',
      fontWeight: 800,
      color: '#2563eb',
      marginBottom: '0.5rem'
    },
    metricLabel: {
      color: '#64748b',
      fontSize: '1.1rem',
      fontWeight: 500
    },

    // Features Section
    features: {
      background: '#f8fafc',
      padding: isMobile ? '2rem 1rem' : '3rem 2rem'
    },
    featuresContainer: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    sectionTitle: {
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
      fontWeight: 700,
      textAlign: 'center' as const,
      marginBottom: isMobile ? '2rem' : '2.5rem',
      color: '#1e293b'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem'
    },
    featureCard: {
      background: 'white',
      padding: isMobile ? '1.5rem' : '2rem',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      border: '1px solid #e2e8f0'
    },
    featureIcon: {
      fontSize: '2.5rem',
      marginBottom: isMobile ? '0.75rem' : '1rem',
      display: 'block'
    },
    featureTitle: {
      fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
      fontWeight: 600,
      marginBottom: isMobile ? '0.75rem' : '1rem',
      color: '#1e293b'
    },
    featureDescription: {
      color: '#64748b',
      lineHeight: 1.6
    },

    // How It Works Section
    howItWorks: {
      background: 'white',
      padding: isMobile ? '2rem 1rem' : '3rem 2rem'
    },
    stepsContainer: {
      maxWidth: '1000px',
      margin: '0 auto'
    },
    stepsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: isMobile ? '2rem' : '2.5rem',
      marginTop: isMobile ? '2rem' : '2.5rem'
    },
    stepCard: {
      textAlign: 'center' as const,
      position: 'relative' as const,
      padding: isMobile ? '1.5rem 0.75rem' : '2rem 1rem'
    },
    stepNumber: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      fontWeight: 700,
      margin: isMobile ? '0 auto 1rem auto' : '0 auto 1.25rem auto'
    },
    stepTitle: {
      fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
      fontWeight: 600,
      marginBottom: isMobile ? '0.75rem' : '1rem',
      color: '#1e293b'
    },
    stepDescription: {
      color: '#64748b',
      lineHeight: 1.6
    },

    // Dashboard Preview Section
    dashboardPreview: {
      background: '#f8fafc',
      padding: isMobile ? '2rem 1rem' : '3rem 2rem'
    },
    previewContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '2rem' : '3rem',
      alignItems: 'center'
    },
    previewContent: {
      paddingRight: isMobile ? '0' : '1rem'
    },
    previewTitle: {
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      fontWeight: 700,
      marginBottom: isMobile ? '1rem' : '1.25rem',
      color: '#1e293b'
    },
    previewDescription: {
      color: '#64748b',
      marginBottom: isMobile ? '1.5rem' : '1.75rem',
      lineHeight: 1.6
    },
    previewFeatures: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    previewFeature: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '1rem',
      color: '#1e293b'
    },
    dashboardImage: {
      width: '100%',
      height: '400px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '1.2rem',
      fontWeight: 600,
      textAlign: 'center' as const,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
    },

    // CTA Section
    ctaSection: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #10b981 75%, #3b82f6 100%)',
      padding: isMobile ? '2.5rem 1rem' : '3rem 2rem',
      textAlign: 'center' as const,
      color: 'white'
    },
    ctaTitle: {
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
      fontWeight: 700,
      marginBottom: isMobile ? '0.75rem' : '1rem'
    },
    ctaSubtext: {
      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
      marginBottom: isMobile ? '2rem' : '2.25rem',
      maxWidth: '600px',
      margin: isMobile ? '0 auto 2rem auto' : '0 auto 2.25rem auto',
      opacity: 0.9
    },
    ctaMainButton: {
      background: 'white',
      color: '#2563eb',
      padding: '1.25rem 3rem',
      borderRadius: '12px',
      border: 'none',
      fontSize: '1.2rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)'
    },

    // FAQ Section
    faq: {
      background: 'white',
      padding: isMobile ? '2rem 1rem' : '3rem 2rem'
    },
    faqContainer: {
      maxWidth: '800px',
      margin: '0 auto'
    },
    faqItem: {
      borderBottom: '1px solid #e2e8f0',
      marginBottom: '1rem'
    },
    faqQuestion: {
      width: '100%',
      padding: '1.5rem 0',
      background: 'none',
      border: 'none',
      textAlign: 'left' as const,
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#1e293b',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    faqAnswer: {
      padding: '0 0 1.5rem 0',
      color: '#64748b',
      lineHeight: 1.6
    },
    faqIcon: {
      transition: 'transform 0.3s ease'
    },

    // Footer
    footer: {
      background: '#1e293b',
      color: 'white',
      padding: isMobile ? '2rem 1rem 1.5rem 1rem' : '2.5rem 2rem 1.5rem 2rem'
    },
    footerContainer: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    footerContent: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: isMobile ? '1.5rem' : '2rem',
      marginBottom: isMobile ? '1.5rem' : '2rem'
    },
    footerSection: {
      textAlign: 'left' as const
    },
    footerTitle: {
      fontSize: '1.2rem',
      fontWeight: 600,
      marginBottom: '1rem'
    },
    footerLinks: {
      display: 'flex',
      gap: '2rem',
      marginBottom: '1rem'
    },
    footerLink: {
      color: '#94a3b8',
      textDecoration: 'none',
      transition: 'color 0.3s ease'
    },
    socialIcons: {
      display: 'flex',
      gap: isMobile ? '1rem' : '1.5rem',
      flexWrap: 'wrap' as const,
      justifyContent: 'center',
      flexDirection: isMobile ? 'column' as const : 'row' as const,
      alignItems: 'center',
      marginBottom: '2rem'
    },
    socialIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textDecoration: 'none',
      fontSize: '1.4rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
      border: '2px solid transparent'
    },
    socialIconTwitter: {
      background: 'linear-gradient(135deg, #1DA1F2 0%, #0d8bd9 100%)',
      boxShadow: '0 4px 15px rgba(29, 161, 242, 0.3)'
    },
    socialIconLinkedIn: {
      background: 'linear-gradient(135deg, #0077B5 0%, #005885 100%)',
      boxShadow: '0 4px 15px rgba(0, 119, 181, 0.3)'
    },
    socialIconInstagram: {
      background: 'linear-gradient(135deg, #E4405F 0%, #C13584 50%, #833AB4 100%)',
      boxShadow: '0 4px 15px rgba(228, 64, 95, 0.3)'
    },
    socialIconEmail: {
      background: 'linear-gradient(135deg, #EA4335 0%, #34A853 25%, #FBBC05 50%, #4285F4 100%)',
      boxShadow: '0 4px 15px rgba(66, 133, 244, 0.3)'
    },
    contactSection: {
      marginTop: '1.5rem',
      padding: '1.5rem',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    footerContactTitle: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#f8fafc',
      marginBottom: '1rem',
      textAlign: 'center' as const
    },
    contactEmail: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1.5rem',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      color: '#f8fafc',
      textDecoration: 'none',
      fontSize: '0.95rem',
      fontWeight: 500,
      transition: 'all 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    footerBottom: {
      borderTop: '1px solid #334155',
      paddingTop: '2rem',
      textAlign: 'center' as const,
      color: '#94a3b8'
    },
    // Footer social media styles
    footerSocialSection: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    footerSocialIcons: {
      display: 'flex',
      gap: '15px',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap' as const,
      ...(isMobile && {
        gap: '20px', // Slightly larger gap on mobile for better touch targets
        flexDirection: 'row' as const
      })
    },
    footerSocialIcon: {
      width: '24px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#9CA3AF', // Gray color by default
      textDecoration: 'none',
      fontSize: '20px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      outline: 'none',
      ...(isMobile && {
        width: '28px', // Slightly larger on mobile for better touch targets
        height: '28px',
        fontSize: '22px'
      })
    },
    contact: {
      padding: isMobile ? '2.5rem 1rem' : '3rem 2rem',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      textAlign: 'center' as const
    },
    contactContainer: {
      maxWidth: '800px',
      margin: '0 auto'
    },
    contactTitle: {
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 700,
      color: '#1e293b',
      marginBottom: isMobile ? '0.75rem' : '1rem',
      background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text' as const
    },
    contactSubtitle: {
      fontSize: 'clamp(1rem, 2vw, 1.25rem)',
      color: '#64748b',
      marginBottom: isMobile ? '2rem' : '2.5rem',
      lineHeight: 1.6
    },
    contactForm: {
      background: 'white',
      borderRadius: '1rem',
      padding: '3rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      border: '1px solid rgba(226, 232, 240, 0.6)',
      textAlign: 'left' as const
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1.5rem',
      marginBottom: '1.5rem',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
        gap: '1rem'
      }
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    formLabel: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#374151',
      marginBottom: '0.5rem'
    },
    formInput: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      outline: 'none',
      fontFamily: 'inherit'
    },
    formTextarea: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      outline: 'none',
      fontFamily: 'inherit',
      minHeight: '120px',
      resize: 'vertical' as const
    },
    submitButton: {
      width: '100%',
      padding: '1rem 2rem',
      background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '0.75rem',
      fontSize: '1.125rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)',
      letterSpacing: '0.025em'
    },
    submitButtonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed'
    },
    statusMessage: {
      padding: '1rem',
      borderRadius: '0.5rem',
      marginTop: '1rem',
      textAlign: 'center' as const,
      fontWeight: 500
    },
    successMessage: {
      background: '#dcfce7',
      color: '#166534',
      border: '1px solid #bbf7d0'
    },
    errorMessage: {
      background: '#fef2f2',
      color: '#dc2626',
      border: '1px solid #fecaca'
    }
  };

  const features = [
    {
      icon: '🔐',
      title: 'Blockchain Security',
      description: 'Immutable records and smart contracts ensure transparent, tamper-proof carbon credit transactions.'
    },
    {
      icon: '🛰️',
      title: 'Satellite Monitoring',
      description: 'Real-time satellite imagery and AI analysis for continuous project monitoring and verification.'
    },
    {
      icon: '🔄',
      title: 'Automated MRV',
      description: 'Measurement, Reporting, and Verification automated through IoT sensors and satellite data.'
    },
    {
      icon: '✅',
      title: 'Verified Credits',
      description: 'Gold standard verified carbon credits with full traceability and impact documentation.'
    },
    {
      icon: '📊',
      title: 'Market Analytics',
      description: 'Advanced analytics and insights for optimal trading decisions and market trends.'
    },
    {
      icon: '🤝',
      title: 'Community Driven',
      description: 'Empowering local communities through transparent governance and fair revenue distribution.'
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'Register Project',
      description: 'Upload project details, GIS data, and baseline measurements to our secure blockchain registry.'
    },
    {
      number: 2,
      title: 'Verification',
      description: 'Satellite-powered MRV system conducts automated verification with third-party audits.'
    },
    {
      number: 3,
      title: 'Earn & Trade',
      description: 'Receive verified carbon credits and trade them in our integrated marketplace.'
    }
  ];

  const faqs = [
    {
      question: 'How does CLORIT verification work?',
      answer: 'CLORIT uses a combination of satellite monitoring, IoT sensors, and AI analysis to continuously verify carbon sequestration. Our automated MRV system provides real-time data, while third-party auditors conduct periodic reviews to ensure compliance with international standards.'
    },
    {
      question: 'What are blue carbon credits?',
      answer: 'Blue carbon credits represent verified carbon dioxide removal or reduction from coastal and marine ecosystems like mangroves, seagrass beds, and salt marshes. These ecosystems are highly effective at capturing and storing carbon, making them valuable for climate mitigation.'
    },
    {
      question: 'Who can register projects?',
      answer: 'Any organization or community managing coastal restoration projects can register, including NGOs, government agencies, private companies, and local communities. Projects must meet our eligibility criteria and verification standards.'
    },
    {
      question: 'How secure is the blockchain registry?',
      answer: 'Our blockchain infrastructure uses enterprise-grade security with multi-signature wallets, smart contract audits, and decentralized storage. All transactions are immutable and publicly verifiable while maintaining data privacy.'
    },
    {
      question: 'How do corporates retire credits?',
      answer: 'Corporates can purchase and retire credits directly through our marketplace. Retired credits are permanently removed from circulation and linked to the corporate\'s sustainability reporting with full audit trails.'
    },
    {
      question: 'What monitoring technology is used?',
      answer: 'We utilize high-resolution satellite imagery, drone surveys, IoT sensors for water quality and biomass monitoring, and AI algorithms for automated change detection and carbon calculation.'
    },
    {
      question: 'How are communities involved?',
      answer: 'Local communities are integral partners in project management. They receive fair revenue sharing, participate in governance decisions, and benefit from capacity building programs and sustainable livelihood opportunities.'
    }
  ];

  const handleGetStarted = () => {
    navigate('/signup-options');
  };

  const handleLogin = () => {
    navigate('/login-options');
  };

  const handleExploreMarketplace = () => {
    navigate('/buyer-marketplace');
  };

  const handleStartProject = () => {
    navigate('/land-registration');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/xwpnaeqn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setContactForm({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header / Navbar */}
      <header style={styles.header}>
        <nav style={styles.navbar}>
          <a href="#hero" style={styles.logo}>
            <img 
              src="https://i.postimg.cc/02Zv32bV/Screenshot-2025-09-05-at-17-05-30-removebg-preview.png" 
              alt="CLORIT Logo" 
              style={styles.logoImage}
            />
            CLORIT
          </a>
          
          <ul style={styles.navMenu}>
            <li><a href="#features" style={styles.navLink} onClick={() => scrollToSection('features')}>Features</a></li>
            <li><a href="#how-it-works" style={styles.navLink} onClick={() => scrollToSection('how-it-works')}>How It Works</a></li>
            <li><a href="#dashboard" style={styles.navLink} onClick={() => scrollToSection('dashboard')}>Dashboard</a></li>
            <li><a href="#faq" style={styles.navLink} onClick={() => scrollToSection('faq')}>Support</a></li>
            <li><a href="#contact" style={styles.navLink} onClick={() => scrollToSection('contact')}>Contact</a></li>
          </ul>
          
          <div style={styles.authButtons}>
            <button 
              style={styles.loginButton}
              onClick={handleLogin}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                e.currentTarget.style.color = '#3b82f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#374151';
              }}
            >
              Login
            </button>
            <button 
              style={styles.ctaButton}
              onClick={handleGetStarted}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Sign Up
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroHeadline}>
            Blue Carbon Registry for a Sustainable Future
          </h1>
          <p style={styles.heroSubheadline}>
            Harness blockchain and satellite monitoring to create, verify, and trade blue carbon credits from mangroves, seagrass, and wetlands.
          </p>
          <div style={styles.heroButtons}>
            <button 
              style={styles.heroPrimaryBtn}
              onClick={handleGetStarted}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.2)';
              }}
            >
              Get Started Free
            </button>
            <button 
              style={styles.heroSecondaryBtn}
              onClick={handleLogin}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Login to Platform
            </button>
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section id="metrics" style={styles.metrics}>
        <div style={styles.metricsContainer}>
          <h2 style={styles.sectionTitle}>Global Impact</h2>
          <div style={styles.metricsGrid}>
            <div style={styles.metricCard}>
              <span style={styles.metricIcon}>🌱</span>
              <div style={styles.metricNumber}>{counters.projects}+</div>
              <div style={styles.metricLabel}>Projects Registered</div>
            </div>
            <div style={styles.metricCard}>
              <span style={styles.metricIcon}>🌍</span>
              <div style={styles.metricNumber}>{counters.co2.toLocaleString()}t</div>
              <div style={styles.metricLabel}>CO₂ Captured</div>
            </div>
            <div style={styles.metricCard}>
              <span style={styles.metricIcon}>💎</span>
              <div style={styles.metricNumber}>{counters.credits.toLocaleString()}</div>
              <div style={styles.metricLabel}>Credits Issued</div>
            </div>
            <div style={styles.metricCard}>
              <span style={styles.metricIcon}>🤝</span>
              <div style={styles.metricNumber}>{counters.traders.toLocaleString()}+</div>
              <div style={styles.metricLabel}>Active Traders</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" style={styles.features}>
        <div style={styles.featuresContainer}>
          <h2 style={styles.sectionTitle}>Why Choose CLORIT?</h2>
          <div style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div 
                key={index} 
                style={styles.featureCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                }}
              >
                <span style={styles.featureIcon}>{feature.icon}</span>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={styles.howItWorks}>
        <div style={styles.stepsContainer}>
          <h2 style={styles.sectionTitle}>How It Works</h2>
          <div style={styles.stepsGrid}>
            {steps.map((step, index) => (
              <div key={index} style={styles.stepCard}>
                <div style={styles.stepNumber}>{step.number}</div>
                <h3 style={styles.stepTitle}>{step.title}</h3>
                <p style={styles.stepDescription}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section id="dashboard" style={styles.dashboardPreview}>
        <div style={styles.previewContainer}>
          <div style={styles.previewContent}>
            <h2 style={styles.previewTitle}>Advanced Analytics Dashboard</h2>
            <p style={styles.previewDescription}>
              Monitor your projects with real-time insights, track carbon sequestration, and optimize trading strategies with our comprehensive analytics platform.
            </p>
            <ul style={styles.previewFeatures}>
              <li style={styles.previewFeature}>
                <span>📊</span> Advanced Analytics & Reporting
              </li>
              <li style={styles.previewFeature}>
                <span>📈</span> Market Insights & Trends
              </li>
              <li style={styles.previewFeature}>
                <span>🔄</span> Automated Verification Status
              </li>
              <li style={styles.previewFeature}>
                <span>🎯</span> Impact Tracking & Metrics
              </li>
            </ul>
          </div>
          <div style={styles.dashboardImage}>
            🖥️ Interactive Dashboard Preview
            <br />
            Real-time Analytics & Monitoring
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to make an impact?</h2>
        <p style={styles.ctaSubtext}>
          Join thousands of communities, NGOs, and corporates creating a sustainable future through verified blue carbon credits.
        </p>
        <button 
          style={styles.ctaMainButton}
          onClick={handleGetStarted}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.2)';
          }}
        >
          Get Started Today
        </button>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={styles.faq}>
        <div style={styles.faqContainer}>
          <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div key={index} style={styles.faqItem}>
              <button 
                style={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                {faq.question}
                <span style={{
                  ...styles.faqIcon,
                  transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)'
                }}>
                  ▼
                </span>
              </button>
              {openFaq === index && (
                <div style={styles.faqAnswer}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
          <div style={{ textAlign: 'center', marginTop: isMobile ? '2rem' : '2.5rem' }}>
            <button 
              style={styles.ctaButton}
              onClick={() => scrollToSection('contact')}
            >
              Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" style={styles.contact}>
        <div style={styles.contactContainer}>
          <h2 style={styles.contactTitle}>Get in Touch</h2>
          <p style={styles.contactSubtitle}>
            Have questions about CLORIT? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          
          <form style={{
            ...styles.contactForm,
            padding: window.innerWidth <= 768 ? '2rem' : '3rem'
          }} onSubmit={handleContactFormSubmit}>
            <div style={{
              ...styles.formGrid,
              gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr'
            }}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor="name">Full Name *</label>
                <input
                  style={{
                    ...styles.formInput,
                    borderColor: contactForm.name ? '#3b82f6' : '#e5e7eb'
                  }}
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactFormChange}
                  required
                  placeholder="Your full name"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = contactForm.name ? '#3b82f6' : '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor="email">Email Address *</label>
                <input
                  style={{
                    ...styles.formInput,
                    borderColor: contactForm.email ? '#3b82f6' : '#e5e7eb'
                  }}
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactFormChange}
                  required
                  placeholder="your.email@example.com"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = contactForm.email ? '#3b82f6' : '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel} htmlFor="subject">Subject *</label>
              <input
                style={{
                  ...styles.formInput,
                  borderColor: contactForm.subject ? '#3b82f6' : '#e5e7eb'
                }}
                type="text"
                id="subject"
                name="subject"
                value={contactForm.subject}
                onChange={handleContactFormChange}
                required
                placeholder="What is this regarding?"
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = contactForm.subject ? '#3b82f6' : '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel} htmlFor="message">Message *</label>
              <textarea
                style={{
                  ...styles.formTextarea,
                  borderColor: contactForm.message ? '#3b82f6' : '#e5e7eb'
                }}
                id="message"
                name="message"
                value={contactForm.message}
                onChange={handleContactFormChange}
                required
                placeholder="Tell us how we can help you..."
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = contactForm.message ? '#3b82f6' : '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <button
              type="submit"
              style={{
                ...styles.submitButton,
                ...(isSubmitting ? styles.submitButtonDisabled : {})
              }}
              disabled={isSubmitting}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 15px 25px rgba(59, 130, 246, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(59, 130, 246, 0.3)';
                }
              }}
            >
              {isSubmitting ? '🔄 Sending...' : '📧 Send Message'}
            </button>
            
            {submitStatus === 'success' && (
              <div style={{...styles.statusMessage, ...styles.successMessage}}>
                ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div style={{...styles.statusMessage, ...styles.errorMessage}}>
                ❌ Sorry, there was an error sending your message. Please try again later.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Enhanced Connect With Us Section */}
      <ConnectWithUsSection />

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerContent}>
            <div style={styles.footerSection}>
              <h4 style={styles.footerTitle}>Platform</h4>
              <div style={styles.footerLinks}>
                <a href="#about" style={styles.footerLink}>About</a>
                <a href="#privacy" style={styles.footerLink}>Privacy</a>
                <a href="#terms" style={styles.footerLink}>Terms</a>
                <a href="#contact" style={styles.footerLink}>Contact</a>
              </div>
            </div>
            <div style={styles.footerSection}>
              <h4 style={styles.footerTitle}>Contact Us</h4>
              <div style={styles.contactSection}>
                <a 
                  href="mailto:clorit2025@gmail.com" 
                  style={styles.contactEmail}
                  aria-label="Send us an email"
                  title="Contact CLORIT via email"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(66, 133, 244, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <FaEnvelope style={{ marginRight: '0.5rem' }} />
                  clorit2025@gmail.com
                </a>
              </div>
            </div>
          </div>
          
          {/* Centered Social Media Icons in Footer */}
          <div style={styles.footerSocialSection}>
            <div style={styles.footerSocialIcons}>
              <a 
                href="https://x.com/CLORIT_CO2?t=jSZhHYfB01gq5VoCY0TaNA&s=09" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.footerSocialIcon}
                aria-label="Follow us on X (Twitter)"
                title="Connect with CLORIT on X"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#1DA1F2';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#9CA3AF';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <BsTwitterX />
              </a>
              <a 
                href="https://www.linkedin.com/in/clorit-396b08382/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.footerSocialIcon}
                aria-label="Connect with us on LinkedIn"
                title="Follow CLORIT on LinkedIn"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#0077B5';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#9CA3AF';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <FaLinkedin />
              </a>
              <a 
                href="https://www.instagram.com/clorit.2025?igsh=MXUxdHd6NGlhbG8yZw==" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.footerSocialIcon}
                aria-label="Follow us on Instagram"
                title="See CLORIT updates on Instagram"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#E1306C';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#9CA3AF';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <FaInstagram />
              </a>
            </div>
          </div>
          
          <div style={styles.footerBottom}>
            <p>© 2025 CLORIT. All rights reserved. Building a sustainable future through verified blue carbon credits.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
