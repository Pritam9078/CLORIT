import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface AnalyticsWidgetProps {
  userRole: 'community' | 'ngo' | 'panchayat' | 'corporate' | 'nccr';
  className?: string;
}

const AnalyticsWidget: React.FC<AnalyticsWidgetProps> = ({ userRole, className = '' }) => {
  const [selectedMetric, setSelectedMetric] = useState<'carbon' | 'trees' | 'earnings' | 'projects'>('carbon');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [animationKey, setAnimationKey] = useState(0);

  // Mock data generation based on user role
  const generateMockData = () => {
    const baseData = {
      community: {
        carbon: [2.1, 2.5, 3.2, 2.8, 3.5, 4.1, 3.9, 4.5, 5.2, 4.8, 5.5, 6.2],
        trees: [15, 18, 25, 22, 28, 35, 32, 38, 45, 42, 48, 55],
        earnings: [1200, 1500, 2100, 1800, 2400, 3100, 2800, 3400, 4200, 3800, 4500, 5200],
        projects: [1, 1, 2, 2, 3, 3, 4, 4, 5, 6, 7, 8]
      },
      ngo: {
        carbon: [15.5, 18.2, 22.1, 19.8, 25.3, 28.7, 26.4, 31.2, 35.8, 33.1, 38.4, 42.7],
        trees: [120, 145, 180, 165, 205, 240, 225, 265, 310, 285, 330, 375],
        earnings: [8500, 10200, 12800, 11500, 14800, 17200, 15900, 19100, 22400, 20800, 24300, 28100],
        projects: [3, 4, 5, 6, 7, 8, 9, 11, 13, 14, 16, 18]
      },
      corporate: {
        carbon: [125.8, 142.3, 168.7, 155.2, 189.4, 212.6, 198.3, 225.8, 251.4, 238.9, 267.2, 294.5],
        trees: [850, 980, 1150, 1065, 1285, 1420, 1335, 1540, 1725, 1640, 1845, 2050],
        earnings: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Corporate buys, doesn't earn
        projects: [12, 15, 18, 21, 25, 28, 32, 36, 41, 45, 50, 55]
      }
    };

    const data = baseData[userRole] || baseData.community;
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return {
      labels,
      datasets: [{
        label: getMetricLabel(),
        data: data[selectedMetric],
        borderColor: getMetricColor(),
        backgroundColor: `${getMetricColor()}20`,
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: getMetricColor(),
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      }]
    };
  };

  const generateProjectDistribution = () => {
    const distributions = {
      community: { 'Mangrove Restoration': 40, 'Tree Planting': 35, 'Soil Conservation': 25 },
      ngo: { 'Community Projects': 45, 'Research Initiatives': 30, 'Education Programs': 25 },
      corporate: { 'Carbon Offsetting': 50, 'Sustainability Projects': 30, 'Green Initiatives': 20 }
    };

    const dist = distributions[userRole] || distributions.community;
    
    return {
      labels: Object.keys(dist),
      datasets: [{
        data: Object.values(dist),
        backgroundColor: ['#10b981', '#3b82f6', '#8b5cf6'],
        borderColor: ['#059669', '#2563eb', '#7c3aed'],
        borderWidth: 2,
      }]
    };
  };

  const getMetricLabel = () => {
    const labels = {
      carbon: 'CO₂ Captured (tons)',
      trees: 'Trees Planted',
      earnings: 'Earnings (₹)',
      projects: 'Active Projects'
    };
    return labels[selectedMetric];
  };

  const getMetricColor = () => {
    const colors = {
      carbon: '#10b981',
      trees: '#3b82f6',
      earnings: '#f59e0b',
      projects: '#8b5cf6'
    };
    return colors[selectedMetric];
  };

  const getCurrentValue = () => {
    const data = generateMockData();
    const currentData = data.datasets[0].data;
    return currentData[currentData.length - 1];
  };

  const getGrowthRate = () => {
    const data = generateMockData();
    const currentData = data.datasets[0].data;
    const current = currentData[currentData.length - 1];
    const previous = currentData[currentData.length - 2];
    return ((current - previous) / previous * 100).toFixed(1);
  };

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [selectedMetric, timeRange]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        cornerRadius: 8,
        displayColors: false,
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#6b7280',
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#6b7280',
        }
      }
    },
    elements: {
      point: {
        hoverBackgroundColor: '#ffffff',
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          color: '#374151'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        cornerRadius: 8,
      }
    },
    animation: {
      animateRotate: true,
      duration: 1000,
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800">📊 Analytics Dashboard</h3>
          <p className="text-sm text-gray-600">Track your environmental impact</p>
        </div>
        <div className="flex gap-2">
          {(['7d', '30d', '90d', '1y'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {(['carbon', 'trees', 'earnings', 'projects'] as const).map((metric) => (
          <button
            key={metric}
            onClick={() => setSelectedMetric(metric)}
            className={`p-4 rounded-lg border transition-all duration-200 ${
              selectedMetric === metric
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                selectedMetric === metric ? 'text-blue-600' : 'text-gray-700'
              }`}>
                {getCurrentValue()}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {getMetricLabel()}
              </div>
              <div className={`text-xs mt-1 font-medium ${
                parseFloat(getGrowthRate()) >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {parseFloat(getGrowthRate()) >= 0 ? '↑' : '↓'} {Math.abs(parseFloat(getGrowthRate()))}%
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            {getMetricLabel()} Trend
          </h4>
          <div className="h-64">
            <Line key={animationKey} data={generateMockData()} options={chartOptions} />
          </div>
        </div>

        {/* Project Distribution */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            Project Distribution
          </h4>
          <div className="h-64">
            <Doughnut data={generateProjectDistribution()} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="text-green-600 text-sm font-medium">Total Impact</div>
          <div className="text-green-800 text-lg font-bold">High</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="text-blue-600 text-sm font-medium">This Month</div>
          <div className="text-blue-800 text-lg font-bold">+{getGrowthRate()}%</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
          <div className="text-purple-600 text-sm font-medium">Ranking</div>
          <div className="text-purple-800 text-lg font-bold">Top 10%</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="text-amber-600 text-sm font-medium">Next Goal</div>
          <div className="text-amber-800 text-lg font-bold">85%</div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWidget;
