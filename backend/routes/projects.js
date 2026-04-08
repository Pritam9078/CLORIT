import express from 'express';
import Project from '../models/Project.js';
import { protect, authorize } from '../middleware/auth.js';
import satelliteAnalysisService from '../services/satelliteAnalysisService.js';

const router = express.Router();

/**
 * @route   GET /api/projects
 * @desc    Get all projects (with filtering)
 * @access  Private
 */
router.get('/', protect, async (req, res) => {
    try {
        const { status, region, ngoId } = req.query;
        let query = {};

        if (status) query.status = status;
        if (region) query['location.region'] = region;
        
        // If NGO is requesting, they might want projects from their communities
        if (req.user.role === 'ngo') {
            // This would typically involve finding communities managed by this NGO
            // and filtering projects submitted by them. 
            // For simplicity in this functional build, we'll allow NGO to filter by their ID if provided
            if (ngoId) query['verifications.verifiedBy.userId'] = ngoId;
        }

        const projects = await Project.find(query)
            .populate('submittedBy.userId', 'fullName communityName')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Private (Community users)
 */
router.post('/', protect, authorize('community'), async (req, res) => {
    try {
        const { name, area, location, projectType } = req.body;

        // Auto-generate project ID
        const projectId = 'PRJ-' + Math.random().toString(36).substr(2, 9).toUpperCase();

        // Get NDVI estimation from GEE
        let ndviValue = 0.5; // Default/Mock
        try {
            const analysis = await satelliteAnalysisService.analyzeRegion(
                location.coordinates.latitude,
                location.coordinates.longitude
            );
            ndviValue = analysis.ndvi || 0.5;
        } catch (err) {
            console.error('GEE NDVI analysis failed:', err.message);
        }

        const project = await Project.create({
            projectId,
            name,
            area,
            location,
            projectType,
            ndviValue,
            submittedBy: {
                userId: req.user.id,
                walletAddress: req.user.walletAddress,
                communityName: req.user.communityName || req.user.fullName
            },
            status: 'submitted'
        });

        res.status(201).json({
            success: true,
            data: project
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create project',
            error: error.message
        });
    }
});

/**
 * @route   GET /api/projects/:id
 * @desc    Get single project
 * @access  Private
 */
router.get('/:id', protect, async (req, res) => {
    try {
        const project = await Project.findOne({ projectId: req.params.id })
            .populate('submittedBy.userId', 'fullName communityName email phone');

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
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

export default router;
