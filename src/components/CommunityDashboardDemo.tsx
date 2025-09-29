import React from 'react';
import MoreMenu from './MoreMenu';

/**
 * Community Dashboard More Section Demo
 * 
 * This demonstrates how to integrate the MoreMenu component
 * into your Community Dashboard. 
 * 
 * Features included:
 * - Voice Support with recording capabilities
 * - Project Status Tracking with progress indicators
 * - History Records with search and filtering
 * - Notifications Center with real-time updates
 * 
 * The MoreMenu component is fully responsive and includes:
 * - Collapsible sidebar for desktop
 * - Mobile-friendly overlay menu
 * - Smooth animations with Framer Motion
 * - Clean white and green theme
 */

const CommunityDashboardDemo: React.FC = () => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#f8fafc'
    }}>
      {/* Header/Navigation Bar (Optional) */}
      <div style={{
        height: '60px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50
      }}>
        <h1 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#166534',
          margin: 0
        }}>
          🌊 Community Dashboard - Blue Carbon Registry
        </h1>
      </div>
      
      {/* Main Content Area with MoreMenu */}
      <div style={{
        marginTop: '60px',
        height: 'calc(100vh - 60px)'
      }}>
        <MoreMenu />
      </div>
    </div>
  );
};

export default CommunityDashboardDemo;
