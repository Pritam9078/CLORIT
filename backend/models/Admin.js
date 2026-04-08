import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    walletAddress: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        sparse: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'super-admin'],
        default: 'admin'
    },
    region: {
        type: String,
        default: 'National'
    },
    nonce: {
        type: String,
        default: () => Math.floor(Math.random() * 1000000).toString()
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Method to generate new nonce for wallet authentication
adminSchema.methods.generateNonce = function () {
    this.nonce = Math.floor(Math.random() * 1000000).toString();
    return this.save();
};

export default mongoose.model('Admin', adminSchema);
