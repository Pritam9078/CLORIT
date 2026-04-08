import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true,
        index: true
    },
    type: {
        type: String,
        required: true,
        enum: ['ndvi_degradation', 'ndvi_improvement', 'verification_pending', 'data_update', 'system'],
        index: true
    },
    severity: {
        type: String,
        required: true,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    isResolved: {
        type: Boolean,
        default: false,
        index: true
    },
    resolvedBy: {
        type: String // wallet address
    },
    resolvedAt: {
        type: Date
    },
    resolutionNotes: String,
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
}, {
    timestamps: true
});

// Indexes for alert queries
alertSchema.index({ isResolved: 1, severity: -1, createdAt: -1 });
alertSchema.index({ projectId: 1, isResolved: 1 });

export default mongoose.model('Alert', alertSchema);
