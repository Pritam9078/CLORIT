import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Users, Award, FileText } from "lucide-react";

// Sample Data
const approvalTrends = [
  { month: "Jan", approved: 5, rejected: 2 },
  { month: "Feb", approved: 8, rejected: 1 },
  { month: "Mar", approved: 12, rejected: 3 },
  { month: "Apr", approved: 9, rejected: 4 },
  { month: "May", approved: 15, rejected: 2 },
  { month: "Jun", approved: 18, rejected: 3 },
];

const creditDistribution = [
  { name: "Maharashtra", value: 400 },
  { name: "Gujarat", value: 300 },
  { name: "Tamil Nadu", value: 200 },
  { name: "Karnataka", value: 150 },
  { name: "Odisha", value: 100 },
];

const COLORS = ["#16a34a", "#3b82f6", "#f97316", "#dc2626", "#8b5cf6"];

const GovernmentAnalytics: React.FC = () => {
  const totalApproved = approvalTrends.reduce((sum, item) => sum + item.approved, 0);
  const totalRejected = approvalTrends.reduce((sum, item) => sum + item.rejected, 0);
  const totalCredits = creditDistribution.reduce((sum, item) => sum + item.value, 0);
  const approvalRate = ((totalApproved / (totalApproved + totalRejected)) * 100).toFixed(1);

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#166534',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <BarChart3 size={20} style={{ color: '#15803d' }} />
        Government Analytics Dashboard
      </h2>

      {/* Key Metrics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.5rem'
          }}>
            <h3 style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>
              Total Projects
            </h3>
            <FileText size={20} style={{ color: '#3b82f6' }} />
          </div>
          <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>
            {totalApproved + totalRejected}
          </p>
          <p style={{ fontSize: '0.75rem', color: '#10b981' }}>
            ↗ +12% from last month
          </p>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.5rem'
          }}>
            <h3 style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>
              Approval Rate
            </h3>
            <TrendingUp size={20} style={{ color: '#10b981' }} />
          </div>
          <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>
            {approvalRate}%
          </p>
          <p style={{ fontSize: '0.75rem', color: '#10b981' }}>
            ↗ +5.2% from last month
          </p>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.5rem'
          }}>
            <h3 style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>
              Carbon Credits
            </h3>
            <Award size={20} style={{ color: '#f59e0b' }} />
          </div>
          <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>
            {totalCredits.toLocaleString()}
          </p>
          <p style={{ fontSize: '0.75rem', color: '#10b981' }}>
            ↗ +23% from last month
          </p>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.5rem'
          }}>
            <h3 style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>
              Active States
            </h3>
            <Users size={20} style={{ color: '#8b5cf6' }} />
          </div>
          <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>
            {creditDistribution.length}
          </p>
          <p style={{ fontSize: '0.75rem', color: '#10b981' }}>
            +2 new states joined
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Project Approval Trends */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#374151'
          }}>
            <BarChart3 size={18} style={{ color: '#059669' }} />
            Project Approval Trends
          </h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={approvalTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickLine={{ stroke: '#d1d5db' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickLine={{ stroke: '#d1d5db' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="approved" fill="#16a34a" name="Approved" radius={[2, 2, 0, 0]} />
                <Bar dataKey="rejected" fill="#dc2626" name="Rejected" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Credits Distribution */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#374151'
          }}>
            <PieChartIcon size={18} style={{ color: '#2563eb' }} />
            Carbon Credits by State
          </h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={creditDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {creditDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div style={{
        padding: '1.5rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '0.75rem',
        border: '1px solid #e5e7eb'
      }}>
        <h4 style={{
          fontSize: '1rem',
          fontWeight: '600',
          marginBottom: '1rem',
          color: '#374151'
        }}>
          Key Insights
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{
            padding: '1rem',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb'
          }}>
            <h5 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#059669', marginBottom: '0.5rem' }}>
              🎯 High Performance
            </h5>
            <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              Maharashtra leads with 400 carbon credits, showing excellent project implementation.
            </p>
          </div>
          <div style={{
            padding: '1rem',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb'
          }}>
            <h5 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#2563eb', marginBottom: '0.5rem' }}>
              📈 Growing Trend
            </h5>
            <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              Project approvals increased 23% this quarter, indicating strong environmental focus.
            </p>
          </div>
          <div style={{
            padding: '1rem',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb'
          }}>
            <h5 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#f59e0b', marginBottom: '0.5rem' }}>
              🔍 Areas for Improvement
            </h5>
            <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              Focus on supporting lower-performing states to achieve balanced national growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentAnalytics;
