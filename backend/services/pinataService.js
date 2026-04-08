import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET;
const PINATA_JWT = process.env.PINATA_JWT;

/**
 * Upload JSON metadata to Pinata IPFS
 * @param {Object} metadata - JSON metadata object
 * @param {Object} options - Upload options (name, keyvalues for tagging)
 * @returns {Promise<Object>} - IPFS hash and URL
 */
async function uploadJSONToIPFS(metadata, options = {}) {
    try {
        const data = JSON.stringify({
            pinataContent: metadata,
            pinataMetadata: {
                name: options.name || 'CLORIT Metadata',
                keyvalues: {
                    project: 'CLORIT',
                    type: options.type || 'metadata',
                    wallet: options.wallet || 'unknown',
                    timestamp: new Date().toISOString(),
                    ...options.keyvalues
                }
            },
            pinataOptions: {
                cidVersion: 1
            }
        });

        const config = {
            method: 'post',
            url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${PINATA_JWT}`
            },
            data: data
        };

        const response = await axios(config);

        return {
            success: true,
            ipfsHash: response.data.IpfsHash,
            ipfsUrl: `ipfs://${response.data.IpfsHash}`,
            gatewayUrl: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
            timestamp: response.data.Timestamp
        };
    } catch (error) {
        console.error('Error uploading to IPFS:', error.response?.data || error.message);
        throw new Error(`IPFS upload failed: ${error.message}`);
    }
}

/**
 * Upload file to Pinata IPFS
 * @param {Buffer|Stream} fileBuffer - File buffer or stream
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} - IPFS hash and URL
 */
async function uploadFileToIPFS(fileBuffer, options = {}) {
    try {
        const formData = new FormData();
        formData.append('file', fileBuffer, options.filename || 'file');

        const metadata = JSON.stringify({
            name: options.name || 'CLORIT File',
            keyvalues: {
                project: 'CLORIT',
                type: options.type || 'file',
                wallet: options.wallet || 'unknown',
                timestamp: new Date().toISOString(),
                ...options.keyvalues
            }
        });
        formData.append('pinataMetadata', metadata);

        const config = {
            method: 'post',
            url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
            headers: {
                'Authorization': `Bearer ${PINATA_JWT}`,
                ...formData.getHeaders()
            },
            data: formData
        };

        const response = await axios(config);

        return {
            success: true,
            ipfsHash: response.data.IpfsHash,
            ipfsUrl: `ipfs://${response.data.IpfsHash}`,
            gatewayUrl: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
            timestamp: response.data.Timestamp
        };
    } catch (error) {
        console.error('Error uploading file to IPFS:', error.response?.data || error.message);
        throw new Error(`IPFS file upload failed: ${error.message}`);
    }
}

/**
 * Create project metadata for IPFS
 * @param {Object} projectData - Project data
 * @param {string} walletAddress - User's wallet address
 * @returns {Object} - Formatted metadata
 */
function createProjectMetadata(projectData, walletAddress) {
    return {
        name: projectData.name || projectData.projectId,
        description: projectData.description || '',
        image: projectData.imageUrl || '',
        external_url: `https://clorit.app/projects/${projectData.projectId}`,
        attributes: [
            {
                trait_type: 'Project ID',
                value: projectData.projectId
            },
            {
                trait_type: 'Area (Hectares)',
                value: projectData.areaHectares || 0,
                display_type: 'number'
            },
            {
                trait_type: 'Ecosystem Type',
                value: projectData.ecosystemType || 'Unknown'
            },
            {
                trait_type: 'Location',
                value: `${projectData.region}, ${projectData.state}`
            },
            {
                trait_type: 'Owner',
                value: walletAddress
            },
            {
                trait_type: 'Registration Date',
                value: new Date().toISOString(),
                display_type: 'date'
            }
        ],
        properties: {
            projectId: projectData.projectId,
            region: projectData.region,
            state: projectData.state,
            latitude: projectData.latitude,
            longitude: projectData.longitude,
            dominantSpecies: projectData.dominantSpecies,
            estimatedCredits: projectData.estimatedCarbonCredits || 0,
            owner: walletAddress
        }
    };
}

/**
 * Create carbon credit NFT metadata
 * @param {Object} creditData - Carbon credit data
 * @param {string} walletAddress - User's wallet address
 * @returns {Object} - Formatted NFT metadata
 */
