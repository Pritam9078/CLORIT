import React, { useState, useEffect } from 'react';
import { AuthUtils, UserProfile } from '../../utils/auth';
import { WalletState } from '../../utils/walletUtils';
import WalletConnector from './WalletConnector';
import ErrorBoundary from './ErrorBoundary';

interface ProfileManagerProps {
  userRole: 'community' | 'ngo' | 'panchayat' | 'corporate' | 'nccr';
  onProfileUpdate?: (profile: UserProfile) => void;
}

const ProfileManager: React.FC<ProfileManagerProps> = ({ userRole, onProfileUpdate }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [walletState, setWalletState] = useState<WalletState | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    location: '',
    jurisdiction: '',
    company: '',
    department: '',
  });

  useEffect(() => {
    const currentUser = AuthUtils.getCurrentUser();
    if (currentUser) {
      setProfile(currentUser);
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: '',
        organization: '',
        location: '',
        jurisdiction: '',
        company: '',
        department: '',
      });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    if (profile) {
      const updatedProfile: UserProfile = {
        ...profile,
        name: formData.name,
        email: formData.email,
        walletAddress: walletState?.address || profile.walletAddress,
      };
      
      AuthUtils.saveUserProfile(updatedProfile);
      setProfile(updatedProfile);
      setIsEditing(false);
      onProfileUpdate?.(updatedProfile);
    }
  };

  const handleWalletChange = (newWalletState: WalletState | null) => {
    setWalletState(newWalletState);
    
    // Update profile with wallet address when connected
    if (newWalletState?.isConnected && newWalletState?.address && profile) {
      const updatedProfile: UserProfile = {
        ...profile,
        walletAddress: newWalletState.address,
      };
      
      AuthUtils.saveUserProfile(updatedProfile);
      setProfile(updatedProfile);
      onProfileUpdate?.(updatedProfile);
    }
  };

  const getRoleSpecificFields = () => {
    switch (userRole) {
      case 'community':
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Contact Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="+91 98765 43210"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Village, District, State"
              />
            </div>
          </>
        );
      
      case 'ngo':
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Organization Name</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Green Earth Foundation"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Contact Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="+91 98765 43210"
              />
            </div>
          </>
        );
      
      case 'panchayat':
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Jurisdiction</label>
              <input
                type="text"
                name="jurisdiction"
                value={formData.jurisdiction}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Panchayat Area/Block"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Official Contact</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="+91 98765 43210"
              />
            </div>
          </>
        );
      
      case 'corporate':
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Company Name</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Acme Corporation"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Sustainability & ESG"
              />
            </div>
          </>
        );
      
      case 'nccr':
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="National Carbon Credit Registry"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Official Contact</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="+91 11 2345 6789"
              />
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  const styles = {
    container: {
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid #e5e7eb',
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#1f2937',
    },
    editButton: {
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      border: '1px solid #3b82f6',
      background: isEditing ? '#3b82f6' : 'white',
      color: isEditing ? 'white' : '#3b82f6',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    profileSection: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gap: '1.5rem',
      marginBottom: '2rem',
    },
    avatarSection: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: '1rem',
    },
    avatar: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      color: 'white',
      fontWeight: 600,
    },
    roleTag: {
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      background: '#f3f4f6',
      color: '#374151',
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'capitalize' as const,
    },
    infoSection: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem',
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#374151',
    },
    input: {
      padding: '0.75rem',
      borderRadius: '6px',
      border: '1px solid #d1d5db',
      fontSize: '0.875rem',
      transition: 'border-color 0.2s ease',
    },
    readOnlyValue: {
      padding: '0.75rem 0',
      fontSize: '0.875rem',
      color: '#1f2937',
      borderBottom: '1px solid transparent',
    },
    walletSection: {
      marginTop: '1.5rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid #e5e7eb',
    },
    walletTitle: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '1rem',
    },
    actionButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'flex-end',
      marginTop: '1.5rem',
    },
    saveButton: {
      padding: '0.75rem 1.5rem',
      borderRadius: '6px',
      border: 'none',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    cancelButton: {
      padding: '0.75rem 1.5rem',
      borderRadius: '6px',
      border: '1px solid #d1d5db',
      background: 'white',
      color: '#6b7280',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
  };

  if (!profile) {
    return (
      <div style={styles.container}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>👤</div>
          <p style={{ color: '#6b7280' }}>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>👤 Profile Settings</h3>
        <button
          style={styles.editButton}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div style={styles.profileSection}>
        <div style={styles.avatarSection}>
          <div style={styles.avatar}>
            {profile.name?.charAt(0).toUpperCase() || '?'}
          </div>
          <div style={styles.roleTag}>
            {userRole === 'nccr' ? 'NCCR Admin' : userRole}
          </div>
        </div>

        <div style={styles.infoSection}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Enter your full name"
              />
            ) : (
              <div style={styles.readOnlyValue}>{profile.name}</div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Enter your email"
              />
            ) : (
              <div style={styles.readOnlyValue}>{profile.email}</div>
            )}
          </div>

          {/* Show wallet address if connected */}
          {(walletState?.isConnected && walletState?.address) && (
            <div style={styles.formGroup}>
              <label style={styles.label}>Wallet Address</label>
              <div style={{...styles.readOnlyValue, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <span style={{ 
                  fontFamily: 'monospace', 
                  fontSize: '0.75rem',
                  color: '#059669',
                  background: '#ecfdf5',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #a7f3d0'
                }}>
                  {`${walletState.address.slice(0, 6)}...${walletState.address.slice(-4)}`}
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(walletState.address)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    fontSize: '0.75rem',
                    color: '#6b7280'
                  }}
                  title="Copy full address"
                >
                  📋
                </button>
                <span style={{ fontSize: '0.625rem', color: '#10b981' }}>✓ Connected</span>
              </div>
            </div>
          )}

          {isEditing && getRoleSpecificFields()}
        </div>
      </div>

      {isEditing && (
        <div style={styles.actionButtons}>
          <button
            style={styles.cancelButton}
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
          <button
            style={styles.saveButton}
            onClick={handleSaveProfile}
          >
            Save Changes
          </button>
        </div>
      )}

      <div style={styles.walletSection}>
        <h4 style={styles.walletTitle}>🦊 Blockchain Wallet</h4>
        <ErrorBoundary
          fallback={({ error, resetError }) => (
            <div style={{
              background: '#fff3cd',
              border: '1px solid #ffeaa7',
              borderRadius: '8px',
              padding: '1rem',
              textAlign: 'center' as const
            }}>
              <p style={{ color: '#856404', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>
                ⚠️ Wallet connection temporarily unavailable
              </p>
              <p style={{ color: '#6c5000', margin: '0 0 1rem 0', fontSize: '0.75rem' }}>
                {error?.message || 'Please try refreshing the page'}
              </p>
              <button
                onClick={resetError}
                style={{
                  background: '#856404',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  fontSize: '0.75rem'
                }}
              >
                Retry Connection
              </button>
            </div>
          )}
        >
          <WalletConnector onWalletChange={handleWalletChange} />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default ProfileManager;
