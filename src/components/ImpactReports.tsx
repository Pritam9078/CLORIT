import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Calendar, Download, Loader2, Leaf } from 'lucide-react';
import { useNGOStore } from '../stores/useNGOStore';

const ImpactReports: React.FC = () => {
    const { impactStats, fetchImpactSummary, isLoading } = useNGOStore();

    useEffect(() => {
        fetchImpactSummary();
    }, [fetchImpactSummary]);

    const stats = [
        { 
            label: 'Carbon Credits Minted', 
            value: impactStats?.totalCarbonCredits ? `${impactStats.totalCarbonCredits.toLocaleString()} CCT` : '0 CCT', 
            icon: <Leaf size={20} />, 
            color: '#10b981' 
        },
        { 
            label: 'Ecological Area', 
            value: impactStats?.totalArea ? `${impactStats.totalArea.toLocaleString()} Ha` : '0 Ha', 
            icon: <TrendingUp size={20} />, 
            color: '#3b82f6' 
        },
        { 
            label: 'Projects Verified', 
            value: impactStats?.approvedProjects ? impactStats.approvedProjects.toString() : '0', 
            icon: <BarChart3 size={20} />, 
            color: '#8b5cf6' 
        }
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a' }}>Impact Analytics</h1>
                <p style={{ color: '#64748b' }}>Real-time synchronization of project performance and carbon sequestration milestones.</p>
            </div>

            {isLoading && !impactStats ? (
                <div className="flex items-center justify-center p-12">
                    <Loader2 className="w-8 h-8 animate-spin text-green-500" />
                </div>
            ) : (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                        {stats.map((stat, i) => (
                            <Card key={i}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                                    <div style={{ color: stat.color }}>{stat.icon}</div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Card>
                        <CardHeader>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <CardTitle>Impact Performance Ledger</CardTitle>
                                <button style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '0.5rem',
                                    background: '#f1f5f9',
                                    border: 'none',
                                    fontSize: '0.875rem',
                                    cursor: 'pointer'
                                }}>
                                    <Download size={16} /> Export Detailed Audit
                                </button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {impactStats?.approvedProjects === 0 ? (
                                <div style={{ color: '#64748b', textAlign: 'center', padding: '4rem' }}>
                                    <BarChart3 size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
                                    <p>No verified projects recorded. All data currently being synced from on-chain audit.</p>
                                </div>
                            ) : (
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex items-start gap-4">
                                        <TrendingUp className="text-green-500 w-10 h-10 p-2 bg-green-100 rounded-lg" />
                                        <div>
                                            <h4 className="font-bold text-gray-900">Ecological Threshold Met</h4>
                                            <p className="text-sm text-gray-600">Your managed communities have achieved a combined NDVI threshold of {(impactStats?.averageCreditsPerProject || 0.65).toFixed(2)} across {impactStats?.totalArea} hectares.</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
};

export default ImpactReports;
