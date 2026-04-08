import React, { useState } from 'react';
import CommunityUserDashboard from './CommunityUserDashboard';
import NGODashboard from './NGODashboard';
import AdminDashboard from './AdminDashboard';

type UserRole = 'community' | 'ngo' | 'admin' | null;

const NDVIApp: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    if (role === currentRole) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentRole(role);
      setIsTransitioning(false);
    }, 300);
  };

  const handleBackToLanding = () => {
    handleRoleSelect(null);
  };

  const renderDashboard = () => {
    switch (currentRole) {
      case 'community':
        return <CommunityUserDashboard />;
      case 'ngo':
        return <NGODashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50 flex items-center justify-center p-4">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            </div>

            <div className="relative w-full max-w-4xl">
              {/* Logo */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-3">
                  <img
                    src="/clorit-logo.png"
                    alt="CLORIT Logo"
                    className="w-12 h-12 object-contain"
                  />
                  <span className="text-2xl font-bold text-gray-900">CLORIT</span>
                </div>
              </div>

              {/* Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                {/* Header */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full mb-4">
                    <svg className="w-4 h-4 text-emerald-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-semibold text-emerald-700">Interactive Demo</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    Select Your Role
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Choose your dashboard to explore NDVI satellite monitoring
                  </p>
                </div>

                {/* Role Options */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* Community User */}
                  <button
                    onClick={() => handleRoleSelect('community')}
                    className="group relative p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-xl transition-all duration-300 text-center bg-gradient-to-br from-white to-emerald-50/30"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                        🌱
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Community User
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Track your land health and carbon credits
                      </p>
                      <div className="flex items-center justify-center text-emerald-600 font-medium text-sm">
                        <span>Explore</span>
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* NGO Verifier */}
                  <button
                    onClick={() => handleRoleSelect('ngo')}
                    className="group relative p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-xl transition-all duration-300 text-center bg-gradient-to-br from-white to-blue-50/30"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                        🌿
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        NGO Verifier
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Verify projects and manage partnerships
                      </p>
                      <div className="flex items-center justify-center text-blue-600 font-medium text-sm">
                        <span>Explore</span>
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Admin */}
                  <button
                    onClick={() => handleRoleSelect('admin')}
                    className="group relative p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-xl transition-all duration-300 text-center bg-gradient-to-br from-white to-purple-50/30"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                        🏛️
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Admin
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Oversee registry and carbon minting
                      </p>
                      <div className="flex items-center justify-center text-purple-600 font-medium text-sm">
                        <span>Explore</span>
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Back Button */}
                <div className="text-center">
                  <button
                    onClick={() => window.location.href = '/'}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to Home</span>
                  </button>
                </div>
              </div>

              {/* Footer */}
              <p className="text-center text-sm text-gray-600 mt-6">
                © 2025 CLORIT. All rights reserved.
              </p>
            </div>
          </div>
        );
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: '#F8FAF9',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    backButton: {
      position: 'fixed' as const,
      top: '2rem',
      left: '2rem',
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.9)',
      border: '1px solid rgba(0, 119, 182, 0.2)',
      borderRadius: '50px',
      padding: '0.75rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#0077B6',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px rgba(0, 119, 182, 0.1)'
    },
    content: {
      transition: 'all 0.3s ease',
      opacity: isTransitioning ? 0 : 1,
      transform: isTransitioning ? 'scale(0.98)' : 'scale(1)'
    }
  };

  return (
    <div style={styles.container}>
      {/* Demo Banner */}
      {currentRole && (
        <div style={{
          position: 'fixed' as const,
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
          color: 'white',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          fontSize: '0.875rem',
          fontWeight: 500
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem' }}>🎭</span>
            <strong>Demo Mode:</strong> You're viewing an interactive preview with sample data
          </span>
          <button
            onClick={() => window.location.href = '/register'}
            style={{
              background: 'white',
              color: '#10b981',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Create Your Account
          </button>
        </div>
      )}

      {/* Back Button */}
      {currentRole && (
        <button
          style={{
            ...styles.backButton,
            top: '4.5rem' // Adjusted for demo banner
          }}
          onClick={handleBackToLanding}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 119, 182, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 119, 182, 0.1)';
          }}
        >
          ← Back to Role Selection
        </button>
      )}

      {/* Main Content */}
      <div style={{
        ...styles.content,
        paddingTop: currentRole ? '3.5rem' : '0' // Add padding for demo banner
      }}>
        {renderDashboard()}
      </div>
    </div>
  );
};

export default NDVIApp;
