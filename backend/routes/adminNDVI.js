import express from 'express';
import NDVIScan from '../models/NDVIScan.js';
import Project from '../models/Project.js';
import Alert from '../models/Alert.js';
import AuditLog from '../models/AuditLog.js';
import { authenticateWallet } from '../middleware/walletAuth.js';
import satelliteAnalysisService from '../services/satelliteAnalysisService.js';

const router = express.Router();

// All routes require wallet authentication
router.use(authenticateWallet);

/**
 * GET /api/admin/ndvi/national-stats
 * Get national NDVI statistics
 */
router.get('/national-stats', async (req, res) => {
    try {
        // Get all recent scans
        const recentScans = await NDVIScan.find({
            scanDate: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
        }).lean();

        if (recentScans.length === 0) {
            return res.json({
                success: true,
                data: {
                    avgNDVI: 0,
                    healthyAreas: { count: 0, percentage: 0, hectares: 0 },
                    atRiskAreas: { count: 0, percentage: 0, hectares: 0 },
                    criticalAreas: { count: 0, percentage: 0, hectares: 0 },
                    totalProjects: 0
                }
            });
        }

        // Calculate statistics
        const avgNDVI = recentScans.reduce((sum, scan) => sum + scan.ndviValue, 0) / recentScans.length;

        const healthyCount = recentScans.filter(s => s.healthStatus === 'healthy').length;
        const moderateCount = recentScans.filter(s => s.healthStatus === 'moderate').length;
        const poorCount = recentScans.filter(s => s.healthStatus === 'poor').length;
        const criticalCount = recentScans.filter(s => s.healthStatus === 'critical').length;

        // Get project areas
        const projects = await Project.find({}).select('projectId area').lean();
        const projectMap = Object.fromEntries(projects.map(p => [p.projectId, p.area]));

        const healthyHectares = recentScans
            .filter(s => s.healthStatus === 'healthy')
            .reduce((sum, s) => sum + (projectMap[s.projectId] || 0), 0);

        const atRiskHectares = recentScans
            .filter(s => s.healthStatus === 'moderate' || s.healthStatus === 'poor')
            .reduce((sum, s) => sum + (projectMap[s.projectId] || 0), 0);

        const criticalHectares = recentScans
            .filter(s => s.healthStatus === 'critical')
            .reduce((sum, s) => sum + (projectMap[s.projectId] || 0), 0);

        res.json({
            success: true,
            data: {
                avgNDVI: parseFloat(avgNDVI.toFixed(3)),
                totalArea: parseFloat((healthyHectares + atRiskHectares + criticalHectares).toFixed(1)),
                totalProjects: new Set(recentScans.map(s => s.projectId)).size,
                healthyAreas: {
                    count: healthyCount,
                    percentage: parseFloat(((healthyCount / recentScans.length) * 100).toFixed(1)),
                    hectares: parseFloat(healthyHectares.toFixed(1))
                },
                atRiskAreas: {
                    count: moderateCount + poorCount,
                    percentage: parseFloat((((moderateCount + poorCount) / recentScans.length) * 100).toFixed(1)),
                    hectares: parseFloat(atRiskHectares.toFixed(1))
                },
                criticalAreas: {
                    count: criticalCount,
                    percentage: parseFloat(((criticalCount / recentScans.length) * 100).toFixed(1)),
                    hectares: parseFloat(criticalHectares.toFixed(1))
                }
            }
        });
    } catch (error) {
        console.error('National stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch national statistics',
            error: error.message
        });
    }
});

/**
 * GET /api/admin/ndvi/regional
 * Get regional NDVI breakdown
 */
router.get('/regional', async (req, res) => {
    try {
        const projects = await Project.find({}).select('projectId location.region area').lean();
        
        // Group by region
        const regionalStats = {};
        projects.forEach(p => {
            const region = p.location?.region || 'Other';
            if (!regionalStats[region]) {
                regionalStats[region] = { name: region, credits: 0, area: 0, count: 0 };
            }
            regionalStats[region].area += p.area || 0;
            regionalStats[region].count += 1;
            // Generate some logical credit estimate if not present
            regionalStats[region].credits += Math.round((p.area || 0) * 25);
        });

        res.json({
            success: true,
            data: Object.values(regionalStats)
        });
    } catch (error) {
        console.error('Regional stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch regional breakdown',
            error: error.message
        });
    }
});

/**
 * GET /api/admin/ndvi/alerts
 * Get critical NDVI alerts
 */
router.get('/alerts', async (req, res) => {
    try {
        const alerts = await Alert.find({
            isResolved: false,
            type: { $in: ['ndvi_degradation', 'ndvi_improvement'] }
        })
            .sort({ severity: -1, createdAt: -1 })
            .limit(20)
            .lean();

        res.json({
            success: true,
            data: alerts,
            count: alerts.length
        });
    } catch (error) {
        console.error('Get alerts error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch alerts',
            error: error.message
        });
    }
});

/**
 * POST /api/admin/ndvi/scan
 * Trigger satellite scan for a project
 */
router.post('/scan', async (req, res) => {
    try {
        const { projectId } = req.body;

        if (!projectId) {
            return res.status(400).json({
                success: false,
                message: 'Project ID is required'
            });
        }

        const project = await Project.findOne({ projectId });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        // Perform real satellite scan using GEE service
        const scanData = await satelliteAnalysisService.getNDVIForPoint(
            project.location.coordinates[1], // Latitude
            project.location.coordinates[0], // Longitude
        );

        // Create NDVI scan record
        const scan = await NDVIScan.create({
            projectId,
            scanDate: new Date(),
            ndviValue: scanData.ndviValue,
            satelliteSource: scanData.source,
            imageUrl: scanData.imageUrl || `https://ipfs.io/ipfs/mock-${projectId}-${Date.now()}`,
            metadata: scanData.metadata,
            verifiedBy: req.walletAddress
        });

        // Update project NDVI value
        project.ndviValue = scanData.ndviValue;
        await project.save();

        // Check for degradation and create alert if needed
        const previousScans = await NDVIScan.find({ projectId })
            .sort({ scanDate: -1 })
            .limit(2)
            .lean();

        if (previousScans.length === 2) {
            const ndviChange = scanData.ndviValue - previousScans[1].ndviValue;

            if (ndviChange < -0.1) {
                // Significant degradation
                await Alert.create({
                    projectId,
                    type: 'ndvi_degradation',
                    severity: 'high',
                    title: 'NDVI Degradation Detected',
                    message: `Project ${project.name} shows NDVI decrease of ${Math.abs(ndviChange).toFixed(3)}`,
                    metadata: {
                        previousNDVI: previousScans[1].ndviValue,
                        currentNDVI: scanData.ndviValue,
                        change: ndviChange
                    }
                });
            } else if (ndviChange > 0.15) {
                // Significant improvement
                await Alert.create({
                    projectId,
                    type: 'ndvi_improvement',
                    severity: 'low',
                    title: 'NDVI Improvement Detected',
                    message: `Project ${project.name} shows NDVI increase of ${ndviChange.toFixed(3)}`,
                    metadata: {
                        previousNDVI: previousScans[1].ndviValue,
                        currentNDVI: scanData.ndviValue,
                        change: ndviChange
                    }
                });
            }
        }

        // Log action
        await AuditLog.create({
            adminWallet: req.walletAddress,
            action: 'ndvi_scan_triggered',
            projectId,
            details: {
                projectName: project.name,
                ndviValue: scanData.ndviValue,
                healthStatus: scan.healthStatus
            },
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        });

        res.json({
            success: true,
            message: 'Satellite scan completed',
            data: scan
        });
    } catch (error) {
        console.error('NDVI scan error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to perform satellite scan',
            error: error.message
        });
    }
});

/**
 * GET /api/admin/ndvi/project/:projectId/history
 * Get NDVI history for a specific project
 */
router.get('/project/:projectId/history', async (req, res) => {
    try {
        const scans = await NDVIScan.find({ projectId: req.params.projectId })
            .sort({ scanDate: -1 })
            .limit(50)
            .lean();

        res.json({
            success: true,
            data: scans,
            count: scans.length
        });
    } catch (error) {
        console.error('NDVI history error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch NDVI history',
            error: error.message
        });
    }
});

export default router;
