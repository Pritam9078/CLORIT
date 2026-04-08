import express from 'express';
import Admin from '../models/Admin.js';
import AuditLog from '../models/AuditLog.js';
import {
    verifySignature,
    generateToken,
    authenticateWallet
} from '../middleware/walletAuth.js';

const router = express.Router();

const SUPER_ADMIN_KEY = process.env.SUPER_ADMIN_KEY || 'ADMIN987';

/**
 * POST /api/admin/auth/wallet-challenge
 * Generate nonce for wallet signature
 */
router.post('/wallet-challenge', async (req, res) => {
    try {
        const { walletAddress } = req.body;

        if (!walletAddress) {
            return res.status(400).json({
                success: false,
                message: 'Wallet address is required'
            });
        }

        const normalizedAddress = walletAddress.toLowerCase();

        // Find or create admin
        let admin = await Admin.findOne({ walletAddress: normalizedAddress });

        if (!admin) {
            // Create new admin with default role
            admin = new Admin({
                walletAddress: normalizedAddress,
                name: `Admin ${walletAddress.substring(0, 6)}...`,
                role: 'admin'
            });
            await admin.save();
        } else {
            // Generate new nonce
            await admin.generateNonce();
        }

        const message = `CLORIT Admin Login\nNonce: ${admin.nonce}\nWallet: ${normalizedAddress}`;

        res.json({
            success: true,
            message,
            nonce: admin.nonce,
            walletAddress: normalizedAddress
        });
    } catch (error) {
        console.error('Wallet challenge error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate challenge',
            error: error.message
        });
    }
});

/**
 * POST /api/admin/auth/wallet-verify
 * Verify wallet signature and issue JWT
 */
router.post('/wallet-verify', async (req, res) => {
    try {
        const { walletAddress, signature } = req.body;

        if (!walletAddress || !signature) {
            return res.status(400).json({
                success: false,
                message: 'Wallet address and signature are required'
            });
        }

        const normalizedAddress = walletAddress.toLowerCase();
        const admin = await Admin.findOne({ walletAddress: normalizedAddress });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found. Please request a challenge first.'
            });
        }

        // Verify signature
        const isValid = verifySignature(normalizedAddress, signature, admin.nonce);

        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid signature'
            });
        }

        // Update last login
        admin.lastLogin = new Date();
        await admin.save();

        // Generate new nonce for next login
        await admin.generateNonce();

        // Log admin login
        await AuditLog.create({
            adminWallet: normalizedAddress,
            action: 'admin_login',
            signature,
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        });

        // Generate JWT token
        const token = generateToken(admin);

        res.json({
            success: true,
            token,
            admin: {
                walletAddress: admin.walletAddress,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                region: admin.region,
                lastLogin: admin.lastLogin
            }
        });
    } catch (error) {
        console.error('Wallet verify error:', error);
        res.status(500).json({
            success: false,
            message: 'Verification failed',
            error: error.message
        });
    }
});

/**
 * POST /api/admin/auth/key-login
 * Emergency login with super admin key (ADMIN987)
 */
router.post('/key-login', async (req, res) => {
    try {
        const { adminKey, walletAddress } = req.body;

        if (!adminKey) {
            return res.status(400).json({
                success: false,
                message: 'Admin key is required'
            });
        }

        if (adminKey !== SUPER_ADMIN_KEY) {
            return res.status(401).json({
                success: false,
                message: 'Invalid admin key'
            });
        }

        // If wallet address provided, use it; otherwise create/use default super admin
        let admin;
        if (walletAddress) {
            const normalizedAddress = walletAddress.toLowerCase();
            admin = await Admin.findOne({ walletAddress: normalizedAddress });

            if (!admin) {
                admin = new Admin({
                    walletAddress: normalizedAddress,
                    name: 'Super Admin',
                    role: 'super-admin'
                });
                await admin.save();
            } else {
                // Upgrade to super admin
                admin.role = 'super-admin';
                admin.lastLogin = new Date();
                await admin.save();
            }
        } else {
            // Use default super admin account
            admin = await Admin.findOne({ role: 'super-admin' });

            if (!admin) {
                admin = new Admin({
                    walletAddress: '0x0000000000000000000000000000000000000000',
                    name: 'NCCR Super Admin',
                    role: 'super-admin',
                    email: 'admin@nccr.gov.in'
                });
                await admin.save();
            }

            admin.lastLogin = new Date();
            await admin.save();
        }

        // Log admin login
        await AuditLog.create({
            adminWallet: admin.walletAddress,
            action: 'admin_login',
            details: { loginMethod: 'admin_key' },
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        });

        const token = generateToken(admin);

        res.json({
            success: true,
            token,
            admin: {
                walletAddress: admin.walletAddress,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                region: admin.region,
                lastLogin: admin.lastLogin
            }
        });
    } catch (error) {
        console.error('Key login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
});

/**
 * GET /api/admin/auth/profile
 * Get current admin profile (requires authentication)
 */
router.get('/profile', authenticateWallet, async (req, res) => {
    try {
        res.json({
            success: true,
            admin: {
                walletAddress: req.admin.walletAddress,
                name: req.admin.name,
                email: req.admin.email,
                role: req.admin.role,
                region: req.admin.region,
                lastLogin: req.admin.lastLogin,
                createdAt: req.admin.createdAt
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch profile',
            error: error.message
        });
    }
});

/**
 * PUT /api/admin/auth/profile
 * Update admin profile
 */
router.put('/profile', authenticateWallet, async (req, res) => {
    try {
        const { name, email, region } = req.body;

        if (name) req.admin.name = name;
        if (email) req.admin.email = email;
        if (region) req.admin.region = region;

        await req.admin.save();

        res.json({
            success: true,
            message: 'Profile updated successfully',
            admin: {
                walletAddress: req.admin.walletAddress,
                name: req.admin.name,
                email: req.admin.email,
                role: req.admin.role,
                region: req.admin.region
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update profile',
            error: error.message
        });
    }
});

export default router;
