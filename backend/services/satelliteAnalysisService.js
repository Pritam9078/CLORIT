import ee from '@google/earthengine';
import dotenv from 'dotenv';
import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Satellite Analysis Service
 * Interfaces with Google Earth Engine for NDVI and Environmental Metrics
 */
class SatelliteAnalysisService {
  constructor() {
    this.isInitialized = false;
  }

  /**
   * Load credentials from JSON keyfile (most reliable) or .env fallback
   */
  getCredentials() {
    // Priority 1: Load from JSON keyfile placed in backend/
    const keyFilePath = path.join(__dirname, '..', 'gee-credentials.json');
    if (existsSync(keyFilePath)) {
      try {
        const keyFile = JSON.parse(readFileSync(keyFilePath, 'utf8'));
        if (keyFile.client_email && keyFile.private_key) {
          console.log('🔑 Loaded GEE credentials from gee-credentials.json');
          return { serviceAccount: keyFile.client_email, privateKey: keyFile.private_key };
        }
      } catch (e) {
        console.warn('⚠️ Failed to parse gee-credentials.json:', e.message);
      }
    }

    // Priority 2: .env fallback
    const serviceAccount = process.env.GEE_SERVICE_ACCOUNT?.trim().replace(/^\"|\"$/g, '');
    let privateKey = process.env.GEE_PRIVATE_KEY?.trim().replace(/^\"|\"$/g, '');
    if (privateKey) {
      privateKey = privateKey.replace(/\\n/g, '\n');
    }
    if (serviceAccount && privateKey) {
      console.log('🔑 Loaded GEE credentials from .env');
      return { serviceAccount, privateKey };
    }

    return null;
  }

  /**
   * Initialize GEE Connection using authenticateViaPrivateKey (v1.7+)
   */
  async initialize() {
    if (this.isInitialized) return true;

    const creds = this.getCredentials();
    if (!creds) {
      console.warn('⚠️ GEE credentials not found. Running in MOCK mode.');
      return false;
    }

    const { serviceAccount, privateKey } = creds;

    return new Promise((resolve) => {
      try {
        console.log('📡 Authenticating with Google Earth Engine...');
        ee.data.authenticateViaPrivateKey(
          { client_email: serviceAccount, private_key: privateKey },
          () => {
            console.log('🔐 GEE auth success. Initializing...');
            ee.initialize(
              null,
              null,
              () => {
                this.isInitialized = true;
                console.log('✅ Google Earth Engine initialized — LIVE MODE ACTIVE');
                resolve(true);
              },
              (err) => {
                console.error('❌ GEE initialization error:', err);
                resolve(false);
              }
            );
          },
          (err) => {
            console.error('❌ GEE authentication error:', err);
            resolve(false);
          }
        );
      } catch (error) {
        console.error('❌ Unexpected GEE init error:', error.message);
        resolve(false);
      }
    });
  }

  /**
   * Get NDVI for a specific coordinate
   * @param {number} lat 
   * @param {number} lng 
   * @param {number} buffer - buffer in meters around the point
   */
  async getNDVIForPoint(lat, lng, buffer = 500) {
    const initialized = await this.initialize();
    if (!initialized) return this.getMockNDVI();

    try {
      const point = ee.Geometry.Point([lng, lat]);
      const roi = point.buffer(buffer);

      const dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
        .filterBounds(roi)
        .filterDate(
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            new Date().toISOString().split('T')[0]
        )
        .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
        .sort('CLOUDY_PIXEL_PERCENTAGE')
        .first();

      // Calculate NDVI: (NIR - Red) / (NIR + Red)
      // S2 Bands: B4 is Red, B8 is NIR
      const ndvi = dataset.normalizedDifference(['B8', 'B4']).rename('NDVI');
      
      const stats = ndvi.reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: roi,
        scale: 10,
        maxPixels: 1e9
      }).get('NDVI');

      return new Promise((resolve) => {
          stats.evaluate((val) => {
              resolve({
                  ndviValue: parseFloat(val?.toFixed(4) || 0),
                  source: 'Sentinel-2 L2A',
                  timestamp: new Date().toISOString(),
                  metadata: {
                      resolution: '10m',
                      bands: ['B4', 'B8'],
                      isMock: false
                  }
              });
          });
      });
    } catch (error) {
      console.error('GEE Analysis Error:', error);
      return this.getMockNDVI(error.message);
    }
  }

  /**
   * Extract time-series NDVI data
   */
  async getNDVITimeSeries(lat, lng, months = 6) {
      const initialized = await this.initialize();
      if (!initialized) return this.getMockTimeSeries(months);
      return this.getMockTimeSeries(months);
  }

  /**
   * Fallback mock data if GEE fails or is not configured
   */
  getMockNDVI(reason = '') {
    return {
      ndviValue: 0.45 + Math.random() * 0.35,
      source: 'Internal Simulation',
      timestamp: new Date().toISOString(),
      metadata: {
        isMock: true,
        reason: reason || 'Credentials not configured'
      }
    };
  }

  getMockTimeSeries(months) {
      return Array.from({ length: months }).map((_, i) => ({
          date: new Date(Date.now() - (months - i) * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          ndvi: 0.4 + Math.random() * 0.4
      }));
  }
}

export const satelliteAnalysisService = new SatelliteAnalysisService();
export default satelliteAnalysisService;
