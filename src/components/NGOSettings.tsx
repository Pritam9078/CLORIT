import React from 'react';
import NGOLayout from './shared/NGOLayout';
import NGOCard from './shared/NGOCard';
import { 
  User, 
  Mail, 
  MapPin, 
  Shield, 
  Bell, 
  Globe,
  Camera,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

import { useAuthStore } from '../state/authStore';
import { toast } from 'sonner';

interface NGOSettingsProps {
    standalone?: boolean;
}

const NGOSettings: React.FC<NGOSettingsProps> = ({ standalone = false }) => {
    const { currentUser, updateUserProfile } = useAuthStore();
    const [formData, setFormData] = React.useState({
        fullName: currentUser?.fullName || '',
        email: currentUser?.email || '',
        address: 'Carbon Plaza, 5th Floor, Kolkata, WB' // Mock address as it's not in store yet
    });

    const handleSave = () => {
        if (!currentUser) return;
        updateUserProfile(currentUser.id, { 
            fullName: formData.fullName, 
            email: formData.email 
        });
        toast.success('Profile updated successfully!');
    };

    const content = (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
            {!standalone && (
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">NGO <span className="text-cyan-600">Settings</span></h1>
                    <p className="text-slate-500 font-medium text-lg">Manage your organization profile and regional preferences.</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Profile Section */}
                <div className="md:col-span-2 space-y-8">
                    <NGOCard className="rounded-[32px] overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-cyan-600 to-blue-700 -mx-8 -mt-8 mb-12 relative">
                             <div className="absolute -bottom-8 left-8">
                                 <div className="w-24 h-24 rounded-3xl bg-white p-1 border-4 border-white shadow-xl group relative cursor-pointer">
                                     <div className="w-full h-full rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-200 transition-colors overflow-hidden">
                                         <Camera className="w-8 h-8 group-hover:scale-110 transition-transform" />
                                     </div>
                                 </div>
                             </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">Organization Name</label>
                                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-cyan-500 transition-all">
                                    <Globe className="w-5 h-5 text-cyan-600" />
                                    <input 
                                        className="bg-transparent border-none outline-none w-full font-bold text-slate-800" 
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">Admin Email</label>
                                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-cyan-500 transition-all">
                                    <Mail className="w-5 h-5 text-cyan-600" />
                                    <input 
                                        className="bg-transparent border-none outline-none w-full font-bold text-slate-800" 
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">Office Address</label>
                                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-cyan-500 transition-all">
                                    <MapPin className="w-5 h-5 text-cyan-600" />
                                    <input 
                                        className="bg-transparent border-none outline-none w-full font-bold text-slate-800" 
                                        defaultValue={formData.address} 
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-10 pt-10 border-t border-slate-100 flex justify-end">
                            <button 
                                onClick={handleSave}
                                className="px-10 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 hover:scale-105 transition-all shadow-xl shadow-slate-200"
                            >
                                SAVE CHANGES
                            </button>
                        </div>
                    </NGOCard>

                    <NGOCard className="rounded-[32px]">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Regional Impact Area</h3>
                                <p className="text-slate-400 font-bold mt-1 text-sm">Define your primary conservation zones</p>
                            </div>
                            <button className="p-3 bg-cyan-50 text-cyan-600 rounded-xl hover:bg-cyan-100 transition-colors">
                                <MapPin size={24} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-emerald-600 border border-emerald-100">
                                        <Globe size={20} />
                                    </div>
                                    <span className="font-black text-emerald-800">West Bengal, Sundarbans</span>
                                </div>
                                <span className="text-xs font-black text-emerald-600 bg-white px-3 py-1.5 rounded-lg border border-emerald-200">PRIMARY</span>
                            </div>
                            <button className="w-full p-4 border-2 border-dashed border-slate-200 text-slate-400 font-black rounded-2xl hover:border-cyan-500 hover:text-cyan-600 transition-all flex items-center justify-center gap-2">
                                + ADD NEW REGION
                            </button>
                        </div>
                    </NGOCard>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-8">
                    <NGOCard className="rounded-[32px] border-l-8 border-l-cyan-500">
                        <div className="flex items-center gap-4 mb-6">
                            <Shield className="w-6 h-6 text-cyan-600" />
                            <h3 className="font-black text-slate-800 text-xl tracking-tight">Security</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-600">Two-Factor Auth</span>
                                <div className="w-12 h-6 bg-emerald-500 rounded-full relative p-1 cursor-pointer">
                                    <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-600">Auto-Logout</span>
                                <div className="w-12 h-6 bg-slate-200 rounded-full relative p-1 cursor-pointer">
                                    <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                                </div>
                            </div>
                        </div>
                    </NGOCard>

                    <NGOCard className="rounded-[32px] bg-slate-900 border-none">
                        <div className="flex items-center gap-4 mb-6 text-white text-opacity-80">
                            <Bell className="w-6 h-6" />
                            <h3 className="font-black text-xl tracking-tight">Alerts</h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: 'Project Status Updates', active: true },
                                { label: 'New Credit Minting', active: true },
                                { label: 'Daily NDVI Summaries', active: false }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <span className="font-bold text-slate-400 text-sm">{item.label}</span>
                                    <div className={`w-10 h-5 rounded-full relative p-1 cursor-pointer transition-colors ${item.active ? 'bg-cyan-500' : 'bg-slate-700'}`}>
                                        <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${item.active ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </NGOCard>

                    <div className="p-8 rounded-[32px] bg-red-50 border border-red-100">
                        <div className="flex items-center gap-3 mb-4 text-red-600">
                            <AlertCircle size={20} />
                            <h4 className="font-black uppercase tracking-widest text-xs">Danger Zone</h4>
                        </div>
                        <p className="text-sm font-bold text-red-800/60 mb-6 leading-relaxed">Permanently delete your organization and all associated data.</p>
                        <button className="w-full py-4 border-2 border-red-200 text-red-600 font-extrabold rounded-2xl hover:bg-red-600 hover:text-white hover:border-red-600 transition-all text-sm tracking-tight">
                            TERMINATE ACCOUNT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    if (standalone) return content;

    return (
        <NGOLayout>
            {content}
        </NGOLayout>
    );
};

export default NGOSettings;
