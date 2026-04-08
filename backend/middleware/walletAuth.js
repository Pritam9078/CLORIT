import { ethers } from 'ethers';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const JWT_SECRET = process.env.JWT_SECRET || 'clorit-admin-secret-key-change-in-production';
const JWT_EXPIRY = '24h';

/**
 * Wallet Authentication Middleware
 * Verifies JWT token and ensures admin has valid wallet address
 */
export const authenticateWallet = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No authentication token provided'
            });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Find admin by wallet address
        const admin = await Admin.findOne({
            walletAddress: decoded.walletAddress.toLowerCase(),
            isActive: true
        });

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Admin not found or inactive'
            });
        }

        // Attach admin to request
        req.admin = admin;
        req.walletAddress = admin.walletAddress;

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid authentication token'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Authentication token expired'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Authentication error',
            error: error.message
        });
    }
};

/**
 * Verify wallet signature
 * @param {string} walletAddress - Ethereum wallet address
 * @param {string} signature - Signed message
 * @param {string} nonce - Nonce used in message
 * @returns {boolean} - True if signature is valid
 */
export const verifySignature = (walletAddress, signature, nonce) => {
    try {
        const message = `CLORIT Admin Login\nNonce: ${nonce}\nWallet: ${walletAddress}`;
        const recoveredAddress = ethers.verifyMessage(message, signature);

        return recoveredAddress.toLowerCase() === walletAddress.toLowerCase();
    } catch (error) {
        console.error('Signature verification error:', error);
        return false;
    }
};

/**
 * Generate JWT token for admin
 * @param {Object} admin - Admin document
 * @returns {string} - JWT token
 */
export const generateToken = (admin) => {
    return jwt.sign(
        {
            walletAddress: admin.walletAddress,
            role: admin.role,
            name: admin.name
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRY }
    );
};

/**
 * Require super-admin role
 */
export const requireSuperAdmin = (req, res, next) => {
    if (req.admin.role !== 'super-admin') {
        return res.status(403).json({
            success: false,
            message: 'Super admin access required'
        });
    }
    next();
};

/**
 * Verify signature for critical operations
 * Expects signature in request body
 */
export const verifyOperationSignature = async (req, res, next) => {
    try {
        const { signature, message } = req.body;

        if (!signature || !message) {
            return res.status(400).json({
                success: false,
                message: 'Signature and message required for this operation'
            });
        }

        const recoveredAddress = ethers.verifyMessage(message, signature);

        if (recoveredAddress.toLowerCase() !== req.walletAddress.toLowerCase()) {
            return res.status(403).json({
                success: false,
                message: 'Invalid signature for operation'
            });
        }

        req.verifiedSignature = signature;
        req.signedMessage = message;
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Signature verification failed',
            error: error.message
        });
    }
};

export default {
    authenticateWallet,
    verifySignature,
    generateToken,
    requireSuperAdmin,
    verifyOperationSignature
};
