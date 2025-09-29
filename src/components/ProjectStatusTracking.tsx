import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Stage {
  id: number;
  name: string;
  status: 'pending' | 'completed' | 'rejected';
}

const stages: Stage[] = [
  { id: 1, name: 'NGO Verification', status: 'completed' },
  { id: 2, name: 'Panchayat Review', status: 'pending' },
  { id: 3, name: 'NCCR Approval', status: 'pending' },
];

const ProjectStatusTracking: React.FC = () => {
  const completedCount = stages.filter((s) => s.status === 'completed').length;
  const progress = (completedCount / stages.length) * 100;

  return (
    <div style={{
      padding: '1.5rem',
      backgroundColor: '#ffffff',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#166534',
        marginBottom: '1rem'
      }}>
        📊 Project Status Tracking
      </h2>

      {/* Progress Bar */}
      <div style={{
        width: '100%',
        backgroundColor: '#e5e7eb',
        borderRadius: '9999px',
        height: '0.75rem',
        marginBottom: '1.5rem'
      }}>
        <div
          style={{
            backgroundColor: '#059669',
            height: '0.75rem',
            borderRadius: '9999px',
            transition: 'all 0.5s ease',
            width: `${progress}%`
          }}
        />
      </div>

      {/* Stages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {stages.map((stage) => (
          <div
            key={stage.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem',
              border: '1px solid #bbf7d0',
              borderRadius: '0.5rem',
              transition: 'background-color 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {stage.status === 'completed' && (
              <CheckCircle style={{ color: '#059669', width: '1.25rem', height: '1.25rem' }} />
            )}
            {stage.status === 'pending' && (
              <Clock style={{ color: '#d97706', width: '1.25rem', height: '1.25rem' }} />
            )}
            {stage.status === 'rejected' && (
              <AlertCircle style={{ color: '#dc2626', width: '1.25rem', height: '1.25rem' }} />
            )}

            <span style={{ flex: 1, fontWeight: '500', color: '#111827' }}>
              {stage.name}
            </span>
            
            <span
              style={{
                fontSize: '0.875rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                textTransform: 'capitalize',
                backgroundColor:
                  stage.status === 'completed'
                    ? '#dcfce7'
                    : stage.status === 'pending'
                    ? '#fef3c7'
                    : '#fecaca',
                color:
                  stage.status === 'completed'
                    ? '#166534'
                    : stage.status === 'pending'
                    ? '#92400e'
                    : '#991b1b'
              }}
            >
              {stage.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectStatusTracking;
