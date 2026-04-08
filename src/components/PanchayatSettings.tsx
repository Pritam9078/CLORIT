import React, { useState } from 'react';
import PanchayatLayout from './shared/PanchayatLayout';
import PanchayatCard from './shared/PanchayatCard';
import {
    Bell,
    Shield,
    Database,
    Mail,
    Smartphone,
    Lock,
    Download,
    Trash2
} from 'lucide-react';

const PanchayatSettings = () => {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: true,
        smsAlerts: false,
        twoFactorAuth: true,
        walletPermissions: true,
        autoAssign: false
    });

    const toggleSetting = (key: string) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
    };

    const ToggleSwitch = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
        <button
            onClick={onToggle}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${enabled ? 'bg-purple-600' : 'bg-slate-200'
                }`}
        >
            <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
            />
        </button>
    );

    return (
        <PanchayatLayout>
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
                    Panchayat <span className="text-purple-600">Settings</span>
                </h1>
                <p className="text-slate-500 font-medium text-lg">Configure your preferences and security options</p>
            </div>

            <div className="max-w-4xl space-y-6">
                {/* Notifications */}
                <PanchayatCard>
                    <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-purple-600" /> Notifications
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                            <div>
                                <p className="font-bold text-slate-800">Email Notifications</p>
                                <p className="text-sm text-slate-500">Receive updates via email</p>
                            </div>
                            <ToggleSwitch
                                enabled={settings.emailNotifications}
                                onToggle={() => toggleSetting('emailNotifications')}
                            />
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                            <div>
                                <p className="font-bold text-slate-800">Push Notifications</p>
                                <p className="text-sm text-slate-500">Browser push notifications</p>
                            </div>
                            <ToggleSwitch
                                enabled={settings.pushNotifications}
                                onToggle={() => toggleSetting('pushNotifications')}
                            />
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <p className="font-bold text-slate-800">SMS Alerts</p>
                                <p className="text-sm text-slate-500">Urgent alerts via SMS</p>
                            </div>
                            <ToggleSwitch
                                enabled={settings.smsAlerts}
                                onToggle={() => toggleSetting('smsAlerts')}
                            />
                        </div>
                    </div>
                </PanchayatCard>

                {/* Security & Access */}
                <PanchayatCard>
                    <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-purple-600" /> Security & Access
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                            <div>
                                <p className="font-bold text-slate-800">Two-Factor Authentication</p>
                                <p className="text-sm text-slate-500">Add an extra layer of security</p>
                            </div>
                            <ToggleSwitch
                                enabled={settings.twoFactorAuth}
                                onToggle={() => toggleSetting('twoFactorAuth')}
                            />
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <p className="font-bold text-slate-800">Wallet Permissions</p>
                                <p className="text-sm text-slate-500">Allow wallet signature requests</p>
                            </div>
                            <ToggleSwitch
                                enabled={settings.walletPermissions}
                                onToggle={() => toggleSetting('walletPermissions')}
                            />
                        </div>
                    </div>
                </PanchayatCard>

                {/* Verification Preferences */}
                <PanchayatCard>
                    <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-purple-600" /> Verification Preferences
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <p className="font-bold text-slate-800">Auto-Assign Requests</p>
                                <p className="text-sm text-slate-500">Automatically assign new verification requests</p>
                            </div>
                            <ToggleSwitch
                                enabled={settings.autoAssign}
                                onToggle={() => toggleSetting('autoAssign')}
                            />
                        </div>
                    </div>
                </PanchayatCard>

                {/* Data Management */}
                <PanchayatCard>
                    <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                        <Database className="w-5 h-5 text-purple-600" /> Data Management
                    </h2>
                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-purple-50 rounded-xl transition-colors group">
                            <div className="flex items-center gap-3">
                                <Download className="w-5 h-5 text-slate-500 group-hover:text-purple-600" />
                                <div className="text-left">
                                    <p className="font-bold text-slate-800">Export Data</p>
                                    <p className="text-sm text-slate-500">Download all your panchayat data</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">Download</span>
                        </button>
                    </div>
                </PanchayatCard>

                {/* Danger Zone */}
                <PanchayatCard className="border-red-200 bg-red-50/30">
                    <h2 className="text-xl font-black text-red-700 mb-6 flex items-center gap-2">
                        <Trash2 className="w-5 h-5" /> Danger Zone
                    </h2>
                    <div className="space-y-3">
                        <div className="p-4 bg-white rounded-xl border border-red-100">
                            <p className="font-bold text-slate-800 mb-1">Delete Account</p>
                            <p className="text-sm text-slate-500 mb-4">Permanently delete your panchayat account and all associated data. This action cannot be undone.</p>
                            <button className="px-6 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors text-sm">
                                Delete Account
                            </button>
                        </div>
                    </div>
                </PanchayatCard>
            </div>
        </PanchayatLayout>
    );
};

export default PanchayatSettings;
