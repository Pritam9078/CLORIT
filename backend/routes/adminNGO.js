import express from 'express';
import User from '../models/User.js';
import Project from '../models/Project.js';
import NGOCommunityLink from '../models/NGOCommunityLink.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Apply authentication to all routes
router.use(protect);
router.use(authorize('admin'));

/**
 * @route   GET /api/admin/ngos
 * @desc    Get all NGOs with their community counts
 * @access  Private (Admin only)
 */
router.get('/ngos', async (req, res) => {
    try {
        const { status, search } = req.query;

        // Build query
        const query = { role: 'ngo' };
        if (status) {
            query.verificationStatus = status;
        }
        if (search) {
            query.$or = [
                { ngoName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { organizationId: { $regex: search, $options: 'i' } }
            ];
        }

        const ngos = await User.find(query)
            .select('-password')
            .sort({ createdAt: -1 });

        // Get community counts and stats for each NGO
        const ngosWithStats = await Promise.all(
            ngos.map(async (ngo) => {
                const communityCount = await NGOCommunityLink.countDocuments({
                    ngoId: ngo._id,
                    status: 'active'
                });

                const communities = await NGOCommunityLink.find({ ngoId: ngo._id })
                    .populate('communityId', '_id');
                const communityIds = communities.map(c => c.communityId._id);

                const projectCount = await Project.countDocuments({
                    'submittedBy.userId': { $in: communityIds }
                });

                const verifiedProjects = await Project.countDocuments({
                    'submittedBy.userId': { $in: communityIds },
                    status: { $in: ['ngo-verified', 'panchayat-reviewed', 'nccr-approved'] }
                });

                return {
                    ...ngo.toObject(),
                    stats: {
                        communities: communityCount,
                        totalProjects: projectCount,
                        verifiedProjects
                    }
                };
            })
        );

        res.json({
            success: true,
            count: ngosWithStats.length,
            data: ngosWithStats
        });
    } catch (error) {
        console.error('Error fetching NGOs:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch NGOs',
            error: error.message
        });
    }
});

/**
 * @route   GET /api/admin/ngos/:id
 * @desc    Get NGO details with all linked communities
 * @access  Private (Admin only)
 */
router.get('/ngos/:id', async (req, res) => {
    try {
        const ngo = await User.findById(req.params.id).select('-password');

        if (!ngo || ngo.role !== 'ngo') {
            return res.status(404).json({
                success: false,
                message: 'NGO not found'
            });
        }

        // Get all communities
        const links = await NGOCommunityLink.find({ ngoId: ngo._id })
            .populate('communityId', 'fullName communityName location email phone verificationStatus')
            .sort({ assignedDate: -1 });

        // Get all projects from these communities
        const communityIds = links.map(l => l.communityId._id);
        const projects = await Project.find({
            'submittedBy.userId': { $in: communityIds }
        }).sort({ submissionDate: -1 });

        res.json({
            success: true,
            data: {
                ngo: ngo.toObject(),
                communities: links,
                projects,
                stats: {
                    totalCommunities: links.length,
                    totalProjects: projects.length,
                    pendingVerification: projects.filter(p => p.status === 'submitted').length,
                    verified: projects.filter(p => p.status === 'ngo-verified').length
                }
            }
        });
    } catch (error) {
        console.error('Error fetching NGO details:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch NGO details',
            error: error.message
        });
    }
});

/**
 * @route   POST /api/admin/ngos/:id/verify
 * @desc    Verify/approve an NGO registration
 * @access  Private (Admin only)
 */
router.post('/ngos/:id/verify', async (req, res) => {
    try {
        const { status, notes } = req.body;

        if (!['verified', 'suspended'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Status must be either "verified" or "suspended"'
            });
        }

        const ngo = await User.findById(req.params.id);

        if (!ngo || ngo.role !== 'ngo') {
            return res.status(404).json({
                success: false,
                message: 'NGO not found'
            });
        }

        ngo.verificationStatus = status;
        ngo.isVerified = (status === 'verified');

        // Add to admin's managed NGOs if verified
        if (status === 'verified') {
            const admin = await User.findById(req.user.id);
            if (!admin.managedNGOs.includes(ngo._id)) {
                admin.managedNGOs.push(ngo._id);
                await admin.save();
            }
        }

        await ngo.save();

        res.json({
            success: true,
            message: `NGO ${status} successfully`,
            data: ngo
        });
    } catch (error) {
        console.error('Error verifying NGO:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to verify NGO',
            error: error.message
        });
    }
});

/**
 * @route   POST /api/admin/ngos/:id/suspend
 * @desc    Suspend an NGO's access
 * @access  Private (Admin only)
 */
