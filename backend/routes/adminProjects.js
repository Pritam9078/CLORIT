import express from 'express';
import Project from '../models/Project.js';
import AuditLog from '../models/AuditLog.js';
import {
    authenticateWallet,
    verifyOperationSignature
} from '../middleware/walletAuth.js';

const router = express.Router();

// All routes require wallet authentication
router.use(authenticateWallet);

/**
 * GET /api/admin/projects
 * Get all projects with filters
 */
router.get('/', async (req, res) => {
    try {
        const {
            status,
            region,
            minNDVI,
            maxNDVI,
            page = 1,
            limit = 20,
            sortBy = 'submissionDate',
            sortOrder = 'desc'
        } = req.query;

        // Build filter query
        const filter = {};
        if (status) filter.status = status;
        if (region) filter['location.region'] = region;
        if (minNDVI || maxNDVI) {
            filter.ndviValue = {};
            if (minNDVI) filter.ndviValue.$gte = parseFloat(minNDVI);
            if (maxNDVI) filter.ndviValue.$lte = parseFloat(maxNDVI);
        }

        // Execute query with pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const sortOptions = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

        const [projects, total] = await Promise.all([
            Project.find(filter)
                .sort(sortOptions)
                .skip(skip)
                .limit(parseInt(limit))
                .lean(),
            Project.countDocuments(filter)
        ]);

        res.json({
            success: true,
            data: projects,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('Get projects error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch projects',
            error: error.message
        });
    }
});

/**
 * GET /api/admin/projects/pending
 * Get projects pending NCCR approval
 */
router.get('/pending', async (req, res) => {
    try {
        const projects = await Project.find({
            status: 'panchayat-reviewed'
        })
            .sort({ submissionDate: -1 })
            .lean();

        res.json({
            success: true,
            data: projects,
            count: projects.length
        });
    } catch (error) {
        console.error('Get pending projects error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch pending projects',
            error: error.message
        });
    }
});

/**
 * GET /api/admin/projects/:id
 * Get detailed project information
 */
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findOne({ projectId: req.params.id }).lean();

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.json({
            success: true,
            data: project
        });
    } catch (error) {
        console.error('Get project error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch project',
            error: error.message
        });
    }
});

/**
 * POST /api/admin/projects/:id/approve
 * Approve a project (requires wallet signature)
 */
router.post('/:id/approve', verifyOperationSignature, async (req, res) => {
    try {
        const { notes, finalCarbonCredits, txHash } = req.body;

        const project = await Project.findOne({ projectId: req.params.id });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        if (project.status !== 'panchayat-reviewed') {
            return res.status(400).json({
                success: false,
                message: 'Project must be panchayat-reviewed before NCCR approval'
            });
        }

        // Update project with approval
        project.status = 'nccr-approved';
        project.nccrApproval = {
            approvedBy: req.walletAddress,
            approvalDate: new Date(),
            txHash: txHash || '',
            notes: notes || '',
            finalCarbonCredits: finalCarbonCredits || project.carbonCredits
        };

        // Add verification entry
        project.verifications.push({
            stage: 'nccr',
            verifiedBy: {
                walletAddress: req.walletAddress,
                name: req.admin.name
            },
            timestamp: new Date(),
            signature: req.verifiedSignature,
            notes: notes || ''
        });

        await project.save();

        // Log action
        await AuditLog.create({
            adminWallet: req.walletAddress,
            action: 'project_approved',
            projectId: project.projectId,
            signature: req.verifiedSignature,
            txHash: txHash || '',
            details: {
                projectName: project.name,
                carbonCredits: finalCarbonCredits || project.carbonCredits,
                notes
            },
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        });

        res.json({
            success: true,
            message: 'Project approved successfully',
            data: project
        });
    } catch (error) {
        console.error('Approve project error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to approve project',
            error: error.message
        });
    }
});

/**
 * POST /api/admin/projects/:id/reject
 * Reject a project (requires wallet signature)
 */
router.post('/:id/reject', verifyOperationSignature, async (req, res) => {
    try {
        const { reason } = req.body;

        if (!reason) {
            return res.status(400).json({
                success: false,
                message: 'Rejection reason is required'
            });
        }

        const project = await Project.findOne({ projectId: req.params.id });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        // Update project with rejection
        project.status = 'rejected';
        project.rejection = {
            rejectedBy: req.walletAddress,
            rejectionDate: new Date(),
            reason,
            signature: req.verifiedSignature
        };

        await project.save();

        // Log action
        await AuditLog.create({
            adminWallet: req.walletAddress,
            action: 'project_rejected',
            projectId: project.projectId,
            signature: req.verifiedSignature,
            details: {
                projectName: project.name,
                reason
            },
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        });

        res.json({
            success: true,
            message: 'Project rejected',
            data: project
        });
    } catch (error) {
        console.error('Reject project error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to reject project',
            error: error.message
        });
    }
});

/**
 * GET /api/admin/projects/:id/history
 * Get project verification history
 */
router.get('/:id/history', async (req, res) => {
    try {
        const project = await Project.findOne({ projectId: req.params.id })
            .select('verifications nccrApproval rejection')
            .lean();

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        // Get audit logs for this project
        const auditLogs = await AuditLog.find({ projectId: req.params.id })
            .sort({ timestamp: -1 })
            .lean();

        res.json({
            success: true,
            data: {
                verifications: project.verifications,
                nccrApproval: project.nccrApproval,
                rejection: project.rejection,
                auditLogs
            }
        });
    } catch (error) {
        console.error('Get project history error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch project history',
            error: error.message
        });
    }
});

export default router;
