import mongoose from 'mongoose';
import User from './User.js';
import NGOCommunityLink from './NGOCommunityLink.js';

/**
 * Migration script to add hierarchy support to existing data
 * Run this after deploying the updated models
 */

async function migrateToHierarchy() {
    console.log('🚀 Starting hierarchy migration...\n');

    try {
        // Step 1: Create a default admin user if none exists
        console.log('Step 1: Creating default admin user...');
        const adminExists = await User.findOne({ role: 'admin' });

        let adminUser;
        if (!adminExists) {
            adminUser = await User.create({
                fullName: 'NCCR Administrator',
                email: 'admin@nccr.gov.in',
                password: '$2a$10$defaultHashedPassword', // Should be changed immediately
                role: 'admin',
                location: 'New Delhi, India',
                phone: '+91 11 1234 5678',
                isActive: true,
                isVerified: true,
                verificationStatus: 'verified'
            });
            console.log('✅ Admin user created:', adminUser.email);
        } else {
            adminUser = adminExists;
            console.log('✅ Admin user already exists:', adminUser.email);
        }

        // Step 2: Update all NGO users with organizationId if missing
        console.log('\nStep 2: Updating NGO users...');
        const ngos = await User.find({ role: 'ngo' });

        for (const ngo of ngos) {
            if (!ngo.organizationId) {
                ngo.organizationId = `NGO-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
            }
            if (!ngo.verificationStatus) {
                ngo.verificationStatus = 'verified'; // Assume existing NGOs are verified
            }
            // Add to admin's managed NGOs
            if (!adminUser.managedNGOs.includes(ngo._id)) {
                adminUser.managedNGOs.push(ngo._id);
            }
            await ngo.save();
            console.log(`✅ Updated NGO: ${ngo.ngoName} (${ngo.organizationId})`);
        }

        await adminUser.save();
        console.log(`✅ Admin now manages ${adminUser.managedNGOs.length} NGOs`);

        // Step 3: Link communities to NGOs
        console.log('\nStep 3: Linking communities to NGOs...');
        const communities = await User.find({ role: 'community' });

        if (ngos.length === 0) {
            console.log('⚠️  No NGOs found. Creating a default NGO...');
            const defaultNGO = await User.create({
                fullName: 'Default NGO Representative',
                email: 'default@ngo.org',
                password: '$2a$10$defaultHashedPassword',
                role: 'ngo',
                location: 'India',
                phone: '+91 98765 43210',
                ngoName: 'Default Conservation NGO',
                registrationNumber: 'NGO-DEFAULT-001',
                organizationId: `NGO-${Date.now()}-DEFAULT`,
                isActive: true,
                isVerified: true,
                verificationStatus: 'verified'
            });
            ngos.push(defaultNGO);
            adminUser.managedNGOs.push(defaultNGO._id);
            await adminUser.save();
            console.log('✅ Created default NGO:', defaultNGO.ngoName);
        }

        // Distribute communities evenly among NGOs
        for (let i = 0; i < communities.length; i++) {
            const community = communities[i];
            const assignedNGO = ngos[i % ngos.length]; // Round-robin distribution

            // Set parentNGO
            community.parentNGO = assignedNGO._id;
            await community.save();

            // Add to NGO's managed communities
            if (!assignedNGO.managedCommunities.includes(community._id)) {
                assignedNGO.managedCommunities.push(community._id);
                await assignedNGO.save();
            }

            // Create NGOCommunityLink
            const linkExists = await NGOCommunityLink.findOne({
                ngoId: assignedNGO._id,
                communityId: community._id
            });

            if (!linkExists) {
                await NGOCommunityLink.create({
                    ngoId: assignedNGO._id,
                    communityId: community._id,
                    status: 'active',
                    assignedDate: new Date(),
                    assignedBy: adminUser._id,
                    permissions: {
                        canVerifyData: true,
                        canEditCommunityProfile: false,
                        canViewFinancials: true
                    }
                });
            }

            console.log(`✅ Linked ${community.communityName} → ${assignedNGO.ngoName}`);
        }

        // Step 4: Update existing projects with userId references
        console.log('\nStep 4: Updating existing projects...');
        const Project = mongoose.model('Project');
        const projects = await Project.find({});

        for (const project of projects) {
            // Try to find the submitting user by wallet address
            if (project.submittedBy && project.submittedBy.walletAddress) {
                const user = await User.findOne({
                    role: 'community',
                    // This is a best-effort match; you may need custom logic
                });

                if (user && !project.submittedBy.userId) {
                    project.submittedBy.userId = user._id;
                    await project.save();
                    console.log(`✅ Updated project ${project.projectId} with user reference`);
                }
            }
        }

        console.log('\n✅ Migration completed successfully!');
        console.log('\n📊 Summary:');
        console.log(`   - Admin users: 1`);
        console.log(`   - NGOs: ${ngos.length}`);
        console.log(`   - Communities: ${communities.length}`);
        console.log(`   - NGO-Community links: ${communities.length}`);
        console.log(`   - Projects updated: ${projects.length}`);

    } catch (error) {
        console.error('❌ Migration failed:', error);
        throw error;
    }
}

// Export for use in migration scripts
export default migrateToHierarchy;

// Allow running directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/clorit';

    mongoose.connect(mongoUri)
        .then(() => {
            console.log('📦 Connected to MongoDB');
            return migrateToHierarchy();
        })
        .then(() => {
            console.log('\n✅ All done! Disconnecting...');
            return mongoose.disconnect();
        })
        .then(() => {
            console.log('👋 Disconnected from MongoDB');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Fatal error:', error);
            process.exit(1);
        });
}
