import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Import routes
import authRoutes from './routes/auth.js';
import adminAuthRoutes from './routes/adminAuth.js';
import adminProjectsRoutes from './routes/adminProjects.js';
import adminNDVIRoutes from './routes/adminNDVI.js';
import adminAnalyticsRoutes from './routes/adminAnalytics.js';
import adminExportRoutes from './routes/adminExport.js';
import ngoRoutes from './routes/ngoRoutes.js';
import adminNGORoutes from './routes/adminNGO.js';
import projectRoutes from './routes/projects.js';
import carbonRoutes from './routes/carbon.js';
import calculatorRoutes from './routes/calculator.js';
import ipfsRoutes from './routes/ipfs.js';
import aiRoutes from './routes/ai.js';
import { startBlockchainListener } from './services/blockchainListener.js';
import satelliteAnalysisService from './services/satelliteAnalysisService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:8081',
  'http://localhost:5173',
  'https://clorit.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200, // Higher limit for admin operations
  message: 'Too many admin requests, please try again later.'
});

app.use('/api/', limiter);
app.use('/api/admin/', adminLimiter);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware (development)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clorit', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/projects', adminProjectsRoutes);
app.use('/api/admin/ndvi', adminNDVIRoutes);
app.use('/api/admin/analytics', adminAnalyticsRoutes);
app.use('/api/admin/export', adminExportRoutes);
app.use('/api/ngo', ngoRoutes);
app.use('/api/admin/ngo', adminNGORoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/carbon', carbonRoutes);
app.use('/api/calculator', calculatorRoutes);
app.use('/api/ipfs', ipfsRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'CLORIT Backend is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', async (req, res) => {
  const geeStatus = await satelliteAnalysisService.initialize();
  res.status(200).json({
    status: 'OK',
    gee: geeStatus ? 'connected' : 'mock_mode',
    timestamp: new Date().toISOString()
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'CLORIT Admin API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      adminAuth: '/api/admin/auth',
      projects: '/api/admin/projects',
      ndvi: '/api/admin/ndvi',
      analytics: '/api/admin/analytics',
      export: '/api/admin/export',
      ngo: '/api/ngo',
      adminNGO: '/api/admin/ngo',
      ipfs: '/api/ipfs'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: Object.values(err.errors).map(e => e.message)
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Duplicate entry',
      field: Object.keys(err.keyPattern)[0]
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

// Start server
const startServer = async () => {
  await connectDB();
  
  // Initialize Google Earth Engine
  try {
    console.log('📡 Initializing Satellite Intelligence...');
    const geeStatus = await satelliteAnalysisService.initialize();
    console.log(geeStatus ? '✅ GEE Connected' : '⚠️ GEE running in MOCK mode');
  } catch (error) {
    console.warn('⚠️ GEE initialization failed:', error.message);
  }

  // Start Blockchain Listener
  try {
    startBlockchainListener().catch(err => {
      console.error('❌ Failed to start blockchain listener:', err);
    });
  } catch (error) {
    console.warn('⚠️ Blockchain listener initialization deferred.');
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 API: http://localhost:${PORT}/api`);
  });
};

startServer();
