import express from 'express';
import Project from '../models/Project.js';
import NDVIScan from '../models/NDVIScan.js';
import Admin from '../models/Admin.js';
import { authenticateWallet } from '../middleware/walletAuth.js';

const router = express.Router();

// All routes require wallet authentication
router.use(authenticateWallet);

/**
 * GET /api/admin/analytics/overview
 * Dashboard overview statistics
 */
router.get('/overview', async (req, res) => {
    try {
        const [
            totalProjects,
            approvedProjects,
            pendingProjects,
            rejectedProjects,
            totalAdmins
        ] = await Promise.all([
            Project.countDocuments(),
            Project.countDocuments({ status: 'nccr-approved' }),
            Project.countDocuments({ status: 'panchayat-reviewed' }),
            Project.countDocuments({ status: 'rejected' }),
            Admin.countDocuments({ isActive: true })
        ]);

        // Calculate total hectares and carbon credits
        const projects = await Project.find({}).select('area carbonCredits').lean();
        const totalHectares = projects.reduce((sum, p) => sum + p.area, 0);
        const totalCarbonCredits = projects.reduce((sum, p) => sum + p.carbonCredits, 0);

        // Get recent activity (last 7 days)
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const recentApprovals = await Project.countDocuments({
            'nccrApproval.approvalDate': { $gte: sevenDaysAgo }
        });

        res.json({
            success: true,
            data: {
                totalProjects,
                approvedProjects,
                pendingProjects,
                rejectedProjects,
                totalHectares: parseFloat(totalHectares.toFixed(1)),
                totalCarbonCredits,
                totalAdmins,
                recentApprovals
            }
        });
    } catch (error) {
        console.error('Overview analytics error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch overview analytics',
            error: error.message
        });
    }
});

/**
 * GET /api/admin/analytics/status-distribution
 * Project status breakdown
 */
router.get('/status-distribution', async (req, res) => {
    try {
        const distribution = await Project.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    totalArea: { $sum: '$area' },
                    totalCredits: { $sum: '$carbonCredits' }
                }
            }
        ]);

        const result = {
            submitted: { count: 0, area: 0, credits: 0 },
            'ngo-verified': { count: 0, area: 0, credits: 0 },
            'panchayat-reviewed': { count: 0, area: 0, credits: 0 },
            'nccr-approved': { count: 0, area: 0, credits: 0 },
            rejected: { count: 0, area: 0, credits: 0 }
        };

        distribution.forEach(item => {
            if (result[item._id]) {
                result[item._id] = {
                    count: item.count,
                    area: parseFloat(item.totalArea.toFixed(1)),
                    credits: item.totalCredits
                };
            }
        });

        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Status distribution error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch status distribution',
            error: error.message
        });
    }
});

/**
 * GET /api/admin/analytics/regional-coverage
 * Projects per region
 */
router.get('/regional-coverage', async (req, res) => {
    try {
        const coverage = await Project.aggregate([
            {
                $group: {
                    _id: '$location.region',
                    projectCount: { $sum: 1 },
                    totalArea: { $sum: '$area' },
                    approvedCount: {
                        $sum: { $cond: [{ $eq: ['$status', 'nccr-approved'] }, 1, 0] }
                    }
                }
            },
            {
                $sort: { projectCount: -1 }
            }
        ]);

        const result = coverage.map(item => ({
            region: item._id || 'Unknown',
            projectCount: item.projectCount,
            totalArea: parseFloat(item.totalArea.toFixed(1)),
            approvedCount: item.approvedCount,
            approvalRate: parseFloat(((item.approvedCount / item.projectCount) * 100).toFixed(1))
        }));

        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Regional coverage error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch regional coverage',
            error: error.message
        });
    }
});

/**
 * GET /api/admin/analytics/ndvi-distribution
 * NDVI health distribution
 */
router.get('/ndvi-distribution', async (req, res) => {
    try {
        // Get latest scan for each project
        const latestScans = await NDVIScan.aggregate([
            {
                $sort: { scanDate: -1 }
            },
            {
                $group: {
                    _id: '$projectId',
                    latestScan: { $first: '$$ROOT' }
                }
            }
        ]);

        const distribution = {
            healthy: { count: 0, percentage: 0 },
            moderate: { count: 0, percentage: 0 },
            poor: { count: 0, percentage: 0 },
            critical: { count: 0, percentage: 0 }
        };

        latestScans.forEach(item => {
            const status = item.latestScan.healthStatus;
            if (distribution[status]) {
                distribution[status].count++;
            }
        });

        const total = latestScans.length;
        if (total > 0) {
            Object.keys(distribution).forEach(key => {
                distribution[key].percentage = parseFloat(
                    ((distribution[key].count / total) * 100).toFixed(1)
                );
            });
        }

        res.json({
            success: true,
            data: distribution,
            totalScanned: total
        });
    } catch (error) {
        console.error('NDVI distribution error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch NDVI distribution',
            error: error.message
        });
    }
});

/**
 * GET /api/admin/analytics/timeline
 * Project submissions over time
 */
router.get('/timeline', async (req, res) => {
    try {
        const { period = '30d' } = req.query;

        let startDate;
        switch (period) {
            case '7d':
                startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                break;
            case '30d':
                startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                break;
            case '90d':
                startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
                break;
            default:
                startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        }

        const timeline = await Project.aggregate([
            {
                $match: {
                    submissionDate: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$submissionDate' }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        res.json({
            success: true,
            data: timeline.map(item => ({
                date: item._id,
                count: item.count
            }))
        });
    } catch (error) {
        console.error('Timeline error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch timeline data',
            error: error.message
        });
    }
});

export default router;
