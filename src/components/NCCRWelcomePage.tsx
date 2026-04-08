import React from 'react';
import { BarChart3, Users, Leaf, TrendingUp, MapPin, Activity } from 'lucide-react';

const NCCRWelcomePage: React.FC = () => {
  const quickStats = [
    {
      icon: <Leaf className="w-8 h-8" />,
      label: 'Active Projects',
      value: '150+',
      color: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: <Users className="w-8 h-8" />,
      label: 'Verified Users',
      value: '1,200+',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      label: 'Carbon Credits',
      value: '45K+',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      label: 'Coastal Sites',
      value: '50+',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50'
    }
  ];

  const recentActivities = [
    {
      title: 'New Project Submitted',
      description: 'Sundarbans Mangrove Restoration - West Bengal',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      title: 'Carbon Credits Minted',
      description: '2,500 credits verified and minted for Project #2001',
      time: '5 hours ago',
      status: 'success'
    },
    {
      title: 'Verification Completed',
      description: 'AI analysis passed for Andhra Pradesh coastal site',
      time: '1 day ago',
      status: 'success'
    },
    {
      title: 'User Registration',
      description: '15 new community members joined the platform',
      time: '2 days ago',
      status: 'info'
    }
  ];

  const quickActions = [
    {
      title: 'Review Projects',
      description: 'View and approve pending project submissions',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'emerald'
    },
    {
      title: 'Mint Credits',
      description: 'Process verified projects for carbon credit minting',
      icon: <Leaf className="w-6 h-6" />,
      color: 'blue'
    },
    {
      title: 'Monitor Activity',
      description: 'Track real-time platform usage and metrics',
      icon: <Activity className="w-6 h-6" />,
      color: 'purple'
    },
    {
      title: 'View Reports',
      description: 'Generate and download platform analytics',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'teal'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to CLORIT Admin Portal
          </h1>
          <p className="text-lg text-gray-600">
            Manage your blue carbon registry and monitor platform activities
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className={`w-16 h-16 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                <div className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions - 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className={`group p-6 rounded-xl border-2 border-gray-200 hover:border-${action.color}-500 hover:bg-${action.color}-50 transition-all duration-300 text-left`}
                  >
                    <div className={`w-12 h-12 bg-${action.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <div className={`text-${action.color}-600`}>
                        {action.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity - 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${activity.status === 'success' ? 'bg-green-500' :
                          activity.status === 'pending' ? 'bg-yellow-500' :
                            'bg-blue-500'
                        }`}></div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">
                          {activity.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2">
                          {activity.description}
                        </p>
                        <span className="text-xs text-gray-400">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Platform Overview */}
        <div className="mt-6 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2 opacity-90">Platform Status</h3>
              <p className="text-3xl font-bold">Operational</p>
              <p className="text-sm opacity-80 mt-1">All systems running smoothly</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 opacity-90">Total CO₂ Captured</h3>
              <p className="text-3xl font-bold">425,891 t</p>
              <p className="text-sm opacity-80 mt-1">Across all verified projects</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 opacity-90">Area Restored</h3>
              <p className="text-3xl font-bold">3,245 ha</p>
              <p className="text-sm opacity-80 mt-1">Mangrove and coastal ecosystems</p>
            </div>
          </div>
        </div>

        {/* Getting Started Guide */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-600 font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Review Dashboard</h4>
                <p className="text-sm text-gray-600">
                  Navigate to the Dashboard tab to view detailed analytics and metrics
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Manage Projects</h4>
                <p className="text-sm text-gray-600">
                  Access the Projects tab to review, approve, or reject submissions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Monitor NDVI</h4>
                <p className="text-sm text-gray-600">
                  Use the NDVI tab for real-time satellite monitoring of restoration sites
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NCCRWelcomePage;
