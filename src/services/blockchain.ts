import { ethers } from 'ethers';
import addresses from '../contracts/addresses.json';
import ProjectRegistryABI from '../contracts/ProjectRegistry.json';
import CarbonCreditTokenABI from '../contracts/CarbonCreditToken.json';
import VerificationWorkflowABI from '../contracts/VerificationWorkflow.json';
import CarbonMarketplaceABI from '../contracts/CarbonMarketplace.json';

// Contract addresses
export const CONTRACT_ADDRESSES = addresses;

// Network configuration
const VITE_RPC = (import.meta.env.VITE_SEPOLIA_RPC_URL as string) || '';
export const NETWORK_CONFIG = {
    chainId: VITE_RPC ? 11155111 : 31337,
    name: VITE_RPC ? 'Sepolia (Alchemy)' : 'Hardhat Local',
    rpcUrl: VITE_RPC || 'http://127.0.0.1:8545',
};

// Enums from Solidity
export enum ProjectStatus {
    Submitted,
    NGOVerified,
    PanchayatReviewed,
    AdminApproved,
    Active,
    Rejected
}

export enum LandType {
    Mangrove,
    Seagrass,
    SaltMarsh,
    Other
}

// Get provider
export const getProvider = () => {
    return new ethers.JsonRpcProvider(NETWORK_CONFIG.rpcUrl);
};

// Get signer
export const getSigner = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        return await provider.getSigner();
    }
    throw new Error('No wallet connected');
};

// Contract instances
export const getProjectRegistry = async (signerOrProvider?: any) => {
    const provider = signerOrProvider || getProvider();
    return new ethers.Contract(
        CONTRACT_ADDRESSES.projectRegistry,
        ProjectRegistryABI.abi,
        provider
    );
};

export const getCarbonToken = async (signerOrProvider?: any) => {
    const provider = signerOrProvider || getProvider();
    return new ethers.Contract(
        CONTRACT_ADDRESSES.carbonToken,
        CarbonCreditTokenABI.abi,
        provider
    );
};

export const getVerificationWorkflow = async (signerOrProvider?: any) => {
    const provider = signerOrProvider || getProvider();
    return new ethers.Contract(
        CONTRACT_ADDRESSES.verificationWorkflow,
        VerificationWorkflowABI.abi,
        provider
    );
};

export const getMarketplace = async (signerOrProvider?: any) => {
    const provider = signerOrProvider || getProvider();
    return new ethers.Contract(
        CONTRACT_ADDRESSES.marketplace,
        CarbonMarketplaceABI.abi,
        provider
    );
};

// --- Project Registry Actions ---

export const registerProject = async (
    projectId: string,
    metadataURI: string,
    areaHectares: number,
    latitude: number,
    longitude: number,
    landType: LandType
) => {
    const signer = await getSigner();
    const registry = await getProjectRegistry(signer);

    // Latitude/Longitude are int32 (multiplied by 1e6 for 6 decimals on-chain)
    const latInt = Math.round(latitude * 1_000_000);
    const lngInt = Math.round(longitude * 1_000_000);

    const tx = await registry.registerProject(
        projectId,
        metadataURI,
        areaHectares,
        latInt,
        lngInt,
        landType
    );
    return await tx.wait();
};

export const getProject = async (projectId: string) => {
    const registry = await getProjectRegistry();
    return await registry.getProject(projectId);
};

export const getUserProjects = async (address: string) => {
    const registry = await getProjectRegistry();
    return await registry.getProjectsByOwner(address);
};

// --- Verification Actions ---

export const ngoVerify = async (projectId: string, dataHash: string, approve: boolean) => {
    const signer = await getSigner();
    const workflow = await getVerificationWorkflow(signer);
    const tx = await workflow.ngoVerify(projectId, dataHash, approve);
    return await tx.wait();
};

export const panchayatApprove = async (projectId: string, dataHash: string, approve: boolean) => {
    const signer = await getSigner();
    const workflow = await getVerificationWorkflow(signer);
    const tx = await workflow.panchayatApprove(projectId, dataHash, approve);
    return await tx.wait();
};

export const adminApprove = async (
    projectId: string,
    dataHash: string,
    carbonCredits: number,
    metadataURI: string,
    approve: boolean
) => {
    const signer = await getSigner();
    const workflow = await getVerificationWorkflow(signer);
    const tx = await workflow.adminApprove(projectId, dataHash, carbonCredits, metadataURI, approve);
    return await tx.wait();
};

// --- Marketplace Actions ---

export const listCredits = async (
    tokenId: number,
    amount: number,
    pricePerUnit: string,
    paymentToken: string = ethers.ZeroAddress // Default to ETH
) => {
    const signer = await getSigner();
    const marketplace = await getMarketplace(signer);
    const token = await getCarbonToken(signer);

    // Approve marketplace to transfer tokens
    const approveTx = await token.setApprovalForAll(CONTRACT_ADDRESSES.marketplace, true);
    await approveTx.wait();

    const tx = await marketplace.listCredits(tokenId, amount, ethers.parseEther(pricePerUnit), paymentToken);
    return await tx.wait();
};

export const buyCredits = async (listingId: number, amount: number, totalPrice: string, isERC20: boolean = false) => {
    const signer = await getSigner();
    const marketplace = await getMarketplace(signer);

    if (isERC20) {
        // Handle ERC20 approval here if needed, or assume pre-approved
        const tx = await marketplace.buyCredits(listingId, amount);
        return await tx.wait();
    } else {
        const tx = await marketplace.buyCredits(listingId, amount, { value: ethers.parseEther(totalPrice) });
        return await tx.wait();
    }
};

// --- Token Info ---

export const getCarbonBalance = async (address: string, tokenId: number) => {
    const token = await getCarbonToken();
    return await token.balanceOf(address, tokenId);
};

// Format helpers
export const formatCredits = (amount: bigint) => {
    return ethers.formatUnits(amount, 0);
};

export const parseCredits = (amount: string) => {
    return ethers.parseUnits(amount, 0);
};
