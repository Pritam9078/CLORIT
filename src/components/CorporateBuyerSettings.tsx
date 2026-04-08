import React, { useState } from 'react';
import CorporateBuyerLayout from './shared/CorporateBuyerLayout';
import CorporateBuyerCard from './shared/CorporateBuyerCard';
import {
    Settings as SettingsIcon,
    Bell,
    Shield,
    Palette,
    Globe,
    Mail,
    Download,
    Trash2,
    Save
} from 'lucide-react';

const CorporateBuyerSettings = () => {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        transactionAlerts: true,
        monthlyReports: true,
        marketingEmails: false,
        twoFactorAuth: true,
        sessionTimeout: '30',
        theme: 'light',
        language: 'en',
        currency: 'USD'
    });

    const handleSave = () => {
        alert('Settings saved successfully!');
    };

    return (
        <CorporateBuyerLayout>
            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
                    Account <span className="text-blue-600">Settings</span>
                </h1>
                <p className="text-slate-500 font-medium text-lg">
                    Manage your preferences and account security
                </p>
            </div>

            <div className="space-y-6">
                {/* Notifications */}
                <CorporateBuyerCard>
                    <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                        <Bell className="w-6 h-6 text-blue-600" />
                        Notifications
                    </h2>
                    <div className="space-y-4">
                        {[
                            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email updates about your account' },
                            { key: 'transactionAlerts', label: 'Transaction Alerts', desc: 'Get notified when transactions complete' },
                            { key: 'monthlyReports', label: 'Monthly Reports', desc: 'Receive monthly sustainability reports' },
                            { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive news and product updates' }
                        ].map(item => (
                            <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <div className="font-bold text-slate-800">{item.label}</div>
                                    <div className="text-sm text-slate-500">{item.desc}</div>
                                </div>
                                <button
                                    onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                                    className={`w-14 h-8 rounded-full transition-all ${settings[item.key as keyof typeof settings]
                                        ? 'bg-blue-600'
                                        : 'bg-slate-300'
                                        }`}
                                >
                                    <div className={`w-6 h-6 bg-white rounded-full transition-all ${settings[item.key as keyof typeof settings]
                                        ? 'ml-7'
                                        : 'ml-1'
                                        }`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </CorporateBuyerCard>

                {/* Security */}
                <CorporateBuyerCard>
                    <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                        <Shield className="w-6 h-6 text-emerald-600" />
                        Security
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                            <div>
                                <div className="font-bold text-slate-800">Two-Factor Authentication</div>
                                <div className="text-sm text-slate-500">Add an extra layer of security</div>
                            </div>
                            <button
                                onClick={() => setSettings({ ...settings, twoFactorAuth: !settings.twoFactorAuth })}
                                className={`w-14 h-8 rounded-full transition-all ${settings.twoFactorAuth ? 'bg-emerald-600' : 'bg-slate-300'}`}
                            >
                                <div className={`w-6 h-6 bg-white rounded-full transition-all ${settings.twoFactorAuth ? 'ml-7' : 'ml-1'}`} />
                            </button>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl">
                            <label className="text-sm font-bold text-slate-700 mb-2 block">Session Timeout (minutes)</label>
                            <select
                                value={settings.sessionTimeout}
                                onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="15">15 minutes</option>
                                <option value="30">30 minutes</option>
                                <option value="60">1 hour</option>
                                <option value="120">2 hours</option>
                            </select>
                        </div>
                    </div>
                </CorporateBuyerCard>

                {/* Preferences */}
                <CorporateBuyerCard>
                    <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                        <Palette className="w-6 h-6 text-purple-600" />
                        Preferences
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm font-bold text-slate-700 mb-2 block">Theme</label>
                            <select
                                value={settings.theme}
                                onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="auto">Auto</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-bold text-slate-700 mb-2 block">Language</label>
                            <select
                                value={settings.language}
                                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="en">English</option>
                                <option value="hi">Hindi</option>
                                <option value="es">Spanish</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-bold text-slate-700 mb-2 block">Currency</label>
                            <select
                                value={settings.currency}
                                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="USD">USD ($)</option>
                                <option value="INR">INR (₹)</option>
                                <option value="EUR">EUR (€)</option>
                            </select>
                        </div>
                    </div>
                </CorporateBuyerCard>

                {/* Data Management */}
                <CorporateBuyerCard>
                    <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                        <Download className="w-6 h-6 text-amber-600" />
                        Data Management
                    </h2>
                    <div className="space-y-4">
                        <button className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all">
                            <div className="flex items-center gap-3">
                                <Download className="w-5 h-5 text-blue-600" />
                                <div className="text-left">
                                    <div className="font-bold text-slate-800">Export All Data</div>
                                    <div className="text-sm text-slate-500">Download all your account data</div>
                                </div>
                            </div>
                            <div className="text-blue-600 font-bold">Download</div>
                        </button>
                        <button className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-all">
                            <div className="flex items-center gap-3">
                                <Trash2 className="w-5 h-5 text-red-600" />
                                <div className="text-left">
                                    <div className="font-bold text-red-800">Delete Account</div>
                                    <div className="text-sm text-red-600">Permanently delete your account</div>
                                </div>
                            </div>
                            <div className="text-red-600 font-bold">Delete</div>
                        </button>
                    </div>
                </CorporateBuyerCard>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
                    >
                        <Save className="w-5 h-5" />
                        Save All Settings
                    </button>
                </div>
            </div>
        </CorporateBuyerLayout>
    );
};

export default CorporateBuyerSettings;
