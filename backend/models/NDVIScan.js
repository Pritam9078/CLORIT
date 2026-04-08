import mongoose from 'mongoose';

const ndviScanSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true,
        index: true
    },
    scanDate: {
        type: Date,
        required: true,
        index: true
    },
    ndviValue: {
        type: Number,
        required: true,
        min: -1,
        max: 1
    },
    satelliteSource: {
        type: String,
        enum: ['sentinel', 'landsat', 'nasa', 'mock'],
        default: 'mock'
    },
    imageUrl: {
        type: String // IPFS URL or cloud storage URL
    },
    metadata: {
        cloudCover: Number,
        resolution: String,
        bands: [String],
        processingLevel: String
    },
    verifiedBy: {
        type: String // wallet address of admin who verified
    },
    blockchainHash: {
        type: String // hash stored on blockchain for immutability
    },
    healthStatus: {
        type: String,
        enum: ['healthy', 'moderate', 'poor', 'critical'],
        default: function () {
            if (this.ndviValue >= 0.6) return 'healthy';
            if (this.ndviValue >= 0.4) return 'moderate';
            if (this.ndviValue >= 0.2) return 'poor';
            return 'critical';
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Compound index for efficient time-series queries
ndviScanSchema.index({ projectId: 1, scanDate: -1 });
ndviScanSchema.index({ healthStatus: 1 });

export default mongoose.model('NDVIScan', ndviScanSchema);
