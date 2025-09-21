import React from 'react';
import { AuthUtils } from '../utils/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole, 
  redirectTo = '/login-options' 
}) => {
  const isAuthenticated = AuthUtils.isAuthenticated();
  const userRole = AuthUtils.getUserRole();

  // Check if user is authenticated
  if (!isAuthenticated) {
    window.location.href = redirectTo;
    return null;
  }

  // Check if user has required role (if specified)
  if (requiredRole && userRole !== requiredRole) {
    // Redirect to appropriate dashboard based on user's actual role
    switch (userRole) {
      case 'community':
        window.location.href = '/community-dashboard';
        break;
      case 'ngo':
        window.location.href = '/ngo-dashboard';
        break;
      case 'panchayat':
        window.location.href = '/panchayat-dashboard';
        break;
      case 'admin':
        window.location.href = '/admin-dashboard';
        break;
      default:
        window.location.href = redirectTo;
        break;
    }
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
