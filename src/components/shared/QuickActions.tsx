import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  route?: string;
  onClick?: () => void;
  badge?: string;
  shortcut?: string;
}

interface QuickActionsProps {
  userRole: 'community' | 'ngo' | 'panchayat' | 'corporate' | 'nccr';
  className?: string;
}

const QuickActions: React.FC<QuickActionsProps> = ({ userRole, className = '' }) => {
  const navigate = useNavigate();
  const [recentActions, setRecentActions] = useState<string[]>([]);

  const getQuickActions = (): QuickAction[] => {
    const actionsByRole = {
      community: [
        {
          id: 'register-land',
          title: 'Register Land',
          description: 'Add new land for plantation',
          icon: '🗺️',
          color: 'bg-green-500 hover:bg-green-600',
          route: '/land-registration',
          shortcut: 'Ctrl+R'
        },
        {
          id: 'submit-data',
          title: 'Submit Data',
          description: 'Upload plantation progress',
          icon: '📊',
          color: 'bg-blue-500 hover:bg-blue-600',
          route: '/plantation-data-input',
          badge: 'Due Soon'
        },
        {
          id: 'track-impact',
          title: 'Track Impact',
          description: 'View your environmental impact',
          icon: '🌱',
          color: 'bg-purple-500 hover:bg-purple-600',
          route: '/track-impact'
        },
        {
          id: 'earn-credits',
          title: 'Earn Credits',
          description: 'Convert impact to rewards',
          icon: '💰',
          color: 'bg-yellow-500 hover:bg-yellow-600',
          route: '/earn-credits'
        },
        {
          id: 'connect-wallet',
          title: 'Connect Wallet',
          description: 'Link Web3 wallet',
          icon: '🦊',
          color: 'bg-orange-500 hover:bg-orange-600',
          onClick: () => {
            // Open wallet connection modal
            console.log('Opening wallet connection');
          }
        },
        {
          id: 'view-ndvi',
          title: 'NDVI Analysis',
          description: 'Satellite vegetation data',
          icon: '🛰️',
          color: 'bg-indigo-500 hover:bg-indigo-600',
          route: '/ndvi-dashboard'
        }
      ],
      ngo: [
        {
          id: 'verify-projects',
          title: 'Verify Projects',
          description: 'Review pending submissions',
          icon: '✅',
          color: 'bg-green-500 hover:bg-green-600',
          route: '/ngo-verification',
          badge: '15 Pending'
        },
        {
          id: 'create-project',
          title: 'New Project',
          description: 'Start community initiative',
          icon: '🚀',
          color: 'bg-blue-500 hover:bg-blue-600',
          onClick: () => console.log('Creating new project')
        },
        {
          id: 'generate-report',
          title: 'Generate Report',
          description: 'Create impact assessment',
          icon: '📋',
          color: 'bg-purple-500 hover:bg-purple-600',
          onClick: () => console.log('Generating report')
        },
        {
          id: 'manage-communities',
          title: 'Communities',
          description: 'Manage partner communities',
          icon: '👥',
          color: 'bg-teal-500 hover:bg-teal-600',
          onClick: () => console.log('Managing communities')
        },
        {
          id: 'funding-opportunities',
          title: 'Find Funding',
          description: 'Discover funding sources',
          icon: '💡',
          color: 'bg-amber-500 hover:bg-amber-600',
          onClick: () => console.log('Finding funding')
        },
        {
          id: 'training-materials',
          title: 'Training Hub',
          description: 'Access learning resources',
          icon: '📚',
          color: 'bg-pink-500 hover:bg-pink-600',
          onClick: () => console.log('Opening training hub')
        }
      ],
      corporate: [
        {
          id: 'browse-credits',
          title: 'Browse Credits',
          description: 'Find carbon credits to buy',
          icon: '🛒',
          color: 'bg-blue-500 hover:bg-blue-600',
          route: '/corporate-marketplace',
          badge: '42 New'
        },
        {
          id: 'portfolio-management',
          title: 'Portfolio',
          description: 'Manage credit investments',
          icon: '📈',
          color: 'bg-green-500 hover:bg-green-600',
          route: '/corporate-portfolio'
        },
        {
          id: 'sustainability-report',
          title: 'ESG Report',
          description: 'Generate sustainability report',
          icon: '📊',
          color: 'bg-purple-500 hover:bg-purple-600',
          route: '/impact-reporting'
        },
        {
          id: 'fund-projects',
          title: 'Fund Projects',
          description: 'Support blue carbon projects',
          icon: '🌊',
          color: 'bg-cyan-500 hover:bg-cyan-600',
          onClick: () => console.log('Funding projects')
        },
        {
          id: 'carbon-calculator',
          title: 'Calculate Footprint',
          description: 'Assess carbon emissions',
          icon: '🧮',
          color: 'bg-indigo-500 hover:bg-indigo-600',
          onClick: () => console.log('Opening carbon calculator')
        },
        {
          id: 'compliance-check',
          title: 'Compliance',
          description: 'Check regulatory status',
          icon: '⚖️',
          color: 'bg-gray-500 hover:bg-gray-600',
          onClick: () => console.log('Checking compliance')
        }
      ]
    };

    return actionsByRole[userRole] || actionsByRole.community;
  };

  const handleActionClick = (action: QuickAction) => {
    // Track recent actions
    setRecentActions(prev => [action.id, ...prev.slice(0, 2)]);
    
    if (action.route) {
      navigate(action.route);
    } else if (action.onClick) {
      action.onClick();
    }
  };

  const actions = getQuickActions();
  const frequentActions = actions.filter(action => recentActions.includes(action.id));
  const otherActions = actions.filter(action => !recentActions.includes(action.id));

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800">⚡ Quick Actions</h3>
          <p className="text-sm text-gray-600">Streamline your workflow</p>
        </div>
        <button className="text-sm text-gray-500 hover:text-gray-700">
          Customize
        </button>
      </div>

      {/* Frequently Used Actions */}
      {frequentActions.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            🔥 Frequently Used
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {frequentActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleActionClick(action)}
                className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg group`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{action.icon}</span>
                  <div className="text-left flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{action.title}</div>
                    <div className="text-xs opacity-90 truncate">{action.description}</div>
                  </div>
                </div>
                {action.badge && (
                  <div className="mt-2 inline-block bg-white bg-opacity-20 rounded-full px-2 py-1 text-xs">
                    {action.badge}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* All Actions */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          🎯 All Actions
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {otherActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleActionClick(action)}
              className="bg-white border-2 border-gray-100 hover:border-gray-200 p-4 rounded-lg transition-all duration-200 hover:shadow-md group text-left relative overflow-hidden"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                  {action.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800 truncate">{action.title}</div>
                  <div className="text-sm text-gray-600 truncate mt-1">{action.description}</div>
                  {action.shortcut && (
                    <div className="text-xs text-gray-400 mt-2 font-mono">
                      {action.shortcut}
                    </div>
                  )}
                </div>
              </div>
              
              {action.badge && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {action.badge}
                </div>
              )}

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard Shortcuts Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-semibold text-gray-700">⌨️ Pro Tip:</span>
        </div>
        <p className="text-xs text-gray-600">
          Use keyboard shortcuts to quickly access your most-used actions. Press{' '}
          <kbd className="bg-gray-200 px-1 rounded">Ctrl + K</kbd> to open quick command palette.
        </p>
      </div>

      {/* Recently Used Stats */}
      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <span>🕒 Last action: 2 minutes ago</span>
        <span>📊 {actions.length} actions available</span>
      </div>
    </div>
  );
};

export default QuickActions;
