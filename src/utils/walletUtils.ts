// Enhanced Web3 wallet utilities with conflict resolution
export interface WalletState {
  isConnected: boolean;
  address: string;
  chainId: string;
  balance?: string;
  error?: string;
  success?: boolean;
  provider?: any;
}

interface WalletConnectionResult {
  success: boolean;
  address?: string;
  provider?: any;
  error?: string;
  chainId?: string;
}

export interface TransactionResult {
  hash: string;
  status: 'pending' | 'success' | 'failed';
  blockNumber?: number;
}

declare global {
  interface Window {
    ethereum?: any;
    solana?: any;
    phantom?: any;
    coinbaseWalletExtension?: any;
  }
}

// Enhanced WalletUtils with conflict resolution
export const WalletUtils = {
  // Safely get ethereum provider with conflict resolution
  getEthereumProvider: (): any => {
    if (typeof window === 'undefined') return null;
    
    try {
      // Handle multiple wallet providers
      if (window.ethereum) {
        // If multiple providers exist, prefer MetaMask
        if (window.ethereum.providers) {
          const metamask = window.ethereum.providers.find((p: any) => p.isMetaMask);
          if (metamask) return metamask;
          return window.ethereum.providers[0];
        }
        
        // Single provider
        return window.ethereum;
      }
      
      return null;
    } catch (error) {
      console.warn('Error accessing ethereum provider:', error);
      return null;
    }
  },

  // Check if any Web3 wallet is available
  isWalletAvailable: (): boolean => {
    const provider = WalletUtils.getEthereumProvider();
    return provider !== null;
  },

  // Detect wallet type
  detectWalletType: (): string => {
    const provider = WalletUtils.getEthereumProvider();
    if (!provider) return 'none';
    
    if (provider.isMetaMask) return 'MetaMask';
    if (provider.isCoinbaseWallet) return 'Coinbase Wallet';
    if (provider.isPhantom) return 'Phantom';
    return 'Unknown Wallet';
  },

  // Check if MetaMask is available
  isMetaMaskAvailable: (): boolean => {
    if (typeof window === 'undefined') return false;
    
    try {
      const provider = WalletUtils.getEthereumProvider();
      return provider?.isMetaMask === true;
    } catch (error) {
      return false;
    }
  },

  // Check if Coinbase Wallet is available
  isCoinbaseWalletAvailable: (): boolean => {
    if (typeof window === 'undefined') return false;
    
    try {
      const provider = WalletUtils.getEthereumProvider();
      return provider?.isCoinbaseWallet === true || provider?.selectedProvider?.isCoinbaseWallet === true;
    } catch (error) {
      return false;
    }
  },

  // Check if Phantom is available
  isPhantomAvailable: (): boolean => {
    if (typeof window === 'undefined') return false;
    
    try {
      return window.phantom?.solana?.isPhantom === true;
    } catch (error) {
      return false;
    }
  },

  // Enhanced wallet connection with conflict handling
  // Connect to wallet with enhanced error handling and conflict resolution
  connectWallet: async (walletType?: 'metamask' | 'coinbase' | 'phantom'): Promise<WalletConnectionResult> => {
    try {
      const provider = WalletUtils.getEthereumProvider();
      
      if (!provider) {
        return {
          success: false,
          error: 'No Ethereum provider found. Please install MetaMask, Coinbase Wallet, or another Web3 wallet.'
        };
      }

      // Request account access with timeout
      const accounts = await Promise.race([
        provider.request({ method: 'eth_requestAccounts' }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Connection timeout')), 10000)
        )
      ]) as string[];

      if (!accounts || accounts.length === 0) {
        return {
          success: false,
          error: 'No accounts found. Please unlock your wallet and try again.'
        };
      }

      const address = accounts[0];
      
      // Get chain ID
      let chainId = '0x1'; // Default to Ethereum mainnet
      try {
        chainId = await provider.request({ method: 'eth_chainId' });
      } catch (error) {
        console.warn('Failed to get chain ID:', error);
      }

      // Store connection state
      localStorage.setItem('CLORIT_WALLET_CONNECTED', 'true');
      localStorage.setItem('CLORIT_WALLET_ADDRESS', address);
      localStorage.setItem('CLORIT_WALLET_CHAIN_ID', chainId);

      return {
        success: true,
        address,
        provider,
        chainId
      };

    } catch (error: any) {
      console.error('Wallet connection error:', error);
      
      let errorMessage = 'Failed to connect wallet';
      
      if (error.message?.includes('User rejected')) {
        errorMessage = 'Connection rejected by user';
      } else if (error.message?.includes('timeout')) {
        errorMessage = 'Connection timeout. Please try again.';
      } else if (error.message?.includes('ethereum')) {
        errorMessage = 'Wallet provider conflict detected. Please refresh and try again.';
      }

      return {
        success: false,
        error: errorMessage
      };
    }
  },

  // Disconnect wallet
  disconnectWallet: (): void => {
    localStorage.removeItem('walletState');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletConnected');
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

  // Check if wallet is connected
  isConnected: (): boolean => {
    return localStorage.getItem('walletConnected') === 'true';
  },

  // Switch to Sepolia testnet
  switchToSepolia: async (): Promise<void> => {
    const provider = WalletUtils.getEthereumProvider();
    if (!provider) throw new Error('No wallet provider found');

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }], // Sepolia testnet
      });
    } catch (switchError: any) {
      // Chain might not be added, try to add it
      if (switchError.code === 4902) {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0xaa36a7',
            chainName: 'Sepolia Test Network',
            nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
            rpcUrls: ['https://sepolia.infura.io/v3/'],
            blockExplorerUrls: ['https://sepolia.etherscan.io/']
          }],
        });
      } else {
        throw switchError;
      }
    }
  },

  // Add event listeners
  onAccountChange: (callback: (accounts: string[]) => void): void => {
    const provider = WalletUtils.getEthereumProvider();
    if (provider) {
      provider.on('accountsChanged', callback);
    }
  },

  onChainChange: (callback: (chainId: string) => void): void => {
    const provider = WalletUtils.getEthereumProvider();
    if (provider) {
      provider.on('chainChanged', callback);
    }
  },

  // Remove all listeners
  removeListeners: (): void => {
    const provider = WalletUtils.getEthereumProvider();
    if (provider) {
      provider.removeAllListeners();
    }
  },

  // Format address for display
  formatAddress: (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  },

  // Convert wei to ETH
  weiToEth: (wei: string): string => {
    return (parseInt(wei, 16) / Math.pow(10, 18)).toFixed(4);
  }
};
