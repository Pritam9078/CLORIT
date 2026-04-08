import React, { useState } from 'react';
import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';

// Social Media Icon Component with official brand colors and accessibility
interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  title: string;
  brandColor: string;
  hoverBg: string;
}

const ModernSocialIcon: React.FC<SocialIconProps> = ({ 
  href, 
  icon, 
  label, 
  title, 
  brandColor, 
  hoverBg 
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={title}
      className={`
        group relative flex items-center justify-center
        w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16
        rounded-xl md:rounded-2xl
        bg-white/90 backdrop-blur-sm
        border-2 border-white/80
        shadow-lg shadow-black/10
        transition-all duration-300 ease-out
        hover:scale-110 hover:-translate-y-1
        hover:shadow-xl hover:shadow-black/20
        focus:outline-none focus:ring-4 focus:ring-blue-500/30
        active:scale-95
      `}
      style={{
        '--brand-color': brandColor,
        '--hover-bg': hoverBg,
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = hoverBg;
        e.currentTarget.style.borderColor = brandColor;
        e.currentTarget.style.color = 'white';
        e.currentTarget.style.boxShadow = `0 12px 32px ${brandColor}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
        e.currentTarget.style.color = brandColor;
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
      }}
    >
      <span 
        className="text-lg md:text-xl lg:text-2xl transition-colors duration-300"
        style={{ color: brandColor }}
      >
        {icon}
      </span>
      
      {/* Tooltip */}
      <div className={`
        absolute -top-12 left-1/2 transform -translate-x-1/2
        px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
        pointer-events-none whitespace-nowrap z-50
        before:content-[''] before:absolute before:top-full before:left-1/2 
        before:transform before:-translate-x-1/2 before:border-4 
        before:border-transparent before:border-t-gray-900
      `}>
        {title}
      </div>
    </a>
  );
};

// Enhanced Connect With Us Section Component
const ConnectWithUsSection: React.FC = () => {
  const socialLinks = [
    {
      href: "https://x.com/CLORIT_CO2?t=jSZhHYfB01gq5VoCY0TaNA&s=09",
      icon: <BsTwitterX />,
      label: "Follow us on X (Twitter)",
      title: "Connect with CLORIT on X",
      brandColor: "#1DA1F2",
      hoverBg: "#1DA1F2",
    },
    {
      href: "https://www.linkedin.com/in/clorit-396b08382/",
      icon: <FaLinkedin />,
      label: "Connect with us on LinkedIn",
      title: "Follow CLORIT on LinkedIn",
      brandColor: "#0077B5",
      hoverBg: "#0077B5",
    },
    {
      href: "https://www.instagram.com/clorit.2025?igsh=MXUxdHd6NGlhbG8yZw==",
      icon: <FaInstagram />,
      label: "Follow us on Instagram",
      title: "See CLORIT updates on Instagram",
      brandColor: "#E1306C",
      hoverBg: "#E1306C",
    },
  ];

  return (
    <section className="py-8 md:py-12 px-4 md:px-6 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-3 md:mb-4">
            Connect With Us
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join our community of environmental champions. Follow us for the latest updates on sustainable 
            blue carbon initiatives and climate action.
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-10">
          {socialLinks.map((social, index) => (
            <div key={index} className="transform transition-all duration-300 hover:scale-105">
              <ModernSocialIcon
                href={social.href}
                icon={social.icon}
                label={social.label}
                title={social.title}
                brandColor={social.brandColor}
                hoverBg={social.hoverBg}
              />
            </div>
          ))}
        </div>

        {/* Contact Email */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
            <a
              href="mailto:clorit2025@gmail.com"
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors duration-300 group"
              aria-label="Send us an email"
              title="Contact CLORIT via email"
            >
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <FaEnvelope className="text-lg" />
              </div>
              <span className="font-medium text-lg">clorit2025@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Additional Call-to-Action */}
        <div className="text-center mt-6 md:mt-8">
          <p className="text-gray-500 text-sm md:text-base">
            Have questions about our blue carbon initiatives? We'd love to hear from you!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConnectWithUsSection;
