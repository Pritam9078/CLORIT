import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        region: { type: String, required: true },
        state: String,
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    },
    status: {
        type: String,
        enum: ['submitted', 'ngo-verified', 'panchayat-reviewed', 'nccr-approved', 'rejected'],
        default: 'submitted',
        index: true
    },
    ndviValue: {
        type: Number,
        min: 0,
        max: 1
    },
    area: {
        type: Number,
        required: true // in hectares
    },
    carbonCredits: {
        type: Number,
        default: 0
    },
    submittedBy: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        walletAddress: { type: String, required: true },
        communityName: String,
        contactInfo: String
    },
    verifications: [{
        stage: {
            type: String,
            enum: ['ngo', 'panchayat', 'nccr']
        },
        verifiedBy: {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            walletAddress: String,
            name: String,
            role: String
        },
        timestamp: Date,
        signature: String,
        notes: String,
        status: {
            type: String,
            enum: ['approved', 'rejected', 'pending'],
            default: 'pending'
        }
    }],
    nccrApproval: {
        approvedBy: String, // wallet address
        approvalDate: Date,
        txHash: String, // blockchain transaction hash
        notes: String,
        finalCarbonCredits: Number
    },
    rejection: {
        rejectedBy: String,
        rejectionDate: Date,
        reason: String,
        signature: String
    },
    ipfsHash: String, // IPFS hash for project documents
    metadata: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
    },
    submissionDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Indexes for efficient querying
projectSchema.index({ status: 1, 'location.region': 1 });
projectSchema.index({ 'submittedBy.walletAddress': 1 });
projectSchema.index({ ndviValue: 1 });

export default mongoose.model('Project', projectSchema);
