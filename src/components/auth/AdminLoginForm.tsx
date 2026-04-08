import React, { useState } from 'react';
import { Shield, Key, LogIn, Loader2 } from 'lucide-react';
import { useAuthStore } from '../../state/authStore';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

import PasswordInput from './PasswordInput';

interface AdminLoginFormProps {
  onSuccess: () => void;
  onError: (error: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const AdminLoginForm: React.FC<AdminLoginFormProps> = ({ onSuccess, onError, loading, setLoading }) => {
  const { loginAdmin } = useAuthStore();
  const [adminKey, setAdminKey] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onError('');

    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const success = await loginAdmin(adminKey);
    
    if (success) {
      onSuccess();
    } else {
      onError('Invalid Administrative Key. Access Denied.');
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-6 flex items-start gap-3">
        <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
        <div className="space-y-1">
          <p className="text-sm font-bold text-blue-300">Administrative Portal</p>
          <p className="text-xs text-blue-200/60 leading-relaxed">
            Restricted access portal for authorized system administrators. Please provide your secure access key.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <PasswordInput 
          label="Admin Access Key"
          placeholder="Enter secure key" 
          value={adminKey}
          onChange={(e) => {
            setAdminKey(e.target.value);
            onError('');
          }}
          className="bg-blue-950/20 border-blue-500/30 text-white focus-visible:ring-blue-500 h-11 rounded-xl placeholder:text-blue-900/40"
          required
        />
      </div>

      <Button 
        type="submit" 
        disabled={loading}
        className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/25 transition-all text-base gap-2 group mt-6"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            Verify Administrative Key
            <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </Button>
    </form>
  );
};

export default AdminLoginForm;