function createCarbonCreditMetadata(creditData, walletAddress) {
    return {
        name: `Carbon Credit - ${creditData.projectId}`,
        description: `Carbon credits from blue carbon restoration project ${creditData.projectId}. Each token represents 1 tonne of CO2e sequestered.`,
        image: creditData.imageUrl || 'https://gateway.pinata.cloud/ipfs/QmDefaultCarbonCreditImage',
        external_url: `https://clorit.app/credits/${creditData.tokenId}`,
        attributes: [
            {
                trait_type: 'Project ID',
                value: creditData.projectId
            },
            {
                trait_type: 'Token ID',
                value: creditData.tokenId,
                display_type: 'number'
            },
            {
                trait_type: 'Total Supply',
                value: creditData.totalSupply || 0,
                display_type: 'number'
            },
            {
                trait_type: 'Retired',
                value: creditData.retired || 0,
                display_type: 'number'
            },
            {
                trait_type: 'Vintage Year',
                value: new Date().getFullYear(),
                display_type: 'number'
            },
            {
                trait_type: 'Verification Status',
                value: 'NCCR Approved'
            },
            {
                trait_type: 'Issuer',
                value: walletAddress
            }
        ],
        properties: {
            projectId: creditData.projectId,
            tokenId: creditData.tokenId,
            standard: 'ERC-1155',
            blockchain: 'Ethereum',
            vintageYear: new Date().getFullYear(),
            verificationBody: 'NCCR',
            issuer: walletAddress
        }
    };
}

/**
 * Create retirement certificate metadata
 * @param {Object} retirementData - Retirement data
 * @param {string} walletAddress - Beneficiary wallet address
 * @returns {Object} - Formatted certificate metadata
 */
function createRetirementCertificateMetadata(retirementData, walletAddress) {
    return {
        name: `Carbon Retirement Certificate #${retirementData.certificateId}`,
        description: `This certificate proves the permanent retirement of ${retirementData.amount} tonnes of CO2e from project ${retirementData.projectId}. Retired by ${walletAddress}.`,
        image: retirementData.certificateImage || 'https://gateway.pinata.cloud/ipfs/QmDefaultCertificateImage',
        external_url: `https://clorit.app/certificates/${retirementData.certificateId}`,
        attributes: [
            {
                trait_type: 'Certificate ID',
                value: retirementData.certificateId,
                display_type: 'number'
            },
            {
                trait_type: 'Amount Retired (tCO2e)',
                value: retirementData.amount,
                display_type: 'number'
            },
            {
                trait_type: 'Project ID',
                value: retirementData.projectId
            },
            {
                trait_type: 'Beneficiary',
                value: walletAddress
            },
            {
                trait_type: 'Retirement Date',
                value: new Date().toISOString(),
                display_type: 'date'
            },
            {
                trait_type: 'Reason',
                value: retirementData.reason || 'Carbon Offset'
            }
        ],
        properties: {
            certificateId: retirementData.certificateId,
            projectId: retirementData.projectId,
            tokenId: retirementData.tokenId,
            amount: retirementData.amount,
            beneficiary: walletAddress,
            retirementDate: new Date().toISOString(),
            reason: retirementData.reason,
            soulbound: true // Non-transferable
        }
    };
}

/**
 * Get pinned files by wallet address
 * @param {string} walletAddress - Wallet address to filter by
 * @returns {Promise<Array>} - List of pinned files
 */
async function getPinnedFilesByWallet(walletAddress) {
    try {
        const config = {
            method: 'get',
            url: `https://api.pinata.cloud/data/pinList?metadata[keyvalues][wallet]={"value":"${walletAddress}","op":"eq"}`,
            headers: {
                'Authorization': `Bearer ${PINATA_JWT}`
            }
        };

        const response = await axios(config);
        return response.data.rows;
    } catch (error) {
        console.error('Error fetching pinned files:', error.message);
        throw new Error(`Failed to fetch pinned files: ${error.message}`);
    }
}

export {
    uploadJSONToIPFS,
    uploadFileToIPFS,
    createProjectMetadata,
    createCarbonCreditMetadata,
    createRetirementCertificateMetadata,
    getPinnedFilesByWallet
};
