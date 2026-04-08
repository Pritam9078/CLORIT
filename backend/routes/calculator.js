import express from 'express';
import { calculateCarbonCredits, estimateNDVI, validateAgainstCCN, MANGROVE_DEPTH_PROFILES, SPECIES_CARBON_RATES } from '../services/carbonCalculator.js';
import { authenticateWallet } from '../middleware/walletAuth.js';

const router = express.Router();

/**
 * POST /api/calculator/estimate
 * Calculate carbon credits for a project
 */
router.post('/estimate', async (req, res) => {
    try {
        const {
            area,
            species,
            soilType,
            maxDepth,
            customDepthProfile
        } = req.body;

        // Validate required parameters
        if (!area || area <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Valid area (in hectares) is required'
            });
        }

        // Calculate carbon credits
        const result = calculateCarbonCredits({
            area: parseFloat(area),
            species,
            soilType: soilType || 'medium_carbon',
            maxDepth: maxDepth || 200,
            customDepthProfile
        });

        // Add NDVI estimate
        result.estimatedNDVI = estimateNDVI(result.averageCarbonPercent);

        // Add CCN validation
        result.ccnValidation = validateAgainstCCN(result.averageCarbonPercent, 'mangrove');

        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Carbon calculation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to calculate carbon credits',
            error: error.message
        });
    }
});

/**
 * POST /api/calculator/validate
 * Validate carbon measurements against CCN benchmarks
 */
router.post('/validate', async (req, res) => {
    try {
        const { carbonPercent, habitat } = req.body;

        if (!carbonPercent || carbonPercent < 0) {
            return res.status(400).json({
                success: false,
                message: 'Valid carbon percentage is required'
            });
        }

        const validation = validateAgainstCCN(
            parseFloat(carbonPercent),
            habitat || 'mangrove'
        );

        res.json({
            success: true,
            data: validation
        });
    } catch (error) {
        console.error('Validation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to validate carbon measurement',
            error: error.message
        });
    }
});

/**
 * GET /api/calculator/depth-profiles
 * Get standard depth profiles
 */
router.get('/depth-profiles', (req, res) => {
    res.json({
        success: true,
        data: MANGROVE_DEPTH_PROFILES
    });
});

/**
 * GET /api/calculator/species-rates
 * Get species-specific carbon sequestration rates
 */
router.get('/species-rates', (req, res) => {
    res.json({
        success: true,
        data: SPECIES_CARBON_RATES
    });
});

export default router;
