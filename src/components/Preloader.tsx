import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onLoadComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoadComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState<'loading' | 'fadeOut'>('loading');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Quick preloader - show for only 1.5 seconds
    const loadingTimer = setTimeout(() => {
      setAnimationPhase('fadeOut');
    }, 1500);

    // Complete fade out animation
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
      onLoadComplete();
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(loadingTimer);
      clearTimeout(fadeOutTimer);
    };
  }, [onLoadComplete]);

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
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 30%, #f1f5f9 100%)',
    zIndex: 9999,
    opacity: animationPhase === 'fadeOut' ? 0 : 1,
    transform: animationPhase === 'fadeOut' ? 'scale(1.05)' : 'scale(1)',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const mainContainerStyles: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    animation: animationPhase === 'loading' 
      ? 'containerFloat 3s ease-in-out infinite' 
      : 'containerFadeOut 0.5s ease-out forwards'
  };

  const logoContainerStyles: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '140px',
    height: '140px',
    marginBottom: '3rem',
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '50%',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: `
      0 20px 60px rgba(14, 165, 233, 0.15),
      0 8px 32px rgba(14, 165, 233, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.8)
    `,
    animation: 'logoGlow 2s ease-in-out infinite alternate'
  };

  const logoStyles: React.CSSProperties = {
    width: '80px',
    height: '80px',
    objectFit: 'contain',
    borderRadius: '12px',
    animation: 'logoBreath 3s ease-in-out infinite',
    filter: 'drop-shadow(0 4px 12px rgba(14, 165, 233, 0.2))'
  };

  const orbitRingStyles: React.CSSProperties = {
    position: 'absolute',
    top: '-20px',
    left: '-20px',
    width: '180px',
    height: '180px',
    border: '2px solid transparent',
    borderTopColor: '#0ea5e9',
    borderRightColor: '#06b6d4',
    borderRadius: '50%',
    animation: 'orbitSpin 3s linear infinite',
    opacity: 0.6
  };

  const innerRingStyles: React.CSSProperties = {
    position: 'absolute',
    top: '-10px',
    left: '-10px',
    width: '160px',
    height: '160px',
    border: '1px solid transparent',
    borderTopColor: '#22d3ee',
    borderLeftColor: '#0284c7',
    borderRadius: '50%',
    animation: 'orbitSpinReverse 2s linear infinite',
    opacity: 0.4
  };

  const dotStyles: React.CSSProperties = {
    position: 'absolute',
    width: '8px',
    height: '8px',
    background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
    borderRadius: '50%',
    boxShadow: '0 0 12px rgba(14, 165, 233, 0.6)',
    animation: 'dotOrbit 3s linear infinite'
  };

  const textStyles: React.CSSProperties = {
    fontSize: '2.5rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.5rem',
    letterSpacing: '-0.025em',
    animation: 'textSlideUp 0.8s ease-out 0.3s both'
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: '1rem',
    color: '#64748b',
    fontWeight: 500,
    letterSpacing: '0.05em',
    marginBottom: '3rem',
    animation: 'textSlideUp 0.8s ease-out 0.5s both'
  };

  const progressContainerStyles: React.CSSProperties = {
    width: '280px',
    height: '2px',
    backgroundColor: '#e2e8f0',
    borderRadius: '2px',
    overflow: 'hidden',
    position: 'relative',
    animation: 'progressShow 0.8s ease-out 0.7s both'
  };

  const progressBarStyles: React.CSSProperties = {
    height: '100%',
    background: 'linear-gradient(90deg, #0ea5e9 0%, #06b6d4 50%, #22d3ee 100%)',
    borderRadius: '2px',
    width: `${progress}%`,
    transition: 'width 0.3s ease-out',
    position: 'relative',
    overflow: 'hidden'
  };

  const progressGlowStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '20px',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
    animation: progress > 0 ? 'progressGlow 1s ease-in-out infinite' : 'none'
  };

  const loadingTextStyles: React.CSSProperties = {
    fontSize: '0.875rem',
    color: '#94a3b8',
    fontWeight: 500,
    marginTop: '1rem',
    animation: 'loadingPulse 1.5s ease-in-out infinite'
  };

  // Inject sophisticated keyframe animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes containerFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      
      @keyframes containerFadeOut {
        0% { 
          opacity: 1; 
          transform: translateY(0px) scale(1); 
        }
        100% { 
          opacity: 0; 
          transform: translateY(-20px) scale(1.05); 
        }
      }
      
      @keyframes logoGlow {
        0% { 
          box-shadow: 
            0 20px 60px rgba(14, 165, 233, 0.15),
            0 8px 32px rgba(14, 165, 233, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }
        100% { 
          box-shadow: 
            0 25px 80px rgba(14, 165, 233, 0.25),
            0 12px 40px rgba(14, 165, 233, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }
      }
      
      @keyframes logoBreath {
        0%, 100% { 
          transform: scale(1) rotate(0deg); 
          filter: drop-shadow(0 4px 12px rgba(14, 165, 233, 0.2));
        }
        50% { 
          transform: scale(1.05) rotate(2deg); 
          filter: drop-shadow(0 8px 20px rgba(14, 165, 233, 0.3));
        }
      }
      
      @keyframes orbitSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes orbitSpinReverse {
        0% { transform: rotate(360deg); }
        100% { transform: rotate(0deg); }
      }
      
      @keyframes dotOrbit {
        0% { 
          top: -4px; 
          left: 50%; 
          transform: translateX(-50%); 
        }
        25% { 
          top: 50%; 
          left: calc(100% + 4px); 
          transform: translateY(-50%); 
        }
        50% { 
          top: calc(100% + 4px); 
          left: 50%; 
          transform: translateX(-50%); 
        }
        75% { 
          top: 50%; 
          left: -4px; 
          transform: translateY(-50%); 
        }
        100% { 
          top: -4px; 
          left: 50%; 
          transform: translateX(-50%); 
        }
      }
      
      @keyframes textSlideUp {
        0% { 
          opacity: 0; 
          transform: translateY(30px); 
        }
        100% { 
          opacity: 1; 
          transform: translateY(0); 
        }
      }
      
      @keyframes progressShow {
        0% { 
          opacity: 0; 
          transform: translateY(20px) scale(0.9); 
        }
        100% { 
          opacity: 1; 
          transform: translateY(0) scale(1); 
        }
      }
      
      @keyframes progressGlow {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
      }
      
      @keyframes loadingPulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }
      
      /* Floating particles */
      @keyframes particleFloat1 {
        0%, 100% { 
          transform: translate(0, 0) rotate(0deg); 
          opacity: 0.3; 
        }
        33% { 
          transform: translate(30px, -40px) rotate(120deg); 
          opacity: 0.7; 
        }
        66% { 
          transform: translate(-20px, -60px) rotate(240deg); 
          opacity: 0.5; 
        }
      }
      
      @keyframes particleFloat2 {
        0%, 100% { 
          transform: translate(0, 0) rotate(0deg); 
          opacity: 0.2; 
        }
        50% { 
          transform: translate(-40px, -30px) rotate(180deg); 
          opacity: 0.6; 
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div style={containerStyles}>
      {/* Floating background particles */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '15%',
        width: '6px',
        height: '6px',
        background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
        borderRadius: '50%',
        animation: 'particleFloat1 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '70%',
        right: '20%',
        width: '4px',
        height: '4px',
        background: 'linear-gradient(135deg, #22d3ee, #0284c7)',
        borderRadius: '50%',
        animation: 'particleFloat2 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '10%',
        width: '8px',
        height: '8px',
        background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
        borderRadius: '50%',
        animation: 'particleFloat1 10s ease-in-out infinite reverse'
      }} />

      <div style={mainContainerStyles}>
        <div style={logoContainerStyles}>
          <div style={orbitRingStyles} />
          <div style={innerRingStyles} />
          <div style={dotStyles} />
          
          <img 
            src="/clorit-logo.png" 
            alt="CLORIT Logo" 
            style={logoStyles}
            onError={(e) => {
              // Elegant fallback with your brand colors
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.style.cssText = `
                width: 80px; 
                height: 80px; 
                background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #22d3ee 100%); 
                border-radius: 16px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                font-size: 2rem; 
                color: white;
                font-weight: 800;
                font-family: Inter, sans-serif;
                letter-spacing: -0.05em;
                box-shadow: 0 8px 32px rgba(14, 165, 233, 0.3);
              `;
              fallback.textContent = 'CL';
              target.parentNode?.appendChild(fallback);
            }}
          />
        </div>
        
        <div style={textStyles}>
          CLORIT
        </div>
        
        <div style={subtitleStyles}>
          Blue Carbon Registry & MRV System
        </div>
        
        <div style={progressContainerStyles}>
          <div style={progressBarStyles}>
            <div style={progressGlowStyles} />
          </div>
        </div>
        
        <div style={loadingTextStyles}>
          Initializing ecosystem...
        </div>
      </div>
    </div>
  );
};

export default Preloader;
