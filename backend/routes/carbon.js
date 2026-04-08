import express from 'express';
import Project from '../models/Project.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/carbon/marketplace
 * @desc    Get all active carbon credit listings
 * @access  Private
 */
router.get('/marketplace', protect, async (req, res) => {
    try {
        // In a real system, we'd have a MarketplaceListing model.
        // For this build, we'll return projects that are nccr-approved and have credits.
        const listings = await Project.find({
            status: 'nccr-approved',
            carbonCredits: { $gt: 0 }
        }).populate('submittedBy.userId', 'fullName communityName');

        res.json({
            success: true,
            count: listings.length,
            data: listings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch marketplace',
            error: error.message
        });
    }
});

/**
 * @route   POST /api/carbon/mint
 * @desc    Request/Confirm CCT minting (Admin/NCCR only)
 * @access  Private (Admin role)
 */
router.post('/mint', protect, authorize('admin'), async (req, res) => {
    try {
        const { projectId, amount, txHash } = req.body;

        const project = await Project.findOne({ projectId });
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        project.carbonCredits = amount;
        project.status = 'nccr-approved';
        project.nccrApproval = {
            approvedBy: req.user.walletAddress,
            approvalDate: new Date(),
            txHash,
            finalCarbonCredits: amount
        };

        await project.save();

        res.json({
            success: true,
            message: 'CCT Minted successfully and project status updated',
            data: project
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Minting update failed',
            error: error.message
        });
    }
});

/**
 * @route   GET /api/carbon/stats
 * @desc    Get global carbon statistics
 * @access  Public
 */
router.get('/stats', async (req, res) => {
    try {
        const stats = await Project.aggregate([
            { $match: { status: 'nccr-approved' } },
            { $group: {
                _id: null,
                totalCredits: { $sum: '$carbonCredits' },
                totalArea: { $sum: '$area' },
                projectCount: { $sum: 1 }
            }}
        ]);

        res.json({
            success: true,
            data: stats[0] || { totalCredits: 0, totalArea: 0, projectCount: 0 }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch stats'
        });
    }
});

export default router;
