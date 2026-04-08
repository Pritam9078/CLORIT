import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommunityLayout from './shared/CommunityLayout';
import CommunityCard from './shared/CommunityCard';
import {
  Bell,
  Shield,
  Smartphone,
  Mail,
  Moon,
  Globe,
  LogOut,
  ChevronRight,
  Trash2,
  Download,
  Lock
} from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showStats: true,
    allowDataCollection: false
  });

  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light');

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePrivacy = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Reusable Toggle Component
  const Toggle = ({ active, onChange }: { active: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`w-12 h-7 rounded-full transition-colors relative flex items-center px-1 ${active ? 'bg-emerald-500' : 'bg-slate-200'}`}
    >
      <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${active ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );

  return (
    <CommunityLayout>
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Settings</h1>
          <p className="text-slate-500 font-medium">Manage your community preferences and security.</p>
        </div>

        {/* Notifications */}
        <CommunityCard>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800">Notifications</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Communication Preferences</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-slate-50 last:border-0 last:pb-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-700">Email Updates</p>
                  <p className="text-xs text-slate-400">Receive weekly reports and alerts</p>
                </div>
              </div>
              <Toggle active={notifications.email} onChange={() => toggleNotification('email')} />
            </div>

            <div className="flex items-center justify-between pb-6 border-b border-slate-50 last:border-0 last:pb-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-700">Push Notifications</p>
                  <p className="text-xs text-slate-400">Real-time alerts on your device</p>
                </div>
              </div>
              <Toggle active={notifications.push} onChange={() => toggleNotification('push')} />
            </div>
          </div>
        </CommunityCard>

        {/* Privacy & Security */}
        <CommunityCard>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800">Privacy & Security</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Data Controls</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-700">Public Profile</p>
                  <p className="text-xs text-slate-400">Allow others to see your impact stats</p>
                </div>
              </div>
              <Toggle active={privacy.profilePublic} onChange={() => togglePrivacy('profilePublic')} />
            </div>

            <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-700 group-hover:text-slate-900 transition-colors">Change Password</p>
                  <p className="text-xs text-slate-400">Update your login credentials</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
            </button>
          </div>
        </CommunityCard>

        {/* Appearance */}
        <CommunityCard>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-500">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800">Appearance</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Interface Theme</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-2xl border text-center transition-all ${theme === 'light' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-200'}`}
            >
              <div className="w-full h-12 bg-white rounded-lg mb-3 border border-dashed border-slate-200 shadow-sm" />
              <span className="text-xs font-bold uppercase tracking-wider">Light</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-2xl border text-center transition-all ${theme === 'dark' ? 'bg-slate-800 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
            >
              <div className="w-full h-12 bg-slate-900 rounded-lg mb-3 border border-slate-700 shadow-sm" />
              <span className="text-xs font-bold uppercase tracking-wider">Dark</span>
            </button>
            <button
              onClick={() => setTheme('auto')}
              className={`p-4 rounded-2xl border text-center transition-all ${theme === 'auto' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-slate-200 text-slate-500 hover:border-blue-200'}`}
            >
              <div className="w-full h-12 bg-gradient-to-r from-white to-slate-900 rounded-lg mb-3 border border-slate-200 opacity-50 shadow-sm" />
              <span className="text-xs font-bold uppercase tracking-wider">Auto</span>
            </button>
          </div>
        </CommunityCard>

        {/* Danger Zone */}
        <div className="pt-8 border-t border-slate-200">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Danger Zone</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors group text-left">
              <div>
                <p className="font-bold text-slate-700">Export Data</p>
                <p className="text-xs text-slate-400">Download all your community records</p>
              </div>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
            </button>
            <button className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-2xl hover:bg-red-100 transition-colors group text-left">
              <div>
                <p className="font-bold text-red-600">Delete Account</p>
                <p className="text-xs text-red-400">Permanently close your account</p>
              </div>
              <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-600" />
            </button>
          </div>
        </div>

      </div>
    </CommunityLayout>
  );
};

export default Settings;
