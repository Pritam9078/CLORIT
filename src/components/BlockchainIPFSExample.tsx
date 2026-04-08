import React, { useState } from 'react';
import { ethers } from 'ethers';
import * as blockchain from '@/services/blockchain';
import { uploadProjectToIPFS, uploadCarbonCreditToIPFS } from '@/services/ipfs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { WalletUtils } from '../utils/walletUtils';

// Declare window.ethereum for TypeScript
declare global {
    interface Window {
        ethereum?: any;
    }
}

/**
 * Example component showing end-to-end flow:
 * 1. User connects wallet
 * 2. Upload project metadata to IPFS (tagged with wallet)
 * 3. Register project on blockchain
 * 4. Verify project through workflow
 * 5. Mint carbon credits with IPFS metadata
 */
export function BlockchainIPFSExample() {
    const [walletAddress, setWalletAddress] = useState<string>('');
    const [projectData, setProjectData] = useState({
        projectId: '',
        name: '',
        description: '',
        areaHectares: 0,
        region: '',
        state: '',
    });
    const [loading, setLoading] = useState(false);

    // Step 1: Connect Wallet
    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                toast.error('Please install MetaMask');
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            setWalletAddress(address);
            toast.success(`Connected: ${WalletUtils.formatAddress(address)}`);
        } catch (error: any) {
            toast.error(`Connection failed: ${error.message}`);
        }
    };

    // Step 2: Register Project (IPFS + Blockchain)
    const registerProject = async () => {
        if (!walletAddress) {
            toast.error('Please connect wallet first');
            return;
        }

        setLoading(true);
        try {
            // 1. Upload metadata to IPFS (tagged with user's wallet)
            toast.info('Uploading to IPFS...');
            const ipfsUri = await uploadProjectToIPFS(projectData, walletAddress);
            toast.success(`IPFS: ${ipfsUri}`);

            // 2. Register on blockchain
            toast.info('Registering on blockchain...');
            const receipt = await blockchain.registerProject(
                projectData.projectId,
                ipfsUri,
                projectData.areaHectares
            );

            toast.success('Project registered successfully!');
            console.log('Transaction:', receipt);

            // 3. Save to backend database
            await fetch('http://localhost:5001/api/admin/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...projectData,
                    walletAddress,
                    ipfsUri,
                    txHash: receipt.hash,
                }),
            });

        } catch (error: any) {
            toast.error(`Registration failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Verify Project (NGO)
    const verifyAsNGO = async () => {
        setLoading(true);
        try {
            const signer = await blockchain.getSigner();
            const workflow = await blockchain.getVerificationWorkflow(signer);

            toast.info('Submitting NGO verification...');
            const tx = await workflow.ngoVerify(
                projectData.projectId,
                'ipfs://QmVerificationData...',
                true // approve
            );

            await tx.wait();
            toast.success('NGO verification submitted!');
        } catch (error: any) {
            toast.error(`Verification failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Step 4: Mint Carbon Credits
    const mintCredits = async () => {
        setLoading(true);
        try {
            // 1. Create carbon credit metadata
            const creditData = {
                projectId: projectData.projectId,
                tokenId: 1, // Will be assigned by contract
                totalSupply: 1000,
                imageUrl: 'https://example.com/credit-image.png',
            };

            // 2. Upload to IPFS (tagged with wallet)
            toast.info('Uploading credit metadata to IPFS...');
            const creditUri = await uploadCarbonCreditToIPFS(creditData, walletAddress);

            // 3. Mint via ADMIN approval (includes credit creation)
            toast.info('Minting carbon credits...');
            const signer = await blockchain.getSigner();
            const workflow = await blockchain.getVerificationWorkflow(signer);

            const tx = await workflow.adminApprove(
                projectData.projectId,
                'ipfs://QmADMINData...',
                1000, // 1000 credits
                creditUri,
                true // approve
            );

            await tx.wait();
            toast.success('Carbon credits minted!');
        } catch (error: any) {
            toast.error(`Minting failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Blockchain + IPFS Integration</h2>

                {/* Wallet Connection */}
                <div className="mb-6">
                    {!walletAddress ? (
                        <Button onClick={connectWallet}>Connect Wallet</Button>
                    ) : (
                        <div className="text-sm text-green-600">
                            Connected: {WalletUtils.formatAddress(walletAddress)}
                        </div>
                    )}
                </div>

                {/* Project Form */}
                <div className="space-y-4">
                    <Input
                        placeholder="Project ID (e.g., PRJ-001)"
                        value={projectData.projectId}
                        onChange={(e) => setProjectData({ ...projectData, projectId: e.target.value })}
                    />
                    <Input
                        placeholder="Project Name"
                        value={projectData.name}
                        onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                    />
                    <Textarea
                        placeholder="Description"
                        value={projectData.description}
                        onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                    />
                    <Input
                        type="number"
                        placeholder="Area (Hectares)"
                        value={projectData.areaHectares || ''}
                        onChange={(e) => setProjectData({ ...projectData, areaHectares: Number(e.target.value) })}
                    />
                    <Input
                        placeholder="Region"
                        value={projectData.region}
                        onChange={(e) => setProjectData({ ...projectData, region: e.target.value })}
                    />
                    <Input
                        placeholder="State"
                        value={projectData.state}
                        onChange={(e) => setProjectData({ ...projectData, state: e.target.value })}
                    />
                </div>

                {/* Actions */}
                <div className="mt-6 space-x-4">
                    <Button onClick={registerProject} disabled={loading || !walletAddress}>
                        {loading ? 'Processing...' : '1. Register Project'}
                    </Button>
                    <Button onClick={verifyAsNGO} disabled={loading || !walletAddress} variant="outline">
                        2. NGO Verify
                    </Button>
                    <Button onClick={mintCredits} disabled={loading || !walletAddress} variant="outline">
                        3. Mint Credits
                    </Button>
                </div>

                {/* Info */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm">
                    <h3 className="font-semibold mb-2">How it works:</h3>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>Connect your wallet (MetaMask)</li>
                        <li>Fill in project details</li>
                        <li>Click "Register Project" - uploads to IPFS (tagged with your wallet) then registers on blockchain</li>
                        <li>NGO verifies the project</li>
                        <li>Panchayat approves (similar flow)</li>
                        <li>ADMIN approves and mints carbon credits (with IPFS metadata)</li>
                    </ol>
                    <p className="mt-2 text-xs text-gray-600">
                        All IPFS uploads are automatically tagged with your wallet address for proper attribution.
                    </p>
                </div>
            </Card>
        </div>
    );
}
