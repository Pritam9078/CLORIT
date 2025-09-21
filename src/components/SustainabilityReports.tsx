import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart,
  Globe,
  Leaf,
  Building2,
  Target,
  CheckCircle,
  Clock,
  Filter,
  Search,
  Eye,
  Share2,
  Printer
} from 'lucide-react';

interface Report {
  id: string;
  title: string;
  type: 'ESG' | 'Carbon Footprint' | 'Sustainability' | 'GRI' | 'CDP' | 'TCFD';
  period: string;
  status: 'Published' | 'Draft' | 'In Progress' | 'Review';
  createdDate: string;
  size: string;
  description: string;
  coverageScope: string;
  frameworks: string[];
}

const SustainabilityReports: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const reports: Report[] = [
    {
      id: 'RPT-2024-001',
      title: '2024 Annual Sustainability Report',
      type: 'Sustainability',
      period: '2024 Annual',
      status: 'Published',
      createdDate: '2024-03-15',
      size: '12.5 MB',
      description: 'Comprehensive annual sustainability report covering environmental, social, and governance performance.',
      coverageScope: 'Global Operations',
      frameworks: ['GRI Standards', 'SASB', 'TCFD']
    },
    {
      id: 'RPT-2024-002',
      title: 'Carbon Footprint Assessment Q1 2024',
      type: 'Carbon Footprint',
      period: '2024 Q1',
      status: 'Published',
      createdDate: '2024-04-10',
      size: '8.3 MB',
      description: 'Detailed carbon footprint analysis including Scope 1, 2, and 3 emissions.',
      coverageScope: 'All Operations',
      frameworks: ['GHG Protocol', 'ISO 14064']
    },
    {
      id: 'RPT-2024-003',
      title: 'ESG Performance Dashboard',
      type: 'ESG',
      period: '2024 Q2',
      status: 'In Progress',
      createdDate: '2024-06-01',
      size: '5.7 MB',
      description: 'Real-time ESG metrics and performance indicators across all business units.',
      coverageScope: 'Corporate & Subsidiaries',
      frameworks: ['MSCI ESG', 'S&P Global ESG']
    },
    {
      id: 'RPT-2024-004',
      title: 'Climate Risk Assessment (TCFD)',
      type: 'TCFD',
      period: '2024',
      status: 'Review',
      createdDate: '2024-07-20',
      size: '15.2 MB',
      description: 'Climate-related financial disclosures following TCFD recommendations.',
      coverageScope: 'Global Portfolio',
      frameworks: ['TCFD', 'EU Taxonomy']
    },
    {
      id: 'RPT-2024-005',
      title: 'CDP Climate Change Response',
      type: 'CDP',
      period: '2024',
      status: 'Draft',
      createdDate: '2024-08-05',
      size: '9.1 MB',
      description: 'Annual CDP climate change questionnaire response and scoring.',
      coverageScope: 'Global Operations',
      frameworks: ['CDP Framework']
    },
    {
      id: 'RPT-2024-006',
      title: 'GRI Standards Compliance Report',
      type: 'GRI',
      period: '2024',
      status: 'Published',
      createdDate: '2024-05-30',
      size: '18.4 MB',
      description: 'Comprehensive GRI Standards-based sustainability disclosure.',
      coverageScope: 'All Entities',
      frameworks: ['GRI Universal Standards', 'GRI Sector Standards']
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || report.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || report.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return { bg: '#dcfce7', color: '#166534' };
      case 'In Progress': return { bg: '#fef3c7', color: '#92400e' };
      case 'Review': return { bg: '#dbeafe', color: '#1e40af' };
      case 'Draft': return { bg: '#fee2e2', color: '#dc2626' };
      default: return { bg: '#f3f4f6', color: '#374151' };
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ESG': return { bg: '#dcfce7', color: '#166534' };
      case 'Carbon Footprint': return { bg: '#dbeafe', color: '#1e40af' };
      case 'Sustainability': return { bg: '#fef3c7', color: '#92400e' };
      case 'GRI': return { bg: '#f3e8ff', color: '#7c3aed' };
      case 'CDP': return { bg: '#fce7f3', color: '#be185d' };
      case 'TCFD': return { bg: '#ecfdf5', color: '#059669' };
      default: return { bg: '#f3f4f6', color: '#374151' };
    }
  };

  const reportStats = [
    {
      title: 'Total Reports',
      value: reports.length.toString(),
      change: '+3 this quarter',
      icon: FileText,
      color: '#3b82f6'
    },
    {
      title: 'Published Reports',
      value: reports.filter(r => r.status === 'Published').length.toString(),
      change: '+2 this month',
      icon: CheckCircle,
      color: '#10b981'
    },
    {
      title: 'Reports in Progress',
      value: reports.filter(r => r.status === 'In Progress').length.toString(),
      change: '1 due this week',
      icon: Clock,
      color: '#f59e0b'
    },
    {
      title: 'Framework Coverage',
      value: '8',
      change: 'GRI, TCFD, CDP, SASB',
      icon: Target,
      color: '#8b5cf6'
    }
  ];

  const styles = {
    container: {
      padding: '2rem',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      minHeight: '100vh'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1f2937',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    controls: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.75rem',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: 600,
      transition: 'all 0.2s'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      color: 'white'
    },
    secondaryButton: {
      background: 'white',
      color: '#374151',
      border: '1px solid #d1d5db'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    statCard: {
      background: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    },
    statHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    statTitle: {
      fontSize: '0.875rem',
      color: '#6b7280',
      fontWeight: 500
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    statChange: {
      fontSize: '0.875rem',
      color: '#10b981',
      fontWeight: 500
    },
    filterSection: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      alignItems: 'center',
      flexWrap: 'wrap' as const
    },
    searchContainer: {
      position: 'relative' as const,
      flex: 1,
      minWidth: '300px'
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem 0.75rem 2.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.75rem',
      fontSize: '0.875rem',
      outline: 'none',
      background: 'white'
    },
    searchIcon: {
      position: 'absolute' as const,
      left: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#6b7280'
    },
    select: {
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.75rem',
      background: 'white',
      fontSize: '0.875rem',
      outline: 'none',
      minWidth: '150px'
    },
    reportsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
      gap: '1.5rem'
    },
    reportCard: {
      background: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    reportHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem'
    },
    reportTitle: {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '0.25rem'
    },
    reportSubtitle: {
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    badge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: 600
    },
    reportDetails: {
      marginBottom: '1rem'
    },
    detailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.5rem 0',
      borderBottom: '1px solid #f3f4f6'
    },
    detailLabel: {
      fontSize: '0.875rem',
      color: '#6b7280',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    detailValue: {
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#1f2937'
    },
    frameworkTags: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '0.25rem',
      marginTop: '0.5rem'
    },
    frameworkTag: {
      background: '#f3f4f6',
      color: '#374151',
      padding: '0.125rem 0.5rem',
      borderRadius: '0.25rem',
      fontSize: '0.75rem'
    },
    reportActions: {
      display: 'flex',
      gap: '0.5rem',
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: '1px solid #f3f4f6'
    },
    actionButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      padding: '0.5rem 0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      background: 'white',
      cursor: 'pointer',
      fontSize: '0.75rem',
      transition: 'all 0.2s'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          <FileText size={24} />
          Sustainability Reports
        </h1>
        <div style={styles.controls}>
          <button style={{...styles.button, ...styles.secondaryButton}}>
            <Download size={16} />
            Export All
          </button>
          <button style={{...styles.button, ...styles.primaryButton}}>
            <FileText size={16} />
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        {reportStats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={styles.statHeader}>
              <span style={styles.statTitle}>{stat.title}</span>
              <stat.icon size={20} style={{ color: stat.color }} />
            </div>
            <div style={styles.statValue}>{stat.value}</div>
            <div style={styles.statChange}>{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={styles.filterSection}>
        <div style={styles.searchContainer}>
          <Search size={16} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search reports..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          style={styles.select}
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="ESG">ESG</option>
          <option value="Carbon Footprint">Carbon Footprint</option>
          <option value="Sustainability">Sustainability</option>
          <option value="GRI">GRI</option>
          <option value="CDP">CDP</option>
          <option value="TCFD">TCFD</option>
        </select>
        <select
          style={styles.select}
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Published">Published</option>
          <option value="In Progress">In Progress</option>
          <option value="Review">Review</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      {/* Reports Grid */}
      <div style={styles.reportsGrid}>
        {filteredReports.map((report) => {
          const statusStyle = getStatusColor(report.status);
          const typeStyle = getTypeColor(report.type);
          
          return (
            <div
              key={report.id}
              style={styles.reportCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
              }}
            >
              <div style={styles.reportHeader}>
                <div>
                  <h3 style={styles.reportTitle}>{report.title}</h3>
                  <p style={styles.reportSubtitle}>{report.id} • {report.period}</p>
                </div>
                <div style={{
                  ...styles.badge,
                  background: statusStyle.bg,
                  color: statusStyle.color
                }}>
                  {report.status}
                </div>
              </div>

              <div style={styles.reportDetails}>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>
                    <Building2 size={14} />
                    Type
                  </span>
                  <span style={{
                    ...styles.badge,
                    background: typeStyle.bg,
                    color: typeStyle.color
                  }}>
                    {report.type}
                  </span>
                </div>

                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>
                    <Calendar size={14} />
                    Created
                  </span>
                  <span style={styles.detailValue}>
                    {new Date(report.createdDate).toLocaleDateString()}
                  </span>
                </div>

                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>
                    <Globe size={14} />
                    Scope
                  </span>
                  <span style={styles.detailValue}>{report.coverageScope}</span>
                </div>

                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Size</span>
                  <span style={styles.detailValue}>{report.size}</span>
                </div>
              </div>

              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                {report.description}
              </p>

              <div>
                <span style={styles.detailLabel}>Frameworks:</span>
                <div style={styles.frameworkTags}>
                  {report.frameworks.map((framework, index) => (
                    <span key={index} style={styles.frameworkTag}>
                      {framework}
                    </span>
                  ))}
                </div>
              </div>

              <div style={styles.reportActions}>
                <button style={styles.actionButton}>
                  <Eye size={14} />
                  View
                </button>
                <button style={styles.actionButton}>
                  <Download size={14} />
                  Download
                </button>
                <button style={styles.actionButton}>
                  <Share2 size={14} />
                  Share
                </button>
                <button style={styles.actionButton}>
                  <Printer size={14} />
                  Print
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredReports.length === 0 && (
        <div style={{
          textAlign: 'center' as const,
          padding: '3rem',
          color: '#6b7280'
        }}>
          <FileText size={48} style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>No reports found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default SustainabilityReports;
