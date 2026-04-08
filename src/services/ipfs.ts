import axios from 'axios';

const PINATA_JWT = import.meta.env.VITE_PINATA_JWT || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlYTVkZDJkZS03YTcwLTQxNzktYTlhOC0xNjY1NmQ4NTEzYTkiLCJlbWFpbCI6ImRwcml0YW0yNzA4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiNjFkM2FhMDlhOTQ4ZGRlNzVkZSIsInNjb3BlZEtleVNlY3JldCI6ImZjNDMwZTNlMjg2OWMwMjllZjAyNzE5NDk0YTYwZjk0MTUzZTQ5NjkwYmMwODk5MTBkNGVjODM2NDg5MjhmOTQiLCJleHAiOjE3OTg3NDQzODd9.NkZkxewJeRscuAVGGzRK0hz_q1ayX9duAHeadAK0NcU';

export interface IPFSUploadResult {
    success: boolean;
    ipfsHash: string;
    ipfsUrl: string;
    gatewayUrl: string;
}

/**
 * Upload JSON metadata to IPFS via Pinata
 */
export async function uploadToIPFS(
    metadata: any,
    walletAddress: string,
    options: {
        name?: string;
        type?: string;
        keyvalues?: Record<string, any>;
    } = {}
): Promise<IPFSUploadResult> {
    try {
        const data = JSON.stringify({
            pinataContent: metadata,
            pinataMetadata: {
                name: options.name || 'CLORIT Metadata',
                keyvalues: {
                    project: 'CLORIT',
                    type: options.type || 'metadata',
                    wallet: walletAddress,
                    timestamp: new Date().toISOString(),
                    ...options.keyvalues,
                },
            },
            pinataOptions: {
                cidVersion: 1,
            },
        });

        const response = await axios.post(
            'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${PINATA_JWT}`,
                },
            }
        );

        return {
            success: true,
            ipfsHash: response.data.IpfsHash,
            ipfsUrl: `ipfs://${response.data.IpfsHash}`,
            gatewayUrl: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
        };
    } catch (error: any) {
        console.error('IPFS upload error:', error.response?.data || error.message);
        throw new Error(`Failed to upload to IPFS: ${error.message}`);
    }
}

/**
 * Create project metadata for NFT
 */
export function createProjectMetadata(projectData: any, walletAddress: string) {
    return {
        name: projectData.name || projectData.projectId,
        description: projectData.description || `Blue carbon restoration project ${projectData.projectId}`,
        image: projectData.imageUrl || '',
        external_url: `https://clorit.app/projects/${projectData.projectId}`,
        attributes: [
            { trait_type: 'Project ID', value: projectData.projectId },
            { trait_type: 'Area (Hectares)', value: projectData.areaHectares || 0, display_type: 'number' },
            { trait_type: 'Ecosystem Type', value: projectData.ecosystemType || 'Unknown' },
            { trait_type: 'Location', value: `${projectData.region}, ${projectData.state}` },
            { trait_type: 'Owner', value: walletAddress },
            { trait_type: 'Registration Date', value: new Date().toISOString(), display_type: 'date' },
        ],
        properties: {
            projectId: projectData.projectId,
            region: projectData.region,
            state: projectData.state,
            latitude: projectData.latitude,
            longitude: projectData.longitude,
            owner: walletAddress,
        },
    };
}

/**
 * Create carbon credit metadata for NFT
 */
export function createCarbonCreditMetadata(creditData: any, walletAddress: string) {
    return {
        name: `Carbon Credit - ${creditData.projectId}`,
        description: `Carbon credits from blue carbon restoration project ${creditData.projectId}. Each token represents 1 tonne of CO2e sequestered.`,
        image: creditData.imageUrl || '',
        external_url: `https://clorit.app/credits/${creditData.tokenId}`,
        attributes: [
            { trait_type: 'Project ID', value: creditData.projectId },
            { trait_type: 'Token ID', value: creditData.tokenId, display_type: 'number' },
            { trait_type: 'Total Supply', value: creditData.totalSupply || 0, display_type: 'number' },
            { trait_type: 'Vintage Year', value: new Date().getFullYear(), display_type: 'number' },
            { trait_type: 'Verification Status', value: 'ADMIN Approved' },
            { trait_type: 'Issuer', value: walletAddress },
        ],
        properties: {
            projectId: creditData.projectId,
            tokenId: creditData.tokenId,
            standard: 'ERC-1155',
            blockchain: 'Ethereum',
            vintageYear: new Date().getFullYear(),
            issuer: walletAddress,
        },
    };
}

/**
 * Upload project to IPFS and return URI
 */
export async function uploadProjectToIPFS(projectData: any, walletAddress: string): Promise<string> {
    const metadata = createProjectMetadata(projectData, walletAddress);
    const result = await uploadToIPFS(metadata, walletAddress, {
        name: `Project-${projectData.projectId}`,
        type: 'project',
        keyvalues: {
            projectId: projectData.projectId,
        },
    });
    return result.ipfsUrl;
}

/**
 * Upload carbon credit metadata to IPFS
 */
export async function uploadCarbonCreditToIPFS(creditData: any, walletAddress: string): Promise<string> {
    const metadata = createCarbonCreditMetadata(creditData, walletAddress);
    const result = await uploadToIPFS(metadata, walletAddress, {
        name: `CarbonCredit-${creditData.projectId}`,
        type: 'carbonCredit',
        keyvalues: {
            projectId: creditData.projectId,
            tokenId: creditData.tokenId?.toString(),
        },
    });
    return result.ipfsUrl;
}
