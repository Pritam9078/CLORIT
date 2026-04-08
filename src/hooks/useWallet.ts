/**
 * useWallet Hook
 * React hook for wallet state management
 */

import { useState, useEffect } from 'react';
import {
    getWalletAddress,
    onAccountsChanged,
    onChainChanged,
    removeListeners,
    isMetaMaskInstalled
} from '../services/walletService';

export interface UseWalletReturn {
    isConnected: boolean;
    address: string | null;
    chainId: number | null;
    isLoading: boolean;
    error: string | null;
    checkConnection: () => Promise<void>;
}

export const useWallet = (): UseWalletReturn => {
    const [isConnected, setIsConnected] = useState(false);
    const [address, setAddress] = useState<string | null>(null);
    const [chainId, setChainId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const checkConnection = async () => {
        try {
            setIsLoading(true);
            setError(null);

            if (!isMetaMaskInstalled()) {
                setIsConnected(false);
                setAddress(null);
                setIsLoading(false);
                return;
            }

            const walletAddress = await getWalletAddress();

            if (walletAddress) {
                setIsConnected(true);
                setAddress(walletAddress);

                // Get chain ID
                const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
                setChainId(parseInt(currentChainId, 16));
            } else {
                setIsConnected(false);
                setAddress(null);
            }
        } catch (err: any) {
            console.error('Error checking wallet connection:', err);
            setError(err.message);
            setIsConnected(false);
            setAddress(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkConnection();

        // Listen for account changes
        const handleAccountsChanged = (accounts: string[]) => {
            if (accounts.length === 0) {
                setIsConnected(false);
                setAddress(null);
            } else {
                setIsConnected(true);
                setAddress(accounts[0]);
            }
        };

        // Listen for chain changes
        const handleChainChanged = (newChainId: string) => {
            setChainId(parseInt(newChainId, 16));
            // Reload page on chain change (recommended by MetaMask)
            window.location.reload();
        };

        onAccountsChanged(handleAccountsChanged);
        onChainChanged(handleChainChanged);

        // Cleanup
        return () => {
            removeListeners();
        };
    }, []);

    return {
        isConnected,
        address,
        chainId,
        isLoading,
        error,
        checkConnection
    };
};

export default useWallet;
