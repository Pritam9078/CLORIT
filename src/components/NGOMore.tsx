import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MoreHorizontal, 
  Users, 
  Camera, 
  Bell, 
  History, 
  ChevronDown, 
  ChevronUp, 
  X 
} from 'lucide-react';
import CommunityManagement from './CommunityManagement';
import DroneSurveyManagement from './DroneSurveyManagement';
import NotificationsCenterEnhanced from './NotificationsCenterEnhanced';
import HistoryRecordsEnhanced from './HistoryRecordsEnhanced';

interface MoreOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  component: React.ReactNode;
  notificationCount?: number;
}

interface NGOMoreProps {
  onClose?: () => void;
}

const NGOMore: React.FC<NGOMoreProps> = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState<string>('community');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const moreOptions: MoreOption[] = [
    {
      id: 'community',
      label: 'Community Management',
      icon: <Users size={20} />,
      description: 'Manage linked communities, approve requests, and set permissions',
      component: <CommunityManagement />
    },
    {
      id: 'drone',
      label: 'Drone Survey Management',
      icon: <Camera size={20} />,
      description: 'Manage drone survey data and uploaded images with geo-tagging',
      component: <DroneSurveyManagement />
    },
    {
      id: 'notifications',
      label: 'Notifications Center',
      icon: <Bell size={20} />,
      description: 'Display notifications for submissions, updates, and wallet changes',
      component: <NotificationsCenterEnhanced />,
      notificationCount: 3
    },
    {
      id: 'history',
      label: 'History Records',
      icon: <History size={20} />,
      description: 'Show past verifications, actions, and approved submissions',
      component: <HistoryRecordsEnhanced />
    }
  ];

  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: 'linear-gradient(135deg, #F8FAF9 0%, #E8F5F0 100%)',
      minHeight: '100vh',
      position: 'relative' as const
    },
    header: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '1rem',
      padding: '1.5rem',
      margin: '2rem',
      marginBottom: '1rem',
      boxShadow: '0 8px 32px rgba(0, 119, 182, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1e293b',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    subtitle: {
      color: '#64748b',
      fontSize: '1.1rem',
      margin: '0.5rem 0 0 0'
    },
    closeButton: {
      padding: '0.5rem',
      background: 'rgba(239, 68, 68, 0.1)',
      border: 'none',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      color: '#ef4444',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease'
    },
    mainContent: {
      display: 'flex',
      gap: '2rem',
      padding: '0 2rem 2rem 2rem',
      minHeight: 'calc(100vh - 200px)'
    },
    sidebar: {
      width: '350px',
      flexShrink: 0
    },
    sidebarCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 8px 32px rgba(0, 119, 182, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      height: 'fit-content'
    },
    sidebarTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    expandButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#64748b',
      padding: '0.25rem',
      borderRadius: '0.25rem',
      transition: 'all 0.2s ease'
    },
    optionsList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem'
    },
    optionButton: {
      width: '100%',
      padding: '1rem',
      border: 'none',
      borderRadius: '0.75rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'left' as const,
      position: 'relative' as const,
      overflow: 'hidden' as const
    },
    activeOption: {
      background: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)',
      color: 'white',
      boxShadow: '0 4px 20px rgba(0, 119, 182, 0.3)',
      transform: 'translateY(-2px)'
    },
    inactiveOption: {
      background: 'rgba(248, 250, 252, 0.8)',
      color: '#374151',
      border: '1px solid #e2e8f0'
    },
    optionContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      position: 'relative' as const,
      zIndex: 1
    },
    optionText: {
      flex: 1
    },
    optionLabel: {
      fontWeight: '600',
      fontSize: '1rem',
      marginBottom: '0.25rem'
    },
    optionDescription: {
      fontSize: '0.85rem',
      opacity: 0.8,
      lineHeight: 1.4
    },
    notificationBadge: {
      position: 'absolute' as const,
      top: '0.5rem',
      right: '0.5rem',
      background: '#ef4444',
      color: 'white',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      fontSize: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold'
    },
    contentArea: {
      flex: 1,
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '1rem',
      boxShadow: '0 8px 32px rgba(0, 119, 182, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      overflow: 'hidden' as const
    }
  };

  const activeOption = moreOptions.find(option => option.id === activeSection);

  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>
            <MoreHorizontal size={32} color="#0077B6" />
            More Options
          </h1>
        </div>
        {onClose && (
          <motion.button
            style={styles.closeButton}
            onClick={onClose}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: 'rgba(239, 68, 68, 0.2)' 
            }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={20} />
          </motion.button>
        )}
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.sidebarCard}>
            <div style={styles.sidebarTitle}>
              Available Options
              <button
                style={styles.expandButton}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  style={styles.optionsList}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {moreOptions.map((option, index) => (
                    <motion.button
                      key={option.id}
                      style={{
                        ...styles.optionButton,
                        ...(activeSection === option.id ? styles.activeOption : styles.inactiveOption)
                      }}
                      onClick={() => setActiveSection(option.id)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ 
                        scale: activeSection !== option.id ? 1.02 : 1,
                        backgroundColor: activeSection !== option.id ? 'rgba(240, 249, 255, 0.9)' : undefined
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div style={styles.optionContent}>
                        {option.icon}
                        <div style={styles.optionText}>
                          <div style={styles.optionLabel}>
                            {option.label}
                          </div>
                          <div style={styles.optionDescription}>
                            {option.description}
                          </div>
                        </div>
                      </div>
                      {option.notificationCount && (
                        <div style={styles.notificationBadge}>
                          {option.notificationCount}
                        </div>
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Content Area */}
        <div style={styles.contentArea}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeOption?.component}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default NGOMore;
