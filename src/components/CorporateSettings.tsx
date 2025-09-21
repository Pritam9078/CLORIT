import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Building, 
  CreditCard, 
  Bell, 
  Shield, 
  Globe, 
  Target,
  Save,
  Edit,
  Key,
  Mail,
  Phone,
  MapPin,
  Upload,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';

const CorporateSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    reports: true
  });

  const [profileData, setProfileData] = useState({
    companyName: 'Acme Corporation',
    industry: 'Technology',
    website: 'www.acmecorp.com',
    email: 'admin@acmecorp.com',
    phone: '+1 (555) 123-4567',
    address: '123 Innovation Drive, San Francisco, CA 94105',
    taxId: '12-3456789',
    sustainabilityOfficer: 'Jane Smith',
    carbonTargets: {
      reduction: 50,
      neutrality: 2030,
      renewableEnergy: 80
    }
  });

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'Credit Card',
      last4: '4567',
      brand: 'Visa',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'Bank Transfer',
      last4: '8901',
      brand: 'ACH',
      expiry: '',
      isDefault: false
    }
  ]);

  const tabs = [
    { id: 'profile', label: 'Company Profile', icon: <Building size={18} /> },
    { id: 'account', label: 'Account Settings', icon: <User size={18} /> },
    { id: 'billing', label: 'Billing & Payments', icon: <CreditCard size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'sustainability', label: 'Sustainability Goals', icon: <Target size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> }
  ];

  const styles = {
    container: {
      padding: '2rem',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      marginBottom: '2rem'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1f2937',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '0.5rem'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '1rem'
    },
    content: {
      display: 'flex',
      gap: '2rem',
      maxWidth: '1400px'
    },
    sidebar: {
      width: '280px',
      background: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      height: 'fit-content',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    },
    tabButton: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      background: 'transparent',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s',
      marginBottom: '0.5rem',
      textAlign: 'left' as const
    },
    main: {
      flex: 1,
      background: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#374151',
      marginBottom: '0.5rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      outline: 'none',
      transition: 'border-color 0.2s'
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      outline: 'none',
      background: 'white'
    },
    card: {
      background: '#f8f9fa',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      border: '1px solid #e5e7eb'
    },
    cardTitle: {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '1rem'
    },
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      background: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    secondaryButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      background: 'white',
      color: '#374151',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    toggle: {
      position: 'relative' as const,
      width: '44px',
      height: '24px',
      background: '#d1d5db',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    toggleActive: {
      background: '#3b82f6'
    },
    toggleSlider: {
      position: 'absolute' as const,
      top: '2px',
      left: '2px',
      width: '20px',
      height: '20px',
      background: 'white',
      borderRadius: '50%',
      transition: 'transform 0.2s'
    },
    paymentCard: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      marginBottom: '1rem'
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.25rem 0.75rem',
      background: '#dbeafe',
      color: '#1e40af',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: 600
    }
  };

  const renderProfileTab = () => (
    <div>
      <h2 style={styles.sectionTitle}>
        <Building size={24} />
        Company Profile
      </h2>
      
      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Company Name</label>
          <input 
            style={styles.input}
            value={profileData.companyName}
            onChange={(e) => setProfileData({...profileData, companyName: e.target.value})}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Industry</label>
          <select style={styles.select} value={profileData.industry}>
            <option>Technology</option>
            <option>Manufacturing</option>
            <option>Finance</option>
            <option>Healthcare</option>
            <option>Energy</option>
            <option>Other</option>
          </select>
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Website</label>
          <input 
            style={styles.input}
            value={profileData.website}
            onChange={(e) => setProfileData({...profileData, website: e.target.value})}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Contact Email</label>
          <input 
            style={styles.input}
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Phone Number</label>
          <input 
            style={styles.input}
            value={profileData.phone}
            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Tax ID</label>
          <input 
            style={styles.input}
            value={profileData.taxId}
            onChange={(e) => setProfileData({...profileData, taxId: e.target.value})}
          />
        </div>
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Business Address</label>
        <input 
          style={styles.input}
          value={profileData.address}
          onChange={(e) => setProfileData({...profileData, address: e.target.value})}
        />
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Sustainability Officer</label>
        <input 
          style={styles.input}
          value={profileData.sustainabilityOfficer}
          onChange={(e) => setProfileData({...profileData, sustainabilityOfficer: e.target.value})}
        />
      </div>
      
      <button style={styles.button}>
        <Save size={16} />
        Save Changes
      </button>
    </div>
  );

  const renderBillingTab = () => (
    <div>
      <h2 style={styles.sectionTitle}>
        <CreditCard size={24} />
        Billing & Payment Methods
      </h2>
      
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Payment Methods</h3>
        {paymentMethods.map((method) => (
          <div key={method.id} style={styles.paymentCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <CreditCard size={20} color="#6b7280" />
              <div>
                <div style={{ fontWeight: 600 }}>
                  {method.brand} ending in {method.last4}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {method.expiry && `Expires ${method.expiry}`}
                </div>
              </div>
              {method.isDefault && (
                <span style={styles.badge}>Default</span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button style={styles.secondaryButton}>
                <Edit size={14} />
                Edit
              </button>
              <button style={{...styles.secondaryButton, color: '#ef4444', borderColor: '#fecaca'}}>
                <X size={14} />
                Remove
              </button>
            </div>
          </div>
        ))}
        <button style={styles.button}>
          Add Payment Method
        </button>
      </div>
      
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Billing Information</h3>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Billing Contact</label>
            <input style={styles.input} defaultValue="John Doe" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Billing Email</label>
            <input style={styles.input} type="email" defaultValue="billing@acmecorp.com" />
          </div>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Billing Address</label>
          <input style={styles.input} defaultValue="123 Innovation Drive, San Francisco, CA 94105" />
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div>
      <h2 style={styles.sectionTitle}>
        <Bell size={24} />
        Notification Preferences
      </h2>
      
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Communication Preferences</h3>
        {Object.entries(notifications).map(([key, value]) => (
          <div key={key} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 0',
            borderBottom: '1px solid #f3f4f6'
          }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                {key.charAt(0).toUpperCase() + key.slice(1)} Notifications
              </div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Receive notifications via {key}
              </div>
            </div>
            <div 
              style={{
                ...styles.toggle,
                ...(value ? styles.toggleActive : {})
              }}
              onClick={() => setNotifications({...notifications, [key]: !value})}
            >
              <div style={{
                ...styles.toggleSlider,
                transform: value ? 'translateX(20px)' : 'translateX(0)'
              }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSustainabilityTab = () => (
    <div>
      <h2 style={styles.sectionTitle}>
        <Target size={24} />
        Sustainability Goals & Targets
      </h2>
      
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Carbon Reduction Targets</h3>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Emission Reduction Target (%)</label>
            <input 
              style={styles.input}
              type="number"
              value={profileData.carbonTargets.reduction}
              onChange={(e) => setProfileData({
                ...profileData,
                carbonTargets: {
                  ...profileData.carbonTargets,
                  reduction: parseInt(e.target.value)
                }
              })}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Carbon Neutrality Target Year</label>
            <input 
              style={styles.input}
              type="number"
              value={profileData.carbonTargets.neutrality}
              onChange={(e) => setProfileData({
                ...profileData,
                carbonTargets: {
                  ...profileData.carbonTargets,
                  neutrality: parseInt(e.target.value)
                }
              })}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Renewable Energy Target (%)</label>
            <input 
              style={styles.input}
              type="number"
              value={profileData.carbonTargets.renewableEnergy}
              onChange={(e) => setProfileData({
                ...profileData,
                carbonTargets: {
                  ...profileData.carbonTargets,
                  renewableEnergy: parseInt(e.target.value)
                }
              })}
            />
          </div>
        </div>
      </div>
      
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>ESG Reporting</h3>
        <div style={styles.formGroup}>
          <label style={styles.label}>Reporting Framework</label>
          <select style={styles.select}>
            <option>GRI Standards</option>
            <option>SASB</option>
            <option>TCFD</option>
            <option>CDP</option>
            <option>Custom</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Reporting Frequency</label>
          <select style={styles.select}>
            <option>Annual</option>
            <option>Quarterly</option>
            <option>Monthly</option>
          </select>
        </div>
      </div>
      
      <button style={styles.button}>
        <Save size={16} />
        Update Goals
      </button>
    </div>
  );

  const renderSecurityTab = () => (
    <div>
      <h2 style={styles.sectionTitle}>
        <Shield size={24} />
        Security Settings
      </h2>
      
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Password & Authentication</h3>
        <div style={styles.formGroup}>
          <label style={styles.label}>Current Password</label>
          <div style={{ position: 'relative' }}>
            <input 
              style={{...styles.input, paddingRight: '3rem'}}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter current password"
            />
            <button
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6b7280'
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>New Password</label>
          <input style={styles.input} type="password" placeholder="Enter new password" />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Confirm New Password</label>
          <input style={styles.input} type="password" placeholder="Confirm new password" />
        </div>
        <button style={styles.button}>
          <Key size={16} />
          Update Password
        </button>
      </div>
      
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Two-Factor Authentication</h3>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
              SMS Authentication
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Receive verification codes via SMS
            </div>
          </div>
          <button style={styles.button}>Enable</button>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
              Authenticator App
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Use Google Authenticator or similar apps
            </div>
          </div>
          <button style={styles.secondaryButton}>Setup</button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'billing':
        return renderBillingTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'sustainability':
        return renderSustainabilityTab();
      case 'security':
        return renderSecurityTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          <Settings size={28} />
          Corporate Settings
        </h1>
        <p style={styles.subtitle}>
          Manage your company profile, billing, and sustainability preferences
        </p>
      </div>
      
      <div style={styles.content}>
        <div style={styles.sidebar}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              style={{
                ...styles.tabButton,
                background: activeTab === tab.id ? '#f3f4f6' : 'transparent',
                color: activeTab === tab.id ? '#3b82f6' : '#6b7280'
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        
        <div style={styles.main}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default CorporateSettings;
