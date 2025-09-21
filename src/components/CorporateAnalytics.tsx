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
  TrendingUp, 
  TrendingDown, 
  Target, 
  Calendar, 
  Download, 
  Filter,
  Activity,
  BarChart3,
  PieChart as PieIcon,
  Globe,
  Users,
  DollarSign,
  Leaf,
  Award,
  AlertCircle
} from 'lucide-react';

const CorporateAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('12M');
  const [selectedMetric, setSelectedMetric] = useState('carbon');

  // Mock data for charts
  const carbonReductionData = [
    { month: 'Jan', current: 2800, target: 3000, previous: 3200 },
    { month: 'Feb', current: 2600, target: 2900, previous: 3100 },
    { month: 'Mar', current: 2400, target: 2800, previous: 3000 },
    { month: 'Apr', current: 2200, target: 2700, previous: 2900 },
    { month: 'May', current: 2000, target: 2600, previous: 2800 },
    { month: 'Jun', current: 1800, target: 2500, previous: 2700 },
    { month: 'Jul', current: 1600, target: 2400, previous: 2600 },
    { month: 'Aug', current: 1500, target: 2300, previous: 2500 },
    { month: 'Sep', current: 1400, target: 2200, previous: 2400 },
    { month: 'Oct', current: 1300, target: 2100, previous: 2300 },
    { month: 'Nov', current: 1200, target: 2000, previous: 2200 },
    { month: 'Dec', current: 1100, target: 1900, previous: 2100 }
  ];

  const portfolioData = [
    { name: 'Blue Carbon', value: 45, amount: 1875, color: '#3b82f6' },
    { name: 'Forest Conservation', value: 30, amount: 1250, color: '#10b981' },
    { name: 'Renewable Energy', value: 15, amount: 625, color: '#f59e0b' },
    { name: 'Waste Management', value: 10, amount: 417, color: '#ef4444' }
  ];

  const esgScoreData = [
    { category: 'Environmental', score: 85, target: 90 },
    { category: 'Social', score: 78, target: 85 },
    { category: 'Governance', score: 92, target: 95 }
  ];

  const impactMetrics = [
    {
      title: 'CO₂ Reduced',
      value: '42,350',
      unit: 'tons',
      change: '+12.5%',
      trending: 'up',
      icon: <Leaf size={24} />,
      color: '#10b981'
    },
    {
      title: 'Credits Purchased',
      value: '4,167',
      unit: 'credits',
      change: '+8.3%',
      trending: 'up',
      icon: <Award size={24} />,
      color: '#3b82f6'
    },
    {
      title: 'Total Investment',
      value: '$387,250',
      unit: '',
      change: '+15.2%',
      trending: 'up',
      icon: <DollarSign size={24} />,
      color: '#f59e0b'
    },
    {
      title: 'ESG Score',
      value: '85',
      unit: '/100',
      change: '+3.2%',
      trending: 'up',
      icon: <BarChart3 size={24} />,
      color: '#8b5cf6'
    }
  ];

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
    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    metricCard: {
      background: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    },
    metricHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    metricIcon: {
      padding: '0.75rem',
      borderRadius: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    metricValue: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1f2937',
      marginBottom: '0.25rem'
    },
    metricLabel: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '0.5rem'
    },
    metricChange: {
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
    esgGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginTop: '1rem'
    },
    esgCard: {
      background: '#f8f9fa',
      borderRadius: '0.75rem',
      padding: '1rem',
      textAlign: 'center' as const
    },
    esgScore: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1f2937',
      marginBottom: '0.25rem'
    },
    esgLabel: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '0.5rem'
    },
    progressBar: {
      width: '100%',
      height: '8px',
      background: '#e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          <Activity size={28} />
          ESG & Sustainability Analytics
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
          <select 
            style={styles.select}
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
          >
            <option value="carbon">Carbon Metrics</option>
            <option value="esg">ESG Scores</option>
            <option value="financial">Financial Impact</option>
          </select>
          <button style={styles.button}>
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div style={styles.metricsGrid}>
        {impactMetrics.map((metric, index) => (
          <div key={index} style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <div style={{
                ...styles.metricIcon,
                background: metric.color + '20',
                color: metric.color
              }}>
                {metric.icon}
              </div>
              <div style={{
                ...styles.metricChange,
                color: metric.trending === 'up' ? '#10b981' : '#ef4444'
              }}>
                {metric.trending === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {metric.change}
              </div>
            </div>
            <div style={styles.metricValue}>
              {metric.value}
              <span style={{ fontSize: '1rem', fontWeight: 400, color: '#6b7280' }}>
                {metric.unit}
              </span>
            </div>
            <div style={styles.metricLabel}>{metric.title}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div style={styles.chartsGrid}>
        {/* Carbon Reduction Trend */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>
            <TrendingDown size={20} />
            Carbon Footprint Reduction
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={carbonReductionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="current" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Current Year (tCO₂e)"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#10b981" 
                strokeDasharray="5 5"
                name="Target (tCO₂e)"
              />
              <Line 
                type="monotone" 
                dataKey="previous" 
                stroke="#94a3b8" 
                strokeWidth={2}
                name="Previous Year (tCO₂e)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Credit Portfolio Distribution */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>
            <PieIcon size={20} />
            Carbon Credit Portfolio
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={portfolioData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {portfolioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}%`, name]} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ marginTop: '1rem' }}>
            {portfolioData.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem 0',
                borderBottom: index < portfolioData.length - 1 ? '1px solid #f3f4f6' : 'none'
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

      {/* ESG Score Dashboard */}
      <div style={styles.chartCard}>
        <h3 style={styles.chartTitle}>
          <BarChart3 size={20} />
          ESG Performance Dashboard
        </h3>
        <div style={styles.esgGrid}>
          {esgScoreData.map((item, index) => (
            <div key={index} style={styles.esgCard}>
              <div style={styles.esgScore}>{item.score}</div>
              <div style={styles.esgLabel}>{item.category}</div>
              <div style={styles.progressBar}>
                <div style={{
                  width: `${(item.score / 100) * 100}%`,
                  height: '100%',
                  background: item.score >= item.target ? '#10b981' : 
                             item.score >= item.target - 10 ? '#f59e0b' : '#ef4444',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease'
                }}></div>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                Target: {item.target}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed ESG Metrics */}
        <div style={{ marginTop: '2rem' }}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={esgScoreData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#3b82f6" name="Current Score" />
              <Bar dataKey="target" fill="#10b981" name="Target Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Impact Summary */}
      <div style={{
        ...styles.chartCard,
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        color: 'white',
        marginTop: '2rem'
      }}>
        <h3 style={{...styles.chartTitle, color: 'white'}}>
          <Globe size={20} />
          Sustainability Impact Summary
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginTop: '1.5rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>42.4k</div>
            <div style={{ opacity: 0.9 }}>Tons CO₂ Offset</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>127</div>
            <div style={{ opacity: 0.9 }}>Hectares Restored</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>8.2k</div>
            <div style={{ opacity: 0.9 }}>Trees Planted</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>15</div>
            <div style={{ opacity: 0.9 }}>Communities Supported</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateAnalytics;
