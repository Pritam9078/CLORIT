import React, { useState } from 'react';
import SatelliteGlobe3D from './SatelliteGlobe3D';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area, BarChart, Bar, Legend
} from 'recharts';
import {
    Satellite, MapPin, TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
    Download, RefreshCw, Bell, Settings, Eye, Filter, Calendar
} from 'lucide-react';

interface Project {
    id: string;
    name: string;
    state: string;
    ndvi: number;
    lastScan: string;
    trend: 'up' | 'down' | 'stable';
    healthScore: number;
    area: number;
    lat: number;
    lon: number;
}

interface NDVIAlert {
    id: number;
    project: string;
    type: 'degradation' | 'recovery' | 'threshold';
    message: string;
    timestamp: string;
    severity: 'critical' | 'warning' | 'info';
}

const AdminNDVIMonitoring: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<string>('all');
    const [dateRange, setDateRange] = useState<string>('last-30-days');
    const [showAlerts, setShowAlerts] = useState<boolean>(true);
    const [thresholdValue, setThresholdValue] = useState<number>(0.5);

    // Sample project data
    const projects: Project[] = [
        { id: 'CLORIT-2001', name: 'Sundarban Mangrove', state: 'West Bengal', ndvi: 0.65, lastScan: '2024-12-28', trend: 'up', healthScore: 82, area: 97.95, lat: 21.95, lon: 88.88 },
        { id: 'CLORIT-2002', name: 'Kerala Backwater', state: 'Kerala', ndvi: 0.72, lastScan: '2024-12-27', trend: 'up', healthScore: 90, area: 49.16, lat: 9.93, lon: 76.27 },
        { id: 'CLORIT-2003', name: 'Andhra Coastal', state: 'Andhra Pradesh', ndvi: 0.58, lastScan: '2024-12-28', trend: 'stable', healthScore: 75, area: 104.75, lat: 15.91, lon: 80.33 },
        { id: 'CLORIT-2004', name: 'Puducherry Seagrass', state: 'Puducherry', ndvi: 0.42, lastScan: '2024-12-26', trend: 'down', healthScore: 55, area: 106.94, lat: 11.93, lon: 79.83 },
        { id: 'CLORIT-2005', name: 'Lakshadweep Saltmarsh', state: 'Lakshadweep', ndvi: 0.78, lastScan: '2024-12-28', trend: 'up', healthScore: 95, area: 109.96, lat: 10.57, lon: 72.64 },
        { id: 'CLORIT-2006', name: 'Tamil Nadu Mangrove', state: 'Tamil Nadu', ndvi: 0.68, lastScan: '2024-12-27', trend: 'up', healthScore: 85, area: 65.5, lat: 11.13, lon: 79.83 }
    ];

    // Historical NDVI data
    const ndviTrendData = [
        { month: 'Jul', ndvi: 0.52, threshold: 0.5 },
        { month: 'Aug', ndvi: 0.55, threshold: 0.5 },
        { month: 'Sep', ndvi: 0.58, threshold: 0.5 },
        { month: 'Oct', ndvi: 0.61, threshold: 0.5 },
        { month: 'Nov', ndvi: 0.64, threshold: 0.5 },
        { month: 'Dec', ndvi: 0.67, threshold: 0.5 }
    ];

    // Regional comparison data
    const regionalData = [
        { state: 'West Bengal', ndvi: 0.65, projects: 1 },
        { state: 'Kerala', ndvi: 0.72, projects: 1 },
        { state: 'Andhra Pradesh', ndvi: 0.58, projects: 1 },
        { state: 'Puducherry', ndvi: 0.42, projects: 1 },
        { state: 'Lakshadweep', ndvi: 0.78, projects: 1 },
        { state: 'Tamil Nadu', ndvi: 0.68, projects: 1 }
    ];

    // Alerts
    const alerts: NDVIAlert[] = [
        { id: 1, project: 'Puducherry Seagrass', type: 'degradation', message: 'NDVI below 0.5 threshold', timestamp: '2 hours ago', severity: 'critical' },
        { id: 2, project: 'Lakshadweep Saltmarsh', type: 'recovery', message: '15% improvement detected', timestamp: '5 hours ago', severity: 'info' },
        { id: 3, project: 'Tamil Nadu Mangrove', type: 'threshold', message: 'Approaching optimal NDVI range', timestamp: '1 day ago', severity: 'warning' }
    ];

    const belowThreshold = projects.filter(p => p.ndvi < thresholdValue);
    const avgNDVI = projects.reduce((sum, p) => sum + p.ndvi, 0) / projects.length;
    const totalArea = projects.reduce((sum, p) => sum + p.area, 0);
    const improving = projects.filter(p => p.trend === 'up').length;

    const handleScanAll = () => {
        console.log('Scanning all projects...');
        alert('Initiating NDVI scan for all projects...');
    };

    const handleExport = (format: string) => {
        console.log(`Exporting NDVI data as ${format}`);
        alert(`Exporting NDVI data as ${format.toUpperCase()}...`);
    };

    const getHealthColor = (score: number) => {
        if (score >= 80) return '#10b981';
        if (score >= 60) return '#f59e0b';
        return '#ef4444';
    };

    const getTrendIcon = (trend: string) => {
        if (trend === 'up') return <TrendingUp size={14} color="#10b981" />;
        if (trend === 'down') return <TrendingDown size={14} color="#ef4444" />;
        return <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>→</span>;
    };

    return (
        <div style={{ padding: '0 2rem 2rem 2rem', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

                {/* Header with Controls */}
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#0077B6', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Satellite size={32} /> NDVI Satellite Monitoring
                    </h1>
                    <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                        Real-time vegetation health monitoring and automated alerts
                    </p>

                    {/* Control Panel */}
                    <div style={{
                        background: 'white', borderRadius: '1rem', padding: '1.5rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb',
                        display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center'
                    }}>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>
                                Project
                            </label>
                            <select
                                value={selectedProject}
                                onChange={(e) => setSelectedProject(e.target.value)}
                                style={{
                                    width: '100%', padding: '0.5rem', border: '1px solid #d1d5db',
                                    borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none'
                                }}
                            >
                                <option value="all">All Projects</option>
                                {projects.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>

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
                            </select>
                        </div>

                        <div style={{ flex: 1, minWidth: '150px' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>
                                Threshold
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="1"
                                value={thresholdValue}
                                onChange={(e) => setThresholdValue(parseFloat(e.target.value))}
                                style={{
                                    width: '100%', padding: '0.5rem', border: '1px solid #d1d5db',
                                    borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                            <button
                                onClick={handleScanAll}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem',
                                    background: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.5rem',
                                    cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500
                                }}
                            >
                                <RefreshCw size={16} /> Scan All
                            </button>
                            <button
                                onClick={() => setShowAlerts(!showAlerts)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1rem',
                                    background: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '0.5rem',
                                    cursor: 'pointer', fontSize: '0.875rem'
                                }}
                            >
                                <Bell size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Summary Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    {[
                        { label: 'Average NDVI', value: avgNDVI.toFixed(2), icon: TrendingUp, color: '#10b981', change: '+0.05' },
                        { label: 'Below Threshold', value: belowThreshold.length.toString(), icon: AlertTriangle, color: '#ef4444', change: `${thresholdValue} limit` },
                        { label: 'Improving', value: `${improving}/${projects.length}`, icon: CheckCircle, color: '#3b82f6', change: `${Math.round(improving / projects.length * 100)}%` },
                        { label: 'Coverage Area', value: `${totalArea.toFixed(0)} ha`, icon: MapPin, color: '#8b5cf6', change: '6 projects' },
                        { label: 'Last Scan', value: '2 hrs ago', icon: Satellite, color: '#f59e0b', change: 'Auto-refresh' }
                    ].map((metric, idx) => (
                        <div key={idx} style={{
                            background: 'white', borderRadius: '1rem', padding: '1.5rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <metric.icon size={24} style={{ color: metric.color, opacity: 0.7 }} />
                                <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500 }}>{metric.change}</span>
                            </div>
                            <p style={{ fontSize: '1.875rem', fontWeight: 700, color: '#1f2937', margin: '0.25rem 0' }}>{metric.value}</p>
                            <p style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500, margin: 0 }}>{metric.label}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                    {/* Satellite Globe */}
                    <div style={{
                        background: 'white', borderRadius: '1rem', padding: '1.5rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb',
                        display: 'flex', flexDirection: 'column'
                    }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937', marginBottom: '1rem' }}>
                            Satellite View
                        </h3>
                        <div style={{ flex: 1, minHeight: '500px', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid #e5e7eb', background: '#000', marginBottom: '1rem' }}>
                            <SatelliteGlobe3D userRole="admin" showNDVILayer={true} selectedProjectId={selectedProject === 'all' ? undefined : selectedProject} />
                        </div>

                        {/* Unobstructed Globe Tools & Legend Bar */}
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '1rem', background: '#f9fafb', borderRadius: '0.75rem',
                            border: '1px solid #e5e7eb', gap: '2rem', flexWrap: 'wrap'
                        }}>
                            {/* Controls */}
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4b5563', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <Satellite size={14} /> CONTROLS:
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
                                    🖱️ <span>Drag to rotate</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
                                    🔍 <span>Scroll to zoom</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
                                    📍 <span>Click markers</span>
                                </div>
                            </div>

                            {/* Legend */}
                            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4b5563' }}>NDVI LEGEND:</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ width: '8px', height: '8px', background: '#4CAF50', borderRadius: '50%' }}></div>
                                    <span style={{ fontSize: '0.7rem', color: '#4b5563' }}>Healthy (≥0.6)</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ width: '8px', height: '8px', background: '#FFEB3B', borderRadius: '50%' }}></div>
                                    <span style={{ fontSize: '0.7rem', color: '#4b5563' }}>Moderate (0.4-0.6)</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ width: '8px', height: '8px', background: '#F44336', borderRadius: '50%' }}></div>
                                    <span style={{ fontSize: '0.7rem', color: '#4b5563' }}>At Risk (&lt; 0.4)</span>
                                </div>
                            </div>

                            {/* Project Count */}
                            <div style={{
                                background: '#3b82f6', color: 'white', padding: '0.25rem 0.75rem',
                                borderRadius: '1rem', fontSize: '0.7rem', fontWeight: 600
                            }}>
                                {projects.length} Active Projects
                            </div>
                        </div>
                    </div>

                    {/* Project List */}
                    <div style={{
                        background: 'white', borderRadius: '1rem', padding: '1.5rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb',
                        display: 'flex', flexDirection: 'column'
                    }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937', marginBottom: '1rem' }}>
                            Project Status
                        </h3>
                        <div style={{ flex: 1, height: '500px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                            {projects.map(project => (
                                <div
                                    key={project.id}
                                    onClick={() => setSelectedProject(project.id)}
                                    style={{
                                        padding: '1rem', background: selectedProject === project.id ? '#f0f9ff' : '#f9fafb',
                                        borderRadius: '0.75rem', marginBottom: '0.75rem', cursor: 'pointer',
                                        border: `1px solid ${selectedProject === project.id ? '#3b82f6' : '#e5e7eb'}`,
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                        <div>
                                            <div style={{ fontWeight: 600, color: '#1f2937', fontSize: '0.875rem' }}>{project.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{project.state}</div>
                                        </div>
                                        {getTrendIcon(project.trend)}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                                        <div>
                                            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: getHealthColor(project.healthScore) }}>
                                                {project.ndvi.toFixed(2)}
                                            </div>
                                            <div style={{ fontSize: '0.65rem', color: '#6b7280' }}>NDVI Value</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{
                                                fontSize: '0.75rem', fontWeight: 600,
                                                color: getHealthColor(project.healthScore),
                                                padding: '0.25rem 0.5rem', background: `${getHealthColor(project.healthScore)}20`,
                                                borderRadius: '0.375rem'
                                            }}>
                                                {project.healthScore}%
                                            </div>
                                            <div style={{ fontSize: '0.65rem', color: '#6b7280', marginTop: '0.25rem' }}>Health</div>
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '0.65rem', color: '#6b7280', marginTop: '0.5rem' }}>
                                        Last scan: {project.lastScan}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                    {/* NDVI Trend */}
                    <div style={{
                        background: 'white', borderRadius: '1rem', padding: '1.5rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb'
                    }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>
                            NDVI Trend Analysis
                        </h3>
                        <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem' }}>
                            Historical vegetation health (6 months)
                        </p>
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={ndviTrendData}>
                                <defs>
                                    <linearGradient id="colorNdvi" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" stroke="#666" style={{ fontSize: '0.75rem' }} />
                                <YAxis stroke="#666" style={{ fontSize: '0.75rem' }} domain={[0, 1]} />
                                <Tooltip />
                                <Area type="monotone" dataKey="ndvi" stroke="#10b981" fillOpacity={1} fill="url(#colorNdvi)" strokeWidth={2} />
                                <Line type="monotone" dataKey="threshold" stroke="#ef4444" strokeDasharray="5 5" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Regional Comparison */}
                    <div style={{
                        background: 'white', borderRadius: '1rem', padding: '1.5rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb'
                    }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>
                            Regional Comparison
                        </h3>
                        <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem' }}>
                            NDVI values by state
                        </p>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={regionalData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="state" stroke="#666" style={{ fontSize: '0.65rem' }} angle={-45} textAnchor="end" height={80} />
                                <YAxis stroke="#666" style={{ fontSize: '0.75rem' }} domain={[0, 1]} />
                                <Tooltip />
                                <Bar dataKey="ndvi" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Alerts & Export */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                    {/* Automated Alerts */}
                    {showAlerts && (
                        <div style={{
                            background: 'white', borderRadius: '1rem', padding: '1.5rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                                    Automated Alerts ({alerts.length})
                                </h3>
                                <button
                                    style={{
                                        padding: '0.375rem 0.75rem', background: '#f3f4f6', border: '1px solid #d1d5db',
                                        borderRadius: '0.5rem', fontSize: '0.75rem', cursor: 'pointer'
                                    }}
                                >
                                    Configure
                                </button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {alerts.map(alert => (
                                    <div
                                        key={alert.id}
                                        style={{
                                            padding: '1rem',
                                            background: alert.severity === 'critical' ? '#fef2f2' : alert.severity === 'warning' ? '#fef3c7' : '#f0f9ff',
                                            borderRadius: '0.75rem',
                                            border: `1px solid ${alert.severity === 'critical' ? '#fecaca' : alert.severity === 'warning' ? '#fde68a' : '#bfdbfe'}`
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                                            <AlertTriangle size={16} style={{
                                                color: alert.severity === 'critical' ? '#ef4444' : alert.severity === 'warning' ? '#f59e0b' : '#3b82f6',
                                                marginTop: '0.125rem'
                                            }} />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1f2937', marginBottom: '0.25rem' }}>
                                                    {alert.project}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                                                    {alert.message}
                                                </div>
                                                <div style={{ fontSize: '0.65rem', color: '#9ca3af' }}>
                                                    {alert.timestamp}
                                                </div>
                                            </div>
                                            <button
                                                style={{
                                                    padding: '0.25rem 0.5rem', background: 'white', border: '1px solid #d1d5db',
                                                    borderRadius: '0.375rem', fontSize: '0.75rem', cursor: 'pointer'
                                                }}
                                            >
                                                Dismiss
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Export Options */}
                    <div style={{
                        background: 'white', borderRadius: '1rem', padding: '1.5rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb'
                    }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937', marginBottom: '1rem' }}>
                            Export NDVI Data
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <button
                                onClick={() => handleExport('pdf')}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem',
                                    background: '#dc2626', color: 'white', border: 'none', borderRadius: '0.5rem',
                                    cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500
                                }}
                            >
                                <Download size={16} /> Project Report (PDF)
                            </button>
                            <button
                                onClick={() => handleExport('csv')}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem',
                                    background: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.5rem',
                                    cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500
                                }}
                            >
                                <Download size={16} /> Time Series (CSV)
                            </button>
                            <button
                                onClick={() => handleExport('excel')}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem',
                                    background: '#10b981', color: 'white', border: 'none', borderRadius: '0.5rem',
                                    cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500
                                }}
                            >
                                <Download size={16} /> Comparison (Excel)
                            </button>
                            <button
                                onClick={() => handleExport('geojson')}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem',
                                    background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '0.5rem',
                                    cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500
                                }}
                            >
                                <Download size={16} /> GeoJSON Map
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminNDVIMonitoring;
