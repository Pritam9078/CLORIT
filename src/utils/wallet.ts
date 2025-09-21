// Wallet integration utilities
export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string;
  chainId: number | null;
}

export interface TransactionResult {
  hash: string;
  status: 'pending' | 'success' | 'failed';
  blockNumber?: number;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const WalletUtils = {
  // Check if MetaMask is installed
  isMetaMaskInstalled: (): boolean => {
    return typeof window.ethereum !== 'undefined';
  },

  // Connect to MetaMask
  connectWallet: async (): Promise<WalletState> => {
    if (!WalletUtils.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found. Please check your MetaMask wallet.');
      }

      const address = accounts[0];
      
      // Get balance
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      });

      // Get chain ID
      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      const walletState: WalletState = {
        isConnected: true,
        address,
        balance: (parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4), // Convert wei to ETH
        chainId: parseInt(chainId, 16),
      };

      // Save to localStorage
      localStorage.setItem('walletState', JSON.stringify(walletState));
      localStorage.setItem('walletAddress', address);

      return walletState;
    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      throw new Error(error.message || 'Failed to connect wallet');
    }
  },

  // Disconnect wallet
  disconnectWallet: (): void => {
    localStorage.removeItem('walletState');
    localStorage.removeItem('walletAddress');
  },

  // Get current wallet state
  getWalletState: (): WalletState | null => {
    try {
      const walletState = localStorage.getItem('walletState');
      return walletState ? JSON.parse(walletState) : null;
    } catch {
      return null;
    }
  },

  // Switch to testnet (Sepolia)
  switchToSepolia: async (): Promise<void> => {
    if (!WalletUtils.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }], // Sepolia testnet
      });
    } catch (error: any) {
      // If the chain hasn't been added to MetaMask, add it
      if (error.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0xaa36a7',
              chainName: 'Sepolia test network',
              rpcUrls: ['https://sepolia.infura.io/v3/'],
              nativeCurrency: {
                name: 'Sepolia ETH',
                symbol: 'SEP',
                decimals: 18,
              },
              blockExplorerUrls: ['https://sepolia.etherscan.io'],
            },
          ],
        });
      } else {
        throw error;
      }
    }
  },

  // Listen for account changes
  onAccountChange: (callback: (accounts: string[]) => void): void => {
    if (WalletUtils.isMetaMaskInstalled()) {
      window.ethereum.on('accountsChanged', callback);
    }
  },

  // Listen for chain changes
  onChainChange: (callback: (chainId: string) => void): void => {
    if (WalletUtils.isMetaMaskInstalled()) {
      window.ethereum.on('chainChanged', callback);
    }
  },

  // Remove listeners
  removeListeners: (): void => {
    if (WalletUtils.isMetaMaskInstalled()) {
      window.ethereum.removeAllListeners('accountsChanged');
      window.ethereum.removeAllListeners('chainChanged');
    }
  },

  // Format address for display
  formatAddress: (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  },

  // Mock transaction for carbon credit operations
  sendTransaction: async (to: string, value: string, data?: string): Promise<TransactionResult> => {
    if (!WalletUtils.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed');
    }

    try {
      const transactionHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            to,
            value: `0x${(parseFloat(value) * Math.pow(10, 18)).toString(16)}`, // Convert ETH to wei
            data: data || '0x',
          },
        ],
      });

      return {
        hash: transactionHash,
        status: 'pending',
      };
    } catch (error: any) {
      console.error('Transaction failed:', error);
      throw new Error(error.message || 'Transaction failed');
    }
  },
};
