import React, { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  uvIndex: number;
  airQuality: number;
  visibility: number;
}

interface EnvironmentalData {
  soilMoisture: number;
  soilPh: number;
  carbonLevel: number;
  treeHealth: 'excellent' | 'good' | 'fair' | 'poor';
  plantingConditions: 'optimal' | 'good' | 'moderate' | 'poor';
}

interface WeatherWidgetProps {
  location?: string;
  className?: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ 
  location = 'Coastal Region', 
  className = '' 
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [environmentalData, setEnvironmentalData] = useState<EnvironmentalData | null>(null);
  const [selectedTab, setSelectedTab] = useState<'weather' | 'environment'>('weather');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Simulate real-time data updates
  const generateMockWeatherData = (): WeatherData => {
    const conditions = ['sunny', 'cloudy', 'rainy', 'stormy'] as const;
    return {
      temperature: Math.round(22 + Math.random() * 15), // 22-37°C
      humidity: Math.round(60 + Math.random() * 30), // 60-90%
      windSpeed: Math.round(5 + Math.random() * 15), // 5-20 km/h
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      uvIndex: Math.round(3 + Math.random() * 8), // 3-11
      airQuality: Math.round(50 + Math.random() * 100), // 50-150 AQI
      visibility: Math.round(8 + Math.random() * 7), // 8-15 km
    };
  };

  const generateMockEnvironmentalData = (): EnvironmentalData => {
    const healthLevels = ['excellent', 'good', 'fair', 'poor'] as const;
    const plantingConditions = ['optimal', 'good', 'moderate', 'poor'] as const;
    
    return {
      soilMoisture: Math.round(30 + Math.random() * 40), // 30-70%
      soilPh: parseFloat((6.0 + Math.random() * 2.5).toFixed(1)), // 6.0-8.5 pH
      carbonLevel: Math.round(150 + Math.random() * 100), // 150-250 ppm
      treeHealth: healthLevels[Math.floor(Math.random() * healthLevels.length)],
      plantingConditions: plantingConditions[Math.floor(Math.random() * plantingConditions.length)],
    };
  };

