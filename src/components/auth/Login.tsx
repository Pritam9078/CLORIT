import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Fingerprint, Info, User, Shield } from 'lucide-react';
import AuthLayout from './AuthLayout';
import { useAuthStore } from '../../state/authStore';
import { Button } from '../ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import UserLoginForm from './UserLoginForm';
import AdminLoginForm from './AdminLoginForm';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithWallet } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('user');

  const registered = (location.state as any)?.registered;

  const handleAuthSuccess = (role?: string) => {
    if (role === 'admin' || activeTab === 'admin') {
      navigate('/admin/dashboard');
    } else if (role === 'ngo') {
      navigate('/ngo/dashboard');
    } else if (role === 'corporate') {
      navigate('/corporate/dashboard');
    } else {
      navigate('/user/dashboard');
    }
  };

  const handleWalletLogin = async () => {
    setLoading(true);
    // Simulated wallet connection
    const mockAddress = `0x${Math.random().toString(16).substring(2, 42)}`;
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const success = await loginWithWallet(mockAddress);
    if (success) {
      handleAuthSuccess();
    } else {
      setError('Wallet not registered. Please register first.');
    }
    setLoading(false);
  };

  return (
    <AuthLayout 
      title={activeTab === 'admin' ? "Admin Portal" : "Welcome Back"} 
      subtitle={activeTab === 'admin' ? "Secure administrative access for CLORIT system nodes." : "Access your CLORIT dashboard and manage your impact."}
    >
      <div className="space-y-6">
        {registered && (
          <Alert className="bg-emerald-500/10 border-emerald-500/50 text-emerald-400 py-3">
            <Info className="h-4 w-4 text-emerald-400" />
            <AlertTitle className="text-xs font-bold uppercase tracking-wider mb-1">Registration Successful</AlertTitle>
            <AlertDescription className="text-xs opacity-80">
              Your account is now <span className="font-bold underline">Pending Review</span>. You can log in to check your status.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="bg-red-500/10 border-red-500/50 text-red-400 py-3">
             <AlertDescription className="text-xs">{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="user" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10 rounded-xl p-1 mb-8">
            <TabsTrigger 
              value="user" 
              className="rounded-lg data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg gap-2"
            >
              <User size={16} />
              User Access
            </TabsTrigger>
            <TabsTrigger 
              value="admin" 
              className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg gap-2"
            >
              <Shield size={16} />
              Admin Portal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="user">
            <UserLoginForm 
              onSuccess={handleAuthSuccess} 
              onError={setError} 
              loading={loading} 
              setLoading={setLoading} 
            />
          </TabsContent>

          <TabsContent value="admin">
            <AdminLoginForm 
              onSuccess={() => handleAuthSuccess('admin')} 
              onError={setError} 
              loading={loading} 
              setLoading={setLoading} 
            />
          </TabsContent>
        </Tabs>

        {activeTab === 'user' && (
          <>
            <div className="relative flex items-center gap-4 py-2">
              <div className="h-px w-full bg-white/5" />
              <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold whitespace-nowrap">OR login with</span>
              <div className="h-px w-full bg-white/5" />
            </div>

            <Button
              type="button"
              onClick={handleWalletLogin}
              variant="outline"
              className="w-full h-12 rounded-xl border-white/10 bg-white/5 text-gray-400 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30 transition-all gap-3 group"
            >
              <Fingerprint className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Biometric Web3 Wallet</span>
            </Button>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                New to the ecosystem?{' '}
                <Link to="/register" className="text-emerald-400 font-bold hover:underline">
                  Create Account
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
};

export default Login;
