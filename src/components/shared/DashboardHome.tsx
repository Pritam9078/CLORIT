import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../state/authStore';

export const DashboardHome = () => {
  const { currentUser, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  switch (currentUser.role) {
    case 'admin':
      return <Navigate to="/admin/dashboard" replace />;
    case 'ngo':
      return <Navigate to="/ngo/dashboard" replace />;
    case 'corporate':
      return <Navigate to="/corporate/dashboard" replace />;
    case 'user':
    default:
      return <Navigate to="/user/dashboard" replace />;
  }
};

export const Unauthorized = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
    <div className="max-w-md w-full text-center space-y-6">
      <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 className="text-3xl font-black text-slate-900 tracking-tight">Access Denied</h1>
      <p className="text-slate-500 font-medium">You do not have the necessary permissions to access this specific sector of the CLORIT protocol.</p>
      <button 
        onClick={() => window.location.href = '/dashboard'}
        className="px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95 w-full"
      >
        Return to My Dashboard
      </button>
    </div>
  </div>
);
