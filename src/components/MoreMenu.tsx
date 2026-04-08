import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, Mic, MapPin, Clock, Bell, ChevronDown, ChevronRight, X } from 'lucide-react';
import VoiceSupport from './VoiceSupport';
import ProjectStatusTracking from './ProjectStatusTracking';
import HistoryRecords from './HistoryRecords';
import NotificationsCenter from './NotificationsCenter';

interface MoreOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  component: React.ReactNode;
  notificationCount?: number;
}

const MoreMenu: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('voice');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const moreOptions: MoreOption[] = [
    {
      id: 'voice',
      label: 'Voice Support',
      icon: <Mic size={20} />,
      description: 'Record and manage voice messages for support',
      component: <VoiceSupport />
    },
    {
      id: 'tracking',
      label: 'Project Status Tracking',
      icon: <MapPin size={20} />,
      description: 'Track progress and status of your submitted projects',
      component: <ProjectStatusTracking />
    },
    {
      id: 'history',
      label: 'History Records',
      icon: <Clock size={20} />,
      description: 'View historical records and activity logs',
      component: <HistoryRecords />
    },
    {
      id: 'notifications',
      label: 'Notifications Center',
      icon: <Bell size={20} />,
      description: 'Manage all your notifications and alerts',
      component: <NotificationsCenter />,
      notificationCount: 3
    }
  ];

  const activeComponent = moreOptions.find(option => option.id === activeSection)?.component;

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f8fafc'
    }}>
      {/* Desktop Sidebar */}
      <motion.div
        style={{
          width: isExpanded ? '320px' : '80px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.3s ease',
          zIndex: 10
        }}
        initial={false}
        animate={{ width: isExpanded ? '320px' : '80px' }}
        className="hidden md:flex"
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <MoreHorizontal style={{ width: '1.5rem', height: '1.5rem', color: '#10b981' }} />
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#166534',
                  margin: 0
                }}>
                  More Options
                </h2>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              padding: '0.5rem',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              color: '#6b7280',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#6b7280';
            }}
          >
            {isExpanded ? (
              <ChevronDown style={{ width: '1.25rem', height: '1.25rem' }} />
            ) : (
              <ChevronRight style={{ width: '1.25rem', height: '1.25rem' }} />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <div style={{ flex: 1, padding: '1rem' }}>
          {moreOptions.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => setActiveSection(option.id)}
              style={{
                width: '100%',
                padding: isExpanded ? '1rem' : '0.75rem',
                marginBottom: '0.5rem',
                backgroundColor: activeSection === option.id ? '#dcfce7' : 'transparent',
                border: activeSection === option.id ? '1px solid #bbf7d0' : '1px solid transparent',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.2s ease',
                textAlign: 'left'
              }}
              whileHover={{
                backgroundColor: activeSection === option.id ? '#dcfce7' : '#f9fafb'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div style={{
                minWidth: '2.5rem',
                height: '2.5rem',
                borderRadius: '0.5rem',
                backgroundColor: activeSection === option.id ? '#10b981' : '#f3f4f6',
                color: activeSection === option.id ? '#ffffff' : '#6b7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                {option.icon}
                {option.notificationCount && (
                  <span style={{
                    position: 'absolute',
                    top: '-0.25rem',
                    right: '-0.25rem',
                    width: '1.25rem',
                    height: '1.25rem',
                    backgroundColor: '#ef4444',
                    color: '#ffffff',
                    borderRadius: '50%',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {option.notificationCount}
                  </span>
                )}
              </div>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    style={{ flex: 1 }}
                  >
                    <h3 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: activeSection === option.id ? '#166534' : '#374151',
                      margin: 0,
                      marginBottom: '0.25rem'
                    }}>
                      {option.label}
                    </h3>
                    <p style={{
                      fontSize: '0.75rem',
                      color: '#6b7280',
                      margin: 0,
                      lineHeight: '1.2'
                    }}>
                      {option.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 20,
          padding: '0.75rem',
          backgroundColor: '#10b981',
          color: '#ffffff',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
        className="md:hidden"
      >
        <MoreHorizontal style={{ width: '1.5rem', height: '1.5rem' }} />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 30
              }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden"
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              style={{
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                width: '280px',
                backgroundColor: '#ffffff',
                zIndex: 40,
                display: 'flex',
                flexDirection: 'column'
              }}
              className="md:hidden"
            >
              <div style={{
                padding: '1.5rem',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <MoreHorizontal style={{ width: '1.5rem', height: '1.5rem', color: '#10b981' }} />
                  <h2 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#166534',
                    margin: 0
                  }}>
                    More Options
                  </h2>
                </div>
                
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    padding: '0.5rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6b7280'
                  }}
                >
                  <X style={{ width: '1.25rem', height: '1.25rem' }} />
                </button>
              </div>

              <div style={{ flex: 1, padding: '1rem' }}>
                {moreOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setActiveSection(option.id);
                      setIsMobileMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      marginBottom: '0.5rem',
                      backgroundColor: activeSection === option.id ? '#dcfce7' : 'transparent',
                      border: activeSection === option.id ? '1px solid #bbf7d0' : '1px solid transparent',
                      borderRadius: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '0.5rem',
                      backgroundColor: activeSection === option.id ? '#10b981' : '#f3f4f6',
                      color: activeSection === option.id ? '#ffffff' : '#6b7280',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      {option.icon}
                      {option.notificationCount && (
                        <span style={{
                          position: 'absolute',
                          top: '-0.25rem',
                          right: '-0.25rem',
                          width: '1.25rem',
                          height: '1.25rem',
                          backgroundColor: '#ef4444',
                          color: '#ffffff',
                          borderRadius: '50%',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {option.notificationCount}
                        </span>
                      )}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: activeSection === option.id ? '#166534' : '#374151',
                        margin: 0,
                        marginBottom: '0.25rem'
                      }}>
                        {option.label}
                      </h3>
                      <p style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        margin: 0,
                        lineHeight: '1.2'
                      }}>
                        {option.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        backgroundColor: '#ffffff'
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ height: '100%' }}
          >
            {activeComponent}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MoreMenu;
