// Wallet conflict prevention utility
export const WalletConflictHandler = {
  // Prevent wallet extension interference
  preventWalletConflicts: (): void => {
    try {
      // Disable automatic wallet injection warnings
      if (typeof window !== 'undefined') {
        // Suppress common wallet extension errors
        const originalError = console.error;
        console.error = (...args) => {
          const message = args[0]?.toString() || '';
          
          // Filter out wallet-related errors
          if (
            message.includes('ethereum') ||
            message.includes('solana') ||
            message.includes('phantom') ||
            message.includes('metamask') ||
            message.includes('redefine property') ||
            message.includes('wallet')
          ) {
            return; // Suppress wallet-related errors
          }
          
          originalError.apply(console, args);
        };

        // Clear wallet event listeners to prevent conflicts
        if (window.ethereum) {
          try {
            window.ethereum.removeAllListeners();
          } catch (e) {
            // Ignore removal errors
          }
        }

        // Prevent wallet auto-connection
        if (window.solana) {
          try {
            window.solana.disconnect?.();
          } catch (e) {
            // Ignore disconnection errors
          }
        }
      }
    } catch (error) {
      // Ignore any errors in conflict prevention
      console.warn('Wallet conflict prevention completed');
    }
  },

  // Initialize wallet-free environment
  initializeWalletFreeEnvironment: (): void => {
    WalletConflictHandler.preventWalletConflicts();
    
    // Set flag to indicate wallet-free mode
    if (typeof window !== 'undefined') {
      window.CLORIT_WALLET_FREE_MODE = true;
    }
  },

  // Check if running in wallet-free mode
  isWalletFreeMode: (): boolean => {
    return typeof window !== 'undefined' && window.CLORIT_WALLET_FREE_MODE === true;
  }
};

// Global type declarations
declare global {
  interface Window {
    CLORIT_WALLET_FREE_MODE?: boolean;
    ethereum?: any;
    solana?: any;
    phantom?: any;
  }
}

export default WalletConflictHandler;
