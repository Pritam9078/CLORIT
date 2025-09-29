import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Filter, 
  Search, 
  Star, 
  MapPin, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Eye,
  Heart,
  Download,
  CheckCircle,
  AlertCircle,
  Clock,
  Leaf,
  Globe,
  Award,
  Users,
  BarChart3,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

interface CarbonCredit {
  id: string;
  projectName: string;
  projectType: 'Blue Carbon' | 'Forest Conservation' | 'Renewable Energy' | 'Waste Management';
  location: string;
  country: string;
  credits: number;
  pricePerCredit: number;
  totalPrice: number;
  vintage: number;
  verificationStandard: string;
  rating: number;
  reviews: number;
  co2Reduced: number;
  projectImage: string;
  description: string;
  impactMetrics: {
    treesPlanted?: number;
    areaRestored?: number;
    communitiesSupported?: number;
    jobsCreated?: number;
  };
  certifications: string[];
  seller: {
    name: string;
    rating: number;
    verified: boolean;
  };
  availability: 'High' | 'Medium' | 'Low';
  sustainabilityGoals: string[];
}

const CorporateBuyerMarketplaceDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortBy, setSortBy] = useState('price');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Mock data for carbon credits
  const carbonCredits: CarbonCredit[] = [
    {
      id: 'CC-001',
      projectName: 'Sundarbans Mangrove Restoration',
      projectType: 'Blue Carbon',
      location: 'West Bengal, India',
      country: 'India',
      credits: 1000,
      pricePerCredit: 25,
      totalPrice: 25000,
      vintage: 2023,
      verificationStandard: 'VCS + CCB',
      rating: 4.8,
      reviews: 127,
      co2Reduced: 1000,
      projectImage: '/api/placeholder/400/300',
      description: 'Restoring critical mangrove ecosystems in the Sundarbans delta region',
      impactMetrics: {
        treesPlanted: 50000,
        areaRestored: 500,
        communitiesSupported: 15,
        jobsCreated: 120
      },
      certifications: ['VCS', 'CCB', 'Gold Standard'],
      seller: {
        name: 'EcoRestore India',
        rating: 4.9,
        verified: true
      },
      availability: 'High',
      sustainabilityGoals: ['Climate Action', 'Life Below Water', 'Decent Work']
    },
    {
      id: 'CC-002',
      projectName: 'Kerala Seagrass Conservation',
      projectType: 'Blue Carbon',
      location: 'Kerala, India',
      country: 'India',
      credits: 750,
      pricePerCredit: 30,
      totalPrice: 22500,
      vintage: 2024,
      verificationStandard: 'Gold Standard',
      rating: 4.6,
      reviews: 89,
      co2Reduced: 750,
      projectImage: '/api/placeholder/400/300',
      description: 'Protecting and restoring seagrass meadows along Kerala coast',
      impactMetrics: {
        areaRestored: 300,
        communitiesSupported: 8,
        jobsCreated: 65
      },
      certifications: ['Gold Standard', 'Plan Vivo'],
      seller: {
        name: 'Marine Conservation Trust',
        rating: 4.7,
        verified: true
      },
      availability: 'Medium',
      sustainabilityGoals: ['Climate Action', 'Life Below Water', 'Partnerships']
    },
    {
      id: 'CC-003',
      projectName: 'Amazon Rainforest Protection',
      projectType: 'Forest Conservation',
      location: 'Amazonas, Brazil',
      country: 'Brazil',
      credits: 2000,
      pricePerCredit: 22,
      totalPrice: 44000,
      vintage: 2023,
      verificationStandard: 'VCS + CCBA',
      rating: 4.9,
      reviews: 203,
      co2Reduced: 2000,
      projectImage: '/api/placeholder/400/300',
      description: 'REDD+ project protecting primary rainforest and indigenous communities',
      impactMetrics: {
        treesPlanted: 0,
        areaRestored: 10000,
        communitiesSupported: 25,
        jobsCreated: 300
      },
      certifications: ['VCS', 'CCBA', 'FSC'],
      seller: {
        name: 'Rainforest Alliance Brazil',
        rating: 4.8,
        verified: true
      },
      availability: 'High',
      sustainabilityGoals: ['Climate Action', 'Life on Land', 'Indigenous Rights']
    }
  ];

  const filteredCredits = carbonCredits.filter(credit => {
    const matchesSearch = credit.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         credit.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         credit.projectType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || credit.projectType === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const sortedCredits = [...filteredCredits].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.pricePerCredit - b.pricePerCredit;
      case 'rating':
        return b.rating - a.rating;
      case 'impact':
        return b.co2Reduced - a.co2Reduced;
      default:
        return 0;
    }
  });

  const addToCart = (creditId: string) => {
    if (!cart.includes(creditId)) {
      setCart([...cart, creditId]);
    }
  };

  const toggleWishlist = (creditId: string) => {
    if (wishlist.includes(creditId)) {
      setWishlist(wishlist.filter(id => id !== creditId));
    } else {
      setWishlist([...wishlist, creditId]);
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'High': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#ef4444';
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
    headerActions: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    },
    cartButton: {
      position: 'relative' as const,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      background: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    cartBadge: {
      position: 'absolute' as const,
      top: '-8px',
      right: '-8px',
      background: '#ef4444',
      color: 'white',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      fontSize: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
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
      outline: 'none'
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
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      background: 'white',
      cursor: 'pointer',
      fontSize: '0.875rem',
      transition: 'all 0.2s'
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
      gap: '1.5rem'
    },
    creditCard: {
      background: 'white',
      borderRadius: '1rem',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s ease'
    },
    creditImage: {
      width: '100%',
      height: '200px',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '3rem',
      position: 'relative' as const
    },
    creditContent: {
      padding: '1.5rem'
    },
    creditHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem'
    },
    creditTitle: {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '0.25rem'
    },
    creditLocation: {
      fontSize: '0.875rem',
      color: '#6b7280',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    wishlistButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#6b7280',
      transition: 'color 0.2s'
    },
    badge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: 600,
      color: 'white'
    },
    creditMetrics: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem',
      marginBottom: '1rem'
    },
    metric: {
      textAlign: 'center' as const
    },
    metricValue: {
      fontSize: '1.25rem',
      fontWeight: 700,
      color: '#1f2937'
    },
    metricLabel: {
      fontSize: '0.75rem',
      color: '#6b7280',
      textTransform: 'uppercase' as const
    },
    creditPrice: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      padding: '1rem',
      background: '#f8f9fa',
      borderRadius: '0.5rem'
    },
    priceValue: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#1f2937'
    },
    priceUnit: {
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    creditActions: {
      display: 'flex',
      gap: '0.5rem'
    },
    primaryButton: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      padding: '0.75rem',
      background: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    secondaryButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1rem',
      background: 'white',
      color: '#374151',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    ratingContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.5rem'
    },
    stars: {
      display: 'flex',
      gap: '0.1rem'
    },
    summary: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    },
    summaryCard: {
      background: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      textAlign: 'center' as const
    },
    summaryValue: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    summaryLabel: {
      fontSize: '0.875rem',
      color: '#6b7280'
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        fill={i < Math.floor(rating) ? '#f59e0b' : 'none'}
        color="#f59e0b"
      />
    ));
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          <ShoppingCart size={28} />
          Carbon Credit Marketplace
        </h1>
        <div style={styles.headerActions}>
          <button 
            style={styles.cartButton}
            onClick={() => alert(`Cart has ${cart.length} items`)}
          >
            <ShoppingCart size={16} />
            Cart
            {cart.length > 0 && (
              <span style={styles.cartBadge}>{cart.length}</span>
            )}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={styles.summary}>
        <div style={styles.summaryCard}>
          <div style={styles.summaryValue}>3,750</div>
          <div style={styles.summaryLabel}>Total Credits Available</div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryValue}>$25</div>
          <div style={styles.summaryLabel}>Average Price/Credit</div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryValue}>15</div>
          <div style={styles.summaryLabel}>Active Projects</div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryValue}>4.7★</div>
          <div style={styles.summaryLabel}>Average Rating</div>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filterSection}>
        <div style={styles.searchContainer}>
          <Search size={16} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search carbon credits, projects, or locations..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          style={styles.select}
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="All">All Project Types</option>
          <option value="Blue Carbon">Blue Carbon</option>
          <option value="Forest Conservation">Forest Conservation</option>
          <option value="Renewable Energy">Renewable Energy</option>
          <option value="Waste Management">Waste Management</option>
        </select>
        <select
          style={styles.select}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="price">Sort by Price</option>
          <option value="rating">Sort by Rating</option>
          <option value="impact">Sort by Impact</option>
        </select>
        <button style={styles.button}>
          <Filter size={16} />
          More Filters
        </button>
      </div>

      {/* Credits Grid */}
      <div style={styles.gridContainer}>
        {sortedCredits.map((credit) => (
          <div 
            key={credit.id} 
            style={styles.creditCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
            }}
          >
            <div style={{
              ...styles.creditImage,
              background: `linear-gradient(135deg, ${getProjectTypeColor(credit.projectType)} 0%, ${getProjectTypeColor(credit.projectType)}dd 100%)`
            }}>
              <Leaf size={48} />
              <button
                style={{
                  ...styles.wishlistButton,
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '50%',
                  padding: '0.5rem',
                  color: wishlist.includes(credit.id) ? '#ef4444' : '#6b7280'
                }}
                onClick={() => toggleWishlist(credit.id)}
              >
                <Heart size={16} fill={wishlist.includes(credit.id) ? 'currentColor' : 'none'} />
              </button>
              <span style={{
                ...styles.badge,
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                background: getProjectTypeColor(credit.projectType)
              }}>
                {credit.projectType}
              </span>
            </div>
            
            <div style={styles.creditContent}>
              <div style={styles.creditHeader}>
                <div>
                  <h3 style={styles.creditTitle}>{credit.projectName}</h3>
                  <div style={styles.creditLocation}>
                    <MapPin size={14} />
                    {credit.location}
                  </div>
                  <div style={styles.ratingContainer}>
                    <div style={styles.stars}>
                      {renderStars(credit.rating)}
                    </div>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {credit.rating} ({credit.reviews} reviews)
                    </span>
                  </div>
                </div>
                <div style={{
                  ...styles.badge,
                  background: getAvailabilityColor(credit.availability)
                }}>
                  {credit.availability}
                </div>
              </div>

              <div style={styles.creditMetrics}>
                <div style={styles.metric}>
                  <div style={styles.metricValue}>{credit.credits}</div>
                  <div style={styles.metricLabel}>Credits Available</div>
                </div>
                <div style={styles.metric}>
                  <div style={styles.metricValue}>{credit.co2Reduced}</div>
                  <div style={styles.metricLabel}>tCO₂e Reduced</div>
                </div>
                <div style={styles.metric}>
                  <div style={styles.metricValue}>{credit.vintage}</div>
                  <div style={styles.metricLabel}>Vintage Year</div>
                </div>
                <div style={styles.metric}>
                  <div style={styles.metricValue}>{credit.verificationStandard}</div>
                  <div style={styles.metricLabel}>Standard</div>
                </div>
              </div>

              <div style={styles.creditPrice}>
                <div>
                  <div style={styles.priceValue}>${credit.pricePerCredit}</div>
                  <div style={styles.priceUnit}>per credit</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                    ${credit.totalPrice.toLocaleString()}
                  </div>
                  <div style={styles.priceUnit}>total price</div>
                </div>
              </div>

              <div style={styles.creditActions}>
                <button 
                  style={styles.primaryButton}
                  onClick={() => addToCart(credit.id)}
                  disabled={cart.includes(credit.id)}
                >
                  {cart.includes(credit.id) ? (
                    <>
                      <CheckCircle size={16} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={16} />
                      Add to Cart
                    </>
                  )}
                </button>
                <button style={styles.secondaryButton}>
                  <Eye size={16} />
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedCredits.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#6b7280'
        }}>
          <AlertCircle size={48} style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>No credits found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default CorporateBuyerMarketplaceDashboard;
