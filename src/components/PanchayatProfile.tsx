import React, { useState } from 'react';
import PanchayatLayout from './shared/PanchayatLayout';
import PanchayatCard from './shared/PanchayatCard';
import {
    Building2,
    MapPin,
    Mail,
    Phone,
    Edit3,
    Save,
    X,
    Award,
    FileText,
    Shield,
    Calendar,
    Wallet
} from 'lucide-react';
import { AuthUtils } from '../utils/auth';
import { WalletUtils } from '../utils/walletUtils';

const PanchayatProfile = () => {
    const currentUser = AuthUtils.getCurrentUser();
    const walletState = WalletUtils.getWalletState();

    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: currentUser?.panchayatName || 'Ward 5 Panchayat',
        wardBlock: currentUser?.wardBlockNumber || 'Ward 5, Block A',
        location: currentUser?.location || 'Sundarbans Region, West Bengal',
        email: currentUser?.email || 'ward5@panchayat.gov.in',
        phone: currentUser?.phone || '+91 98765 43210',
        jurisdiction: '234 hectares',
        verified: currentUser?.isVerified || true,
        verificationDate: currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Jan 15, 2024'
    });

    return (
        <PanchayatLayout>
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
                    Panchayat <span className="text-purple-600">Profile</span>
                </h1>
                <p className="text-slate-500 font-medium text-lg">Manage your panchayat information and credentials</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Panchayat Info */}
                <div className="lg:col-span-2 space-y-6">
                    <PanchayatCard className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -mr-10 -mt-10 blur-2xl" />

                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className="flex gap-6">
                                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-purple-200">
                                    <Building2 className="w-10 h-10" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h2 className="text-2xl font-black text-slate-800">{profile.name}</h2>
                                        {profile.verified && <Shield className="w-5 h-5 text-purple-500 fill-purple-100" />}
                                    </div>
                                    <p className="text-slate-500 font-medium mb-3">{profile.wardBlock}</p>
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-lg border border-purple-100 uppercase tracking-wide">
                                            Government Authority
                                        </span>
                                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100 uppercase tracking-wide">
                                            Verified: {profile.verificationDate}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:bg-purple-50 hover:text-purple-600 transition-colors border border-slate-100"
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
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jurisdiction</label>
                                <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    {isEditing ? <input className="bg-transparent w-full outline-none" defaultValue={profile.location} /> : profile.location}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Area</label>
                                <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    {profile.jurisdiction}
                                </div>
                            </div>
                        </div>

                        {isEditing && (
                            <div className="mt-6 flex justify-end">
                                <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200">
                                    <Save className="w-4 h-4" /> Save Changes
                                </button>
                            </div>
                        )}
                    </PanchayatCard>

                    {/* Wallet Card */}
                    <PanchayatCard className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-black text-lg flex items-center gap-2">
                                <Wallet className="w-5 h-5" /> Connected Wallet
                            </h3>
                            {walletState?.isConnected && (
                                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/30">
                                    Connected
                                </span>
                            )}
                        </div>
                        {walletState?.isConnected ? (
                            <div>
                                <p className="text-sm text-slate-400 mb-2">Wallet Address</p>
                                <p className="font-mono text-sm bg-white/5 px-4 py-3 rounded-lg border border-white/10 mb-4">
                                    {walletState.address}
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-slate-400 mb-1">Balance</p>
                                        <p className="text-lg font-black">{parseFloat(walletState.balance).toFixed(4)} ETH</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 mb-1">Network</p>
                                        <p className="text-lg font-black">{walletState.network || 'Ethereum'}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-slate-400 mb-4">No wallet connected</p>
                                <button className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors">
                                    Connect Wallet
                                </button>
                            </div>
                        )}
                    </PanchayatCard>
                </div>

                {/* Right Column: Stats & Documents */}
                <div className="space-y-6">
                    <PanchayatCard className="bg-gradient-to-br from-purple-500 to-violet-600 border-none text-white shadow-xl">
                        <h3 className="font-black text-lg mb-6 flex items-center gap-2">
                            <Award className="w-5 h-5 text-amber-300" /> Performance
                        </h3>
                        <div className="flex items-center justify-center py-4 relative">
                            <div className="w-32 h-32 rounded-full border-8 border-white/20 flex items-center justify-center relative">
                                <div className="absolute inset-0 rounded-full border-8 border-white border-t-transparent animate-spin-slow rotate-45" />
                                <div className="text-center">
                                    <span className="text-3xl font-black">92</span>
                                    <span className="block text-[10px] uppercase font-bold text-white/70">Excellent</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
                            <div className="text-center">
                                <p className="text-2xl font-black text-amber-300">45</p>
                                <p className="text-[10px] uppercase font-bold text-white/70">Verifications</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-black text-emerald-300">12</p>
                                <p className="text-[10px] uppercase font-bold text-white/70">Communities</p>
                            </div>
                        </div>
                    </PanchayatCard>

                    <PanchayatCard>
                        <h3 className="font-black text-slate-800 text-lg mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-purple-600" /> Official Documents
                        </h3>
                        <div className="space-y-3">
                            {['Appointment Letter', 'ID Proof', 'Jurisdiction Map'].map((doc, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-purple-50 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-4 h-4 text-purple-600" />
                                        <span className="text-sm font-bold text-slate-700">{doc}</span>
                                    </div>
                                    <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded">Verified</span>
                                </div>
                            ))}
                        </div>
                    </PanchayatCard>
                </div>
            </div>
        </PanchayatLayout>
    );
};

export default PanchayatProfile;
