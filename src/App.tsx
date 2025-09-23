import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import WalletConflictHandler from "./utils/walletConflictHandler";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardNavigator from "./components/DashboardNavigator";
import BuyerMarketplace from "./components/BuyerMarketplace";
import NCCRAdminDashboard from "./components/NCCRAdminDashboard";
import PanchayatDashboard from "./components/PanchayatDashboard";
import LandingPage from "./components/LandingPage";
import LandRegistration from "./components/LandRegistration";
import PlantationDataInput from "./components/PlantationDataInput";
import NGOVerification from "./components/NGOVerification";
import LoginOptions from "./components/LoginOptions";
import SignupOptions from "./components/SignupOptions";
import UserLogin from "./components/UserLogin";
import AdminLogin from "./components/AdminLogin";
import UserSignup from "./components/UserSignup";
import AdminSignup from "./components/AdminSignup";
import CommunityDashboard from "./components/CommunityDashboard";
import NGODashboard from "./components/NGODashboard";
import CorporateDashboard from "./components/CorporateDashboard";
import CorporateAnalytics from "./components/CorporateAnalytics";
import CorporateSettings from "./components/CorporateSettings";
import CorporateBuyerMarketplaceDashboard from "./components/CorporateBuyerMarketplaceDashboard";
import CorporatePortfolioManagement from "./components/CorporatePortfolioManagement";
import SustainabilityReports from "./components/SustainabilityReports";
import PanchayatAdminDashboard from "./components/PanchayatAdminDashboard";
import TrackImpact from "./components/TrackImpact";
import EarnCredits from "./components/EarnCredits";
import NDVIApp from "./components/NDVIApp";
import Preloader from "./components/Preloader";

const queryClient = new QueryClient();

// Check if this is the first app load using sessionStorage
const isFirstLoad = () => {
  const hasLoaded = sessionStorage.getItem('clorit-app-loaded');
  return !hasLoaded;
};

const App = () => {
  const [showPreloader, setShowPreloader] = useState(isFirstLoad());
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Initialize wallet-free environment to prevent conflicts
    WalletConflictHandler.initializeWalletFreeEnvironment();
    
    // Mark app as loaded in sessionStorage on first load
    if (showPreloader && !sessionStorage.getItem('clorit-app-loaded')) {
      sessionStorage.setItem('clorit-app-loaded', 'true');
    }
    
    // Set app as ready after a minimal delay to ensure smooth transition
    if (!showPreloader) {
      const timer = setTimeout(() => setAppReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [showPreloader]);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  // Show preloader only on first load
  if (showPreloader) {
    return <Preloader onLoadComplete={handlePreloaderComplete} />;
  }

  // Prevent flash of content during transition
  if (!appReady) {
    return null;
  }

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/original" element={<Index />} />
          
          {/* Authentication Routes */}
          <Route path="/login-options" element={<LoginOptions />} />
          <Route path="/signup-options" element={<SignupOptions />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/user-signup" element={<UserSignup />} />
          <Route path="/admin-signup" element={<AdminSignup />} />
          
          {/* User Dashboards */}
          <Route path="/community-dashboard" element={<CommunityDashboard />} />
          <Route path="/ngo-dashboard" element={<NGODashboard />} />
          
          {/* Admin Dashboards */}
          <Route path="/corporate-dashboard" element={<CorporateDashboard />} />
          <Route path="/corporate-analytics" element={<CorporateAnalytics />} />
          <Route path="/corporate-settings" element={<CorporateSettings />} />
          <Route path="/corporate-marketplace" element={<CorporateBuyerMarketplaceDashboard />} />
          <Route path="/corporate-portfolio" element={<CorporatePortfolioManagement />} />
          <Route path="/impact-reporting" element={<SustainabilityReports />} />
          <Route path="/panchayat-admin-dashboard" element={<PanchayatAdminDashboard />} />
          <Route path="/admin-dashboard" element={<NCCRAdminDashboard />} />
          <Route path="/nccr-dashboard" element={<NCCRAdminDashboard />} />
          
          {/* Legacy/Existing Routes */}
          <Route path="/dashboards" element={<DashboardNavigator />} />
          <Route path="/buyer-marketplace" element={<BuyerMarketplace />} />
          <Route path="/panchayat-dashboard" element={<PanchayatDashboard />} />
          <Route path="/land-registration" element={<LandRegistration />} />
          <Route path="/plantation-data-input" element={<PlantationDataInput />} />
          <Route path="/ngo-verification" element={<NGOVerification />} />
          <Route path="/track-impact" element={<TrackImpact />} />
          <Route path="/earn-credits" element={<EarnCredits />} />
          <Route path="/ndvi-dashboard" element={<NDVIApp />} />
          
          {/* Missing Components - Placeholder Routes */}
          <Route path="/carbon-credit-minting" element={<div>Carbon Credit Minting Component Coming Soon</div>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
