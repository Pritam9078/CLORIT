import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import NDVIScan from './models/NDVIScan.js';
import Alert from './models/Alert.js';

dotenv.config();

const sampleProjects = [
    {
        projectId: 'CLORIT-2000',
        name: 'Sundarbans Mangrove Restoration',
        location: {
            region: 'West Bengal',
            state: 'West Bengal',
            coordinates: { latitude: 21.9497, longitude: 88.8872 }
        },
        status: 'nccr-approved',
        ndviValue: 0.72,
        area: 45.2,
        carbonCredits: 1250,
        submittedBy: {
            walletAddress: '0x1234567890123456789012345678901234567890',
            communityName: 'Sundarbans Community',
            contactInfo: 'contact@sundarbans.org'
        },
        verifications: [
            {
                stage: 'ngo',
                verifiedBy: {
                    walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
                    name: 'Green Earth Foundation'
                },
                timestamp: new Date('2024-01-15'),
                signature: '0xsignature1',
                notes: 'Verified mangrove planting and survival rates'
            },
            {
                stage: 'panchayat',
                verifiedBy: {
                    walletAddress: '0x9876543210987654321098765432109876543210',
                    name: 'Sundarbans Panchayat'
                },
                timestamp: new Date('2024-02-01'),
                signature: '0xsignature2',
                notes: 'Local verification completed'
            },
            {
                stage: 'nccr',
                verifiedBy: {
                    walletAddress: '0x0000000000000000000000000000000000000000',
                    name: 'NCCR Super Admin'
                },
                timestamp: new Date('2024-02-15'),
                signature: '0xsignature3',
                notes: 'Final NCCR approval granted'
            }
        ],
        nccrApproval: {
            approvedBy: '0x0000000000000000000000000000000000000000',
            approvalDate: new Date('2024-02-15'),
            txHash: '0xtxhash1234567890',
            notes: 'Excellent progress, approved for carbon credits',
            finalCarbonCredits: 1250
        },
        submissionDate: new Date('2024-01-01')
    },
    {
        projectId: 'CLORIT-2001',
        name: 'Kerala Backwaters Seagrass',
        location: {
            region: 'Kerala',
            state: 'Kerala',
            coordinates: { latitude: 9.9312, longitude: 76.2673 }
        },
        status: 'nccr-approved',
        ndviValue: 0.68,
        area: 32.7,
        carbonCredits: 980,
        submittedBy: {
            walletAddress: '0x2345678901234567890123456789012345678901',
            communityName: 'Backwaters Conservation Group',
            contactInfo: 'info@keralabackwaters.org'
        },
        verifications: [
            {
                stage: 'ngo',
                verifiedBy: {
                    walletAddress: '0xbcdef12345678901bcdef12345678901bcdef123',
                    name: 'Coastal Conservation Trust'
                },
                timestamp: new Date('2024-01-20'),
                signature: '0xsignature4',
                notes: 'Seagrass beds verified'
            }
        ],
        nccrApproval: {
            approvedBy: '0x0000000000000000000000000000000000000000',
            approvalDate: new Date('2024-03-01'),
            txHash: '0xtxhash0987654321',
            notes: 'Approved',
            finalCarbonCredits: 980
        },
        submissionDate: new Date('2024-01-10')
    },
    {
        projectId: 'CLORIT-2008',
        name: 'Tamil Nadu Coastal Restoration',
        location: {
            region: 'Tamil Nadu',
            state: 'Tamil Nadu',
            coordinates: { latitude: 11.1271, longitude: 78.6569 }
        },
        status: 'panchayat-reviewed',
        ndviValue: 0.65,
        area: 65.5,
        carbonCredits: 1840,
        submittedBy: {
            walletAddress: '0x3456789012345678901234567890123456789012',
            communityName: 'Tamil Nadu Coastal Community',
            contactInfo: 'contact@tncoastal.org'
        },
        verifications: [
            {
                stage: 'ngo',
                verifiedBy: {
                    walletAddress: '0xcdef123456789012cdef123456789012cdef1234',
                    name: 'Ocean Blue Initiative'
                },
                timestamp: new Date('2024-03-10'),
                signature: '0xsignature5',
                notes: 'Initial verification complete'
            },
            {
                stage: 'panchayat',
                verifiedBy: {
                    walletAddress: '0x8765432109876543210987654321098765432109',
                    name: 'TN Panchayat'
                },
                timestamp: new Date('2024-03-20'),
                signature: '0xsignature6',
                notes: 'Panchayat review completed, ready for NCCR'
            }
        ],
        submissionDate: new Date('2024-03-01')
    },
    {
        projectId: 'CLORIT-2009',
        name: 'Andhra Pradesh Mangrove Project',
        location: {
            region: 'Andhra Pradesh',
            state: 'Andhra Pradesh',
            coordinates: { latitude: 16.5062, longitude: 80.6480 }
        },
        status: 'submitted',
        ndviValue: 0.55,
        area: 27.3,
        carbonCredits: 750,
        submittedBy: {
            walletAddress: '0x4567890123456789012345678901234567890123',
            communityName: 'AP Coastal Restoration',
            contactInfo: 'info@apcoastal.org'
        },
        verifications: [],
        submissionDate: new Date('2024-03-25')
    },
    {
        projectId: 'CLORIT-2010',
        name: 'Gujarat Saltmarsh Initiative',
        location: {
            region: 'Gujarat',
            state: 'Gujarat',
            coordinates: { latitude: 22.2587, longitude: 71.1924 }
        },
        status: 'ngo-verified',
        ndviValue: 0.58,
        area: 38.9,
        carbonCredits: 1100,
        submittedBy: {
            walletAddress: '0x5678901234567890123456789012345678901234',
            communityName: 'Gujarat Coastal Group',
            contactInfo: 'contact@gujaratcoastal.org'
        },
        verifications: [
            {
                stage: 'ngo',
                verifiedBy: {
                    walletAddress: '0xdef1234567890123def1234567890123def12345',
                    name: 'Marine Ecosystem Foundation'
                },
                timestamp: new Date('2024-03-28'),
                signature: '0xsignature7',
                notes: 'NGO verification passed'
            }
        ],
        submissionDate: new Date('2024-03-15')
    }
];

