import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import WalletConflictHandler from "./utils/walletConflictHandler";

// New Core Layouts & Logic
import AuthGuard from "./components/shared/AuthGuard";
import { DashboardHome, Unauthorized } from "./components/shared/DashboardHome";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// Specialized Dashboards
import AdminDashboard from "./components/AdminDashboard";
import NGODashboard from "./components/dashboards/NGO/NGODashboard";
import CorporateDashboard from "./components/dashboards/Corporate/CorporateDashboard";
import UserDashboard from "./components/dashboards/User/UserDashboard";

// Existing Components (Keeping for backward compatibility or public pages)
import LandingPage from "./components/LandingPageNew";
import NotFound from "./pages/NotFound";
import Preloader from "./components/Preloader";
import ScrollToTop from './components/ScrollToTop';

const queryClient = new QueryClient();

const isFirstLoad = () => {
  const hasLoaded = sessionStorage.getItem('clorit-app-loaded');
  return !hasLoaded;
};

const App = () => {
  const [showPreloader, setShowPreloader] = useState(isFirstLoad());
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    WalletConflictHandler.initializeWalletCompatibleEnvironment();
    if (showPreloader && !sessionStorage.getItem('clorit-app-loaded')) {
      sessionStorage.setItem('clorit-app-loaded', 'true');
    }
    if (!showPreloader) {
      const timer = setTimeout(() => setAppReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [showPreloader]);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  if (showPreloader) return <Preloader onLoadComplete={handlePreloaderComplete} />;
  if (!appReady) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            
            {/* Unified Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Dashboard Router */}
            <Route path="/dashboard" element={<DashboardHome />} />

            {/* Admin Protected Routes */}
            <Route 
              path="/admin/*" 
              element={
                <AuthGuard allowedRoles={['admin']}>
                  <AdminDashboard />
                </AuthGuard>
              } 
            />

            {/* NGO Protected Routes */}
            <Route 
              path="/ngo/*" 
              element={
                <AuthGuard allowedRoles={['ngo']}>
                   <NGODashboard />
                </AuthGuard>
              } 
            />

            {/* Corporate Protected Routes */}
            <Route 
              path="/corporate/*" 
              element={
                <AuthGuard allowedRoles={['corporate']}>
                   <CorporateDashboard />
                </AuthGuard>
              } 
            />

            {/* Individual User Protected Routes */}
            <Route 
              path="/user/*" 
              element={
                <AuthGuard allowedRoles={['user']}>
                   <UserDashboard />
                </AuthGuard>
              } 
            />

            {/* Backward Compatibility Redirects */}
            <Route path="/admin-dashboard" element={<Navigate to="/admin/dashboard" />} />
            <Route path="/ngo-dashboard" element={<Navigate to="/ngo/dashboard" />} />
            <Route path="/corporate-dashboard" element={<Navigate to="/corporate/dashboard" />} />
            <Route path="/community-dashboard" element={<Navigate to="/user/dashboard" />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
