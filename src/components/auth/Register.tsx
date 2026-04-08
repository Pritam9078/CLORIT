import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Building2, Landmark, 
  Mail, Lock, MapPin, 
  Phone, Globe, Fingerprint, 
  ArrowRight, Loader2, Wallet
} from 'lucide-react';
import AuthLayout from './AuthLayout';
import { useAuthStore, type UserRole } from '../../state/authStore';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from "sonner";

import PasswordInput from './PasswordInput';

const Register = () => {
  const navigate = useNavigate();
  const registerUser = useAuthStore(state => state.registerUser);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<UserRole>('user');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    registrationNumber: '',
    industry: '',
    esgGoals: '',
    location: '',
    phone: '',
    walletAddress: ''
  });

  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Real-time password matching logic
      if (name === 'password' || name === 'confirmPassword') {
        if (newData.confirmPassword && newData.password !== newData.confirmPassword) {
          setPasswordError('Passwords do not match');
        } else {
          setPasswordError('');
        }
      }
      
      return newData;
    });
  };

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
  };

  const handleWalletConnect = () => {
    // Simulated wallet connection
    const mockAddress = `0x${Math.random().toString(16).substring(2, 42)}`;
    setFormData(prev => ({ ...prev, walletAddress: mockAddress }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; 
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords must match before proceeding.");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const result = registerUser({
        role,
        email: formData.email,
        fullName: formData.fullName,
        walletAddress: formData.walletAddress,
        organization: formData.organization,
        registrationNumber: formData.registrationNumber,
        industry: formData.industry,
        esgGoals: formData.esgGoals,
        location: formData.location,
        phone: formData.phone,
      });

      if (result.success) {
        toast.success("Account created successfully!");
        navigate('/login', { state: { registered: true } });
      } else {
        toast.error(result.error || "Registration failed. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Critical Register Error:", err);
      toast.error("A system error occurred. Please try again.");
      setLoading(false);
    }
  };

  const roles: { id: UserRole; label: string; icon: any; color: string }[] = [
    { id: 'user', label: 'Individual', icon: User, color: 'emerald' },
    { id: 'ngo', label: 'NGO / Org', icon: Landmark, color: 'blue' },
    { id: 'corporate', label: 'Corporate', icon: Building2, color: 'purple' },
  ];

  return (
    <AuthLayout 
      title="Join the Ecosystem" 
      subtitle="Select your role and start your sustainability journey."
    >
      <div className="space-y-6">
        {/* Role Selector */}
        <div className="grid grid-cols-3 gap-3">
          {roles.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => handleRoleSelect(r.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
                role === r.id 
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/10' 
                  : 'bg-white/5 border-white/5 text-gray-500 hover:bg-white/10'
              }`}
            >
              <r.icon className={`w-6 h-6 mb-2 ${role === r.id ? 'text-emerald-400' : 'text-gray-400'}`} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{r.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-400 text-xs font-semibold uppercase tracking-widest pl-1">Identitiy</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input 
                name="fullName"
                placeholder="Full Name / Display Name" 
                value={formData.fullName}
                onChange={handleInputChange}
                className="bg-white/5 border-white/10 text-white pl-10 h-11 focus-visible:ring-emerald-500 rounded-xl transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-400 text-xs font-semibold uppercase tracking-widest pl-1">Contact Details</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input 
                name="email"
                type="email"
                placeholder="Email Address" 
                value={formData.email}
                onChange={handleInputChange}
                className="bg-white/5 border-white/10 text-white pl-10 h-11 focus-visible:ring-emerald-500 rounded-xl transition-all"
                required
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {role !== 'user' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                <div className="space-y-2">
                   <Label className="text-gray-400 text-xs font-semibold uppercase tracking-widest pl-1">
                     {role === 'ngo' ? 'Organization Details' : 'Company Details'}
                   </Label>
                   <div className="relative">
                     <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                     <Input 
                       name="organization"
                       placeholder={role === 'ngo' ? 'NGO Name' : 'Company Name'}
                       value={formData.organization}
                       onChange={handleInputChange}
                       className="bg-white/5 border-white/10 text-white pl-10 h-11 focus-visible:ring-emerald-500 rounded-xl transition-all"
                       required
                     />
                   </div>
                </div>
                
                {role === 'ngo' && (
                  <div className="relative">
                    <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input 
                      name="registrationNumber"
                      placeholder="Registration Number" 
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white pl-10 h-11 focus-visible:ring-emerald-500 rounded-xl transition-all"
                      required
                    />
                  </div>
                )}

                {role === 'corporate' && (
                  <div className="grid grid-cols-2 gap-3">
                    <Input 
                      name="industry"
                      placeholder="Industry" 
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white h-11 focus-visible:ring-emerald-500 rounded-xl transition-all"
                      required
                    />
                    <Input 
                      name="esgGoals"
                      placeholder="ESG Goals" 
                      value={formData.esgGoals}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white h-11 focus-visible:ring-emerald-500 rounded-xl transition-all"
                      required
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <PasswordInput
              label="Create Security Password"
              name="password"
              placeholder="••••••••" 
              value={formData.password}
              onChange={handleInputChange}
              showStrength
              required
            />
            
            <div className="space-y-1.5">
              <PasswordInput
                label="Confirm Password"
                name="confirmPassword"
                placeholder="••••••••" 
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={passwordError}
                required
              />
              {formData.confirmPassword && !passwordError && (
                <p className="text-[10px] text-emerald-500 font-bold italic pl-1 flex items-center gap-1 animate-in fade-in transition-all">
                  <Check size={10} /> Passwords match
                </p>
              )}
            </div>
          </div>

          <div className="pt-2">
             <Button
                type="button"
                onClick={handleWalletConnect}
                variant="outline"
                className={`w-full h-11 rounded-xl border-white/5 bg-white/5 text-gray-400 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30 transition-all gap-2 group ${formData.walletAddress ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-lg shadow-emerald-500/5' : ''}`}
             >
                {formData.walletAddress ? (
                  <>
                    <Fingerprint className="w-4 h-4 animate-pulse" />
                    <span className="text-xs font-mono tracking-tighter">Verified: {formData.walletAddress.substring(0, 8)}...</span>
                  </>
                ) : (
                  <>
                    <Wallet className="w-4 h-4 group-hover:animate-bounce transition-all" />
                    <span className="text-xs">Integrate MetaMask Wallet</span>
                  </>
                )}
             </Button>
          </div>

          <Button 
            type="submit" 
            disabled={loading || !!passwordError}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white font-bold shadow-lg shadow-emerald-500/25 transition-all text-base gap-2 group mt-4 relative overflow-hidden"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Initialize Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Already registered?{' '}
            <Link to="/login" className="text-emerald-400 font-bold hover:underline transition-all">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
