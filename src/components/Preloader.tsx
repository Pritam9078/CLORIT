import React, { useEffect, useState } from 'react';
import { LOGO_CONFIG } from '../constants/branding';

interface PreloaderProps {
  onLoadComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoadComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState<'loading' | 'fadeOut'>('loading');
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    // Preload the logo image
    const img = new Image();
    img.onload = () => setLogoLoaded(true);
    img.src = LOGO_CONFIG.MAIN_LOGO;

    // Simulate app loading time - start timer only after logo is loaded
    const checkLogoAndStart = () => {
      if (logoLoaded) {
        const loadingTimer = setTimeout(() => {
          setAnimationPhase('fadeOut');
        }, 2000); // Show preloader for 2 seconds

        // Complete fade out animation
        const fadeOutTimer = setTimeout(() => {
          setIsVisible(false);
          onLoadComplete();
        }, 2800); // Additional 800ms for fade out animation

        return () => {
          clearTimeout(loadingTimer);
          clearTimeout(fadeOutTimer);
        };
      } else {
        // Retry checking if logo is loaded
        setTimeout(checkLogoAndStart, 100);
      }
    };

    const cleanup = checkLogoAndStart();
    return cleanup;
  }, [onLoadComplete, logoLoaded]);

  if (!isVisible) return null;

  const containerStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #F8FAF9 0%, #E8F5F0 50%, #D1F2E8 100%)',
    zIndex: 9999,
    opacity: animationPhase === 'fadeOut' ? 0 : 1,
    transition: 'opacity 0.8s ease-out',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const logoContainerStyles: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2rem'
  };

  const logoStyles: React.CSSProperties = {
    width: '120px',
    height: '120px',
    objectFit: 'contain',
    animation: animationPhase === 'loading' 
      ? 'logoAnimation 2s ease-in-out infinite' 
      : 'logoFadeOut 0.8s ease-out forwards',
    filter: 'drop-shadow(0 8px 32px rgba(0, 119, 182, 0.2))'
  };

  const textStyles: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#0077B6',
    marginBottom: '1rem',
    letterSpacing: '0.5px',
    animation: animationPhase === 'loading' 
      ? 'textFadeIn 1s ease-out 0.5s both' 
      : 'textFadeOut 0.8s ease-out forwards'
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: '1rem',
    color: '#4CAF50',
    fontWeight: 500,
    letterSpacing: '0.3px',
    animation: animationPhase === 'loading' 
      ? 'textFadeIn 1s ease-out 1s both' 
      : 'textFadeOut 0.8s ease-out forwards'
  };

  const progressBarContainerStyles: React.CSSProperties = {
    width: '200px',
    height: '3px',
    backgroundColor: 'rgba(0, 119, 182, 0.1)',
    borderRadius: '2px',
    overflow: 'hidden',
    marginTop: '2rem',
    animation: animationPhase === 'loading' 
      ? 'progressFadeIn 1s ease-out 1.2s both' 
      : 'progressFadeOut 0.8s ease-out forwards'
  };

  const progressBarStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, #0077B6 0%, #00B4D8 50%, #4CAF50 100%)',
    borderRadius: '2px',
    animation: 'progressBar 2s ease-out forwards',
    transform: 'translateX(-100%)'
  };

  // Inject keyframe animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes logoAnimation {
        0% { 
          transform: scale(0.8) rotate(0deg); 
          opacity: 0; 
        }
        50% { 
          transform: scale(1.1) rotate(180deg); 
          opacity: 1; 
        }
        100% { 
          transform: scale(1) rotate(360deg); 
          opacity: 1; 
        }
      }
      
      @keyframes logoFadeOut {
        0% { 
          transform: scale(1) rotate(360deg); 
          opacity: 1; 
        }
        100% { 
          transform: scale(0.9) rotate(450deg); 
          opacity: 0; 
        }
      }
      
      @keyframes textFadeIn {
        0% { 
          opacity: 0; 
          transform: translateY(20px); 
        }
        100% { 
          opacity: 1; 
          transform: translateY(0); 
        }
      }
      
      @keyframes textFadeOut {
        0% { 
          opacity: 1; 
          transform: translateY(0); 
        }
        100% { 
          opacity: 0; 
          transform: translateY(-20px); 
        }
      }
      
      @keyframes progressFadeIn {
        0% { 
          opacity: 0; 
          transform: translateY(20px); 
        }
        100% { 
          opacity: 1; 
          transform: translateY(0); 
        }
      }
      
      @keyframes progressFadeOut {
        0% { 
          opacity: 1; 
          transform: translateY(0); 
        }
        100% { 
          opacity: 0; 
          transform: translateY(-20px); 
        }
      }
      
      @keyframes progressBar {
        0% { 
          transform: translateX(-100%); 
        }
        100% { 
          transform: translateX(0%); 
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={containerStyles}>
      <div style={logoContainerStyles}>
        {!logoLoaded && (
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 50%, #4CAF50 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            color: 'white',
            animation: 'logoAnimation 2s ease-in-out infinite'
          }}>
            🌊
          </div>
        )}
        <img 
          src={LOGO_CONFIG.MAIN_LOGO} 
          alt={LOGO_CONFIG.LOGO_ALT} 
          style={{
            ...logoStyles,
            opacity: logoLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in',
            position: logoLoaded ? 'static' : 'absolute' as const
          }}
          onLoad={() => setLogoLoaded(true)}
        />
      </div>
      
      <div style={textStyles}>
        CLORIT
      </div>
      
      <div style={subtitleStyles}>
        Blue Carbon Registry & MRV System
      </div>
      
      <div style={progressBarContainerStyles}>
        <div style={progressBarStyles}></div>
      </div>
    </div>
  );
};

export default Preloader;
