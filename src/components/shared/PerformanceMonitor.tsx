import React, { useState, useEffect } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  memoryUsage: number;
  networkSpeed: string;
  renderTime: number;
  jsHeapSize: number;
  connectionType: string;
}

interface PerformanceMonitorProps {
  className?: string;
  showDetails?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
  className = '', 
  showDetails = false 
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isExpanded, setIsExpanded] = useState(showDetails);
  const [networkQuality, setNetworkQuality] = useState<'excellent' | 'good' | 'fair' | 'poor'>('good');

  useEffect(() => {
    const measurePerformance = () => {
      try {
        // Page load metrics
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;

        // Memory usage (if available)
        const memory = (performance as any).memory;
        const memoryUsage = memory ? memory.usedJSHeapSize / 1024 / 1024 : 0; // MB
        const jsHeapSize = memory ? memory.totalJSHeapSize / 1024 / 1024 : 0; // MB

        // Network information (if available)
        const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
        const networkSpeed = connection ? connection.effectiveType || 'unknown' : 'unknown';
        const connectionType = connection ? connection.type || 'unknown' : 'unknown';

        // Simulate render time measurement
        const renderTime = performance.now() - (navigation.domContentLoadedEventStart || 0);

        setMetrics({
          loadTime: loadTime / 1000, // Convert to seconds
          memoryUsage: Math.round(memoryUsage * 100) / 100,
          networkSpeed,
          renderTime: Math.round(renderTime),
          jsHeapSize: Math.round(jsHeapSize * 100) / 100,
          connectionType
        });

        // Determine network quality
        if (connection) {
          const effectiveType = connection.effectiveType;
          if (effectiveType === '4g') setNetworkQuality('excellent');
          else if (effectiveType === '3g') setNetworkQuality('good');
          else if (effectiveType === '2g') setNetworkQuality('fair');
          else setNetworkQuality('poor');
        }

      } catch (error) {
        console.warn('Performance monitoring not available:', error);
      }
    };

    measurePerformance();

    // Update metrics every 30 seconds
    const interval = setInterval(measurePerformance, 30000);
    return () => clearInterval(interval);
  }, []);

  const getPerformanceColor = (value: number, thresholds: [number, number, number]) => {
    if (value <= thresholds[0]) return 'text-green-600 bg-green-100';
    if (value <= thresholds[1]) return 'text-yellow-600 bg-yellow-100';
    if (value <= thresholds[2]) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getNetworkQualityColor = (quality: string) => {
    const colors = {
      excellent: 'text-green-600 bg-green-100',
      good: 'text-blue-600 bg-blue-100',
      fair: 'text-yellow-600 bg-yellow-100',
      poor: 'text-red-600 bg-red-100'
    };
    return colors[quality as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const getOverallScore = () => {
    if (!metrics) return 0;
    
    let score = 100;
    
    // Deduct for slow load times
    if (metrics.loadTime > 3) score -= 20;
    else if (metrics.loadTime > 2) score -= 10;
    else if (metrics.loadTime > 1) score -= 5;
    
    // Deduct for high memory usage
    if (metrics.memoryUsage > 100) score -= 20;
    else if (metrics.memoryUsage > 50) score -= 10;
    
    // Deduct for poor network
    if (networkQuality === 'poor') score -= 15;
    else if (networkQuality === 'fair') score -= 10;
    else if (networkQuality === 'good') score -= 5;
    
    return Math.max(0, score);
  };

  if (!metrics) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
        <div className="animate-pulse flex items-center gap-3">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    );
  }

  const overallScore = getOverallScore();

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div 
        className="p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚡</span>
            <div>
              <h3 className="font-semibold text-gray-800">Performance</h3>
              <p className="text-sm text-gray-600">
                Score: <span className={`font-medium ${
                  overallScore >= 90 ? 'text-green-600' :
                  overallScore >= 75 ? 'text-blue-600' :
                  overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>{overallScore}/100</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getNetworkQualityColor(networkQuality)}`}>
              {metrics.networkSpeed}
            </div>
            <svg 
              className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Performance Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Load Time */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Load Time</span>
                <span className={`font-medium ${getPerformanceColor(metrics.loadTime, [1, 2, 3])}`}>
                  {metrics.loadTime.toFixed(2)}s
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    metrics.loadTime <= 1 ? 'bg-green-500' :
                    metrics.loadTime <= 2 ? 'bg-yellow-500' :
                    metrics.loadTime <= 3 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min((metrics.loadTime / 5) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Memory Usage */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Memory Usage</span>
                <span className={`font-medium ${getPerformanceColor(metrics.memoryUsage, [25, 50, 100])}`}>
                  {metrics.memoryUsage.toFixed(1)} MB
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    metrics.memoryUsage <= 25 ? 'bg-green-500' :
                    metrics.memoryUsage <= 50 ? 'bg-yellow-500' :
                    metrics.memoryUsage <= 100 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min((metrics.memoryUsage / 150) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-gray-100">
            <div className="text-center p-2">
              <div className="text-xs text-gray-500">Render Time</div>
              <div className="text-sm font-semibold text-gray-700">{metrics.renderTime}ms</div>
            </div>
            <div className="text-center p-2">
              <div className="text-xs text-gray-500">JS Heap</div>
              <div className="text-sm font-semibold text-gray-700">{metrics.jsHeapSize}MB</div>
            </div>
            <div className="text-center p-2">
              <div className="text-xs text-gray-500">Connection</div>
              <div className="text-sm font-semibold text-gray-700 capitalize">{metrics.connectionType}</div>
            </div>
            <div className="text-center p-2">
              <div className="text-xs text-gray-500">Quality</div>
              <div className={`text-xs px-2 py-1 rounded-full font-medium ${getNetworkQualityColor(networkQuality)}`}>
                {networkQuality}
              </div>
            </div>
          </div>

          {/* Performance Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Performance Tips</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              {metrics.loadTime > 2 && (
                <li>• Consider optimizing images and reducing bundle size</li>
              )}
              {metrics.memoryUsage > 50 && (
                <li>• High memory usage detected - try closing unused tabs</li>
              )}
              {networkQuality === 'poor' && (
                <li>• Slow network detected - some features may be limited</li>
              )}
              <li>• Clear browser cache periodically for better performance</li>
            </ul>
          </div>

          {/* Last Updated */}
          <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-100">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor;
