import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
    adminWallet: {
        type: String,
        required: true,
        index: true
    },
    action: {
        type: String,
        required: true,
        enum: [
            'project_approved',
            'project_rejected',
            'ndvi_scan_triggered',
            'data_exported',
            'admin_login',
            'settings_updated',
            'user_modified'
        ]
    },
    projectId: {
        type: String,
        index: true
    },
    signature: {
        type: String // wallet signature for verification
    },
    txHash: {
        type: String // blockchain transaction hash if applicable
    },
    details: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    ipAddress: String,
    userAgent: String,
    timestamp: {
        type: Date,
        default: Date.now,
        index: true
    }
}, {
    timestamps: true
});

// Indexes for audit trail queries
auditLogSchema.index({ adminWallet: 1, timestamp: -1 });
auditLogSchema.index({ action: 1, timestamp: -1 });
auditLogSchema.index({ projectId: 1, timestamp: -1 });

export default mongoose.model('AuditLog', auditLogSchema);
