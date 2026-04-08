import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGO_CONFIG } from '../constants/branding';
import {
    LayoutDashboard,
    ShoppingCart,
    PieChart,
    History,
    User,
    Users,
    LogOut,
    Menu,
    X,
    TrendingUp,
    Globe,
    Leaf,
    ShieldCheck,
    Search,
    Filter,
    ArrowUpRight,
    IndianRupee,
    Wallet,
    Copy,
    ExternalLink
} from 'lucide-react';
import { WalletUtils, WalletState } from '../utils/walletUtils';
import Profile from './Profile';

// Mock Data for Marketplace
const MARKETPLACE_PROJECTS = [
    {
        id: 'PRJ-2001',
        name: 'Sundarbans Mangrove Restoration',
        type: 'Blue Carbon',
        location: 'West Bengal',
        price: 12.5,
        available: 15400,
        impact: '850 tCO2e/yr',
        health: 92,
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'PRJ-2002',
        name: 'Kerala Seagrass Protection',
        type: 'Seagrass',
        location: 'Kerala',
        price: 15.8,
        available: 8200,
        impact: '420 tCO2e/yr',
        health: 88,
        image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'PRJ-2003',
        name: 'Andhra Coastal Saltmarsh',
        type: 'Saltmarsh',
        location: 'Andhra Pradesh',
        price: 10.2,
        available: 25000,
        impact: '310 tCO2e/yr',
        health: 79,
        image: 'https://images.unsplash.com/photo-1505142446710-c3d39c4fdc58?auto=format&fit=crop&w=400&q=80'
    }
];

const styles = {
    dashboard: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        margin: 0,
        padding: 0
    },
    header: {
        background: 'white',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        position: 'sticky' as const,
        top: 0,
        zIndex: 1000
    },
    navContainer: {
        maxWidth: 'none',
        margin: '0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.75rem 1.5rem',
        gap: '1rem',
        minHeight: '70px',
        width: '100%',
        boxSizing: 'border-box' as const
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '1.25rem',
        fontWeight: 700,
        color: '#1e40af',
        cursor: 'pointer'
    },
    desktopNavContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        overflow: 'hidden'
    },
    desktopNav: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'nowrap' as const
    },
    navGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        padding: '0 0.5rem',
        borderRight: '1px solid #e2e8f0'
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 0.75rem',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        fontWeight: 500,
        fontSize: '0.875rem',
        transition: 'all 0.3s ease',
        whiteSpace: 'nowrap' as const,
        background: 'transparent',
        color: '#64748b',
        border: 'none'
    },
    navItemActive: {
        background: '#dbeafe',
        color: '#1e40af',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
    },
    logoutButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 0.75rem',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        fontWeight: 500,
        fontSize: '0.875rem',
        background: '#fef2f2',
        color: '#dc2626',
        border: '1px solid #fecaca'
    },
    main: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem 2rem 2rem'
    },
    tabContent: {
        animation: 'fadeIn 0.3s ease-in-out'
    },
    sectionTitle: {
        fontSize: '1.25rem',
        fontWeight: 700,
        color: '#1e293b',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem'
    },
    cardLight: {
        background: 'white',
        borderRadius: '1.25rem',
        padding: '1.5rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
    },
    progressBar: {
        height: '8px',
        borderRadius: '4px',
        background: '#f1f5f9',
        overflow: 'hidden' as const,
        marginTop: '0.5rem'
    },
    progressFill: {
        height: '100%',
        borderRadius: '4px',
        transition: 'width 1s ease-out'
    },
    // Marketplace Styles
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem'
    },
    card: {
        background: 'white',
        borderRadius: '1.25rem',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column' as const
    },
    cardHover: {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
    },
    cardImage: {
        height: '180px',
        width: '100%',
        objectFit: 'cover' as const
    },
    cardBody: {
        padding: '1.25rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column' as const
    },
    badge: {
        padding: '0.25rem 0.6rem',
        borderRadius: '0.5rem',
        fontSize: '0.75rem',
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem'
    },
    typeBadge: {
        background: '#eff6ff',
        color: '#3b82f6'
    },
    priceTag: {
        fontSize: '1.5rem',
        fontWeight: 700,
        color: '#0f172a'
    },
    buyButton: {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '0.75rem',
        background: '#059669',
        color: 'white',
        fontWeight: 600,
        border: 'none',
        cursor: 'pointer',
        marginTop: '1rem',
        transition: 'all 0.2s ease'
    },
    // Enhanced Marketplace Styles
    marketplaceContainer: {
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: '2rem'
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1.5rem'
    },
    filterGroup: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '0.75rem'
    },
    filterLabel: {
        fontSize: '0.75rem',
        fontWeight: 700,
        color: '#64748b',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.5px'
    },
    filterOption: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.6rem 0.75rem',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        fontSize: '0.875rem',
        color: '#475569',
        transition: 'all 0.2s',
        border: '1px solid transparent'
    },
    filterOptionActive: {
        background: '#eff6ff',
        color: '#1e40af',
        border: '1px solid #dbeafe'
    },
    featuredHero: {
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: '1.5rem',
        padding: '2.5rem',
        color: 'white',
        marginBottom: '2rem',
        position: 'relative' as const,
        overflow: 'hidden' as const,
        display: 'flex' as const,
        justifyContent: 'space-between' as const,
        alignItems: 'center' as const,
        border: '1px solid #334155'
    },
    sdgIcon: {
        width: '24px',
        height: '24px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.65rem',
        fontWeight: 800,
        color: 'white'
    },
    certificateCard: {
        background: 'white',
        borderRadius: '1rem',
        padding: '1.25rem',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '0.75rem',
        transition: 'all 0.2s'
    },
    certificateTag: {
        fontSize: '0.65rem',
        fontWeight: 700,
        padding: '0.2rem 0.5rem',
        borderRadius: '4px',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.5px'
    },
    sdgGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '1rem'
    },
    sdgCard: {
        borderRadius: '0.75rem',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        textAlign: 'center' as const,
        border: '1px solid #f1f5f9',
        transition: 'all 0.2s'
    },
    complianceBadge: {
        padding: '0.4rem 0.75rem',
        borderRadius: '2rem',
        fontSize: '0.75rem',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem'
    },
    tableHeaderCell: {
        padding: '1rem 1.25rem',
        fontSize: '0.7rem',
        color: '#64748b',
        textTransform: 'uppercase' as const,
        borderBottom: '1px solid #e2e8f0',
        fontWeight: 700
    },
    tableDataCell: {
        padding: '1.25rem',
        fontSize: '0.9rem',
        borderBottom: '1px solid #f1f5f9'
    },
    profileCard: {
        background: 'white',
        borderRadius: '1.25rem',
        border: '1px solid #e2e8f0',
        padding: '2rem',
        height: '100%'
    }
};

const CorporateBuyerDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [isMobile, setIsMobile] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [selectedStandard, setSelectedStandard] = useState('All');
    const [watchlist, setWatchlist] = useState<string[]>([]);
    const [historyFilter, setHistoryFilter] = useState('All');
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileData, setProfileData] = useState({
        legalName: 'Tech Mahindra Ltd.',
        industry: 'Information Technology',
        regId: 'L64200MH1986PLC041370',
        hqLocation: 'Pune, Maharashtra, India',
        esgLead: 'Arun Kumar',
        adminEmail: 'sustainability@techmahindra.com',
        netZeroYear: '2035',
        budgetCap: '$250,000'
    });
    const [walletState, setWalletState] = useState<WalletState | null>(null);

    // Load wallet state
    useEffect(() => {
        const wallet = WalletUtils.getWalletState();
        setWalletState(wallet);
    }, []);

    const toggleWatchlist = (projectId: string) => {
        setWatchlist(prev => prev.includes(projectId) ? prev.filter(id => id !== projectId) : [...prev, projectId]);
    };

    const handlePurchase = (projectName: string) => {
        alert(`Successfully purchased credits from ${projectName}!\n\nTransaction ID: CCT-${Math.random().toString(36).substr(2, 9).toUpperCase()}\nStatus: Success on-chain`);
    };

    const renderOverview = () => (
        <div style={styles.tabContent}>
            {/* Top Welcome Section */}
            <div style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                padding: '2rem',
                borderRadius: '1.5rem',
                marginBottom: '2rem',
                color: 'white',
                boxShadow: '0 10px 25px -5px rgba(30, 64, 175, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, marginBottom: '0.5rem' }}>
                        Welcome to Sustainability Command, Acme Corp
                    </h1>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: 0, maxWidth: '600px' }}>
                        You have neutralized 4,210 tonnes of CO2e this year. Explore your impact trajectory.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <button style={{ background: 'white', color: '#1e40af', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => handleTabClick('impact')}>
                            View ESG Report <ArrowUpRight size={18} />
                        </button>
                        <button style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '0.6rem 1.2rem', borderRadius: '0.75rem', fontWeight: 600, cursor: 'pointer', backdropFilter: 'blur(4px)' }} onClick={() => handleTabClick('marketplace')}>
                            Invest More
                        </button>
                    </div>
                </div>
                <div style={{ opacity: 0.15, transform: 'rotate(-20deg)', marginRight: '-20px' }}>
                    <Globe size={200} />
                </div>
            </div>

            {/* Core Metrics Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '1.25rem',
                marginBottom: '2.5rem'
            }}>
                {[
                    { label: 'Total Assets', value: '$124,500', icon: <Wallet size={20} />, color: '#3b82f6', bg: '#eff6ff' },
                    { label: 'Carbon Credits', value: '8,420', icon: <Leaf size={20} />, color: '#10b981', bg: '#ecfdf5' },
                    { label: 'Impact Offset', value: '4,210t', icon: <Globe size={20} />, color: '#6366f1', bg: '#f5f3ff' },
                    { label: 'Verified Proofs', value: '100%', icon: <ShieldCheck size={20} />, color: '#f59e0b', bg: '#fffbeb' },
                    { label: 'Active Projects', value: '12', icon: <IndianRupee size={20} />, color: '#ec4899', bg: '#fdf2f8' }
                ].map((metric, index) => (
                    <div key={index} style={{
                        ...styles.cardLight,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div style={{ padding: '0.6rem', borderRadius: '0.75rem', background: metric.bg, color: metric.color }}>
                                {metric.icon}
                            </div>
                            <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>+12.5%</span>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>{metric.value}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginTop: '0.25rem' }}>{metric.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 2-Column Main Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Left Column: Analytics & Feed */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Portfolio Performance Chart */}
                    <div style={styles.cardLight}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ ...styles.sectionTitle, marginBottom: 0 }}>
                                <TrendingUp size={20} color="#3b82f6" /> Portfolio Trajectory
                            </h3>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {['1W', '1M', '3M', '6M', '1Y', 'ALL'].map(p => (
                                    <button key={p} style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', border: 'none', background: p === '1Y' ? '#eff6ff' : 'transparent', color: p === '1Y' ? '#3b82f6' : '#64748b', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}>{p}</button>
                                ))}
                            </div>
                        </div>
                        <div style={{ height: '300px', background: '#f8fafc', borderRadius: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100%', background: 'linear-gradient(to top, rgba(59, 130, 246, 0.1) 0%, transparent 100%)' }} />
                            {/* Dummy SVG for Area Chart */}
                            <svg width="100%" height="200" viewBox="0 0 1000 200" preserveAspectRatio="none">
                                <path d="M0,180 Q100,160 200,170 T400,140 T600,100 T800,90 T1000,60 L1000,200 L0,200 Z" fill="rgba(59, 130, 246, 0.1)" />
                                <path d="M0,180 Q100,160 200,170 T400,140 T600,100 T800,90 T1000,60" fill="none" stroke="#3b82f6" strokeWidth="4" />
                            </svg>
                            <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '1rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>Current Cumulative Impact</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>4,210 tCO2e</div>
                                </div>
                                <div style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: '1rem' }}>
                                    <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>Projected EOY</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>5,500 tCO2e</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enterprise Activity Feed */}
                    <div style={styles.cardLight}>
                        <h3 style={styles.sectionTitle}>
                            <Users size={20} color="#6366f1" /> Pulse Feed
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {[
                                { title: 'New Credits Minted', time: '2 hours ago', desc: '500 CCT from Sundarbans Site #4 verified and minted.', icon: '🌿', type: 'impact' },
                                { title: 'KYB Verification Success', time: 'Yesterday', desc: 'Enterprise profile level 2 verified by CLORIT Protocol.', icon: '🛡️', type: 'system' },
                                { title: 'Impact Report Ready', time: '2 days ago', desc: 'November 2024 sustainability audit is now available for download.', icon: '📊', type: 'report' }
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem', borderBottom: i < 2 ? '1px solid #f1f5f9' : 'none', paddingBottom: i < 2 ? '1.25rem' : 0 }}>
                                    <div style={{ fontSize: '1.5rem' }}>{item.icon}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                                            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b' }}>{item.title}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{item.time}</div>
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button style={{ width: '100%', marginTop: '1.5rem', padding: '0.75rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.75rem', color: '#1e40af', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            View Full Activity <ExternalLink size={16} />
                        </button>
                    </div>
                </div>

                {/* Right Column: Targets & Insights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Sustainability Goals Tracking */}
                    <div style={styles.cardLight}>
                        <h3 style={styles.sectionTitle}>
                            <ShieldCheck size={20} color="#10b981" /> 2024 Goal Progress
                        </h3>
                        {[
                            { label: 'Net Zero Alignment', target: '5,000t', current: '4,210t', progress: 84, color: '#10b981' },
                            { label: 'Plastic Neutrality', target: '20,000kg', current: '12,000kg', progress: 60, color: '#3b82f6' },
                            { label: 'Marine Diversity Support', target: '10 Sites', current: '8 Sites', progress: 80, color: '#6366f1' }
                        ].map((goal, i) => (
                            <div key={i} style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                                    <span style={{ fontWeight: 600, color: '#475569' }}>{goal.label}</span>
                                    <span style={{ color: '#64748b' }}>{goal.current} / {goal.target}</span>
                                </div>
                                <div style={styles.progressBar}>
                                    <div style={{ ...styles.progressFill, width: `${goal.progress}%`, background: goal.color }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sector Focus (Pie Chart Placeholder) */}
                    <div style={styles.cardLight}>
                        <h3 style={styles.sectionTitle}>
                            <PieChart size={20} color="#f59e0b" /> Impact Distribution
                        </h3>
                        <div style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ height: '120px', width: '120px', borderRadius: '50%', border: '16px solid #f8fafc', borderTopColor: '#059669', borderRightColor: '#3b82f6', borderBottomColor: '#f59e0b', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Globe size={24} color="#e2e8f0" />
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            {[
                                { label: 'Mangroves', color: '#059669' },
                                { label: 'Seagrass', color: '#3b82f6' },
                                { label: 'Saltmarsh', color: '#f59e0b' },
                                { label: 'Others', color: '#e2e8f0' }
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                                    <span style={{ color: '#64748b', fontWeight: 600 }}>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Market Insights */}
                    <div style={{ ...styles.cardLight, background: '#f8fafc', borderStyle: 'dashed' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <TrendingUp size={16} color="#3b82f6" /> Market Index
                        </h4>
                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Verified Blue Carbon (CCT)</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
                                <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>$15.42</span>
                                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, background: '#ecfdf5', padding: '0.2rem 0.5rem', borderRadius: '0.5rem' }}>+4.2%</span>
                            </div>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0, fontStyle: 'italic' }}>
                            Next compliance update: 15 Jan 2025. Prices projected to increase due to new ESG frameworks.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) setIsMobileMenuOpen(false);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const renderMarketplace = () => {
        const filteredProjects = MARKETPLACE_PROJECTS.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesType = selectedType === 'All' || p.type === selectedType;
            return matchesSearch && matchesType;
        });

        return (
            <div style={styles.tabContent}>
                <div style={styles.marketplaceContainer}>
                    {/* Sidebar Filters */}
                    <aside style={styles.sidebar}>
                        <div style={styles.cardLight}>
                            <h3 style={{ ...styles.sectionTitle, fontSize: '1rem', marginBottom: '1.5rem' }}>
                                <Filter size={18} /> Deep Filters
                            </h3>

                            <div style={styles.filterGroup}>
                                <label style={styles.filterLabel}>Project Category</label>
                                {['All', 'Blue Carbon', 'Seagrass', 'Saltmarsh', 'Coral Reef'].map(type => (
                                    <div
                                        key={type}
                                        style={{ ...styles.filterOption, ...(selectedType === type ? styles.filterOptionActive : {}) }}
                                        onClick={() => setSelectedType(type)}
                                    >
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: selectedType === type ? '#3b82f6' : '#cbd5e1' }} />
                                        {type}
                                    </div>
                                ))}
                            </div>

                            <div style={{ ...styles.filterGroup, marginTop: '2rem' }}>
                                <label style={styles.filterLabel}>Certification Standard</label>
                                {['All', 'Admin Verified', 'Verra (VCS)', 'Gold Standard'].map(std => (
                                    <div
                                        key={std}
                                        style={{ ...styles.filterOption, ...(selectedStandard === std ? styles.filterOptionActive : {}) }}
                                        onClick={() => setSelectedStandard(std)}
                                    >
                                        <ShieldCheck size={16} color={selectedStandard === std ? '#3b82f6' : '#94a3b8'} />
                                        {std}
                                    </div>
                                ))}
                            </div>

                            <div style={{ ...styles.filterGroup, marginTop: '2rem' }}>
                                <label style={styles.filterLabel}>Risk Profile</label>
                                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                    <input type="checkbox" defaultChecked /> High Health ({">"}85%)
                                </div>
                                <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>
                                    <input type="checkbox" /> Recently Minted
                                </div>
                            </div>
                        </div>

                        {/* Market Tip */}
                        <div style={{ padding: '1.25rem', borderRadius: '1rem', background: '#f0f9ff', border: '1px solid #e0f2fe' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0369a1', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                                <ExternalLink size={14} /> Buying Tip
                            </div>
                            <p style={{ fontSize: '0.75rem', color: '#0369a1', margin: 0, lineHeight: 1.4 }}>
                                Projects with "Blue Carbon" designation currently offer 2.5x higher co-benefits for marine biodiversity.
                            </p>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {/* Search & Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <div>
                                <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>Investment Marketplace</h1>
                                <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Deploy capital into high-integrity blue carbon projects.</p>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input
                                        type="text"
                                        placeholder="Search by location, project ID..."
                                        style={{ padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', width: '320px', outline: 'none', background: 'white' }}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <select style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', background: 'white', fontWeight: 600, outline: 'none' }}>
                                    <option>Sort by: Newest</option>
                                    <option>Price: Low to High</option>
                                    <option>Impact: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Featured Project Hero */}
                        <div style={styles.featuredHero}>
                            <div style={{ position: 'relative', zIndex: 1, maxWidth: '60%' }}>
                                <span style={{ background: '#3b82f6', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Project of the Quarter</span>
                                <h2 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '1rem 0', lineHeight: 1.1 }}>Andaman Deep Sea Seagrass Reserve</h2>
                                <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '2rem' }}>The largest seagrass restoration initiative in the Indian Ocean. High-integrity credits verified on-chain via Admin Protocol.</p>
                                <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', opacity: 0.6, textTransform: 'uppercase' }}>Credits Available</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>45,200 CCT</div>
                                    </div>
                                    <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '2rem' }}>
                                        <div style={{ fontSize: '0.75rem', opacity: 0.6, textTransform: 'uppercase' }}>Unit Price</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>$18.50</div>
                                    </div>
                                </div>
                                <button style={{ ...styles.buyButton, width: 'auto', padding: '1rem 2rem', fontSize: '1rem', background: '#3b82f6' }} onClick={() => handlePurchase('Andaman Deep Sea Seagrass Reserve')}>
                                    Invest in Project
                                </button>
                            </div>
                            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%', background: 'url(https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80)', backgroundSize: 'cover', opacity: 0.6, maskImage: 'linear-gradient(to left, black 60%, transparent)' }} />
                        </div>

                        {/* Results Grid */}
                        <div style={styles.grid}>
                            {filteredProjects.map(project => (
                                <div key={project.id}
                                    style={styles.card}
                                    onMouseEnter={(e) => {
                                        Object.assign(e.currentTarget.style, styles.cardHover);
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'none';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}>
                                    <div style={{ position: 'relative' }}>
                                        <img src={project.image} alt={project.name} style={styles.cardImage} />
                                        <button
                                            onClick={(e) => { e.stopPropagation(); toggleWatchlist(project.id); }}
                                            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                                        >
                                            <div style={{ color: watchlist.includes(project.id) ? '#dc2626' : '#94a3b8', fontSize: '1.2rem' }}>{watchlist.includes(project.id) ? '❤️' : '🤍'}</div>
                                        </button>
                                        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', display: 'flex', gap: '0.4rem' }}>
                                            <div style={{ ...styles.sdgIcon, background: '#48773e' }}>13</div>
                                            <div style={{ ...styles.sdgIcon, background: '#007dbc' }}>14</div>
                                            <div style={{ ...styles.sdgIcon, background: '#3f7e44' }}>15</div>
                                        </div>
                                    </div>
                                    <div style={styles.cardBody}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                            <span style={{ ...styles.badge, ...styles.typeBadge }}>{project.type}</span>
                                            <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <Globe size={14} /> {project.location}
                                            </span>
                                        </div>
                                        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem', color: '#1e293b' }}>{project.name}</h3>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <ShieldCheck size={14} color="#3b82f6" /> Admin Verified • Block-ID: {project.id}
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem', padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem' }}>
                                            <div>
                                                <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase' }}>Price per tCO2e</div>
                                                <div style={styles.priceTag}>${project.price}</div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase' }}>Annual Impact</div>
                                                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#059669' }}>{project.impact}</div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                            <div>
                                                <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Availability</div>
                                                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{project.available.toLocaleString()} t</div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Health</div>
                                                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: project.health > 80 ? '#10b981' : '#f59e0b' }}>{project.health}%</div>
                                            </div>
                                        </div>

                                        <button
                                            style={styles.buyButton}
                                            onClick={() => handlePurchase(project.name)}
                                            onMouseEnter={(e) => e.currentTarget.style.background = '#047857'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = '#059669'}
                                        >
                                            Quick Buy
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderPortfolio = () => (
        <div style={styles.tabContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Portfolio Management</h1>
                    <p style={{ color: '#64748b' }}>Manage your active environmental assets and audit impact proofs.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: '#eff6ff', color: '#1e40af', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                        Generate Audit Report
                    </button>
                    <button style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: '#1e40af', color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                        Retire Credits
                    </button>
                </div>
            </div>

            {/* Portfolio Summary Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {[
                    { label: 'Asset Valuation', value: '$124,500', sub: 'Active Trading', icon: <Wallet size={20} />, color: '#3b82f6', bg: '#eff6ff' },
                    { label: 'Total Inventory', value: '8,420 CCT', sub: 'Across 12 Projects', icon: <Leaf size={20} />, color: '#10b981', bg: '#ecfdf5' },
                    { label: 'Retired Impact', value: '4,210 t', sub: 'Verified CO2e', icon: <History size={20} />, color: '#6366f1', bg: '#f5f3ff' },
                    { label: 'Portfolio Health', value: '89.4%', sub: 'Avg Monitoring', icon: <TrendingUp size={20} />, color: '#f59e0b', bg: '#fffbeb' }
                ].map((stat, i) => (
                    <div key={i} style={styles.cardLight}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                            <div style={{ padding: '0.75rem', borderRadius: '0.75rem', background: stat.bg, color: stat.color }}>{stat.icon}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>{stat.label}</div>
                        </div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.25rem' }}>{stat.value}</div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{stat.sub}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                {/* Detailed Asset Table */}
                <div style={styles.cardLight}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={styles.sectionTitle}>
                            <PieChart size={20} color="#3b82f6" /> Asset Inventory
                        </h3>
                        <div style={{ position: 'relative' }}>
                            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input type="text" placeholder="Filter assets..." style={{ padding: '0.5rem 1rem 0.5rem 2rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', fontSize: '0.85rem', width: '200px' }} />
                        </div>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid #f1f5f9' }}>
                                <th style={{ padding: '1rem 0.75rem', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Project Name</th>
                                <th style={{ padding: '1rem 0.75rem', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Holding</th>
                                <th style={{ padding: '1rem 0.75rem', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Health</th>
                                <th style={{ padding: '1rem 0.75rem', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Proof</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: 'Sundarbans Mangrove Restore', qty: '2,500 CCT', val: '$31,250', health: 92, status: 'Active' },
                                { name: 'Kerala Seagrass Protection', qty: '1,200 CCT', val: '$18,400', health: 88, status: 'Active' },
                                { name: 'Andhra Coastal Saltmarsh', qty: '3,100 CCT', val: '$31,600', health: 79, status: 'Retired' },
                                { name: 'Andaman Coral Reserve', qty: '1,620 CCT', val: '$43,250', health: 95, status: 'Active' }
                            ].map((row, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #f8fafc', transition: 'background 0.2s' }}>
                                    <td style={{ padding: '1.25rem 0.75rem' }}>
                                        <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.9rem' }}>{row.name}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.25rem' }}>Allocated: {row.status}</div>
                                    </td>
                                    <td style={{ padding: '1.25rem 0.75rem' }}>
                                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{row.qty}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#10b981' }}>Current: {row.val}</div>
                                    </td>
                                    <td style={{ padding: '1.25rem 0.75rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ width: '60px', height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                                                <div style={{ width: `${row.health}%`, height: '100%', background: row.health > 85 ? '#10b981' : '#f59e0b' }} />
                                            </div>
                                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>{row.health}%</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.25rem 0.75rem' }}>
                                        <button style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.4rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: '#1e40af', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <ShieldCheck size={14} /> View Certificate
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Impact Diversification Analytics */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={styles.cardLight}>
                        <h3 style={styles.sectionTitle}>
                            <Globe size={20} color="#6366f1" /> Diversification
                        </h3>
                        <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ height: '140px', width: '140px', borderRadius: '50%', border: '18px solid #f8fafc', borderTopColor: '#059669', borderRightColor: '#3b82f6', borderBottomColor: '#f59e0b', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>12</div>
                                    <div style={{ fontSize: '0.6rem', color: '#64748b' }}>Projects</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {[
                                { label: 'Mangroves', val: '45%', color: '#059669' },
                                { label: 'Seagrass', val: '30%', color: '#3b82f6' },
                                { label: 'Saltmarsh', val: '15%', color: '#f59e0b' },
                                { label: 'Others', val: '10%', color: '#e2e8f0' }
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.label}</span>
                                    </div>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{item.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ ...styles.cardLight, background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', color: 'white' }}>
                        <h3 style={{ ...styles.sectionTitle, color: 'white' }}>
                            <TrendingUp size={20} color="white" /> 2025 Projection
                        </h3>
                        <p style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '1.5rem' }}>Your current holdings will sequester an additional **1,250 tonnes** of CO2e in the next 12 months based on restoration maturity curves.</p>
                        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <div style={{ fontSize: '0.7rem', opacity: 0.8, textTransform: 'uppercase' }}>Estimated Value Yield</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>+$14,200</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Certificate Gallery Secion */}
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={styles.sectionTitle}>
                    <ShieldCheck size={20} color="#10b981" /> Digital Certificate Vault
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
                    {[
                        { id: 'CERT-001', type: 'VCS Retired', date: 'Oct 2024', name: 'Sundarbans Restoration' },
                        { id: 'CERT-004', type: 'Admin Active', date: 'Nov 2024', name: 'Andaman Reserve' },
                        { id: 'CERT-005', type: 'VCS Active', date: 'Dec 2024', name: 'Kerala Seagrass' },
                        { id: 'CERT-009', type: 'Admin Active', date: 'Dec 2024', name: 'Waitlist Project' }
                    ].map((cert, i) => (
                        <div key={i} style={styles.certificateCard} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ ...styles.certificateTag, background: cert.type.includes('VCS') ? '#eff6ff' : '#ecfdf5', color: cert.type.includes('VCS') ? '#1e40af' : '#059669' }}>
                                    {cert.type}
                                </div>
                                <ExternalLink size={14} color="#94a3b8" />
                            </div>
                            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>{cert.name}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
                                <span>{cert.id}</span>
                                <span>{cert.date}</span>
                            </div>
                            <button style={{ marginTop: '0.5rem', padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', background: 'white', color: '#475569', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                                Download PDF
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderHistory = () => {
        const historyData = [
            { id: 'TX-9821', date: 'Dec 24, 2024', type: 'Purchase', project: 'Sundarbans Mangrove', amt: '$12,500', qty: '1,000 CCT', status: 'Completed', hash: '0x4f...ed1' },
            { id: 'TX-9745', date: 'Dec 15, 2024', type: 'Retirement', project: 'Kerala Seagrass', amt: '$8,200', qty: '650 CCT', status: 'Completed', hash: '0x1a...ba3' },
            { id: 'TX-9612', date: 'Nov 28, 2024', type: 'Purchase', project: 'Andaman Coral', amt: '$25,000', qty: '2,000 CCT', status: 'Completed', hash: '0x32...cc4' },
            { id: 'TX-9501', date: 'Nov 12, 2024', type: 'Transfer', project: 'N/A', amt: '$50,000', qty: 'Funding', status: 'Completed', hash: '0x88...ee9' },
            { id: 'TX-9488', date: 'Oct 30, 2024', type: 'Purchase', project: 'Andhra Saltmarsh', amt: '$4,100', qty: '300 CCT', status: 'Pending', hash: '0x1c...99d' }
        ].filter(tx => historyFilter === 'All' || tx.type === historyFilter);

        return (
            <div style={styles.tabContent}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Audit Log & History</h1>
                        <p style={{ color: '#64748b' }}>Detailed immutable record of all on-chain environmental transactions.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button style={{ padding: '0.75rem 1.25rem', borderRadius: '0.75rem', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ExternalLink size={16} /> Export CSV
                        </button>
                        <button style={{ padding: '0.75rem 1.25rem', borderRadius: '0.75rem', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ShieldCheck size={16} /> PDF Audit Pack
                        </button>
                    </div>
                </div>

                <div style={{ ...styles.cardLight, padding: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {['All', 'Purchase', 'Retirement', 'Transfer'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setHistoryFilter(type)}
                                    style={{
                                        padding: '0.6rem 1rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid transparent',
                                        background: historyFilter === type ? '#eff6ff' : 'transparent',
                                        color: historyFilter === type ? '#1e40af' : '#64748b',
                                        fontWeight: 700,
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                        <div style={{ position: 'relative' }}>
                            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                type="text"
                                placeholder="Search IDs, Hashes..."
                                style={{ padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', width: '280px', fontSize: '0.85rem' }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ background: 'white', borderRadius: '1.25rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc' }}>
                                <th style={styles.tableHeaderCell}>Details</th>
                                <th style={styles.tableHeaderCell}>Type</th>
                                <th style={styles.tableHeaderCell}>Volume/Value</th>
                                <th style={styles.tableHeaderCell}>Status</th>
                                <th style={styles.tableHeaderCell}>On-Chain Hash</th>
                                <th style={styles.tableHeaderCell}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historyData.map((tx, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={styles.tableDataCell}>
                                        <div style={{ fontWeight: 700, color: '#1e293b' }}>{tx.id}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{tx.date} • {tx.project}</div>
                                    </td>
                                    <td style={styles.tableDataCell}>
                                        <span style={{
                                            ...styles.badge,
                                            background: tx.type === 'Purchase' ? '#ecfdf5' : tx.type === 'Retirement' ? '#eff6ff' : '#fef2f2',
                                            color: tx.type === 'Purchase' ? '#059669' : tx.type === 'Retirement' ? '#1e40af' : '#dc2626'
                                        }}>
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td style={styles.tableDataCell}>
                                        <div style={{ fontWeight: 700 }}>{tx.qty}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Total Value: {tx.amt}</div>
                                    </td>
                                    <td style={styles.tableDataCell}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: tx.status === 'Completed' ? '#10b981' : '#f59e0b', fontSize: '0.85rem', fontWeight: 700 }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} />
                                            {tx.status}
                                        </div>
                                    </td>
                                    <td style={styles.tableDataCell}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <code style={{ fontSize: '0.8rem', color: '#3b82f6', background: '#eff6ff', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>{tx.hash}</code>
                                            <ExternalLink size={12} color="#94a3b8" />
                                        </div>
                                    </td>
                                    <td style={styles.tableDataCell}>
                                        <button style={{ padding: '0.4rem 0.8rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', background: 'white', color: '#475569', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Audit Message */}
                <div style={{ marginTop: '2.5rem', padding: '1.5rem', borderRadius: '1rem', background: '#eff6ff', border: '1px solid #dbeafe', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <ShieldCheck size={24} color="#1e40af" />
                    <div>
                        <h4 style={{ margin: 0, color: '#1e40af', fontSize: '1rem', fontWeight: 700 }}>Accounting Ready</h4>
                        <p style={{ margin: '0.25rem 0 0', color: '#3b82f6', fontSize: '0.85rem' }}>
                            All transactions are recorded on the CLORIT Mainnet and are immutable. You can use these records for BRSR Reporting and Corporate Accounting.
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    const renderImpact = () => (
        <div style={styles.tabContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>ESG Impact Dashboard</h1>
                    <p style={{ color: '#64748b' }}>Comprehensive tracking of environmental and social performance metrics.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: 'white', color: '#1e293b', fontWeight: 700, border: '1px solid #e2e8f0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ExternalLink size={16} /> Export BRSR Report
                    </button>
                    <button style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: '#059669', color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ArrowUpRight size={16} /> Annual ESG Summary
                    </button>
                </div>
            </div>

            {/* Impact Hero Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '2.5rem' }}>
                {[
                    { label: 'Carbon Avoidance', value: '4,210 t', sub: 'Verified CO2e', icon: <TrendingUp size={24} />, color: '#059669', bg: '#ecfdf5' },
                    { label: 'Biodiversity Gain', value: '+18.4%', sub: 'Net Change Index', icon: <Leaf size={24} />, color: '#3b82f6', bg: '#eff6ff' },
                    { label: 'Socio-Economic', value: '$84.2k', sub: 'Community Support', icon: <Users size={24} />, color: '#f59e0b', bg: '#fffbeb' }
                ].map((stat, i) => (
                    <div key={i} style={styles.cardLight}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div style={{ padding: '0.75rem', borderRadius: '1rem', background: stat.bg, color: stat.color }}>{stat.icon}</div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', background: '#ecfdf5', padding: '0.2rem 0.5rem', borderRadius: '0.5rem' }}>+12% vs LY</span>
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b' }}>{stat.value}</div>
                        <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>{stat.label}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.25rem' }}>{stat.sub}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                {/* SDG Heatmap */}
                <div style={styles.cardLight}>
                    <h3 style={{ ...styles.sectionTitle, marginBottom: '1.5rem' }}>
                        <Globe size={20} color="#10b981" /> SDG Alignment Scorecard
                    </h3>
                    <div style={styles.sdgGrid}>
                        {[
                            { id: 13, label: 'Climate Action', color: '#48773e', progress: 85 },
                            { id: 14, label: 'Life Below Water', color: '#007dbc', progress: 72 },
                            { id: 15, label: 'Life On Land', color: '#3f7e44', progress: 64 },
                            { id: 8, label: 'Decent Work', color: '#a21942', progress: 91 },
                            { id: 1, label: 'No Poverty', color: '#e5243b', progress: 45 },
                            { id: 17, label: 'Partnerships', color: '#19486a', progress: 88 }
                        ].map(sdg => (
                            <div key={sdg.id} style={styles.sdgCard}>
                                <div style={{ width: '40px', height: '40px', background: sdg.color, color: 'white', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                                    {sdg.id}
                                </div>
                                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#475569', marginBottom: '0.75rem', height: '2rem', display: 'flex', alignItems: 'center' }}>
                                    {sdg.label}
                                </div>
                                <div style={{ width: '100%', height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
                                    <div style={{ width: `${sdg.progress}%`, height: '100%', background: sdg.color }} />
                                </div>
                                <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.4rem', fontWeight: 700 }}>{sdg.progress}% Target</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Compliance & Reporting Status */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={styles.cardLight}>
                        <h3 style={styles.sectionTitle}>
                            <ShieldCheck size={20} color="#3b82f6" /> Reporting Compliance
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                            {[
                                { name: 'BRSR Core (India)', status: 'Ready', color: '#10b981' },
                                { name: 'CSRD Directive (EU)', status: 'Partial', color: '#3b82f6' },
                                { name: 'TCFD Alignment', status: 'Audit Req', color: '#f59e0b' }
                            ].map((rep, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #f1f5f9' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>{rep.name}</span>
                                    <div style={{ ...styles.complianceBadge, background: `${rep.color}15`, color: rep.color }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: rep.color }} />
                                        {rep.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ ...styles.cardLight, background: '#1e293b', color: 'white' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}>
                                <Globe size={20} />
                            </div>
                            <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>AI Impact Auditor</h4>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                            Based on satellite data, your **Project 002 (Andaman)** shows exceptional mangrove canopy growth, exceeding baseline by 4.2% this quarter.
                        </p>
                    </div>
                </div>
            </div>

            {/* Project Impact Map/List */}
            <div style={styles.cardLight}>
                <h3 style={styles.sectionTitle}>Project-wise ESG Metrics</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid #f1f5f9' }}>
                            <th style={{ padding: '1rem 0.75rem', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Project</th>
                            <th style={{ padding: '1rem 0.75rem', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>SDGs Met</th>
                            <th style={{ padding: '1rem 0.75rem', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Sequestration</th>
                            <th style={{ padding: '1rem 0.75rem', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Employment</th>
                            <th style={{ padding: '1rem 0.75rem', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Verification</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { name: 'Sundarbans Restoration', sdgs: [13, 14, 15], carbon: '1,240 t', jobs: 42, method: 'On-chain' },
                            { name: 'Kerala Seagrass', sdgs: [14, 8, 17], carbon: '840 t', jobs: 28, method: 'Drone/IoT' },
                            { name: 'Andhra Saltmarsh', sdgs: [13, 15, 1], carbon: '2,130 t', jobs: 156, method: 'Blockchain' }
                        ].map((row, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}>
                                <td style={{ padding: '1rem 0.75rem', fontWeight: 700, fontSize: '0.85rem' }}>{row.name}</td>
                                <td style={{ padding: '1rem 0.75rem' }}>
                                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                                        {row.sdgs.map(s => (
                                            <div key={s} style={{ width: '18px', height: '18px', background: '#3b82f6', color: 'white', fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2px', fontWeight: 800 }}>{s}</div>
                                        ))}
                                    </div>
                                </td>
                                <td style={{ padding: '1rem 0.75rem', fontSize: '0.85rem', color: '#059669', fontWeight: 700 }}>{row.carbon}</td>
                                <td style={{ padding: '1rem 0.75rem', fontSize: '0.85rem' }}>{row.jobs} local jobs</td>
                                <td style={{ padding: '1rem 0.75rem' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        <ShieldCheck size={14} color="#10b981" /> {row.method}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderBuyerProfile = () => {
        const handleProfileSave = () => {
            setIsEditingProfile(false);
            // In a real app, this would trigger an API call
        };

        const updateField = (field: keyof typeof profileData, val: string) => {
            setProfileData(prev => ({ ...prev, [field]: val }));
        };

        return (
            <div style={styles.tabContent}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Corporate Identity</h1>
                        <p style={{ color: '#64748b' }}>Manage your organization's verified profile and enterprise settings.</p>
                    </div>
                    {isEditingProfile ? (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={() => setIsEditingProfile(false)}
                                style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: 'white', color: '#64748b', fontWeight: 700, border: '1px solid #e2e8f0', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleProfileSave}
                                style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: '#059669', color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                            >
                                Save Changes
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsEditingProfile(true)}
                            style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: '#1e40af', color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <ShieldCheck size={18} /> Edit Profile
                        </button>
                    )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 350px) 1fr', gap: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={styles.profileCard}>
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <div style={{ width: '100px', height: '100px', borderRadius: '1.5rem', background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', color: 'white', fontSize: '2.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: '0 10px 15px -3px rgba(30, 64, 175, 0.2)' }}>
                                    {profileData.legalName.substring(0, 2).toUpperCase()}
                                </div>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.25rem' }}>{profileData.legalName}</h2>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: '#059669', fontSize: '0.8rem', fontWeight: 700 }}>
                                    <ShieldCheck size={14} /> KYB Verified Org
                                </div>
                            </div>

                            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
                                <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '1rem' }}>Enterprise Wallet</div>
                                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.4rem' }}>Connected via MetaMask</div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <code style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e40af' }}>0x4f2...ed1a</code>
                                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                                            <Copy size={14} />
                                        </button>
                                    </div>
                                </div>
                                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Balance</span>
                                    <span style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b' }}>12,450 CCT</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ ...styles.profileCard, padding: '1.5rem' }}>
                            <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#1e293b', fontWeight: 800 }}>Account Security</h4>
                            {[
                                { label: '2FA Auth', status: 'Enabled', color: '#10b981' },
                                { label: 'Login Emails', status: 'Active', color: '#10b981' },
                                { label: 'Whitelisting', status: 'Required', color: '#3b82f6' }
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{item.label}</span>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: item.color }}>{item.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={styles.profileCard}>
                            <h3 style={{ ...styles.sectionTitle, marginBottom: '2rem' }}>Organization Details</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                                {[
                                    { id: 'legalName', label: 'Legal Name', val: profileData.legalName, critical: true },
                                    { id: 'industry', label: 'Industry', val: profileData.industry, critical: true },
                                    { id: 'regId', label: 'Registration ID', val: profileData.regId, critical: true },
                                    { id: 'hqLocation', label: 'HQ Location', val: profileData.hqLocation, critical: false },
                                    { id: 'esgLead', label: 'ESG Lead', val: profileData.esgLead, critical: false },
                                    { id: 'adminEmail', label: 'Admin Email', val: profileData.adminEmail, critical: false }
                                ].map((field) => (
                                    <div key={field.id}>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            {field.label} {field.critical && <ShieldCheck size={12} color="#10b981" />}
                                        </div>
                                        {isEditingProfile && !field.critical ? (
                                            <input
                                                type="text"
                                                value={field.val}
                                                onChange={(e) => updateField(field.id as any, e.target.value)}
                                                style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', fontSize: '0.9rem', fontWeight: 700, color: '#1e293b' }}
                                            />
                                        ) : (
                                            <div style={{
                                                fontSize: '0.9rem',
                                                fontWeight: 700,
                                                color: field.critical ? '#64748b' : '#1e293b',
                                                lineHeight: '1.5',
                                                wordBreak: 'break-all'
                                            }}>
                                                {field.val}
                                                {field.critical && (
                                                    <span style={{
                                                        fontSize: '0.65rem',
                                                        background: '#f8fafc',
                                                        padding: '2px 8px',
                                                        borderRadius: '6px',
                                                        color: '#94a3b8',
                                                        border: '1px solid #e2e8f0',
                                                        marginLeft: '8px',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        verticalAlign: 'middle',
                                                        fontWeight: 800,
                                                        letterSpacing: '0.025em'
                                                    }}>
                                                        LOCKED
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={styles.profileCard}>
                            <h3 style={{ ...styles.sectionTitle, marginBottom: '2rem' }}>Sustainability Targets (2025-2035)</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, marginBottom: '0.6rem' }}>Net Zero Target Year</div>
                                    {isEditingProfile ? (
                                        <input
                                            type="text"
                                            value={profileData.netZeroYear}
                                            onChange={(e) => updateField('netZeroYear', e.target.value)}
                                            style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', fontSize: '1.25rem', fontWeight: 800, color: '#1e40af' }}
                                        />
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e40af' }}>{profileData.netZeroYear}</span>
                                            <span style={{ fontSize: '0.75rem', background: '#eff6ff', color: '#1e40af', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>STRATEGIC</span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, marginBottom: '0.6rem' }}>Quarterly Budget Cap</div>
                                    {isEditingProfile ? (
                                        <input
                                            type="text"
                                            value={profileData.budgetCap}
                                            onChange={(e) => updateField('budgetCap', e.target.value)}
                                            style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', fontSize: '1.25rem', fontWeight: 800, color: '#1e293b' }}
                                        />
                                    ) : (
                                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b' }}>{profileData.budgetCap}</div>
                                    )}
                                </div>
                            </div>
                            <div style={{ marginTop: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>2024 Offset Achievement</span>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>82%</span>
                                </div>
                                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: '82%', height: '100%', background: 'linear-gradient(90deg, #1e40af, #3b82f6)' }} />
                                </div>
                            </div>
                        </div>

                        <div style={{ ...styles.profileCard, background: '#fef2f2', border: '1px solid #fee2e2' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <LogOut size={24} color="#dc2626" />
                                <div>
                                    <h4 style={{ margin: 0, color: '#991b1b', fontWeight: 800 }}>Account Access</h4>
                                    <p style={{ margin: '0.25rem 0 1rem 0', color: '#b91c1c', fontSize: '0.85rem' }}>
                                        Manage organization-level access and revoke permissions for team members.
                                    </p>
                                    <button style={{ padding: '0.5rem 1rem', border: '1px solid #fee2e2', background: 'white', color: '#dc2626', borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
                                        Manage Team Access
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const handleTabClick = (id: string) => {
        setActiveTab(id);
        setIsMobileMenuOpen(false);
    };

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
        { id: 'marketplace', label: 'Marketplace', icon: <ShoppingCart size={18} /> },
        { id: 'portfolio', label: 'Portfolio', icon: <PieChart size={18} /> },
        { id: 'impact', label: 'ESG Impact', icon: <Leaf size={18} /> }
    ];

    return (
        <div style={styles.dashboard}>
            <header style={styles.header}>
                <div style={styles.navContainer}>
                    <div style={styles.logo} onClick={() => handleTabClick('overview')}>
                        <img src={LOGO_CONFIG.MAIN_LOGO} alt="CLORIT" style={{ width: '32px', height: '32px' }} />
                        <span>CLORIT <span style={{ fontWeight: 400, opacity: 0.6, fontSize: '0.9rem' }}>Buyer</span></span>
                    </div>

                    {!isMobile && (
                        <div style={styles.desktopNavContainer}>
                            <div style={styles.desktopNav}>
                                <div style={styles.navGroup}>
                                    {menuItems.slice(0, 1).map(item => (
                                        <button
                                            key={item.id}
                                            style={{
                                                ...styles.navItem,
                                                ...(activeTab === item.id ? styles.navItemActive : {})
                                            }}
                                            onClick={() => handleTabClick(item.id)}
                                        >
                                            {item.icon} {item.label}
                                        </button>
                                    ))}
                                </div>
                                <div style={styles.navGroup}>
                                    {menuItems.slice(1, 3).map(item => (
                                        <button
                                            key={item.id}
                                            style={{
                                                ...styles.navItem,
                                                ...(activeTab === item.id ? styles.navItemActive : {})
                                            }}
                                            onClick={() => handleTabClick(item.id)}
                                        >
                                            {item.icon} {item.label}
                                        </button>
                                    ))}
                                </div>
                                <div style={{ ...styles.navGroup, borderRight: 'none' }}>
                                    {menuItems.slice(3).map(item => (
                                        <button
                                            key={item.id}
                                            style={{
                                                ...styles.navItem,
                                                ...(activeTab === item.id ? styles.navItemActive : {})
                                            }}
                                            onClick={() => handleTabClick(item.id)}
                                        >
                                            {item.icon} {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div style={styles.rightSection}>
                        {/* Wallet Connection */}
                        {walletState?.isConnected ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: '#15803d' }}>
                                <div style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%' }} />
                                <span>{WalletUtils.formatAddress(walletState.address!)}</span>
                                <span style={{ background: 'white', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', border: '1px solid #bbf7d0', marginLeft: '0.25rem' }}>
                                    {parseFloat(walletState.balance).toFixed(3)} ETH
                                </span>
                            </div>
                        ) : (
                            <button onClick={() => navigate('/wallet-test')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem', transition: 'all 0.3s ease', background: '#1f2937', color: 'white', border: 'none', whiteSpace: 'nowrap' as const, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#111827'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#1f2937'; }}>
                                <Wallet size={16} />
                                <span>Connect</span>
                            </button>
                        )}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.4rem 0.75rem',
                                background: '#f8fafc',
                                borderRadius: '0.5rem',
                                border: '1px solid #e2e8f0',
                                color: '#64748b',
                                fontSize: '0.875rem',
                                cursor: 'pointer'
                            }}
                            onClick={() => handleTabClick('profile')}
                        >
                            <User size={18} />
                            {!isMobile && <span>Profile</span>}
                        </div>

                        <button
                            style={styles.logoutButton}
                            onClick={() => navigate('/')}
                        >
                            <LogOut size={18} />
                            {!isMobile && <span>Logout</span>}
                        </button>

                        {isMobile && (
                            <button style={{ background: 'none', border: 'none', color: '#1e40af' }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {isMobileMenuOpen && (
                <div style={{ position: 'fixed', top: '70px', left: 0, right: 0, bottom: 0, background: 'white', zIndex: 999, padding: '1rem' }}>
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            style={{
                                width: '100%',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                borderRadius: '0.75rem',
                                marginBottom: '0.5rem',
                                border: 'none',
                                background: activeTab === item.id ? '#ecfdf5' : 'transparent',
                                color: activeTab === item.id ? '#059669' : '#1e293b',
                                fontWeight: 600
                            }}
                            onClick={() => handleTabClick(item.id)}
                        >
                            {item.icon} {item.label}
                        </button>
                    ))}
                    <div style={{ borderTop: '1px solid #f1f5f9', marginTop: '1rem', paddingTop: '1rem' }}>
                        <button
                            style={{
                                width: '100%',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                borderRadius: '0.75rem',
                                border: 'none',
                                background: activeTab === 'profile' ? '#ecfdf5' : 'transparent',
                                color: activeTab === 'profile' ? '#059669' : '#1e293b',
                                fontWeight: 600
                            }}
                            onClick={() => handleTabClick('profile')}
                        >
                            <User size={18} /> My Profile
                        </button>
                    </div>
                </div>
            )}

            <main style={styles.main}>
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'marketplace' && renderMarketplace()}
                {activeTab === 'portfolio' && renderPortfolio()}
                {activeTab === 'impact' && renderImpact()}
                {activeTab === 'history' && renderHistory()}
                {activeTab === 'profile' && renderBuyerProfile()}
            </main>

            <footer style={{ marginTop: 'auto', padding: '3rem 1.5rem', borderTop: '1px solid #e2e8f0', background: 'white', textAlign: 'center' }}>
                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>© 2024 CLORIT Protocol • Blue Carbon Credit Infrastructure</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
                    <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.8rem' }}>Documentation</a>
                    <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.8rem' }}>Privacy Policy</a>
                    <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.8rem' }}>Support</a>
                </div>
            </footer>
        </div>
    );
};

export default CorporateBuyerDashboard;
