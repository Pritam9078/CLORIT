import React, { useState, useEffect } from 'react';

interface SettingsPreferencesProps {
  className?: string;
  userRole?: string;
}

interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    updates: boolean;
    marketing: boolean;
  };
  display: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    dateFormat: string;
    currency: string;
    timezone: string;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'contacts';
    shareData: boolean;
    analytics: boolean;
    cookies: boolean;
  };
  dashboard: {
    defaultView: string;
    showTips: boolean;
    compactMode: boolean;
    autoRefresh: boolean;
    refreshInterval: number;
  };
}

const SettingsPreferences: React.FC<SettingsPreferencesProps> = ({ 
  className = '', 
  userRole = 'farmer' 
}) => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'display' | 'privacy' | 'dashboard'>('notifications');
  const [preferences, setPreferences] = useState<UserPreferences>({
    notifications: {
      email: true,
      push: true,
      sms: false,
      updates: true,
      marketing: false
    },
    display: {
      theme: 'light',
      language: 'en',
      dateFormat: 'DD/MM/YYYY',
      currency: 'INR',
      timezone: 'Asia/Kolkata'
    },
    privacy: {
      profileVisibility: 'public',
      shareData: true,
      analytics: true,
      cookies: true
    },
    dashboard: {
      defaultView: 'overview',
      showTips: true,
      compactMode: false,
      autoRefresh: true,
      refreshInterval: 30
    }
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.warn('Failed to load preferences:', error);
      }
    }
  }, []);

  const updatePreference = (section: keyof UserPreferences, key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const savePreferences = () => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    setHasChanges(false);
    // Show success notification (you could replace this with a proper toast)
    alert('Preferences saved successfully!');
  };

  const resetToDefaults = () => {
    const defaultPreferences: UserPreferences = {
      notifications: {
        email: true,
        push: true,
        sms: false,
        updates: true,
        marketing: false
      },
      display: {
        theme: 'light',
        language: 'en',
        dateFormat: 'DD/MM/YYYY',
        currency: 'INR',
        timezone: 'Asia/Kolkata'
      },
      privacy: {
        profileVisibility: 'public',
        shareData: true,
        analytics: true,
        cookies: true
      },
      dashboard: {
        defaultView: 'overview',
        showTips: true,
        compactMode: false,
        autoRefresh: true,
        refreshInterval: 30
      }
    };
    
    setPreferences(defaultPreferences);
    setHasChanges(true);
  };

  const tabs = [
    { key: 'notifications' as const, label: 'Notifications', icon: '🔔' },
    { key: 'display' as const, label: 'Display', icon: '🎨' },
    { key: 'privacy' as const, label: 'Privacy', icon: '🔒' },
    { key: 'dashboard' as const, label: 'Dashboard', icon: '📊' }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'mr', name: 'मराठी (Marathi)' }
  ];

  const currencies = [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' }
  ];

  const timezones = [
    { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' },
    { value: 'Asia/Dubai', label: 'Gulf Standard Time (GST)' },
    { value: 'UTC', label: 'Coordinated Universal Time (UTC)' }
  ];

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚙️</span>
            <div>
              <h3 className="font-semibold text-gray-800">Settings & Preferences</h3>
              <p className="text-sm text-gray-600">Customize your experience</p>
            </div>
          </div>

          {hasChanges && (
            <div className="flex gap-2">
              <button
                onClick={resetToDefaults}
                className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={savePreferences}
                className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs rounded-lg transition-colors font-medium"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === tab.key
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Notification Preferences</h4>
            
            <div className="space-y-3">
              {[
                { key: 'email', label: 'Email Notifications', description: 'Receive updates via email' },
                { key: 'push', label: 'Push Notifications', description: 'Browser and mobile notifications' },
                { key: 'sms', label: 'SMS Notifications', description: 'Text message alerts' },
                { key: 'updates', label: 'System Updates', description: 'Important system announcements' },
                { key: 'marketing', label: 'Marketing Communications', description: 'Promotional content and offers' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.notifications[item.key as keyof typeof preferences.notifications]}
                      onChange={(e) => updatePreference('notifications', item.key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Display Tab */}
        {activeTab === 'display' && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Display Settings</h4>
            
            <div className="space-y-4">
              {/* Theme */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="text-sm font-medium text-gray-700">Theme</label>
                <select
                  value={preferences.display.theme}
                  onChange={(e) => updatePreference('display', 'theme', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System Default</option>
                </select>
              </div>

              {/* Language */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="text-sm font-medium text-gray-700">Language</label>
                <select
                  value={preferences.display.language}
                  onChange={(e) => updatePreference('display', 'language', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))}
                </select>
              </div>

              {/* Currency */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="text-sm font-medium text-gray-700">Currency</label>
                <select
                  value={preferences.display.currency}
                  onChange={(e) => updatePreference('display', 'currency', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Timezone */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="text-sm font-medium text-gray-700">Timezone</label>
                <select
                  value={preferences.display.timezone}
                  onChange={(e) => updatePreference('display', 'timezone', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {timezones.map((tz) => (
                    <option key={tz.value} value={tz.value}>{tz.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Privacy Settings</h4>
            
            <div className="space-y-3">
              {/* Profile Visibility */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="text-sm font-medium text-gray-700">Profile Visibility</label>
                <select
                  value={preferences.privacy.profileVisibility}
                  onChange={(e) => updatePreference('privacy', 'profileVisibility', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="contacts">Contacts Only</option>
                </select>
              </div>

              {[
                { key: 'shareData', label: 'Share Usage Data', description: 'Help improve our services' },
                { key: 'analytics', label: 'Analytics Tracking', description: 'Track usage patterns' },
                { key: 'cookies', label: 'Accept Cookies', description: 'Enable website functionality' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.privacy[item.key as keyof typeof preferences.privacy] as boolean}
                      onChange={(e) => updatePreference('privacy', item.key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Dashboard Preferences</h4>
            
            <div className="space-y-4">
              {/* Default View */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="text-sm font-medium text-gray-700">Default View</label>
                <select
                  value={preferences.dashboard.defaultView}
                  onChange={(e) => updatePreference('dashboard', 'defaultView', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="overview">Overview</option>
                  <option value="analytics">Analytics</option>
                  <option value="projects">Projects</option>
                  <option value="reports">Reports</option>
                </select>
              </div>

              {/* Refresh Interval */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="text-sm font-medium text-gray-700">Auto Refresh Interval (seconds)</label>
                <input
                  type="number"
                  min="10"
                  max="300"
                  value={preferences.dashboard.refreshInterval}
                  onChange={(e) => updatePreference('dashboard', 'refreshInterval', parseInt(e.target.value))}
                  className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Boolean Settings */}
              {[
                { key: 'showTips', label: 'Show Tips & Tutorials', description: 'Display helpful tips and guides' },
                { key: 'compactMode', label: 'Compact Mode', description: 'Reduce spacing and show more content' },
                { key: 'autoRefresh', label: 'Auto Refresh', description: 'Automatically update dashboard data' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.dashboard[item.key as keyof typeof preferences.dashboard] as boolean}
                      onChange={(e) => updatePreference('dashboard', item.key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Settings are saved automatically</span>
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsPreferences;
