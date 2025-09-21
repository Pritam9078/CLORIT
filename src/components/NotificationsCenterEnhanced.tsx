import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  CheckCircle, 
  Info, 
  AlertTriangle, 
  Filter, 
  Search,
  Check,
  Trash2,
  Clock
} from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
  timestamp: string;
  category: 'submission' | 'approval' | 'wallet' | 'system';
}

const NotificationsCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { 
      id: 1, 
      title: 'New Community Submission', 
      message: 'Sundarbans Eco Community has submitted verification documents for review.', 
      type: 'info', 
      read: false, 
      timestamp: '2024-03-15T10:30:00Z', 
      category: 'submission' 
    },
    { 
      id: 2, 
      title: 'Project Approved', 
      message: 'Blue Carbon Initiative project has been approved by NCCR.', 
      type: 'success', 
      read: false, 
      timestamp: '2024-03-14T16:45:00Z', 
      category: 'approval' 
    },
    { 
      id: 3, 
      title: 'Wallet Credit Update', 
      message: 'Your verification fee of ₹12,000 has been credited to your wallet.', 
      type: 'success', 
      read: true, 
      timestamp: '2024-03-13T09:15:00Z', 
      category: 'wallet' 
    },
    { 
      id: 4, 
      title: 'Document Missing', 
      message: 'Coastal Guard Alliance requires additional compliance documents.', 
      type: 'warning', 
      read: false, 
      timestamp: '2024-03-12T14:20:00Z', 
      category: 'submission' 
    },
    { 
      id: 5, 
      title: 'System Maintenance', 
      message: 'Platform will undergo scheduled maintenance tonight from 2 AM to 4 AM IST.', 
      type: 'info', 
      read: true, 
      timestamp: '2024-03-11T11:00:00Z', 
      category: 'system' 
    }
  ]);

  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'unread' && !notification.read) ||
                         notification.type === filterType ||
                         notification.category === filterType;
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#22c55e' }} />;
      case 'warning': return <AlertTriangle style={{ width: '1.25rem', height: '1.25rem', color: '#f59e0b' }} />;
      default: return <Info style={{ width: '1.25rem', height: '1.25rem', color: '#3b82f6' }} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'submission': return '#3b82f6';
      case 'approval': return '#22c55e';
      case 'wallet': return '#8b5cf6';
      case 'system': return '#64748b';
      default: return '#64748b';
    }
  };

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '1000px',
      margin: '0 auto'
    },
    header: {
      marginBottom: '2rem'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    subtitle: {
      color: '#64748b',
      fontSize: '1.1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    controls: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      flexWrap: 'wrap' as const,
      alignItems: 'center'
    },
    searchContainer: {
      position: 'relative' as const,
      flex: 1,
      minWidth: '300px'
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem 0.75rem 3rem',
      border: '2px solid #e2e8f0',
      borderRadius: '1rem',
      fontSize: '1rem',
      outline: 'none'
    },
    searchIcon: {
      position: 'absolute' as const,
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#64748b'
    },
    filterSelect: {
      padding: '0.75rem 1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '1rem',
      fontSize: '1rem',
      backgroundColor: 'white',
      cursor: 'pointer',
      outline: 'none'
    },
    markAllButton: {
      padding: '0.75rem 1.5rem',
      background: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '1rem',
      cursor: 'pointer',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s ease'
    },
    notificationsList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem'
    },
    notificationCard: {
      background: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0',
      transition: 'all 0.3s ease',
      position: 'relative' as const
    },
    unreadCard: {
      borderLeft: '4px solid #3b82f6',
      backgroundColor: '#fafbff'
    },
    notificationHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    },
    notificationInfo: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
      flex: 1
    },
    notificationContent: {
      flex: 1
    },
    notificationTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '0.5rem'
    },
    notificationMessage: {
      color: '#64748b',
      lineHeight: 1.6,
      marginBottom: '1rem'
    },
    notificationMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      fontSize: '0.9rem',
      color: '#64748b'
    },
    categoryBadge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '1rem',
      fontSize: '0.8rem',
      fontWeight: '500',
      color: 'white',
      textTransform: 'capitalize' as const
    },
    actionButtons: {
      display: 'flex',
      gap: '0.5rem'
    },
    actionButton: {
      padding: '0.5rem',
      border: 'none',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    markReadButton: {
      backgroundColor: '#dbeafe',
      color: '#3b82f6'
    },
    deleteButton: {
      backgroundColor: '#fee2e2',
      color: '#dc2626'
    },
    emptyState: {
      textAlign: 'center' as const,
      padding: '3rem',
      color: '#64748b'
    }
  };

  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={styles.header}>
        <h1 style={styles.title}>
          <Bell size={32} color="#0077B6" />
          Notifications Center
        </h1>
        <p style={styles.subtitle}>
          <Clock size={16} />
          {unreadCount} unread notifications
        </p>
      </div>

      <div style={styles.controls}>
        <div style={styles.searchContainer}>
          <Search style={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="Search notifications..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          style={styles.filterSelect}
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Notifications</option>
          <option value="unread">Unread Only</option>
          <option value="info">Info</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
          <option value="submission">Submissions</option>
          <option value="approval">Approvals</option>
          <option value="wallet">Wallet</option>
          <option value="system">System</option>
        </select>

        {unreadCount > 0 && (
          <motion.button
            style={styles.markAllButton}
            onClick={markAllAsRead}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Check size={16} />
            Mark All Read
          </motion.button>
        )}
      </div>

      <div style={styles.notificationsList}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              style={{
                ...styles.notificationCard,
                ...(notification.read ? {} : styles.unreadCard)
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)' }}
            >
              <div style={styles.notificationHeader}>
                <div style={styles.notificationInfo}>
                  {getTypeIcon(notification.type)}
                  <div style={styles.notificationContent}>
                    <h3 style={styles.notificationTitle}>
                      {notification.title}
                      {!notification.read && (
                        <span style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: '#3b82f6',
                          borderRadius: '50%',
                          display: 'inline-block',
                          marginLeft: '0.5rem'
                        }} />
                      )}
                    </h3>
                    <p style={styles.notificationMessage}>
                      {notification.message}
                    </p>
                    <div style={styles.notificationMeta}>
                      <span>{formatTimestamp(notification.timestamp)}</span>
                      <span
                        style={{
                          ...styles.categoryBadge,
                          backgroundColor: getCategoryColor(notification.category)
                        }}
                      >
                        {notification.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div style={styles.actionButtons}>
                  {!notification.read && (
                    <motion.button
                      style={{...styles.actionButton, ...styles.markReadButton}}
                      onClick={() => markAsRead(notification.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Mark as read"
                    >
                      <Check size={16} />
                    </motion.button>
                  )}
                  <motion.button
                    style={{...styles.actionButton, ...styles.deleteButton}}
                    onClick={() => dismissNotification(notification.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Delete notification"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div style={styles.emptyState}>
            <Bell size={48} color="#d1d5db" />
            <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
              No notifications found
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NotificationsCenter;
