import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ResourceData {
  timestamp: string;
  cpuUsage: number;
  memoryUsage: number;
  networkActivity: number;
  diskUsage: number;
}

interface SystemInfo {
  platform: string;
  cores: number;
  totalMemory: number;
  availableMemory: number;
  diskSpace: {
    total: number;
    used: number;
    available: number;
  };
}

interface ResourceUsageWidgetProps {
  className?: string;
  updateInterval?: number;
}

const ResourceUsageWidget: React.FC<ResourceUsageWidgetProps> = ({ 
  className = '', 
  updateInterval = 5000 
}) => {
  const [resourceData, setResourceData] = useState<ResourceData[]>([]);
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<'cpu' | 'memory' | 'network' | 'disk'>('cpu');
  const [isRealTime, setIsRealTime] = useState(true);

  // Mock system info (in real app, this would come from an API or system stats)
  useEffect(() => {
    const mockSystemInfo: SystemInfo = {
      platform: navigator.platform,
      cores: navigator.hardwareConcurrency || 4,
      totalMemory: 16, // GB
      availableMemory: 8, // GB
      diskSpace: {
        total: 500, // GB
        used: 320, // GB
        available: 180 // GB
      }
    };
    setSystemInfo(mockSystemInfo);
  }, []);

  // Generate mock resource data
  useEffect(() => {
    const generateMockData = (): ResourceData => {
      const now = new Date();
      return {
        timestamp: now.toLocaleTimeString(),
        cpuUsage: Math.random() * 80 + 10, // 10-90%
        memoryUsage: Math.random() * 60 + 20, // 20-80%
        networkActivity: Math.random() * 100, // MB/s
        diskUsage: Math.random() * 30 + 10 // 10-40%
      };
    };

    // Initialize with some historical data
    const initialData: ResourceData[] = [];
    for (let i = 19; i >= 0; i--) {
      const timestamp = new Date(Date.now() - i * updateInterval);
      initialData.push({
        timestamp: timestamp.toLocaleTimeString(),
        cpuUsage: Math.random() * 80 + 10,
        memoryUsage: Math.random() * 60 + 20,
        networkActivity: Math.random() * 100,
        diskUsage: Math.random() * 30 + 10
      });
    }
    setResourceData(initialData);

    if (!isRealTime) return;

    const interval = setInterval(() => {
      const newData = generateMockData();
      setResourceData(prev => {
        const updated = [...prev, newData];
        return updated.slice(-20); // Keep only last 20 data points
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval, isRealTime]);

  const getChartData = () => {
    const labels = resourceData.map(d => d.timestamp);
    const datasets = [];

    switch (selectedMetric) {
      case 'cpu':
        datasets.push({
          label: 'CPU Usage (%)',
          data: resourceData.map(d => d.cpuUsage),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4
        });
        break;
      case 'memory':
        datasets.push({
          label: 'Memory Usage (%)',
          data: resourceData.map(d => d.memoryUsage),
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          fill: true,
          tension: 0.4
        });
        break;
      case 'network':
        datasets.push({
          label: 'Network Activity (MB/s)',
          data: resourceData.map(d => d.networkActivity),
          borderColor: 'rgb(168, 85, 247)',
          backgroundColor: 'rgba(168, 85, 247, 0.1)',
          fill: true,
          tension: 0.4
        });
        break;
      case 'disk':
        datasets.push({
          label: 'Disk Usage (%)',
          data: resourceData.map(d => d.diskUsage),
          borderColor: 'rgb(245, 101, 101)',
          backgroundColor: 'rgba(245, 101, 101, 0.1)',
          fill: true,
          tension: 0.4
        });
        break;
    }

    return { labels, datasets };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        max: selectedMetric === 'network' ? 100 : 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: function(value: any) {
            return selectedMetric === 'network' ? `${value} MB/s` : `${value}%`;
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1
      }
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 6
      }
    }
  };

  const getCurrentValue = () => {
    if (resourceData.length === 0) return 0;
    const latest = resourceData[resourceData.length - 1];
    switch (selectedMetric) {
      case 'cpu': return latest.cpuUsage;
      case 'memory': return latest.memoryUsage;
      case 'network': return latest.networkActivity;
      case 'disk': return latest.diskUsage;
      default: return 0;
    }
  };

  const getStatusColor = (value: number, metric: string) => {
    let thresholds;
    switch (metric) {
      case 'cpu': thresholds = [50, 70, 85]; break;
      case 'memory': thresholds = [60, 80, 90]; break;
      case 'network': thresholds = [30, 60, 80]; break;
      case 'disk': thresholds = [20, 35, 50]; break;
      default: thresholds = [33, 66, 85];
    }

    if (value <= thresholds[0]) return 'text-green-600 bg-green-100';
    if (value <= thresholds[1]) return 'text-yellow-600 bg-yellow-100';
    if (value <= thresholds[2]) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const metrics = [
    { key: 'cpu' as const, label: 'CPU', icon: '🔥', unit: '%' },
    { key: 'memory' as const, label: 'RAM', icon: '💾', unit: '%' },
    { key: 'network' as const, label: 'Network', icon: '🌐', unit: 'MB/s' },
    { key: 'disk' as const, label: 'Disk', icon: '💿', unit: '%' }
  ];

  const currentValue = getCurrentValue();

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-xl">📊</span>
          <div>
            <h3 className="font-semibold text-gray-800">System Resources</h3>
            <p className="text-sm text-gray-600">Real-time monitoring</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRealTime(!isRealTime)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              isRealTime 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isRealTime ? '● Live' : '⏸ Paused'}
          </button>
        </div>
      </div>

      {/* Metric Selector */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {metrics.map((metric) => (
          <button
            key={metric.key}
            onClick={() => setSelectedMetric(metric.key)}
            className={`p-3 rounded-lg border text-center transition-all hover:shadow-md ${
              selectedMetric === metric.key
                ? 'border-blue-200 bg-blue-50 shadow-sm'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-lg mb-1">{metric.icon}</div>
            <div className="text-xs font-medium text-gray-700">{metric.label}</div>
            {resourceData.length > 0 && (
              <div className={`text-xs mt-1 px-2 py-1 rounded-full ${
                getStatusColor(getCurrentValue(), metric.key)
              }`}>
                {metric.key === 'network' 
                  ? `${getCurrentValue().toFixed(1)} ${metric.unit}`
                  : `${getCurrentValue().toFixed(0)}${metric.unit}`
                }
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-32 mb-4">
        {resourceData.length > 0 ? (
          <Line data={getChartData()} options={chartOptions} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Loading data...
          </div>
        )}
      </div>

      {/* System Information */}
      {systemInfo && (
        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
          <h4 className="text-sm font-medium text-gray-700 mb-2">System Information</h4>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-gray-500">Platform:</span>
              <span className="ml-2 font-medium text-gray-700">{systemInfo.platform}</span>
            </div>
            <div>
              <span className="text-gray-500">CPU Cores:</span>
              <span className="ml-2 font-medium text-gray-700">{systemInfo.cores}</span>
            </div>
            <div>
              <span className="text-gray-500">Total RAM:</span>
              <span className="ml-2 font-medium text-gray-700">{systemInfo.totalMemory} GB</span>
            </div>
            <div>
              <span className="text-gray-500">Available:</span>
              <span className="ml-2 font-medium text-gray-700">{systemInfo.availableMemory} GB</span>
            </div>
          </div>
          
          {/* Disk Usage Bar */}
          <div className="pt-2">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Disk Usage</span>
              <span>{systemInfo.diskSpace.used}GB / {systemInfo.diskSpace.total}GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(systemInfo.diskSpace.used / systemInfo.diskSpace.total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Status Indicator */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <div className={`flex items-center gap-2 text-xs px-2 py-1 rounded-full ${getStatusColor(currentValue, selectedMetric)}`}>
          <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
          <span>
            {currentValue < 50 ? 'Good' : currentValue < 80 ? 'Moderate' : 'High'} Usage
          </span>
        </div>
        <div className="text-xs text-gray-500">
          Updated {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default ResourceUsageWidget;
