import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Wallet, 
  TrendingUp, 
  Shield, 
  Leaf, 
  DollarSign, 
  Users, 
  BarChart3, 
  Clock,
  CheckCircle,
  Star,
  Moon,
  Sun,
  Menu,
  X,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Filter,
  Search,
  Bell,
  Settings,
  ExternalLink,
  Copy,
  Download,
  Share2,
  Heart,
  Eye,
  Calendar,
  MapPin,
  Award,
  Bookmark,
  TrendingDown,
  Activity,
  Globe,
  Lock,
  Unlock,
  CreditCard,
  Banknote,
  Coins
} from 'lucide-react';
import { LOGO_CONFIG } from '../constants/branding';

// Extend Window interface for MetaMask
declare global {
  interface Window {
    ethereum?: any;
  }
}

const NGOMarketplaceDashboard = () => {
  // Main state
  const [activeTab, setActiveTab] = useState('marketplace');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletProvider, setWalletProvider] = useState(null);
  const [networkId, setNetworkId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Trading state
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradeType, setTradeType] = useState('buy');
  const [selectedPair, setSelectedPair] = useState('CCT/USDT');
  const [orderType, setOrderType] = useState('market');
  const [limitPrice, setLimitPrice] = useState('');

  // Portfolio state
  const [portfolioView, setPortfolioView] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  // Mock wallet balances
  const [balances, setBalances] = useState({
    CCT: 125.5,
    USDT: 2500.75,
    ETH: 1.25,
    SOL: 45.2,
    BTC: 0.05,
    USDC: 1250.00,
    BNB: 8.5
  });

  // Mock trading data
  const [priceData, setPriceData] = useState([
    { time: '09:00', price: 12.45, volume: 1250 },
    { time: '10:00', price: 12.52, volume: 1380 },
    { time: '11:00', price: 12.48, volume: 1120 },
    { time: '12:00', price: 12.65, volume: 1450 },
    { time: '13:00', price: 12.71, volume: 1320 },
    { time: '14:00', price: 12.68, volume: 1180 },
    { time: '15:00', price: 12.82, volume: 1520 }
  ]);

  const [currentPrice, setCurrentPrice] = useState(12.82);
  const [priceChange, setPriceChange] = useState(2.85);
  const [volume24h, setVolume24h] = useState(1520000);

  // Trading pairs data
  const tradingPairs = {
    'CCT/USDT': { price: 12.82, change: 2.85, volume: 1520000 },
    'CCT/ETH': { price: 0.0045, change: -1.2, volume: 890000 },
    'CCT/SOL': { price: 0.125, change: 4.1, volume: 650000 }
  };

  // Order book data
  const orderBook = {
    buy: [
      { price: 12.80, amount: 150.5, total: 1926.4 },
      { price: 12.79, amount: 225.3, total: 2881.587 },
      { price: 12.78, amount: 180.7, total: 2309.346 },
      { price: 12.77, amount: 95.2, total: 1215.704 },
      { price: 12.76, amount: 310.8, total: 3965.808 }
    ],
    sell: [
      { price: 12.83, amount: 89.4, total: 1147.002 },
      { price: 12.84, amount: 205.1, total: 2633.484 },
      { price: 12.85, amount: 125.9, total: 1617.815 },
      { price: 12.86, amount: 167.3, total: 2151.478 },
      { price: 12.87, amount: 98.7, total: 1270.269 }
    ]
  };

  // Marketplace data
  const marketplaceItems = [
    {
      id: 1,
      title: "Mangrove Restoration - Indonesia",
      category: "Blue Carbon Projects",
      icon: "🌱",
      ngo: "Blue Ocean Foundation",
      verified: true,
      nccr: true,
      impact: "500 tons CO₂ offset",
      price: 25,
      currency: "CCT",
      description: "Restoring 100 hectares of mangrove forests in Indonesian coastal areas",
      participants: 156,
      progress: 75,
      location: "Indonesia",
      blockchain: "Polygon",
      rating: 4.8,
      categoryColor: "bg-green-100 text-green-800",
      raised: 18750,
      target: 25000,
      deadline: "30 days left",
      benefits: ["Carbon sequestration", "Coastal protection", "Marine biodiversity"],
      risks: "Low",
      roi: "8-12% annually"
    },
    {
      id: 2,
      title: "CCT Token Sale - Batch #47",
      category: "CCT Marketplace",
      icon: "💳",
      ngo: "Carbon Credit Exchange",
      verified: true,
      nccr: true,
      impact: "1000 tons CO₂ verified",
      price: 12.82,
      currency: "USDT",
      description: "Premium verified carbon credit tokens backed by blue carbon projects",
      participants: 89,
      progress: 100,
      location: "Global",
      blockchain: "Ethereum",
      rating: 4.9,
      categoryColor: "bg-blue-100 text-blue-800",
      raised: 128200,
      target: 128200,
      deadline: "Available now",
      benefits: ["Instant liquidity", "Verified credits", "Global accessibility"],
      risks: "Very Low",
      roi: "Market driven"
    },
    {
      id: 3,
      title: "Seagrass Conservation - Australia",
      category: "NCCR Verified",
      icon: "📊",
      ngo: "Ocean Impact Collective",
      verified: true,
      nccr: true,
      impact: "750 tons CO₂ sequestered",
      price: 18.5,
      currency: "CCT",
      description: "Protecting and restoring critical seagrass ecosystems",
      participants: 203,
      progress: 60,
      location: "Australia",
      blockchain: "Solana",
      rating: 4.7,
      categoryColor: "bg-purple-100 text-purple-800",
      raised: 11100,
      target: 18500,
      deadline: "45 days left",
      benefits: ["Marine ecosystem restoration", "Fish habitat protection", "Water quality improvement"],
      risks: "Medium",
      roi: "6-10% annually"
    },
    {
      id: 4,
      title: "Corporate Carbon Offset Program",
      category: "Corporate Buyers",
      icon: "🤝",
      ngo: "GreenTech Solutions",
      verified: true,
      nccr: false,
      impact: "2000 tons CO₂ target",
      price: 15.0,
      currency: "ETH",
      description: "Large-scale corporate sustainability initiative for Fortune 500 companies",
      participants: 12,
      progress: 25,
      location: "USA",
      blockchain: "Ethereum",
      rating: 4.6,
      categoryColor: "bg-orange-100 text-orange-800",
      raised: 3750,
      target: 15000,
      deadline: "60 days left",
      benefits: ["ESG compliance", "Brand sustainability", "Tax benefits"],
      risks: "Low",
      roi: "Social impact focused"
    },
    {
      id: 5,
      title: "Kelp Forest Restoration - Norway",
      category: "Blue Carbon Projects",
      icon: "🌱",
      ngo: "Nordic Blue Carbon",
      verified: true,
      nccr: true,
      impact: "300 tons CO₂ sequestered",
      price: 22,
      currency: "CCT",
      description: "Restoring underwater kelp forests in Norwegian fjords",
      participants: 87,
      progress: 40,
      location: "Norway",
      blockchain: "Avalanche",
      rating: 4.5,
      categoryColor: "bg-green-100 text-green-800",
      raised: 8800,
      target: 22000,
      deadline: "75 days left",
      benefits: ["Marine biodiversity", "Carbon storage", "Ocean health"],
      risks: "Medium",
      roi: "7-11% annually"
    },
    {
      id: 6,
      title: "Salt Marsh Protection - UK",
      category: "Blue Carbon Projects",
      icon: "🌱",
      ngo: "British Coastal Trust",
      verified: true,
      nccr: true,
      impact: "600 tons CO₂ protected",
      price: 20,
      currency: "CCT",
      description: "Protecting ancient salt marshes from coastal development",
      participants: 134,
      progress: 80,
      location: "United Kingdom",
      blockchain: "Polygon",
      rating: 4.7,
      categoryColor: "bg-green-100 text-green-800",
      raised: 16000,
      target: 20000,
      deadline: "15 days left",
      benefits: ["Habitat preservation", "Flood protection", "Bird sanctuary"],
      risks: "Low",
      roi: "5-9% annually"
    }
  ];

  // Transaction history
  const [transactionHistory, setTransactionHistory] = useState([
    { id: 1, type: 'buy', amount: 50, price: 12.75, pair: 'CCT/USDT', time: '2 hours ago', status: 'completed', hash: '0x1234...5678' },
    { id: 2, type: 'sell', amount: 25, price: 12.68, pair: 'CCT/USDT', time: '1 day ago', status: 'completed', hash: '0x2345...6789' },
    { id: 3, type: 'buy', amount: 100, price: 12.45, pair: 'CCT/ETH', time: '2 days ago', status: 'completed', hash: '0x3456...7890' },
    { id: 4, type: 'investment', amount: 75, price: 0, pair: 'CCT', time: '3 days ago', status: 'completed', project: 'Mangrove Restoration' },
    { id: 5, type: 'buy', amount: 200, price: 12.35, pair: 'CCT/USDT', time: '1 week ago', status: 'completed', hash: '0x4567...8901' }
  ]);

  // Portfolio performance data
  const portfolioData = [
    { date: '1W ago', value: 3200, change: -5.2 },
    { date: '6D ago', value: 3350, change: 4.7 },
    { date: '5D ago', value: 3280, change: -2.1 },
    { date: '4D ago', value: 3450, change: 5.2 },
    { date: '3D ago', value: 3520, change: 2.0 },
    { date: '2D ago', value: 3680, change: 4.5 },
    { date: '1D ago', value: 3720, change: 1.1 },
    { date: 'Now', value: 3847, change: 3.4 }
  ];

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 0.05;
      const newPrice = Math.max(10, currentPrice + change);
      setCurrentPrice(newPrice);
      
      const newPriceChange = ((newPrice - 12.45) / 12.45) * 100;
      setPriceChange(newPriceChange);

      const newVolume = Math.floor(Math.random() * 500) + 1200;
      
      setPriceData(prev => [
        ...prev.slice(-6),
        { time: new Date().toLocaleTimeString().slice(0, 5), price: newPrice, volume: newVolume }
      ]);
    }, 8000);

    return () => clearInterval(interval);
  }, [currentPrice]);

  // Add notifications simulation
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      const messages = [
        "New blue carbon project listed: Coral Reef Protection",
        "CCT price alert: Target price reached",
        "Your mangrove investment earned rewards",
        "New NCCR verification completed",
        "Weekly impact report available"
      ];
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setNotifications(prev => [{
        id: Date.now(),
        message: randomMessage,
        time: new Date().toLocaleTimeString(),
        read: false
      }, ...prev.slice(0, 4)]);
    }, 30000);

    return () => clearInterval(notificationInterval);
  }, []);

  // Wallet connection functions
  const connectWallet = async () => {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        alert('❌ Web3 wallet connection is not available in this environment.');
        return;
      }

      // Check if MetaMask or other Web3 wallet is installed
      if (!window.ethereum) {
        alert('🦊 MetaMask is not installed!\n\nTo connect your wallet:\n1. Install MetaMask browser extension\n2. Create or import your wallet\n3. Refresh this page and try again\n\nDownload at: https://metamask.io');
        return;
      }

      console.log('🔄 Connecting to wallet...');

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (!accounts || accounts.length === 0) {
        alert('❌ No accounts found. Please make sure your wallet is unlocked and try again.');
        return;
      }

      console.log('✅ Accounts found:', accounts.length);

      // Get network information
      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      console.log('🌐 Connected to chain:', chainId);

      const networkNames = {
        '0x1': 'Ethereum Mainnet',
        '0x89': 'Polygon Mainnet',
        '0xa86a': 'Avalanche C-Chain',
        '0x38': 'BSC Mainnet',
        '0x2105': 'Base Mainnet',
        '0xaa36a7': 'Sepolia Testnet',
        '0x13881': 'Polygon Mumbai'
      };

      const networkName = networkNames[chainId] || `Chain ID: ${parseInt(chainId, 16)}`;

      // Set wallet state
      setWalletConnected(true);
      setWalletAddress(accounts[0]);
      setWalletProvider(window.ethereum);
      setNetworkId(chainId);

      // Show success message
      alert(`🎉 Wallet Connected Successfully!

Address: ${accounts[0].slice(0, 8)}...${accounts[0].slice(-6)}
Network: ${networkName}

You can now trade carbon credits and invest in projects!`);

      // Listen for account changes
      if (window.ethereum.on) {
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
        window.ethereum.on('disconnect', handleWalletDisconnect);
      }

    } catch (error: any) {
      console.error('❌ Wallet connection error:', error);
      
      if (error.code === 4001) {
        alert('❌ Connection Rejected\n\nYou rejected the connection request. Click "Connect Wallet" again to retry.');
      } else if (error.code === -32002) {
        alert('⏳ Connection Request Pending\n\nPlease check MetaMask - there might be a pending connection request waiting for your approval.');
      } else if (error.code === -32603) {
        alert('⚠️ Internal Error\n\nThere was an internal wallet error. Please try refreshing the page.');
      } else {
        alert(`❌ Connection Failed\n\nError: ${error.message || 'Unknown error'}\n\nPlease try:\n1. Refreshing the page\n2. Restarting MetaMask\n3. Checking your internet connection`);
      }
    }
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress('');
    setWalletProvider(null);
    setNetworkId(null);
    
    // Remove event listeners
    if (window.ethereum && window.ethereum.removeListener) {
      try {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('disconnect', handleWalletDisconnect);
      } catch (error) {
        console.warn('Error removing wallet event listeners:', error);
      }
    }
    
    console.log('👋 Wallet disconnected');
    alert('👋 Wallet disconnected successfully');
  };

  const handleAccountsChanged = (accounts: string[]) => {
    console.log('🔄 Account changed:', accounts);
    if (!accounts || accounts.length === 0) {
      disconnectWallet();
    } else {
      setWalletAddress(accounts[0]);
      console.log('✅ Account updated to:', accounts[0]);
    }
  };

  const handleChainChanged = (chainId: string) => {
    console.log('🌐 Network changed to:', chainId);
    setNetworkId(chainId);
    // Optionally reload to ensure compatibility
    // window.location.reload();
  };

  const handleWalletDisconnect = () => {
    console.log('🔌 Wallet disconnected by user');
    disconnectWallet();
  };

  // Switch to a specific network
  const switchNetwork = async (chainId: string) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
      } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        const networkConfigs = {
          '0x89': {
            chainId: '0x89',
            chainName: 'Polygon Mainnet',
            nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
            rpcUrls: ['https://polygon-rpc.com/'],
            blockExplorerUrls: ['https://polygonscan.com/']
          },
          '0xa86a': {
            chainId: '0xa86a',
            chainName: 'Avalanche C-Chain',
            nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
            rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
            blockExplorerUrls: ['https://snowtrace.io/']
          }
        };

        const config = networkConfigs[chainId];
        if (config) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [config],
            });
          } catch (addError) {
            console.error('Error adding network:', addError);
          }
        }
      }
    }
  };

  // Check wallet connection on component mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          });
          
          if (accounts.length > 0) {
            const chainId = await window.ethereum.request({
              method: 'eth_chainId',
            });
            
            setWalletConnected(true);
            setWalletAddress(accounts[0]);
            setWalletProvider(window.ethereum);
            setNetworkId(chainId);

            // Set up event listeners
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
        }
      }
    };

    checkWalletConnection();

    // Cleanup event listeners on unmount
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  // Enhanced trade execution with Web3 integration
  const executeTrade = async () => {
    if (!tradeAmount || !walletConnected) {
      alert('Please connect your wallet and enter an amount');
      return;
    }
    
    if (!walletProvider) {
      alert('Wallet provider not found. Please reconnect your wallet.');
      return;
    }

    try {
      const amount = parseFloat(tradeAmount);
      const price = orderType === 'limit' ? parseFloat(limitPrice) : currentPrice;
      const totalValue = amount * price;
      const fee = totalValue * 0.001; // 0.1% trading fee

      // Show confirmation dialog
      const confirmed = window.confirm(
        `Confirm ${tradeType.toUpperCase()} Order:\n` +
        `Amount: ${amount} CCT\n` +
        `Price: $${price.toFixed(2)} per CCT\n` +
        `Trading Fee: $${fee.toFixed(2)}\n` +
        `Total: $${(totalValue + (tradeType === 'buy' ? fee : -fee)).toFixed(2)}\n\n` +
        `This will initiate a blockchain transaction. Continue?`
      );

      if (!confirmed) return;

      if (tradeType === 'buy') {
        const requiredBalance = totalValue + fee;
        if (balances.USDT < requiredBalance) {
          alert(`❌ Insufficient USDT balance. Required: ${requiredBalance.toFixed(2)} USDT`);
          return;
        }

        // Simulate Web3 transaction
        const txHash = `0x${Math.random().toString(16).substr(2, 64)}`;
        
        setBalances(prev => ({
          ...prev,
          CCT: prev.CCT + amount,
          USDT: prev.USDT - requiredBalance
        }));
        
        const newTransaction = {
          id: Date.now(),
          type: 'buy' as const,
          amount,
          price,
          pair: selectedPair,
          time: 'Just now',
          status: 'completed',
          hash: txHash
        };
        
        setTransactionHistory(prev => [newTransaction, ...prev]);
        alert(`✅ Buy Order Executed!\n` +
              `Transaction Hash: ${txHash.slice(0, 10)}...${txHash.slice(-8)}\n` +
              `Purchased: ${amount} CCT at $${price.toFixed(2)}\n` +
              `Fee: $${fee.toFixed(2)}\n` +
              `Total Cost: $${requiredBalance.toFixed(2)}`);
      } else {
        if (balances.CCT < amount) {
          alert(`❌ Insufficient CCT balance. Available: ${balances.CCT.toFixed(4)} CCT`);
          return;
        }

        const receivedValue = totalValue - fee;
        const txHash = `0x${Math.random().toString(16).substr(2, 64)}`;
        
        setBalances(prev => ({
          ...prev,
          CCT: prev.CCT - amount,
          USDT: prev.USDT + receivedValue
        }));
        
        const newTransaction = {
          id: Date.now(),
          type: 'sell' as const,
          amount,
          price,
          pair: selectedPair,
          time: 'Just now',
          status: 'completed',
          hash: txHash
        };
        
        setTransactionHistory(prev => [newTransaction, ...prev]);
        alert(`✅ Sell Order Executed!\n` +
              `Transaction Hash: ${txHash.slice(0, 10)}...${txHash.slice(-8)}\n` +
              `Sold: ${amount} CCT at $${price.toFixed(2)}\n` +
              `Fee: $${fee.toFixed(2)}\n` +
              `Received: $${receivedValue.toFixed(2)}`);
      }
      
      setTradeAmount('');
      setLimitPrice('');

    } catch (error) {
      console.error('Trading error:', error);
      alert(`❌ Trade execution failed: ${error.message}`);
    }
  };

  // Enhanced investment function with Web3 integration
  const investInProject = async (project, amount) => {
    if (!walletConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!walletProvider) {
      alert('Wallet provider not found. Please reconnect your wallet.');
      return;
    }

    try {
      const cost = amount * project.price;
      const currency = project.currency;

      // Check if user has sufficient balance
      if (balances[currency] < cost) {
        alert(`❌ Insufficient ${currency} balance. Required: ${cost} ${currency}`);
        return;
      }

      // Simulate transaction confirmation
      const confirmed = window.confirm(
        `Confirm Investment:\n` +
        `Project: ${project.title}\n` +
        `Amount: ${amount} units\n` +
        `Cost: ${cost} ${currency}\n` +
        `Expected Impact: ${project.impact}\n\n` +
        `This will initiate a blockchain transaction. Continue?`
      );

      if (!confirmed) return;

      // Show loading state
      const loadingAlert = alert('🔄 Processing transaction... Please confirm in your wallet.');

      // Simulate Web3 transaction
      try {
        // In a real implementation, you would:
        // 1. Create a contract instance
        // 2. Call the investment function
        // 3. Wait for transaction confirmation
        
        // For demo, we'll simulate a transaction hash
        const simulatedTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
        
        // Update balances
        setBalances(prev => ({
          ...prev,
          [currency]: prev[currency] - cost
        }));

        const newTransaction = {
          id: Date.now(),
          type: 'investment' as const,
          amount,
          price: project.price,
          pair: 'CCT',
          project: project.title,
          time: 'Just now',
          status: 'completed',
          hash: simulatedTxHash
        };

        setTransactionHistory(prev => [newTransaction, ...prev]);
        
        alert(`🌱 Investment Successful!\n` +
              `Transaction Hash: ${simulatedTxHash.slice(0, 10)}...${simulatedTxHash.slice(-8)}\n` +
              `Invested: ${cost} ${currency} in ${project.title}\n` +
              `Expected Impact: ${project.impact}`);
        
        setSelectedProject(null);

      } catch (txError) {
        console.error('Transaction error:', txError);
        alert(`❌ Transaction failed: ${txError.message || 'Unknown error'}`);
      }

    } catch (error) {
      console.error('Investment error:', error);
      alert(`❌ Investment failed: ${error.message}`);
    }
  };

  // Theme classes
  const bgClass = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardClass = isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const secondaryTextClass = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const inputClass = isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300';

  // Filter marketplace items
  const filteredItems = marketplaceItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.ngo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Render marketplace
  const renderMarketplace = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`${cardClass} rounded-xl border p-4 text-center`}>
          <div className="text-2xl font-bold text-green-500 mb-1">2.4M</div>
          <div className={`text-sm ${secondaryTextClass}`}>Tons CO₂ Offset</div>
        </div>
        <div className={`${cardClass} rounded-xl border p-4 text-center`}>
          <div className="text-2xl font-bold text-blue-500 mb-1">47</div>
          <div className={`text-sm ${secondaryTextClass}`}>Active Projects</div>
        </div>
        <div className={`${cardClass} rounded-xl border p-4 text-center`}>
          <div className="text-2xl font-bold text-purple-500 mb-1">$12.82</div>
          <div className={`text-sm ${secondaryTextClass}`}>CCT Price</div>
        </div>
        <div className={`${cardClass} rounded-xl border p-4 text-center`}>
          <div className="text-2xl font-bold text-orange-500 mb-1">1.2K</div>
          <div className={`text-sm ${secondaryTextClass}`}>Investors</div>
        </div>
      </div>

      {/* Page Title and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className={`text-2xl font-bold ${textClass} mb-2`}>Blue Carbon Marketplace</h1>
          <p className={secondaryTextClass}>Invest in verified blue carbon projects and trade carbon credits</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 pr-4 py-2 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Blue Carbon Projects', 'CCT Marketplace', 'NCCR Verified', 'Corporate Buyers'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : isDarkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Marketplace Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`${cardClass} rounded-xl border hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group`}
            onClick={() => setSelectedProject(item)}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${item.categoryColor}`}>
                {item.category}
              </div>
            </div>

            <div className="p-6">
              {/* Title and NGO */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className={`font-semibold ${textClass} mb-1`}>{item.title}</h3>
                  <p className={`text-sm ${secondaryTextClass}`}>{item.ngo}</p>
                </div>
                <div className="flex items-center space-x-1 ml-2">
                  {item.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                  {item.nccr && <Shield className="w-4 h-4 text-blue-500" />}
                </div>
              </div>

              {/* Impact & Price */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Leaf className="w-4 h-4 text-green-500" />
                  <span className={`text-sm ${secondaryTextClass}`}>{item.impact}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`font-bold text-lg ${textClass}`}>
                    {item.price} {item.currency}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className={`text-sm ${secondaryTextClass}`}>{item.rating}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className={secondaryTextClass}>Progress</span>
                  <span className={secondaryTextClass}>{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span className={secondaryTextClass}>{item.participants} investors</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span className={secondaryTextClass}>{item.deadline}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render trading interface
  const renderTrading = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Trading Chart */}
      <div className="lg:col-span-2 space-y-6">
        {/* Price Header */}
        <div className={`${cardClass} rounded-xl border p-6`}>
          <div className="flex items-center justify-between mb-4">
            <select 
              value={selectedPair} 
              onChange={(e) => setSelectedPair(e.target.value)}
              className={`font-bold text-xl ${textClass} bg-transparent border-none outline-none`}
            >
              <option value="CCT/USDT">CCT/USDT</option>
              <option value="CCT/ETH">CCT/ETH</option>
              <option value="CCT/SOL">CCT/SOL</option>
            </select>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-yellow-600">Live</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`text-3xl font-bold ${textClass}`}>
              ${currentPrice.toFixed(2)}
            </span>
            <div className={`flex items-center space-x-1 ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {priceChange >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              <span className="font-medium">
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className={`${cardClass} rounded-xl border p-6`}>
          <h3 className={`font-semibold mb-4 ${textClass}`}>Price Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="time" 
                stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
                fontSize={12}
              />
              <YAxis 
                stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Order Book */}
        <div className={`${cardClass} rounded-xl border p-6`}>
          <h3 className={`font-semibold mb-4 ${textClass}`}>Order Book</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-green-500 font-medium mb-2">Buy Orders</h4>
              {orderBook.buy.map((order, index) => (
                <div key={index} className="flex justify-between text-sm py-1">
                  <span className="text-green-500">${order.price.toFixed(2)}</span>
                  <span className={secondaryTextClass}>{order.amount.toFixed(1)}</span>
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-red-500 font-medium mb-2">Sell Orders</h4>
              {orderBook.sell.map((order, index) => (
                <div key={index} className="flex justify-between text-sm py-1">
                  <span className="text-red-500">${order.price.toFixed(2)}</span>
                  <span className={secondaryTextClass}>{order.amount.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trading Panel */}
      <div className="space-y-6">
        {/* Wallet Connection */}
        <div className={`${cardClass} rounded-xl border p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold ${textClass}`}>Wallet</h3>
            <Wallet className="w-5 h-5" />
          </div>
          {!walletConnected ? (
            <div className="space-y-3">
              <button
                onClick={connectWallet}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Wallet className="w-4 h-4" />
                <span>Connect Wallet</span>
              </button>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800 font-medium mb-2">Need a Web3 Wallet?</p>
                <p className="text-xs text-blue-700 mb-2">
                  Install MetaMask or another Web3 wallet to start trading carbon credits
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => window.open('https://metamask.io', '_blank')}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
                  >
                    Get MetaMask
                  </button>
                  <button 
                    onClick={() => window.open('https://walletconnect.com/explorer', '_blank')}
                    className="text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 transition-colors"
                  >
                    Other Wallets
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-xs text-green-500 mb-2 flex items-center space-x-1">
                <CheckCircle className="w-3 h-3" />
                <span>Wallet Connected</span>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Address:</span>
                  <span className="font-mono">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Network:</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>
                      {networkId === '0x1' ? 'Ethereum' : 
                       networkId === '0x89' ? 'Polygon' :
                       networkId === '0xa86a' ? 'Avalanche' : 'Connected'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Network Switcher */}
              <div className="space-y-2">
                <p className="text-xs text-gray-600">Switch Network:</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => switchNetwork('0x1')}
                    className={`text-xs py-1 px-2 rounded transition-colors ${
                      networkId === '0x1' 
                        ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Ethereum
                  </button>
                  <button
                    onClick={() => switchNetwork('0x89')}
                    className={`text-xs py-1 px-2 rounded transition-colors ${
                      networkId === '0x89' 
                        ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Polygon
                  </button>
                </div>
              </div>

              {/* Balances */}
              <div className="space-y-1">
                <p className="text-xs text-gray-600 mb-2">Balances:</p>
                {Object.entries(balances).map(([token, balance]) => (
                  <div key={token} className="flex justify-between text-xs">
                    <span className={secondaryTextClass}>{token}</span>
                    <span className={`font-medium ${textClass}`}>{balance.toFixed(4)}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={disconnectWallet}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded text-xs transition-colors"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>

        {/* Trade Panel */}
        <div className={`${cardClass} rounded-xl border p-6`}>
          <h3 className={`font-semibold mb-4 ${textClass}`}>Trade CCT</h3>
          
          {/* Buy/Sell Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
            <button
              onClick={() => setTradeType('buy')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                tradeType === 'buy'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setTradeType('sell')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                tradeType === 'sell'
                  ? 'bg-red-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sell
            </button>
          </div>

          {/* Order Type */}
          <div className="mb-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setOrderType('market')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  orderType === 'market'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Market
              </button>
              <button
                onClick={() => setOrderType('limit')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  orderType === 'limit'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Limit
              </button>
            </div>
          </div>

          {/* Limit Price Input */}
          {orderType === 'limit' && (
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${textClass}`}>Limit Price (USDT)</label>
              <input
                type="number"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                placeholder="0.00"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClass}`}
              />
            </div>
          )}

          {/* Amount Input */}
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-2 ${textClass}`}>Amount (CCT)</label>
            <input
              type="number"
              value={tradeAmount}
              onChange={(e) => setTradeAmount(e.target.value)}
              placeholder="0.00"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClass}`}
            />
          </div>

          {/* Total */}
          <div className="mb-4">
            <div className="flex justify-between text-sm">
              <span className={secondaryTextClass}>Total (USDT)</span>
              <span className={textClass}>
                {tradeAmount ? (parseFloat(tradeAmount) * (orderType === 'limit' ? (parseFloat(limitPrice) || currentPrice) : currentPrice)).toFixed(2) : '0.00'}
              </span>
            </div>
          </div>

          {/* Execute Button */}
          <button
            onClick={executeTrade}
            disabled={!walletConnected || !tradeAmount || (orderType === 'limit' && !limitPrice)}
            className={`w-full font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
              !walletConnected 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : tradeType === 'buy'
                  ? 'bg-green-500 hover:bg-green-600 text-white disabled:bg-gray-400'
                  : 'bg-red-500 hover:bg-red-600 text-white disabled:bg-gray-400'
            }`}
          >
            {!walletConnected ? (
              <>
                <Wallet className="w-4 h-4" />
                Connect Wallet to Trade
              </>
            ) : !tradeAmount ? (
              `Enter Amount to ${tradeType === 'buy' ? 'Buy' : 'Sell'}`
            ) : (orderType === 'limit' && !limitPrice) ? (
              'Enter Limit Price'
            ) : (
              <>
                {tradeType === 'buy' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {tradeType === 'buy' ? 'Buy CCT' : 'Sell CCT'}
              </>
            )}
          </button>
        </div>

        {/* Transaction History */}
        <div className={`${cardClass} rounded-xl border p-6`}>
          <h3 className={`font-semibold mb-4 ${textClass}`}>Recent Trades</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {transactionHistory.slice(0, 10).map((tx) => (
              <div key={tx.id} className="flex items-center justify-between text-sm py-2 border-b border-gray-100">
                <div>
                  <span className={tx.type === 'buy' ? 'text-green-500' : tx.type === 'sell' ? 'text-red-500' : 'text-blue-500'}>
                    {tx.type.toUpperCase()}
                  </span>
                  <span className={`ml-2 ${secondaryTextClass}`}>
                    {tx.amount} {tx.project ? 'units' : tx.pair?.split('/')[0] || 'CCT'}
                  </span>
                </div>
                <div className="text-right">
                  <div className={textClass}>
                    {tx.type === 'investment' ? `${tx.project}` : `${tx.price?.toFixed(2)}`}
                  </div>
                  <div className={`text-xs ${secondaryTextClass}`}>{tx.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Render My Assets
  const renderMyAssets = () => (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${cardClass} rounded-xl border p-6`}>
          <h3 className={`font-semibold mb-4 ${textClass}`}>Portfolio Value</h3>
          <div className="text-3xl font-bold text-green-500 mb-2">
            ${portfolioData[portfolioData.length - 1].value.toLocaleString()}
          </div>
          <div className="flex items-center space-x-1 text-green-500">
            <ArrowUpRight className="w-4 h-4" />
            <span className="text-sm">+{portfolioData[portfolioData.length - 1].change}% (24h)</span>
          </div>
        </div>

        <div className={`${cardClass} rounded-xl border p-6`}>
          <h3 className={`font-semibold mb-4 ${textClass}`}>Carbon Impact</h3>
          <div className="text-3xl font-bold text-blue-500 mb-2">
            {balances.CCT.toFixed(1)} tons
          </div>
          <div className="flex items-center space-x-1">
            <Leaf className="w-4 h-4 text-green-500" />
            <span className={`text-sm ${secondaryTextClass}`}>CO₂ offset capacity</span>
          </div>
        </div>

        <div className={`${cardClass} rounded-xl border p-6`}>
          <h3 className={`font-semibold mb-4 ${textClass}`}>Active Investments</h3>
          <div className="text-3xl font-bold text-purple-500 mb-2">
            {transactionHistory.filter(tx => tx.type === 'investment').length}
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-blue-500" />
            <span className={`text-sm ${secondaryTextClass}`}>Projects supported</span>
          </div>
        </div>
      </div>

      {/* Portfolio Chart */}
      <div className={`${cardClass} rounded-xl border p-6`}>
        <h3 className={`font-semibold mb-4 ${textClass}`}>Portfolio Performance</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={portfolioData}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
            <XAxis 
              dataKey="date" 
              stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
              fontSize={12}
            />
            <YAxis 
              stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Holdings */}
      <div className={`${cardClass} rounded-xl border p-6`}>
        <h3 className={`font-semibold mb-4 ${textClass}`}>Holdings</h3>
        <div className="space-y-3">
          {Object.entries(balances).map(([token, balance]) => {
            const value = token === 'CCT' ? balance * currentPrice : 
                         token === 'USDT' || token === 'USDC' ? balance : 
                         token === 'ETH' ? balance * 3200 :
                         token === 'SOL' ? balance * 80 :
                         token === 'BTC' ? balance * 45000 : balance * 300;
            
            return (
              <div key={token} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {token[0]}
                  </div>
                  <div>
                    <div className={`font-medium ${textClass}`}>{token}</div>
                    <div className={`text-sm ${secondaryTextClass}`}>{balance.toFixed(4)} {token}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${textClass}`}>${value.toFixed(2)}</div>
                  <div className={`text-sm ${secondaryTextClass}`}>
                    {((value / portfolioData[portfolioData.length - 1].value) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Render Impact Reports
  const renderImpactReports = () => (
    <div className="space-y-6">
      <div className={`${cardClass} rounded-xl border p-6`}>
        <h3 className={`font-semibold mb-6 ${textClass}`}>Impact Dashboard</h3>
        
        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-500 mb-2">1,247</div>
            <div className={`text-sm ${secondaryTextClass}`}>Tons CO₂ Offset</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-500 mb-2">89</div>
            <div className={`text-sm ${secondaryTextClass}`}>Hectares Restored</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-500 mb-2">3,456</div>
            <div className={`text-sm ${secondaryTextClass}`}>Trees Planted</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-500 mb-2">12</div>
            <div className={`text-sm ${secondaryTextClass}`}>Communities Helped</div>
          </div>
        </div>

        {/* Verification Status */}
        <div className="space-y-4">
          <h4 className={`font-medium ${textClass}`}>Project Verification Status</h4>
          {['Mangrove Project #1', 'Seagrass Initiative', 'Blue Carbon Program', 'Kelp Forest Restoration'].map((project, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className={textClass}>{project}</span>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-600 text-sm">Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Impact Activities */}
        <div className="mt-8">
          <h4 className={`font-medium mb-4 ${textClass}`}>Recent Impact Activities</h4>
          <div className="space-y-3">
            {[
              { action: 'Carbon credits retired', amount: '25 tons CO₂', time: '2 hours ago', icon: '🌱' },
              { action: 'Mangrove seedlings planted', amount: '150 trees', time: '1 day ago', icon: '🌿' },
              { action: 'Seagrass area protected', amount: '5 hectares', time: '3 days ago', icon: '🌊' },
              { action: 'Community training completed', amount: '30 people', time: '1 week ago', icon: '👥' }
            ].map((activity, index) => (
              <div key={index} className={`flex items-center space-x-3 p-3 ${cardClass} rounded-lg border`}>
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1">
                  <div className={`font-medium ${textClass}`}>{activity.action}</div>
                  <div className={`text-sm ${secondaryTextClass}`}>{activity.amount} • {activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      {/* Header */}
      <header className={`${cardClass} border-b sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {[
                { id: 'marketplace', label: 'Marketplace', icon: Users },
                { id: 'trading', label: 'Trading', icon: TrendingUp },
                { id: 'assets', label: 'My Assets', icon: Wallet },
                { id: 'impact', label: 'Impact Reports', icon: BarChart3 }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === id 
                      ? 'bg-blue-100 text-blue-700' 
                      : `${secondaryTextClass} hover:${textClass}`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-lg ${secondaryTextClass} hover:${textClass} relative`}
                >
                  <Bell className="w-5 h-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                  )}
                </button>
                
                {showNotifications && (
                  <div className={`absolute right-0 mt-2 w-80 ${cardClass} rounded-xl border shadow-lg z-50`}>
                    <div className="p-4 border-b">
                      <h3 className={`font-semibold ${textClass}`}>Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center">
                          <span className={secondaryTextClass}>No notifications</span>
                        </div>
                      ) : (
                        notifications.map(notification => (
                          <div key={notification.id} className="p-3 border-b hover:bg-gray-50">
                            <p className={`text-sm ${textClass}`}>{notification.message}</p>
                            <p className={`text-xs ${secondaryTextClass} mt-1`}>{notification.time}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg ${secondaryTextClass} hover:${textClass}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Wallet Status */}
              <div className="hidden sm:flex items-center space-x-2">
                {walletConnected ? (
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2 text-green-500">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">
                        {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">
                        {networkId === '0x1' ? 'ETH' : 
                         networkId === '0x89' ? 'MATIC' :
                         networkId === '0xa86a' ? 'AVAX' : 'Connected'}
                      </span>
                    </div>
                    <button
                      onClick={disconnectWallet}
                      className="text-sm text-red-500 hover:text-red-600"
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={connectWallet}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>Connect Wallet</span>
                  </button>
                )}
              </div>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-2">
                {[
                  { id: 'marketplace', label: 'Marketplace', icon: Users },
                  { id: 'trading', label: 'Trading', icon: TrendingUp },
                  { id: 'assets', label: 'My Assets', icon: Wallet },
                  { id: 'impact', label: 'Impact Reports', icon: BarChart3 }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveTab(id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === id 
                        ? 'bg-blue-100 text-blue-700' 
                        : `${secondaryTextClass} hover:${textClass}`
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'marketplace' && renderMarketplace()}
        {activeTab === 'trading' && renderTrading()}
        {activeTab === 'assets' && renderMyAssets()}
        {activeTab === 'impact' && renderImpactReports()}
      </main>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${cardClass} rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className={`text-2xl font-bold ${textClass} mb-2`}>{selectedProject.title}</h2>
                <p className={`${secondaryTextClass}`}>{selectedProject.ngo}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className={`p-2 rounded-lg hover:bg-gray-100 ${secondaryTextClass}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className={`font-semibold ${textClass} mb-2`}>Project Details</h3>
                <p className={`${secondaryTextClass} mb-4`}>{selectedProject.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={secondaryTextClass}>Location:</span>
                    <span className={textClass}>{selectedProject.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={secondaryTextClass}>Blockchain:</span>
                    <span className={textClass}>{selectedProject.blockchain}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={secondaryTextClass}>Participants:</span>
                    <span className={textClass}>{selectedProject.participants}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={secondaryTextClass}>Risk Level:</span>
                    <span className={`${selectedProject.risks === 'Low' ? 'text-green-500' : selectedProject.risks === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                      {selectedProject.risks}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className={`font-semibold ${textClass} mb-2`}>Impact & Investment</h3>
                <div className="space-y-4">
                  <div className={`bg-green-50 p-4 rounded-lg`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Leaf className="w-5 h-5 text-green-500" />
                      <span className={`font-medium ${textClass}`}>Environmental Impact</span>
                    </div>
                    <p className={secondaryTextClass}>{selectedProject.impact}</p>
                  </div>

                  <div className={`bg-blue-50 p-4 rounded-lg`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="w-5 h-5 text-blue-500" />
                      <span className={`font-medium ${textClass}`}>Investment Price</span>
                    </div>
                    <p className={`text-xl font-bold ${textClass}`}>
                      {selectedProject.price} {selectedProject.currency}
                    </p>
                    <p className={`text-sm ${secondaryTextClass}`}>Expected ROI: {selectedProject.roi}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className={`font-semibold ${textClass} mb-2`}>Key Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {selectedProject.benefits.map((benefit, index) => (
                  <div key={index} className="bg-gray-50 p-2 rounded text-sm text-center">
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={() => investInProject(selectedProject, 1)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Invest Now
              </button>
              <button 
                onClick={() => setSelectedProject(null)}
                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NGOMarketplaceDashboard;