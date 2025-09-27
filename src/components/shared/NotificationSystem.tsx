import React, { useState, useEffect } from 'react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationSystemProps {
  userRole: 'community' | 'ngo' | 'panchayat' | 'corporate' | 'nccr';
  className?: string;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ userRole, className = '' }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Generate mock notifications based on user role
  const generateMockNotifications = (): Notification[] => {
    const baseNotifications = {
      community: [
        {
          id: '1',
          type: 'success' as const,
          title: '🌱 Trees Verified!',
          message: 'Your 25 mangrove saplings have been verified by our NGO partner.',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          read: false,
          action: {
            label: 'View Details',
            onClick: () => console.log('Navigate to verification details')
          }
        },
        {
          id: '2',
          type: 'info' as const,
          title: '💰 Payment Processed',
          message: '₹2,500 has been credited to your account for carbon credit rewards.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          read: false,
        },
        {
          id: '3',
          type: 'warning' as const,
          title: '📋 Data Submission Due',
          message: 'Monthly plantation data submission deadline is tomorrow.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
          read: true,
        },
        {
          id: '4',
          type: 'info' as const,
          title: '🎯 Achievement Unlocked',
          message: 'Congratulations! You\'ve reached the "Green Guardian" milestone.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          read: true,
        }
      ],
      ngo: [
        {
          id: '1',
          type: 'success' as const,
          title: '✅ Project Approved',
          message: 'Coastal Restoration Project Phase 2 has been approved by NCCR.',
          timestamp: new Date(Date.now() - 1000 * 60 * 45),
          read: false,
        },
        {
          id: '2',
          type: 'warning' as const,
          title: '⚠️ Verification Pending',
          message: '15 community projects require verification by tomorrow.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
          read: false,
        },
        {
          id: '3',
          type: 'info' as const,
          title: '📊 Monthly Report',
          message: 'Your impact report for November is ready for download.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
          read: true,
        }
      ],
      corporate: [
        {
          id: '1',
          type: 'success' as const,
          title: '🛒 Credits Purchased',
          message: '500 carbon credits successfully purchased from verified projects.',
          timestamp: new Date(Date.now() - 1000 * 60 * 20),
          read: false,
        },
        {
          id: '2',
          type: 'info' as const,
          title: '📈 New Projects Available',
          message: '12 new verified blue carbon projects available for investment.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
          read: false,
        },
        {
          id: '3',
          type: 'success' as const,
          title: '🎖️ Sustainability Report',
          message: 'Your Q3 sustainability report has been generated.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
          read: true,
        }
      ]
    };

    return baseNotifications[userRole] || baseNotifications.community;
  };

  useEffect(() => {
    const mockNotifications = generateMockNotifications();
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);

    // Simulate new notifications
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every 30 seconds
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ['success', 'info', 'warning'][Math.floor(Math.random() * 3)] as any,
          title: '🔔 New Update',
          message: 'A new activity has occurred in your dashboard.',
          timestamp: new Date(),
          read: false,
        };
        
        setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
        setUnreadCount(prev => prev + 1);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [userRole]);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const getNotificationIcon = (type: Notification['type']) => {
    const icons = {
      success: '✅',
      warning: '⚠️',
      info: 'ℹ️',
      error: '❌'
    };
    return icons[type];
  };

  const getNotificationColor = (type: Notification['type']) => {
    const colors = {
      success: 'border-green-200 bg-green-50',
      warning: 'border-yellow-200 bg-yellow-50',
      info: 'border-blue-200 bg-blue-50',
      error: 'border-red-200 bg-red-50'
    };
    return colors[type];
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className={`relative ${className}`}>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full bg-white shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-20 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  🔔 Notifications
                </h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p>No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !notification.read ? 'bg-blue-25' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className={`rounded-lg border p-3 ${getNotificationColor(notification.type)}`}>
                      <div className="flex items-start gap-3">
                        <span className="text-lg">
                          {getNotificationIcon(notification.type)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-gray-800">
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">
                              {getTimeAgo(notification.timestamp)}
                            </span>
                            {notification.action && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  notification.action!.onClick();
                                }}
                                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                              >
                                {notification.action.label}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <button className="w-full text-sm text-gray-600 hover:text-gray-800 font-medium">
                View All Notifications
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationSystem;
