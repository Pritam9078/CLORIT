import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Check, 
  X, 
  Eye, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical
} from 'lucide-react';

interface Community {
  id: string;
  name: string;
  location: string;
  members: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  email: string;
  phone: string;
  projects: number;
}

const CommunityManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const itemsPerPage = 8;

  // Mock data
  const communities: Community[] = [
    {
      id: 'C001',
      name: 'Sundarbans Eco Community',
      location: 'West Bengal, India',
      members: 245,
      status: 'pending',
      submittedDate: '2024-03-15',
      email: 'contact@sundarbanseco.org',
      phone: '+91 98765 43210',
      projects: 3
    },
    {
      id: 'C002',
      name: 'Coastal Guard Alliance',
      location: 'Odisha, India',
      members: 189,
      status: 'approved',
      submittedDate: '2024-03-10',
      email: 'info@coastalguard.org',
      phone: '+91 87654 32109',
      projects: 7
    },
    {
      id: 'C003',
      name: 'Mangrove Restoration Group',
      location: 'Kerala, India',
      members: 156,
      status: 'pending',
      submittedDate: '2024-03-18',
      email: 'hello@mangroverest.org',
      phone: '+91 76543 21098',
      projects: 2
    },
    {
      id: 'C004',
      name: 'Blue Carbon Initiative',
      location: 'Tamil Nadu, India',
      members: 298,
      status: 'approved',
      submittedDate: '2024-03-12',
      email: 'team@bluecarbon.org',
      phone: '+91 65432 10987',
      projects: 5
    },
    {
      id: 'C005',
      name: 'Ocean Protectors',
      location: 'Gujarat, India',
      members: 134,
      status: 'rejected',
      submittedDate: '2024-03-08',
      email: 'contact@oceanprotectors.org',
      phone: '+91 54321 09876',
      projects: 1
    }
  ];

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || community.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredCommunities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCommunities = filteredCommunities.slice(startIndex, startIndex + itemsPerPage);

  const handleApprove = (id: string) => {
    console.log('Approving community:', id);
    // Implementation for approval
  };

  const handleReject = (id: string) => {
    console.log('Rejecting community:', id);
    // Implementation for rejection
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#22c55e';
      case 'rejected': return '#ef4444';
      case 'pending': return '#f59e0b';
      default: return '#6b7280';
    }
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
      transition: 'all 0.3s ease',
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
    table: {
      width: '100%',
      backgroundColor: 'white',
      borderRadius: '1rem',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    },
    tableHeader: {
      backgroundColor: '#f8fafc',
      padding: '1rem',
      borderBottom: '1px solid #e2e8f0'
    },
    tableHeaderRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 80px 120px 100px 150px',
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
      gridTemplateColumns: '1fr 1fr 80px 120px 100px 150px',
      gap: '1rem',
      alignItems: 'center',
      padding: '1rem',
      borderBottom: '1px solid #f1f5f9',
      transition: 'background-color 0.2s ease'
    },
    communityInfo: {
      display: 'flex',
      flexDirection: 'column' as const
    },
    communityName: {
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '0.25rem'
    },
    communityEmail: {
      fontSize: '0.9rem',
      color: '#64748b'
    },
    locationInfo: {
      display: 'flex',
      flexDirection: 'column' as const
    },
    location: {
      color: '#374151',
      marginBottom: '0.25rem'
    },
    phone: {
      fontSize: '0.9rem',
      color: '#64748b'
    },
    memberCount: {
      fontWeight: '600',
      color: '#1e293b'
    },
    statusBadge: {
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      textAlign: 'center' as const,
      color: 'white',
      textTransform: 'capitalize' as const
    },
    projectCount: {
      fontWeight: '600',
      color: '#1e293b'
    },
    actionButtons: {
      display: 'flex',
      gap: '0.5rem'
    },
    actionButton: {
      padding: '0.5rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    approveButton: {
      backgroundColor: '#22c55e',
      color: 'white'
    },
    rejectButton: {
      backgroundColor: '#ef4444',
      color: 'white'
    },
    viewButton: {
      backgroundColor: '#3b82f6',
      color: 'white'
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
      transition: 'all 0.2s ease'
    },
    paginationInfo: {
      color: '#64748b'
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
          <Users size={32} color="#0077B6" />
          Community Management
        </h1>
        <p style={styles.subtitle}>
          Manage linked communities, approve requests, and set permissions
        </p>
      </div>

      <div style={styles.controls}>
        <div style={styles.searchContainer}>
          <Search style={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="Search communities..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          style={styles.filterSelect}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <motion.div
        style={styles.table}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div style={styles.tableHeader}>
          <div style={styles.tableHeaderRow}>
            <div>Community</div>
            <div>Location</div>
            <div>Members</div>
            <div>Status</div>
            <div>Projects</div>
            <div>Actions</div>
          </div>
        </div>
        <div style={styles.tableBody}>
          {paginatedCommunities.map((community, index) => (
            <motion.div
              key={community.id}
              style={styles.tableRow}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ backgroundColor: '#f8fafc' }}
            >
              <div style={styles.communityInfo}>
                <div style={styles.communityName}>{community.name}</div>
                <div style={styles.communityEmail}>{community.email}</div>
              </div>
              <div style={styles.locationInfo}>
                <div style={styles.location}>{community.location}</div>
                <div style={styles.phone}>{community.phone}</div>
              </div>
              <div style={styles.memberCount}>{community.members}</div>
              <div
                style={{
                  ...styles.statusBadge,
                  backgroundColor: getStatusColor(community.status)
                }}
              >
                {community.status}
              </div>
              <div style={styles.projectCount}>{community.projects}</div>
              <div style={styles.actionButtons}>
                {community.status === 'pending' && (
                  <>
                    <motion.button
                      style={{ ...styles.actionButton, ...styles.approveButton }}
                      onClick={() => handleApprove(community.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Check size={16} />
                    </motion.button>
                    <motion.button
                      style={{ ...styles.actionButton, ...styles.rejectButton }}
                      onClick={() => handleReject(community.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X size={16} />
                    </motion.button>
                  </>
                )}
                <motion.button
                  style={{ ...styles.actionButton, ...styles.viewButton }}
                  onClick={() => setSelectedCommunity(community)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pagination */}
      <div style={styles.pagination}>
        <button
          style={styles.paginationButton}
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </button>
        <span style={styles.paginationInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          style={styles.paginationButton}
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default CommunityManagement;
