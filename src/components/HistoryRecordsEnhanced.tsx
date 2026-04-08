import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  History, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react';

interface HistoryRecord {
  id: string;
  project: string;
  community: string;
  date: string;
  status: 'Approved' | 'Rejected' | 'Pending';
  action: string;
  description: string;
  documents: string[];
  verificationFee: string;
}

const HistoryRecordsEnhanced: React.FC = () => {
  const [records] = useState<HistoryRecord[]>([
    { 
      id: 'HR001', 
      project: 'Mangrove Restoration - Sundarbans', 
      community: 'Sundarbans Eco Community',
      date: '2024-03-15', 
      status: 'Approved',
      action: 'Project Verification',
      description: 'Comprehensive verification of mangrove restoration project including site inspection and documentation review.',
      documents: ['Site_Survey.pdf', 'Environmental_Impact.pdf', 'Community_Agreement.pdf'],
      verificationFee: '15000'
    },
    { 
      id: 'HR002', 
      project: 'Blue Carbon Initiative - Mumbai Coast', 
      community: 'Coastal Guard Alliance',
      date: '2024-03-12', 
      status: 'Approved',
      action: 'Compliance Monitoring',
      description: 'Quarterly compliance check for ongoing blue carbon sequestration project.',
      documents: ['Compliance_Report_Q1.pdf', 'Water_Quality_Test.pdf'],
      verificationFee: '8000'
    },
    { 
      id: 'HR003', 
      project: 'Seagrass Restoration - Kerala', 
      community: 'Mangrove Restoration Group',
      date: '2024-03-10', 
      status: 'Rejected',
      action: 'Project Verification',
      description: 'Initial verification failed due to insufficient environmental impact documentation.',
      documents: ['Initial_Proposal.pdf'],
      verificationFee: '0'
    },
    { 
      id: 'HR004', 
      project: 'Coral Conservation - Tamil Nadu', 
      community: 'Blue Carbon Initiative',
      date: '2024-03-08', 
      status: 'Pending',
      action: 'Document Review',
      description: 'Currently reviewing submitted documentation for coral conservation project approval.',
      documents: ['Project_Proposal.pdf', 'Site_Analysis.pdf', 'Stakeholder_Consent.pdf'],
      verificationFee: '12000'
    },
    { 
      id: 'HR005', 
      project: 'Wetland Conservation - Gujarat', 
      community: 'Ocean Protectors',
      date: '2024-03-05', 
      status: 'Approved',
      action: 'Final Verification',
      description: 'Final verification and certification of completed wetland conservation project.',
      documents: ['Final_Report.pdf', 'Before_After_Images.pdf', 'Carbon_Credits_Calculation.pdf'],
      verificationFee: '20000'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.community.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    const matchesDateRange = (!dateRange.start || record.date >= dateRange.start) &&
                            (!dateRange.end || record.date <= dateRange.end);
    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Approved': { color: '#22c55e', icon: <CheckCircle size={16} /> },
      'Rejected': { color: '#ef4444', icon: <XCircle size={16} /> },
      'Pending': { color: '#f59e0b', icon: <Clock size={16} /> }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    
    return (
      <span style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: 'white',
        backgroundColor: config.color
      }}>
        {config.icon}
        {status}
      </span>
    );
  };

  const exportToCSV = () => {
    const csvContent = [
      ['ID', 'Project', 'Community', 'Date', 'Status', 'Action', 'Verification Fee'],
      ...filteredRecords.map(record => [
        record.id,
        record.project,
        record.community,
        record.date,
        record.status,
        record.action,
        `₹${record.verificationFee}`
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'history_records.csv';
    a.click();
    URL.revokeObjectURL(url);
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
    controls: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem',
      alignItems: 'end'
    },
    searchContainer: {
      position: 'relative' as const
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
    filterGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem'
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151'
    },
    select: {
      padding: '0.75rem 1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '1rem',
      fontSize: '1rem',
      backgroundColor: 'white',
      cursor: 'pointer',
      outline: 'none'
    },
    dateInput: {
      padding: '0.75rem 1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '1rem',
      fontSize: '1rem',
      outline: 'none'
    },
    exportButton: {
      padding: '0.75rem 1.5rem',
      background: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '1rem',
      cursor: 'pointer',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s ease',
      justifySelf: 'end'
    },
    table: {
      width: '100%',
      backgroundColor: 'white',
      borderRadius: '1rem',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0'
    },
    tableHeader: {
      backgroundColor: '#f8fafc',
      padding: '1rem',
      borderBottom: '1px solid #e2e8f0'
    },
    tableHeaderRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 120px 120px 150px',
      gap: '1rem',
      alignItems: 'center',
      fontWeight: 'bold',
      color: '#374151'
    },
    tableBody: {
      padding: '0'
    },
    tableRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 120px 120px 150px',
      gap: '1rem',
      alignItems: 'center',
      padding: '1.5rem 1rem',
      borderBottom: '1px solid #f1f5f9',
      transition: 'background-color 0.2s ease'
    },
    projectInfo: {
      display: 'flex',
      flexDirection: 'column' as const
    },
    projectName: {
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '0.25rem'
    },
    projectDescription: {
      fontSize: '0.875rem',
      color: '#64748b',
      lineHeight: 1.4
    },
    communityInfo: {
      display: 'flex',
      flexDirection: 'column' as const
    },
    communityName: {
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.25rem'
    },
    actionType: {
      fontSize: '0.875rem',
      color: '#64748b'
    },
    dateInfo: {
      color: '#374151',
      fontWeight: '500'
    },
    feeInfo: {
      fontWeight: '600',
      color: '#1e293b'
    },
    actionButtons: {
      display: 'flex',
      gap: '0.5rem'
    },
    actionButton: {
      padding: '0.5rem',
      border: 'none',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f1f5f9',
      color: '#64748b'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem',
      marginTop: '2rem'
    },
    paginationButton: {
      padding: '0.5rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      background: 'white',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    paginationInfo: {
      color: '#64748b',
      fontWeight: '500'
    },
    recordCard: {
      background: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0',
      marginBottom: '1rem'
    },
    recordHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem'
    },
    recordContent: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '1rem'
    },
    recordField: {
      display: 'flex',
      flexDirection: 'column' as const
    },
    fieldLabel: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#64748b',
      marginBottom: '0.25rem'
    },
    fieldValue: {
      color: '#1e293b',
      fontWeight: '500'
    },
    documentsSection: {
      marginTop: '1rem',
      padding: '1rem',
      backgroundColor: '#f8fafc',
      borderRadius: '0.5rem'
    },
    documentsTitle: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.5rem'
    },
    documentsList: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '0.5rem'
    },
    documentTag: {
      padding: '0.25rem 0.75rem',
      backgroundColor: '#e0f2fe',
      color: '#0369a1',
      borderRadius: '1rem',
      fontSize: '0.75rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
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
          <History size={32} color="#0077B6" />
          History & Records
        </h1>
        <p style={styles.subtitle}>
          Track past verifications, actions, and approved submissions with detailed audit trail
        </p>
      </div>

      <div style={styles.controls}>
        <div style={styles.searchContainer}>
          <Search style={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="Search projects or communities..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div style={styles.filterGroup}>
          <label style={styles.label}>Status</label>
          <select
            style={styles.select}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.label}>Start Date</label>
          <input
            type="date"
            style={styles.dateInput}
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
          />
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.label}>End Date</label>
          <input
            type="date"
            style={styles.dateInput}
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
          />
        </div>

        <motion.button
          style={styles.exportButton}
          onClick={exportToCSV}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download size={16} />
          Export CSV
        </motion.button>
      </div>

      {/* Records Display */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {paginatedRecords.map((record, index) => (
          <motion.div
            key={record.id}
            style={styles.recordCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)' }}
          >
            <div style={styles.recordHeader}>
              <div>
                <h3 style={styles.projectName}>{record.project}</h3>
                <p style={styles.projectDescription}>{record.description}</p>
              </div>
              {getStatusBadge(record.status)}
            </div>
            
            <div style={styles.recordContent}>
              <div style={styles.recordField}>
                <span style={styles.fieldLabel}>Community</span>
                <span style={styles.fieldValue}>{record.community}</span>
              </div>
              <div style={styles.recordField}>
                <span style={styles.fieldLabel}>Date</span>
                <span style={styles.fieldValue}>{new Date(record.date).toLocaleDateString()}</span>
              </div>
              <div style={styles.recordField}>
                <span style={styles.fieldLabel}>Action</span>
                <span style={styles.fieldValue}>{record.action}</span>
              </div>
              <div style={styles.recordField}>
                <span style={styles.fieldLabel}>Verification Fee</span>
                <span style={styles.fieldValue}>
                  {record.verificationFee === '0' ? 'N/A' : `₹${parseInt(record.verificationFee).toLocaleString()}`}
                </span>
              </div>
            </div>

            {record.documents.length > 0 && (
              <div style={styles.documentsSection}>
                <div style={styles.documentsTitle}>Associated Documents</div>
                <div style={styles.documentsList}>
                  {record.documents.map((doc, idx) => (
                    <span key={idx} style={styles.documentTag}>
                      <FileText size={12} />
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            style={styles.paginationButton}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <span style={styles.paginationInfo}>
            Page {currentPage} of {totalPages} • {filteredRecords.length} records
          </span>
          <button
            style={styles.paginationButton}
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default HistoryRecordsEnhanced;
