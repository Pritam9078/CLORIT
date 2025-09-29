import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './shared/DashboardHeader';
import { AuthUtils } from '../utils/auth';

interface LandData {
  id: string;
  communityName: string;
  location: string;
  area: string;
  coordinates: string;
  registrationDate: string;
  status: string;
  ngoPartner: string;
}

const LandRegistration = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [newLandData, setNewLandData] = useState({
    communityName: '',
    location: '',
    area: '',
    coordinates: '',
    ngoPartner: '',
    vegetationStatus: '',
    soilType: '',
    waterAccess: ''
  });

  useEffect(() => {
    // Initialize mock user profile if not exists
    const currentUser = AuthUtils.getCurrentUser();
    if (!currentUser) {
      const mockUser = {
        id: 'community-001',
        name: 'Rajesh Kumar',
        email: 'community@example.com',
        role: 'community',
      };
      AuthUtils.saveUserProfile(mockUser);
    }
  }, []);

  const styles = {
    dashboard: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#F8FAF9',
      minHeight: '100vh',
      margin: 0,
      padding: 0
    },
    mainContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    },
    pageHeader: {
      marginBottom: '3rem'
    },
    pageTitle: {
      fontSize: '2.5rem',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 50%, #4CAF50 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem'
    },
    pageSubtitle: {
      fontSize: '1.1rem',
      color: '#6b7280',
      lineHeight: 1.6
    },
    actionBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      background: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 119, 182, 0.05)',
      border: '1px solid rgba(0, 119, 182, 0.1)'
    },
    statsContainer: {
      display: 'flex',
      gap: '2rem'
    },
    stat: {
      textAlign: 'center' as const
    },
    statValue: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#0077B6'
    },
    statLabel: {
      fontSize: '0.8rem',
      color: '#6b7280',
      textTransform: 'uppercase' as const
    },
    registerButton: {
      background: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.2s',
      boxShadow: '0 4px 15px rgba(0, 119, 182, 0.2)'
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: isRegistering ? '1fr 1fr' : '1fr',
      gap: '2rem'
    },
    registrationForm: {
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0, 119, 182, 0.05)',
      border: '1px solid rgba(0, 119, 182, 0.1)'
    },
    formTitle: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#0077B6',
      marginBottom: '1.5rem'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    formGroup: {
      marginBottom: '1rem'
    },
    label: {
      display: 'block',
      fontSize: '0.9rem',
      fontWeight: 500,
      color: '#374151',
      marginBottom: '0.5rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '2px solid rgba(0, 119, 182, 0.2)',
      borderRadius: '6px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s'
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      border: '2px solid rgba(0, 119, 182, 0.2)',
      borderRadius: '6px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s',
      minHeight: '100px',
      resize: 'vertical' as const
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      border: '2px solid rgba(0, 119, 182, 0.2)',
      borderRadius: '6px',
      fontSize: '1rem',
      outline: 'none',
      background: 'white',
      cursor: 'pointer'
    },
    formActions: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'flex-end'
    },
    cancelButton: {
      background: 'transparent',
      color: '#6b7280',
      border: '2px solid rgba(0, 119, 182, 0.2)',
      padding: '0.75rem 1.5rem',
      borderRadius: '6px',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    submitButton: {
      background: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '6px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
      boxShadow: '0 4px 15px rgba(0, 119, 182, 0.2)'
    },
    landsList: {
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0, 119, 182, 0.05)',
      border: '1px solid rgba(0, 119, 182, 0.1)'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#0077B6',
      marginBottom: '1.5rem'
    },
    landCard: {
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '1rem',
      transition: 'all 0.2s'
    },
    landHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem'
    },
    landTitle: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '0.25rem'
    },
    landLocation: {
      color: '#6b7280',
      fontSize: '0.9rem'
    },
    statusBadge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.7rem',
      fontWeight: 500
    },
    statusRegistered: {
      background: 'rgba(76, 175, 80, 0.1)',
      color: '#4CAF50'
    },
    statusPending: {
      background: 'rgba(0, 180, 216, 0.1)',
      color: '#00B4D8'
    },
    landDetails: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1rem',
      fontSize: '0.9rem'
    },
    detailItem: {
      display: 'flex',
      flexDirection: 'column' as const
    },
    detailLabel: {
      color: '#6b7280',
      fontWeight: 500,
      marginBottom: '0.25rem'
    },
    detailValue: {
      color: '#1f2937',
      fontWeight: 600
    }
  };

  const registeredLands: LandData[] = [
    {
      id: 'LAND-001',
      communityName: 'Sundarbans Fishing Community',
      location: 'West Bengal, India',
      area: '25.5 Ha',
      coordinates: '22.5°N, 89.0°E',
      registrationDate: '2024-01-15',
      status: 'Registered',
      ngoPartner: 'Marine Conservation Society'
    },
    {
      id: 'LAND-002',
      communityName: 'Coastal Farmers Collective',
      location: 'Odisha, India',
      area: '18.2 Ha',
      coordinates: '19.8°N, 85.8°E',
      registrationDate: '2024-02-10',
      status: 'Registered',
      ngoPartner: 'Blue Earth Foundation'
    },
    {
      id: 'LAND-003',
      communityName: 'Mangrove Restoration Group',
      location: 'Kerala, India',
      area: '12.8 Ha',
      coordinates: '9.9°N, 76.3°E',
      registrationDate: '2024-03-05',
      status: 'Pending Verification',
      ngoPartner: 'Coastal Care NGO'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setNewLandData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Registering new land:', newLandData);
    alert('Land registration submitted successfully! Blockchain transaction initiated.');
    setIsRegistering(false);
    setNewLandData({
      communityName: '',
      location: '',
      area: '',
      coordinates: '',
      ngoPartner: '',
      vegetationStatus: '',
      soilType: '',
      waterAccess: ''
    });
  };

  const getStatusStyle = (status: string) => {
    return status === 'Registered' ? styles.statusRegistered : styles.statusPending;
  };

  return (
    <div style={styles.dashboard}>
      <DashboardHeader 
        title="Land Registration"
        subtitle="Register your restoration land on the blockchain for transparent and immutable record-keeping"
        userRole="community"
      />

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Page Header */}
        <div style={styles.pageHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <button
              onClick={() => navigate('/community-dashboard')}
              style={{
                background: 'rgba(0, 119, 182, 0.1)',
                border: '1px solid rgba(0, 119, 182, 0.2)',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                color: '#0077B6',
                fontSize: '0.9rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 119, 182, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(0, 119, 182, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 119, 182, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(0, 119, 182, 0.2)';
              }}
            >
              ← Back to Dashboard
            </button>
          </div>
          <h1 style={styles.pageTitle}>Land & Community Registration</h1>
          <p style={styles.pageSubtitle}>
            Register your restoration land on the blockchain for transparent and immutable record-keeping. 
            Capture boundaries, coordinates, and initial vegetation status to begin your blue carbon journey.
          </p>
        </div>

        {/* Action Bar with Stats */}
        <div style={styles.actionBar}>
          <div style={styles.statsContainer}>
            <div style={styles.stat}>
              <div style={styles.statValue}>3</div>
              <div style={styles.statLabel}>Registered Lands</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statValue}>56.5</div>
              <div style={styles.statLabel}>Total Hectares</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statValue}>2</div>
              <div style={styles.statLabel}>Active NGO Partners</div>
            </div>
          </div>
          <button
            style={styles.registerButton}
            onClick={() => setIsRegistering(!isRegistering)}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'linear-gradient(135deg, #005A8B 0%, #0096C7 100%)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)')}
          >
            {isRegistering ? 'Cancel Registration' : '+ Register New Land'}
          </button>
        </div>

        {/* Content Grid */}
        <div style={styles.contentGrid}>
          {/* Registration Form */}
          {isRegistering && (
            <div style={styles.registrationForm}>
              <h3 style={styles.formTitle}>🏞️ New Land Registration</h3>
              
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Community Name *</label>
                  <input
                    type="text"
                    placeholder="Enter community name"
                    value={newLandData.communityName}
                    onChange={(e) => handleInputChange('communityName', e.target.value)}
                    style={styles.input}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#0077B6')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(0, 119, 182, 0.2)')}
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Location *</label>
                  <input
                    type="text"
                    placeholder="State, District, Village"
                    value={newLandData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    style={styles.input}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#0077B6')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(0, 119, 182, 0.2)')}
                  />
                </div>
              </div>

              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Area (Hectares) *</label>
                  <input
                    type="number"
                    placeholder="Enter area in hectares"
                    value={newLandData.area}
                    onChange={(e) => handleInputChange('area', e.target.value)}
                    style={styles.input}
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>GPS Coordinates *</label>
                  <input
                    type="text"
                    placeholder="Lat, Long (e.g., 22.5°N, 89.0°E)"
                    value={newLandData.coordinates}
                    onChange={(e) => handleInputChange('coordinates', e.target.value)}
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>NGO Partner *</label>
                  <select
                    value={newLandData.ngoPartner}
                    onChange={(e) => handleInputChange('ngoPartner', e.target.value)}
                    style={styles.select}
                  >
                    <option value="">Select NGO Partner</option>
                    <option value="Marine Conservation Society">Marine Conservation Society</option>
                    <option value="Blue Earth Foundation">Blue Earth Foundation</option>
                    <option value="Coastal Care NGO">Coastal Care NGO</option>
                    <option value="Mangrove Protection Alliance">Mangrove Protection Alliance</option>
                  </select>
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Soil Type</label>
                  <select
                    value={newLandData.soilType}
                    onChange={(e) => handleInputChange('soilType', e.target.value)}
                    style={styles.select}
                  >
                    <option value="">Select Soil Type</option>
                    <option value="Sandy">Sandy</option>
                    <option value="Clay">Clay</option>
                    <option value="Muddy">Muddy</option>
                    <option value="Saline">Saline</option>
                  </select>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Current Vegetation Status</label>
                <textarea
                  placeholder="Describe current vegetation, mangrove species, coverage percentage..."
                  value={newLandData.vegetationStatus}
                  onChange={(e) => handleInputChange('vegetationStatus', e.target.value)}
                  style={styles.textarea}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#0077B6')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(0, 119, 182, 0.2)')}
                />
              </div>

              <div style={styles.formActions}>
                <button
                  style={styles.cancelButton}
                  onClick={() => setIsRegistering(false)}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(0, 119, 182, 0.4)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(0, 119, 182, 0.2)')}
                >
                  Cancel
                </button>
                <button
                  style={styles.submitButton}
                  onClick={handleSubmit}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'linear-gradient(135deg, #005A8B 0%, #0096C7 100%)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)')}
                >
                  Register on Blockchain
                </button>
              </div>
            </div>
          )}

          {/* Registered Lands List */}
          <div style={styles.landsList}>
            <h3 style={styles.sectionTitle}>📋 Registered Lands</h3>
            
            {registeredLands.map((land, index) => (
              <div
                key={land.id}
                style={styles.landCard}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
              >
                <div style={styles.landHeader}>
                  <div>
                    <div style={styles.landTitle}>{land.communityName}</div>
                    <div style={styles.landLocation}>📍 {land.location}</div>
                  </div>
                  <span style={{...styles.statusBadge, ...getStatusStyle(land.status)}}>
                    {land.status}
                  </span>
                </div>
                
                <div style={styles.landDetails}>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Area</span>
                    <span style={styles.detailValue}>{land.area}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Coordinates</span>
                    <span style={styles.detailValue}>{land.coordinates}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>NGO Partner</span>
                    <span style={styles.detailValue}>{land.ngoPartner}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Land ID</span>
                    <span style={styles.detailValue}>{land.id}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Registration Date</span>
                    <span style={styles.detailValue}>{land.registrationDate}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Blockchain Record</span>
                    <span style={styles.detailValue}>✅ Immutable</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandRegistration;
