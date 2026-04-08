import express from 'express';
import User from '../models/User.js';
import Project from '../models/Project.js';
import NGOCommunityLink from '../models/NGOCommunityLink.js';
import SupportTicket from '../models/SupportTicket.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Apply authentication to all routes
router.use(protect);
router.use(authorize('ngo'));

/**
 * @route   GET /api/ngo/communities
 * @desc    Get all communities managed by this NGO
 * @access  Private (NGO only)
 */
router.get('/communities', async (req, res) => {
    try {
        const ngoId = req.user.id;

        // Get all community links for this NGO
        const links = await NGOCommunityLink.find({ ngoId, status: 'active' })
            .populate('communityId', 'fullName communityName location phone email isActive verificationStatus')
            .sort({ assignedDate: -1 });

        // Get impact stats for each community
        const communitiesWithStats = await Promise.all(
            links.map(async (link) => {
                const communityId = link.communityId._id;

                // Count projects submitted by this community
                const projectCount = await Project.countDocuments({
                    'submittedBy.userId': communityId
                });

                // Calculate total carbon credits
                const projects = await Project.find({
                    'submittedBy.userId': communityId,
                    status: { $in: ['ngo-verified', 'nccr-approved'] }
                });

                const totalCarbonCredits = projects.reduce((sum, p) => sum + (p.carbonCredits || 0), 0);

                return {
                    ...link.toObject(),
                    community: link.communityId,
                    stats: {
                        totalProjects: projectCount,
                        carbonCredits: totalCarbonCredits,
                        activeProjects: projects.filter(p => p.status !== 'nccr-approved').length
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
 * @route   GET /api/ngo/communities/:id
 * @desc    Get specific community details
 * @access  Private (NGO only)
 */
router.get('/communities/:id', async (req, res) => {
    try {
        const ngoId = req.user.id;
        const communityId = req.params.id;

        // Verify this community belongs to this NGO
        const link = await NGOCommunityLink.findOne({ ngoId, communityId })
            .populate('communityId');

        if (!link) {
            return res.status(404).json({
                success: false,
                message: 'Community not found or not managed by this NGO'
            });
        }

        // Get all projects from this community
        const projects = await Project.find({ 'submittedBy.userId': communityId })
            .sort({ submissionDate: -1 });

        res.json({
            success: true,
            data: {
                link: link.toObject(),
                community: link.communityId,
                projects
            }
        });
    } catch (error) {
        console.error('Error fetching community details:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch community details',
            error: error.message
        });
    }
});

/**
 * @route   GET /api/ngo/pending-verifications
 * @desc    Get all projects awaiting NGO verification
 * @access  Private (NGO only)
 */
router.get('/pending-verifications', async (req, res) => {
    try {
        const ngoId = req.user.id;

        // Get all communities managed by this NGO
        const links = await NGOCommunityLink.find({ ngoId, status: 'active' });
        const communityIds = links.map(link => link.communityId);

        // Find projects submitted by these communities that need NGO verification
        const pendingProjects = await Project.find({
            'submittedBy.userId': { $in: communityIds },
            status: 'submitted'
        })
            .populate('submittedBy.userId', 'fullName communityName location')
            .sort({ submissionDate: 1 }); // Oldest first

        res.json({
            success: true,
            count: pendingProjects.length,
            data: pendingProjects
        });
    } catch (error) {
        console.error('Error fetching pending verifications:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch pending verifications',
            error: error.message
        });
    }
});

/**
 * @route   POST /api/ngo/verify/:projectId
 * @desc    Verify or reject a community submission
 * @access  Private (NGO only)
 */
router.post('/verify/:projectId', async (req, res) => {
    try {
        const ngoId = req.user.id;
        const { projectId } = req.params;
        const { status, notes, signature } = req.body;

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Status must be either "approved" or "rejected"'
            });
        }

        // Find the project
        const project = await Project.findOne({ projectId });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        // Verify this community belongs to this NGO
        const link = await NGOCommunityLink.findOne({
            ngoId,
            communityId: project.submittedBy.userId
        });

        if (!link) {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to verify this project'
            });
        }

        // Get NGO user details
        const ngo = await User.findById(ngoId);

        // Add verification record
        project.verifications.push({
            stage: 'ngo',
            verifiedBy: {
                userId: ngoId,
                walletAddress: req.user.walletAddress || '',
                name: ngo.ngoName,
                role: 'ngo'
            },
            timestamp: new Date(),
            signature: signature || '',
            notes: notes || '',
            status
        });

        // Update project status
        if (status === 'approved') {
            project.status = 'ngo-verified';
        } else {
            project.status = 'rejected';
            project.rejection = {
                rejectedBy: ngo.ngoName,
                rejectionDate: new Date(),
                reason: notes || 'Rejected by NGO',
                signature: signature || ''
            };
        }

        await project.save();

        res.json({
            success: true,
            message: `Project ${status === 'approved' ? 'verified' : 'rejected'} successfully`,
            data: project
        });
    } catch (error) {
        console.error('Error verifying project:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to verify project',
            error: error.message
        });
    }
});

