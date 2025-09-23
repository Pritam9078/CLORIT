import React, { useState } from 'react';
import SatelliteGlobe from './SatelliteGlobe2';

interface VerificationTask {
  id: string;
  projectName: string;
  location: string;
  status: 'pending' | 'in-progress' | 'completed';
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  ndviValue: number;
}

interface NGODashboardProps {
  ngoInfo?: {
    name: string;
    assignedProjects: number;
    verificationCount: number;
  };
}

const NGODashboard: React.FC<NGODashboardProps> = ({
  ngoInfo = {
    name: "Green Earth Foundation",
    assignedProjects: 8,
    verificationCount: 15
  }
}) => {
  const [selectedProject, setSelectedProject] = useState<string>('proj-2');
  const [activeTab, setActiveTab] = useState<'overview' | 'verification' | 'upload' | 'ndvi'>('overview');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Sample verification tasks
  const verificationTasks: VerificationTask[] = [
    {
      id: 'ver-1',
      projectName: 'Sundarbans Restoration',
      location: 'West Bengal',
      status: 'pending',
      deadline: '2024-10-15',
      priority: 'high',
      ndviValue: 0.65
    },
    {
      id: 'ver-2',
      projectName: 'Kerala Backwaters',
      location: 'Kerala',
      status: 'in-progress',
      deadline: '2024-10-20',
      priority: 'medium',
      ndviValue: 0.72
    },
    {
      id: 'ver-3',
      projectName: 'Odisha Coast',
      location: 'Odisha',
      status: 'completed',
      deadline: '2024-09-30',
      priority: 'low',
      ndviValue: 0.45
    }
  ];

  const handleRegionClick = (region: any) => {
    setSelectedProject(region.id);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#64748b';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#FF9800';
      case 'in-progress': return '#0077B6';
      case 'completed': return '#4CAF50';
      default: return '#64748b';
    }
  };

  const styles = {
    dashboard: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F8FAF9 0%, #E8F5E8 100%)',
      fontFamily: 'Inter, system-ui, sans-serif'
    },
    header: {
      background: 'linear-gradient(135deg, #0077B6 0%, #4CAF50 100%)',
      color: 'white',
      padding: '2rem 0',
      borderRadius: '0 0 2rem 2rem'
    },
    headerContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 600,
      margin: 0
    },
    subtitle: {
      fontSize: '1rem',
      opacity: 0.9,
      margin: '0.5rem 0 0 0'
    },
    ngoInfo: {
      textAlign: 'right' as const,
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.25rem'
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem'
    },
    tabContainer: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem'
    },
    tab: {
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: '1px solid rgba(0, 119, 182, 0.2)',
      background: 'rgba(255, 255, 255, 0.7)',
      color: '#64748b',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: 500,
      transition: 'all 0.2s',
      backdropFilter: 'blur(10px)'
    },
    activeTab: {
      background: '#0077B6',
      color: 'white',
      borderColor: '#0077B6'
    },
    mainGrid: {
      display: 'grid',
      gap: '2rem',
      gridTemplateColumns: '2fr 1fr',
      gridTemplateRows: 'auto auto'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 10px 25px rgba(0, 119, 182, 0.1)',
      border: '1px solid rgba(0, 119, 182, 0.1)',
      backdropFilter: 'blur(10px)'
    },
    globeCard: {
      gridRow: '1 / 3',
      height: '600px',
      padding: 0,
      overflow: 'hidden'
    },
    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '1rem',
      marginBottom: '1rem'
    },
    metricItem: {
      textAlign: 'center' as const,
      padding: '1rem',
      background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.05) 0%, rgba(76, 175, 80, 0.05) 100%)',
      borderRadius: '8px',
      border: '1px solid rgba(0, 119, 182, 0.1)'
    },
    metricValue: {
      fontSize: '1.75rem',
      fontWeight: 700,
      color: '#0077B6',
      marginBottom: '0.5rem'
    },
    metricLabel: {
      fontSize: '0.75rem',
      color: '#64748b',
      fontWeight: 500
    },
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#0077B6',
      marginBottom: '1.5rem'
    },
    taskList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem'
    },
    taskItem: {
      padding: '1rem',
      background: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '8px',
      border: '1px solid rgba(0, 119, 182, 0.1)',
      transition: 'all 0.2s',
      cursor: 'pointer'
    },
    taskHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.5rem'
    },
    taskName: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#1e293b'
    },
    taskLocation: {
      fontSize: '0.875rem',
      color: '#64748b',
      marginBottom: '0.5rem'
    },
    taskMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '0.75rem'
    },
    badge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: 600,
      color: 'white'
    },
    uploadArea: {
      border: '2px dashed rgba(0, 119, 182, 0.3)',
      borderRadius: '8px',
      padding: '2rem',
      textAlign: 'center' as const,
      background: 'rgba(0, 119, 182, 0.02)',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    uploadButton: {
      background: '#0077B6',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      padding: '0.75rem 1.5rem',
      fontSize: '0.875rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    fileList: {
      marginTop: '1rem'
    },
    fileItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem',
      background: 'rgba(255, 255, 255, 0.7)',
      borderRadius: '6px',
      marginBottom: '0.5rem',
      fontSize: '0.875rem'
    },
    progressBar: {
      width: '100%',
      height: '4px',
      background: 'rgba(0, 119, 182, 0.1)',
      borderRadius: '2px',
      overflow: 'hidden',
      marginTop: '0.5rem'
    },
    progressFill: {
      height: '100%',
      background: '#4CAF50',
      borderRadius: '2px',
      transition: 'width 0.3s ease'
    }
  };

  const renderOverviewTab = () => (
    <>
      {/* Globe */}
      <div style={{...styles.card, ...styles.globeCard}}>
        <SatelliteGlobe
          userRole="ngo"
          onRegionClick={handleRegionClick}
          selectedProjectId={selectedProject}
          showNDVILayer={true}
        />
      </div>

      {/* Metrics */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Project Overview</h3>
        <div style={styles.metricsGrid}>
          <div style={styles.metricItem}>
            <div style={styles.metricValue}>8</div>
            <div style={styles.metricLabel}>Active Projects</div>
          </div>
          <div style={styles.metricItem}>
            <div style={styles.metricValue}>15</div>
            <div style={styles.metricLabel}>Verifications</div>
          </div>
          <div style={styles.metricItem}>
            <div style={styles.metricValue}>3</div>
            <div style={styles.metricLabel}>Pending Tasks</div>
          </div>
          <div style={styles.metricItem}>
            <div style={styles.metricValue}>92%</div>
            <div style={styles.metricLabel}>Success Rate</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Recent Verification Activity</h3>
        <div style={styles.taskList}>
          <div style={styles.taskItem}>
            <div>📸 Drone imagery uploaded for Sundarbans project</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>2 hours ago</div>
          </div>
          <div style={styles.taskItem}>
            <div>✅ Ground survey completed for Kerala Backwaters</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>1 day ago</div>
          </div>
          <div style={styles.taskItem}>
            <div>📊 NDVI analysis submitted for Odisha Coast</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>3 days ago</div>
          </div>
        </div>
      </div>
    </>
  );

  const renderVerificationTab = () => (
    <div style={{...styles.card, gridColumn: '1 / -1'}}>
      <h3 style={styles.cardTitle}>Verification Tasks</h3>
      <div style={styles.taskList}>
        {verificationTasks.map(task => (
          <div 
            key={task.id} 
            style={styles.taskItem}
            onClick={() => setSelectedProject(task.id)}
          >
            <div style={styles.taskHeader}>
              <div style={styles.taskName}>{task.projectName}</div>
              <div style={{
                ...styles.badge,
                background: getPriorityColor(task.priority)
              }}>
                {task.priority.toUpperCase()}
              </div>
            </div>
            <div style={styles.taskLocation}>📍 {task.location}</div>
            <div style={styles.taskMeta}>
              <div>
                <span style={{
                  ...styles.badge,
                  background: getStatusColor(task.status)
                }}>
                  {task.status.toUpperCase().replace('-', ' ')}
                </span>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Due: {task.deadline}</span>
              </div>
              <div>
                <span style={{ color: '#0077B6', fontWeight: 600 }}>NDVI: {task.ndviValue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUploadTab = () => (
    <div style={{...styles.card, gridColumn: '1 / -1'}}>
      <h3 style={styles.cardTitle}>Data Upload Center</h3>
      
      <div style={styles.uploadArea}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
        <h4 style={{ color: '#0077B6', marginBottom: '0.5rem' }}>Upload Survey Data</h4>
        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
          Drag and drop files here or click to browse
        </p>
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.pdf,.kml,.geojson"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload" style={styles.uploadButton}>
          Choose Files
        </label>
      </div>

      {uploadedFiles.length > 0 && (
        <div style={styles.fileList}>
          <h4 style={{ color: '#0077B6', marginBottom: '1rem' }}>Uploaded Files</h4>
          {uploadedFiles.map((file, index) => (
            <div key={index} style={styles.fileItem}>
              <div>
                <div style={{ fontWeight: 600 }}>{file.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
              <div style={{ color: '#4CAF50', fontWeight: 600 }}>✓ Uploaded</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderNDVITab = () => (
    <div style={{...styles.card, gridColumn: '1 / -1'}}>
      <h3 style={styles.cardTitle}>🛰️ NDVI Satellite Monitoring</h3>
      
      {/* Full-width satellite globe */}
      <div style={{ height: '600px', marginBottom: '2rem' }}>
        <SatelliteGlobe
          userRole="ngo"
          onRegionClick={handleRegionClick}
          selectedProjectId={selectedProject}
          showNDVILayer={true}
        />
      </div>

      {/* NDVI Analysis Tools */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Time Series Analysis */}
        <div style={{ padding: '1.5rem', background: 'rgba(76, 175, 80, 0.05)', borderRadius: '12px' }}>
          <h4 style={{ color: '#4CAF50', marginBottom: '1rem' }}>📈 NDVI Trends</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Sundarbans Project</span>
              <span style={{ fontWeight: 600, color: '#4CAF50' }}>0.65 ↗️ +0.08</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Kerala Backwaters</span>
              <span style={{ fontWeight: 600, color: '#4CAF50' }}>0.72 ↗️ +0.12</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Odisha Coast</span>
              <span style={{ fontWeight: 600, color: '#FFEB3B' }}>0.45 → 0.00</span>
            </div>
          </div>
        </div>

        {/* Health Alerts */}
        <div style={{ padding: '1.5rem', background: 'rgba(0, 119, 182, 0.05)', borderRadius: '12px' }}>
          <h4 style={{ color: '#0077B6', marginBottom: '1rem' }}>🚨 Health Alerts</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(76, 175, 80, 0.1)', borderRadius: '6px' }}>
              <div style={{ fontWeight: 600, color: '#4CAF50' }}>Improvement Detected</div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Kerala Backwaters showing +12% NDVI increase</div>
            </div>
            <div style={{ padding: '0.75rem', background: 'rgba(255, 235, 59, 0.1)', borderRadius: '6px' }}>
              <div style={{ fontWeight: 600, color: '#FFEB3B' }}>Monitoring Required</div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Odisha Coast NDVI below threshold</div>
            </div>
          </div>
        </div>

        {/* Data Export */}
        <div style={{ padding: '1.5rem', background: 'rgba(224, 231, 233, 0.5)', borderRadius: '12px' }}>
          <h4 style={{ color: '#0077B6', marginBottom: '1rem' }}>💾 Export NDVI Data</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button 
              style={{
                padding: '0.75rem',
                background: '#0077B6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              onClick={() => console.log('Export NDVI CSV')}
            >
              📊 Download CSV Report
            </button>
            <button 
              style={{
                padding: '0.75rem',
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              onClick={() => console.log('Export GIS data')}
            >
              🗺️ Download GIS Data
            </button>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <div style={styles.dashboard}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <img 
              src="/clorit-logo.png" 
              alt="CLORIT Logo" 
              style={{
                width: '40px',
                height: '40px',
                marginRight: '1rem'
              }}
            />
            <div>
              <h1 style={styles.title}>🌿 CLORIT NGO Dashboard</h1>
              <p style={styles.subtitle}>Environmental Verification & Monitoring</p>
            </div>
          </div>
          <div style={styles.ngoInfo}>
            <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>{ngoInfo.name}</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
              {ngoInfo.assignedProjects} Projects • {ngoInfo.verificationCount} Verifications
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={styles.container}>
        <div style={styles.tabContainer}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'overview' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'verification' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('verification')}
          >
            ✅ Verification Tasks
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'upload' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('upload')}
          >
            📤 Data Upload
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'ndvi' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('ndvi')}
          >
            🛰️ NDVI Monitoring
          </button>
        </div>

        {/* Main Content */}
        <div style={styles.mainGrid}>
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'verification' && renderVerificationTab()}
          {activeTab === 'upload' && renderUploadTab()}
          {activeTab === 'ndvi' && renderNDVITab()}
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;
