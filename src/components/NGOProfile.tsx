import React, { useState } from 'react';
import NGOLayout from './shared/NGOLayout';
import NGOCard from './shared/NGOCard';
import {
    Building2,
    MapPin,
    Mail,
    Phone,
    Globe,
    ShieldCheck,
    Edit3,
    Save,
    X,
    Award,
    FileText,
    Users
} from 'lucide-react';
import { AuthUtils } from '../utils/auth';

const NGOProfile = () => {
    const currentUser = AuthUtils.getCurrentUser();

    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: currentUser?.ngoName || 'Ocean Guardians Foundation',
        type: 'Non-Profit Organization',
        id: currentUser?.organizationId || 'NGO-8829-XJ',
        address: currentUser?.location || '12 Coastal Road, Kolkata, WB',
        email: currentUser?.email || 'contact@oceanguardians.org',
        phone: currentUser?.phone || '+91 98765 43210',
        website: currentUser?.website || 'www.oceanguardians.org',
        mission: 'Dedicated to preserving coastal ecosystems through community-led mangrove restoration and sustainable blue carbon initiatives.',
        verified: currentUser?.isVerified || true,
        verificationDate: currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Jan 15, 2024'
    });

    return (
        <NGOLayout>
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Organization <span className="text-cyan-600">Profile</span></h1>
                <p className="text-slate-500 font-medium text-lg">Manage your organization details and public presence.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Organization Info */}
                <div className="lg:col-span-2 space-y-6">
                    <NGOCard className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full -mr-10 -mt-10 blur-2xl" />

                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className="flex gap-6">
                                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-200">
                                    <Building2 className="w-10 h-10" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h2 className="text-2xl font-black text-slate-800">{profile.name}</h2>
                                        {profile.verified && <ShieldCheck className="w-5 h-5 text-cyan-500" />}
                                    </div>
                                    <p className="text-slate-500 font-medium mb-3">{profile.type}</p>
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 bg-cyan-50 text-cyan-700 text-xs font-bold rounded-lg border border-cyan-100 uppercase tracking-wide">
                                            ID: {profile.id}
                                        </span>
                                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100 uppercase tracking-wide">
                                            Verified: {profile.verificationDate}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:bg-cyan-50 hover:text-cyan-600 transition-colors border border-slate-100"
                            >
                                {isEditing ? <X className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Editable Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                                <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    {isEditing ? <input className="bg-transparent w-full outline-none" defaultValue={profile.email} /> : profile.email}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                                <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium">
                                    <Phone className="w-4 h-4 text-slate-400" />
                                    {isEditing ? <input className="bg-transparent w-full outline-none" defaultValue={profile.phone} /> : profile.phone}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Headquarters</label>
                                <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    {isEditing ? <input className="bg-transparent w-full outline-none" defaultValue={profile.address} /> : profile.address}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Website</label>
                                <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium">
                                    <Globe className="w-4 h-4 text-slate-400" />
                                    {isEditing ? <input className="bg-transparent w-full outline-none" defaultValue={profile.website} /> : profile.website}
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mission Statement</label>
                                <div className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium min-h-[100px]">
                                    {isEditing ? <textarea className="bg-transparent w-full h-full outline-none resize-none" defaultValue={profile.mission} /> : profile.mission}
                                </div>
                            </div>
                        </div>

                        {isEditing && (
                            <div className="mt-6 flex justify-end">
                                <button className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-200">
                                    <Save className="w-4 h-4" /> Save Changes
                                </button>
                            </div>
                        )}
                    </NGOCard>

                    {/* Documents */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between hover:border-cyan-300 hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-600 group-hover:bg-cyan-100 transition-colors">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800">Registration Cert.</p>
                                    <p className="text-xs text-slate-400">PDF • 2.4 MB</p>
                                </div>
                            </div>
                            <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded tracking-wider">Verified</div>
                        </div>
                        <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between hover:border-cyan-300 hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-600 group-hover:bg-cyan-100 transition-colors">
                                    <Award className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800">Non-Profit Status</p>
                                    <p className="text-xs text-slate-400">PDF • 1.1 MB</p>
                                </div>
                            </div>
                            <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded tracking-wider">Verified</div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Stats & Team */}
                <div className="space-y-6">
                    <NGOCard className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none shadow-xl">
                        <h3 className="font-black text-lg mb-6 flex items-center gap-2">
                            <Award className="w-5 h-5 text-amber-500" /> Reputation Score
                        </h3>
                        <div className="flex items-center justify-center py-4 relative">
                            <div className="w-32 h-32 rounded-full border-8 border-slate-700 flex items-center justify-center relative">
                                <div className="absolute inset-0 rounded-full border-8 border-cyan-500 border-t-transparent animate-spin-slow rotate-45" />
                                <div className="text-center">
                                    <span className="text-3xl font-black">98</span>
                                    <span className="block text-[10px] uppercase font-bold text-slate-400">Excellent</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
                            <div className="text-center">
                                <p className="text-2xl font-black text-emerald-400">12</p>
                                <p className="text-[10px] uppercase font-bold text-slate-400">Projects</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-black text-blue-400">4.5k</p>
                                <p className="text-[10px] uppercase font-bold text-slate-400">Impact (tCO2)</p>
                            </div>
                        </div>
                    </NGOCard>

                    <NGOCard>
                        <h3 className="font-black text-slate-800 text-lg mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5 text-cyan-600" /> Team Members
                        </h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                                        TM
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-slate-800">Team Member {i}</p>
                                        <p className="text-xs text-slate-400">Project Manager</p>
                                    </div>
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold uppercase hover:bg-slate-100 transition-colors">
                            Manage Team
                        </button>
                    </NGOCard>
                </div>
            </div>
        </NGOLayout>
    );
};

export default NGOProfile;
