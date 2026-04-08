import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, BarChart3, Trophy, History, Bell, ChevronDown, ChevronRight, CheckSquare } from 'lucide-react';
import GovernmentAnalytics from './GovernmentAnalytics';
import PerformanceRecognition from './PerformanceRecognition';
import HistoryRecordsEnhanced from './HistoryRecordsEnhanced';
import NotificationsCenterEnhanced from './NotificationsCenterEnhanced';
import Project from './Project';

interface MoreOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  component: React.ReactNode;
  notificationCount?: number;
}

const More: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('analytics');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const moreOptions: MoreOption[] = [
    {
      id: 'analytics',
      label: 'Government Analytics',
      icon: <BarChart3 size={20} />,
      description: 'Data analytics with charts and comparative statistics',
      component: <GovernmentAnalytics />
    },
    {
      id: 'project',
      label: 'Project Verification',
      icon: <CheckSquare size={20} />,
      description: 'Review and verify environmental projects for approval',
      component: <Project />
    },
    {
      id: 'performance',
      label: 'Performance Recognition',
      icon: <Trophy size={20} />,
      description: 'Badges, rankings, and leaderboard for panchayats',
      component: <PerformanceRecognition />
    },
    {
      id: 'history',
      label: 'History Records',
      icon: <History size={20} />,
      description: 'Log of past activities, approvals, and submissions',
      component: <HistoryRecordsEnhanced />
    },
    {
      id: 'notifications',
      label: 'Notifications Center',
      icon: <Bell size={20} />,
      description: 'All notifications with filtering and read/unread status',
      component: <NotificationsCenterEnhanced />,
      notificationCount: 4
    }
  ];

  const activeOption = moreOptions.find(option => option.id === activeSection);

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Sidebar Navigation */}
      <motion.div
        initial={{ width: isExpanded ? '320px' : '80px' }}
        animate={{ width: isExpanded ? '320px' : '80px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{
          backgroundColor: 'white',
          borderRight: '1px solid #e5e7eb',
          boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <motion.div
            initial={{ opacity: isExpanded ? 1 : 0 }}
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            <MoreHorizontal size={24} style={{ color: '#16a34a' }} />
            {isExpanded && (
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#166534',
                margin: 0
              }}>
                More Options
              </h2>
            )}
          </motion.div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              padding: '0.5rem',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '0.375rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Navigation Options */}
        <nav style={{ flex: 1, padding: '1rem 0' }}>
          {moreOptions.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => setActiveSection(option.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%',
                padding: isExpanded ? '1rem 1.5rem' : '1rem',
                backgroundColor: activeSection === option.id ? '#f0fdf4' : 'transparent',
                border: 'none',
                borderLeft: activeSection === option.id ? '4px solid #16a34a' : '4px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
            >
              <div style={{
                color: activeSection === option.id ? '#16a34a' : '#6b7280',
                display: 'flex',
                alignItems: 'center',
                position: 'relative'
              }}>
                {option.icon}
                {option.notificationCount && option.notificationCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    fontSize: '0.625rem',
                    fontWeight: '600',
                    padding: '0.125rem 0.375rem',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    borderRadius: '1rem',
                    minWidth: '1.25rem',
                    textAlign: 'center',
                    lineHeight: 1
                  }}>
                    {option.notificationCount}
                  </span>
                )}
              </div>
              
              <AnimatePresence mode="wait">
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    style={{ flex: 1 }}
                  >
                    <h3 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: activeSection === option.id ? '#166534' : '#374151',
                      margin: '0 0 0.25rem 0'
                    }}>
                      {option.label}
                    </h3>
                    <p style={{
                      fontSize: '0.75rem',
                      color: '#6b7280',
                      margin: 0,
                      lineHeight: 1.3
                    }}>
                      {option.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </nav>

        {/* Footer */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid #e5e7eb',
          backgroundColor: '#f8f9fa'
        }}>
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  margin: 0,
                  textAlign: 'center'
                }}>
                  Advanced dashboard features for comprehensive project management
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Content Header */}
        <div style={{
          padding: '1.5rem 2rem',
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              padding: '0.75rem',
              backgroundColor: '#f0fdf4',
              borderRadius: '0.5rem',
              border: '1px solid #bbf7d0'
            }}>
              {activeOption?.icon}
            </div>
            <div>
              <h1 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#111827',
                margin: '0 0 0.25rem 0'
              }}>
                {activeOption?.label}
              </h1>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                margin: 0
              }}>
                {activeOption?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Content */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          backgroundColor: '#f8f9fa'
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ height: '100%' }}
            >
              {activeOption?.component}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default More;
