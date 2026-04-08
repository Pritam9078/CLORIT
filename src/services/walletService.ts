/**
 * Wallet Service
 * Handles MetaMask connection, signatures, and wallet state
 */

declare global {
    interface Window {
        ethereum?: any;
    }
}

export interface WalletState {
    isConnected: boolean;
    address: string | null;
    chainId: number | null;
}

/**
 * Check if MetaMask is installed
 */
export const isMetaMaskInstalled = (): boolean => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
};

/**
 * Connect to MetaMask wallet
 */
export const connectWallet = async (): Promise<string> => {
    if (!isMetaMaskInstalled()) {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
    }

    try {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        if (!accounts || accounts.length === 0) {
            throw new Error('No accounts found. Please unlock MetaMask.');
        }

        return accounts[0];
    } catch (error: any) {
        if (error.code === 4001) {
            throw new Error('Connection rejected. Please approve the connection request.');
        }
        throw error;
    }
};

/**
 * Get current connected wallet address
 */
export const getWalletAddress = async (): Promise<string | null> => {
    if (!isMetaMaskInstalled()) {
        return null;
    }

    try {
        const accounts = await window.ethereum.request({
            method: 'eth_accounts'
        });
        return accounts && accounts.length > 0 ? accounts[0] : null;
    } catch (error) {
        console.error('Error getting wallet address:', error);
        return null;
    }
};

/**
 * Sign a message with the connected wallet
 */
export const signMessage = async (message: string, address: string): Promise<string> => {
    if (!isMetaMaskInstalled()) {
        throw new Error('MetaMask is not installed');
    }

    try {
        const signature = await window.ethereum.request({
            method: 'personal_sign',
            params: [message, address]
        });

        return signature;
    } catch (error: any) {
        if (error.code === 4001) {
            throw new Error('Signature rejected. Please approve the signature request.');
        }
        throw error;
    }
};

/**
 * Get current chain ID
 */
export const getChainId = async (): Promise<number | null> => {
    if (!isMetaMaskInstalled()) {
        return null;
    }

    try {
        const chainId = await window.ethereum.request({
            method: 'eth_chainId'
        });
        return parseInt(chainId, 16);
    } catch (error) {
        console.error('Error getting chain ID:', error);
        return null;
    }
};

/**
 * Shorten wallet address for display
 */
export const shortenAddress = (address: string): string => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

/**
 * Listen for account changes
 */
export const onAccountsChanged = (callback: (accounts: string[]) => void): void => {
    if (isMetaMaskInstalled()) {
        window.ethereum.on('accountsChanged', callback);
    }
};

/**
 * Listen for chain changes
 */
export const onChainChanged = (callback: (chainId: string) => void): void => {
    if (isMetaMaskInstalled()) {
        window.ethereum.on('chainChanged', callback);
    }
};

/**
 * Remove event listeners
 */
export const removeListeners = (): void => {
    if (isMetaMaskInstalled()) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
    }
};

/**
 * Disconnect wallet (clear local state)
 */
export const disconnectWallet = (): void => {
    // MetaMask doesn't have a programmatic disconnect
    // We just clear our local state
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userProfile');
};

export default {
    isMetaMaskInstalled,
    connectWallet,
    getWalletAddress,
    signMessage,
    getChainId,
    shortenAddress,
    onAccountsChanged,
    onChainChanged,
    removeListeners,
    disconnectWallet
};
