import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Briefcase, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Filter,
  Plus,
  Minus,
  RotateCcw,
  Calendar,
  DollarSign,
  Activity,
  Target,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  Leaf,
  BarChart3,
  PieChart as PieIcon,
  FileText,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

interface PortfolioItem {
  id: string;
  projectName: string;
  projectType: 'Blue Carbon' | 'Forest Conservation' | 'Renewable Energy' | 'Waste Management';
  creditsOwned: number;
  creditsRetired: number;
  purchasePrice: number;
  currentValue: number;
  purchaseDate: string;
  vintage: number;
  verificationStandard: string;
  status: 'Active' | 'Retired' | 'Pending';
  roi: number;
  carbonOffset: number;
  expiryDate: string;
}

const CorporatePortfolioManagement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('12M');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showRetireModal, setShowRetireModal] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState<string | null>(null);

  // Mock portfolio data
  const portfolioItems: PortfolioItem[] = [
    {
      id: 'PF-001',
      projectName: 'Sundarbans Mangrove Restoration',
      projectType: 'Blue Carbon',
      creditsOwned: 1000,
      creditsRetired: 300,
      purchasePrice: 25000,
      currentValue: 28000,
      purchaseDate: '2023-01-15',
      vintage: 2023,
      verificationStandard: 'VCS + CCB',
      status: 'Active',
      roi: 12.0,
      carbonOffset: 300,
      expiryDate: '2030-12-31'
    },
    {
      id: 'PF-002',
      projectName: 'Kerala Seagrass Conservation',
      projectType: 'Blue Carbon',
      creditsOwned: 750,
      creditsRetired: 750,
      purchasePrice: 22500,
      currentValue: 24000,
      purchaseDate: '2023-03-20',
      vintage: 2024,
      verificationStandard: 'Gold Standard',
      status: 'Retired',
      roi: 6.7,
      carbonOffset: 750,
      expiryDate: '2031-12-31'
    },
    {
      id: 'PF-003',
      projectName: 'Amazon Rainforest Protection',
      projectType: 'Forest Conservation',
      creditsOwned: 2000,
      creditsRetired: 500,
      purchasePrice: 44000,
      currentValue: 48000,
      purchaseDate: '2023-06-10',
      vintage: 2023,
      verificationStandard: 'VCS + CCBA',
      status: 'Active',
      roi: 9.1,
      carbonOffset: 500,
      expiryDate: '2030-12-31'
    },
    {
      id: 'PF-004',
      projectName: 'Solar Farm Development',
      projectType: 'Renewable Energy',
      creditsOwned: 500,
      creditsRetired: 0,
      purchasePrice: 15000,
      currentValue: 16500,
      purchaseDate: '2024-01-05',
      vintage: 2024,
      verificationStandard: 'Gold Standard',
      status: 'Active',
      roi: 10.0,
      carbonOffset: 0,
      expiryDate: '2031-12-31'
    }
  ];

  // Portfolio performance data
  const performanceData = [
    { month: 'Jan', value: 25000, credits: 1000, retired: 0 },
    { month: 'Feb', value: 26000, credits: 1000, retired: 100 },
    { month: 'Mar', value: 48500, credits: 1750, retired: 200 },
    { month: 'Apr', value: 50000, credits: 1750, retired: 300 },
    { month: 'May', value: 52000, credits: 1750, retired: 450 },
    { month: 'Jun', value: 92000, credits: 3750, retired: 500 },
    { month: 'Jul', value: 94000, credits: 3750, retired: 650 },
    { month: 'Aug', value: 96000, credits: 3750, retired: 800 },
    { month: 'Sep', value: 98000, credits: 3750, retired: 950 },
    { month: 'Oct', value: 100000, credits: 3750, retired: 1100 },
    { month: 'Nov', value: 102000, credits: 3750, retired: 1250 },
    { month: 'Dec', value: 116500, credits: 4250, retired: 1550 }
  ];

  const typeDistribution = [
    { name: 'Blue Carbon', value: 47, amount: 1750, color: '#3b82f6' },
    { name: 'Forest Conservation', value: 35, amount: 1500, color: '#10b981' },
    { name: 'Renewable Energy', value: 12, amount: 500, color: '#f59e0b' },
    { name: 'Waste Management', value: 6, amount: 250, color: '#8b5cf6' }
  ];

  const filteredPortfolio = portfolioItems.filter(item => 
    filterStatus === 'All' || item.status === filterStatus
  );

  const totalValue = portfolioItems.reduce((sum, item) => sum + item.currentValue, 0);
  const totalInvestment = portfolioItems.reduce((sum, item) => sum + item.purchasePrice, 0);
  const totalCredits = portfolioItems.reduce((sum, item) => sum + item.creditsOwned, 0);
  const totalRetired = portfolioItems.reduce((sum, item) => sum + item.creditsRetired, 0);
  const totalROI = ((totalValue - totalInvestment) / totalInvestment) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return '#10b981';
      case 'Retired': return '#6b7280';
      case 'Pending': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getProjectTypeColor = (type: string) => {
    switch (type) {
      case 'Blue Carbon': return '#3b82f6';
      case 'Forest Conservation': return '#10b981';
      case 'Renewable Energy': return '#f59e0b';
      case 'Waste Management': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const styles = {
    container: {
      padding: '2rem',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
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
    select: {
      padding: '0.5rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      background: 'white',
      fontSize: '0.875rem',
      outline: 'none'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      background: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    summaryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    summaryCard: {
      background: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    },
    summaryValue: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1f2937',
      marginBottom: '0.25rem'
    },
    summaryLabel: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '0.5rem'
    },
    summaryChange: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontSize: '0.875rem',
      fontWeight: 600
    },
    chartsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
      gap: '2rem',
      marginBottom: '2rem'
    },
    chartCard: {
      background: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    },
    chartTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    portfolioTable: {
      background: 'white',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      overflow: 'hidden'
    },
    tableHeader: {
      background: '#f8f9fa',
      padding: '1.5rem',
      borderBottom: '1px solid #e5e7eb'
    },
    tableTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '1rem'
    },
    filterRow: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const
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
    },
    badge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: 600,
      color: 'white'
    },
    actionButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      padding: '0.25rem 0.5rem',
      background: 'white',
      color: '#374151',
      border: '1px solid #d1d5db',
      borderRadius: '0.25rem',
      fontSize: '0.75rem',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    modal: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modalContent: {
      background: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      maxWidth: '500px',
      width: '90%'
    }
  };

  const RetireCreditsModal = () => (
    showRetireModal && (
      <div style={styles.modal} onClick={() => setShowRetireModal(false)}>
        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
            Retire Carbon Credits
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            Retiring credits permanently removes them from your portfolio for offsetting purposes.
          </p>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Number of Credits to Retire
            </label>
            <input 
              type="number" 
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                outline: 'none'
              }}
              placeholder="Enter amount"
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Retirement Reason
            </label>
            <select style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              outline: 'none'
            }}>
              <option>Scope 1 Emissions Offset</option>
              <option>Scope 2 Emissions Offset</option>
              <option>Scope 3 Emissions Offset</option>
              <option>Voluntary Offset</option>
              <option>Product Carbon Neutral</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button 
              style={{
                padding: '0.75rem 1.5rem',
                background: 'white',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                cursor: 'pointer'
              }}
              onClick={() => setShowRetireModal(false)}
            >
              Cancel
            </button>
            <button 
              style={{
                padding: '0.75rem 1.5rem',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer'
              }}
              onClick={() => {
                setShowRetireModal(false);
                alert('Credits retired successfully!');
              }}
            >
              Retire Credits
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          <Briefcase size={28} />
          Portfolio Management
        </h1>
        <div style={styles.controls}>
          <select 
            style={styles.select}
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="1M">Last Month</option>
            <option value="3M">Last 3 Months</option>
            <option value="6M">Last 6 Months</option>
            <option value="12M">Last 12 Months</option>
          </select>
          <button style={styles.button}>
            <Download size={16} />
            Export Portfolio
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={styles.summaryGrid}>
        <div style={styles.summaryCard}>
          <div style={styles.summaryValue}>${totalValue.toLocaleString()}</div>
          <div style={styles.summaryLabel}>Total Portfolio Value</div>
          <div style={{
            ...styles.summaryChange,
            color: totalROI >= 0 ? '#10b981' : '#ef4444'
          }}>
            {totalROI >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {totalROI.toFixed(1)}% ROI
          </div>
        </div>
        
        <div style={styles.summaryCard}>
          <div style={styles.summaryValue}>{totalCredits.toLocaleString()}</div>
          <div style={styles.summaryLabel}>Total Credits Owned</div>
          <div style={styles.summaryChange}>
            <Activity size={16} color="#3b82f6" />
            {totalCredits - totalRetired} Active
          </div>
        </div>
        
        <div style={styles.summaryCard}>
          <div style={styles.summaryValue}>{totalRetired.toLocaleString()}</div>
          <div style={styles.summaryLabel}>Credits Retired</div>
          <div style={styles.summaryChange}>
            <Target size={16} color="#10b981" />
            {totalRetired} tCO₂e Offset
          </div>
        </div>
        
        <div style={styles.summaryCard}>
          <div style={styles.summaryValue}>{portfolioItems.length}</div>
          <div style={styles.summaryLabel}>Active Projects</div>
          <div style={styles.summaryChange}>
            <Award size={16} color="#f59e0b" />
            4 Standards
          </div>
        </div>
      </div>

      {/* Charts */}
      <div style={styles.chartsGrid}>
        {/* Portfolio Performance */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>
            <BarChart3 size={20} />
            Portfolio Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio Value']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Portfolio Value ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Type Distribution */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>
            <PieIcon size={20} />
            Portfolio Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {typeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}%`, name]} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ marginTop: '1rem' }}>
            {typeDistribution.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem 0',
                borderBottom: index < typeDistribution.length - 1 ? '1px solid #f3f4f6' : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: item.color
                  }}></div>
                  <span style={{ fontSize: '0.875rem', color: '#374151' }}>{item.name}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{item.amount} credits</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{item.value}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Table */}
      <div style={styles.portfolioTable}>
        <div style={styles.tableHeader}>
          <h3 style={styles.tableTitle}>Portfolio Holdings</h3>
          <div style={styles.filterRow}>
            <select
              style={styles.select}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Retired">Retired</option>
              <option value="Pending">Pending</option>
            </select>
            <button style={styles.button}>
              <Filter size={16} />
              More Filters
            </button>
          </div>
        </div>
        
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeaderCell}>Project</th>
              <th style={styles.tableHeaderCell}>Type</th>
              <th style={styles.tableHeaderCell}>Credits</th>
              <th style={styles.tableHeaderCell}>Value</th>
              <th style={styles.tableHeaderCell}>ROI</th>
              <th style={styles.tableHeaderCell}>Status</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPortfolio.map((item) => (
              <tr 
                key={item.id}
                style={styles.tableRow}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <td style={styles.tableCell}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                      {item.projectName}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {item.verificationStandard} • Vintage {item.vintage}
                    </div>
                  </div>
                </td>
                <td style={styles.tableCell}>
                  <span style={{
                    ...styles.badge,
                    background: getProjectTypeColor(item.projectType)
                  }}>
                    {item.projectType}
                  </span>
                </td>
                <td style={styles.tableCell}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.creditsOwned.toLocaleString()}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {item.creditsRetired} retired
                    </div>
                  </div>
                </td>
                <td style={styles.tableCell}>
                  <div>
                    <div style={{ fontWeight: 600 }}>${item.currentValue.toLocaleString()}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      Cost: ${item.purchasePrice.toLocaleString()}
                    </div>
                  </div>
                </td>
                <td style={{
                  ...styles.tableCell,
                  color: item.roi >= 0 ? '#10b981' : '#ef4444',
                  fontWeight: 600
                }}>
                  {item.roi >= 0 ? '+' : ''}{item.roi.toFixed(1)}%
                </td>
                <td style={styles.tableCell}>
                  <span style={{
                    ...styles.badge,
                    background: getStatusColor(item.status)
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={styles.tableCell}>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <button style={styles.actionButton}>
                      <Eye size={12} />
                      View
                    </button>
                    {item.status === 'Active' && (
                      <button 
                        style={styles.actionButton}
                        onClick={() => {
                          setSelectedCredit(item.id);
                          setShowRetireModal(true);
                        }}
                      >
                        <RotateCcw size={12} />
                        Retire
                      </button>
                    )}
                    <button style={styles.actionButton}>
                      <FileText size={12} />
                      Report
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RetireCreditsModal />
    </div>
  );
};

export default CorporatePortfolioManagement;
