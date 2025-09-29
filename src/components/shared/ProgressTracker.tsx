import React, { useState, useEffect } from 'react';

interface Goal {
  id: string;
  title: string;
  description: string;
  current: number;
  target: number;
  unit: string;
  category: 'carbon' | 'trees' | 'area' | 'community' | 'earnings';
  deadline: Date;
  priority: 'low' | 'medium' | 'high';
  color: string;
}

interface ProgressTrackerProps {
  userRole: 'community' | 'ngo' | 'panchayat' | 'corporate' | 'nccr';
  className?: string;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ userRole, className = '' }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCompleted, setShowCompleted] = useState(true);

  const generateGoals = (): Goal[] => {
    const goalTemplates = {
      community: [
        {
          id: '1',
          title: 'Plant 100 Mangroves',
          description: 'Contribute to coastal restoration by planting mangrove saplings',
          current: 67,
          target: 100,
          unit: 'trees',
          category: 'trees' as const,
          deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
          priority: 'high' as const,
          color: '#10b981'
        },
        {
          id: '2',
          title: 'Capture 5 tons CO₂',
          description: 'Annual carbon sequestration target through plantation activities',
          current: 3.2,
          target: 5.0,
          unit: 'tons CO₂',
          category: 'carbon' as const,
          deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45),
          priority: 'medium' as const,
          color: '#059669'
        },
        {
          id: '3',
          title: 'Restore 2 Hectares',
          description: 'Land restoration and afforestation project completion',
          current: 1.3,
          target: 2.0,
          unit: 'hectares',
          category: 'area' as const,
          deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
          priority: 'high' as const,
          color: '#3b82f6'
        },
        {
          id: '4',
          title: 'Earn ₹10,000',
          description: 'Monthly earnings target from carbon credit rewards',
          current: 6500,
          target: 10000,
          unit: '₹',
          category: 'earnings' as const,
          deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8),
          priority: 'medium' as const,
          color: '#f59e0b'
        }
      ],
      ngo: [
        {
          id: '1',
          title: 'Verify 500 Projects',
          description: 'Community project verification target for this quarter',
          current: 342,
          target: 500,
          unit: 'projects',
          category: 'community' as const,
          deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20),
          priority: 'high' as const,
          color: '#8b5cf6'
        },
        {
          id: '2',
          title: 'Plant 5,000 Trees',
          description: 'Annual tree plantation drive across partner communities',
          current: 3800,
          target: 5000,
          unit: 'trees',
          category: 'trees' as const,
          deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60),
          priority: 'medium' as const,
          color: '#10b981'
        },
        {
          id: '3',
          title: 'Sequester 50 tons CO₂',
          description: 'Total carbon sequestration through all verified projects',
          current: 38.5,
          target: 50.0,
          unit: 'tons CO₂',
          category: 'carbon' as const,
          deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
          priority: 'high' as const,
          color: '#059669'
        }
      ],
      corporate: [
        {
          id: '1',
          title: 'Purchase 1,000 Credits',
          description: 'Annual carbon credit procurement for offset goals',
          current: 750,
          target: 1000,
          unit: 'credits',
          category: 'carbon' as const,
          deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 40),
          priority: 'high' as const,
          color: '#059669'
        },
        {
          id: '2',
          title: 'Fund 10 Projects',
          description: 'Support community-led blue carbon projects',
          current: 7,
          target: 10,
          unit: 'projects',
          category: 'community' as const,
          deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 25),
          priority: 'medium' as const,
          color: '#8b5cf6'
        },
        {
          id: '3',
          title: 'Restore 50 Hectares',
          description: 'Cumulative area restoration through funded projects',
          current: 32.8,
          target: 50.0,
          unit: 'hectares',
          category: 'area' as const,
          deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 75),
          priority: 'high' as const,
          color: '#3b82f6'
        }
      ]
    };

    return goalTemplates[userRole] || goalTemplates.community;
  };

  useEffect(() => {
    setGoals(generateGoals());
  }, [userRole]);

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (deadline: Date) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return Math.max(0, days);
  };

  const getPriorityColor = (priority: Goal['priority']) => {
    const colors = {
      low: 'text-green-600 bg-green-100',
      medium: 'text-yellow-600 bg-yellow-100',
      high: 'text-red-600 bg-red-100'
    };
    return colors[priority];
  };

  const getCategoryIcon = (category: Goal['category']) => {
    const icons = {
      carbon: '🌍',
      trees: '🌳',
      area: '🗺️',
      community: '👥',
      earnings: '💰'
    };
    return icons[category];
  };

  const filteredGoals = goals.filter(goal => {
    if (selectedCategory !== 'all' && goal.category !== selectedCategory) {
      return false;
    }
    if (!showCompleted && getProgressPercentage(goal.current, goal.target) === 100) {
      return false;
    }
    return true;
  });

  const categories = ['all', 'carbon', 'trees', 'area', 'community', 'earnings'];

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800">🎯 Progress Tracker</h3>
          <p className="text-sm text-gray-600">Track your goals and milestones</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
              className="mr-2"
            />
            Show completed
          </label>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? '🎯 All' : `${getCategoryIcon(category as Goal['category'])} ${category}`}
          </button>
        ))}
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {filteredGoals.map((goal) => {
          const progress = getProgressPercentage(goal.current, goal.target);
          const daysLeft = getDaysRemaining(goal.deadline);
          const isCompleted = progress === 100;
          
          return (
            <div
              key={goal.id}
              className={`border rounded-lg p-4 transition-all hover:shadow-md ${
                isCompleted ? 'bg-green-50 border-green-200' : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{getCategoryIcon(goal.category)}</span>
                    <h4 className="font-semibold text-gray-800">{goal.title}</h4>
                    {isCompleted && <span className="text-green-600">✅</span>}
                  </div>
                  <p className="text-sm text-gray-600">{goal.description}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                    {goal.priority}
                  </span>
                  <span className="text-xs text-gray-500">
                    {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {goal.current.toLocaleString()} / {goal.target.toLocaleString()} {goal.unit}
                  </span>
                  <span className="text-sm font-medium" style={{ color: goal.color }}>
                    {progress.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                    style={{ 
                      width: `${progress}%`, 
                      backgroundColor: goal.color 
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                    Update Progress
                  </button>
                  <button className="text-xs text-gray-500 hover:text-gray-700 font-medium">
                    Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {filteredGoals.filter(g => getProgressPercentage(g.current, g.target) === 100).length}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {filteredGoals.filter(g => getProgressPercentage(g.current, g.target) > 50 && getProgressPercentage(g.current, g.target) < 100).length}
          </div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {filteredGoals.filter(g => getDaysRemaining(g.deadline) <= 7 && getDaysRemaining(g.deadline) > 0).length}
          </div>
          <div className="text-sm text-gray-600">Due Soon</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {(filteredGoals.reduce((acc, g) => acc + getProgressPercentage(g.current, g.target), 0) / filteredGoals.length).toFixed(0)}%
          </div>
          <div className="text-sm text-gray-600">Avg Progress</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