  useEffect(() => {
    // Initial data load
    setWeatherData(generateMockWeatherData());
    setEnvironmentalData(generateMockEnvironmentalData());

    // Update data every 2 minutes
    const interval = setInterval(() => {
      setWeatherData(generateMockWeatherData());
      setEnvironmentalData(generateMockEnvironmentalData());
      setLastUpdated(new Date());
    }, 120000);

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition: WeatherData['condition']) => {
    const icons = {
      sunny: '☀️',
      cloudy: '☁️',
      rainy: '🌧️',
      stormy: '⛈️'
    };
    return icons[condition];
  };

  const getAirQualityStatus = (aqi: number) => {
    if (aqi <= 50) return { status: 'Good', color: 'text-green-600', bg: 'bg-green-100' };
    if (aqi <= 100) return { status: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (aqi <= 150) return { status: 'Unhealthy for Sensitive', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { status: 'Unhealthy', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const getUVIndexStatus = (uv: number) => {
    if (uv <= 2) return { status: 'Low', color: 'text-green-600' };
    if (uv <= 5) return { status: 'Moderate', color: 'text-yellow-600' };
    if (uv <= 7) return { status: 'High', color: 'text-orange-600' };
    if (uv <= 10) return { status: 'Very High', color: 'text-red-600' };
    return { status: 'Extreme', color: 'text-purple-600' };
  };

  const getHealthStatusColor = (status: string) => {
    const colors = {
      excellent: 'text-green-600 bg-green-100',
      optimal: 'text-green-600 bg-green-100',
      good: 'text-blue-600 bg-blue-100',
      fair: 'text-yellow-600 bg-yellow-100',
      moderate: 'text-yellow-600 bg-yellow-100',
      poor: 'text-red-600 bg-red-100'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const getSoilPhStatus = (ph: number) => {
    if (ph < 6.5) return { status: 'Acidic', color: 'text-orange-600' };
    if (ph <= 7.5) return { status: 'Neutral', color: 'text-green-600' };
    return { status: 'Alkaline', color: 'text-blue-600' };
  };

  if (!weatherData || !environmentalData) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            🌍 Environmental Conditions
          </h3>
          <p className="text-sm text-gray-600">{location}</p>
        </div>
        <div className="text-xs text-gray-500">
          Updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setSelectedTab('weather')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            selectedTab === 'weather'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          🌤️ Weather
        </button>
        <button
          onClick={() => setSelectedTab('environment')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            selectedTab === 'environment'
              ? 'bg-white text-green-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          🌱 Environment
        </button>
      </div>

      {selectedTab === 'weather' && (
        <div className="space-y-4">
          {/* Current Weather */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{getWeatherIcon(weatherData.condition)}</span>
              <div>
                <div className="text-3xl font-bold text-gray-800">
                  {weatherData.temperature}°C
                </div>
                <div className="text-sm text-gray-600 capitalize">
                  {weatherData.condition}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Feels like</div>
              <div className="text-lg font-semibold">
                {weatherData.temperature + Math.round(Math.random() * 4 - 2)}°C
              </div>
            </div>
          </div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <span>💧</span>
                <span className="text-sm font-medium text-gray-700">Humidity</span>
              </div>
              <div className="text-lg font-semibold">{weatherData.humidity}%</div>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <span>💨</span>
                <span className="text-sm font-medium text-gray-700">Wind Speed</span>
              </div>
              <div className="text-lg font-semibold">{weatherData.windSpeed} km/h</div>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <span>👁️</span>
                <span className="text-sm font-medium text-gray-700">Visibility</span>
              </div>
              <div className="text-lg font-semibold">{weatherData.visibility} km</div>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <span>☀️</span>
                <span className="text-sm font-medium text-gray-700">UV Index</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{weatherData.uvIndex}</span>
                <span className={`text-xs px-2 py-1 rounded ${getUVIndexStatus(weatherData.uvIndex).color}`}>
                  {getUVIndexStatus(weatherData.uvIndex).status}
                </span>
              </div>
            </div>
          </div>

          {/* Air Quality */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">🌫️ Air Quality Index</span>
              <span className={`text-xs px-2 py-1 rounded ${getAirQualityStatus(weatherData.airQuality).bg} ${getAirQualityStatus(weatherData.airQuality).color}`}>
                {getAirQualityStatus(weatherData.airQuality).status}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold">{weatherData.airQuality}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 h-2 rounded-full"
                  style={{ width: `${Math.min((weatherData.airQuality / 300) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'environment' && (
        <div className="space-y-4">
          {/* Planting Conditions */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">🌱 Planting Conditions</span>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${getHealthStatusColor(environmentalData.plantingConditions)}`}>
                {environmentalData.plantingConditions}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {environmentalData.plantingConditions === 'optimal' && 'Perfect conditions for plantation activities'}
              {environmentalData.plantingConditions === 'good' && 'Good conditions for most plantation work'}
              {environmentalData.plantingConditions === 'moderate' && 'Moderate conditions, proceed with caution'}
              {environmentalData.plantingConditions === 'poor' && 'Poor conditions, consider postponing plantation'}
            </p>
          </div>

          {/* Environmental Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <span>💧</span>
                <span className="text-sm font-medium text-gray-700">Soil Moisture</span>
              </div>
              <div className="text-lg font-semibold">{environmentalData.soilMoisture}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-400 h-2 rounded-full"
                  style={{ width: `${environmentalData.soilMoisture}%` }}
                ></div>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <span>🧪</span>
                <span className="text-sm font-medium text-gray-700">Soil pH</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{environmentalData.soilPh}</span>
                <span className={`text-xs ${getSoilPhStatus(environmentalData.soilPh).color}`}>
                  {getSoilPhStatus(environmentalData.soilPh).status}
                </span>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <span>🌍</span>
                <span className="text-sm font-medium text-gray-700">Carbon Level</span>
              </div>
              <div className="text-lg font-semibold">{environmentalData.carbonLevel} ppm</div>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <span>🌳</span>
                <span className="text-sm font-medium text-gray-700">Tree Health</span>
              </div>
              <span className={`text-sm px-2 py-1 rounded font-medium ${getHealthStatusColor(environmentalData.treeHealth)}`}>
                {environmentalData.treeHealth}
              </span>
            </div>
          </div>

          {/* Recommendations */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Recommendations</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              {environmentalData.soilMoisture < 40 && (
                <li>• Consider irrigation - soil moisture is below optimal levels</li>
              )}
              {environmentalData.soilPh < 6.5 && (
                <li>• Add lime to reduce soil acidity</li>
              )}
              {environmentalData.soilPh > 7.5 && (
                <li>• Add organic matter to balance alkaline soil</li>
              )}
              {environmentalData.plantingConditions === 'optimal' && (
                <li>• Excellent time for plantation activities</li>
              )}
              <li>• Monitor tree health regularly for best results</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
