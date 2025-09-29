import React, { useState, useMemo, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Filter, Download, AlertCircle, Shield, 
  CheckCircle, Clock, Users, Zap, BarChart3, DollarSign, Leaf, 
  Activity, Bell, Lock, Globe, Award, Target, LineChart, 
  ShoppingCart, Package, IndianRupee, Coins, Cpu, Layers,
  Database, FileCheck, Users2, Crown, GitMerge, BarChart4,
  PieChart, CandlestickChart, Calculator, Smartphone, QrCode,
  Scale, ArrowUpDown, RefreshCw, Search, Eye, Building2,
  CreditCard, Banknote, FileText, CrownIcon, Wallet, Link, 
  Copy, ExternalLink, Power
} from 'lucide-react';
import { LOGO_CONFIG } from '../constants/branding';

const BuyerMarketplace = () => {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [selectedProject, setSelectedProject] = useState(null);
  const [orderType, setOrderType] = useState('market');
  const [orderSide, setOrderSide] = useState('buy');
  const [sortBy, setSortBy] = useState('price-low');
  const [filterVerification, setFilterVerification] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPackage, setFilterPackage] = useState('all');
  const [chartType, setChartType] = useState('candlestick');
  const [paymentMethod, setPaymentMethod] = useState('USDT');
  const [showFilters, setShowFilters] = useState(false);
  const [quantity, setQuantity] = useState('100');
  const [limitPrice, setLimitPrice] = useState('');
  const [showBulkPurchase, setShowBulkPurchase] = useState(false);
  const [bulkAmount, setBulkAmount] = useState('1000');
  const [showTradingView, setShowTradingView] = useState('chart');
  const [selectedPayment, setSelectedPayment] = useState('USDT');
  const [searchQuery, setSearchQuery] = useState('');

  // Wallet connection state
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletBalance, setWalletBalance] = useState({
    ETH: '0.00',
    USDT: '0.00',
    USDC: '0.00',
    MATIC: '0.00'
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletProvider, setWalletProvider] = useState(null);
  const [networkId, setNetworkId] = useState(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [connectionAttempted, setConnectionAttempted] = useState(false);

  // Trading state
  const [orderBook, setOrderBook] = useState({
    bids: [
      { price: 12.75, amount: 5000, total: 63750 },
      { price: 12.70, amount: 7500, total: 95250 },
      { price: 12.65, amount: 10000, total: 126500 },
      { price: 12.60, amount: 15000, total: 189000 },
      { price: 12.55, amount: 20000, total: 251000 }
    ],
    asks: [
      { price: 12.80, amount: 6000, total: 76800 },
      { price: 12.85, amount: 8000, total: 102800 },
      { price: 12.90, amount: 12000, total: 154800 },
      { price: 12.95, amount: 10000, total: 129500 },
      { price: 13.00, amount: 15000, total: 195000 }
    ]
  });

  const [tradeHistory, setTradeHistory] = useState([
    { id: 1, type: 'buy', amount: 2500, price: 12.78, time: '10:30:45', buyer: 'TechCorp', seller: 'NGO Pool' },
    { id: 2, type: 'sell', amount: 1500, price: 12.82, time: '10:28:12', buyer: 'Manufacturing Co', seller: 'Green Fund' },
    { id: 3, type: 'buy', amount: 5000, price: 12.75, time: '10:25:33', buyer: 'Aviation Club', seller: 'Carbon Trust' },
    { id: 4, type: 'buy', amount: 3000, price: 12.79, time: '10:22:17', buyer: 'Shipping Line', seller: 'Blue Carbon' },
    { id: 5, type: 'sell', amount: 2000, price: 12.81, time: '10:20:05', buyer: 'Tech Giant', seller: 'Eco Fund' }
  ]);

  const [priceData, setPriceData] = useState([
    { time: '09:00', open: 12.45, high: 12.55, low: 12.40, close: 12.52, volume: 12500 },
    { time: '10:00', open: 12.52, high: 12.65, low: 12.48, close: 12.60, volume: 13800 },
    { time: '11:00', open: 12.60, high: 12.75, low: 12.58, close: 12.68, volume: 15200 },
    { time: '12:00', open: 12.68, high: 12.82, low: 12.65, close: 12.78, volume: 14500 },
    { time: '13:00', open: 12.78, high: 12.85, low: 12.72, close: 12.80, volume: 13200 },
    { time: '14:00', open: 12.80, high: 12.88, low: 12.75, close: 12.82, volume: 11800 },
    { time: '15:00', open: 12.82, high: 12.90, low: 12.78, close: 12.85, volume: 15200 }
  ]);

  const [currentPrice, setCurrentPrice] = useState(12.85);
  const [priceChange, setPriceChange] = useState(3.21);

  // Wallet connection functions
  const connectWallet = async () => {
    // Prevent multiple simultaneous connection attempts
    if (isConnecting || connectionAttempted) {
      console.log('Wallet connection already in progress or attempted');
      return;
    }

    setIsConnecting(true);
    setConnectionAttempted(true);
    
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      // Check if there's already a pending request
      const permissions = await window.ethereum.request({
        method: 'wallet_getPermissions'
      }).catch(() => []);

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      if (accounts && accounts.length > 0) {
        const address = accounts[0];
        setWalletAddress(address);
        setWalletConnected(true);
        setWalletProvider(window.ethereum);
        
        // Get network ID
        try {
          const networkId = await window.ethereum.request({
            method: 'net_version'
          });
          setNetworkId(networkId);
        } catch (networkError) {
          console.warn('Could not get network ID:', networkError);
          setNetworkId('1'); // Default to mainnet
        }
        
        // Get balances (mock data for demo)
        await updateWalletBalances(address);
        
        // Listen for account changes
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
        
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
        
        console.log('Wallet connected successfully!');
      } else {
        throw new Error('No accounts found. Please make sure MetaMask is unlocked.');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      
      // Reset connection state on error
      setWalletConnected(false);
      setWalletAddress('');
      setWalletProvider(null);
      setNetworkId(null);
      
      // Handle specific error types
      if (error.code === 4001) {
        alert('Connection rejected by user. Please try again and approve the connection.');
      } else if (error.message.includes('already pending')) {
        alert('Wallet connection request is already pending. Please check MetaMask and approve the request.');
      } else if (error.message.includes('MetaMask is not installed')) {
        alert('MetaMask is not installed. Please install MetaMask extension to continue.');
      } else {
        alert(`Failed to connect wallet: ${error.message || 'Unknown error occurred'}`);
      }
    } finally {
      setIsConnecting(false);
      // Reset connection attempt flag after a delay
      setTimeout(() => {
        setConnectionAttempted(false);
      }, 2000);
    }
  };

  const disconnectWallet = () => {
    try {
      setWalletConnected(false);
      setWalletAddress('');
      setWalletProvider(null);
      setNetworkId(null);
      setConnectionAttempted(false);
      setWalletBalance({
        ETH: '0.00',
        USDT: '0.00',
        USDC: '0.00',
        MATIC: '0.00'
      });
      
      // Clean up event listeners
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
      
      console.log('Wallet disconnected successfully');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const updateWalletBalances = async (address) => {
    try {
      // Mock balance update - in real app, fetch from blockchain
      // Using setTimeout to simulate async operation
      await new Promise(resolve => setTimeout(resolve, 100));
      
      setWalletBalance({
        ETH: '2.45',
        USDT: '5,420.50',
        USDC: '1,250.00',
        MATIC: '150.75'
      });
    } catch (error) {
      console.error('Error updating wallet balances:', error);
      // Set default balances on error
      setWalletBalance({
        ETH: '0.00',
        USDT: '0.00',
        USDC: '0.00',
        MATIC: '0.00'
      });
    }
  };

  const handleAccountsChanged = (accounts) => {
    try {
      if (accounts.length === 0) {
        console.log('No accounts found, disconnecting wallet');
        disconnectWallet();
      } else if (accounts[0] !== walletAddress) {
        console.log('Account changed, updating wallet info');
        setWalletAddress(accounts[0]);
        updateWalletBalances(accounts[0]);
      }
    } catch (error) {
      console.error('Error handling account change:', error);
    }
  };

  const handleChainChanged = (chainId) => {
    try {
      const networkId = parseInt(chainId, 16).toString();
      console.log('Network changed to:', networkId);
      setNetworkId(networkId);
    } catch (error) {
      console.error('Error handling chain change:', error);
      setNetworkId('1'); // Default to mainnet
    }
  };

  const copyAddress = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(walletAddress);
        alert('Address copied to clipboard!');
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = walletAddress;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          alert('Address copied to clipboard!');
        } catch (fallbackError) {
          console.error('Fallback copy failed:', fallbackError);
          alert('Could not copy address. Please copy manually: ' + walletAddress);
        }
        document.body.removeChild(textArea);
      }
    } catch (error) {
      console.error('Error copying address:', error);
      alert('Could not copy address. Please copy manually: ' + walletAddress);
    }
  };

  const getNetworkName = (networkId) => {
    const networks = {
      '1': 'Ethereum Mainnet',
      '137': 'Polygon Mainnet',
      '80001': 'Polygon Mumbai',
      '5': 'Ethereum Goerli',
      '11155111': 'Ethereum Sepolia'
    };
    return networks[networkId] || `Network ${networkId}`;
  };

  // Check wallet connection on component mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      // Prevent multiple simultaneous checks
      if (connectionAttempted) {
        return;
      }

      try {
        if (typeof window.ethereum !== 'undefined') {
          // Check if already connected without triggering a popup
          const accounts = await window.ethereum.request({
            method: 'eth_accounts'
          });
          
          if (accounts && accounts.length > 0) {
            console.log('Existing wallet connection found');
            setWalletAddress(accounts[0]);
            setWalletConnected(true);
            setWalletProvider(window.ethereum);
            
            // Get network ID
            try {
              const networkId = await window.ethereum.request({
                method: 'net_version'
              });
              setNetworkId(networkId);
            } catch (networkError) {
              console.warn('Could not get network ID on mount:', networkError);
              setNetworkId('1'); // Default to mainnet
            }
            
            await updateWalletBalances(accounts[0]);
            
            // Set up event listeners
            if (window.ethereum.removeListener) {
              window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
              window.ethereum.removeListener('chainChanged', handleChainChanged);
            }
            
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);
          } else {
            console.log('No existing wallet connection found');
          }
        } else {
          console.log('MetaMask not detected');
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };
    
    // Add a small delay to ensure the page is fully loaded
    const timeoutId = setTimeout(checkWalletConnection, 500);
    
    return () => {
      clearTimeout(timeoutId);
      // Clean up event listeners on unmount
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []); // Empty dependency array to run only once on mount

  // Payment methods
  const paymentMethods = [
    { id: 'USDT', name: 'Tether (USDT)', icon: <Coins className="w-4 h-4" />, type: 'crypto' },
    { id: 'USDC', name: 'USD Coin (USDC)', icon: <Coins className="w-4 h-4" />, type: 'crypto' },
    { id: 'ETH', name: 'Ethereum (ETH)', icon: <Cpu className="w-4 h-4" />, type: 'crypto' },
    { id: 'MATIC', name: 'Polygon (MATIC)', icon: <Layers className="w-4 h-4" />, type: 'crypto' },
    { id: 'USD', name: 'US Dollar (Wire)', icon: <DollarSign className="w-4 h-4" />, type: 'fiat' },
    { id: 'INR', name: 'Indian Rupee (UPI)', icon: <IndianRupee className="w-4 h-4" />, type: 'fiat' }
  ];

  const marketplaceData = [
    {
      id: 1,
      project: "Mangrove Carbon Credits – Odisha",
      verification: "NCCR Approved + On-chain Proof",
      available: 25000,
      price: 12.82,
      seller: "Blue Carbon Trust",
      category: "Blue Carbon",
      location: "Odisha, India",
      verified: true,
      ngoVerified: true,
      blockchainProof: true,
      priceChange: 2.5,
      volume24h: 15000,
      projectType: "Mangroves",
      sellerType: "NGO",
      tokenStandard: "ERC-20",
      auditStatus: "Verified",
      bulkDiscounts: [
        { min: 1000, discount: 2 },
        { min: 5000, discount: 5 },
        { min: 10000, discount: 8 }
      ],
      smartContract: true,
      ngoRoyalty: 3,
      compliance: ["Verra", "Gold Standard", "NCCR"]
    },
    {
      id: 2,
      project: "Seagrass Restoration – Tamil Nadu",
      verification: "NGO Verified + NCCR Pending",
      available: 18500,
      price: 10.45,
      seller: "Ocean Conservation Ltd",
      category: "Blue Carbon",
      location: "Tamil Nadu, India",
      verified: false,
      ngoVerified: true,
      blockchainProof: true,
      priceChange: -1.2,
      volume24h: 8500,
      projectType: "Seagrass",
      sellerType: "Corporate",
      tokenStandard: "ERC-1155",
      auditStatus: "Pending",
      bulkDiscounts: [
        { min: 1000, discount: 3 },
        { min: 5000, discount: 6 }
      ],
      smartContract: true,
      ngoRoyalty: 5,
      compliance: ["NCCR"]
    },
    {
      id: 3,
      project: "Corporate ESG Bundle – Mixed Projects",
      verification: "NCCR Approved + Multi-verified",
      available: 100000,
      price: 11.50,
      seller: "Green Credits Exchange",
      category: "Corporate Bundle",
      location: "Pan-India",
      verified: true,
      ngoVerified: true,
      blockchainProof: true,
      priceChange: 3.2,
      volume24h: 55000,
      projectType: "Mixed",
      sellerType: "Broker",
      tokenStandard: "ERC-20",
      auditStatus: "Verified",
      bulkDiscounts: [
        { min: 1000, discount: 4 },
        { min: 5000, discount: 7 },
        { min: 25000, discount: 12 }
      ],
      smartContract: true,
      ngoRoyalty: 4,
      compliance: ["Verra", "CDP", "GRI"],
      isSmartBundle: true
    }
  ];

  const secondaryMarketListings = [
    {
      id: 101,
      seller: "Tech Corp India",
      title: "Mangrove CCTs - Locked for 1 Year",
      cctTokens: 15000,
      price: "$35,000",
      originalPrice: "$37,500",
      discount: "-6.7%",
      ngoRoyalty: "3%",
      lockPeriod: "1 Year",
      verified: true,
      availableCCTs: 15000,
      unitPrice: 2.33,
      sellerType: "Corporate",
      projectType: "Mangroves"
    },
    {
      id: 102,
      seller: "Maritime Solutions Ltd",
      title: "Seagrass Restoration Credits",
      cctTokens: 25000,
      price: "$58,750",
      originalPrice: "$62,500",
      discount: "-6.0%",
      ngoRoyalty: "5%",
      lockPeriod: "Unlocked",
      verified: true,
      availableCCTs: 25000,
      unitPrice: 2.35,
      sellerType: "Corporate",
      projectType: "Seagrass"
    }
  ];

  const portfolioData = [
    { project: 'Mangrove Credits - Odisha', quantity: 5000, avgPrice: 11.50, currentPrice: 12.82, value: 64100, gain: 11.48 },
    { project: 'Seagrass Tamil Nadu', quantity: 3000, avgPrice: 10.80, currentPrice: 10.45, value: 31350, gain: -3.24 },
    { project: 'Coral Reef Andaman', quantity: 2500, avgPrice: 14.20, currentPrice: 15.20, value: 38000, gain: 7.04 }
  ];

  const corporateClubs = [
    { name: "Aviation Carbon Club", members: 24, focus: "CORSIA Compliance" },
    { name: "Tech Industry ESG Alliance", members: 67, focus: "Net-Zero 2030" },
    { name: "Maritime Decarbonization Network", members: 31, focus: "IMO 2050 Goals" }
  ];

  const aiRecommendations = [
    {
      project: "Coastal Mangrove Expansion",
      confidence: 94,
      reason: "Best match for tech industry Scope 3 emissions",
      roi: "High long-term value",
      price: "$45,000"
    },
    {
      project: "Seagrass Marine Reserve",
      confidence: 87,
      reason: "Aligned with your ESG portfolio strategy",
      roi: "Medium-term appreciation expected",
      price: "$38,000"
    }
  ];

  const filteredData = useMemo(() => {
    let filtered = [...marketplaceData];

    if (filterVerification !== 'all') {
      filtered = filtered.filter(item => {
        if (filterVerification === 'nccr') return item.verified;
        if (filterVerification === 'ngo') return item.ngoVerified;
        if (filterVerification === 'pending') return !item.verified;
        return true;
      });
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(item => item.projectType.toLowerCase() === filterCategory.toLowerCase());
    }

    if (filterPackage !== 'all') {
      const packageSize = parseInt(filterPackage);
      filtered = filtered.filter(item => item.available >= packageSize);
    }

    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'volume': return b.volume24h - a.volume24h;
        case 'change': return b.priceChange - a.priceChange;
        default: return 0;
      }
    });

    return filtered;
  }, [sortBy, filterVerification, filterCategory, filterPackage, searchQuery]);

  const totalPortfolioValue = portfolioData.reduce((sum, item) => sum + item.value, 0);
  const totalPortfolioGain = ((totalPortfolioValue - portfolioData.reduce((sum, item) => sum + (item.quantity * item.avgPrice), 0)) / portfolioData.reduce((sum, item) => sum + (item.quantity * item.avgPrice), 0)) * 100;

  // Trading functions
  const executeTrade = async () => {
    if (!quantity) {
      alert('Please enter a quantity');
      return;
    }
    
    if (!walletConnected) {
      alert('Please connect your wallet first');
      setShowWalletModal(true);
      return;
    }
    
    const price = orderType === 'limit' ? parseFloat(limitPrice) : currentPrice;
    const totalValue = parseFloat(quantity) * price;
    
    // Check if user has sufficient balance
    const selectedCurrency = selectedPayment;
    const userBalance = parseFloat(walletBalance[selectedCurrency] || '0');
    
    if (orderSide === 'buy' && userBalance < totalValue) {
      alert(`Insufficient ${selectedCurrency} balance. You need $${totalValue.toFixed(2)} but have $${userBalance.toFixed(2)}`);
      return;
    }
    
    try {
      // Mock transaction - in real app, interact with smart contract
      // Generate a simple random transaction hash without using crypto.randomUUID
      const txHash = '0x' + Math.random().toString(16).substr(2, 8) + 
                     Math.random().toString(16).substr(2, 8) + 
                     Math.random().toString(16).substr(2, 8) + 
                     Math.random().toString(16).substr(2, 8) + 
                     Math.random().toString(16).substr(2, 8) + 
                     Math.random().toString(16).substr(2, 8) + 
                     Math.random().toString(16).substr(2, 8) + 
                     Math.random().toString(16).substr(2, 8);
      
      alert(`Trade executed successfully!\nTransaction Hash: ${txHash}\n${quantity} CCTs ${orderSide} at $${price.toFixed(2)} = $${totalValue.toFixed(2)}`);
      
      // Reset form
      setQuantity('100');
      setLimitPrice('');
      
      // Update wallet balance (mock)
      if (orderSide === 'buy') {
        setWalletBalance(prev => ({
          ...prev,
          [selectedCurrency]: (userBalance - totalValue).toFixed(2)
        }));
      }
      
    } catch (error) {
      console.error('Trade execution error:', error);
      alert('Trade failed. Please try again.');
    }
  };

  const calculateBulkDiscount = (project, amount) => {
    const discount = project.bulkDiscounts
      ?.filter(d => amount >= d.min)
      .sort((a, b) => b.min - a.min)[0];
    
    return discount ? discount.discount : 0;
  };

  const getVerificationBadge = (project) => {
    if (project.verified) {
      return (
        <span className="inline-flex items-center gap-1 bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">
          <CheckCircle className="w-3 h-3" /> NCCR Approved
        </span>
      );
    }
    if (project.ngoVerified) {
      return (
        <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
          <Shield className="w-3 h-3" /> NGO Verified
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-600 text-xs px-2 py-0.5 rounded-full">
        <Clock className="w-3 h-3" /> Pending
      </span>
    );
  };

  const renderTradingInterface = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Panel - Chart and Order Book */}
      <div className="lg:col-span-2 space-y-6">
        {/* Chart Type Selector */}
        <div className="flex gap-2 mb-4">
          <button 
            onClick={() => setShowTradingView('chart')}
            className={`px-4 py-2 rounded-lg font-medium ${showTradingView === 'chart' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            <CandlestickChart className="w-4 h-4 inline mr-2" />
            Price Chart
          </button>
          <button 
            onClick={() => setShowTradingView('depth')}
            className={`px-4 py-2 rounded-lg font-medium ${showTradingView === 'depth' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            <BarChart4 className="w-4 h-4 inline mr-2" />
            Market Depth
          </button>
        </div>

        {/* Price Chart */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">CCT/USDT</h3>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-gray-900">${currentPrice.toFixed(2)}</span>
              <span className={`text-lg font-bold ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {priceChange >= 0 ? '+' : ''}{priceChange}%
              </span>
            </div>
          </div>
          
          {showTradingView === 'chart' ? (
            <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
              <div className="text-center">
                <LineChart className="w-16 h-16 text-blue-500 mx-auto mb-3 opacity-50" />
                <div className="text-blue-600">Live Price Chart</div>
                <div className="text-sm text-gray-600 mt-1">Candlestick with moving averages</div>
              </div>
            </div>
          ) : (
            <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
              <div className="text-center">
                <BarChart4 className="w-16 h-16 text-purple-500 mx-auto mb-3 opacity-50" />
                <div className="text-purple-600">Market Depth Chart</div>
                <div className="text-sm text-gray-600 mt-1">Bid/Ask spread visualization</div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-4 gap-2 mt-4">
            {['1H', '4H', '1D', '1W'].map(interval => (
              <button key={interval} className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded text-sm transition-colors text-gray-700">
                {interval}
              </button>
            ))}
          </div>
        </div>

        {/* Order Book & Trade History */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900">
              <BarChart3 className="w-5 h-5" />
              Order Book
            </h3>
            
            <div className="space-y-1 mb-4">
              <div className="text-xs text-red-600 mb-2 font-medium">ASKS (SELL)</div>
              {[...orderBook.asks].reverse().map((ask, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs bg-red-50 hover:bg-red-100 px-2 py-1 rounded cursor-pointer">
                  <span className="text-red-600 font-mono">${ask.price}</span>
                  <span className="text-blue-600">{ask.amount.toLocaleString()}</span>
                  <span className="text-gray-600">${(ask.total / 1000).toFixed(1)}K</span>
                </div>
              ))}
            </div>

            <div className="bg-green-50 border border-green-200 rounded px-3 py-2 my-3">
              <div className="text-2xl font-bold text-green-600">${currentPrice.toFixed(2)}</div>
              <div className="text-xs text-green-500">Last Trade Price</div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-green-600 mb-2 font-medium">BIDS (BUY)</div>
              {orderBook.bids.map((bid, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs bg-green-50 hover:bg-green-100 px-2 py-1 rounded cursor-pointer">
                  <span className="text-green-600 font-mono">${bid.price}</span>
                  <span className="text-blue-600">{bid.amount.toLocaleString()}</span>
                  <span className="text-gray-600">${(bid.total / 1000).toFixed(1)}K</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900">
              <Clock className="w-5 h-5" />
              Recent Trades
            </h3>
            <div className="space-y-1">
              {tradeHistory.map((trade) => (
                <div key={trade.id} className="flex items-center justify-between text-xs py-1.5 border-b border-gray-200 last:border-0">
                  <span className="text-gray-600">{trade.time}</span>
                  <span className={trade.type === 'buy' ? 'text-green-600' : 'text-red-600'}>
                    ${trade.price}
                  </span>
                  <span className="text-blue-600">{trade.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Trading */}
      <div className="space-y-6">
        {/* Trading Panel */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <DollarSign className="w-5 h-5" />
            Place Order
          </h3>
          
          {/* Order Type */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
            <button
              onClick={() => setOrderType('market')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${orderType === 'market' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
            >
              Market
            </button>
            <button
              onClick={() => setOrderType('limit')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${orderType === 'limit' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
            >
              Limit
            </button>
          </div>

          {/* Buy/Sell Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
            <button
              onClick={() => setOrderSide('buy')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${orderSide === 'buy' ? 'bg-green-600 text-white' : 'text-gray-700'}`}
            >
              Buy
            </button>
            <button
              onClick={() => setOrderSide('sell')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${orderSide === 'sell' ? 'bg-red-600 text-white' : 'text-gray-700'}`}
            >
              Sell
            </button>
          </div>

          {/* Limit Price */}
          {orderType === 'limit' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Limit Price (USDT)</label>
              <input
                type="number"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="0.00"
              />
            </div>
          )}

          {/* Amount */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount (CCT)</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="0.00"
            />
          </div>

          {/* Total */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Total</span>
              <span className="font-semibold text-gray-900">
                ${quantity ? (parseFloat(quantity) * (orderType === 'limit' ? parseFloat(limitPrice) || currentPrice : currentPrice)).toFixed(2) : '0.00'}
              </span>
            </div>
          </div>

          {/* Execute Button */}
          <button
            onClick={executeTrade}
            disabled={!walletConnected}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              !walletConnected 
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : orderSide === 'buy' 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {!walletConnected 
              ? 'Connect Wallet to Trade' 
              : orderSide === 'buy' 
                ? 'Buy CCT' 
                : 'Sell CCT'
            }
          </button>
          
          {!walletConnected && (
            <button
              onClick={() => setShowWalletModal(true)}
              className="w-full mt-2 bg-blue-50 border border-blue-200 hover:bg-blue-100 px-3 py-2 rounded text-sm font-medium transition-all flex items-center justify-center gap-2 text-blue-600"
            >
              <Wallet className="w-4 h-4" />
              Connect Wallet First
            </button>
          )}
        </div>

        {/* Bulk Purchase */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <Package className="w-5 h-5" />
            Bulk Purchase
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CCT Amount (1000+)</label>
              <input
                type="number"
                value={bulkAmount}
                onChange={(e) => setBulkAmount(e.target.value)}
                min="1000"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-600">
                Estimated discount: {parseFloat(bulkAmount) >= 10000 ? '8-12%' : parseFloat(bulkAmount) >= 5000 ? '5-8%' : '2-5%'}
              </div>
            </div>

            <button
              onClick={() => setShowBulkPurchase(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Find Best Bulk Deals
            </button>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Payment Methods</h3>
          
          {walletConnected && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-700">Wallet Connected</span>
              </div>
              <div className="text-sm text-green-600">
                Balance: {walletBalance[selectedPayment]} {selectedPayment}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                disabled={!walletConnected && method.type === 'crypto'}
                className={`p-3 border rounded-lg text-left transition ${
                  selectedPayment === method.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : walletConnected || method.type === 'fiat'
                      ? 'border-gray-300 hover:border-gray-400'
                      : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-2">
                  {method.icon}
                  <span className="text-sm font-medium text-gray-900">{method.id}</span>
                  {walletConnected && method.type === 'crypto' && (
                    <CheckCircle className="w-3 h-3 text-green-500 ml-auto" />
                  )}
                </div>
                <div className="text-xs text-gray-600 mt-1">{method.type.toUpperCase()}</div>
                {walletConnected && method.type === 'crypto' && walletBalance[method.id] && (
                  <div className="text-xs text-blue-600 mt-1">
                    Balance: {walletBalance[method.id]}
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {!walletConnected && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-yellow-700">Connect wallet for crypto payments</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderMarketplace = () => (
    <div className="space-y-6">
      {/* Marketplace Header */}
      <div className="relative overflow-hidden mb-8">
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={LOGO_CONFIG.MAIN_LOGO} 
                    alt={LOGO_CONFIG.LOGO_ALT}
                    className="w-10 h-10 object-contain"
                  />
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {LOGO_CONFIG.BRAND_NAME} Carbon Marketplace
                  </h1>
                  <p className="text-gray-600 text-lg">Browse and purchase verified carbon credits from blue carbon projects</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600">Live Market Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-600">NCCR Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-600" />
                  <span className="text-purple-600">Blockchain Secured</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-green-500/25 flex items-center justify-center gap-3 text-white">
                <ShoppingCart className="w-5 h-5" />
                Browse Marketplace
              </button>
              <div className="flex gap-3">
                <button className="bg-blue-50 border border-blue-200 hover:bg-blue-100 px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 text-blue-600">
                  <RefreshCw className="w-4 h-4" />
                  Primary
                </button>
                <button className="bg-purple-50 border border-purple-200 hover:bg-purple-100 px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 text-purple-600">
                  <GitMerge className="w-4 h-4" />
                  Secondary
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marketplace Stats & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Live</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">273.5K</div>
          <div className="text-gray-600 text-sm">Carbon Credits Available</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-blue-600" />
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">$12.85</div>
          <div className="text-gray-600 text-sm">Average Price per CCT</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-8 h-8 text-purple-600" />
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">+12.8%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">$156M</div>
          <div className="text-gray-600 text-sm">24h Trading Volume</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-orange-600" />
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">1,247</div>
          <div className="text-gray-600 text-sm">Active Buyers</div>
        </div>
      </div>
      {/* Advanced Search & Filters */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-600" />
            Find Your Perfect Carbon Credits
          </h3>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="bg-blue-50 border border-blue-200 hover:bg-blue-100 px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 text-blue-600"
          >
            <Filter className="w-4 h-4" />
            Advanced Filters
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by project name, location, or NGO..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 transition-all"
            />
          </div>
          
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          >
            <option value="all">🌊 All Categories</option>
            <option value="mangroves">🌳 Mangroves</option>
            <option value="seagrass">🌿 Seagrass</option>
            <option value="coral">🪸 Coral</option>
            <option value="mixed">🌍 Mixed Projects</option>
          </select>
          
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          >
            <option value="price-low">💰 Price: Low to High</option>
            <option value="price-high">💎 Price: High to Low</option>
            <option value="volume">📊 Trading Volume</option>
            <option value="change">📈 Price Change</option>
          </select>
          
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-green-500/25 flex items-center justify-center gap-2 text-white">
            <Zap className="w-4 h-4" />
            Quick Buy
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Verification Status
              </label>
              <select
                value={filterVerification}
                onChange={(e) => setFilterVerification(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              >
                <option value="all">All Verifications</option>
                <option value="nccr">✅ NCCR Approved</option>
                <option value="ngo">🛡️ NGO Verified</option>
                <option value="pending">⏳ Pending</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block flex items-center gap-2">
                <Package className="w-4 h-4" />
                Package Size
              </label>
              <select
                value={filterPackage}
                onChange={(e) => setFilterPackage(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              >
                <option value="all">All Sizes</option>
                <option value="100">🔹 100+ CCTs</option>
                <option value="1000">🔸 1,000+ CCTs</option>
                <option value="10000">💎 10,000+ CCTs</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Seller Type
              </label>
              <select className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900">
                <option value="all">All Sellers</option>
                <option value="ngo">🏛️ NGO</option>
                <option value="corporate">🏢 Corporate</option>
                <option value="broker">🤝 Broker</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map(project => (
          <div
            key={project.id}
            className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all cursor-pointer overflow-hidden"
            onClick={() => setSelectedProject(project)}
          >
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 border-b border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-sm leading-tight flex-1 text-gray-900">
                  {project.project}
                </h3>
                <div className={`text-xs px-2 py-1 rounded ${
                  project.priceChange > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {project.priceChange > 0 ? '+' : ''}{project.priceChange}%
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {getVerificationBadge(project)}
                {project.blockchainProof && (
                  <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">
                    <Lock className="w-3 h-3" /> Blockchain
                  </span>
                )}
                {project.isSmartBundle && (
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-600 text-xs px-2 py-0.5 rounded-full">
                    <Package className="w-3 h-3" /> Smart Bundle
                  </span>
                )}
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Available CCTs</div>
                  <div className="font-bold text-lg text-gray-900">{project.available.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Price per CCT</div>
                  <div className="font-bold text-lg text-green-600">${project.price}</div>
                </div>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Seller:</span>
                  <span className="font-medium text-gray-900">{project.seller}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium text-gray-900">{project.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium text-xs text-gray-900">{project.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Token Standard:</span>
                  <span className="font-medium text-xs text-gray-900">{project.tokenStandard}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-3 py-2 rounded text-sm font-medium transition-all flex items-center justify-center gap-2 text-white">
                  <ShoppingCart className="w-4 h-4" />
                  Buy Now
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded text-sm font-medium transition-all flex items-center justify-center gap-2 text-gray-700">
                  <Eye className="w-4 h-4" />
                  Details
                </button>
              </div>

              {project.available >= 1000 && (
                <button className="w-full mt-2 bg-blue-50 border border-blue-200 hover:bg-blue-100 px-3 py-2 rounded text-sm font-medium transition-all flex items-center justify-center gap-2 text-blue-600">
                  <Zap className="w-4 h-4" />
                  Bulk Purchase ({calculateBulkDiscount(project, 1000)}% Discount)
                </button>
              )}

              {/* Additional Actions */}
              <div className="grid grid-cols-3 gap-2 mt-2">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded text-xs font-medium transition">
                  Limit Order
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded text-xs font-medium transition">
                  Bulk Trade
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded text-xs font-medium transition">
                  Set Alert
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 opacity-80" />
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-3xl font-bold mb-1">${totalPortfolioValue.toLocaleString()}</div>
          <div className="text-blue-100 text-sm">Portfolio Value</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Leaf className="w-8 h-8 opacity-80" />
            <BarChart3 className="w-5 h-5" />
          </div>
          <div className="text-3xl font-bold mb-1">156K</div>
          <div className="text-green-100 text-sm">Total CCT Holdings</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-8 h-8 opacity-80" />
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-3xl font-bold mb-1">{totalPortfolioGain.toFixed(2)}%</div>
          <div className="text-purple-100 text-sm">Total Gain/Loss</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-8 h-8 opacity-80" />
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="text-xl font-bold mb-1">Gold Tier</div>
          <div className="text-orange-100 text-sm">Buyer Status</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Portfolio Performance
          </h3>
          <div className="h-64 bg-slate-900/50 rounded-lg flex items-center justify-center border border-slate-700/50">
            <div className="text-center">
              <LineChart className="w-16 h-16 text-blue-500 mx-auto mb-3 opacity-50" />
              <div className="text-blue-300">Portfolio Chart</div>
              <div className="text-sm text-slate-400 mt-1">Performance visualization</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Carbon Risk Dashboard
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="font-semibold text-red-400">Risk Alert</span>
              </div>
              <p className="text-sm text-red-300">Under-compensating by 230 tons CO₂</p>
            </div>
            
            <div className="space-y-3">
              {['Scope 1', 'Scope 2', 'Scope 3'].map((scope, idx) => (
                <div key={scope} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">{scope} Coverage</span>
                    <span className={`font-bold ${
                      idx === 0 ? 'text-green-400' : idx === 1 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {idx === 0 ? '92%' : idx === 1 ? '78%' : '64%'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        idx === 0 ? 'bg-green-500' : idx === 1 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{width: idx === 0 ? '92%' : idx === 1 ? '78%' : '64%'}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
        <h3 className="text-xl font-bold mb-4">Holdings Breakdown</h3>
        <div className="space-y-3">
          {portfolioData.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {item.project[0]}
                </div>
                <div>
                  <div className="font-medium text-white">{item.project}</div>
                  <div className="text-sm text-slate-400">{item.quantity.toLocaleString()} CCTs</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-white">${item.value.toLocaleString()}</div>
                <div className={`text-sm ${item.gain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {item.gain >= 0 ? '+' : ''}{item.gain}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img 
                  src={LOGO_CONFIG.MAIN_LOGO} 
                  alt={LOGO_CONFIG.LOGO_ALT}
                  className="w-8 h-8 object-contain"
                />
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{LOGO_CONFIG.BRAND_NAME} - Corporate Carbon Trading Hub</h1>
                <p className="text-xs text-gray-600">Professional Credit Exchange</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Wallet Connection */}
              {walletConnected ? (
                <div className="flex items-center gap-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-700">
                        {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                      </span>
                      <button onClick={copyAddress} className="text-green-600 hover:text-green-700">
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      {getNetworkName(networkId)}
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowWalletModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-white"
                  >
                    <Wallet className="w-4 h-4" />
                    Wallet
                  </button>
                </div>
              ) : (
                <button 
                  onClick={connectWallet}
                  disabled={isConnecting || connectionAttempted}
                  className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-white ${
                    (isConnecting || connectionAttempted) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Wallet className="w-4 h-4" />
                  {isConnecting 
                    ? 'Connecting...' 
                    : connectionAttempted 
                      ? 'Please Wait...' 
                      : 'Connect Wallet'
                  }
                </button>
              )}
              
              <div className="text-right">
                <div className="text-xs text-gray-600">Market Status</div>
                <div className="flex items-center gap-1 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold">Live Trading</span>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-white">
                <Bell className="w-4 h-4" />
                Alerts
              </button>
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-5 gap-4 mt-4">
            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
              <div className="text-xs text-gray-600 mb-1">Market Cap</div>
              <div className="text-lg font-bold text-gray-900">$2.4B</div>
              <div className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +5.2%
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
              <div className="text-xs text-gray-600 mb-1">24h Volume</div>
              <div className="text-lg font-bold text-gray-900">$156M</div>
              <div className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12.8%
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
              <div className="text-xs text-gray-600 mb-1">Avg Price</div>
              <div className="text-lg font-bold text-gray-900">$12.15</div>
              <div className="text-xs text-red-600 flex items-center gap-1">
                <TrendingDown className="w-3 h-3" /> -1.3%
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
              <div className="text-xs text-gray-600 mb-1">Active Orders</div>
              <div className="text-lg font-bold text-gray-900">1,247</div>
              <div className="text-xs text-gray-600">Live</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
              <div className="text-xs text-gray-600 mb-1">Total CCTs</div>
              <div className="text-lg font-bold text-gray-900">273.5K</div>
              <div className="text-xs text-gray-600">Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {[
                { id: 'marketplace', label: 'Marketplace', icon: Globe },
                { id: 'trading', label: 'Trading Desk', icon: LineChart },
                { id: 'portfolio', label: 'Portfolio', icon: BarChart3 },
                { id: 'analytics', label: 'Analytics', icon: Activity },
                { id: 'compliance', label: 'Compliance', icon: Shield }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-medium transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            
            {/* CLORIT Brand Badge */}
            <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200">
              <img 
                src={LOGO_CONFIG.MAIN_LOGO} 
                alt={LOGO_CONFIG.LOGO_ALT}
                className="w-5 h-5 object-contain"
              />
              <span className="text-xs font-semibold text-green-700">{LOGO_CONFIG.BRAND_NAME}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'marketplace' && renderMarketplace()}
        {activeTab === 'trading' && renderTradingInterface()}
        {activeTab === 'portfolio' && renderPortfolio()}
        {activeTab === 'analytics' && (
          <div className="text-center py-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <img 
                src={LOGO_CONFIG.MAIN_LOGO} 
                alt={LOGO_CONFIG.LOGO_ALT}
                className="w-12 h-12 object-contain opacity-50"
              />
              <Activity className="w-16 h-16 text-blue-500 opacity-50" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{LOGO_CONFIG.BRAND_NAME} Analytics Dashboard</h2>
            <p className="text-gray-600">Advanced market analytics and insights coming soon</p>
          </div>
        )}
        {activeTab === 'compliance' && (
          <div className="text-center py-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <img 
                src={LOGO_CONFIG.MAIN_LOGO} 
                alt={LOGO_CONFIG.LOGO_ALT}
                className="w-12 h-12 object-contain opacity-50"
              />
              <Shield className="w-16 h-16 text-green-500 opacity-50" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{LOGO_CONFIG.BRAND_NAME} Compliance Tools</h2>
            <p className="text-gray-600">ESG compliance and reporting tools coming soon</p>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img 
                  src={LOGO_CONFIG.MAIN_LOGO} 
                  alt={LOGO_CONFIG.LOGO_ALT}
                  className="w-6 h-6 object-contain"
                />
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-900">{selectedProject.project}</h2>
                  <p className="text-blue-600">{selectedProject.seller}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-400"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-2 text-gray-900">Project Details</h3>
                <p className="text-gray-700 mb-4">{selectedProject.verification}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="text-gray-900">{selectedProject.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Available CCTs:</span>
                    <span className="text-gray-900">{selectedProject.available.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Price per CCT:</span>
                    <span className="text-green-600 font-bold">${selectedProject.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Seller Type:</span>
                    <span className="text-gray-900">{selectedProject.sellerType}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-900">Verification & Compliance</h3>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {getVerificationBadge(selectedProject)}
                    {selectedProject.blockchainProof && (
                      <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                        <Lock className="w-3 h-3" /> Blockchain Proof
                      </span>
                    )}
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-600">Token Standard: {selectedProject.tokenStandard}</div>
                    <div className="text-sm text-blue-600">Audit Status: {selectedProject.auditStatus}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={() => {
                  if (!walletConnected) {
                    setShowWalletModal(true);
                  } else {
                    // Proceed with purchase
                    alert('Purchase initiated!');
                  }
                }}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {walletConnected ? 'Buy Now' : 'Connect Wallet to Buy'}
              </button>
              <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wallet Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img 
                  src={LOGO_CONFIG.MAIN_LOGO} 
                  alt={LOGO_CONFIG.LOGO_ALT}
                  className="w-6 h-6 object-contain"
                />
                <h3 className="text-xl font-bold text-gray-900">{LOGO_CONFIG.BRAND_NAME} Wallet</h3>
              </div>
              <button
                onClick={() => setShowWalletModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-400"
              >
                ×
              </button>
            </div>

            {walletConnected ? (
              <div className="space-y-4">
                {/* Wallet Address */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Wallet Address</span>
                    <button onClick={copyAddress} className="text-blue-600 hover:text-blue-700">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="font-mono text-sm text-gray-900 break-all">{walletAddress}</div>
                </div>

                {/* Network */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-700 mb-1">Network</div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-900">{getNetworkName(networkId)}</span>
                  </div>
                </div>

                {/* Balances */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-700 mb-3">Balances</div>
                  <div className="space-y-2">
                    {Object.entries(walletBalance).map(([currency, balance]) => (
                      <div key={currency} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {currency === 'ETH' && <Cpu className="w-4 h-4 text-gray-600" />}
                          {currency === 'USDT' && <Coins className="w-4 h-4 text-gray-600" />}
                          {currency === 'USDC' && <Coins className="w-4 h-4 text-gray-600" />}
                          {currency === 'MATIC' && <Layers className="w-4 h-4 text-gray-600" />}
                          <span className="text-gray-900">{currency}</span>
                        </div>
                        <span className="font-medium text-gray-900">{balance}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => window.open(`https://etherscan.io/address/${walletAddress}`, '_blank')}
                    className="flex-1 bg-blue-50 border border-blue-200 hover:bg-blue-100 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-blue-600"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View on Explorer
                  </button>
                  <button
                    onClick={disconnectWallet}
                    className="flex-1 bg-red-50 border border-red-200 hover:bg-red-100 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-red-600"
                  >
                    <Power className="w-4 h-4" />
                    Disconnect
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <img 
                      src={LOGO_CONFIG.MAIN_LOGO} 
                      alt={LOGO_CONFIG.LOGO_ALT}
                      className="w-12 h-12 object-contain"
                    />
                    <Wallet className="w-12 h-12 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Connect to {LOGO_CONFIG.BRAND_NAME}</h4>
                  <p className="text-gray-600 mb-6">Connect your wallet to start trading carbon credits on the {LOGO_CONFIG.BRAND_NAME} platform</p>
                </div>

                <button
                  onClick={() => {
                    if (!walletConnected && !isConnecting && !connectionAttempted) {
                      connectWallet();
                      setShowWalletModal(false);
                    }
                  }}
                  disabled={isConnecting || connectionAttempted}
                  className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-white ${
                    (isConnecting || connectionAttempted) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Wallet className="w-5 h-5" />
                  {isConnecting 
                    ? 'Connecting...' 
                    : connectionAttempted 
                      ? 'Please Wait...' 
                      : 'Connect MetaMask'
                  }
                </button>

                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    Don't have MetaMask? 
                    <a 
                      href="https://metamask.io/download/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 ml-1"
                    >
                      Download here
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerMarketplace;