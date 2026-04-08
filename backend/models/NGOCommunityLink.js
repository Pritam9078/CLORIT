import mongoose from 'mongoose';

const ngoCommunityLinkSchema = new mongoose.Schema({
    ngoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async function (v) {
                const user = await mongoose.model('User').findById(v);
                return user && user.role === 'ngo';
            },
            message: 'NGO ID must reference a valid NGO user'
        }
    },
    communityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async function (v) {
                const user = await mongoose.model('User').findById(v);
                return user && user.role === 'community';
            },
            message: 'Community ID must reference a valid community user'
        }
    },
    assignedDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'pending', 'suspended', 'terminated'],
        default: 'active'
    },
    permissions: {
        canVerifyData: {
            type: Boolean,
            default: true
        },
        canEditCommunityProfile: {
            type: Boolean,
            default: false
        },
        canViewFinancials: {
            type: Boolean,
            default: true
        }
    },
    notes: {
        type: String,
        trim: true
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// Compound index to ensure unique NGO-Community pairs
ngoCommunityLinkSchema.index({ ngoId: 1, communityId: 1 }, { unique: true });

// Indexes for queries
ngoCommunityLinkSchema.index({ ngoId: 1, status: 1 });
ngoCommunityLinkSchema.index({ communityId: 1 });

export default mongoose.model('NGOCommunityLink', ngoCommunityLinkSchema);