/**
 * @route   GET /api/ngo/impact-summary
 * @desc    Get aggregated impact stats from all managed communities
 * @access  Private (NGO only)
 */
router.get('/impact-summary', async (req, res) => {
    try {
        const ngoId = req.user.id;

        // Get all communities managed by this NGO
        const links = await NGOCommunityLink.find({ ngoId, status: 'active' });
        const communityIds = links.map(link => link.communityId);

        // Aggregate stats
        const totalCommunities = communityIds.length;

        const allProjects = await Project.find({
            'submittedBy.userId': { $in: communityIds }
        });

        const approvedProjects = allProjects.filter(p =>
            ['ngo-verified', 'panchayat-reviewed', 'nccr-approved'].includes(p.status)
        );

        const totalCarbonCredits = approvedProjects.reduce((sum, p) => sum + (p.carbonCredits || 0), 0);
        const totalArea = approvedProjects.reduce((sum, p) => sum + (p.area || 0), 0);

        const pendingVerification = allProjects.filter(p => p.status === 'submitted').length;

        res.json({
            success: true,
            data: {
                totalCommunities,
                totalProjects: allProjects.length,
                approvedProjects: approvedProjects.length,
                pendingVerification,
                totalCarbonCredits,
                totalArea,
                averageCreditsPerProject: approvedProjects.length > 0
                    ? (totalCarbonCredits / approvedProjects.length).toFixed(2)
                    : 0
            }
        });
    } catch (error) {
        console.error('Error fetching impact summary:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch impact summary',
            error: error.message
        });
    }
});

/**
 * @route   POST /api/ngo/communities/invite
 * @desc    Invite/link a community to this NGO
 * @access  Private (NGO only)
 */
router.post('/communities/invite', async (req, res) => {
    try {
        const ngoId = req.user.id;
        const { communityId, permissions } = req.body;

        // Verify community exists and is a community user
        const community = await User.findById(communityId);

        if (!community || community.role !== 'community') {
            return res.status(404).json({
                success: false,
                message: 'Community user not found'
            });
        }

        // Check if link already exists
        const existingLink = await NGOCommunityLink.findOne({ ngoId, communityId });

        if (existingLink) {
            return res.status(400).json({
                success: false,
                message: 'Community is already linked to this NGO'
            });
        }

        // Create link
        const link = await NGOCommunityLink.create({
            ngoId,
            communityId,
            status: 'active',
            permissions: permissions || {
                canVerifyData: true,
                canEditCommunityProfile: false,
                canViewFinancials: true
            },
            assignedBy: ngoId
        });

        // Update user records
        community.parentNGO = ngoId;
        await community.save();

        const ngo = await User.findById(ngoId);
        if (!ngo.managedCommunities.includes(communityId)) {
            ngo.managedCommunities.push(communityId);
            await ngo.save();
        }

        res.status(201).json({
            success: true,
            message: 'Community linked successfully',
            data: link
        });
    } catch (error) {
        console.error('Error linking community:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to link community',
            error: error.message
        });
    }
});

/**
 * @route   GET /api/ngo/tickets
 * @desc    Get all support tickets for communities managed by this NGO
 * @access  Private (NGO only)
 */
router.get('/tickets', async (req, res) => {
    try {
        const ngoId = req.user.id;
        
        // Find tickets that belong to the NGO or are from communities managed by this NGO
        const tickets = await SupportTicket.find({
            $or: [
                { ngoId: ngoId },
                { userId: { $in: req.user.managedCommunities } }
            ]
        })
        .populate('userId', 'fullName communityName role')
        .sort({ lastUpdate: -1 });

        res.json({
            success: true,
            count: tickets.length,
            data: tickets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tickets'
        });
    }
});

/**
 * @route   POST /api/ngo/tickets/:id/respond
 * @desc    NGO responds to a community support ticket
 * @access  Private (NGO only)
 */
router.post('/tickets/:id/respond', async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;

        const ticket = await SupportTicket.findById(id);
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' });
        }

        ticket.responses.push({
            userId: req.user.id,
            message,
            timestamp: new Date()
        });
        ticket.status = 'in_progress';
        ticket.lastUpdate = new Date();

        await ticket.save();

        res.json({
            success: true,
            message: 'Response recorded',
            data: ticket
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to respond to ticket' });
    }
});

export default router;
