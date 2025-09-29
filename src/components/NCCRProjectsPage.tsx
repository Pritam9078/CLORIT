import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Eye, 
  Edit, 
  CheckCircle, 
  FileText, 
  MapPin,
  Calendar,
  TrendingUp,
  AlertCircle,
  Download,
  RefreshCw
} from 'lucide-react';

interface BlueCarbonSite {
  siteId: string;
  siteName: string;
  state: string;
  latitude: number;
  longitude: number;
  ecosystemType: 'Mangrove' | 'Seagrass' | 'Saltmarsh';
  restorationDate: string;
  areaHa: number;
  plantingDensity: number;
  dominantSpecies: string;
  survivalRate: number;
  carbonSequestered: number;
  monitoringMethod: string;
  lastMonitored: string;
  status: 'Active' | 'Monitoring' | 'Completed' | 'At Risk';
  remarks: string;
}

const NCCRProjectsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEcosystem, setFilterEcosystem] = useState<string>('All');
  const [filterState, setFilterState] = useState<string>('All');
  const [selectedSite, setSelectedSite] = useState<BlueCarbonSite | null>(null);

  // Blue Carbon Sites Data from the dataset
  const blueCarbonSites: BlueCarbonSite[] = [
    {
      siteId: 'NCCR-2000',
      siteName: 'Site_2000',
      state: 'Lakshadweep',
      latitude: 11.032842,
      longitude: 75.310252,
      ecosystemType: 'Saltmarsh',
      restorationDate: '2021-12-30',
      areaHa: 38.64,
      plantingDensity: 4805,
      dominantSpecies: 'Salicornia spp.',
      survivalRate: 67.6,
      carbonSequestered: 8460.51,
      monitoringMethod: 'Field survey',
      lastMonitored: '2023-03-22',
      status: 'Monitoring',
      remarks: 'Successful expansion'
    },
    {
      siteId: 'NCCR-2001',
      siteName: 'Site_2001',
      state: 'West Bengal',
      latitude: 17.568906,
      longitude: 72.914617,
      ecosystemType: 'Mangrove',
      restorationDate: '2015-03-12',
      areaHa: 97.95,
      plantingDensity: 1242,
      dominantSpecies: 'Rhizophora mucronata',
      survivalRate: 95.4,
      carbonSequestered: 21128.78,
      monitoringMethod: 'Field survey',
      lastMonitored: '2016-01-03',
      status: 'Completed',
      remarks: 'Invasive species pressure'
    },
    {
      siteId: 'NCCR-2002',
      siteName: 'Site_2002',
      state: 'Andhra Pradesh',
      latitude: 15.679539,
      longitude: 81.394252,
      ecosystemType: 'Mangrove',
      restorationDate: '2020-08-25',
      areaHa: 104.75,
      plantingDensity: 2680,
      dominantSpecies: 'Rhizophora mucronata',
      survivalRate: 77.9,
      carbonSequestered: 11390.1,
      monitoringMethod: 'Drone survey',
      lastMonitored: '2022-02-22',
      status: 'Active',
      remarks: 'High survival'
    },
    {
      siteId: 'NCCR-2003',
      siteName: 'Site_2003',
      state: 'Puducherry',
      latitude: 18.853545,
      longitude: 76.004004,
      ecosystemType: 'Seagrass',
      restorationDate: '2016-04-22',
      areaHa: 106.94,
      plantingDensity: 2639,
      dominantSpecies: 'Halophila ovalis',
      survivalRate: 52.4,
      carbonSequestered: 11916.54,
      monitoringMethod: 'Combined (field+RS)',
      lastMonitored: '2017-07-26',
      status: 'At Risk',
      remarks: 'Good recruitment'
    },
    {
      siteId: 'NCCR-2004',
      siteName: 'Site_2004',
      state: 'Lakshadweep',
      latitude: 9.359474,
      longitude: 81.484552,
      ecosystemType: 'Mangrove',
      restorationDate: '2019-05-23',
      areaHa: 82.94,
      plantingDensity: 3407,
      dominantSpecies: 'Bruguiera gymnorhiza',
      survivalRate: 47.4,
      carbonSequestered: 8970.33,
      monitoringMethod: 'Combined (field+RS)',
      lastMonitored: '2020-09-07',
      status: 'At Risk',
      remarks: 'Successful expansion'
    },
    {
      siteId: 'NCCR-2005',
      siteName: 'Site_2005',
      state: 'Lakshadweep',
      latitude: 19.375567,
      longitude: 75.426604,
      ecosystemType: 'Saltmarsh',
      restorationDate: '2020-08-16',
      areaHa: 109.96,
      plantingDensity: 2351,
      dominantSpecies: 'Salicornia spp.',
      survivalRate: 90.9,
      carbonSequestered: 8806.64,
      monitoringMethod: 'Remote sensing',
      lastMonitored: '2024-02-13',
      status: 'Active',
      remarks: 'High survival'
    },
    {
      siteId: 'NCCR-2006',
      siteName: 'Site_2006',
      state: 'Kerala',
      latitude: 17.96501,
      longitude: 75.308291,
      ecosystemType: 'Seagrass',
      restorationDate: '2020-09-18',
      areaHa: 49.16,
      plantingDensity: 2460,
      dominantSpecies: 'Thalassia hemprichii',
      survivalRate: 56.1,
      carbonSequestered: 6242.92,
      monitoringMethod: 'Combined (field+RS)',
      lastMonitored: '2026-02-10',
      status: 'Monitoring',
      remarks: 'High survival'
    },
    {
      siteId: 'NCCR-2007',
      siteName: 'Site_2007',
      state: 'West Bengal',
      latitude: 18.078638,
      longitude: 72.002658,
      ecosystemType: 'Mangrove',
      restorationDate: '2022-07-24',
      areaHa: 19.93,
      plantingDensity: 2096,
      dominantSpecies: 'Rhizophora mucronata',
      survivalRate: 85.8,
      carbonSequestered: 3495.3,
      monitoringMethod: 'Combined (field+RS)',
      lastMonitored: '2023-02-06',
      status: 'Active',
      remarks: 'Storm damage observed'
    },
    {
      siteId: 'NCCR-2008',
      siteName: 'Site_2008',
      state: 'Lakshadweep',
      latitude: 15.204565,
      longitude: 88.239911,
      ecosystemType: 'Mangrove',
      restorationDate: '2015-12-22',
      areaHa: 22.5,
      plantingDensity: 3287,
      dominantSpecies: 'Bruguiera gymnorhiza',
      survivalRate: 73.1,
      carbonSequestered: 2484.75,
      monitoringMethod: 'Remote sensing',
      lastMonitored: '2018-11-22',
      status: 'Completed',
      remarks: 'Good recruitment'
    },
    {
      siteId: 'NCCR-2009',
      siteName: 'Site_2009',
      state: 'Andhra Pradesh',
      latitude: 22.142736,
      longitude: 68.477763,
      ecosystemType: 'Saltmarsh',
      restorationDate: '2015-08-21',
      areaHa: 27.24,
      plantingDensity: 1576,
      dominantSpecies: 'Salicornia spp.',
      survivalRate: 94.1,
      carbonSequestered: 3477.76,
      monitoringMethod: 'Remote sensing',
      lastMonitored: '2016-08-26',
      status: 'Completed',
      remarks: 'Invasive species pressure'
    }
  ];

  const filteredSites = blueCarbonSites.filter(site => {
    const matchesSearch = site.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.dominantSpecies.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEcosystem = filterEcosystem === 'All' || site.ecosystemType === filterEcosystem;
    const matchesState = filterState === 'All' || site.state === filterState;
    return matchesSearch && matchesEcosystem && matchesState;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return { bg: '#dcfce7', color: '#166534' };
      case 'Completed': return { bg: '#dbeafe', color: '#1e40af' };
      case 'Monitoring': return { bg: '#fef3c7', color: '#92400e' };
      case 'At Risk': return { bg: '#fee2e2', color: '#dc2626' };
      default: return { bg: '#f3f4f6', color: '#374151' };
    }
  };

  const getEcosystemColor = (ecosystem: string) => {
    switch (ecosystem) {
      case 'Mangrove': return { bg: '#dcfce7', color: '#166534' };
      case 'Seagrass': return { bg: '#dbeafe', color: '#1e40af' };
      case 'Saltmarsh': return { bg: '#fef3c7', color: '#92400e' };
      default: return { bg: '#f3f4f6', color: '#374151' };
    }
  };

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
      color: '#0077B6',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    controls: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    },
    viewButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      background: 'white',
      cursor: 'pointer',
      fontSize: '0.875rem',
      transition: 'all 0.2s'
    },
    filterSection: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      alignItems: 'center',
      flexWrap: 'wrap' as const
    },
    searchInput: {
      flex: 1,
      minWidth: '300px',
      padding: '0.75rem 1rem 0.75rem 2.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.75rem',
      fontSize: '0.875rem',
      outline: 'none'
    },
    searchContainer: {
      position: 'relative' as const,
      flex: 1,
      minWidth: '300px'
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
      borderRadius: '0.5rem',
      background: 'white',
      fontSize: '0.875rem',
      outline: 'none'
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
      gap: '1.5rem'
    },
    card: {
      background: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.2s'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem'
    },
    cardTitle: {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '0.25rem'
    },
    cardSubtitle: {
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    badge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: 600
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
    actionButtons: {
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
    },
    listContainer: {
      background: 'white',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      overflow: 'hidden'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const
    },
    tableHeader: {
      background: '#f8f9fa'
    },
    tableHeaderCell: {
      padding: '1rem',
      textAlign: 'left' as const,
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#374151',
      borderBottom: '2px solid #e5e7eb'
    },
    tableRow: {
      borderBottom: '1px solid #f3f4f6',
      transition: 'background-color 0.2s'
    },
    tableCell: {
      padding: '1rem',
      fontSize: '0.875rem',
      color: '#1f2937'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          <MapPin size={24} />
          Blue Carbon Restoration Sites
        </h1>
        <div style={styles.controls}>
          <button 
            style={{
              ...styles.viewButton,
              background: viewMode === 'grid' ? '#dbeafe' : 'white',
              color: viewMode === 'grid' ? '#1e40af' : '#374151'
            }}
            onClick={() => setViewMode('grid')}
          >
            <Grid size={16} />
            Grid View
          </button>
          <button 
            style={{
              ...styles.viewButton,
              background: viewMode === 'list' ? '#dbeafe' : 'white',
              color: viewMode === 'list' ? '#1e40af' : '#374151'
            }}
            onClick={() => setViewMode('list')}
          >
            <List size={16} />
            List View
          </button>
          <button style={styles.viewButton}>
            <Download size={16} />
            Export Data
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filterSection}>
        <div style={styles.searchContainer}>
          <Search size={16} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search sites, states, or species..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          style={styles.select}
          value={filterEcosystem}
          onChange={(e) => setFilterEcosystem(e.target.value)}
        >
          <option value="All">All Ecosystems</option>
          <option value="Mangrove">Mangrove</option>
          <option value="Seagrass">Seagrass</option>
          <option value="Saltmarsh">Saltmarsh</option>
        </select>
        <select
          style={styles.select}
          value={filterState}
          onChange={(e) => setFilterState(e.target.value)}
        >
          <option value="All">All States</option>
          <option value="West Bengal">West Bengal</option>
          <option value="Kerala">Kerala</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Lakshadweep">Lakshadweep</option>
          <option value="Puducherry">Puducherry</option>
        </select>
        <button style={styles.viewButton}>
          <Filter size={16} />
          More Filters
        </button>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? (
        <div style={styles.gridContainer}>
          {filteredSites.map((site) => {
            const statusStyle = getStatusColor(site.status);
            const ecosystemStyle = getEcosystemColor(site.ecosystemType);
            
            return (
              <div 
                key={site.siteId} 
                style={{
                  ...styles.card,
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div style={styles.cardHeader}>
                  <div>
                    <h3 style={styles.cardTitle}>{site.siteId}</h3>
                    <p style={styles.cardSubtitle}>{site.siteName} • {site.state}</p>
                  </div>
                  <div style={{
                    ...styles.badge,
                    background: statusStyle.bg,
                    color: statusStyle.color
                  }}>
                    {site.status}
                  </div>
                </div>

                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>
                    <MapPin size={14} />
                    Ecosystem
                  </span>
                  <span style={{
                    ...styles.badge,
                    background: ecosystemStyle.bg,
                    color: ecosystemStyle.color
                  }}>
                    {site.ecosystemType}
                  </span>
                </div>

                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>
                    <TrendingUp size={14} />
                    Survival Rate
                  </span>
                  <span style={{
                    ...styles.detailValue,
                    color: site.survivalRate >= 80 ? '#166534' : site.survivalRate >= 60 ? '#92400e' : '#dc2626'
                  }}>
                    {site.survivalRate}%
                  </span>
                </div>

                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Area Restored</span>
                  <span style={styles.detailValue}>{site.areaHa.toFixed(1)} ha</span>
                </div>

                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Carbon Sequestered</span>
                  <span style={styles.detailValue}>{site.carbonSequestered.toLocaleString()} t CO₂e</span>
                </div>

                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>
                    <Calendar size={14} />
                    Last Monitored
                  </span>
                  <span style={styles.detailValue}>{new Date(site.lastMonitored).toLocaleDateString()}</span>
                </div>

                <div style={styles.actionButtons}>
                  <button style={styles.actionButton}>
                    <Eye size={14} />
                    View Details
                  </button>
                  <button style={styles.actionButton}>
                    <Edit size={14} />
                    Edit Site
                  </button>
                  <button style={styles.actionButton}>
                    <FileText size={14} />
                    Report
                  </button>
                  <button style={styles.actionButton}>
                    <RefreshCw size={14} />
                    Update Data
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={styles.listContainer}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>Site ID</th>
                <th style={styles.tableHeaderCell}>Location</th>
                <th style={styles.tableHeaderCell}>Ecosystem</th>
                <th style={styles.tableHeaderCell}>Area (ha)</th>
                <th style={styles.tableHeaderCell}>Survival Rate</th>
                <th style={styles.tableHeaderCell}>Carbon (t CO₂e)</th>
                <th style={styles.tableHeaderCell}>Status</th>
                <th style={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSites.map((site) => {
                const statusStyle = getStatusColor(site.status);
                const ecosystemStyle = getEcosystemColor(site.ecosystemType);
                
                return (
                  <tr 
                    key={site.siteId}
                    style={styles.tableRow}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{...styles.tableCell, fontWeight: 600}}>{site.siteId}</td>
                    <td style={styles.tableCell}>
                      <div>
                        <div style={{ fontWeight: 500 }}>{site.siteName}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{site.state}</div>
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={{
                        ...styles.badge,
                        background: ecosystemStyle.bg,
                        color: ecosystemStyle.color
                      }}>
                        {site.ecosystemType}
                      </span>
                    </td>
                    <td style={styles.tableCell}>{site.areaHa.toFixed(1)}</td>
                    <td style={{
                      ...styles.tableCell,
                      color: site.survivalRate >= 80 ? '#166534' : site.survivalRate >= 60 ? '#92400e' : '#dc2626',
                      fontWeight: 600
                    }}>
                      {site.survivalRate}%
                    </td>
                    <td style={styles.tableCell}>{site.carbonSequestered.toLocaleString()}</td>
                    <td style={styles.tableCell}>
                      <span style={{
                        ...styles.badge,
                        background: statusStyle.bg,
                        color: statusStyle.color
                      }}>
                        {site.status}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button style={{ ...styles.actionButton, padding: '0.25rem 0.5rem' }}>
                          <Eye size={12} />
                        </button>
                        <button style={{ ...styles.actionButton, padding: '0.25rem 0.5rem' }}>
                          <Edit size={12} />
                        </button>
                        <button style={{ ...styles.actionButton, padding: '0.25rem 0.5rem' }}>
                          <FileText size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {filteredSites.length === 0 && (
        <div style={{
          textAlign: 'center' as const,
          padding: '3rem',
          color: '#6b7280'
        }}>
          <AlertCircle size={48} style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>No sites found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default NCCRProjectsPage;
