import React, { useState } from "react";
import { CurrencyUtils } from "../utils/currency";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Plus, ShoppingCart, TrendingUp, DollarSign, Search, Eye, Activity, Leaf, Globe, MapPin, Star, TrendingDown, RefreshCw, Download, AlertTriangle } from "lucide-react";

// TypeScript Interfaces
interface MarketplaceProject {
  id: number;
  name: string;
  location: string;
  price: number;
  creditsAvailable: number;
  creditsTotal: number;
  status: "Active" | "Limited" | "Sold Out";
  verificationScore: number;
  lastTraded: string;
  volume24h: number;
  priceChange: number;
  ngoName: string;
  co2Impact: string;
  area: string;
  image: string;
}

interface Transaction {
  id: number;
  buyer: string;
  seller: string;
  amount: number;
  price: number;
  time: string;
  type: "buy" | "sell";
}

// Sample data
const priceTrendData = [
  { month: "Jan", price: 45 },
  { month: "Feb", price: 52 },
  { month: "Mar", price: 48 },
  { month: "Apr", price: 55 },
  { month: "May", price: 62 },
  { month: "Jun", price: 58 },
  { month: "Jul", price: 65 }
];

const tradingVolumeData = [
  { time: "00:00", buy: 120, sell: 80 },
  { time: "04:00", buy: 90, sell: 110 },
  { time: "08:00", buy: 200, sell: 150 },
  { time: "12:00", buy: 250, sell: 180 },
  { time: "16:00", buy: 180, sell: 220 },
  { time: "20:00", buy: 140, sell: 160 }
];

