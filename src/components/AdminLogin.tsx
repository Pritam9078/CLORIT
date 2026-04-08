import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ArrowLeft, Mail, Lock, AlertCircle, Loader2, Shield } from 'lucide-react';
import adminAuthService from '../services/adminAuthService';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showADMINModal, setShowADMINModal] = useState(false);
  const [adminKey, setADMINKey] = useState('');
  const [adminError, setADMINError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Prevent wallet extension interference
    try {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    } catch (error) {
      console.warn('Wallet extension detected but ignored for admin authentication');
    }

    // Mock admin role detection
    const adminRoles = {
      'buyer@company.com': 'corporate-buyer',
      'admin@admin.gov': 'admin-admin'
    };

    const adminRole = adminRoles[credentials.email as keyof typeof adminRoles] || 'corporate-buyer';

    // Save authentication token and user profile
    const authToken = `admin_auth_${Date.now()}_${adminRole}`;
    localStorage.setItem('authToken', authToken);

    const userProfile = {
      id: `${adminRole}-${Date.now()}`,
      name: getAdminNameByRole(adminRole),
      email: credentials.email,
      role: adminRole,
    };
    localStorage.setItem('userProfile', JSON.stringify(userProfile));

    // Redirect based on admin role
    setTimeout(() => {
      switch (adminRole) {
        case 'corporate-buyer':
          window.location.href = '/corporate/dashboard';
          break;
        case 'admin-admin':
          window.location.href = '/admin';
          break;
        default:
          window.location.href = '/corporate/dashboard';
      }
    }, 500);
  };

  const getAdminNameByRole = (role: string): string => {
    const roleNames = {
      'corporate-buyer': 'Corporate Admin',
      'admin-admin': 'ADMINistrator'
    };
    return roleNames[role as keyof typeof roleNames] || 'Admin';
  };

  const handleBack = () => {
    navigate('/login');
  };

  const handleADMINLogin = async () => {
    setADMINError('');

    if (!adminKey.trim()) {
      setADMINError('Please enter the admin key.');
      return;
    }

    try {
      // Call backend API
      const response = await adminAuthService.keyLogin(adminKey);

      if (response.success && response.token && response.admin) {
        setShowADMINModal(false);
        setADMINKey('');

        console.log('✅ ADMIN admin login successful, token stored:', response.token);

        // Redirect to ADMIN dashboard
        navigate('/admin');
      } else {
        setADMINError(response.message || 'Invalid ADMIN Key. Please try again.');
      }
    } catch (error: any) {
      console.error('ADMIN login error:', error);
      setADMINError(error.message || 'Login failed. Please try again.');
    }
  };

  const handleADMINModalClose = () => {
    setShowADMINModal(false);
    setADMINKey('');
    setADMINError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-md">
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
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Portal Login
            </h1>
            <p className="text-gray-600">
              Corporate Buyer & Admin Access
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  placeholder="Enter your admin email"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Access Corporate Buyer Dashboard'
              )}
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <a href="#forgot" className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors">
                Forgot your password?
              </a>
            </div>

            {/* ADMIN Button */}
            <button
              type="button"
              onClick={() => setShowADMINModal(true)}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Shield className="w-5 h-5" />
              ADMIN Login
            </button>

            {/* Back Button */}
            <button
              type="button"
              onClick={handleBack}
              className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 py-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login Options</span>
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100">
            <p className="text-xs font-semibold text-orange-900 mb-2">Demo Admin Accounts</p>
            <div className="text-xs text-orange-800 space-y-1">
              <p><span className="font-semibold">Corporate Buyer:</span> buyer@company.com</p>
              <p className="text-orange-600 italic">Password: any</p>
              <p className="mt-2"><span className="font-semibold">ADMIN Super Admin:</span></p>
              <p className="text-orange-600 italic">Key: ADMIN987</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          © 2025 CLORIT. All rights reserved.
        </p>
      </div>

      {/* ADMIN Login Modal */}
      {showADMINModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={handleADMINModalClose}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">ADMIN Login</h2>
              <p className="text-gray-600 text-sm mt-2">Enter your admin key to continue</p>
            </div>

            {/* Error Message */}
            {adminError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 animate-shake">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{adminError}</p>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter ADMIN Key
              </label>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setADMINKey(e.target.value)}
                placeholder="e.g., ADMIN987"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleADMINLogin();
                  }
                }}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleADMINModalClose}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleADMINLogin}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s;
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.3s;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
