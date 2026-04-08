import React, { useState } from 'react';
import { Upload, FileText, MapPin, Calendar } from 'lucide-react';

const RegistrationDataUpload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      setUploadedFiles(prev => [...prev, ...fileNames]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  return (
    <div style={{
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#166534',
        marginBottom: '0.5rem'
      }}>
        📤 Registration Data Upload
      </h2>
      
      <p style={{
        color: '#6b7280',
        fontSize: '1rem',
        marginBottom: '1rem'
      }}>
        Upload your project registration documents and data files.
      </p>

      {/* Upload Area */}
      <div
        style={{
          border: `2px dashed ${dragActive ? '#10b981' : '#d1d5db'}`,
          borderRadius: '0.75rem',
          padding: '3rem 2rem',
          textAlign: 'center',
          backgroundColor: dragActive ? '#f0fdf4' : '#ffffff',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <Upload style={{
          width: '3rem',
          height: '3rem',
          color: '#10b981',
          margin: '0 auto 1rem'
        }} />
        
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '0.5rem'
        }}>
          Drop files here or click to browse
        </h3>
        
        <p style={{
          color: '#6b7280',
          fontSize: '0.875rem'
        }}>
          Supported formats: PDF, JPG, PNG, DOC, XLS (Max 10MB per file)
        </p>
        
        <input
          id="file-input"
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
          style={{ display: 'none' }}
          onChange={(e) => handleFileUpload(e.target.files)}
        />
      </div>

      {/* Required Documents */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <FileText style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} />
          Required Documents
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          {[
            { name: 'Project Proposal', status: 'pending' },
            { name: 'Land Ownership Certificate', status: 'pending' },
            { name: 'Environmental Impact Assessment', status: 'pending' },
            { name: 'Community Consent Letter', status: 'pending' }
          ].map((doc, index) => (
            <div
              key={index}
              style={{
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                backgroundColor: '#f9fafb'
              }}
            >
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                {doc.name}
              </h4>
              <span style={{
                fontSize: '0.75rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '9999px',
                backgroundColor: '#fef3c7',
                color: '#92400e'
              }}>
                {doc.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '1rem'
          }}>
            Uploaded Files ({uploadedFiles.length})
          </h3>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {uploadedFiles.map((fileName, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '0.5rem'
                }}
              >
                <FileText style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
                <span style={{
                  flex: 1,
                  fontSize: '0.875rem',
                  color: '#111827'
                }}>
                  {fileName}
                </span>
                <button
                  onClick={() => {
                    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
                  }}
                  style={{
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.75rem',
                    color: '#ef4444',
                    backgroundColor: 'transparent',
                    border: '1px solid #fca5a5',
                    borderRadius: '0.25rem',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem'
      }}>
        <button
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#ffffff',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Save Draft
        </button>
        
        <button
          disabled={uploadedFiles.length === 0}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: uploadedFiles.length > 0 ? '#10b981' : '#d1d5db',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: uploadedFiles.length > 0 ? 'pointer' : 'not-allowed'
          }}
        >
          Submit Registration
        </button>
      </div>
    </div>
  );
};

export default RegistrationDataUpload;
