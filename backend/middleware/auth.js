import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Protect routes - verify JWT token
 */
export const protect = async (req, res, next) => {
    try {
        let token;

        // Check for token in Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route - no token provided'
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

            // Get user from token
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found'
                });
            }

            // Check if user is active
            if (!req.user.isActive) {
                return res.status(403).json({
                    success: false,
                    message: 'Account has been deactivated'
                });
            }

            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route - invalid token'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error during authentication',
            error: error.message
        });
    }
};

/**
 * Authorize specific roles
 * @param  {...string} roles - Allowed roles (e.g., 'admin', 'ngo', 'community')
 */
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role '${req.user.role}' is not authorized to access this route. Required roles: ${roles.join(', ')}`
            });
        }

        next();
    };
};

/**
 * Verify NGO has access to specific community
 */
export const verifyNGOCommunityAccess = async (req, res, next) => {
    try {
        const ngoId = req.user.id;
        const communityId = req.params.communityId || req.body.communityId;

        if (!communityId) {
            return res.status(400).json({
                success: false,
                message: 'Community ID is required'
            });
        }

        // Check if community belongs to this NGO
        const community = await User.findById(communityId);

        if (!community || community.role !== 'community') {
            return res.status(404).json({
                success: false,
                message: 'Community not found'
            });
        }

        if (community.parentNGO.toString() !== ngoId) {
            return res.status(403).json({
                success: false,
                message: 'You do not have access to this community'
            });
        }

        req.community = community;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error verifying community access',
            error: error.message
        });
    }
};

/**
 * Verify admin has oversight (admin can access all NGOs and communities)
 */
export const verifyAdminAccess = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Admin access required'
        });
    }
    next();
};

/**
 * Verify user has verified status
 */
export const requireVerified = (req, res, next) => {
    if (req.user.verificationStatus !== 'verified') {
        return res.status(403).json({
            success: false,
            message: `Account verification required. Current status: ${req.user.verificationStatus}`
        });
    }
    next();
};

/**
 * Generate JWT token
 */
export const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '30d' }
    );
};
