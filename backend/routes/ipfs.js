import express from 'express';
import multer from 'multer';
import {
    uploadJSONToIPFS,
    uploadFileToIPFS,
    createProjectMetadata,
    createCarbonCreditMetadata,
    createRetirementCertificateMetadata,
    getPinnedFilesByWallet
} from '../services/pinataService.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit

/**
 * POST /api/ipfs/upload-json
 * Upload JSON metadata to IPFS
 */
router.post('/upload-json', async (req, res) => {
    try {
        const { metadata, walletAddress, name, type, keyvalues } = req.body;

        if (!metadata || !walletAddress) {
            return res.status(400).json({
                success: false,
                message: 'Metadata and wallet address are required'
            });
        }

        const result = await uploadJSONToIPFS(metadata, {
            name,
            type,
            wallet: walletAddress,
            keyvalues
        });

        res.json(result);
    } catch (error) {
        console.error('Upload JSON error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * POST /api/ipfs/upload-file
 * Upload file to IPFS
 */
router.post('/upload-file', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file provided'
            });
        }

        const { walletAddress, name, type, keyvalues } = req.body;

        if (!walletAddress) {
            return res.status(400).json({
                success: false,
                message: 'Wallet address is required'
            });
        }

        const result = await uploadFileToIPFS(req.file.buffer, {
            filename: req.file.originalname,
            name,
            type,
            wallet: walletAddress,
            keyvalues: keyvalues ? JSON.parse(keyvalues) : {}
        });

        res.json(result);
    } catch (error) {
        console.error('Upload file error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * POST /api/ipfs/project-metadata
 * Create and upload project metadata to IPFS
 */
router.post('/project-metadata', async (req, res) => {
    try {
        const { projectData, walletAddress } = req.body;

        if (!projectData || !walletAddress) {
            return res.status(400).json({
                success: false,
                message: 'Project data and wallet address are required'
            });
        }

        const metadata = createProjectMetadata(projectData, walletAddress);
        const result = await uploadJSONToIPFS(metadata, {
            name: `Project-${projectData.projectId}`,
            type: 'project',
            wallet: walletAddress,
            keyvalues: {
                projectId: projectData.projectId
            }
        });

        res.json({
            ...result,
            metadata
        });
    } catch (error) {
        console.error('Project metadata error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * POST /api/ipfs/carbon-credit-metadata
 * Create and upload carbon credit metadata to IPFS
 */
router.post('/carbon-credit-metadata', async (req, res) => {
    try {
        const { creditData, walletAddress } = req.body;

        if (!creditData || !walletAddress) {
            return res.status(400).json({
                success: false,
                message: 'Credit data and wallet address are required'
            });
        }

        const metadata = createCarbonCreditMetadata(creditData, walletAddress);
        const result = await uploadJSONToIPFS(metadata, {
            name: `CarbonCredit-${creditData.projectId}`,
            type: 'carbonCredit',
            wallet: walletAddress,
            keyvalues: {
                projectId: creditData.projectId,
                tokenId: creditData.tokenId?.toString()
            }
        });

        res.json({
            ...result,
            metadata
        });
    } catch (error) {
        console.error('Carbon credit metadata error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * POST /api/ipfs/retirement-certificate-metadata
 * Create and upload retirement certificate metadata to IPFS
 */
router.post('/retirement-certificate-metadata', async (req, res) => {
    try {
        const { retirementData, walletAddress } = req.body;

        if (!retirementData || !walletAddress) {
            return res.status(400).json({
                success: false,
                message: 'Retirement data and wallet address are required'
            });
        }

        const metadata = createRetirementCertificateMetadata(retirementData, walletAddress);
        const result = await uploadJSONToIPFS(metadata, {
            name: `RetirementCertificate-${retirementData.certificateId}`,
            type: 'retirementCertificate',
            wallet: walletAddress,
            keyvalues: {
                certificateId: retirementData.certificateId?.toString(),
                projectId: retirementData.projectId
            }
        });

        res.json({
            ...result,
            metadata
        });
    } catch (error) {
        console.error('Retirement certificate metadata error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * GET /api/ipfs/wallet/:address
 * Get all IPFS files pinned by a wallet address
 */
router.get('/wallet/:address', async (req, res) => {
    try {
        const { address } = req.params;

        if (!address) {
            return res.status(400).json({
                success: false,
                message: 'Wallet address is required'
            });
        }

        const files = await getPinnedFilesByWallet(address);

        res.json({
            success: true,
            count: files.length,
            files
        });
    } catch (error) {
        console.error('Get pinned files error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;
