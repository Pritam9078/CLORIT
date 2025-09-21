import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Eye, 
  Edit, 
  CheckCircle, 
  FileText, 
  MapPin,
  Calendar,
  TrendingUp,
  AlertCircle,
  Download,
  RefreshCw
} from 'lucide-react';

interface BlueCarbonSite {
  siteId: string;
  siteName: string;
  state: string;
  latitude: number;
  longitude: number;
  ecosystemType: 'Mangrove' | 'Seagrass' | 'Saltmarsh';
  restorationDate: string;
  areaHa: number;
  plantingDensity: number;
  dominantSpecies: string;
  survivalRate: number;
  carbonSequestratedMTCO2e: number;
  verificationStatus: 'Verified' | 'Pending' | 'Rejected';
  lastVerificationDate: string;
  nextVerificationDate: string;
  geoPhotos: number;
  droneImages: number;
  satelliteData: boolean;
  remarks: string;
}

const NCCRProjectsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEcosystem, setFilterEcosystem] = useState<string>('All');
  const [filterState, setFilterState] = useState<string>('All');
  const [selectedSite, setSelectedSite] = useState<BlueCarbonSite | null>(null);

  // Blue Carbon Sites Data from the dataset
  const blueCarbonSites: BlueCarbonSite[] = [
    {
      siteId: 'NCCR-2000',
      siteName: 'Site_2000',
      state: 'Lakshadweep',
      latitude: 10.5626,
      longitude: 72.6369,
      ecosystemType: 'Mangrove',
      restorationDate: '2020-01-15',
      areaHa: 2.5,
      plantingDensity: 1500,
      dominantSpecies: 'Rhizophora apiculata',
      survivalRate: 85.2,
      carbonSequestratedMTCO2e: 125.4,
      verificationStatus: 'Verified',
      lastVerificationDate: '2024-01-10',
      nextVerificationDate: '2024-07-10',
      geoPhotos: 45,
      droneImages: 12,
      satelliteData: true,
      remarks: 'Excellent growth, strong root development'
    },
    {
      siteId: 'NCCR-2001',
      siteName: 'Site_2001',
      state: 'Gujarat',
      latitude: 22.4697,
      longitude: 70.0577,
      ecosystemType: 'Saltmarsh',
      restorationDate: '2020-03-20',
      areaHa: 4.2,
      plantingDensity: 800,
      dominantSpecies: 'Salicornia brachiata',
      survivalRate: 78.9,
      carbonSequestratedMTCO2e: 95.3,
      verificationStatus: 'Pending',
      lastVerificationDate: '2023-12-15',
      nextVerificationDate: '2024-06-15',
      geoPhotos: 32,
      droneImages: 8,
      satelliteData: true,
      remarks: 'Salt tolerance showing good adaptation'
    }
  ];

  const filteredSites = blueCarbonSites.filter(site => {
    const matchesSearch = site.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.dominantSpecies.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEcosystem = filterEcosystem === 'All' || site.ecosystemType === filterEcosystem;
    const matchesState = filterState === 'All' || site.state === filterState;
    return matchesSearch && matchesEcosystem && matchesState;
  });

  const uniqueStates = [...new Set(blueCarbonSites.map(site => site.state))].sort();

  const handleSiteClick = (site: BlueCarbonSite) => {
    setSelectedSite(site);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Verified':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEcosystemColor = (ecosystem: string) => {
    switch (ecosystem) {
      case 'Mangrove':
        return 'bg-green-500';
      case 'Seagrass':
        return 'bg-blue-500';
      case 'Saltmarsh':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const totalSites = blueCarbonSites.length;
  const totalArea = blueCarbonSites.reduce((sum, site) => sum + site.areaHa, 0);
  const totalCarbon = blueCarbonSites.reduce((sum, site) => sum + site.carbonSequestratedMTCO2e, 0);
  const avgSurvivalRate = blueCarbonSites.reduce((sum, site) => sum + site.survivalRate, 0) / totalSites;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Blue Carbon Restoration Sites</h1>
                <p className="mt-2 text-sm text-gray-600">
                  Monitor and manage coastal ecosystem restoration projects across India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sites</p>
                <p className="text-2xl font-bold text-blue-600">{totalSites}</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map((site) => (
            <div
              key={site.siteId}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleSiteClick(site)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{site.siteName}</h3>
                    <p className="text-sm text-gray-600">{site.state}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(site.verificationStatus)}`}>
                    {site.verificationStatus}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NCCRProjectsPage;