const sampleNDVIScans = [
    {
        projectId: 'CLORIT-2000',
        scanDate: new Date('2024-01-15'),
        ndviValue: 0.72,
        satelliteSource: 'sentinel',
        imageUrl: 'https://ipfs.io/ipfs/QmSample1',
        metadata: {
            cloudCover: 5,
            resolution: '10m',
            bands: ['B4', 'B8'],
            processingLevel: 'L2A'
        },
        verifiedBy: '0x0000000000000000000000000000000000000000'
    },
    {
        projectId: 'CLORIT-2001',
        scanDate: new Date('2024-02-01'),
        ndviValue: 0.68,
        satelliteSource: 'landsat',
        imageUrl: 'https://ipfs.io/ipfs/QmSample2',
        metadata: {
            cloudCover: 10,
            resolution: '30m',
            bands: ['B4', 'B5'],
            processingLevel: 'L2'
        },
        verifiedBy: '0x0000000000000000000000000000000000000000'
    },
    {
        projectId: 'CLORIT-2008',
        scanDate: new Date('2024-03-15'),
        ndviValue: 0.65,
        satelliteSource: 'sentinel',
        imageUrl: 'https://ipfs.io/ipfs/QmSample3',
        metadata: {
            cloudCover: 8,
            resolution: '10m',
            bands: ['B4', 'B8'],
            processingLevel: 'L2A'
        },
        verifiedBy: '0x0000000000000000000000000000000000000000'
    }
];

const sampleAlerts = [
    {
        projectId: 'CLORIT-2009',
        type: 'verification_pending',
        severity: 'medium',
        title: 'New Project Awaiting Verification',
        message: 'Project CLORIT-2009 has been submitted and requires NGO verification',
        metadata: {
            submissionDate: new Date('2024-03-25')
        },
        isResolved: false
    },
    {
        projectId: 'CLORIT-2008',
        type: 'verification_pending',
        severity: 'high',
        title: 'Project Ready for NCCR Approval',
        message: 'Project CLORIT-2008 has completed panchayat review and is ready for final NCCR approval',
        metadata: {
            reviewDate: new Date('2024-03-20')
        },
        isResolved: false
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clorit', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        console.log('\n🗑️  Clearing existing data...');
        await Project.deleteMany({});
        await NDVIScan.deleteMany({});
        await Alert.deleteMany({});
        console.log('✅ Existing data cleared');

        // Insert sample projects
        console.log('\n📦 Inserting sample projects...');
        const projects = await Project.insertMany(sampleProjects);
        console.log(`✅ Inserted ${projects.length} projects`);

        // Insert NDVI scans
        console.log('\n🛰️  Inserting NDVI scans...');
        const scans = await NDVIScan.insertMany(sampleNDVIScans);
        console.log(`✅ Inserted ${scans.length} NDVI scans`);

        // Insert alerts
        console.log('\n🚨 Inserting alerts...');
        const alerts = await Alert.insertMany(sampleAlerts);
        console.log(`✅ Inserted ${alerts.length} alerts`);

        // Summary
        console.log('\n📊 Database Seeding Summary:');
        console.log(`   - Projects: ${projects.length}`);
        console.log(`   - NDVI Scans: ${scans.length}`);
        console.log(`   - Alerts: ${alerts.length}`);
        console.log('\n✅ Database seeding completed successfully!');

        // Show project statuses
        console.log('\n📋 Project Status Breakdown:');
        const statusCounts = await Project.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
        statusCounts.forEach(s => {
            console.log(`   - ${s._id}: ${s.count}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
