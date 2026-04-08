import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import csv from 'csv-parser';
import Project from './models/Project.js';
import NDVIScan from './models/NDVIScan.js';

dotenv.config();

/**
 * CSV Import Script for CLORIT Admin Backend
 * 
 * This script imports project data from a CSV file into MongoDB
 * 
 * Usage:
 *   node importCSV.js path/to/your/file.csv
 * 
 * CSV Format Expected:
 *   projectId, name, region, state, latitude, longitude, status, ndviValue, area, carbonCredits, submittedBy, communityName
 * 
 * Example CSV:
 *   CLORIT-3001,Mangrove Project,Kerala,Kerala,9.9312,76.2673,submitted,0.65,45.2,1200,0x123...,Kerala Coastal Group
 */

async function importCSV(filePath) {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clorit', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB\n');

        if (!fs.existsSync(filePath)) {
            console.error(`❌ File not found: ${filePath}`);
            process.exit(1);
        }

        const projects = [];
        const ndviScans = [];

        // Read CSV file
        console.log(`📖 Reading CSV file: ${filePath}\n`);

        await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    try {
                        // Create project object
                        const project = {
                            projectId: row.projectId || row.project_id,
                            name: row.name || row.projectName,
                            location: {
                                region: row.region,
                                state: row.state,
                                coordinates: {
                                    latitude: parseFloat(row.latitude || row.lat),
                                    longitude: parseFloat(row.longitude || row.lng || row.lon)
                                }
                            },
                            status: row.status || 'submitted',
                            ndviValue: row.ndviValue ? parseFloat(row.ndviValue) : undefined,
                            area: parseFloat(row.area || row.areaHa),
                            carbonCredits: parseFloat(row.carbonCredits || 0),
                            submittedBy: {
                                walletAddress: row.submittedBy || row.walletAddress || '0x0000000000000000000000000000000000000000',
                                communityName: row.communityName || row.community,
                                contactInfo: row.contactInfo || row.email
                            },
                            verifications: [],
                            submissionDate: row.submissionDate ? new Date(row.submissionDate) : new Date()
                        };

                        projects.push(project);

                        // If NDVI value exists, create scan
                        if (row.ndviValue) {
                            ndviScans.push({
                                projectId: project.projectId,
                                scanDate: row.scanDate ? new Date(row.scanDate) : new Date(),
                                ndviValue: parseFloat(row.ndviValue),
                                satelliteSource: row.satelliteSource || 'mock',
                                imageUrl: row.imageUrl || `https://ipfs.io/ipfs/mock-${project.projectId}`,
                                metadata: {
                                    cloudCover: row.cloudCover ? parseFloat(row.cloudCover) : 5,
                                    resolution: row.resolution || '10m',
                                    bands: ['B4', 'B8'],
                                    processingLevel: 'L2A'
                                }
                            });
                        }

                        console.log(`✓ Parsed: ${project.projectId} - ${project.name}`);
                    } catch (error) {
                        console.error(`❌ Error parsing row:`, row, error.message);
                    }
                })
                .on('end', resolve)
                .on('error', reject);
        });

        console.log(`\n📊 Parsed ${projects.length} projects from CSV\n`);

        if (projects.length === 0) {
            console.log('⚠️  No valid projects found in CSV');
            process.exit(0);
        }

        // Ask user if they want to clear existing data
        console.log('⚠️  Import Options:');
        console.log('   1. Add to existing data (append)');
        console.log('   2. Replace all data (clear & import)');
        console.log('\n💡 Tip: Use option 1 to add new projects, option 2 for fresh start\n');

        // For now, we'll append (you can modify this)
        const mode = process.argv[3] || 'append'; // 'append' or 'replace'

        if (mode === 'replace') {
            console.log('🗑️  Clearing existing data...');
            await Project.deleteMany({});
            await NDVIScan.deleteMany({});
            console.log('✅ Existing data cleared\n');
        }

        // Insert projects
        console.log('📦 Inserting projects...');
        const insertedProjects = await Project.insertMany(projects, { ordered: false });
        console.log(`✅ Inserted ${insertedProjects.length} projects\n`);

        // Insert NDVI scans
        if (ndviScans.length > 0) {
            console.log('🛰️  Inserting NDVI scans...');
            const insertedScans = await NDVIScan.insertMany(ndviScans, { ordered: false });
            console.log(`✅ Inserted ${insertedScans.length} NDVI scans\n`);
        }

        // Summary
        console.log('📊 Import Summary:');
        console.log(`   - Projects imported: ${insertedProjects.length}`);
        console.log(`   - NDVI scans created: ${ndviScans.length}`);
        console.log('\n✅ CSV import completed successfully!');

        // Show status breakdown
        const statusCounts = await Project.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
        console.log('\n📋 Project Status Breakdown:');
        statusCounts.forEach(s => {
            console.log(`   - ${s._id}: ${s.count}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Import error:', error);
        process.exit(1);
    }
}

// Get file path from command line
const filePath = process.argv[2];

if (!filePath) {
    console.log(`
📥 CSV Import Tool for CLORIT Admin Backend

Usage:
  node importCSV.js <path-to-csv-file> [mode]

Modes:
  append  - Add to existing data (default)
  replace - Clear database and import fresh

Example:
  node importCSV.js ./data/projects.csv append
  node importCSV.js ./data/projects.csv replace

CSV Format Required:
  projectId, name, region, state, latitude, longitude, status, ndviValue, area, carbonCredits, submittedBy, communityName

Sample CSV:
  CLORIT-3001,Kerala Mangrove,Kerala,Kerala,9.9312,76.2673,submitted,0.65,45.2,1200,0x123...,Kerala Group
  CLORIT-3002,TN Seagrass,Tamil Nadu,Tamil Nadu,11.1271,78.6569,ngo-verified,0.72,32.5,980,0x456...,TN Coastal

Note: Install csv-parser first: npm install csv-parser
  `);
    process.exit(0);
}

importCSV(filePath);
