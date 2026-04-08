import React, { useState } from "react";
import { MapPin, AlertTriangle, Layers, Info } from "lucide-react";

const JurisdictionMapping: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  // Sample project markers (replace with API data later)
  const projects = [
    { id: 1, name: "Mangrove Carbon Site", coords: [19.07, 72.87], status: "Healthy" },
    { id: 2, name: "Industrial Hotspot", coords: [28.61, 77.23], status: "High Emission" },
    { id: 3, name: "Coastal Restoration", coords: [11.93, 79.83], status: "Healthy" },
    { id: 4, name: "Urban Forest Project", coords: [12.97, 77.59], status: "Monitoring" },
    { id: 5, name: "Wetland Conservation", coords: [22.34, 87.86], status: "High Emission" },
  ];

  const handleProjectClick = (projectName: string) => {
    setSelected(projectName);
  };

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#166534',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <Layers size={20} style={{ color: '#15803d' }} />
        Jurisdiction Mapping
      </h2>

      {/* Map Container - Using embedded Google Maps for simplicity */}
      <div style={{
        backgroundColor: '#f3f4f6',
        borderRadius: '0.5rem',
        height: '500px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298405137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1647875885981!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        
        {/* Overlay with interactive markers */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          minWidth: '200px'
        }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '600',
            marginBottom: '0.75rem',
            color: '#374151'
          }}>
            Project Locations
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {projects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => handleProjectClick(proj.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  backgroundColor: selected === proj.name ? '#f3f4f6' : 'transparent',
                  border: selected === proj.name ? '1px solid #d1d5db' : '1px solid transparent',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (selected !== proj.name) {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selected !== proj.name) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <MapPin size={16} style={{ 
                  color: proj.status === "Healthy" ? '#059669' : 
                         proj.status === "High Emission" ? '#dc2626' : '#f59e0b'
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    {proj.name}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: proj.status === "Healthy" ? '#059669' : 
                           proj.status === "High Emission" ? '#dc2626' : '#f59e0b'
                  }}>
                    {proj.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Project Info */}
      {selected && (
        <div style={{
          padding: '1rem',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Info size={20} style={{ color: '#2563eb' }} />
          <p style={{ color: '#374151' }}>
            Selected jurisdiction: <span style={{ fontWeight: '600' }}>{selected}</span>
          </p>
          <button
            onClick={() => setSelected(null)}
            style={{
              marginLeft: 'auto',
              padding: '0.25rem 0.5rem',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontSize: '0.75rem',
              color: '#6b7280'
            }}
          >
            Clear
          </button>
        </div>
      )}

      {/* Legend */}
      <div style={{
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb'
      }}>
        <h4 style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          marginBottom: '0.75rem',
          color: '#374151'
        }}>
          Status Legend
        </h4>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#059669'
            }} />
            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Healthy</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#dc2626'
            }} />
            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>High Emission</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#f59e0b'
            }} />
            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Monitoring</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JurisdictionMapping;
