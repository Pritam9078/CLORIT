import React, { useState } from 'react';
import PanchayatLayout from './shared/PanchayatLayout';
import PanchayatCard from './shared/PanchayatCard';
import {
    MapPin,
    FileText,
    Image as ImageIcon,
    CheckCircle2,
    XCircle,
    Clock,
    User,
    Calendar,
    Maximize2,
    AlertTriangle,
    Shield,
    Home,
    Ruler,
    FileCheck,
    Eye,
    Download,
    MapPinned
} from 'lucide-react';

interface LandRequest {
    id: number;
    parcelId: string;
    communityName: string;
    communityId: string;
    submitterName: string;
    area: number;
    coordinates: { lat: number; lng: number };
    submittedDate: string;
    pendingDays: number;
    status: 'pending' | 'approved' | 'rejected';
    priority: 'urgent' | 'high' | 'medium' | 'low';
    landDetails: {
        plotNumber: string;
        surveyNumber: string;
        landType: string;
        currentUse: string;
        proposedUse: string;
    };
    ownership: {
        ownerName: string;
        ownershipType: string;
        acquisitionDate: string;
        previousOwner?: string;
    };
    documents: Array<{
        name: string;
        type: string;
        verified: boolean;
    }>;
    photos: number;
    verificationNotes?: string;
}

