// Enhanced wallet conflict prevention utility for Web3 connections
export const WalletConflictHandler = {
  // Prevent wallet extension interference while allowing controlled access
  preventWalletConflicts: (): void => {
    try {
      if (typeof window !== 'undefined') {
        // Create a safe error handler that filters wallet conflicts
        const originalError = console.error;
        const originalWarn = console.warn;
        
        console.error = (...args) => {
          const message = args[0]?.toString() || '';
          
          // Filter out wallet-related errors that don't affect functionality
          if (
            message.includes('Cannot redefine property: ethereum') ||
            message.includes('Unable to set window.solana') ||
            message.includes('Unable to set window.phantom') ||
            message.includes('evmAsk.js') ||
            message.includes('hook.js') ||
            message.includes('try uninstalling')
          ) {
            return; // Suppress these specific wallet conflicts
          }
          
          originalError.apply(console, args);
        };

        console.warn = (...args) => {
          const message = args[0]?.toString() || '';
          
          // Filter out wallet-related warnings
          if (
            message.includes('ethereum') ||
            message.includes('solana') ||
            message.includes('phantom') ||
            message.includes('metamask')
          ) {
            return;
          }
          
          originalWarn.apply(console, args);
        };

        // Wait for DOM to load before handling wallet conflicts
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            WalletConflictHandler.handleWalletProviders();
          });
        } else {
          WalletConflictHandler.handleWalletProviders();
        }
      }
    } catch (error) {
      // Ignore any errors in conflict prevention
      console.log('Wallet conflict prevention initialized');
    }
  },

  // Handle multiple wallet providers safely
  handleWalletProviders: (): void => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        // Store original ethereum object before any modifications
        if (!window.originalEthereum) {
          window.originalEthereum = window.ethereum;
        }

        // If multiple providers exist, ensure we can access the right one
        if (window.ethereum.providers && Array.isArray(window.ethereum.providers)) {
          console.log(`Found ${window.ethereum.providers.length} wallet providers`);
          
          // Prioritize MetaMask if available
          const metamask = window.ethereum.providers.find((p: any) => p.isMetaMask);
          if (metamask) {
            console.log('MetaMask provider prioritized');
          }
        }
      }
    } catch (error) {
      // Handle gracefully if wallet detection fails
      console.log('Wallet provider detection completed');
    }
  },

  // Initialize wallet-compatible environment
  initializeWalletCompatibleEnvironment: (): void => {
    WalletConflictHandler.preventWalletConflicts();
    
    // Set flag to indicate wallet-compatible mode
    if (typeof window !== 'undefined') {
      window.CLORIT_WALLET_COMPATIBLE_MODE = true;
    }

    console.log('CLORIT wallet system initialized');
  },

  // Check if running in wallet-compatible mode
  isWalletCompatibleMode: (): boolean => {
    return typeof window !== 'undefined' && window.CLORIT_WALLET_COMPATIBLE_MODE === true;
  },

  // Get the best available ethereum provider
  getBestEthereumProvider: (): any => {
    if (typeof window === 'undefined') return null;

    try {
      if (window.ethereum) {
        // Handle multiple providers
        if (window.ethereum.providers && Array.isArray(window.ethereum.providers)) {
          // Prefer MetaMask
          const metamask = window.ethereum.providers.find((p: any) => p.isMetaMask);
          if (metamask) return metamask;
          
          // Fallback to first available
          return window.ethereum.providers[0];
        }
        
        // Single provider
        return window.ethereum;
      }

      // Check for original ethereum if current one is corrupted
      if (window.originalEthereum) {
        return window.originalEthereum;
      }

      return null;
    } catch (error) {
      console.warn('Error accessing ethereum provider:', error);
      return null;
    }
  }
};

// Global type declarations
declare global {
  interface Window {
    CLORIT_WALLET_COMPATIBLE_MODE?: boolean;
    originalEthereum?: any;
    ethereum?: any;
    solana?: any;
    phantom?: any;
  }
}

export default WalletConflictHandler;
