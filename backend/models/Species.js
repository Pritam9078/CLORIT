import mongoose from 'mongoose';

const speciesSchema = new mongoose.Schema({
    speciesCode: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    scientificName: {
        type: String,
        required: true
    },
    commonName: {
        type: String
    },
    habitat: {
        type: String,
        enum: ['mangrove', 'seagrass', 'marsh', 'saltmarsh'],
        required: true,
        index: true
    },
    carbonSequestrationRate: {
        type: Number, // t CO2/ha/year
        default: 0
    },
    averageCarbonContent: {
        type: Number, // percentage
        default: 0
    },
    optimalSalinity: {
        min: Number,
        max: Number
    },
    depthRange: {
        min: Number, // meters
        max: Number
    },
    geographicDistribution: [String],
    characteristics: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
    },
    references: [{
        study: String,
        year: Number,
        findings: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for efficient queries
speciesSchema.index({ habitat: 1, carbonSequestrationRate: -1 });
speciesSchema.index({ scientificName: 'text', commonName: 'text' });

export default mongoose.model('Species', speciesSchema);