router.post('/ngos/:id/suspend', async (req, res) => {
    try {
        const { reason } = req.body;

        const ngo = await User.findById(req.params.id);

        if (!ngo || ngo.role !== 'ngo') {
            return res.status(404).json({
                success: false,
                message: 'NGO not found'
            });
        }

        ngo.verificationStatus = 'suspended';
        ngo.isActive = false;
        await ngo.save();

        res.json({
            success: true,
            message: 'NGO suspended successfully',
            data: ngo
        });
    } catch (error) {
        console.error('Error suspending NGO:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to suspend NGO',
            error: error.message
        });
    }
});

/**
 * @route   GET /api/admin/all-communities
 * @desc    Get all communities across all NGOs
 * @access  Private (Admin only)
 */
router.get('/all-communities', async (req, res) => {
    try {
        const communities = await User.find({ role: 'community' })
            .select('-password')
            .populate('parentNGO', 'ngoName organizationId')
            .sort({ createdAt: -1 });

        // Get stats for each community
        const communitiesWithStats = await Promise.all(
            communities.map(async (community) => {
                const projectCount = await Project.countDocuments({
                    'submittedBy.userId': community._id
                });

                const verifiedCount = await Project.countDocuments({
                    'submittedBy.userId': community._id,
                    status: { $in: ['ngo-verified', 'panchayat-reviewed', 'nccr-approved'] }
                });

                return {
                    ...community.toObject(),
                    stats: {
                        totalProjects: projectCount,
                        verifiedProjects: verifiedCount
                    }
                };
            })
        );

        res.json({
            success: true,
            count: communitiesWithStats.length,
            data: communitiesWithStats
        });
    } catch (error) {
        console.error('Error fetching communities:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch communities',
            error: error.message
        });
    }
});

/**
 * @route   GET /api/admin/verification-chain/:projectId
 * @desc    Get full verification audit trail for a project
 * @access  Private (Admin only)
 */
router.get('/verification-chain/:projectId', async (req, res) => {
    try {
        const project = await Project.findOne({ projectId: req.params.projectId })
            .populate('submittedBy.userId', 'fullName communityName parentNGO')
            .populate({
                path: 'submittedBy.userId',
                populate: {
                    path: 'parentNGO',
                    select: 'ngoName organizationId'
                }
            });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        // Populate verification users
        const populatedVerifications = await Promise.all(
            project.verifications.map(async (verification) => {
                if (verification.verifiedBy.userId) {
                    const user = await User.findById(verification.verifiedBy.userId)
                        .select('fullName ngoName role');
                    return {
                        ...verification.toObject(),
                        verifiedBy: {
                            ...verification.verifiedBy.toObject(),
                            userDetails: user
                        }
                    };
                }
                return verification.toObject();
            })
        );

        res.json({
            success: true,
            data: {
                project: {
                    projectId: project.projectId,
                    name: project.name,
                    status: project.status,
                    submissionDate: project.submissionDate
                },
                submitter: project.submittedBy,
                verificationChain: populatedVerifications,
                nccrApproval: project.nccrApproval,
                rejection: project.rejection
            }
        });
    } catch (error) {
        console.error('Error fetching verification chain:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch verification chain',
            error: error.message
        });
    }
});

/**
 * @route   GET /api/admin/hierarchy-stats
 * @desc    Get platform-wide hierarchy statistics
 * @access  Private (Admin only)
 */
router.get('/hierarchy-stats', async (req, res) => {
    try {
        const totalNGOs = await User.countDocuments({ role: 'ngo' });
        const verifiedNGOs = await User.countDocuments({ role: 'ngo', verificationStatus: 'verified' });
        const totalCommunities = await User.countDocuments({ role: 'community' });
        const activeCommunities = await User.countDocuments({ role: 'community', isActive: true });

        const totalProjects = await Project.countDocuments({});
        const approvedProjects = await Project.countDocuments({ status: 'nccr-approved' });

        // Calculate total carbon credits
        const projects = await Project.find({ status: 'nccr-approved' });
        const totalCarbonCredits = projects.reduce((sum, p) => sum + (p.carbonCredits || 0), 0);

        res.json({
            success: true,
            data: {
                ngos: {
                    total: totalNGOs,
                    verified: verifiedNGOs,
                    pending: totalNGOs - verifiedNGOs
                },
                communities: {
                    total: totalCommunities,
                    active: activeCommunities
                },
                projects: {
                    total: totalProjects,
                    approved: approvedProjects,
                    pendingVerification: await Project.countDocuments({ status: 'submitted' }),
                    ngoVerified: await Project.countDocuments({ status: 'ngo-verified' })
                },
                impact: {
                    totalCarbonCredits,
                    averagePerProject: approvedProjects > 0 ? (totalCarbonCredits / approvedProjects).toFixed(2) : 0
                }
            }
        });
    } catch (error) {
        console.error('Error fetching hierarchy stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch hierarchy stats',
            error: error.message
        });
    }
});

export default router;
