import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Building2, ArrowLeft, Leaf, Sparkles } from 'lucide-react';

const SignupOptions = () => {
  const navigate = useNavigate();

  const handleUserSignup = () => {
    navigate('/register', { state: { role: 'user' } });
  };

  const handleAdminSignup = () => {
    navigate('/register', { state: { role: 'corporate' } });
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50 flex items-center justify-center p-4">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
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
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-emerald-600 mr-2" />
              <span className="text-sm font-semibold text-emerald-700">Join CLORIT</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">
              Start your blue carbon journey today
            </p>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-6">
            {/* User Signup */}
            <button
              onClick={handleUserSignup}
              className="group w-full p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    User Sign Up
                  </h3>
                  <p className="text-sm text-gray-600">
                    Community • NGO • Panchayat
                  </p>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            {/* Admin Signup */}
            <button
              onClick={handleAdminSignup}
              className="group w-full p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Building2 className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Admin Sign Up
                  </h3>
                  <p className="text-sm text-gray-600">
                    Corporate • Admin
                  </p>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700 font-medium mb-2">✨ What you'll get:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Track carbon credit projects</li>
              <li>• Real-time satellite monitoring</li>
              <li>• Blockchain-verified credits</li>
              <li>• Community collaboration</li>
            </ul>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Already have an account?</span>
            </div>
          </div>

          {/* Sign In Link */}
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-emerald-500 hover:bg-emerald-50 transition-all"
          >
            Sign In
          </button>

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="mt-4 w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 py-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          © 2025 CLORIT. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignupOptions;
