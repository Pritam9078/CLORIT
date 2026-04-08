import React, { useState } from "react";
import { CurrencyUtils } from "../utils/currency";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar, CartesianGrid, AreaChart, Area
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Download, FileText, Calendar, TrendingUp, DollarSign, CheckCircle,
  AlertTriangle, Users, Leaf, BarChart3, Filter, RefreshCw
} from "lucide-react";

const AdminReporting: React.FC = () => {
  const [dateRange, setDateRange] = useState<string>("last-30-days");
  const [reportType, setReportType] = useState<string>("impact");
  const [exportFormat, setExportFormat] = useState<string>("pdf");

  // Enhanced data
  const co2TrendData = [
    { month: "Jan", co2: 800, target: 750 },
    { month: "Feb", co2: 1200, target: 1100 },
    { month: "Mar", co2: 1600, target: 1500 },
    { month: "Apr", co2: 2000, target: 1900 },
    { month: "May", co2: 2400, target: 2300 },
    { month: "Jun", co2: 2800, target: 2700 },
    { month: "Jul", co2: 3000, target: 3100 },
    { month: "Aug", co2: 3200, target: 3500 },
  ];

  const geographicData = [
    { state: "West Bengal", projects: 3, carbon: 24624 },
    { state: "Kerala", projects: 1, carbon: 6243 },
    { state: "Andhra Pradesh", projects: 2, carbon: 14868 },
    { state: "Lakshadweep", projects: 3, carbon: 26238 },
    { state: "Puducherry", projects: 1, carbon: 11917 }
  ];

  const ecosystemData = [
    { name: "Mangrove", value: 45, projects: 5 },
    { name: "Seagrass", value: 25, projects: 2 },
    { name: "Saltmarsh", value: 30, projects: 3 }
  ];

  const financialData = [
    { month: "Jan", revenue: 45000, fees: 5000 },
    { month: "Feb", revenue: 62000, fees: 7200 },
    { month: "Mar", revenue: 58000, fees: 6800 },
    { month: "Apr", revenue: 75000, fees: 8500 },
    { month: "May", revenue: 82000, fees: 9200 },
    { month: "Jun", revenue: 95000, fees: 10500 }
  ];

  const pieColors = ["#10b981", "#3b82f6", "#f59e0b"];

  const handleGenerateReport = () => {
    console.log(`Generating ${reportType} report for ${dateRange} in ${exportFormat} format`);
    alert(`Report generated! Format: ${exportFormat.toUpperCase()}`);
  };

  const handleExport = (format: string) => {
    console.log(`Exporting data in ${format} format`);
    alert(`Exporting data as ${format.toUpperCase()}...`);
  };

  return (
    <div style={{ padding: '0 2rem 2rem 2rem', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Header with Report Controls */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#0077B6', marginBottom: '0.5rem' }}>
            Impact Visualization & Reporting
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            Comprehensive analytics, compliance tracking, and export capabilities
          </p>

          {/* Report Controls */}
          <div style={{
            background: 'white', borderRadius: '1rem', padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb',
            display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center'
          }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>
                Date Range
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                style={{
                  width: '100%', padding: '0.5rem', border: '1px solid #d1d5db',
                  borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none'
                }}
              >
                <option value="last-7-days">Last 7 Days</option>
                <option value="last-30-days">Last 30 Days</option>
                <option value="last-90-days">Last 90 Days</option>
                <option value="last-year">Last Year</option>
                <option value="all-time">All Time</option>
              </select>
            </div>

            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                style={{
                  width: '100%', padding: '0.5rem', border: '1px solid #d1d5db',
                  borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none'
                }}
              >
                <option value="impact">Impact Report</option>
                <option value="financial">Financial Report</option>
                <option value="compliance">Compliance Report</option>
                <option value="audit">Audit Report</option>
              </select>
            </div>

            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>
                Export Format
              </label>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                style={{
                  width: '100%', padding: '0.5rem', border: '1px solid #d1d5db',
                  borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none'
                }}
              >
                <option value="pdf">PDF</option>
                <option value="csv">CSV</option>
                <option value="excel">Excel</option>
                <option value="json">JSON</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
              <button
                onClick={handleGenerateReport}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem',
                  background: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.5rem',
                  cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500
                }}
              >
                <FileText size={16} /> Generate
              </button>
              <button
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1rem',
                  background: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '0.5rem',
                  cursor: 'pointer', fontSize: '0.875rem'
                }}
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Summary Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Carbon', value: '83,122 t', icon: Leaf, color: '#10b981', change: '+12.5%' },
            { label: 'Platform Revenue', value: '₹5.2M', icon: DollarSign, color: '#3b82f6', change: '+8.3%' },
            { label: 'Verified Projects', value: '8', icon: CheckCircle, color: '#8b5cf6', change: '+2' },
            { label: 'Compliance Score', value: '98%', icon: BarChart3, color: '#10b981', change: '+2%' },
            { label: 'At Risk', value: '2', icon: AlertTriangle, color: '#dc2626', change: '-1' },
            { label: 'Active Users', value: '847', icon: Users, color: '#f59e0b', change: '+23' }
          ].map((metric, idx) => (
            <div key={idx} style={{
              background: 'white', borderRadius: '1rem', padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <metric.icon size={24} style={{ color: metric.color, opacity: 0.7 }} />
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>{metric.change}</span>
              </div>
              <p style={{ fontSize: '1.875rem', fontWeight: 700, color: '#1f2937', margin: '0.25rem 0' }}>{metric.value}</p>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500, margin: 0 }}>{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Reports & Scheduled Reports */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          {/* Quick Report Templates */}
          <div style={{
            background: 'white', borderRadius: '1rem', padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937', marginBottom: '1rem' }}>
              Quick Report Templates
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { name: 'Compliance Report', desc: 'Regulatory requirements', color: '#10b981' },
                { name: 'Financial Summary', desc: 'Revenue & transactions', color: '#3b82f6' },
                { name: 'Impact Analysis', desc: 'Carbon & environmental', color: '#8b5cf6' },
                { name: 'Audit Trail', desc: 'Admin actions log', color: '#f59e0b' }
              ].map((template, idx) => (
                <button
                  key={idx}
                  onClick={() => handleExport('pdf')}
                  style={{
                    padding: '1rem', background: '#f9fafb', border: '1px solid #e5e7eb',
                    borderRadius: '0.75rem', cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = template.color;
                    e.currentTarget.style.background = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.background = '#f9fafb';
                  }}
                >
                  <div style={{ fontWeight: 600, color: '#1f2937', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                    {template.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{template.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Scheduled Reports */}
          <div style={{
            background: 'white', borderRadius: '1rem', padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937', marginBottom: '1rem' }}>
              Scheduled Reports
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { name: 'Monthly Impact', schedule: 'Every 1st' },
                { name: 'Quarterly Compliance', schedule: 'Every quarter' },
                { name: 'Weekly Summary', schedule: 'Every Monday' }
              ].map((report, idx) => (
                <div key={idx} style={{
                  padding: '0.75rem', background: '#f9fafb', borderRadius: '0.5rem',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1f2937', marginBottom: '0.25rem' }}>
                    {report.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{report.schedule}</div>
                </div>
              ))}
              <button style={{
                padding: '0.5rem', background: '#3b82f6', color: 'white',
                border: 'none', borderRadius: '0.5rem', fontSize: '0.75rem',
                cursor: 'pointer', fontWeight: 500
              }}>
                + Add Schedule
              </button>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          {/* CO2 Trend with Target */}
          <div style={{
            background: 'white', borderRadius: '1rem', padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>
              CO₂ Sequestration Trend
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem' }}>
              Actual vs Target (tonnes CO₂e)
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={co2TrendData}>
                <defs>
                  <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" style={{ fontSize: '0.75rem' }} />
                <YAxis stroke="#666" style={{ fontSize: '0.75rem' }} />
                <Tooltip />
                <Area type="monotone" dataKey="co2" stroke="#10b981" fillOpacity={1} fill="url(#colorCo2)" strokeWidth={2} />
                <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeDasharray="5 5" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Geographic Distribution */}
          <div style={{
            background: 'white', borderRadius: '1rem', padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>
              Geographic Distribution
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem' }}>
              Carbon sequestered by state
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={geographicData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="state" stroke="#666" style={{ fontSize: '0.65rem' }} angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#666" style={{ fontSize: '0.75rem' }} />
                <Tooltip />
                <Bar dataKey="carbon" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Ecosystem Distribution */}
          <div style={{
            background: 'white', borderRadius: '1rem', padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>
              Ecosystem Distribution
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem' }}>
              Projects by ecosystem type
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={ecosystemData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  label
                >
                  {ecosystemData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Financial Metrics */}
          <div style={{
            background: 'white', borderRadius: '1rem', padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>
              Financial Performance
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem' }}>
              Revenue & platform fees
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" style={{ fontSize: '0.75rem' }} />
                <YAxis stroke="#666" style={{ fontSize: '0.75rem' }} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="fees" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Tables */}
        <div style={{
          background: 'white', borderRadius: '1rem', padding: '1.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.25rem' }}>
                Detailed Project Performance
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                Comprehensive data for all registered projects
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => handleExport('csv')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem',
                  background: 'white', border: '1px solid #d1d5db', borderRadius: '0.5rem',
                  cursor: 'pointer', fontSize: '0.875rem'
                }}
              >
                <Download size={14} /> CSV
              </button>
              <button
                onClick={() => handleExport('excel')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem',
                  background: 'white', border: '1px solid #d1d5db', borderRadius: '0.5rem',
                  cursor: 'pointer', fontSize: '0.875rem'
                }}
              >
                <Download size={14} /> Excel
              </button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Ecosystem</TableHead>
                <TableHead>Area (ha)</TableHead>
                <TableHead>CO₂ Offset</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Credits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: "Sundarban Mangrove", state: "West Bengal", ecosystem: "Mangrove", area: "97.95", co2: "21,129", status: "Verified", credits: "2,500" },
                { name: "Kerala Backwater", state: "Kerala", ecosystem: "Seagrass", area: "49.16", co2: "6,243", status: "Active", credits: "700" },
                { name: "Andhra Coastal", state: "Andhra Pradesh", ecosystem: "Mangrove", area: "104.75", co2: "11,390", status: "Verified", credits: "1,800" },
                { name: "Lakshadweep Saltmarsh", state: "Lakshadweep", ecosystem: "Saltmarsh", area: "109.96", co2: "8,807", status: "Active", credits: "1,200" }
              ].map((project, index) => (
                <TableRow key={index}>
                  <TableCell style={{ fontWeight: 500 }}>{project.name}</TableCell>
                  <TableCell>{project.state}</TableCell>
                  <TableCell>
                    <span style={{
                      padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem',
                      background: project.ecosystem === 'Mangrove' ? '#dcfce7' : project.ecosystem === 'Seagrass' ? '#dbeafe' : '#fef3c7',
                      color: project.ecosystem === 'Mangrove' ? '#166534' : project.ecosystem === 'Seagrass' ? '#1e40af' : '#92400e'
                    }}>
                      {project.ecosystem}
                    </span>
                  </TableCell>
                  <TableCell>{project.area}</TableCell>
                  <TableCell>{project.co2} t</TableCell>
                  <TableCell>
                    <span style={{
                      padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem',
                      background: project.status === 'Verified' ? '#dcfce7' : '#fef3c7',
                      color: project.status === 'Verified' ? '#166534' : '#92400e'
                    }}>
                      {project.status}
                    </span>
                  </TableCell>
                  <TableCell>{project.credits} CCTs</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Export Actions */}
        <div style={{
          background: 'white', borderRadius: '1rem', padding: '1.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb',
          display: 'flex', gap: '1rem', justifyContent: 'center'
        }}>
          <button
            onClick={() => handleExport('pdf')}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem',
              background: '#dc2626', color: 'white', border: 'none', borderRadius: '0.5rem',
              cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500
            }}
          >
            <Download size={16} /> Export as PDF
          </button>
          <button
            onClick={() => handleExport('excel')}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem',
              background: '#10b981', color: 'white', border: 'none', borderRadius: '0.5rem',
              cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500
            }}
          >
            <Download size={16} /> Export as Excel
          </button>
          <button
            onClick={() => handleExport('csv')}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem',
              background: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.5rem',
              cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500
            }}
          >
            <Download size={16} /> Export as CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminReporting;
