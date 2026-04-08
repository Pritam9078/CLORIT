import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../state/authStore';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  requireVerified?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  allowedRoles, 
  requireVerified = false 
}) => {
  const { isAuthenticated, currentUser } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role permissions
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Redirect to unauthorized or personal dashboard
    return <Navigate to="/unauthorized" replace />;
  }

  // Check verification status if required (mostly for NGOs and Corporates)
  if (requireVerified && currentUser.status !== 'verified') {
    // We allow access but the dashboard itself handles the "pending" UI
    // If it's a critical page (like marketplace buy), we could block here.
    // For now, most dashboards handle the restricted view internally.
  }

  return <>{children}</>;
};

export default AuthGuard;
