import React, { useState } from 'react';
import { Home, Upload, Mic, ListChecks, History, Bell } from 'lucide-react';

// Import component files that may exist
import WelcomeOnboarding from './WelcomeOnboarding';
import RegistrationDataUpload from './RegistrationDataUpload';
import VoiceSupport from './VoiceSupport';
import ProjectStatusTracking from './ProjectStatusTracking';
import HistoryRecordsEnhanced from './HistoryRecordsEnhanced';
import NotificationsCenterEnhanced from './NotificationsCenterEnhanced';

const CommunityDashboardNew: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, component: <WelcomeOnboarding /> },
    { id: 'upload', label: 'Upload Data', icon: Upload, component: <RegistrationDataUpload /> },
    { id: 'voice', label: 'Voice Support', icon: Mic, component: <VoiceSupport /> },
    { id: 'tracking', label: 'Project Tracking', icon: ListChecks, component: <ProjectStatusTracking /> },
    { id: 'history', label: 'History', icon: History, component: <HistoryRecordsEnhanced /> },
    { id: 'notifications', label: 'Notifications', icon: Bell, component: <NotificationsCenterEnhanced /> },
  ];

  const activeComponent = menuItems.find(item => item.id === activeTab)?.component;

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '280px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header */}
        <div style={{
          padding: '2rem 1.5rem',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#166534',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🌊 Community Dashboard
          </h1>
          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            margin: '0.5rem 0 0 0'
          }}>
            Blue Carbon Registry
          </p>
        </div>

        {/* Menu Items */}
        <nav style={{
          flex: 1,
          padding: '1.5rem 1rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.875rem 1rem',
                    backgroundColor: isActive ? '#dcfce7' : 'transparent',
                    border: isActive ? '1px solid #bbf7d0' : '1px solid transparent',
                    borderRadius: '0.5rem',
                    color: isActive ? '#166534' : '#6b7280',
                    fontSize: '0.875rem',
                    fontWeight: isActive ? '600' : '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                      e.currentTarget.style.color = '#374151';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#6b7280';
                    }
                  }}
                >
                  <IconComponent style={{
                    width: '1.25rem',
                    height: '1.25rem'
                  }} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div style={{
          padding: '1.5rem',
          borderTop: '1px solid #e2e8f0',
          backgroundColor: '#f9fafb'
        }}>
          <div style={{
            fontSize: '0.75rem',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            <p style={{ margin: 0 }}>Community Member</p>
            <p style={{ margin: '0.25rem 0 0 0', fontWeight: '500' }}>Rajesh Kumar</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        backgroundColor: '#f8fafc'
      }}>
        {/* Top Bar */}
        <div style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#111827',
            margin: 0
          }}>
            {menuItems.find(item => item.id === activeTab)?.label}
          </h2>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#dcfce7',
              color: '#166534',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              Online
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div style={{
          padding: '2rem',
          minHeight: 'calc(100vh - 80px)'
        }}>
          {activeComponent || (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '400px',
              backgroundColor: '#ffffff',
              borderRadius: '0.75rem',
              border: '2px dashed #d1d5db'
            }}>
              <div style={{
                textAlign: 'center',
                color: '#6b7280'
              }}>
                <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                  Component not found
                </p>
                <p style={{ fontSize: '0.875rem' }}>
                  The selected component is not available.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay - Hidden by default, can be shown for mobile */}
      <style>
        {`
          @media (max-width: 768px) {
            .dashboard-container {
              flex-direction: column;
            }
            .sidebar {
              width: 100% !important;
              height: auto !important;
            }
            .sidebar nav {
              flex-direction: row !important;
              overflow-x: auto !important;
              padding: 1rem !important;
            }
            .sidebar nav > div {
              flex-direction: row !important;
              gap: 1rem !important;
            }
            .sidebar button {
              min-width: 120px !important;
              justify-content: center !important;
            }
            .sidebar .footer {
              display: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CommunityDashboardNew;
