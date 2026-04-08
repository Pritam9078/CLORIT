import express from 'express';
import ExcelJS from 'exceljs';
import { createObjectCsvWriter } from 'csv-writer';
import Project from '../models/Project.js';
import NDVIScan from '../models/NDVIScan.js';
import AuditLog from '../models/AuditLog.js';
import { authenticateWallet } from '../middleware/walletAuth.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// All routes require wallet authentication
router.use(authenticateWallet);

/**
 * GET /api/admin/export/excel
 * Export project data to Excel
 */
router.get('/excel', async (req, res) => {
    try {
        const projects = await Project.find({}).lean();

        // Create workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Projects');

        // Define columns
        worksheet.columns = [
            { header: 'Project ID', key: 'projectId', width: 15 },
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Region', key: 'region', width: 20 },
            { header: 'State', key: 'state', width: 20 },
            { header: 'Status', key: 'status', width: 20 },
            { header: 'NDVI Value', key: 'ndviValue', width: 12 },
            { header: 'Area (ha)', key: 'area', width: 12 },
            { header: 'Carbon Credits', key: 'carbonCredits', width: 15 },
            { header: 'Submitted By', key: 'submittedBy', width: 45 },
            { header: 'Submission Date', key: 'submissionDate', width: 15 },
            { header: 'Approved By', key: 'approvedBy', width: 45 },
            { header: 'Approval Date', key: 'approvalDate', width: 15 }
        ];

        // Add data
        projects.forEach(project => {
            worksheet.addRow({
                projectId: project.projectId,
                name: project.name,
                region: project.location?.region || '',
                state: project.location?.state || '',
                status: project.status,
                ndviValue: project.ndviValue || 0,
                area: project.area,
                carbonCredits: project.carbonCredits,
                submittedBy: project.submittedBy?.walletAddress || '',
                submissionDate: project.submissionDate ? new Date(project.submissionDate).toLocaleDateString() : '',
                approvedBy: project.nccrApproval?.approvedBy || '',
                approvalDate: project.nccrApproval?.approvalDate ? new Date(project.nccrApproval.approvalDate).toLocaleDateString() : ''
            });
        });

        // Style header row
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF0077B6' }
        };
        worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

        // Log export action
        await AuditLog.create({
            adminWallet: req.walletAddress,
            action: 'data_exported',
            details: {
                format: 'excel',
                recordCount: projects.length
            },
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        });

        // Set response headers
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=clorit-projects-${Date.now()}.xlsx`
        );

        // Write to response
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Excel export error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to export Excel file',
            error: error.message
        });
    }
});

/**
 * GET /api/admin/export/csv
 * Export project data to CSV
 */
router.get('/csv', async (req, res) => {
    try {
        const projects = await Project.find({}).lean();

        // Prepare CSV data
        const csvData = projects.map(project => ({
            projectId: project.projectId,
            name: project.name,
            region: project.location?.region || '',
            state: project.location?.state || '',
            status: project.status,
            ndviValue: project.ndviValue || 0,
            area: project.area,
            carbonCredits: project.carbonCredits,
            submittedBy: project.submittedBy?.walletAddress || '',
            submissionDate: project.submissionDate ? new Date(project.submissionDate).toISOString() : '',
            approvedBy: project.nccrApproval?.approvedBy || '',
            approvalDate: project.nccrApproval?.approvalDate ? new Date(project.nccrApproval.approvalDate).toISOString() : ''
        }));

        // Convert to CSV string
        const headers = Object.keys(csvData[0] || {});
        const csvRows = [
            headers.join(','),
            ...csvData.map(row =>
                headers.map(header => {
                    const value = row[header];
                    return typeof value === 'string' && value.includes(',')
                        ? `"${value}"`
                        : value;
                }).join(',')
            )
        ];

        const csvContent = csvRows.join('\n');

        // Log export action
        await AuditLog.create({
            adminWallet: req.walletAddress,
            action: 'data_exported',
            details: {
                format: 'csv',
                recordCount: projects.length
            },
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        });

        // Set response headers
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=clorit-projects-${Date.now()}.csv`
        );

        res.send(csvContent);
    } catch (error) {
        console.error('CSV export error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to export CSV file',
            error: error.message
        });
    }
});

/**
 * GET /api/admin/export/json
 * Export project data to JSON
 */
router.get('/json', async (req, res) => {
    try {
        const projects = await Project.find({}).lean();

        // Log export action
        await AuditLog.create({
            adminWallet: req.walletAddress,
            action: 'data_exported',
            details: {
                format: 'json',
                recordCount: projects.length
            },
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        });

        // Set response headers
        res.setHeader('Content-Type', 'application/json');
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=clorit-projects-${Date.now()}.json`
        );

        res.json({
            exportDate: new Date().toISOString(),
            totalProjects: projects.length,
            projects
        });
    } catch (error) {
        console.error('JSON export error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to export JSON file',
            error: error.message
        });
    }
});

/**
 * GET /api/admin/export/ndvi-data
 * Export NDVI scan data
 */
router.get('/ndvi-data', async (req, res) => {
    try {
        const { projectId, format = 'json' } = req.query;

        const query = projectId ? { projectId } : {};
        const scans = await NDVIScan.find(query).sort({ scanDate: -1 }).lean();

        if (format === 'csv') {
            const csvData = scans.map(scan => ({
                projectId: scan.projectId,
                scanDate: new Date(scan.scanDate).toISOString(),
                ndviValue: scan.ndviValue,
                healthStatus: scan.healthStatus,
                satelliteSource: scan.satelliteSource,
                cloudCover: scan.metadata?.cloudCover || '',
                verifiedBy: scan.verifiedBy || ''
            }));

            const headers = Object.keys(csvData[0] || {});
            const csvRows = [
                headers.join(','),
                ...csvData.map(row => headers.map(h => row[h]).join(','))
            ];

            res.setHeader('Content-Type', 'text/csv');
            res.setHeader(
                'Content-Disposition',
                `attachment; filename=clorit-ndvi-${Date.now()}.csv`
            );
            res.send(csvRows.join('\n'));
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader(
                'Content-Disposition',
                `attachment; filename=clorit-ndvi-${Date.now()}.json`
            );
            res.json({
                exportDate: new Date().toISOString(),
                totalScans: scans.length,
                scans
            });
        }

        // Log export
        await AuditLog.create({
            adminWallet: req.walletAddress,
            action: 'data_exported',
            details: {
                type: 'ndvi_data',
                format,
                recordCount: scans.length,
                projectId: projectId || 'all'
            },
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        });
    } catch (error) {
        console.error('NDVI export error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to export NDVI data',
            error: error.message
        });
    }
});

export default router;
