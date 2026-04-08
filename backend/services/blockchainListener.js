import { ethers } from 'ethers';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load models
import Project from '../models/Project.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to ABIs (assuming relative to backend root)
const ARTIFACTS_PATH = path.resolve(__dirname, '../../contracts/artifacts/contracts');
const ADDRESSES_PATH = path.resolve(__dirname, '../../contracts/deployment-addresses.json');

const getABI = (contractName) => {
    const filePath = path.join(ARTIFACTS_PATH, `${contractName}.sol/${contractName}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent).abi;
};

const getAddresses = () => {
    const fileContent = fs.readFileSync(ADDRESSES_PATH, 'utf8');
    return JSON.parse(fileContent).contracts;
};

export const startBlockchainListener = async () => {
    console.log('🔗 Starting Blockchain Event Listener...');

    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || 'http://127.0.0.1:8545');
    const addresses = getAddresses();

    const registryABI = getABI('ProjectRegistry');
    const workflowABI = getABI('VerificationWorkflow');
    const marketplaceABI = getABI('CarbonMarketplace');

    const registry = new ethers.Contract(addresses.projectRegistry, registryABI, provider);
    const workflow = new ethers.Contract(addresses.verificationWorkflow, workflowABI, provider);
    const marketplace = new ethers.Contract(addresses.marketplace, marketplaceABI, provider);

    // --- Registry Events ---
    registry.on('ProjectRegistered', async (projectId, owner, landType, event) => {
        console.log(`📡 Event: ProjectRegistered | ID: ${projectId}`);
        try {
            // Fetch full project details from the contract since the event is sparse
            const p = await registry.getProject(projectId);
            
            await Project.findOneAndUpdate(
                { projectId },
                {
                    $set: {
                        submittedBy: { walletAddress: p.owner },
                        ipfsHash: p.metadataURI,
                        area: Number(p.areaHectares),
                        'location.coordinates': {
                            latitude: Number(p.latitude) / 1_000_000,
                            longitude: Number(p.longitude) / 1_000_000
                        },
                        status: 'submitted',
                        landType: Number(p.landType) // 0: Mangrove, 1: Seagrass, etc.
                    }
                },
                { upsert: true, new: true }
            );
        } catch (err) {
            console.error('Error handling ProjectRegistered:', err);
        }
    });

    registry.on('ProjectStatusUpdated', async (projectId, newStatus, event) => {
        console.log(`📡 Event: ProjectStatusUpdated | ID: ${projectId} | Status: ${newStatus}`);
        // Map enum index to string if needed, or just store the index
        // Statuses: 0: Submitted, 1: NGOVerified, 2: PanchayatReviewed, 3: AdminApproved, 4: Active, 5: Rejected
        const statusMap = ['submitted', 'ngo-verified', 'panchayat-reviewed', 'admin-approved', 'active', 'rejected'];
        const statusString = statusMap[Number(newStatus)] || 'unknown';
        
        try {
            await Project.findOneAndUpdate(
                { projectId },
                { $set: { status: statusString } }
            );
        } catch (err) {
            console.error('Error handling ProjectStatusUpdated:', err);
        }
    });

    // --- Workflow Events ---
    workflow.on('NGOVerificationSubmitted', async (projectId, verifier, approved, event) => {
        console.log(`📡 Event: NGOVerificationSubmitted | ID: ${projectId} | Approved: ${approved}`);
        if (approved) {
            await updateProjectStatus(projectId, 'ngo-verified', {
                stage: 'ngo',
                verifiedBy: { walletAddress: verifier },
                timestamp: new Date(),
                status: 'approved'
            });
        }
    });

    workflow.on('PanchayatApprovalSubmitted', async (projectId, verifier, approved, event) => {
        console.log(`📡 Event: PanchayatApprovalSubmitted | ID: ${projectId} | Approved: ${approved}`);
        if (approved) {
            await updateProjectStatus(projectId, 'panchayat-reviewed', {
                stage: 'panchayat',
                verifiedBy: { walletAddress: verifier },
                timestamp: new Date(),
                status: 'approved'
            });
        }
    });

    workflow.on('AdminApprovalSubmitted', async (projectId, verifier, credits, approved, event) => {
        console.log(`📡 Event: AdminApprovalSubmitted | ID: ${projectId} | Credits: ${credits} | Approved: ${approved}`);
        if (approved) {
            try {
                await Project.findOneAndUpdate(
                    { projectId },
                    {
                        $set: {
                            status: 'admin-approved',
                            carbonCredits: Number(credits),
                            adminApproval: {
                                approvedBy: verifier,
                                approvalDate: new Date(),
                                txHash: event.log.transactionHash,
                                finalCarbonCredits: Number(credits)
                            }
                        },
                        $push: {
                            verifications: {
                                stage: 'admin',
                                verifiedBy: { walletAddress: verifier },
                                timestamp: new Date(),
                                status: 'approved'
                            }
                        }
                    }
                );
            } catch (err) {
                console.error('Error handling AdminApprovalSubmitted:', err);
            }
        }
    });

    // --- Marketplace Events ---
    marketplace.on('ListingCreated', async (listingId, seller, paymentToken, tokenId, amount, price, event) => {
        console.log(`📡 Event: ListingCreated | ID: ${listingId} | Amount: ${amount}`);
        // Here you could update a dedicated Listing model or add to Project metadata
    });

    marketplace.on('TradeExecuted', async (listingId, buyer, amount, totalPrice, event) => {
        console.log(`📡 Event: TradeExecuted | ID: ${listingId} | Amount: ${amount}`);
    });

    console.log('✅ Blockchain listeners active.');
};

async function updateProjectStatus(projectId, status, verificationData) {
    try {
        await Project.findOneAndUpdate(
            { projectId },
            {
                $set: { status },
                $push: { verifications: verificationData }
            }
        );
    } catch (err) {
        console.error(`Error updating project ${projectId} to status ${status}:`, err);
    }
}
