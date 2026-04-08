import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2, FileText, UserCircle, Briefcase, Leaf, Wallet,
    CheckCircle2, AlertCircle, Clock, XCircle, UploadCloud, ChevronRight, ChevronLeft, ShieldCheck, MapPin, Globe, Mail, Phone, Users, Award
} from 'lucide-react';
import CorporateBuyerCard from './shared/CorporateBuyerCard';
import { LOGO_CONFIG } from '../constants/branding';

import { useAuthStore } from '../state/authStore';

type KYBStatus = 'Pending' | 'Under Review' | 'Verified' | 'Rejected';

interface CorporateBuyerProfileProps {}

const STEPS = [
    { id: 1, title: 'Company Details', icon: Building2 },
    { id: 2, title: 'Legal Documents', icon: FileText },
    { id: 3, title: 'Director Details', icon: UserCircle },
    { id: 4, title: 'Financial Info', icon: Briefcase },
    { id: 5, title: 'ESG Data', icon: Leaf },
    { id: 6, title: 'Web3 Details', icon: Wallet }
];

export const CorporateBuyerProfile: React.FC<CorporateBuyerProfileProps> = () => {
    const { currentUser, updateUserProfile, updateUserStatus } = useAuthStore();
    const [currentStep, setCurrentStep] = useState(1);
    
    const kybStatus: KYBStatus = currentUser?.status === 'verified' ? 'Verified' : 
                                 currentUser?.status === 'rejected' ? 'Rejected' :
                                 currentUser?.organization ? 'Under Review' : 'Pending';
    
    // Form States
    const [companyDetails, setCompanyDetails] = useState({
        name: '', cin: '', businessType: 'Private Limited', incorporationDate: '', address: ''
    });
    const [documents, setDocuments] = useState<{[key: string]: string | null}>({
        inc: null, pan: null, gst: null, moa: null, aoa: null
    });
    const [directorDetails, setDirectorDetails] = useState({
        name: '', pan: '', email: '', phone: '', idProof: null
    });
    const [financials, setFinancials] = useState({
        bankAccount: '', ifsc: '', addressProof: null, statement: null
    });
    const [esgData, setEsgData] = useState({
        industry: '', emissions: '', netZeroTarget: ''
    });
    const [web3Data, setWeb3Data] = useState({
        walletAddress: '', multisig: false
    });

    const [isDevControlOpen, setIsDevControlOpen] = useState(false);

    const updateStatus = (newStatus: KYBStatus) => {
        if (!currentUser) return;
        
        if (newStatus === 'Verified') {
            updateUserStatus(currentUser.id, 'verified');
        } else if (newStatus === 'Rejected') {
            updateUserStatus(currentUser.id, 'rejected');
        } else if (newStatus === 'Pending') {
            updateUserStatus(currentUser.id, 'pending');
            updateUserProfile(currentUser.id, { organization: undefined, industry: undefined, kybSubmitted: false });
        } else if (newStatus === 'Under Review') {
            updateUserProfile(currentUser.id, {
                organization: companyDetails.name,
                industry: esgData.industry,
                esgGoals: esgData.netZeroTarget,
                location: companyDetails.address,
                phone: directorDetails.phone,
                kybSubmitted: true
            });
        }
    };

    const handleNext = () => {
        if (currentStep < 6) setCurrentStep(c => c + 1);
        else {
            // Save to store when submitted
            updateStatus('Under Review');
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) setCurrentStep(c => c - 1);
    };

    const handleFileUploadMock = (key: string, category: 'docs' | 'director' | 'fin', e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        const fileName = file.name;
        if (category === 'docs') setDocuments(prev => ({...prev, [key]: fileName}));
        if (category === 'director') setDirectorDetails(prev => ({...prev, idProof: fileName as any}));
        if (category === 'fin') setFinancials(prev => ({...prev, [key]: fileName}));
    };

    // --- Sub-components for Multi-step Form ---
    const RenderStep1 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-800">Basic Company Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Company Name</label>
                    <input type="text" value={companyDetails.name} onChange={e => setCompanyDetails({...companyDetails, name: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. Acme Corp Ltd" />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Registration No. (CIN)</label>
                    <input type="text" value={companyDetails.cin} onChange={e => setCompanyDetails({...companyDetails, cin: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. U74999DL2010PTC201" />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Business Type</label>
                    <select value={companyDetails.businessType} onChange={e => setCompanyDetails({...companyDetails, businessType: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500">
                        <option>Private Limited</option>
                        <option>Public Limited</option>
                        <option>LLP</option>
                        <option>Section 8</option>
                    </select>
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Incorporation Date</label>
                    <input type="date" value={companyDetails.incorporationDate} onChange={e => setCompanyDetails({...companyDetails, incorporationDate: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div className="md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Registered Address</label>
                    <textarea value={companyDetails.address} onChange={e => setCompanyDetails({...companyDetails, address: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" rows={3} placeholder="Full registered address"></textarea>
                </div>
            </div>
        </div>
    );

    const FileDropzone = ({ title, fileName, onChange }: { title: string, fileName: string | null, onChange: (e:any) => void }) => (
        <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-emerald-500 hover:bg-emerald-50 transition-colors group">
            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={onChange} />
            {fileName ? (
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-emerald-700 text-sm truncate max-w-[200px]">{fileName}</span>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-slate-100 text-slate-400 group-hover:text-emerald-500 group-hover:bg-emerald-100 rounded-full flex items-center justify-center transition-colors">
                        <UploadCloud className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-700 mb-1">{title}</p>
                        <p className="text-xs text-slate-500">PDF, JPG up to 5MB</p>
                    </div>
                </div>
            )}
        </div>
    );

    const RenderStep2 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-800">Legal Documents</h3>
            <p className="text-slate-500 text-sm">Please upload high-quality scans of your origin documents.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <FileDropzone title="Cert. of Incorporation" fileName={documents.inc} onChange={(e) => handleFileUploadMock('inc', 'docs', e)} />
                <FileDropzone title="Company PAN Card" fileName={documents.pan} onChange={(e) => handleFileUploadMock('pan', 'docs', e)} />
                <FileDropzone title="GST Certificate" fileName={documents.gst} onChange={(e) => handleFileUploadMock('gst', 'docs', e)} />
                <FileDropzone title="Memorandum of Assc. (MOA)" fileName={documents.moa} onChange={(e) => handleFileUploadMock('moa', 'docs', e)} />
                <FileDropzone title="Articles of Assc. (AOA)" fileName={documents.aoa} onChange={(e) => handleFileUploadMock('aoa', 'docs', e)} />
            </div>
        </div>
    );

    const RenderStep3 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-800">Director / Owner Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Primary Director Name</label>
                    <input type="text" value={directorDetails.name} onChange={e => setDirectorDetails({...directorDetails, name: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. John Doe" />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Director PAN / SSN</label>
                    <input type="text" value={directorDetails.pan} onChange={e => setDirectorDetails({...directorDetails, pan: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. ABCDE1234F" />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Director Email</label>
                    <input type="email" value={directorDetails.email} onChange={e => setDirectorDetails({...directorDetails, email: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. john@acmecorp.com" />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Director Phone</label>
                    <input type="tel" value={directorDetails.phone} onChange={e => setDirectorDetails({...directorDetails, phone: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="+91 XXXXX XXXXX" />
                </div>
            </div>
            
            <h4 className="text-sm font-bold text-slate-700 mt-6">Upload Director ID Proof (Aadhaar/Passport/DL)</h4>
            <div className="w-64">
                <FileDropzone title="Director ID Proof" fileName={directorDetails.idProof} onChange={(e) => handleFileUploadMock('idProof', 'director', e)} />
            </div>
        </div>
    );

    const RenderStep4 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-800">Financial & Compliance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Bank Account Number</label>
                    <input type="text" value={financials.bankAccount} onChange={e => setFinancials({...financials, bankAccount: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Account Number" />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">IFSC / Swift Code</label>
                    <input type="text" value={financials.ifsc} onChange={e => setFinancials({...financials, ifsc: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Code" />
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <FileDropzone title="Business Address Proof" fileName={financials.addressProof} onChange={(e) => handleFileUploadMock('addressProof', 'fin', e)} />
                <FileDropzone title="Latest Financial Statement" fileName={financials.statement} onChange={(e) => handleFileUploadMock('statement', 'fin', e)} />
            </div>
        </div>
    );

    const RenderStep5 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-800">ESG & Carbon Data</h3>
            <p className="text-slate-500 text-sm">Help us understand your sustainability goals to tailor the marketplace matching.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Industry Sector</label>
                    <select value={esgData.industry} onChange={e => setEsgData({...esgData, industry: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500">
                        <option value="">Select Industry...</option>
                        <option>Technology & IT</option>
                        <option>Manufacturing</option>
                        <option>Aviation / Transport</option>
                        <option>Energy / Utilities</option>
                        <option>Retail & FMCG</option>
                    </select>
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Annual Carbon Emissions (Tons - Approx)</label>
                    <input type="number" value={esgData.emissions} onChange={e => setEsgData({...esgData, emissions: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. 50000" />
                </div>
                <div className="md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Net Zero Target Year</label>
                    <select value={esgData.netZeroTarget} onChange={e => setEsgData({...esgData, netZeroTarget: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500">
                        <option value="">Select Year...</option>
                        <option>2030</option>
                        <option>2035</option>
                        <option>2040</option>
                        <option>2050 (Paris Agreement)</option>
                    </select>
                </div>
            </div>
        </div>
    );

    const RenderStep6 = () => (
        <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-blue-50 border border-blue-100 rounded-2xl">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl shrink-0">
                    <Wallet className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-black text-slate-800">Web3 Digital Identity</h3>
                    <p className="text-slate-600 text-sm mt-1">Connect the wallet that will be used for purchasing carbon offsets and storing digital certificates.</p>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Corporate Wallet Address</label>
                    <div className="flex gap-2">
                        <input type="text" value={web3Data.walletAddress} onChange={e => setWeb3Data({...web3Data, walletAddress: e.target.value})} className="flex-1 px-4 py-3 font-mono text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" placeholder="0x..." />
                        <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors whitespace-nowrap">
                            Connect MetaMask
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl">
                    <input 
                        type="checkbox" 
                        id="multisig" 
                        checked={web3Data.multisig} 
                        onChange={(e) => setWeb3Data({...web3Data, multisig: e.target.checked})}
                        className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" 
                    />
                    <label htmlFor="multisig" className="text-sm font-semibold text-slate-700 cursor-pointer">
                        This is a Multi-signature Wallet (Recommended for Enterprise)
                    </label>
                </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800 mt-6">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm">By submitting this application, you declare that all provided documents are genuine and authorize CLORIT to perform necessary background checks.</p>
            </div>
        </div>
    );

    // --- State Overlays ---
    if (kybStatus === 'Under Review') {
        return (
            <div className="max-w-2xl mx-auto text-center py-20">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <Clock className="w-12 h-12" />
                </motion.div>
                <h1 className="text-3xl font-black text-slate-800 mb-4">KYB Under Review</h1>
                <p className="text-slate-600 text-lg mb-8">
                    Your application is currently being reviewed by our compliance team. The verification process usually takes 1-2 business days.
                </p>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 inline-block text-left relative overflow-hidden group">
                    <p className="font-bold text-slate-800 mb-2">Application ID: <span className="font-mono text-emerald-600">KYB-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span></p>
                    <p className="text-sm text-slate-500">Submitted: {new Date().toLocaleDateString()}</p>
                    
                    {/* Dev Overlay Trigger hidden in corner */}
                    <button onClick={() => setIsDevControlOpen(!isDevControlOpen)} className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-10" />
                </div>

                {isDevControlOpen && (
                    <div className="fixed bottom-10 right-10 bg-white p-6 rounded-2xl shadow-2xl border border-slate-200 z-50 text-left">
                        <h4 className="font-black text-slate-800 mb-4">Simulate KYC Decision</h4>
                        <div className="flex gap-2">
                            <button onClick={() => updateStatus('Verified')} className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700">Approve</button>
                            <button onClick={() => updateStatus('Rejected')} className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700">Reject</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (kybStatus === 'Rejected') {
        return (
            <div className="max-w-2xl mx-auto text-center py-20">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <XCircle className="w-12 h-12" />
                </motion.div>
                <h1 className="text-3xl font-black text-slate-800 mb-4">Application Rejected</h1>
                <p className="text-slate-600 text-lg mb-8">
                    Unfortunately, your KYB verification could not be completed with the provided documents. Please check your email for specific details and re-apply.
                </p>
                <button onClick={() => {updateStatus('Pending'); setCurrentStep(1);}} className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
                    Start New Application
                </button>
            </div>
        );
    }

    if (kybStatus === 'Verified') {
        return (
            <div>
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
                            Company <span className="text-emerald-600">Profile</span>
                        </h1>
                        <p className="text-slate-500 font-medium text-lg">
                            Manage your verified company information and sustainability targets
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <CorporateBuyerCard>
                            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                                <Building2 className="w-6 h-6 text-emerald-600" />
                                {companyDetails.name || 'Acme Corporation'}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Industry</label>
                                    <div className="text-lg font-bold text-slate-800">{esgData.industry || 'Technology'}</div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">CIN</label>
                                    <div className="text-lg font-bold text-slate-800 font-mono text-sm bg-slate-100 p-2 rounded-lg inline-block">{companyDetails.cin || 'U74999DL2010PTC201'}</div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Registered Address</label>
                                    <div className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                                        {companyDetails.address || 'Tech Park, Bangalore, Karnataka 560001'}
                                    </div>
                                </div>
                            </div>
                        </CorporateBuyerCard>

                        <CorporateBuyerCard>
                            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                                <Award className="w-6 h-6 text-emerald-600" />
                                Sustainability Targets
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                                    <span className="font-bold text-slate-800">Net Zero Target Year</span>
                                    <span className="text-emerald-600 font-bold">{esgData.netZeroTarget || '2030'}</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                                    <span className="font-bold text-slate-800">Annual Emissions (Baseline)</span>
                                    <span className="text-emerald-600 font-bold">{esgData.emissions || '50000'} Tons</span>
                                </div>
                            </div>
                        </CorporateBuyerCard>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <CorporateBuyerCard className="bg-emerald-50 border-emerald-200">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0">
                                    <ShieldCheck className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-xs text-emerald-600 uppercase font-bold flex items-center gap-1">
                                        KYB Status
                                    </div>
                                    <div className="text-xl font-black text-emerald-700">Verified</div>
                                </div>
                            </div>
                            <p className="text-sm text-emerald-800 font-medium">
                                Account is authorized for trading on the CLORIT Marketplace.
                            </p>
                        </CorporateBuyerCard>

                        <CorporateBuyerCard>
                            <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                                <Wallet className="w-5 h-5 text-emerald-600" />
                                Linked Wallet
                            </h3>
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                <div className="font-mono text-sm text-slate-600 break-all mb-2 font-bold">
                                    {web3Data.walletAddress || '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'}
                                </div>
                                {web3Data.multisig && (
                                    <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded">Multi-sig</span>
                                )}
                            </div>
                        </CorporateBuyerCard>

                        <button onClick={() => setIsDevControlOpen(!isDevControlOpen)} className="w-full text-center text-xs text-slate-300 hover:text-slate-500">Dev Options</button>
                        {isDevControlOpen && (
                            <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-200 text-left">
                                <p className="text-xs font-bold text-slate-500 mb-2">Simulate Status Change</p>
                                <button onClick={() => {updateStatus('Pending'); setCurrentStep(1);}} className="w-full text-left py-1 text-sm text-slate-700 hover:text-emerald-600 font-bold">Reset to Pending</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // --- Default 'Pending' KYB Form Flow ---
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-10 text-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-xl shadow-emerald-500/10 border border-emerald-100 flex items-center justify-center mx-auto mb-6">
                    <img src={LOGO_CONFIG.MAIN_LOGO} alt="CLORIT" className="w-10 h-10 object-contain" />
                </div>
                <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-3">
                    Corporate <span className="text-emerald-600">KYB Application</span>
                </h1>
                <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
                    Complete your Know Your Business (KYB) verification to gain full access to the CLORIT Carbon Credit Marketplace.
                </p>
            </div>

            {/* Stepper Header */}
            <div className="mb-12">
                <div className="flex justify-between relative">
                    {/* Progress Bar Background */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 -translate-y-1/2 rounded-full" />
                    {/* Active Progress */}
                    <div 
                        className="absolute top-1/2 left-0 h-1 bg-emerald-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                    />
                    
                    {STEPS.map((step) => {
                        const Icon = step.icon;
                        const isActive = step.id === currentStep;
                        const isCompleted = step.id < currentStep;
                        
                        return (
                            <div key={step.id} className="flex flex-col items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 shadow-lg ${
                                    isActive ? 'bg-emerald-600 scale-110 shadow-emerald-500/30' : 
                                    isCompleted ? 'bg-emerald-500' : 'bg-slate-300 shadow-none'
                                }`}>
                                    {isCompleted ? <CheckCircle2 className="w-6 h-6 text-white" /> : <Icon className="w-5 h-5" />}
                                </div>
                                <span className={`text-xs font-bold mt-3 max-w-[80px] text-center ${isActive ? 'text-emerald-700' : 'text-slate-500'}`}>
                                    {step.title}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Form Container */}
            <CorporateBuyerCard className="p-8 shadow-xl shadow-slate-200/50">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {currentStep === 1 && <RenderStep1 />}
                        {currentStep === 2 && <RenderStep2 />}
                        {currentStep === 3 && <RenderStep3 />}
                        {currentStep === 4 && <RenderStep4 />}
                        {currentStep === 5 && <RenderStep5 />}
                        {currentStep === 6 && <RenderStep6 />}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-12 pt-6 border-t border-slate-100">
                    <button 
                        onClick={handlePrev} 
                        disabled={currentStep === 1}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                            currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-600 hover:bg-slate-100'
                        }`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Back
                    </button>
                    
                    <button 
                        onClick={handleNext}
                        className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
                    >
                        {currentStep === 6 ? 'Submit Application' : 'Continue'}
                        {currentStep !== 6 && <ChevronRight className="w-5 h-5" />}
                    </button>
                </div>
            </CorporateBuyerCard>
        </div>
    );
};

export default CorporateBuyerProfile;
