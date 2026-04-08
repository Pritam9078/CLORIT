import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
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
  RadialLinearScale,
  Filler,
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
  ArcElement,
  RadialLinearScale,
  Filler
);

interface DataVisualizationHubProps {
  className?: string;
  userRole?: string;
}

interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string;
  tension?: number;
  fill?: boolean;
}

interface MetricCard {
  title: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
  icon: string;
  color: string;
}

const DataVisualizationHub: React.FC<DataVisualizationHubProps> = ({ 
  className = '', 
  userRole = 'farmer' 
}) => {
  const [selectedChart, setSelectedChart] = useState<'line' | 'bar' | 'doughnut' | 'radar'>('line');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '3m' | '1y'>('30d');
  const [metrics, setMetrics] = useState<MetricCard[]>([]);

  useEffect(() => {
    // Generate mock metrics based on user role
    const generateMetrics = (): MetricCard[] => {
      const baseMetrics = [
        {
          title: 'Carbon Credits Earned',
          value: '1,247',
          trend: 'up' as const,
          change: '+12.5%',
          icon: '🌱',
          color: 'text-green-600'
        },
        {
          title: 'Trees Planted',
          value: '3,456',
          trend: 'up' as const,
          change: '+8.3%',
          icon: '🌳',
          color: 'text-blue-600'
        },
        {
          title: 'Environmental Impact',
          value: '89.2%',
          trend: 'stable' as const,
          change: '+0.8%',
          icon: '🌍',
          color: 'text-purple-600'
        },
        {
          title: 'Revenue Generated',
          value: '₹2,45,680',
          trend: 'up' as const,
          change: '+15.2%',
          icon: '💰',
          color: 'text-orange-600'
        }
      ];

      return baseMetrics;
    };

    setMetrics(generateMetrics());
  }, [userRole]);

  // Generate mock data for different time ranges
  const generateTimeSeriesData = (range: string) => {
    const dataPoints = range === '7d' ? 7 : range === '30d' ? 30 : range === '3m' ? 90 : 365;
    const labels = [];
    const data = [];

    for (let i = 0; i < dataPoints; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (dataPoints - i - 1));
      
      if (range === '7d') {
        labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
      } else if (range === '30d') {
        labels.push(date.getDate().toString());
      } else if (range === '3m') {
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      } else {
        labels.push(date.toLocaleDateString('en-US', { month: 'short' }));
      }

      // Generate realistic mock data with some variation
      data.push(Math.floor(Math.random() * 100) + 50 + (i * 2));
    }

    return { labels, data };
  };

  const getChartData = () => {
    const { labels, data } = generateTimeSeriesData(timeRange);

    switch (selectedChart) {
      case 'line':
        return {
          labels,
          datasets: [
            {
              label: 'Carbon Credits',
              data,
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
              fill: true
            },
            {
              label: 'Environmental Impact',
              data: data.map(d => d * 0.8 + Math.random() * 20),
              borderColor: 'rgb(34, 197, 94)',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              tension: 0.4,
              fill: true
            }
          ]
        };

      case 'bar':
        return {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Credits Earned',
              data: [65, 78, 90, 81, 95, 108],
              backgroundColor: 'rgba(59, 130, 246, 0.8)'
            },
            {
              label: 'Trees Planted',
              data: [45, 62, 71, 68, 80, 92],
              backgroundColor: 'rgba(34, 197, 94, 0.8)'
            }
          ]
        };

      case 'doughnut':
        return {
          labels: ['Mangroves', 'Coastal Trees', 'Seagrass', 'Salt Marshes', 'Other'],
          datasets: [
            {
              data: [30, 25, 20, 15, 10],
              backgroundColor: [
                '#3b82f6',
                '#10b981',
                '#8b5cf6',
                '#f59e0b',
                '#ef4444'
              ],
              borderWidth: 2,
              borderColor: '#fff'
            }
          ]
        };

      case 'radar':
        return {
          labels: ['Biodiversity', 'Carbon Sequestration', 'Soil Health', 'Water Quality', 'Community Impact', 'Economic Value'],
          datasets: [
            {
              label: 'Current Performance',
              data: [85, 90, 78, 82, 88, 75],
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              borderWidth: 2
            },
            {
              label: 'Target Goals',
              data: [90, 95, 85, 88, 92, 85],
              borderColor: 'rgb(34, 197, 94)',
              backgroundColor: 'rgba(34, 197, 94, 0.2)',
              borderWidth: 2
            }
          ]
        };

      default:
        return { labels: [], datasets: [] };
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 20,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1
      }
    },
    scales: selectedChart === 'radar' ? {} : {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      }
    }
  };

  const chartTypes = [
    { key: 'line' as const, label: 'Timeline', icon: '📈' },
    { key: 'bar' as const, label: 'Comparison', icon: '📊' },
    { key: 'doughnut' as const, label: 'Distribution', icon: '🍩' },
    { key: 'radar' as const, label: 'Performance', icon: '🕸️' }
  ];

  const timeRanges = [
    { key: '7d' as const, label: '7 Days' },
    { key: '30d' as const, label: '30 Days' },
    { key: '3m' as const, label: '3 Months' },
    { key: '1y' as const, label: '1 Year' }
  ];

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">📊</span>
            <div>
              <h3 className="font-semibold text-gray-800">Data Visualization Hub</h3>
              <p className="text-sm text-gray-600">Comprehensive analytics and insights</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 justify-between">
          {/* Chart Type Selector */}
          <div className="flex gap-1">
            {chartTypes.map((type) => (
              <button
                key={type.key}
                onClick={() => setSelectedChart(type.key)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 ${
                  selectedChart === type.key
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>{type.icon}</span>
                <span>{type.label}</span>
              </button>
            ))}
          </div>

          {/* Time Range Selector */}
          {selectedChart === 'line' && (
            <div className="flex gap-1">
              {timeRanges.map((range) => (
                <button
                  key={range.key}
                  onClick={() => setTimeRange(range.key)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    timeRange === range.key
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg">{metric.icon}</span>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  metric.trend === 'up' ? 'bg-green-100 text-green-600' :
                  metric.trend === 'down' ? 'bg-red-100 text-red-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {metric.change}
                </div>
              </div>
              <div className={`text-lg font-bold ${metric.color} mb-1`}>
                {metric.value}
              </div>
              <div className="text-xs text-gray-600">{metric.title}</div>
            </div>
          ))}
        </div>

        {/* Chart Container */}
        <div className="h-80">
          {selectedChart === 'line' && <Line data={getChartData()} options={chartOptions} />}
          {selectedChart === 'bar' && <Bar data={getChartData()} options={chartOptions} />}
          {selectedChart === 'doughnut' && <Doughnut data={getChartData()} options={chartOptions} />}
          {selectedChart === 'radar' && <Radar data={getChartData()} options={chartOptions} />}
        </div>

        {/* Insights */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Key Insights</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Carbon credit generation increased by 12.5% this month</li>
            <li>• Mangrove plantations show the highest environmental impact</li>
            <li>• Community engagement scores are trending upward</li>
            <li>• Revenue projections exceed targets by 15.2%</li>
          </ul>
        </div>

        {/* Export Options */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-lg transition-colors">
              📊 Export Data
            </button>
            <button className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs rounded-lg transition-colors">
              📈 Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualizationHub;
