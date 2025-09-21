import React, { useState } from 'react';

interface PlantationEntry {
  id: string;
  species: string;
  area: string;
  plantationDate: string;
  location: string;
  seedlings: number;
  photos: number;
  status: string;
  gpsCoordinates: string;
}

const PlantationDataInput = () => {
  const [currentTab, setCurrentTab] = useState('data-entry');
  const [formData, setFormData] = useState({
    landId: '',
    species: '',
    seedlingCount: '',
    area: '',
    plantationDate: '',
    gpsCoordinates: '',
    soilCondition: '',
    waterLevel: '',
    fieldNotes: '',
    photos: [] as File[],
    droneImages: [] as File[],
    voiceNotes: null as File | null
  });
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const styles = {
    mobileApp: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '400px',
      margin: '0 auto',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      position: 'relative' as const,
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)'
    },
    header: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      padding: '1rem',
      textAlign: 'center' as const
    },
    headerTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      marginBottom: '0.5rem'
    },
    headerSubtitle: {
      fontSize: '0.9rem',
      opacity: 0.9
    },
    tabNavigation: {
      display: 'flex',
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb'
    },
    tab: {
      flex: 1,
      padding: '12px 8px',
      textAlign: 'center' as const,
      fontSize: '14px',
      color: '#6b7280',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    tabActive: {
      color: '#10b981',
      borderBottom: '2px solid #10b981',
      fontWeight: 500
    },
    mainContent: {
      padding: '1.5rem 1rem',
      paddingBottom: '100px'
    },
    section: {
      marginBottom: '2rem'
    },
    sectionTitle: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    sectionDescription: {
      fontSize: '0.85rem',
      color: '#6b7280',
      lineHeight: 1.5,
      marginBottom: '1rem'
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
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s'
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '1rem',
      outline: 'none',
      background: 'white',
      cursor: 'pointer'
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '1rem',
      outline: 'none',
      minHeight: '80px',
      resize: 'vertical' as const
    },
    fileInput: {
      display: 'none'
    },
    fileButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      padding: '0.75rem',
      border: '2px dashed #d1d5db',
      borderRadius: '8px',
      backgroundColor: '#f9fafb',
      color: '#6b7280',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '0.9rem'
    },
    voiceButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      padding: '1rem',
      borderRadius: '50px',
      border: 'none',
      backgroundColor: isVoiceRecording ? '#ef4444' : '#10b981',
      color: 'white',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 500,
      transition: 'all 0.2s',
      width: '100%'
    },
    submitButton: {
      width: '100%',
      padding: '1rem',
      backgroundColor: '#10b981',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
      marginTop: '1rem'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '1rem',
      marginBottom: '1rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    },
    entryHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.75rem'
    },
    entryTitle: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#1f2937'
    },
    statusBadge: {
      padding: '0.25rem 0.5rem',
      borderRadius: '12px',
      fontSize: '0.7rem',
      fontWeight: 500
    },
    statusDraft: {
      backgroundColor: '#fef3c7',
      color: '#92400e'
    },
    statusSubmitted: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    },
    entryDetails: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.5rem',
      fontSize: '0.8rem'
    },
    detailLabel: {
      color: '#6b7280'
    },
    detailValue: {
      color: '#1f2937',
      fontWeight: 500
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden',
      marginBottom: '1rem'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#10b981',
      transition: 'width 0.3s ease'
    },
    alertBox: {
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1rem',
      border: '1px solid #d1fae5',
      backgroundColor: '#f0fdf4',
      color: '#065f46'
    }
  };

  const registeredLands = [
    { id: 'LAND-001', name: 'Sundarbans Fishing Community' },
    { id: 'LAND-002', name: 'Coastal Farmers Collective' },
    { id: 'LAND-003', name: 'Mangrove Restoration Group' }
  ];

  const mangroveSpecies = [
    'Rhizophora mucronata',
    'Avicennia marina',
    'Sonneratia apetala',
    'Bruguiera gymnorrhiza',
    'Ceriops decandra',
    'Heritiera fomes',
    'Xylocarpus granatum'
  ];

  const plantationEntries: PlantationEntry[] = [
    {
      id: 'PLT-001',
      species: 'Rhizophora mucronata',
      area: '2.5 Ha',
      plantationDate: '2024-03-15',
      location: 'Block A1',
      seedlings: 1500,
      photos: 12,
      status: 'Submitted',
      gpsCoordinates: '22.5°N, 89.0°E'
    },
    {
      id: 'PLT-002',
      species: 'Avicennia marina',
      area: '1.8 Ha',
      plantationDate: '2024-03-20',
      location: 'Block B2',
      seedlings: 900,
      photos: 8,
      status: 'Draft',
      gpsCoordinates: '22.4°N, 89.1°E'
    }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (field: string, files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setFormData(prev => ({
        ...prev,
        [field]: fileArray
      }));
    }
  };

  const handleVoiceRecord = () => {
    setIsVoiceRecording(!isVoiceRecording);
    if (!isVoiceRecording) {
      // Start recording logic here
      console.log('Starting voice recording...');
    } else {
      // Stop recording logic here
      console.log('Stopping voice recording...');
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    console.log('Submitting plantation data:', formData);
    setTimeout(() => {
      alert('Plantation data submitted successfully! Data secured on blockchain with timestamp.');
      setIsSubmitting(false);
      // Reset form
      setFormData({
        landId: '',
        species: '',
        seedlingCount: '',
        area: '',
        plantationDate: '',
        gpsCoordinates: '',
        soilCondition: '',
        waterLevel: '',
        fieldNotes: '',
        photos: [],
        droneImages: [],
        voiceNotes: null
      });
    }, 2000);
  };

  const calculateProgress = () => {
    const requiredFields = ['landId', 'species', 'seedlingCount', 'area', 'plantationDate'];
    const filledFields = requiredFields.filter(field => formData[field as keyof typeof formData]).length;
    return (filledFields / requiredFields.length) * 100;
  };

  const getStatusStyle = (status: string) => {
    return status === 'Submitted' ? styles.statusSubmitted : styles.statusDraft;
  };

  return (
    <div style={styles.mobileApp}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>🌱 Plantation Data Input</h1>
        <p style={styles.headerSubtitle}>Record restoration activities with geo-tagged evidence</p>
      </div>

      {/* Tab Navigation */}
      <div style={styles.tabNavigation}>
        <button
          style={{
            ...styles.tab,
            ...(currentTab === 'data-entry' ? styles.tabActive : {})
          }}
          onClick={() => setCurrentTab('data-entry')}
        >
          📝 Data Entry
        </button>
        <button
          style={{
            ...styles.tab,
            ...(currentTab === 'my-entries' ? styles.tabActive : {})
          }}
          onClick={() => setCurrentTab('my-entries')}
        >
          📋 My Entries
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {currentTab === 'data-entry' && (
          <>
            {/* Progress Bar */}
            <div style={styles.progressBar}>
              <div 
                style={{
                  ...styles.progressFill,
                  width: `${calculateProgress()}%`
                }}
              />
            </div>
            <p style={{fontSize: '0.8rem', color: '#6b7280', marginBottom: '1rem', textAlign: 'center'}}>
              Form Progress: {Math.round(calculateProgress())}% Complete
            </p>

            {/* Alert for Voice Feature */}
            <div style={styles.alertBox}>
              <strong>💡 Voice Input Available:</strong> Use voice notes for field observations - perfect for illiterate users or hands-free recording!
            </div>

            {/* Basic Information */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                🏞️ Basic Information
              </h3>
              <p style={styles.sectionDescription}>
                Select your registered land and provide plantation details
              </p>

              <div style={styles.formGroup}>
                <label style={styles.label}>Registered Land *</label>
                <select
                  value={formData.landId}
                  onChange={(e) => handleInputChange('landId', e.target.value)}
                  style={styles.select}
                >
                  <option value="">Select registered land</option>
                  {registeredLands.map(land => (
                    <option key={land.id} value={land.id}>{land.name} ({land.id})</option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Mangrove Species *</label>
                <select
                  value={formData.species}
                  onChange={(e) => handleInputChange('species', e.target.value)}
                  style={styles.select}
                >
                  <option value="">Select species</option>
                  {mangroveSpecies.map(species => (
                    <option key={species} value={species}>{species}</option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Number of Seedlings *</label>
                <input
                  type="number"
                  placeholder="Enter seedling count"
                  value={formData.seedlingCount}
                  onChange={(e) => handleInputChange('seedlingCount', e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Plantation Area (Ha) *</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Area in hectares"
                  value={formData.area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Plantation Date *</label>
                <input
                  type="date"
                  value={formData.plantationDate}
                  onChange={(e) => handleInputChange('plantationDate', e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>GPS Coordinates</label>
                <input
                  type="text"
                  placeholder="Auto-captured or manual entry"
                  value={formData.gpsCoordinates}
                  onChange={(e) => handleInputChange('gpsCoordinates', e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>

            {/* Environmental Conditions */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                🌊 Environmental Conditions
              </h3>

              <div style={styles.formGroup}>
                <label style={styles.label}>Soil Condition</label>
                <select
                  value={formData.soilCondition}
                  onChange={(e) => handleInputChange('soilCondition', e.target.value)}
                  style={styles.select}
                >
                  <option value="">Select condition</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Water Level</label>
                <select
                  value={formData.waterLevel}
                  onChange={(e) => handleInputChange('waterLevel', e.target.value)}
                  style={styles.select}
                >
                  <option value="">Select level</option>
                  <option value="High Tide">High Tide</option>
                  <option value="Low Tide">Low Tide</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Dry">Dry</option>
                </select>
              </div>
            </div>

            {/* Photo Documentation */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                📸 Photo Documentation
              </h3>

              <div style={styles.formGroup}>
                <label style={styles.label}>Geo-tagged Photos</label>
                <input
                  type="file"
                  id="photos"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload('photos', e.target.files)}
                  style={styles.fileInput}
                />
                <label htmlFor="photos" style={styles.fileButton}>
                  📷 Upload Photos ({formData.photos.length} selected)
                </label>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Drone Images (Optional)</label>
                <input
                  type="file"
                  id="drone"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload('droneImages', e.target.files)}
                  style={styles.fileInput}
                />
                <label htmlFor="drone" style={styles.fileButton}>
                  🚁 Upload Drone Images ({formData.droneImages.length} selected)
                </label>
              </div>
            </div>

            {/* Field Notes */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                📝 Field Notes
              </h3>

              <div style={styles.formGroup}>
                <label style={styles.label}>Written Notes</label>
                <textarea
                  placeholder="Describe plantation activities, challenges, observations..."
                  value={formData.fieldNotes}
                  onChange={(e) => handleInputChange('fieldNotes', e.target.value)}
                  style={styles.textarea}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Voice Notes (For Illiterate Users)</label>
                <button
                  style={styles.voiceButton}
                  onClick={handleVoiceRecord}
                >
                  {isVoiceRecording ? '🛑 Stop Recording' : '🎤 Record Voice Notes'}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              style={{
                ...styles.submitButton,
                opacity: isSubmitting ? 0.6 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? '⏳ Submitting to Blockchain...' : '🔗 Submit to Blockchain'}
            </button>
          </>
        )}

        {currentTab === 'my-entries' && (
          <>
            <h3 style={styles.sectionTitle}>📋 My Plantation Entries</h3>
            
            {plantationEntries.map(entry => (
              <div key={entry.id} style={styles.card}>
                <div style={styles.entryHeader}>
                  <div style={styles.entryTitle}>{entry.species}</div>
                  <span style={{...styles.statusBadge, ...getStatusStyle(entry.status)}}>
                    {entry.status}
                  </span>
                </div>
                
                <div style={styles.entryDetails}>
                  <div style={styles.detailLabel}>Area:</div>
                  <div style={styles.detailValue}>{entry.area}</div>
                  
                  <div style={styles.detailLabel}>Seedlings:</div>
                  <div style={styles.detailValue}>{entry.seedlings}</div>
                  
                  <div style={styles.detailLabel}>Date:</div>
                  <div style={styles.detailValue}>{entry.plantationDate}</div>
                  
                  <div style={styles.detailLabel}>Photos:</div>
                  <div style={styles.detailValue}>{entry.photos}</div>
                  
                  <div style={styles.detailLabel}>Location:</div>
                  <div style={styles.detailValue}>{entry.location}</div>
                  
                  <div style={styles.detailLabel}>GPS:</div>
                  <div style={styles.detailValue}>{entry.gpsCoordinates}</div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PlantationDataInput;
