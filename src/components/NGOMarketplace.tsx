import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Tag,
  Globe,
  Coins
} from 'lucide-react';
import { useProjectStore } from '../state/projectStore';
import { useAuthStore } from '../state/authStore';
import NGOLayout from './shared/NGOLayout';
import { toast } from 'sonner';

interface NGOMarketplaceProps {
    standalone?: boolean;
}

const NGOMarketplace: React.FC<NGOMarketplaceProps> = ({ standalone = false }) => {
    const { projects, buyProjectCredits } = useProjectStore();
    const { currentUser } = useAuthStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState<'all' | 'listed' | 'unlisted'>('all');

    const handleBuy = (projectId: string) => {
        if (!currentUser) {
            toast.error('Please login to buy credits');
            return;
        }
        buyProjectCredits(projectId, currentUser.id);
        toast.success('Credits purchased successfully!');
    };

    const filteredProjects = projects.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             p.location.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (filterCategory === 'listed') {
            return matchesSearch && p.ngoId === currentUser?.id;
        }
        
        // Global market shows approved projects that are listed (mock: all approved are listed)
        return matchesSearch && p.status === 'admin-approved';
    });

    const styles = {
        container: {
            padding: standalone ? '0' : '2rem',
            background: standalone ? 'transparent' : '#F8FAF9',
            minHeight: standalone ? 'auto' : '100%',
            fontFamily: 'Inter, system-ui, sans-serif'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
        },
        titleSection: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
        },
        statsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2.5rem'
        },
        statCard: {
            background: 'white',
            padding: '1.75rem',
            borderRadius: '2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            border: '1px solid #F1F5F9',
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '0.5rem'
        },
        controls: {
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            alignItems: 'center'
        },
        searchBar: {
            flex: 1,
            position: 'relative' as const,
            display: 'flex',
            alignItems: 'center'
        },
        searchInput: {
            width: '100%',
            padding: '1rem 1rem 1rem 3rem',
            borderRadius: '1.25rem',
            border: '1px solid #E2E8F0',
            background: 'white',
            fontSize: '1rem',
            transition: 'all 0.2s ease',
            outline: 'none',
            fontWeight: '600'
        },
        filterGroup: {
            display: 'flex',
            background: '#F1F5F9',
            padding: '0.4rem',
            borderRadius: '1.25rem',
            gap: '0.4rem'
        },
        filterBtn: (active: boolean) => ({
            padding: '0.6rem 1.25rem',
            borderRadius: '0.85rem',
            border: 'none',
            fontSize: '0.9rem',
            fontWeight: '750',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backgroundColor: active ? 'white' : 'transparent',
            color: active ? '#0F172A' : '#64748B',
            boxShadow: active ? '0 4px 12px rgba(0,0,0,0.06)' : 'none'
        }),
        listingsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem'
        },
        listingCard: {
            background: 'white',
            borderRadius: '2.5rem',
            overflow: 'hidden',
            border: '1px solid #F1F5F9',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.03)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease'
        },
        cardImage: {
            height: '180px',
            background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            position: 'relative' as const
        },
        cardContent: {
            padding: '2rem'
        },
        priceBadge: {
            backgroundColor: '#ECFDF5',
            color: '#059669',
            padding: '0.4rem 1rem',
            borderRadius: '1.25rem',
            fontSize: '0.9rem',
            fontWeight: '800',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem'
        }
    };

    const stats = [
        { label: 'Total Credits', value: '12,450', icon: <Coins size={22} color="#10B981" />, sub: '+12% from last month' },
        { label: 'Market Liquidity', value: '$45.2k', icon: <DollarSign size={22} color="#0EA5E9" />, sub: 'Across 5 regions' },
        { label: 'Units Sold', value: '8,200', icon: <Activity size={22} color="#F59E0B" />, sub: 'Global volume' },
        { label: 'Current Price', value: '$13.25', icon: <TrendingUp size={22} color="#8B5CF6" />, sub: 'CCT / Unit price' }
    ];

    const content = (
        <div style={styles.container} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {!standalone && (
                <header style={styles.header}>
                    <div style={styles.titleSection}>
                        <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '1.25rem' }}>
                            <ShoppingBag size={28} color="#10B981" />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '2rem', fontWeight: '900', margin: 0, color: '#0F172A', letterSpacing: '-0.02em' }}>CCT Marketplace</h1>
                            <p style={{ margin: 0, color: '#64748B', fontSize: '1rem', fontWeight: '500' }}>Manage and trade verified carbon credits</p>
                        </div>
                    </div>
                </header>
            )}

            {/* Stats Dashboard */}
            <div style={styles.statsGrid}>
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        style={styles.statCard}
                        whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</span>
                            <div style={{ padding: '0.5rem', borderRadius: '0.75rem', background: 'rgba(0,0,0,0.02)' }}>{stat.icon}</div>
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.025em' }}>{stat.value}</div>
                        <div style={{ fontSize: '0.8rem', fontWeight: '600', color: stat.sub.includes('+') ? '#10B981' : '#64748B' }}>{stat.sub}</div>
                    </motion.div>
                ))}
            </div>

            {/* Marketplace Controls */}
            <div style={styles.controls}>
                <div style={styles.searchBar}>
                    <Search size={20} style={{ position: 'absolute', left: '1.25rem', color: '#94A3B8' }} />
                    <input 
                        style={styles.searchInput}
                        placeholder="Search regions or projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                
                <div style={styles.filterGroup}>
                    <button 
                        style={styles.filterBtn(filterCategory === 'all')}
                        onClick={() => setFilterCategory('all')}
                    >GLOBAL MARKET</button>
                    <button 
                        style={styles.filterBtn(filterCategory === 'listed')}
                        onClick={() => setFilterCategory('listed')}
                    >MY ASSETS</button>
                </div>

                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    style={{ padding: '1rem', borderRadius: '1.25rem', border: '1px solid #E2E8F0', background: 'white', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}
                >
                    <Filter size={20} color="#475569" />
                </motion.button>
            </div>

            {/* Listings Grid */}
            <div style={styles.listingsGrid}>
                <AnimatePresence>
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((item, i) => (
                            <motion.div
                                key={item.id || i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)' }}
                                style={styles.listingCard}
                                className="group"
                            >
                                <div style={styles.cardImage}>
                                    <Globe size={48} strokeWidth={1} opacity={0.4} />
                                    <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
                                        <div style={styles.priceBadge}>
                                            <Tag size={16} />
                                            $13.25
                                        </div>
                                    </div>
                                </div>
                                <div style={styles.cardContent}>
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.4rem', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.01em' }}>{item.name}</h3>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748B', fontWeight: '600' }}>{item.ngoName}</p>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem', marginBottom: '2rem', background: '#F8FAFC', padding: '1.25rem', borderRadius: '1.5rem', border: '1px solid #F1F5F9' }}>
                                        <div>
                                            <span style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.05em' }}>Volumetric</span>
                                            <span style={{ fontWeight: '900', color: '#0F172A', fontSize: '1.1rem' }}>{item.carbonCredits.toLocaleString()} <span style={{ fontSize: '0.7rem', color: '#64748B' }}>CCT</span></span>
                                        </div>
                                        <div>
                                            <span style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.05em' }}>Verification</span>
                                            <span style={{ fontWeight: '900', color: '#10B981', fontSize: '1.1rem' }}>NCCR <CheckCircle size={14} style={{ display: 'inline', marginLeft: '2px' }} /></span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        {item.ngoId !== currentUser?.id ? (
                                            <button 
                                                onClick={() => handleBuy(item.id)}
                                                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/10 cursor-pointer border-none text-sm"
                                            >
                                                BUY CREDITS
                                            </button>
                                        ) : (
                                            <button 
                                                className="flex-1 bg-slate-100 text-slate-400 font-black py-4 rounded-2xl cursor-not-allowed border-none text-sm"
                                                disabled
                                            >
                                                YOUR ASSET
                                            </button>
                                        )}
                                        <button className="px-5 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all cursor-pointer text-sm">
                                            VIEW
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                         <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '6rem', background: 'white', borderRadius: '3rem', border: '3px dashed #F1F5F9' }}>
                             <ShoppingBag size={64} className="text-slate-200 mx-auto mb-6" />
                             <h3 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#1E293B', marginBottom: '1rem' }}>Market is Live & Cooling</h3>
                             <p style={{ color: '#94A3B8', fontWeight: '600', maxWidth: '400px', margin: '0 auto' }}>All verified projects will appear here for trading. Ensure your projects are approved by registry.</p>
                         </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );

    if (standalone) return content;

    return (
        <NGOLayout>
            {content}
        </NGOLayout>
    );
};

const CheckCircle = ({ size, style }: { size: number, style?: any }) => (
    <svg style={style} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

export default NGOMarketplace;
