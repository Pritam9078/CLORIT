import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import User from '../models/User.js';

const router = express.Router();

// Validation schemas
const communitySignupSchema = Joi.object({
  fullName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  role: Joi.string().valid('community').required(),
  communityName: Joi.string().min(2).max(100).required(),
  location: Joi.string().min(2).max(100).required(),
  phone: Joi.string().min(10).max(15).required()
});

const ngoSignupSchema = Joi.object({
  fullName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  role: Joi.string().valid('ngo').required(),
  ngoName: Joi.string().min(2).max(100).required(),
  registrationNumber: Joi.string().min(5).max(50).required(),
  website: Joi.string().uri().allow('').optional(),
  location: Joi.string().min(2).max(100).required(),
  phone: Joi.string().min(10).max(15).required()
});

const panchayatSignupSchema = Joi.object({
  fullName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  role: Joi.string().valid('panchayat').required(),
  panchayatName: Joi.string().min(2).max(100).required(),
  wardBlockNumber: Joi.string().min(1).max(20).required(),
  location: Joi.string().min(2).max(100).required(),
  phone: Joi.string().min(10).max(15).required()
});

// Helper function to validate based on role
const validateSignupData = (data) => {
  switch (data.role) {
    case 'community':
      return communitySignupSchema.validate(data);
    case 'ngo':
      return ngoSignupSchema.validate(data);
    case 'panchayat':
      return panchayatSignupSchema.validate(data);
    default:
      return { error: { details: [{ message: 'Invalid role specified' }] } };
  }
};

// @route   POST /api/auth/signup
// @desc    Register a new user based on role
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    // Validate input
    const { error } = validateSignupData(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { fullName, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Prepare user data based on role
    const userData = {
      fullName,
      email,
      password: hashedPassword,
      role,
      location: req.body.location,
      phone: req.body.phone
    };

    // Add role-specific fields
    switch (role) {
      case 'community':
        userData.communityName = req.body.communityName;
        break;
      case 'ngo':
        userData.ngoName = req.body.ngoName;
        userData.registrationNumber = req.body.registrationNumber;
        if (req.body.website) userData.website = req.body.website;
        break;
      case 'panchayat':
        userData.panchayatName = req.body.panchayatName;
        userData.wardBlockNumber = req.body.wardBlockNumber;
        break;
    }

    // Create user
    const user = new User(userData);
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '7d' }
    );

    // Return success response (excluding password)
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: userResponse,
        token
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during signup'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '7d' }
    );

    // Return success response (excluding password)
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { user }
    });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

export default router;
