import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  MapPin, 
  Zap, 
  Leaf, 
  Database, 
  TrendingUp, 
  AlertCircle,
  CheckCircle2,
  Info,
  Waves
} from 'lucide-react';
import { registerProject, LandType } from '../services/blockchain';
import { LOGO_CONFIG } from '../constants/branding';
import SatelliteGlobe from './SatelliteGlobe2';
import { cn } from '@/lib/utils';

// UI Components
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger 
} from '@/components/ui/dialog';
import { ModernIcon } from '@/components/ui/ModernIcon';

interface NDVIGraphData {
  date: string;
  ndvi: number;
  temperature: number;
  rainfall: number;
}

interface CommunityUserDashboardProps {
  userInfo?: {
    name: string;
    landArea: number;
    location: string;
  };
}

const CommunityUserDashboard: React.FC<CommunityUserDashboardProps> = ({
  userInfo = {
    name: "Rajesh Kumar",
    landArea: 45.2,
    location: "Sundarbans, West Bengal"
  }
}) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('6months');
  const [selectedProject, setSelectedProject] = useState<string>('proj-1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [newProject, setNewProject] = useState({
    projectId: `PROJ-${Date.now()}`,
    area: 10,
    lat: 21.68,
    lng: 88.82,
    landType: LandType.Mangrove,
    metadataURI: "ipfs://project-metadata-placeholder"
  });

  // Sample NDVI trend data
  const ndviTrendData: NDVIGraphData[] = [
    { date: '2024-01', ndvi: 0.45, temperature: 22, rainfall: 35 },
    { date: '2024-02', ndvi: 0.52, temperature: 25, rainfall: 28 },
    { date: '2024-03', ndvi: 0.58, temperature: 28, rainfall: 15 },
    { date: '2024-04', ndvi: 0.62, temperature: 32, rainfall: 45 },
    { date: '2024-05', ndvi: 0.65, temperature: 35, rainfall: 120 },
    { date: '2024-06', ndvi: 0.68, temperature: 33, rainfall: 95 },
  ];

  const handleRegisterProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await registerProject(
        newProject.projectId,
        newProject.metadataURI,
        newProject.area,
        newProject.lat,
        newProject.lng,
        newProject.landType
      );
      alert(`Project ${newProject.projectId} successfully registered on-chain!`);
      setShowSubmitForm(false);
    } catch (error: unknown) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      alert(`Registration failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderNDVIChart = () => {
    const maxNDVI = Math.max(...ndviTrendData.map(d => d.ndvi));
    
    return (
      <div className="flex items-end gap-2 h-40 pt-4 px-2 bg-slate-50/50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
        {ndviTrendData.map((data, index) => {
          const height = (data.ndvi / maxNDVI) * 100;
          const color = data.ndvi >= 0.6 ? 'bg-emerald-500' : data.ndvi >= 0.4 ? 'bg-amber-500' : 'bg-rose-500';
          
          return (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={cn("flex-1 rounded-t-lg relative group cursor-pointer", color)}
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                {data.date}: {data.ndvi}
              </div>
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white/80">
                {data.ndvi.toFixed(2)}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-950 dark:to-slate-900 font-sans selection:bg-primary/20">
      {/* Premium Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ rotate: 10 }}
              className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl shadow-inner border border-emerald-100 dark:border-emerald-800"
            >
              <img 
                src={LOGO_CONFIG.MAIN_LOGO} 
                alt={LOGO_CONFIG.LOGO_ALT} 
                className="w-10 h-10 object-contain"
              />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                CLORIT <span className="text-emerald-500 font-extrabold px-1.5 py-0.5 rounded-lg border border-emerald-200 bg-emerald-50 dark:bg-emerald-900/10 dark:border-emerald-800/40 text-sm ml-1 uppercase">Community</span>
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <MapPin size={12} className="text-blue-500" />
                {userInfo.location}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Dialog open={showSubmitForm} onOpenChange={setShowSubmitForm}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-200 dark:shadow-blue-900/20 text-white border-none rounded-xl">
                  <Plus className="mr-2 h-4 w-4" /> Register Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] rounded-3xl border-none shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-emerald-500" />
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                    <Database className="text-blue-500" /> On-Chain Registration
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleRegisterProject} className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="area" className="text-sm font-semibold">Project Area (Hectares)</Label>
                    <Input 
                      id="area" 
                      type="number"
                      placeholder="e.g. 10.5"
                      value={newProject.area}
                      onChange={(e) => setNewProject({...newProject, area: parseFloat(e.target.value)})}
                      className="rounded-xl border-slate-200 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lat" className="text-sm font-semibold text-slate-500">Latitude</Label>
                      <Input 
                        id="lat" 
                        type="number" step="0.000001"
                        value={newProject.lat}
                        onChange={(e) => setNewProject({...newProject, lat: parseFloat(e.target.value)})}
                        className="rounded-xl bg-slate-50 border-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lng" className="text-sm font-semibold text-slate-500">Longitude</Label>
                      <Input 
                        id="lng" 
                        type="number" step="0.000001"
                        value={newProject.lng}
                        onChange={(e) => setNewProject({...newProject, lng: parseFloat(e.target.value)})}
                        className="rounded-xl bg-slate-50 border-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Mangrove Type</Label>
                    <Select 
                      value={newProject.landType.toString()}
                      onValueChange={(val) => setNewProject({...newProject, landType: parseInt(val) as LandType})}
                    >
                      <SelectTrigger className="rounded-xl h-12 border-slate-100">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-none shadow-xl">
                        <SelectItem value={LandType.Mangrove.toString()}>Rhizophora (Red Mangrove)</SelectItem>
                        <SelectItem value={LandType.Seagrass.toString()}>Avicennia (Black Mangrove)</SelectItem>
                        <SelectItem value={LandType.SaltMarsh.toString()}>Salt Marsh</SelectItem>
                        <SelectItem value={LandType.Other.toString()}>Other / Scrub</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter className="pt-2">
                    <Button 
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-xl shadow-blue-100 dark:shadow-none"
                    >
                      {isSubmitting ? 'Securing Transaction...' : 'Mint Project Identity'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <div className="flex items-center gap-3 pl-4 border-l">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">{userInfo.name}</div>
                <div className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-1 inline-block rounded">LAND OWNER</div>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center font-bold text-slate-600 shadow-inner">
                {userInfo.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3D Global Insight Card */}
        <Card className="lg:col-span-3 h-[600px] border-none bg-slate-900 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white w-fit border-none shadow-lg">LIVE NDVI LAYER</Badge>
            <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">Geospatial Awareness</h2>
            <p className="text-slate-400 text-sm max-w-md font-medium">Real-time multispectral analysis from Sentinel-2 & PlanetScope constellations synced to your blockchain account.</p>
          </div>
          
          <div className="absolute inset-0 pointer-events-auto">
            <SatelliteGlobe
              userRole="community"
              onRegionClick={(region: { id: string }) => setSelectedProject(region.id)}
              selectedProjectId={selectedProject}
              showNDVILayer={true}
            />
          </div>

          {/* Lens Flare effect */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-400/30 transition-all duration-700" />
        </Card>

        {/* Dashboard Grid Bottom */}
        <div className="lg:col-span-2 space-y-8">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="border-none bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-100 overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
              <CardContent className="pt-6">
                <ModernIcon icon={Leaf} color="green" size="md" className="mb-4" />
                <div className="text-2xl font-bold text-slate-900 dark:text-white">0.65</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Avg NDVI</div>
              </CardContent>
            </Card>

            <Card className="border-none bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-100 overflow-hidden relative group">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
                <CardContent className="pt-6">
                  <ModernIcon icon={Zap} color="blue" size="md" className="mb-4" />
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">1,250</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">CCT Assets</div>
                </CardContent>
            </Card>

            <Card className="border-none bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-100 overflow-hidden relative group">
                <div className="absolute top-0 left-0 w-full h-1 bg-purple-500" />
                <CardContent className="pt-6">
                  <ModernIcon icon={TrendingUp} color="purple" size="md" className="mb-4" />
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">85%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Health Score</div>
                </CardContent>
            </Card>

            <Card className="border-none bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-100 overflow-hidden relative group">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
                <CardContent className="pt-6">
                  <ModernIcon icon={Waves} color="orange" size="md" className="mb-4" />
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">2.3k</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Trees Verified</div>
                </CardContent>
            </Card>
          </div>

          {/* NDVI Chart Card */}
          <Card className="border-none bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl shadow-slate-100 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="text-emerald-500" /> NDVI Health Trend
                </CardTitle>
                <CardDescription>Vegetation health index over time</CardDescription>
              </div>
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {['3months', '6months', '1year'].map(range => (
                  <Button
                    key={range}
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedTimeRange(range)}
                    className={cn(
                        "rounded-lg text-xs font-bold transition-all",
                        selectedTimeRange === range 
                          ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600" 
                          : "text-slate-500 opacity-60 hover:opacity-100"
                    )}
                  >
                    {range === '3months' ? '3M' : range === '6months' ? '6M' : '1Y'}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              {renderNDVIChart()}
              <div className="mt-4 flex justify-between text-[10px] font-bold text-slate-400">
                {ndviTrendData.map((d, i) => <span key={i}>{d.date}</span>)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts & Community Activity */}
        <div className="space-y-6">
          <Card className="border-none bg-slate-50/50 dark:bg-slate-900 rounded-[2rem] border dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <AlertCircle className="text-amber-500" /> Eco-Alerts
              </CardTitle>
              <CardDescription>System notices and verified changes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "NDVI improvement detected", date: "2 days ago", type: "good", icon: CheckCircle2, iconColor: "text-emerald-500" },
                { title: "Imagery update ready", date: "5 days ago", type: "info", icon: Info, iconColor: "text-blue-500" },
                { title: "New CCT assets awarded", date: "1 week ago", type: "credit", icon: Zap, iconColor: "text-amber-500" }
              ].map((alert, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900/50 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:bg-slate-50"
                >
                  <div className={cn("p-2 rounded-xl bg-slate-50 dark:bg-slate-800", alert.iconColor)}>
                    <alert.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-900 truncate">{alert.title}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{alert.date}</div>
                  </div>
                  <Badge variant="outline" className="rounded-lg text-[9px] uppercase tracking-tighter py-0">
                    {alert.type}
                  </Badge>
                </motion.div>
              ))}
              
              <Button variant="outline" className="w-full rounded-2xl border-dashed border-slate-300 dark:border-slate-700 text-slate-500 hover:text-blue-600 transition-colors">
                View All Activity
              </Button>
            </CardContent>
          </Card>

          {/* Quick Support Card */}
          <div className="p-6 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-bold text-lg mb-2">Need Guidance?</h4>
              <p className="text-indigo-100 text-xs mb-4 leading-relaxed">Connect with our mangrove specialists for on-ground assistance or verification queries.</p>
              <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-white/40 rounded-xl backdrop-blur-md">
                Contact Specialist
              </Button>
            </div>
            {/* Background pattern */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommunityUserDashboard;