const PanchayatLandVerification = () => {
    const [selectedRequest, setSelectedRequest] = useState<LandRequest | null>(null);
    const [verificationNotes, setVerificationNotes] = useState('');
    const [showDetailModal, setShowDetailModal] = useState(false);

    const landRequests: LandRequest[] = [
        {
            id: 1,
            parcelId: 'LP-2024-001',
            communityName: 'Sundarbans Group A',
            communityId: 'COMM-001',
            submitterName: 'Rajesh Kumar',
            area: 12.5,
            coordinates: { lat: 21.9497, lng: 88.2762 },
            submittedDate: '2024-01-15',
            pendingDays: 3,
            status: 'pending',
            priority: 'urgent',
            landDetails: {
                plotNumber: 'Plot-456',
                surveyNumber: 'SY-789/2024',
                landType: 'Agricultural',
                currentUse: 'Fallow Land',
                proposedUse: 'Mangrove Plantation'
            },
            ownership: {
                ownerName: 'Sundarbans Community Collective',
                ownershipType: 'Community Owned',
                acquisitionDate: '2020-03-15',
                previousOwner: 'State Forest Department'
            },
            documents: [
                { name: 'Land Ownership Deed', type: 'PDF', verified: false },
                { name: 'Survey Map', type: 'PDF', verified: false },
                { name: 'Tax Receipt 2023', type: 'PDF', verified: false },
                { name: 'NOC from Forest Dept', type: 'PDF', verified: false }
            ],
            photos: 8
        },
        {
            id: 2,
            parcelId: 'LP-2024-002',
            communityName: 'Coastal Defenders',
            communityId: 'COMM-002',
            submitterName: 'Priya Sharma',
            area: 8.3,
            coordinates: { lat: 22.1234, lng: 88.4567 },
            submittedDate: '2024-01-18',
            pendingDays: 1,
            status: 'pending',
            priority: 'high',
            landDetails: {
                plotNumber: 'Plot-123',
                surveyNumber: 'SY-456/2024',
                landType: 'Coastal',
                currentUse: 'Barren',
                proposedUse: 'Blue Carbon Project'
            },
            ownership: {
                ownerName: 'Coastal Defenders Trust',
                ownershipType: 'Trust Owned',
                acquisitionDate: '2021-06-20'
            },
            documents: [
                { name: 'Trust Deed', type: 'PDF', verified: false },
                { name: 'Land Certificate', type: 'PDF', verified: false },
                { name: 'Boundary Map', type: 'PDF', verified: false }
            ],
            photos: 5
        },
    ];

    const handleVerify = (request: LandRequest, approved: boolean) => {
        // This would call the backend API with wallet signature
        console.log(`${approved ? 'Approving' : 'Rejecting'} land parcel ${request.parcelId}`);
        console.log('Notes:', verificationNotes);
        setShowDetailModal(false);
        setVerificationNotes('');
    };

    const openDetailView = (request: LandRequest) => {
        setSelectedRequest(request);
        setShowDetailModal(true);
    };

    return (
        <PanchayatLayout>
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
                    Land Ownership <span className="text-purple-600">Verification</span>
                </h1>
                <p className="text-slate-500 font-medium text-lg">
                    Verify land ownership documents and details submitted by communities
                </p>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <PanchayatCard className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-3xl font-black text-amber-700 mb-1">{landRequests.length}</div>
                            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">Pending Review</div>
                        </div>
                        <Clock className="w-10 h-10 text-amber-500 opacity-50" />
                    </div>
                </PanchayatCard>
                <PanchayatCard className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-3xl font-black text-emerald-700 mb-1">45</div>
                            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Verified</div>
                        </div>
                        <CheckCircle2 className="w-10 h-10 text-emerald-500 opacity-50" />
                    </div>
                </PanchayatCard>
                <PanchayatCard className="bg-gradient-to-br from-red-50 to-rose-50 border-red-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-3xl font-black text-red-700 mb-1">3</div>
                            <div className="text-xs font-bold text-red-600 uppercase tracking-wider">Rejected</div>
                        </div>
                        <XCircle className="w-10 h-10 text-red-500 opacity-50" />
                    </div>
                </PanchayatCard>
                <PanchayatCard className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-3xl font-black text-purple-700 mb-1">234 ha</div>
                            <div className="text-xs font-bold text-purple-600 uppercase tracking-wider">Total Area</div>
                        </div>
                        <MapPin className="w-10 h-10 text-purple-500 opacity-50" />
                    </div>
                </PanchayatCard>
            </div>

            {/* Land Requests List */}
            <div className="space-y-4">
                {landRequests.map((request) => (
                    <PanchayatCard
                        key={request.id}
                        className="hover:border-purple-300 transition-all cursor-pointer group"
                        onClick={() => openDetailView(request)}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex gap-4 flex-1">
                                <div className="w-16 h-16 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                                    <MapPinned className="w-8 h-8 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-black text-slate-800 text-lg">Land Parcel #{request.parcelId}</h3>
                                        <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded ${request.priority === 'urgent' ? 'bg-red-50 text-red-600 border border-red-100 animate-pulse' :
                                                request.priority === 'high' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                                                    'bg-blue-50 text-blue-600 border border-blue-100'
                                            }`}>
                                            {request.priority}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                        <div className="text-sm">
                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Community</p>
                                            <p className="text-slate-700 font-bold flex items-center gap-2">
                                                <User className="w-4 h-4 text-purple-500" />
                                                {request.communityName}
                                            </p>
                                        </div>
                                        <div className="text-sm">
                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Owner</p>
                                            <p className="text-slate-700 font-bold flex items-center gap-2">
                                                <Home className="w-4 h-4 text-purple-500" />
                                                {request.ownership.ownerName}
                                            </p>
                                        </div>
                                        <div className="text-sm">
                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Land Type</p>
                                            <p className="text-slate-700 font-bold">{request.landDetails.landType}</p>
                                        </div>
                                        <div className="text-sm">
                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Proposed Use</p>
                                            <p className="text-slate-700 font-bold">{request.landDetails.proposedUse}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-lg border border-purple-100">
                                            <Ruler className="w-3 h-3 inline mr-1" />
                                            {request.area} hectares
                                        </span>
                                        <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-100">
                                            <Clock className="w-3 h-3 inline mr-1" />
                                            Pending {request.pendingDays} days
                                        </span>
                                        <span className="px-3 py-1 bg-slate-50 text-slate-700 text-xs font-bold rounded-lg border border-slate-100">
                                            <FileText className="w-3 h-3 inline mr-1" />
                                            {request.documents.length} docs
                                        </span>
                                        <span className="px-3 py-1 bg-slate-50 text-slate-700 text-xs font-bold rounded-lg border border-slate-100">
                                            <ImageIcon className="w-3 h-3 inline mr-1" />
                                            {request.photos} photos
                                        </span>
                                    </div>
                                    <div className="text-xs text-slate-400 flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        Submitted: {new Date(request.submittedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition-colors flex items-center gap-2 opacity-0 group-hover:opacity-100">
                                <Eye className="w-4 h-4" /> Review Details
                            </button>
                        </div>
                    </PanchayatCard>
                ))}
            </div>

            {/* Detail Modal */}
            {showDetailModal && selectedRequest && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-violet-600 text-white p-6 rounded-t-3xl flex items-center justify-between z-10">
                            <div>
                                <h2 className="text-2xl font-black mb-1">Land Verification Details</h2>
                                <p className="text-purple-100 text-sm">Parcel ID: {selectedRequest.parcelId}</p>
                            </div>
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Land Details Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-purple-600" /> Land Details
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-slate-50 rounded-xl">
                                            <p className="text-xs text-slate-400 font-bold uppercase mb-1">Plot Number</p>
                                            <p className="text-slate-800 font-bold">{selectedRequest.landDetails.plotNumber}</p>
                                        </div>
                                        <div className="p-3 bg-slate-50 rounded-xl">
                                            <p className="text-xs text-slate-400 font-bold uppercase mb-1">Survey Number</p>
                                            <p className="text-slate-800 font-bold">{selectedRequest.landDetails.surveyNumber}</p>
                                        </div>
                                        <div className="p-3 bg-slate-50 rounded-xl">
                                            <p className="text-xs text-slate-400 font-bold uppercase mb-1">Area</p>
                                            <p className="text-slate-800 font-bold">{selectedRequest.area} hectares</p>
                                        </div>
                                        <div className="p-3 bg-slate-50 rounded-xl">
                                            <p className="text-xs text-slate-400 font-bold uppercase mb-1">Land Type</p>
                                            <p className="text-slate-800 font-bold">{selectedRequest.landDetails.landType}</p>
                                        </div>
                                        <div className="p-3 bg-slate-50 rounded-xl">
                                            <p className="text-xs text-slate-400 font-bold uppercase mb-1">Current Use</p>
                                            <p className="text-slate-800 font-bold">{selectedRequest.landDetails.currentUse}</p>
                                        </div>
                                        <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                                            <p className="text-xs text-purple-600 font-bold uppercase mb-1">Proposed Use</p>
                                            <p className="text-purple-800 font-bold">{selectedRequest.landDetails.proposedUse}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Ownership Details */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-purple-600" /> Ownership Details
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-slate-50 rounded-xl">
                                            <p className="text-xs text-slate-400 font-bold uppercase mb-1">Owner Name</p>
                                            <p className="text-slate-800 font-bold">{selectedRequest.ownership.ownerName}</p>
                                        </div>
                                        <div className="p-3 bg-slate-50 rounded-xl">
                                            <p className="text-xs text-slate-400 font-bold uppercase mb-1">Ownership Type</p>
                                            <p className="text-slate-800 font-bold">{selectedRequest.ownership.ownershipType}</p>
                                        </div>
                                        <div className="p-3 bg-slate-50 rounded-xl">
                                            <p className="text-xs text-slate-400 font-bold uppercase mb-1">Acquisition Date</p>
                                            <p className="text-slate-800 font-bold">
                                                {new Date(selectedRequest.ownership.acquisitionDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </div>
                                        {selectedRequest.ownership.previousOwner && (
                                            <div className="p-3 bg-slate-50 rounded-xl">
                                                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Previous Owner</p>
                                                <p className="text-slate-800 font-bold">{selectedRequest.ownership.previousOwner}</p>
                                            </div>
                                        )}
                                        <div className="p-3 bg-slate-50 rounded-xl">
                                            <p className="text-xs text-slate-400 font-bold uppercase mb-1">Coordinates</p>
                                            <p className="text-slate-800 font-mono text-sm">
                                                {selectedRequest.coordinates.lat.toFixed(4)}, {selectedRequest.coordinates.lng.toFixed(4)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Documents Section */}
                            <div>
                                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-4">
                                    <FileCheck className="w-5 h-5 text-purple-600" /> Submitted Documents
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {selectedRequest.documents.map((doc, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-purple-50 transition-colors border border-slate-100 hover:border-purple-200">
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-5 h-5 text-purple-600" />
                                                <div>
                                                    <p className="font-bold text-slate-800 text-sm">{doc.name}</p>
                                                    <p className="text-xs text-slate-400">{doc.type}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button className="w-8 h-8 rounded-lg bg-purple-100 hover:bg-purple-200 flex items-center justify-center text-purple-600 transition-colors">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                                <button className="w-8 h-8 rounded-lg bg-purple-100 hover:bg-purple-200 flex items-center justify-center text-purple-600 transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Verification Notes */}
                            <div>
                                <h3 className="text-lg font-black text-slate-800 mb-4">Verification Notes</h3>
                                <textarea
                                    value={verificationNotes}
                                    onChange={(e) => setVerificationNotes(e.target.value)}
                                    placeholder="Add your verification notes here (required for approval/rejection)..."
                                    className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all resize-none"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4 border-t border-slate-100">
                                <button
                                    onClick={() => handleVerify(selectedRequest, true)}
                                    disabled={!verificationNotes.trim()}
                                    className="flex-1 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-200"
                                >
                                    <CheckCircle2 className="w-5 h-5" /> Approve & Verify Land
                                </button>
                                <button
                                    onClick={() => handleVerify(selectedRequest, false)}
                                    disabled={!verificationNotes.trim()}
                                    className="flex-1 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-200"
                                >
                                    <XCircle className="w-5 h-5" /> Reject Request
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {landRequests.length === 0 && (
                <PanchayatCard className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 mb-2">All Caught Up!</h3>
                    <p className="text-slate-500">No pending land verification requests at the moment.</p>
                </PanchayatCard>
            )}
        </PanchayatLayout>
    );
};

export default PanchayatLandVerification;