const EnhancedMarketplace: React.FC = () => {
  const [showTradeModal, setShowTradeModal] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<MarketplaceProject | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterRegion, setFilterRegion] = useState<string>("all");
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [quantity, setQuantity] = useState<string>("");
  const [priceLimit, setPriceLimit] = useState<string>("");

  const marketplaceProjects: MarketplaceProject[] = [
    {
      id: 1,
      name: "Sundarban Mangrove Restoration",
      location: "West Bengal",
      price: 58.50,
      creditsAvailable: 2400,
      creditsTotal: 5000,
      status: "Active",
      verificationScore: 98,
      lastTraded: "2 mins ago",
      volume24h: 1200,
      priceChange: 5.2,
      ngoName: "Sundarban Conservation Society",
      co2Impact: "125 tons/year",
      area: "45 hectares",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      name: "Goa Coastal Reforestation",
      location: "Goa",
      price: 62.75,
      creditsAvailable: 1800,
      creditsTotal: 3500,
      status: "Active",
      verificationScore: 95,
      lastTraded: "15 mins ago",
      volume24h: 800,
      priceChange: -2.1,
      ngoName: "Goa Green Initiative",
      co2Impact: "89 tons/year",
      area: "32 hectares",
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      name: "Kerala Backwater Conservation",
      location: "Kerala",
      price: 55.25,
      creditsAvailable: 3200,
      creditsTotal: 4800,
      status: "Active",
      verificationScore: 92,
      lastTraded: "1 hour ago",
      volume24h: 1500,
      priceChange: 8.7,
      ngoName: "Kerala Wetlands Trust",
      co2Impact: "156 tons/year",
      area: "78 hectares",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop"
    }
  ];

  const recentTransactions: Transaction[] = [
    { id: 1, buyer: "EcoTech Corp", seller: "Sundarban Society", amount: 150, price: 58.50, time: "2 mins ago", type: "buy" },
    { id: 2, buyer: "Green Future Ltd", seller: "Goa Initiative", amount: 75, price: 62.75, time: "15 mins ago", type: "buy" },
    { id: 3, buyer: "Climate Solutions", seller: "Kerala Trust", amount: 200, price: 55.25, time: "1 hour ago", type: "buy" }
  ];

  const handleTrade = (project: MarketplaceProject): void => {
    setSelectedProject(project);
    setShowTradeModal(true);
  };

  const executeTrade = (): void => {
    if (!selectedProject) return;
    console.log(`Executing ${tradeType} order: ${quantity} CCTs at ₹${priceLimit || selectedProject.price}`);
    setShowTradeModal(false);
    setQuantity("");
    setPriceLimit("");
  };

  const filteredProjects = marketplaceProjects.filter((project: MarketplaceProject) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === "all" || project.location === filterRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              NCCR Carbon Marketplace
            </h1>
            <p className="text-gray-600 mt-1">Real-time carbon credit trading platform</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="mr-2 h-4 w-4" /> List Credits
            </Button>
            <Button variant="outline" className="border-blue-600 text-blue-600">
              <Download className="mr-2 h-4 w-4" /> Export Data
            </Button>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {[
            { label: "Market Volume", value: "₹2,45,67,890", icon: DollarSign, change: "+12.5%" },
            { label: "Daily Trades", value: "1,847", icon: Activity, change: "+8.3%" },
            { label: "Active Listings", value: "23", icon: ShoppingCart, change: "+2" },
            { label: "Avg Price/CCT", value: "₹58.75", icon: TrendingUp, change: "+5.7%" },
            { label: "Market Cap", value: "₹5,67,89,234", icon: Globe, change: "+15.2%" },
            { label: "Total Credits", value: "9,67,543 CCTs", icon: Leaf, change: "+892", showConversion: true }
          ].map((stat, idx) => (
            <Card key={idx} className="p-4 hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                    <p className="text-lg font-bold text-gray-800">
                      {stat.value}
                      {stat.showConversion && CurrencyUtils.shouldShowConversion(stat.value) && (
                        <span style={{...CurrencyUtils.getConversionStyle(), fontSize: '0.6em', display: 'block'}}>
                          {CurrencyUtils.getConversionString(stat.value)}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-green-600 font-medium">{stat.change}</p>
                  </div>
                  <stat.icon className="w-8 h-8 text-blue-600 opacity-70" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Price Trends
              </CardTitle>
            </CardHeader>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={priceTrendData}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Area type="monotone" dataKey="price" stroke="#059669" fillOpacity={1} fill="url(#priceGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Trading Activity (24h)
              </CardTitle>
            </CardHeader>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={tradingVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Bar dataKey="buy" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="sell" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search projects, locations, or NGOs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex gap-3">
              <Select value={filterRegion} onValueChange={setFilterRegion}>
                <SelectTrigger className="w-40 rounded-xl">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="West Bengal">West Bengal</SelectItem>
                  <SelectItem value="Goa">Goa</SelectItem>
                  <SelectItem value="Kerala">Kerala</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Project Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group hover:scale-[1.02] transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl overflow-hidden">
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={`${project.status === 'Active' ? 'bg-green-500' : 'bg-orange-500'} text-white`}>
                    {project.status}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-blue-500 text-white flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {project.verificationScore}%
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {project.location}
                  </p>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-xl text-gray-800 mb-1">{project.name}</h3>
                  <p className="text-sm text-gray-600">{project.ngoName}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Price per CCT</p>
                    <p className="font-bold text-lg text-green-600">₹{project.price}</p>
                    <p className={`text-xs ${project.priceChange >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center gap-1`}>
                      {project.priceChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {project.priceChange >= 0 ? '+' : ''}{project.priceChange}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Available Credits</p>
                    <p className="font-bold text-lg">{project.creditsAvailable.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{project.creditsTotal.toLocaleString()} total</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                  <div>
                    <p>CO₂ Impact: {project.co2Impact}</p>
                    <p>Area: {project.area}</p>
                  </div>
                  <div>
                    <p>24h Volume: {project.volume24h}</p>
                    <p>Last Traded: {project.lastTraded}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleTrade(project)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Trade
                    </Button>
                    <Button variant="outline" className="px-3 rounded-xl border-gray-300">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="px-3 rounded-xl border-gray-300">
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Transactions */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600" />
                Recent Transactions
              </span>
              <Button variant="ghost" size="sm">
                <RefreshCw className="w-4 h-4 mr-1" />
                Refresh
              </Button>
            </CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${tx.type === 'buy' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div>
                    <p className="font-medium text-sm">{tx.buyer}</p>
                    <p className="text-xs text-gray-500">{tx.seller}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{tx.amount} CCTs</p>
                  <p className="text-xs text-gray-500">₹{tx.price} each</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{tx.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Trading Modal */}
        <Dialog open={showTradeModal} onOpenChange={setShowTradeModal}>
          <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gray-800">
                    Trade {selectedProject.name}
                  </DialogTitle>
                  <p className="text-gray-600">
                    Current Market Price: <span className="font-bold text-green-600">₹{selectedProject.price}</span> per CCT
                  </p>
                </DialogHeader>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
                      <Tabs value={tradeType} onValueChange={(value) => setTradeType(value as "buy" | "sell")}>
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="buy" className="text-green-600">Buy</TabsTrigger>
                          <TabsTrigger value="sell" className="text-red-600">Sell</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (CCTs)</label>
                      <Input
                        type="number"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="rounded-xl"
                      />
                      <p className="text-xs text-gray-500 mt-1">Available: {selectedProject.creditsAvailable} CCTs</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price Limit (₹)</label>
                      <Input
                        type="number"
                        placeholder="Market price or set limit"
                        value={priceLimit}
                        onChange={(e) => setPriceLimit(e.target.value)}
                        className="rounded-xl"
                      />
                      <p className="text-xs text-gray-500 mt-1">Leave empty for market order</p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-xl">
                      <h4 className="font-medium text-blue-800 mb-2">Order Summary</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Quantity:</span>
                          <span className="font-medium">{quantity || 0} CCTs</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Price per CCT:</span>
                          <span className="font-medium">₹{priceLimit || selectedProject.price}</span>
                        </div>
                        <div className="flex justify-between border-t border-blue-200 pt-1">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold text-blue-800">
                            ₹{((parseFloat(quantity) || 0) * parseFloat(priceLimit || selectedProject.price.toString())).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-medium text-gray-800 mb-3">Project Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Verification Score:</span>
                          <Badge className="bg-green-100 text-green-800">{selectedProject.verificationScore}%</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>CO₂ Impact:</span>
                          <span className="font-medium">{selectedProject.co2Impact}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Project Area:</span>
                          <span className="font-medium">{selectedProject.area}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>24h Volume:</span>
                          <span className="font-medium">{selectedProject.volume24h} CCTs</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                        <div className="text-xs text-yellow-700">
                          <p className="font-medium mb-1">Trading Notice:</p>
                          <p>Carbon credits are long-term investments. Review project details before trading.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
                  <Button
                    onClick={executeTrade}
                    disabled={!quantity}
                    className={`flex-1 text-white rounded-xl ${
                      tradeType === 'buy' 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {tradeType === 'buy' ? 'Execute Buy Order' : 'Execute Sell Order'}
                  </Button>
                  <Button variant="outline" onClick={() => setShowTradeModal(false)} className="px-8 rounded-xl">
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EnhancedMarketplace;
