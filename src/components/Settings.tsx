import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });
  
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showStats: true,
    allowDataCollection: false
  });
  
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light');
  const [language, setLanguage] = useState('en');

  const styles = {
    container: {
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      padding: '2rem'
    },
    header: {
      maxWidth: '1200px',
      margin: '0 auto 2rem auto',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    backButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#64748b',
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1e293b',
      margin: 0
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2rem'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e2e8f0'
    },
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: 700,
      color: '#1e293b',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    settingGroup: {
      marginBottom: '1.5rem'
    },
    settingLabel: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '0.5rem'
    },
    settingTitle: {
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#374151'
    },
    settingDesc: {
      fontSize: '0.75rem',
      color: '#64748b',
      marginTop: '0.25rem'
    },
    toggle: {
      position: 'relative' as const,
      display: 'inline-block',
      width: '44px',
      height: '24px'
    },
    toggleInput: {
      opacity: 0,
      width: 0,
      height: 0
    },
    slider: {
      position: 'absolute' as const,
      cursor: 'pointer',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#ccc',
      transition: '0.3s',
      borderRadius: '24px'
    },
    sliderActive: {
      backgroundColor: '#0ea5e9'
    },
    sliderBefore: {
      position: 'absolute' as const,
      content: '""',
      height: '18px',
      width: '18px',
      left: '3px',
      bottom: '3px',
      backgroundColor: 'white',
      transition: '0.3s',
      borderRadius: '50%'
    },
    select: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '0.875rem',
      backgroundColor: 'white',
      cursor: 'pointer'
    },
    button: {
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      fontSize: '0.875rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    primaryButton: {
      backgroundColor: '#0ea5e9',
      color: 'white',
      boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)'
    },
    dangerButton: {
      backgroundColor: '#ef4444',
      color: 'white',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
    }
  };

  const toggleSetting = (category: 'notifications' | 'privacy', key: string) => {
    if (category === 'notifications') {
      setNotifications(prev => ({
        ...prev,
        [key]: !prev[key as keyof typeof prev]
      }));
    } else {
      setPrivacy(prev => ({
        ...prev,
        [key]: !prev[key as keyof typeof prev]
      }));
    }
  };

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <label style={styles.toggle}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={styles.toggleInput}
      />
      <span
        style={{
          ...styles.slider,
          ...(checked ? styles.sliderActive : {})
        }}
      >
        <span
          style={{
            ...styles.sliderBefore,
            transform: checked ? 'translateX(20px)' : 'translateX(0)'
          }}
        />
      </span>
    </label>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f1f5f9';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          ← Back to Dashboard
        </button>
        <h1 style={styles.title}>Settings</h1>
      </div>

      <div style={styles.main}>
        {/* Notification Settings */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            🔔 Notification Preferences
          </h2>
          
          <div style={styles.settingGroup}>
            <div style={styles.settingLabel}>
              <div>
                <div style={styles.settingTitle}>Email Notifications</div>
                <div style={styles.settingDesc}>Receive updates via email</div>
              </div>
              <ToggleSwitch
                checked={notifications.email}
                onChange={() => toggleSetting('notifications', 'email')}
              />
            </div>
          </div>

          <div style={styles.settingGroup}>
            <div style={styles.settingLabel}>
              <div>
                <div style={styles.settingTitle}>Push Notifications</div>
                <div style={styles.settingDesc}>Browser push notifications</div>
              </div>
              <ToggleSwitch
                checked={notifications.push}
                onChange={() => toggleSetting('notifications', 'push')}
              />
            </div>
          </div>

          <div style={styles.settingGroup}>
            <div style={styles.settingLabel}>
              <div>
                <div style={styles.settingTitle}>SMS Notifications</div>
                <div style={styles.settingDesc}>Text message alerts</div>
              </div>
              <ToggleSwitch
                checked={notifications.sms}
                onChange={() => toggleSetting('notifications', 'sms')}
              />
            </div>
          </div>

          <div style={styles.settingGroup}>
            <div style={styles.settingLabel}>
              <div>
                <div style={styles.settingTitle}>Marketing Communications</div>
                <div style={styles.settingDesc}>News and promotional content</div>
              </div>
              <ToggleSwitch
                checked={notifications.marketing}
                onChange={() => toggleSetting('notifications', 'marketing')}
              />
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            🔒 Privacy & Security
          </h2>
          
          <div style={styles.settingGroup}>
            <div style={styles.settingLabel}>
              <div>
                <div style={styles.settingTitle}>Public Profile</div>
                <div style={styles.settingDesc}>Make your profile visible to others</div>
              </div>
              <ToggleSwitch
                checked={privacy.profilePublic}
                onChange={() => toggleSetting('privacy', 'profilePublic')}
              />
            </div>
          </div>

          <div style={styles.settingGroup}>
            <div style={styles.settingLabel}>
              <div>
                <div style={styles.settingTitle}>Show Statistics</div>
                <div style={styles.settingDesc}>Display your environmental stats publicly</div>
              </div>
              <ToggleSwitch
                checked={privacy.showStats}
                onChange={() => toggleSetting('privacy', 'showStats')}
              />
            </div>
          </div>

          <div style={styles.settingGroup}>
            <div style={styles.settingLabel}>
              <div>
                <div style={styles.settingTitle}>Data Collection</div>
                <div style={styles.settingDesc}>Allow analytics for app improvement</div>
              </div>
              <ToggleSwitch
                checked={privacy.allowDataCollection}
                onChange={() => toggleSetting('privacy', 'allowDataCollection')}
              />
            </div>
          </div>

          <div style={styles.settingGroup}>
            <div>
              <div style={styles.settingTitle}>Change Password</div>
              <div style={styles.settingDesc}>Update your account password</div>
            </div>
            <button
              style={{ ...styles.button, ...styles.primaryButton, marginTop: '0.5rem' }}
              onClick={() => alert('Password change functionality will be implemented')}
            >
              Change Password
            </button>
          </div>
        </div>

        {/* App Preferences */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            🎨 App Preferences
          </h2>
          
          <div style={styles.settingGroup}>
            <div style={styles.settingTitle}>Theme</div>
            <div style={styles.settingDesc}>Choose your preferred theme</div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'auto')}
              style={styles.select}
            >
              <option value="light">Light Theme</option>
              <option value="dark">Dark Theme</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>

          <div style={styles.settingGroup}>
            <div style={styles.settingTitle}>Language</div>
            <div style={styles.settingDesc}>Select your preferred language</div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={styles.select}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
              <option value="ta">Tamil</option>
            </select>
          </div>
        </div>

        {/* Danger Zone */}
        <div style={styles.card}>
          <h2 style={{...styles.cardTitle, color: '#ef4444'}}>
            ⚠️ Danger Zone
          </h2>
          
          <div style={styles.settingGroup}>
            <div>
              <div style={styles.settingTitle}>Export Data</div>
              <div style={styles.settingDesc}>Download your account data</div>
            </div>
            <button
              style={{ ...styles.button, ...styles.primaryButton, marginTop: '0.5rem' }}
              onClick={() => alert('Data export will be available soon')}
            >
              Export Data
            </button>
          </div>

          <div style={styles.settingGroup}>
            <div>
              <div style={styles.settingTitle}>Delete Account</div>
              <div style={styles.settingDesc}>Permanently delete your account and all data</div>
            </div>
            <button
              style={{ ...styles.button, ...styles.dangerButton, marginTop: '0.5rem' }}
              onClick={() => {
                if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                  alert('Account deletion functionality will be implemented');
                }
              }}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
