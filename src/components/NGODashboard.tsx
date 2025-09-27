import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Sprout, 
  BarChart3, 
  Settings, 
  Menu,
  X,
  ChevronDown,
  FileText,
  ShoppingCart,
  LogOut,
  User,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Star,
  Heart,
  MapPin,
  Calendar,
  DollarSign,
  Eye,
  Grid3X3,
  List,
  SlidersHorizontal,
  Globe,
  Award,
  Users,
  TrendingUp,
  Camera,
  Play,
  ExternalLink
} from 'lucide-react';
import { AuthUtils } from '../utils/auth';
import { CurrencyUtils } from '../utils/currency';
import ProjectVerification from './ProjectVerification';
import ComplianceMonitoring from './ComplianceMonitoring';
import CommunitySupport from './CommunitySupport';
import ImpactReports from './ImpactReports';
import NGOWelcomePage from './NGOWelcomePage';
import NGOMore from './NGOMore';

const NGODashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('welcome');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Marketplace state management
  const [marketplaceTab, setMarketplaceTab] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    location: '',
    priceRange: [0, 1000],
    impactArea: ''
  });
  const [sortBy, setSortBy] = useState('latest');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Initialize mock user profile if not exists
    const currentUser = AuthUtils.getCurrentUser();
    if (!currentUser) {
      const mockUser = {
        id: 'ngo-001',
        name: 'Green Earth Foundation',
        email: 'ngo@example.com',
        role: 'ngo',
      };
      AuthUtils.saveUserProfile(mockUser);
    }
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-dropdown]')) {
        setIsMoreDropdownOpen(false);
        setIsProfileDropdownOpen(false);
      }
    };

    if (isMoreDropdownOpen || isProfileDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMoreDropdownOpen, isProfileDropdownOpen]);

  // Mock marketplace data
  const mockMarketplaceData = [
    {
      id: 1,
      title: "Mangrove Restoration Project",
      category: "Projects",
      ngo: "Ocean Conservation Foundation",
      verified: true,
      price: 250,
      type: "donation",
      impact: "500 mangroves planted",
      rating: 4.8,
      reviews: 124,
      status: "Verified",
      location: "Maharashtra, India",
      image: "/api/placeholder/300/200",
      description: "Help restore coastal mangrove ecosystems to protect marine biodiversity and prevent coastal erosion.",
      impactMetrics: {
        treesPlanted: 500,
        co2Offset: "120 tons",
        familiesSupported: 25,
        areaRestored: "50 hectares"
      }
    },
    {
      id: 2,
      title: "Organic Bamboo Fiber Products",
      category: "Products",
      ngo: "EcoFiber Initiative",
      verified: true,
      price: 45,
      type: "purchase",
      impact: "Supports 20 rural artisans",
      rating: 4.6,
      reviews: 89,
      status: "Approved",
      location: "Tamil Nadu, India",
      image: "/api/placeholder/300/200",
      description: "Sustainable bamboo products handcrafted by rural communities, supporting local livelihoods.",
      impactMetrics: {
        artisansSupported: 20,
        familiesSupported: 15,
        sustainableMaterials: "100%",
        wasteReduced: "2 tons"
      }
    },
    {
      id: 3,
      title: "Environmental Education Workshop",
      category: "Services",
      ngo: "Green Learning Hub",
      verified: false,
      price: 150,
      type: "service",
      impact: "Educates 100+ students",
      rating: 4.9,
      reviews: 67,
      status: "Pending",
      location: "Karnataka, India",
      image: "/api/placeholder/300/200",
      description: "Interactive workshops on climate change awareness and sustainable practices for schools and communities.",
      impactMetrics: {
        studentsEducated: 120,
        schoolsReached: 8,
        workshopsConducted: 15,
        awarenessReach: "5000 people"
      }
    },
    {
      id: 4,
      title: "Solar Panel Installation Program",
      category: "Projects",
      ngo: "Renewable Energy Collective",
      verified: true,
      price: 800,
      type: "donation",
      impact: "Powers 15 rural homes",
      rating: 4.7,
      reviews: 156,
      status: "Verified",
      location: "Rajasthan, India",
      image: "/api/placeholder/300/200",
      description: "Install solar panels in rural communities to provide clean, sustainable energy access.",
      impactMetrics: {
        homesElectrified: 15,
        co2Reduced: "50 tons/year",
        energyGenerated: "25 MWh",
        jobsCreated: 12
      }
    },
    {
      id: 5,
      title: "Youth Volunteer Program",
      category: "Volunteering",
      ngo: "Community Action Network",
      verified: true,
      price: 0,
      type: "volunteer",
      impact: "Join 200+ volunteers",
      rating: 4.5,
      reviews: 203,
      status: "Verified",
      location: "Delhi, India",
      image: "/api/placeholder/300/200",
      description: "Volunteer opportunities for youth to engage in community development and environmental conservation.",
      impactMetrics: {
        volunteersActive: 200,
        projectsCompleted: 45,
        communitiesServed: 12,
        hoursContributed: "5000+"
      }
    },
    {
      id: 6,
      title: "Handwoven Eco Textiles",
      category: "Products",
      ngo: "Textile Artisans Collective",
      verified: true,
      price: 120,
      type: "purchase",
      impact: "Preserves traditional crafts",
      rating: 4.8,
      reviews: 91,
      status: "Verified",
      location: "West Bengal, India",
      image: "/api/placeholder/300/200",
      description: "Beautiful handwoven textiles made using eco-friendly dyes and traditional techniques.",
      impactMetrics: {
        artisansSupported: 35,
        traditionsPreserved: 3,
        organicMaterials: "95%",
        wasteReduced: "1.5 tons"
      }
    }
  ];

  // Mock user's marketplace history
  const mockUserHistory = [
    {
      id: 1,
      itemName: "Mangrove Restoration Project",
      ngo: "Ocean Conservation Foundation",
      date: "2024-01-15",
      amount: 250,
      status: "Completed",
      impact: "Helped plant 50 mangroves 🌱"
    },
    {
      id: 2,
      itemName: "Organic Bamboo Products",
      ngo: "EcoFiber Initiative",
      date: "2024-01-10",
      amount: 45,
      status: "Delivered",
      impact: "Supported 2 rural artisans 👥"
    },
    {
      id: 3,
      itemName: "Solar Panel Installation",
      ngo: "Renewable Energy Collective",
      date: "2024-01-05",
      amount: 800,
      status: "In Progress",
      impact: "Will power 1.5 homes with clean energy ⚡"
    }
  ];

  // Navigation configuration with main menu items (logout moved to profile dropdown)
  const navigationConfig = {
    main: [
      { id: 'welcome', label: 'Welcome', icon: <Home size={16} /> },
      { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={16} /> },
      { id: 'projects', label: 'Projects', icon: <Sprout size={16} /> },
      { id: 'marketplace', label: 'Marketplace', icon: <ShoppingCart size={16} /> },
      { id: 'reporting', label: 'Reporting', icon: <FileText size={16} /> }
    ]
  };

  const handleTabClick = (tabId: string) => {
    if (tabId === 'logout') {
      // Handle logout functionality
      AuthUtils.logout();
      navigate('/');
      return;
    }
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    setIsMoreDropdownOpen(false);
  };

  // Filter marketplace data based on selected filters and search
  const filteredMarketplaceData = mockMarketplaceData.filter(item => {
    const matchesTab = marketplaceTab === 'all' || 
                      item.category.toLowerCase() === marketplaceTab ||
                      (marketplaceTab === 'donations' && item.type === 'donation') ||
                      (marketplaceTab === 'volunteering' && item.category === 'Volunteering');
    
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.ngo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedFilters.category || item.category === selectedFilters.category;
    const matchesLocation = !selectedFilters.location || item.location.includes(selectedFilters.location);
    const matchesPrice = item.price >= selectedFilters.priceRange[0] && item.price <= selectedFilters.priceRange[1];
    
    return matchesTab && matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  // Sort marketplace data
  const sortedMarketplaceData = [...filteredMarketplaceData].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return b.id - a.id;
      case 'popularity':
        return b.reviews - a.reviews;
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  // Main marketplace component
  const renderMarketplace = () => (
    <div style={styles.marketplaceContainer}>
      {/* Marketplace Header */}
      <div style={styles.marketplaceHeader}>
        <div style={styles.marketplaceHeaderPattern}></div>
        <h1 style={styles.marketplaceTitle}>🌍 NGO Marketplace</h1>
        <p style={styles.marketplaceSubtitle}>
          Browse, support, and engage with impact-driven projects, products, and services.
        </p>
      </div>

      {/* User Impact Dashboard */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#0f172a',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <TrendingUp size={24} style={{ color: '#10b981' }} />
          Your Impact Dashboard
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {mockUserHistory.map(item => (
            <div
              key={item.id}
              style={{
                background: 'rgba(16, 185, 129, 0.05)',
                border: '1px solid rgba(16, 185, 129, 0.1)',
                borderRadius: '16px',
                padding: '1.5rem',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  marginBottom: '0.5rem'
                }}>
                  {item.itemName}
                </h3>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  background: item.status === 'Completed' ? 'rgba(34, 197, 94, 0.1)' : 
                             item.status === 'Delivered' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                  color: item.status === 'Completed' ? '#16a34a' : 
                        item.status === 'Delivered' ? '#2563eb' : '#d97706'
                }}>
                  {item.status}
                </span>
              </div>
              
              <p style={{
                fontSize: '0.875rem',
                color: '#64748b',
                marginBottom: '0.5rem'
              }}>
                {item.ngo} • {item.date}
              </p>
              
              <div style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                color: '#10b981',
                marginBottom: '1rem'
              }}>
                ₹{item.amount}
              </div>
              
              <div style={{
                padding: '12px',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '12px',
                fontSize: '0.875rem',
                color: '#059669',
                fontWeight: 500
              }}>
                {item.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marketplace Controls */}
      <div style={styles.marketplaceControls}>
        {/* Navigation Tabs */}
        <div style={styles.marketplaceNavTabs}>
          {[
            { id: 'all', label: 'All Listings' },
            { id: 'projects', label: 'Projects' },
            { id: 'products', label: 'Products' },
            { id: 'services', label: 'Services' },
            { id: 'donations', label: 'Donations' },
            { id: 'volunteering', label: 'Volunteering' }
          ].map(tab => (
            <button
              key={tab.id}
              style={{
                ...styles.marketplaceTab,
                ...(marketplaceTab === tab.id ? styles.marketplaceTabActive : {})
              }}
              onClick={() => setMarketplaceTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Search and Actions Row */}
        <div style={styles.marketplaceSearchRow}>
          <div style={styles.marketplaceSearchBox}>
            <Search size={18} style={styles.marketplaceSearchIcon} />
            <input
              type="text"
              placeholder="Search projects, products, or services..."
              style={styles.marketplaceSearchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button style={styles.marketplaceButton}>
            <Filter size={16} />
            Filter
          </button>
          
          <select
            style={styles.marketplaceButton}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="popularity">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          
          <button
            style={styles.marketplaceButton}
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List size={16} /> : <Grid3X3 size={16} />}
            {viewMode === 'grid' ? 'List' : 'Grid'}
          </button>
          
          <button
            style={{
              ...styles.marketplaceButton,
              ...styles.marketplaceButtonPrimary
            }}
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={16} />
            Create Listing
          </button>
        </div>
      </div>
      
      {/* Marketplace Listings */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#0f172a'
        }}>
          {marketplaceTab === 'all' ? 'All Listings' : 
           marketplaceTab.charAt(0).toUpperCase() + marketplaceTab.slice(1)} ({sortedMarketplaceData.length})
        </h2>
      </div>
      
      <div style={viewMode === 'grid' ? styles.marketplaceGrid : {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1rem'
      }}>
        {sortedMarketplaceData.map(item => (
          <div 
            key={item.id}
            style={styles.marketplaceCard}
            onClick={() => {
              setSelectedItem(item);
              setShowDetailsModal(true);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 48px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
            }}
          >
            <div style={styles.marketplaceCardImage}>
              {item.category === 'Projects' ? '🌱' : 
               item.category === 'Products' ? '🛍️' :
               item.category === 'Services' ? '🎯' :
               item.category === 'Volunteering' ? '🤝' : '💚'}
              <div style={{
                position: 'absolute' as const,
                top: '1rem',
                right: '1rem',
                display: 'flex',
                gap: '0.5rem'
              }}>
                <button
                  style={{
                    padding: '6px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.9)',
                    cursor: 'pointer',
                    color: '#64748b',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('Edit functionality would be implemented here!');
                  }}
                >
                  <Edit size={14} />
                </button>
                <button
                  style={{
                    padding: '6px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.9)',
                    cursor: 'pointer',
                    color: '#ef4444',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('Delete functionality would be implemented here!');
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            
            <div style={styles.marketplaceCardContent}>
              <div style={styles.marketplaceCardHeader}>
                <div>
                  <h3 style={styles.marketplaceCardTitle}>{item.title}</h3>
                  <div style={styles.marketplaceCardNgo}>
                    {item.ngo}
                    {item.verified && <Award size={14} style={{ color: '#10b981' }} />}
                  </div>
                </div>
                <div style={{
                  ...styles.marketplaceCardBadge,
                  ...(item.status === 'Verified' ? styles.marketplaceCardVerified : styles.marketplaceCardPending)
                }}>
                  {item.status}
                </div>
              </div>
              
              <div style={styles.marketplaceCardMeta}>
                <div style={styles.marketplaceCardRating}>
                  <Star size={14} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                  <span>{item.rating}</span>
                  <span>({item.reviews})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} />
                  <span>{item.location.split(',')[0]}</span>
                </div>
              </div>
              
              <div style={styles.marketplaceCardImpact}>
                {item.impact}
              </div>
              
              <div style={styles.marketplaceCardActions}>
                <div style={styles.marketplaceCardPrice}>
                  {item.price === 0 ? 'Free' : `₹${item.price}`}
                </div>
                <button
                  style={{
                    ...styles.marketplaceCardButton,
                    ...styles.marketplaceCardButtonPrimary
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(item);
                    setShowPaymentModal(true);
                  }}
                >
                  {item.type === 'donation' ? 'Donate' :
                   item.type === 'volunteer' ? 'Join' :
                   item.type === 'service' ? 'Book' : 'Buy'}
                </button>
                <button
                  style={{
                    padding: '10px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('Add to favorites functionality would be implemented here!');
                  }}
                >
                  <Heart size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {sortedMarketplaceData.length === 0 && (
        <div style={{
          textAlign: 'center' as const,
          padding: '4rem 2rem',
          color: '#64748b'
        }}>
          <Globe size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            marginBottom: '0.5rem'
          }}>
            No listings found
          </h3>
          <p>Try adjusting your search or filters to find more results.</p>
        </div>
      )}

      {/* Simple Create Modal */}
      {showCreateModal && (
        <div style={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Create New Listing</h2>
              <button
                style={styles.modalCloseButton}
                onClick={() => setShowCreateModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <input
                type="text"
                placeholder="Enter project/product/service title"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid rgba(226, 232, 240, 0.6)',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <select style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid rgba(226, 232, 240, 0.6)',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}>
                  <option>Projects</option>
                  <option>Products</option>
                  <option>Services</option>
                  <option>Volunteering</option>
                </select>
                
                <input
                  type="number"
                  placeholder="Price (₹)"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '2px solid rgba(226, 232, 240, 0.6)',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
              </div>
              
              <textarea
                placeholder="Describe your project, product, or service..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid rgba(226, 232, 240, 0.6)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  resize: 'vertical' as const
                }}
              />
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  style={{
                    padding: '12px 24px',
                    borderRadius: '12px',
                    border: '2px solid rgba(226, 232, 240, 0.6)',
                    background: 'transparent',
                    color: '#64748b',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button
                  style={{
                    padding: '12px 24px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    alert('Listing created! (This is a prototype)');
                    setShowCreateModal(false);
                  }}
                >
                  Create Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Item Details Modal */}
      {showDetailsModal && selectedItem && (
        <div style={styles.modalOverlay} onClick={() => setShowDetailsModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>{selectedItem.title}</h2>
              <button
                style={styles.modalCloseButton}
                onClick={() => setShowDetailsModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{
                height: '250px',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
                color: '#059669'
              }}>
                {selectedItem.category === 'Projects' ? '🌱' : 
                 selectedItem.category === 'Products' ? '🛍️' :
                 selectedItem.category === 'Services' ? '🎯' :
                 selectedItem.category === 'Volunteering' ? '🤝' : '💚'}
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: '1rem'
                  }}>
                    About this {selectedItem.category.toLowerCase().slice(0, -1)}
                  </h3>
                  <p style={{
                    color: '#64748b',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem'
                  }}>
                    {selectedItem.description}
                  </p>
                  
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#0f172a',
                    marginBottom: '1rem'
                  }}>
                    Impact Metrics
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1rem'
                  }}>
                    {Object.entries(selectedItem.impactMetrics).map(([key, value]) => (
                      <div
                        key={key}
                        style={{
                          padding: '1rem',
                          background: 'rgba(16, 185, 129, 0.05)',
                          borderRadius: '12px',
                          border: '1px solid rgba(16, 185, 129, 0.1)'
                        }}
                      >
                        <div style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: '#10b981',
                          marginBottom: '0.25rem'
                        }}>
                          {String(value)}
                        </div>
                        <div style={{
                          fontSize: '0.875rem',
                          color: '#64748b',
                          textTransform: 'capitalize' as const
                        }}>
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.05)',
                    border: '1px solid rgba(16, 185, 129, 0.1)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#0f172a',
                      marginBottom: '1rem'
                    }}>
                      {selectedItem.ngo}
                    </h4>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '1rem'
                    }}>
                      <Award size={16} style={{ color: '#10b981' }} />
                      <span style={{
                        fontSize: '0.875rem',
                        color: selectedItem.verified ? '#10b981' : '#f59e0b',
                        fontWeight: 600
                      }}>
                        {selectedItem.verified ? 'Verified NGO' : 'Verification Pending'}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: '#10b981',
                    textAlign: 'center' as const,
                    marginBottom: '1rem'
                  }}>
                    {selectedItem.price === 0 ? 'Free' : `₹${selectedItem.price}`}
                  </div>
                  
                  <button
                    style={{
                      width: '100%',
                      padding: '16px 24px',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      marginBottom: '1rem'
                    }}
                    onClick={() => {
                      setShowDetailsModal(false);
                      setShowPaymentModal(true);
                    }}
                  >
                    {selectedItem.type === 'donation' ? 'Donate Now' :
                     selectedItem.type === 'volunteer' ? 'Join Now' :
                     selectedItem.type === 'service' ? 'Book Now' : 'Buy Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedItem && (
        <div style={styles.modalOverlay} onClick={() => setShowPaymentModal(false)}>
          <div 
            style={{
              ...styles.modal,
              maxWidth: '500px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Select Payment Option</h2>
              <button
                style={styles.modalCloseButton}
                onClick={() => setShowPaymentModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ textAlign: 'center' as const, marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#0f172a',
                marginBottom: '0.5rem'
              }}>
                {selectedItem.title}
              </h3>
              <div style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: '#10b981'
              }}>
                {selectedItem.price === 0 ? 'Free' : `₹${selectedItem.price}`}
              </div>
            </div>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <button
                style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  border: '2px solid rgba(16, 185, 129, 0.3)',
                  background: 'rgba(16, 185, 129, 0.05)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => {
                  setShowPaymentModal(false);
                  alert('Digital Wallet payment integration would go here!');
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  💳
                </div>
                <div style={{ textAlign: 'left' as const }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#0f172a',
                    marginBottom: '0.25rem'
                  }}>
                    Digital Wallet
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                    Pay instantly with your digital wallet
                  </p>
                </div>
              </button>
              
              <button
                style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  border: '2px solid rgba(59, 130, 246, 0.3)',
                  background: 'rgba(59, 130, 246, 0.05)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => {
                  setShowPaymentModal(false);
                  alert('Bank Transfer/UPI payment integration would go here!');
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  🏦
                </div>
                <div style={{ textAlign: 'left' as const }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#0f172a',
                    marginBottom: '0.25rem'
                  }}>
                    Bank Transfer / UPI
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                    Pay via bank transfer or UPI
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const styles = {
    container: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 30%, #f1f5f9 100%)',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      position: 'relative' as const,
      overflow: 'hidden' as const
    },
    backgroundPattern: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.02,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.08'%3E%3Ccircle cx='40' cy='40' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      pointerEvents: 'none' as const
    },
    main: {
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '0 1rem 2rem',
      position: 'relative' as const,
      zIndex: 1
    },
    // Professional Navigation Header with Fixed Layout
    navigation: {
      position: 'sticky' as const,
      top: 0,
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
      borderBottom: '1px solid rgba(226, 232, 240, 0.5)',
      marginBottom: '0',
      width: '100%'
    },
    navContainer: {
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '0 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '80px',
      gap: '1rem',
      overflow: 'visible',
      position: 'relative' as const
    },
    // Left: Logo & App Name - Fixed width
    brandSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      minWidth: '240px',
      flex: '0 0 auto'
    },
    logoContainer: {
      width: '48px',
      height: '48px',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 16px rgba(16, 185, 129, 0.25)',
      transition: 'all 0.3s ease',
      flexShrink: 0
    },
    logoIcon: {
      fontSize: '1.5rem',
      color: 'white',
      fontWeight: 'bold'
    },
    appNameContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '2px'
    },
    appName: {
      fontSize: '1.375rem',
      fontWeight: 800,
      color: '#0f172a',
      letterSpacing: '-0.025em',
      lineHeight: 1.1,
      whiteSpace: 'nowrap' as const
    },
    appSubtitle: {
      fontSize: '0.75rem',
      color: '#64748b',
      fontWeight: 600,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      whiteSpace: 'nowrap' as const
    },
    // Center: Navigation Menu - Flex grow with centered content
    centerNav: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '1 1 auto',
      gap: '8px',
      padding: '0 1rem',
      overflow: 'hidden'
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 16px',
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: '14px',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap' as const,
      background: 'transparent',
      color: '#64748b',
      border: 'none',
      borderRadius: '10px',
      margin: '0 2px',
      lineHeight: 1,
      height: '40px',
      position: 'relative' as const,
      textDecoration: 'none',
      minWidth: 'auto'
    },
    navItemActive: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
      transform: 'translateY(-1px)'
    },
    navItemHover: {
      background: 'rgba(16, 185, 129, 0.1)',
      color: '#059669',
      transform: 'translateY(-1px)'
    },
    // Right: Profile & Notifications - Fixed width, proper alignment
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      minWidth: '240px',
      flex: '0 0 auto',
      justifyContent: 'flex-end'
    },
    notificationButton: {
      position: 'relative' as const,
      width: '44px',
      height: '44px',
      background: 'rgba(248, 250, 252, 0.8)',
      border: '1px solid rgba(226, 232, 240, 0.6)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: '#64748b'
    },
    notificationBadge: {
      position: 'absolute' as const,
      top: '-2px',
      right: '-2px',
      width: '18px',
      height: '18px',
      background: '#ef4444',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
      fontWeight: 700,
      color: 'white',
      border: '2px solid white'
    },
    profileContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(226, 232, 240, 0.7)',
      borderRadius: '20px',
      padding: '10px 18px',
      cursor: 'pointer',
      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative' as const,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
    },
    profileAvatar: {
      width: '44px',
      height: '44px',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      borderRadius: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 700,
      fontSize: '0.9rem',
      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
    },
    profileInfo: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '3px',
      minWidth: 0,
      flex: 1
    },
    profileName: {
      fontSize: '0.9rem',
      fontWeight: 600, // Medium weight for name
      color: '#0f172a',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      whiteSpace: 'nowrap' as const,
      overflow: 'hidden' as const,
      textOverflow: 'ellipsis' as const
    },
    profileRole: {
      fontSize: '0.775rem',
      color: '#64748b',
      fontWeight: 500, // Medium weight for role
      textTransform: 'capitalize' as const,
      letterSpacing: '0.01em'
    },
    profileDropdown: {
      position: 'absolute' as const,
      top: '100%',
      right: '0',
      marginTop: '10px',
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderRadius: '20px',
      padding: '12px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      zIndex: 1000,
      minWidth: '260px',
      maxWidth: '320px',
      opacity: 0,
      visibility: 'hidden' as const,
      transform: 'translateY(-12px) scale(0.95)',
      transformOrigin: 'top right',
      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      // Professional elevation
      overflow: 'hidden' as const
    },
    profileDropdownOpen: {
      opacity: 1,
      visibility: 'visible' as const,
      transform: 'translateY(0) scale(1)'
    },
    profileDropdownHeader: {
      padding: '16px 20px',
      borderBottom: '1px solid rgba(226, 232, 240, 0.4)',
      marginBottom: '12px',
      background: 'rgba(248, 250, 252, 0.5)',
      borderRadius: '12px',
      margin: '0 0 12px 0'
    },
    profileDropdownHeaderName: {
      fontSize: '0.95rem',
      fontWeight: 600, // Medium weight for header name
      color: '#0f172a',
      lineHeight: 1.2,
      marginBottom: '4px'
    },
    profileDropdownHeaderRole: {
      fontSize: '0.8rem',
      color: '#64748b',
      fontWeight: 500, // Medium weight for header role
      textTransform: 'capitalize' as const
    },
    profileDropdownItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '14px 20px',
      borderRadius: '12px',
      cursor: 'pointer',
      fontWeight: 400, // Regular weight for menu options
      fontSize: '0.875rem',
      transition: 'all 0.25s ease',
      background: 'transparent',
      color: '#374151',
      border: 'none',
      width: '100%',
      textAlign: 'left' as const,
      position: 'relative' as const,
      marginBottom: '4px'
    },
    profileDropdownItemIcon: {
      width: '18px',
      height: '18px',
      flexShrink: 0,
      transition: 'all 0.25s ease'
    },
    profileDropdownItemHover: {
      background: 'rgba(16, 185, 129, 0.08)',
      color: '#059669',
      transform: 'translateX(2px)'
    },
    profileDropdownDivider: {
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(226, 232, 240, 0.6), transparent)',
      margin: '8px 12px',
      border: 'none'
    },
    profileDropdownLogout: {
      color: '#ef4444',
      fontWeight: 500
    },
    profileDropdownLogoutHover: {
      background: 'rgba(239, 68, 68, 0.08)',
      color: '#dc2626'
    },
    // Marketplace Styles
    marketplaceContainer: {
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    marketplaceHeader: {
      background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
      borderRadius: '24px',
      padding: '3rem 2.5rem',
      color: 'white',
      marginBottom: '2rem',
      position: 'relative' as const,
      overflow: 'hidden' as const
    },
    marketplaceHeaderPattern: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
      pointerEvents: 'none' as const
    },
    marketplaceTitle: {
      fontSize: '3rem',
      fontWeight: 800,
      marginBottom: '0.75rem',
      letterSpacing: '-0.02em',
      position: 'relative' as const,
      zIndex: 1
    },
    marketplaceSubtitle: {
      fontSize: '1.25rem',
      opacity: 0.9,
      fontWeight: 400,
      position: 'relative' as const,
      zIndex: 1,
      maxWidth: '600px'
    },
    marketplaceControls: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '1.5rem 2rem',
      marginBottom: '2rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.8)'
    },
    marketplaceNavTabs: {
      display: 'flex',
      gap: '8px',
      marginBottom: '1.5rem',
      flexWrap: 'wrap' as const
    },
    marketplaceTab: {
      padding: '12px 24px',
      borderRadius: '12px',
      border: 'none',
      background: 'transparent',
      color: '#64748b',
      fontWeight: 600,
      fontSize: '0.875rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap' as const
    },
    marketplaceTabActive: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)'
    },
    marketplaceSearchRow: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      flexWrap: 'wrap' as const,
      marginBottom: '1rem'
    },
    marketplaceSearchBox: {
      flex: '1 1 300px',
      position: 'relative' as const,
      minWidth: '250px'
    },
    marketplaceSearchInput: {
      width: '100%',
      padding: '12px 16px 12px 48px',
      borderRadius: '12px',
      border: '2px solid rgba(226, 232, 240, 0.6)',
      background: 'rgba(248, 250, 252, 0.8)',
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#374151',
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    marketplaceSearchIcon: {
      position: 'absolute' as const,
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#64748b',
      pointerEvents: 'none' as const
    },
    marketplaceButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 20px',
      borderRadius: '12px',
      border: 'none',
      background: 'rgba(248, 250, 252, 0.8)',
      color: '#374151',
      fontWeight: 600,
      fontSize: '0.875rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap' as const
    },
    marketplaceButtonPrimary: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      boxShadow: '0 4px 16px rgba(16, 185, 129, 0.25)'
    },
    marketplaceGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '2rem',
      marginTop: '2rem'
    },
    marketplaceCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      overflow: 'hidden' as const,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)'
    },
    marketplaceCardImage: {
      width: '100%',
      height: '200px',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#059669',
      fontSize: '3rem',
      position: 'relative' as const,
      overflow: 'hidden' as const
    },
    marketplaceCardContent: {
      padding: '1.5rem'
    },
    marketplaceCardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem'
    },
    marketplaceCardTitle: {
      fontSize: '1.125rem',
      fontWeight: 700,
      color: '#0f172a',
      marginBottom: '0.5rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em'
    },
    marketplaceCardNgo: {
      fontSize: '0.875rem',
      color: '#64748b',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    marketplaceCardBadge: {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: 600,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.025em'
    },
    marketplaceCardVerified: {
      background: 'rgba(34, 197, 94, 0.1)',
      color: '#16a34a',
      border: '1px solid rgba(34, 197, 94, 0.2)'
    },
    marketplaceCardPending: {
      background: 'rgba(245, 158, 11, 0.1)',
      color: '#d97706',
      border: '1px solid rgba(245, 158, 11, 0.2)'
    },
    marketplaceCardMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem',
      fontSize: '0.875rem',
      color: '#64748b'
    },
    marketplaceCardRating: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    marketplaceCardImpact: {
      background: 'rgba(16, 185, 129, 0.1)',
      color: '#059669',
      padding: '8px 12px',
      borderRadius: '8px',
      fontSize: '0.8rem',
      fontWeight: 600,
      marginBottom: '1rem'
    },
    marketplaceCardActions: {
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'center'
    },
    marketplaceCardPrice: {
      fontSize: '1.25rem',
      fontWeight: 700,
      color: '#059669'
    },
    marketplaceCardButton: {
      padding: '10px 18px',
      borderRadius: '10px',
      border: 'none',
      fontWeight: 600,
      fontSize: '0.875rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    marketplaceCardButtonPrimary: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white'
    },
    // Modal Styles
    modalOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    },
    modal: {
      background: 'rgba(255, 255, 255, 0.98)',
      borderRadius: '24px',
      padding: '2rem',
      maxWidth: '800px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto' as const,
      boxShadow: '0 24px 64px rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: '1px solid rgba(255, 255, 255, 0.8)'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid rgba(226, 232, 240, 0.5)'
    },
    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#0f172a'
    },
    modalCloseButton: {
      padding: '8px',
      borderRadius: '8px',
      border: 'none',
      background: 'rgba(248, 250, 252, 0.8)',
      cursor: 'pointer',
      color: '#64748b',
      transition: 'all 0.3s ease'
    },
    // Mobile Menu Button
    mobileMenuButton: {
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      width: '44px',
      height: '44px',
      background: 'rgba(248, 250, 252, 0.8)',
      border: '1px solid rgba(226, 232, 240, 0.6)',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: '#0f172a'
    },
    mobileNav: {
      position: 'absolute' as const,
      top: '100%',
      left: '0',
      right: '0',
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(226, 232, 240, 0.6)',
      padding: '1.5rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      zIndex: 99
    },
    mobileNavItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '16px 20px',
      borderRadius: '12px',
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: '15px',
      transition: 'all 0.3s ease',
      background: 'transparent',
      color: '#64748b',
      border: 'none',
      marginBottom: '8px',
      width: '100%',
      textAlign: 'left' as const
    },
    mobileNavItemActive: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)'
    },
    // Welcome Section & Main Content
    welcomeSection: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      borderRadius: '20px',
      padding: '2.5rem',
      margin: '2rem 0 3rem',
      color: 'white',
      position: 'relative' as const,
      overflow: 'hidden' as const
    },
    welcomePattern: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      pointerEvents: 'none' as const
    },
    welcomeContent: {
      position: 'relative' as const,
      zIndex: 1
    },
    welcomeTitle: {
      fontSize: '2.5rem',
      fontWeight: 800,
      marginBottom: '0.5rem',
      letterSpacing: '-0.025em'
    },
    welcomeSubtitle: {
      fontSize: '1.125rem',
      opacity: 0.9,
      fontWeight: 400,
      margin: 0
    },
    // Dashboard Cards Grid
    statsSection: {
      marginBottom: '3rem'
    },
    sectionTitle: {
      fontSize: '1.75rem',
      fontWeight: 700,
      color: '#0f172a',
      marginBottom: '1.5rem',
      textAlign: 'center' as const,
      letterSpacing: '-0.025em'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '2rem',
      marginBottom: '3rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '20px',
      padding: '2.5rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
      transition: 'all 0.4s ease',
      cursor: 'pointer',
      position: 'relative' as const,
      overflow: 'hidden' as const
    },
    statCardHover: {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: '0 20px 48px rgba(0, 0, 0, 0.15)'
    },
    statIcon: {
      width: '80px',
      height: '80px',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2.5rem',
      fontWeight: 'normal',
      flexShrink: 0,
      position: 'relative' as const,
      overflow: 'hidden' as const
    },
    statIconProjects: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white'
    },
    statIconCommunities: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: 'white'
    },
    statIconReports: {
      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      color: 'white'
    },
    statIconEarnings: {
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      color: 'white'
    },
    statContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '8px'
    },
    statNumber: {
      fontSize: '3rem',
      fontWeight: 800,
      lineHeight: 1,
      letterSpacing: '-0.025em'
    },
    statNumberGreen: {
      color: '#059669'
    },
    statNumberBlue: {
      color: '#3b82f6'
    },
    statNumberPurple: {
      color: '#8b5cf6'
    },
    statNumberOrange: {
      color: '#f59e0b'
    },
    statLabel: {
      fontSize: '1rem',
      color: '#64748b',
      fontWeight: 600,
      letterSpacing: '0.005em'
    },
    currencyConversion: {
      fontSize: '0.875rem',
      color: '#94a3b8',
      fontWeight: 400,
      marginTop: '4px'
    },
    // Recent Activity Section
    activitySection: {
      background: 'rgba(255, 255, 255, 0.7)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      marginTop: '3rem'
    },
    activityTitle: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#0f172a',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    activityGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem'
    },
    activityCard: {
      background: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '12px',
      padding: '1.5rem',
      border: '1px solid rgba(226, 232, 240, 0.5)',
      transition: 'all 0.3s ease'
    },
    activityCardHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
    },
    activityHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '12px'
    },
    activityIcon: {
      width: '36px',
      height: '36px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1rem'
    },
    activityMeta: {
      flex: 1
    },
    activityTime: {
      fontSize: '0.75rem',
      color: '#94a3b8',
      fontWeight: 500
    },
    activityTitle2: {
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#0f172a',
      margin: '2px 0 0 0'
    },
    activityDescription: {
      fontSize: '0.875rem',
      color: '#64748b',
      lineHeight: 1.5,
      margin: 0
    },
    // Enhanced Main Content Styles
    mainContent: {
      background: activeTab === 'more' || activeTab === 'welcome' ? 'transparent' : 'rgba(255, 255, 255, 0.7)',
      borderRadius: activeTab === 'more' || activeTab === 'welcome' ? '0' : '20px',
      padding: activeTab === 'more' || activeTab === 'welcome' ? '0' : '2rem',
      boxShadow: activeTab === 'more' || activeTab === 'welcome' ? 'none' : '0 8px 40px rgba(0, 0, 0, 0.08)',
      border: activeTab === 'more' || activeTab === 'welcome' ? 'none' : '1px solid rgba(255, 255, 255, 0.8)',
      backdropFilter: activeTab === 'more' || activeTab === 'welcome' ? 'none' : 'blur(20px)',
      WebkitBackdropFilter: activeTab === 'more' || activeTab === 'welcome' ? 'none' : 'blur(20px)',
      minHeight: '60vh'
    },
    // Professional Dashboard Cards
    dashboardHeader: {
      marginBottom: '2.5rem',
      textAlign: 'center' as const
    },
    dashboardTitle: {
      fontSize: '2.5rem',
      fontWeight: 800,
      background: 'linear-gradient(135deg, #0f172a 0%, #64748b 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem',
      letterSpacing: '-0.03em'
    },
    dashboardSubtitle: {
      fontSize: '1.125rem',
      color: '#64748b',
      fontWeight: 400,
      letterSpacing: '0.01em'
    }
  };

  const renderNavItem = (item: any, isActive: boolean, isMobile = false) => {
    const baseStyle = isMobile ? styles.mobileNavItem : styles.navItem;
    const activeStyle = isMobile ? styles.mobileNavItemActive : styles.navItemActive;
    
    return (
      <button
        key={item.id}
        style={{
          ...baseStyle,
          ...(isActive ? activeStyle : {})
        }}
        onClick={() => handleTabClick(item.id)}
        onMouseEnter={(e) => {
          if (!isActive && !isMobile) {
            Object.assign(e.currentTarget.style, styles.navItemHover);
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive && !isMobile) {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#64748b';
            e.currentTarget.style.transform = 'translateY(0)';
          }
        }}
      >
        {item.icon}
        <span>{item.label}</span>
      </button>
    );
  };

  const renderMobileNavigation = () => {
    return (
      <div style={styles.mobileNav}>
        {/* Mobile Profile Section with Professional Styling */}
        <div style={{ 
          marginBottom: '1.5rem', 
          paddingBottom: '1.5rem', 
          borderBottom: '1px solid rgba(226, 232, 240, 0.4)' 
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '16px 20px',
            background: 'rgba(16, 185, 129, 0.06)',
            borderRadius: '16px',
            marginBottom: '1.5rem',
            border: '1px solid rgba(16, 185, 129, 0.1)'
          }}>
            <div style={{
              ...styles.profileAvatar,
              width: '48px',
              height: '48px',
              fontSize: '1rem'
            }}>
              {AuthUtils.getCurrentUser()?.name?.charAt(0) || 'N'}
            </div>
            <div style={styles.profileInfo}>
              <div style={{
                ...styles.profileName,
                fontSize: '1rem',
                fontWeight: 600 // Medium weight for name
              }}>
                {AuthUtils.getCurrentUser()?.name || 'NGO User'}
              </div>
              <div style={{
                ...styles.profileRole,
                fontSize: '0.85rem',
                fontWeight: 500 // Medium weight for role
              }}>NGO Representative</div>
            </div>
          </div>
          
          {/* Mobile Profile Actions with Professional Styling */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column' as const, 
            gap: '6px',
            background: 'rgba(248, 250, 252, 0.5)',
            borderRadius: '12px',
            padding: '12px'
          }}>
            <button style={{
              ...styles.profileDropdownItem,
              marginBottom: '6px',
              padding: '16px 20px',
              borderRadius: '10px',
              fontWeight: 400, // Regular weight for menu options
              fontSize: '0.9rem'
            }}>
              <User size={18} style={styles.profileDropdownItemIcon} />
              <span>View Profile</span>
            </button>
            <button style={{
              ...styles.profileDropdownItem,
              marginBottom: '6px',
              padding: '16px 20px',
              borderRadius: '10px',
              fontWeight: 400, // Regular weight for menu options
              fontSize: '0.9rem'
            }}>
              <Settings size={18} style={styles.profileDropdownItemIcon} />
              <span>Settings</span>
            </button>
            
            {/* Mobile Notifications */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px', 
              padding: '16px 20px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(226, 232, 240, 0.3)',
              marginTop: '8px'
            }}>
              <span style={{ fontSize: '1.125rem' }}>🔔</span>
              <span style={{ 
                fontSize: '0.9rem', 
                color: '#374151',
                fontWeight: 400,
                flex: 1
              }}>Notifications</span>
              <span style={{
                fontSize: '11px',
                background: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                border: '2px solid white',
                boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
              }}>3</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#64748b',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.5px',
            marginBottom: '0.75rem',
            paddingLeft: '0.5rem'
          }}>Navigation</div>
          {navigationConfig.main.map((item) => 
            renderNavItem(item, activeTab === item.id, true)
          )}
          
          {/* Mobile Logout Button with Professional Styling */}
          <button 
            style={{
              ...styles.mobileNavItem,
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: 'white',
              marginTop: '1.5rem',
              borderRadius: '14px',
              padding: '16px 20px',
              boxShadow: '0 6px 20px rgba(239, 68, 68, 0.25)',
              fontWeight: 500,
              fontSize: '0.9rem',
              transition: 'all 0.3s ease'
            }}
            onClick={() => {
              AuthUtils.logout();
              navigate('/');
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.transform = 'translateY(2px)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(239, 68, 68, 0.3)';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.25)';
            }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'welcome':
        return (
          <>
            {/* Welcome Section with Professional Styling */}
            <div style={styles.welcomeSection}>
              <div style={styles.welcomePattern}></div>
              <div style={styles.welcomeContent}>
                <h1 style={styles.welcomeTitle}>
                  Welcome back, {AuthUtils.getCurrentUser()?.name || 'NGO Representative'}!
                </h1>
                <p style={styles.welcomeSubtitle}>
                  Monitor your impact, verify projects, and support communities through our comprehensive NGO dashboard
                </p>
              </div>
            </div>
            <NGOWelcomePage />
          </>
        );
      case 'projects':
        return <ProjectVerification />;
      case 'marketplace':
        return renderMarketplace();
      case 'reporting':
        return <ImpactReports />;
      case 'dashboard':
      default:
        return (
          <>
            {/* Professional Welcome Section */}
            <div style={styles.welcomeSection}>
              <div style={styles.welcomePattern}></div>
              <div style={styles.welcomeContent}>
                <h1 style={styles.welcomeTitle}>
                  Welcome back, {AuthUtils.getCurrentUser()?.name || 'NGO Representative'}!
                </h1>
                <p style={styles.welcomeSubtitle}>
                  Monitor your impact, verify projects, and support communities through comprehensive analytics
                </p>
              </div>
            </div>

            {/* Professional Dashboard Header */}
            <div style={styles.dashboardHeader}>
              <h1 style={styles.dashboardTitle} className="dashboard-title">Dashboard Overview</h1>
              <p style={styles.dashboardSubtitle}>
                Monitor your NGO's impact and performance across all projects
              </p>
            </div>

            {/* Professional Dashboard Cards Grid */}
            <div style={styles.statsGrid} className="stats-grid">
              {/* Projects Verified Card */}
              <div 
                style={styles.statCard}
                className="stat-card"
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, styles.statCardHover);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.06)';
                }}
              >
                <div style={{...styles.statIcon, ...styles.statIconProjects}} className="stat-icon">
                  🌱
                </div>
                <div style={styles.statContent}>
                  <div style={{...styles.statNumber, ...styles.statNumberGreen}} className="stat-number">42</div>
                  <div style={styles.statLabel}>Projects Verified</div>
                </div>
              </div>

              {/* Communities Managed Card */}
              <div 
                style={styles.statCard}
                className="stat-card"
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, styles.statCardHover);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.06)';
                }}
              >
                <div style={{...styles.statIcon, ...styles.statIconCommunities}} className="stat-icon">
                  👥
                </div>
                <div style={styles.statContent}>
                  <div style={{...styles.statNumber, ...styles.statNumberBlue}} className="stat-number">18</div>
                  <div style={styles.statLabel}>Communities Managed</div>
                </div>
              </div>

              {/* Compliance Reports Card */}
              <div 
                style={styles.statCard}
                className="stat-card"
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, styles.statCardHover);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.06)';
                }}
              >
                <div style={{...styles.statIcon, ...styles.statIconReports}} className="stat-icon">
                  📋
                </div>
                <div style={styles.statContent}>
                  <div style={{...styles.statNumber, ...styles.statNumberPurple}} className="stat-number">156</div>
                  <div style={styles.statLabel}>Compliance Reports</div>
                </div>
              </div>

              {/* Total Earnings Card */}
              <div 
                style={styles.statCard}
                className="stat-card"
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, styles.statCardHover);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.06)';
                }}
              >
                <div style={{...styles.statIcon, ...styles.statIconEarnings}} className="stat-icon">
                  💰
                </div>
                <div style={styles.statContent}>
                  <div style={{...styles.statNumber, ...styles.statNumberOrange}} className="stat-number">
                    ₹1,24,000
                  </div>
                  <div style={styles.statLabel}>Total Earnings</div>
                  {CurrencyUtils.shouldShowConversion("124000", "Total Earnings") && (
                    <div style={styles.currencyConversion}>
                      {CurrencyUtils.getConversionString("124000", "Total Earnings")}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div style={styles.activitySection}>
              <h2 style={styles.activityTitle}>
                <FileText size={24} />
                Recent Activity & Compliance Updates
              </h2>
              <div style={styles.activityGrid} className="activity-grid">
                {/* Recent Verification Activity */}
                <div 
                  style={styles.activityCard}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, styles.activityCardHover);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04)';
                  }}
                >
                  <div style={styles.activityHeader}>
                    <div style={{...styles.activityIcon, ...styles.statIconProjects}}>
                      ✅
                    </div>
                    <div style={styles.activityMeta}>
                      <div style={styles.activityTime}>2 hours ago</div>
                      <div style={styles.activityTitle2}>Project Verification Completed</div>
                    </div>
                  </div>
                  <p style={styles.activityDescription}>
                    Successfully verified Reforestation Project #2024-07 with 500 saplings planted in Rajasthan community.
                  </p>
                </div>

                {/* Community Update */}
                <div 
                  style={styles.activityCard}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, styles.activityCardHover);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04)';
                  }}
                >
                  <div style={styles.activityHeader}>
                    <div style={{...styles.activityIcon, ...styles.statIconCommunities}}>
                      👥
                    </div>
                    <div style={styles.activityMeta}>
                      <div style={styles.activityTime}>5 hours ago</div>
                      <div style={styles.activityTitle2}>Community Engagement Update</div>
                    </div>
                  </div>
                  <p style={styles.activityDescription}>
                    New community partnership established with Village Development Committee in Maharashtra.
                  </p>
                </div>

                {/* Compliance Report */}
                <div 
                  style={styles.activityCard}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, styles.activityCardHover);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04)';
                  }}
                >
                  <div style={styles.activityHeader}>
                    <div style={{...styles.activityIcon, ...styles.statIconReports}}>
                      📋
                    </div>
                    <div style={styles.activityMeta}>
                      <div style={styles.activityTime}>1 day ago</div>
                      <div style={styles.activityTitle2}>Compliance Report Generated</div>
                    </div>
                  </div>
                  <p style={styles.activityDescription}>
                    Monthly compliance report for September 2024 generated with 98% satisfaction rating.
                  </p>
                </div>

                {/* Earnings Update */}
                <div 
                  style={styles.activityCard}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, styles.activityCardHover);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04)';
                  }}
                >
                  <div style={styles.activityHeader}>
                    <div style={{...styles.activityIcon, ...styles.statIconEarnings}}>
                      💰
                    </div>
                    <div style={styles.activityMeta}>
                      <div style={styles.activityTime}>2 days ago</div>
                      <div style={styles.activityTitle2}>Payment Received</div>
                    </div>
                  </div>
                  <p style={styles.activityDescription}>
                    Received ₹25,000 compensation for verified tree plantation project in Gujarat region.
                  </p>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div style={styles.container}>
      {/* Add responsive styles with CSS */}
      <style>
        {`
          @media (max-width: 1024px) {
            .nav-container {
              padding: 0 1rem !important;
              gap: 0.75rem !important;
            }
            .brand-section {
              min-width: 180px !important;
            }
            .header-actions {
              min-width: 180px !important;
            }
            .center-nav {
              padding: 0 0.5rem !important;
              gap: 4px !important;
            }
            .nav-item {
              padding: 8px 12px !important;
              font-size: 13px !important;
            }
            .app-name {
              font-size: 1.25rem !important;
            }
            .profile-dropdown {
              min-width: 240px !important;
              max-width: 280px !important;
              margin-top: 8px !important;
            }
          }
          @media (max-width: 768px) {
            .mobile-menu-button {
              display: flex !important;
            }
            .center-nav {
              display: none !important;
            }
            .profile-container {
              display: none !important;
            }
            .notification-button {
              display: none !important;
            }
            .nav-container {
              height: 64px !important;
              padding: 0 1rem !important;
            }
            .brand-section {
              min-width: auto !important;
              flex: 1 !important;
            }
            .header-actions {
              min-width: auto !important;
              flex: 0 0 auto !important;
            }
            .logo-container {
              width: 40px !important;
              height: 40px !important;
            }
            .app-name {
              font-size: 1.125rem !important;
            }
            .app-subtitle {
              font-size: 0.625rem !important;
            }
            .stats-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
              padding: 0 0.5rem !important;
            }
            .stat-card {
              padding: 1.5rem !important;
            }
            .stat-icon {
              width: 60px !important;
              height: 60px !important;
              font-size: 2rem !important;
            }
            .stat-number {
              font-size: 2rem !important;
            }
            .welcome-title {
              font-size: 2rem !important;
            }
          }
          @media (max-width: 480px) {
            .main-content {
              padding: 1rem !important;
            }
            .dashboard-title {
              font-size: 2rem !important;
            }
            .stats-grid {
              gap: 0.75rem !important;
            }
            .welcome-title {
              font-size: 1.75rem !important;
            }
            .activity-grid {
              grid-template-columns: 1fr !important;
            }
            .brand-section {
              gap: 8px !important;
            }
            .app-name {
              font-size: 1rem !important;
            }
            .nav-container {
              padding: 0 0.75rem !important;
              height: 56px !important;
            }
            .logo-container {
              width: 36px !important;
              height: 36px !important;
            }
          }
        `}
      </style>
      <div style={styles.backgroundPattern}></div>
      
      <main style={styles.main}>
        {/* Professional Navigation Header */}
        <nav style={styles.navigation}>
          <div style={styles.navContainer} className="nav-container">
            {/* Left: Logo & App Name */}
            <div style={styles.brandSection} className="brand-section">
              <div style={styles.logoContainer} className="logo-container">🌿</div>
              <div style={styles.appNameContainer}>
                <div style={styles.appName} className="app-name">CLORIT</div>
                <div style={styles.appSubtitle} className="app-subtitle">NGO Dashboard</div>
              </div>
            </div>

            {/* Center: Navigation Menu */}
            <div style={{ 
              display: isMobile ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: '1 1 auto',
              gap: '8px',
              padding: '0 1rem',
              overflow: 'hidden'
            }} className="center-nav">
              {navigationConfig.main.map((item) => 
                <button
                  key={item.id}
                  style={{
                    ...styles.navItem,
                    ...(activeTab === item.id ? styles.navItemActive : {})
                  }}
                  className="nav-item"
                  onClick={() => handleTabClick(item.id)}
                  onMouseEnter={(e) => {
                    if (activeTab !== item.id) {
                      Object.assign(e.currentTarget.style, styles.navItemHover);
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== item.id) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#64748b';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              )}
            </div>

            {/* Right: Profile & Notifications */}
            <div style={styles.headerActions} className="header-actions">
              {/* Notifications Button */}
              <button 
                style={styles.notificationButton}
                className="notification-button"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                  e.currentTarget.style.color = '#059669';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(248, 250, 252, 0.8)';
                  e.currentTarget.style.color = '#64748b';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                🔔
                <div style={styles.notificationBadge}>3</div>
              </button>

              {/* Profile Container with Dropdown */}
              <div 
                style={{
                  ...styles.profileContainer,
                  display: isMobile ? 'none' : 'flex'
                }} 
                className="profile-container"
                data-dropdown="profile"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(16, 185, 129, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                  e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.7)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div style={styles.profileAvatar}>
                  {AuthUtils.getCurrentUser()?.name?.charAt(0) || 'N'}
                </div>
                <div style={styles.profileInfo}>
                  <div style={styles.profileName}>
                    {AuthUtils.getCurrentUser()?.name || 'NGO User'}
                  </div>
                  <div style={styles.profileRole}>NGO Representative</div>
                </div>
                <ChevronDown 
                  size={18} 
                  style={{ 
                    color: '#64748b',
                    transform: isProfileDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                    flexShrink: 0
                  }} 
                />
                
                {/* Profile Dropdown Menu */}
                <div 
                  style={{
                    ...styles.profileDropdown,
                    ...(isProfileDropdownOpen ? styles.profileDropdownOpen : {})
                  }}
                >
                  {/* Professional Header with User Info */}
                  <div style={styles.profileDropdownHeader}>
                    <div style={styles.profileDropdownHeaderName}>
                      {AuthUtils.getCurrentUser()?.name || 'NGO User'}
                    </div>
                    <div style={styles.profileDropdownHeaderRole}>NGO Representative</div>
                  </div>
                  
                  {/* Profile Menu Items */}
                  <button 
                    style={styles.profileDropdownItem}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.profileDropdownItemHover)}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#374151';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <User size={18} style={styles.profileDropdownItemIcon} />
                    <span>View Profile</span>
                  </button>
                  
                  <button 
                    style={styles.profileDropdownItem}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.profileDropdownItemHover)}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#374151';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <Settings size={18} style={styles.profileDropdownItemIcon} />
                    <span>Settings</span>
                  </button>
                  
                  {/* Professional Divider */}
                  <div style={styles.profileDropdownDivider} />
                  
                  {/* Logout Button with Special Styling */}
                  <button 
                    style={{
                      ...styles.profileDropdownItem,
                      ...styles.profileDropdownLogout
                    }}
                    onClick={() => {
                      AuthUtils.logout();
                      navigate('/');
                    }}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, {
                      ...styles.profileDropdownLogoutHover,
                      transform: 'translateX(2px)'
                    })}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#ef4444';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <LogOut size={18} style={styles.profileDropdownItemIcon} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button 
                style={{
                  ...styles.mobileMenuButton,
                  display: isMobile ? 'block' : 'none'
                }}
                className="mobile-menu-button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && isMobile && renderMobileNavigation()}
          </div>
        </nav>

        {/* Tab Content */}
        <div style={styles.mainContent} className="main-content">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default NGODashboard;
