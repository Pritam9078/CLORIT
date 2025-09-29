import React, { useState, useEffect } from 'react';

interface ActivityItem {
  id: string;
  type: 'plantation' | 'verification' | 'credit' | 'report' | 'registration' | 'purchase' | 'system';
  title: string;
  description: string;
  timestamp: Date;
  user: {
    name: string;
    role: string;
    avatar?: string;
  };
  status?: 'success' | 'pending' | 'failed' | 'info';
  metadata?: {
    location?: string;
    amount?: number;
    credits?: number;
    area?: number;
  };
}

interface ActivityFeedProps {
  className?: string;
  maxItems?: number;
  userRole?: string;
  filterByRole?: boolean;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ 
  className = '', 
  maxItems = 20,
  userRole = 'farmer',
  filterByRole = false
}) => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [filter, setFilter] = useState<'all' | ActivityItem['type']>('all');
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);

  // Mock activity data generator
  const generateMockActivities = (): ActivityItem[] => {
    const mockActivities: ActivityItem[] = [
      {
        id: '1',
        type: 'plantation',
        title: 'New Plantation Registered',
        description: 'Mango plantation registered in Sector 12',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        user: { name: 'Rajesh Kumar', role: 'Farmer', avatar: '👨‍🌾' },
        status: 'success',
        metadata: { location: 'Sector 12', area: 5.2 }
      },
      {
        id: '2',
        type: 'verification',
        title: 'Plantation Verified',
        description: 'Tree count and health assessment completed',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        user: { name: 'Dr. Priya Singh', role: 'NGO Officer', avatar: '👩‍🔬' },
        status: 'success',
        metadata: { location: 'Sector 8', credits: 25 }
      },
      {
        id: '3',
        type: 'credit',
        title: 'Carbon Credits Minted',
        description: '50 carbon credits minted for verified plantation',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        user: { name: 'System', role: 'Automated', avatar: '🤖' },
        status: 'success',
        metadata: { credits: 50, amount: 2500 }
      },
      {
        id: '4',
        type: 'purchase',
        title: 'Credits Purchased',
        description: 'Corporate buyer acquired 100 carbon credits',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        user: { name: 'Green Corp Ltd', role: 'Corporate Buyer', avatar: '🏢' },
        status: 'success',
        metadata: { credits: 100, amount: 5000 }
      },
      {
        id: '5',
        type: 'report',
        title: 'Monthly Report Generated',
        description: 'Environmental impact report for Q4 2024',
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        user: { name: 'NCCR Admin', role: 'Administrator', avatar: '👥' },
        status: 'info',
        metadata: { location: 'All Sectors' }
      },
      {
        id: '6',
        type: 'registration',
        title: 'New Land Registered',
        description: 'Agricultural land parcel registered for afforestation',
        timestamp: new Date(Date.now() - 90 * 60 * 1000),
        user: { name: 'Sunita Devi', role: 'Farmer', avatar: '👩‍🌾' },
        status: 'pending',
        metadata: { location: 'Sector 15', area: 3.7 }
      },
      {
        id: '7',
        type: 'system',
        title: 'Maintenance Complete',
        description: 'System maintenance and updates successfully deployed',
        timestamp: new Date(Date.now() - 120 * 60 * 1000),
        user: { name: 'System Admin', role: 'Technical', avatar: '⚙️' },
        status: 'success'
      },
      {
        id: '8',
        type: 'verification',
        title: 'Verification Pending',
        description: 'Awaiting field inspection for new plantation',
        timestamp: new Date(Date.now() - 180 * 60 * 1000),
        user: { name: 'Amit Sharma', role: 'Farmer', avatar: '👨‍🌾' },
        status: 'pending',
        metadata: { location: 'Sector 6', area: 2.1 }
      }
    ];

    return mockActivities.slice(0, maxItems);
  };

  useEffect(() => {
    const activities = generateMockActivities();
    setActivities(activities);

    if (!isAutoRefresh) return;

    // Simulate new activities every 30 seconds
    const interval = setInterval(() => {
      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        type: ['plantation', 'verification', 'credit', 'purchase'][Math.floor(Math.random() * 4)] as ActivityItem['type'],
        title: 'New Activity',
        description: 'A new activity has been recorded in the system',
        timestamp: new Date(),
        user: {
          name: ['John Doe', 'Jane Smith', 'System'][Math.floor(Math.random() * 3)],
          role: ['Farmer', 'NGO Officer', 'Corporate Buyer'][Math.floor(Math.random() * 3)],
          avatar: ['👨‍🌾', '👩‍🔬', '🏢'][Math.floor(Math.random() * 3)]
        },
        status: ['success', 'pending', 'info'][Math.floor(Math.random() * 3)] as ActivityItem['status']
      };

      setActivities(prev => [newActivity, ...prev.slice(0, maxItems - 1)]);
    }, 30000);

    return () => clearInterval(interval);
  }, [maxItems, isAutoRefresh]);

  const getActivityIcon = (type: ActivityItem['type'], status?: string) => {
    const icons = {
      plantation: '🌱',
      verification: '✅',
      credit: '🪙',
      purchase: '💰',
      registration: '📋',
      report: '📊',
      system: '⚙️'
    };

    return icons[type] || '📄';
  };

  const getStatusColor = (status?: string) => {
    const colors = {
      success: 'text-green-600 bg-green-100',
      pending: 'text-yellow-600 bg-yellow-100',
      failed: 'text-red-600 bg-red-100',
      info: 'text-blue-600 bg-blue-100'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const filteredActivities = activities.filter(activity => 
    filter === 'all' || activity.type === filter
  );

  const activityTypes = ['all', 'plantation', 'verification', 'credit', 'purchase', 'registration', 'report', 'system'];

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-xl">📱</span>
            <div>
              <h3 className="font-semibold text-gray-800">Activity Feed</h3>
              <p className="text-sm text-gray-600">
                Recent activities • {filteredActivities.length} items
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsAutoRefresh(!isAutoRefresh)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              isAutoRefresh 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isAutoRefresh ? '🔄 Live' : '⏸ Paused'}
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1">
          {activityTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filter === type
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Activities List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredActivities.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <div className="text-4xl mb-2">📭</div>
            <p>No activities found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  {/* Avatar/Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                      {activity.user.avatar || getActivityIcon(activity.type, activity.status)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {activity.description}
                        </p>
                        
                        {/* Metadata */}
                        {activity.metadata && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {activity.metadata.location && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                                📍 {activity.metadata.location}
                              </span>
                            )}
                            {activity.metadata.area && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-600">
                                🌿 {activity.metadata.area} acres
                              </span>
                            )}
                            {activity.metadata.credits && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-600">
                                🪙 {activity.metadata.credits} credits
                              </span>
                            )}
                            {activity.metadata.amount && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-600">
                                💰 ₹{activity.metadata.amount}
                              </span>
                            )}
                          </div>
                        )}
                        
                        {/* User and Time */}
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <span>{activity.user.name}</span>
                          <span>•</span>
                          <span>{activity.user.role}</span>
                          <span>•</span>
                          <span>{formatTimeAgo(activity.timestamp)}</span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      {activity.status && (
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                          {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            Last updated: {new Date().toLocaleTimeString()}
          </span>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            View All Activities →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
