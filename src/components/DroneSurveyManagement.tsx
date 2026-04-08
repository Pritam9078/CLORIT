import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  MapPin, 
  Camera, 
  File, 
  Trash2, 
  Download, 
  Eye, 
  Calendar,
  Search,
  Filter
} from 'lucide-react';

interface DroneImage {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  thumbnailUrl: string;
  type: 'image' | 'geojson';
  status: 'processing' | 'completed' | 'failed';
}

const DroneSurveyManagement: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<DroneImage | null>(null);

  // Mock data for uploaded images
  const droneImages: DroneImage[] = [
    {
      id: 'DI001',
      name: 'Mangrove_Survey_001.jpg',
      size: '4.2 MB',
      uploadDate: '2024-03-15',
      location: {
        lat: 22.5726,
        lng: 88.3639,
        name: 'Sundarbans, West Bengal'
      },
      thumbnailUrl: '/api/placeholder/150/150',
      type: 'image',
      status: 'completed'
    },
    {
      id: 'DI002',
      name: 'Coastal_Mapping.geojson',
      size: '1.8 MB',
      uploadDate: '2024-03-14',
      location: {
        lat: 19.0760,
        lng: 72.8777,
        name: 'Mumbai Coast, Maharashtra'
      },
      thumbnailUrl: '/api/placeholder/150/150',
      type: 'geojson',
      status: 'completed'
    },
    {
      id: 'DI003',
      name: 'Blue_Carbon_Site_03.jpg',
      size: '3.7 MB',
      uploadDate: '2024-03-13',
      location: {
        lat: 8.0883,
        lng: 77.0522,
        name: 'Kanyakumari, Tamil Nadu'
      },
      thumbnailUrl: '/api/placeholder/150/150',
      type: 'image',
      status: 'processing'
    },
    {
      id: 'DI004',
      name: 'Restoration_Area_Map.geojson',
      size: '2.1 MB',
      uploadDate: '2024-03-12',
      location: {
        lat: 15.2993,
        lng: 74.1240,
        name: 'Goa Coastline'
      },
      thumbnailUrl: '/api/placeholder/150/150',
      type: 'geojson',
      status: 'failed'
    }
  ];

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(prev => [...prev, ...files]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = () => {
    console.log('Uploading files:', selectedFiles);
    // Implementation for file upload
    setSelectedFiles([]);
  };

  const filteredImages = droneImages.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.location.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || image.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#22c55e';
      case 'processing': return '#f59e0b';
      case 'failed': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getFileIcon = (type: string) => {
    return type === 'geojson' ? <File size={20} /> : <Camera size={20} />;
  };

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    header: {
      marginBottom: '2rem'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    subtitle: {
      color: '#64748b',
      fontSize: '1.1rem'
    },
    uploadSection: {
      marginBottom: '3rem'
    },
    dropZone: {
      border: `3px dashed ${isDragOver ? '#0077B6' : '#d1d5db'}`,
      borderRadius: '1rem',
      padding: '3rem',
      textAlign: 'center' as const,
      backgroundColor: isDragOver ? '#f0f9ff' : '#f8fafc',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    dropZoneContent: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: '1rem'
    },
    uploadIcon: {
      padding: '1rem',
      borderRadius: '50%',
      backgroundColor: '#0077B6',
      color: 'white'
    },
    dropZoneText: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.5rem'
    },
    dropZoneSubtext: {
      color: '#64748b',
      marginBottom: '1rem'
    },
    fileInput: {
      display: 'none'
    },
    uploadButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#0077B6',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.2s ease'
    },
    selectedFiles: {
      marginTop: '1rem',
      display: 'grid',
      gap: '0.5rem'
    },
    fileItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.75rem',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      border: '1px solid #e2e8f0'
    },
    fileInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    fileName: {
      fontWeight: '500',
      color: '#374151'
    },
    fileSize: {
      color: '#64748b',
      fontSize: '0.9rem'
    },
    removeButton: {
      padding: '0.25rem',
      backgroundColor: '#fee2e2',
      color: '#dc2626',
      border: 'none',
      borderRadius: '0.25rem',
      cursor: 'pointer'
    },
    controls: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      flexWrap: 'wrap' as const
    },
    searchContainer: {
      position: 'relative' as const,
      flex: 1,
      minWidth: '300px'
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem 0.75rem 3rem',
      border: '2px solid #e2e8f0',
      borderRadius: '1rem',
      fontSize: '1rem',
      outline: 'none'
    },
    searchIcon: {
      position: 'absolute' as const,
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#64748b'
    },
    filterSelect: {
      padding: '0.75rem 1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '1rem',
      fontSize: '1rem',
      backgroundColor: 'white',
      cursor: 'pointer',
      outline: 'none'
    },
    imageGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.5rem'
    },
    imageCard: {
      backgroundColor: 'white',
      borderRadius: '1rem',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease'
    },
    imageHeader: {
      padding: '1rem',
      borderBottom: '1px solid #f1f5f9'
    },
    imageTitle: {
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    imageInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.9rem',
      color: '#64748b'
    },
    imageThumbnail: {
      width: '100%',
      height: '200px',
      backgroundColor: '#f1f5f9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#64748b'
    },
    imageFooter: {
      padding: '1rem'
    },
    locationInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1rem',
      color: '#64748b',
      fontSize: '0.9rem'
    },
    statusBadge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '1rem',
      fontSize: '0.8rem',
      fontWeight: '500',
      color: 'white',
      textTransform: 'capitalize' as const,
      marginBottom: '1rem'
    },
    actionButtons: {
      display: 'flex',
      gap: '0.5rem'
    },
    actionButton: {
      flex: 1,
      padding: '0.5rem',
      border: 'none',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem'
    },
    viewButton: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    downloadButton: {
      backgroundColor: '#10b981',
      color: 'white'
    },
    deleteButton: {
      backgroundColor: '#ef4444',
      color: 'white'
    },
    mapPlaceholder: {
      width: '100%',
      height: '300px',
      backgroundColor: '#f1f5f9',
      borderRadius: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '2rem',
      border: '2px dashed #d1d5db'
    },
    mapText: {
      color: '#64748b',
      fontSize: '1.1rem',
      fontWeight: '500'
    }
  };

  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={styles.header}>
        <h1 style={styles.title}>
          <Camera size={32} color="#0077B6" />
          Drone Survey Management
        </h1>
        <p style={styles.subtitle}>
          Manage drone survey data and uploaded images with geo-tagging support
        </p>
      </div>

      {/* Upload Section */}
      <div style={styles.uploadSection}>
        <motion.div
          style={styles.dropZone}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput')?.click()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div style={styles.dropZoneContent}>
            <div style={styles.uploadIcon}>
              <Upload size={32} />
            </div>
            <div style={styles.dropZoneText}>
              Drag & drop your files here
            </div>
            <div style={styles.dropZoneSubtext}>
              Supports: JPG, PNG, GeoJSON files • Max size: 10MB
            </div>
            <button style={styles.uploadButton}>
              Choose Files
            </button>
          </div>
        </motion.div>
        
        <input
          id="fileInput"
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.geojson"
          style={styles.fileInput}
          onChange={handleFileSelect}
        />

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <motion.div
            style={styles.selectedFiles}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            {selectedFiles.map((file, index) => (
              <div key={index} style={styles.fileItem}>
                <div style={styles.fileInfo}>
                  <div style={styles.fileName}>{file.name}</div>
                  <div style={styles.fileSize}>
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </div>
                </div>
                <button
                  style={styles.removeButton}
                  onClick={() => removeFile(index)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              style={{...styles.uploadButton, marginTop: '1rem'}}
              onClick={uploadFiles}
            >
              Upload {selectedFiles.length} Files
            </button>
          </motion.div>
        )}
      </div>

      {/* Search and Filter Controls */}
      <div style={styles.controls}>
        <div style={styles.searchContainer}>
          <Search style={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="Search surveys..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          style={styles.filterSelect}
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="image">Images</option>
          <option value="geojson">GeoJSON</option>
        </select>
      </div>

      {/* Images Grid */}
      <motion.div
        style={styles.imageGrid}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {filteredImages.map((image, index) => (
          <motion.div
            key={image.id}
            style={styles.imageCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ y: -5, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)' }}
          >
            <div style={styles.imageHeader}>
              <div style={styles.imageTitle}>
                {getFileIcon(image.type)}
                {image.name}
              </div>
              <div style={styles.imageInfo}>
                <span>{image.size}</span>
                <span>{image.uploadDate}</span>
              </div>
            </div>
            
            <div style={styles.imageThumbnail}>
              {image.type === 'image' ? (
                <Camera size={48} />
              ) : (
                <File size={48} />
              )}
            </div>
            
            <div style={styles.imageFooter}>
              <div style={styles.locationInfo}>
                <MapPin size={16} />
                <span>{image.location.name}</span>
              </div>
              
              <div
                style={{
                  ...styles.statusBadge,
                  backgroundColor: getStatusColor(image.status)
                }}
              >
                {image.status}
              </div>
              
              <div style={styles.actionButtons}>
                <motion.button
                  style={{...styles.actionButton, ...styles.viewButton}}
                  onClick={() => setSelectedImage(image)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye size={16} />
                  View
                </motion.button>
                <motion.button
                  style={{...styles.actionButton, ...styles.downloadButton}}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={16} />
                  Download
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Map Placeholder */}
      <div style={styles.mapPlaceholder}>
        <div style={styles.mapText}>
          📍 Interactive Map Visualization (Coming Soon)
        </div>
      </div>
    </motion.div>
  );
};

export default DroneSurveyManagement;
