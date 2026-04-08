import React, { useState } from 'react';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../state/authStore';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

import PasswordInput from './PasswordInput';
import { Checkbox } from "../ui/checkbox";

interface UserLoginFormProps {
  onSuccess: (role: string) => void;
  onError: (error: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const UserLoginForm: React.FC<UserLoginFormProps> = ({ onSuccess, onError, loading, setLoading }) => {
  const { loginUser } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    onError('');
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, rememberMe: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onError('');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    const success = await loginUser(formData.email, formData.password);
    
    if (success) {
      const user = useAuthStore.getState().currentUser;
      onSuccess(user?.role || 'user');
    } else {
      onError('Invalid credentials. User not found or wrong password.');
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label className="text-gray-400 text-xs font-semibold uppercase tracking-widest pl-1">Email / Username</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input 
            name="email"
            type="email"
            placeholder="email@example.com" 
            value={formData.email}
            onChange={handleInputChange}
            className="bg-white/5 border-white/10 text-white pl-10 h-11 focus-visible:ring-emerald-500 rounded-xl transition-all"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center px-1">
          <Label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Access Pass</Label>
          <Link to="#" className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold hover:underline">Forgot Password?</Link>
        </div>
        <PasswordInput
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="flex items-center gap-2 px-1">
        <Checkbox 
          id="rememberMe" 
          checked={formData.rememberMe}
          onCheckedChange={handleCheckboxChange}
          className="border-white/10 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-transparent"
        />
        <label htmlFor="rememberMe" className="text-[10px] text-gray-500 font-bold uppercase tracking-wider cursor-pointer">Remember this device</label>
      </div>

      <Button 
        type="submit" 
        disabled={loading}
        className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white font-bold shadow-lg shadow-emerald-500/25 transition-all text-base gap-2 group mt-6"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            Log In
            <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </Button>
    </form>
  );
};

export default UserLoginForm;
