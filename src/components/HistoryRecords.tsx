import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const HistoryRecords: React.FC = () => {
  const [records] = useState([
    { id: 1, project: 'Mangrove Plantation - Delta', date: '2025-09-10', status: 'Approved' },
    { id: 2, project: 'Coral Reef Restoration', date: '2025-08-22', status: 'Approved' },
    { id: 3, project: 'Coastal Clean-Up Drive', date: '2025-07-30', status: 'Rejected' },
  ]);

  const statusBadge = (status: string) => {
    return status === 'Approved' ? (
      <span style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        color: '#166534',
        fontWeight: '500'
      }}>
        <CheckCircle style={{ width: '1rem', height: '1rem' }} /> Approved
      </span>
    ) : (
      <span style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        color: '#991b1b',
        fontWeight: '500'
      }}>
        <XCircle style={{ width: '1rem', height: '1rem' }} /> Rejected
      </span>
    );
  };

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
        📜 History & Records
      </h2>

      <div style={{
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid #bbf7d0',
        borderRadius: '0.5rem',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          backgroundColor: '#dcfce7',
          color: '#166534',
          fontWeight: '600',
          fontSize: '0.875rem'
        }}>
          <div style={{
            border: '1px solid #bbf7d0',
            padding: '0.75rem 1rem',
            textAlign: 'left'
          }}>
            Project
          </div>
          <div style={{
            border: '1px solid #bbf7d0',
            padding: '0.75rem 1rem',
            textAlign: 'left'
          }}>
            Date
          </div>
          <div style={{
            border: '1px solid #bbf7d0',
            padding: '0.75rem 1rem',
            textAlign: 'left'
          }}>
            Status
          </div>
        </div>
        
        {records.map((record) => (
          <div
            key={record.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              transition: 'background-color 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div style={{
              border: '1px solid #bbf7d0',
              padding: '0.75rem 1rem',
              color: '#111827'
            }}>
              {record.project}
            </div>
            <div style={{
              border: '1px solid #bbf7d0',
              padding: '0.75rem 1rem',
              color: '#111827'
            }}>
              {record.date}
            </div>
            <div style={{
              border: '1px solid #bbf7d0',
              padding: '0.75rem 1rem'
            }}>
              {statusBadge(record.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryRecords;
