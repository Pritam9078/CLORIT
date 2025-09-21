import React, { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw, MapPin, Filter, Search, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  name: string;
  location: string;
  area: number;
  submittedBy: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'reverification';
  mapPreviewUrl: string;
}

const Project: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'P-001',
      name: 'Mangrove Restoration - West Delta',
      location: 'Sundarbans, West Bengal',
      area: 25.5,
      submittedBy: 'Green Valley NGO',
      submittedDate: '2025-09-12',
      status: 'pending',
      mapPreviewUrl: '/assets/maps/sundarbans-map.jpg'
    },
    {
      id: 'P-002',
      name: 'Coastal Coral Regeneration',
      location: 'Rameswaram, Tamil Nadu',
      area: 12.8,
      submittedBy: 'OceanLife Initiative',
      submittedDate: '2025-09-10',
      status: 'approved',
      mapPreviewUrl: '/assets/maps/rameswaram-map.jpg'
    },
    {
      id: 'P-003',
      name: 'Seaweed Farming Expansion',
      location: 'Lakshadweep Islands',
      area: 8.2,
      submittedBy: 'Blue Horizon Foundation',
      submittedDate: '2025-09-08',
      status: 'reverification',
      mapPreviewUrl: '/assets/maps/lakshadweep-map.jpg'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'reverification'>('all');

  const handleAction = (id: string, action: 'approve' | 'reject' | 'reverify') => {
    setProjects(prev =>
      prev.map(project =>
        project.id === id
          ? {
              ...project,
              status:
                action === 'approve'
                  ? 'approved'
                  : action === 'reject'
                  ? 'rejected'
                  : 'reverification'
            }
          : project
      )
    );
  };

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.status === filter);

  return (
    <div style={{
      padding: '1.5rem',
      background: 'linear-gradient(to bottom, #f0fdf4, #ffffff)',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <motion.h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#166534'
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🌱 Project Verification
        </motion.h1>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search projects..."
              style={{
                paddingLeft: '2rem',
                paddingRight: '0.75rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                border: '1px solid #86efac',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.3)'}
              onBlur={(e) => e.target.style.boxShadow = 'none'}
            />
            <Search style={{
              position: 'absolute',
              left: '0.5rem',
              top: '0.625rem',
              color: '#22c55e',
              width: '1rem',
              height: '1rem'
            }} />
          </div>

          <select
            value={filter}
            onChange={e => setFilter(e.target.value as any)}
            style={{
              border: '1px solid #86efac',
              borderRadius: '0.5rem',
              paddingLeft: '0.75rem',
              paddingRight: '0.75rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              fontSize: '0.875rem',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.3)'}
            onBlur={(e) => e.target.style.boxShadow = 'none'}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="reverification">Re-Verification</option>
          </select>
        </div>
      </div>

      {/* Projects List */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredProjects.map(project => (
          <motion.div
            key={project.id}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '0.75rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #dcfce7',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{
              width: '100%',
              height: '10rem',
              backgroundColor: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280',
              fontSize: '0.875rem'
            }}>
              📍 Map Preview: {project.location}
            </div>

            <div style={{ padding: '1rem' }}>
              <h2 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#166534',
                marginBottom: '0.25rem'
              }}>
                {project.name}
              </h2>
              
              <p style={{
                fontSize: '0.875rem',
                color: '#4b5563',
                display: 'flex',
                alignItems: 'center',
                marginTop: '0.25rem'
              }}>
                <MapPin style={{ width: '1rem', height: '1rem', marginRight: '0.25rem', color: '#22c55e' }} />
                {project.location}
              </p>
              
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                marginTop: '0.25rem'
              }}>
                Area: <span style={{ fontWeight: '500' }}>{project.area} hectares</span>
              </p>
              
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>
                Submitted by: <span style={{ fontWeight: '500' }}>{project.submittedBy}</span>
              </p>
              
              <p style={{
                fontSize: '0.75rem',
                color: '#9ca3af'
              }}>
                Date: {project.submittedDate}
              </p>

              <div style={{ marginTop: '0.75rem' }}>
                <span
                  style={{
                    paddingLeft: '0.5rem',
                    paddingRight: '0.5rem',
                    paddingTop: '0.25rem',
                    paddingBottom: '0.25rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    backgroundColor:
                      project.status === 'approved'
                        ? '#dcfce7'
                        : project.status === 'rejected'
                        ? '#fecaca'
                        : project.status === 'reverification'
                        ? '#fef3c7'
                        : '#f3f4f6',
                    color:
                      project.status === 'approved'
                        ? '#166534'
                        : project.status === 'rejected'
                        ? '#991b1b'
                        : project.status === 'reverification'
                        ? '#92400e'
                        : '#374151'
                  }}
                >
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>

              {project.status === 'pending' && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '1rem',
                  gap: '0.5rem'
                }}>
                  <button
                    onClick={() => handleAction(project.id, 'approve')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '0.875rem',
                      color: '#166534',
                      border: '1px solid #86efac',
                      borderRadius: '0.5rem',
                      paddingLeft: '0.75rem',
                      paddingRight: '0.75rem',
                      paddingTop: '0.25rem',
                      paddingBottom: '0.25rem',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dcfce7'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <CheckCircle style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} /> Approve
                  </button>
                  
                  <button
                    onClick={() => handleAction(project.id, 'reject')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '0.875rem',
                      color: '#991b1b',
                      border: '1px solid #fca5a5',
                      borderRadius: '0.5rem',
                      paddingLeft: '0.75rem',
                      paddingRight: '0.75rem',
                      paddingTop: '0.25rem',
                      paddingBottom: '0.25rem',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fecaca'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <XCircle style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} /> Reject
                  </button>
                  
                  <button
                    onClick={() => handleAction(project.id, 'reverify')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '0.875rem',
                      color: '#92400e',
                      border: '1px solid #fcd34d',
                      borderRadius: '0.5rem',
                      paddingLeft: '0.75rem',
                      paddingRight: '0.75rem',
                      paddingTop: '0.25rem',
                      paddingBottom: '0.25rem',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef3c7'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <RefreshCw style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} /> Re-Verify
                  </button>
                </div>
              )}

              {project.status !== 'pending' && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '1rem'
                }}>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '0.875rem',
                      color: '#1d4ed8',
                      border: '1px solid #93c5fd',
                      borderRadius: '0.5rem',
                      paddingLeft: '0.75rem',
                      paddingRight: '0.75rem',
                      paddingTop: '0.25rem',
                      paddingBottom: '0.25rem',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dbeafe'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <Eye style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} /> View Details
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div style={{
          textAlign: 'center',
          color: '#6b7280',
          marginTop: '2.5rem',
          fontSize: '1rem'
        }}>
          No projects found for the selected filter.
        </div>
      )}
    </div>
  );
};

export default Project;
