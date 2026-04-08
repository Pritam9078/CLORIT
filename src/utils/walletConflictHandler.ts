/**
 * Wallet Conflict Handler
 * Ensures MetaMask is used for Ethereum transactions, not Phantom (Solana wallet)
 */

// Declare window extensions
declare global {
  interface Window {
    ethereum?: any;
    solana?: any;
    phantom?: any;
  }
}

/**
 * Check if MetaMask is installed and available
 */
export const isMetaMaskAvailable = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    window.ethereum.isMetaMask === true
  );
};

/**
 * Disable Phantom wallet interference
 * This prevents Phantom from intercepting Ethereum requests
 */
export const disablePhantomInterference = (): void => {
  if (typeof window !== 'undefined' && window.solana) {
    console.warn('Phantom wallet detected. Using MetaMask for Ethereum transactions.');

    // Store original solana object
    const originalSolana = window.solana;

    // Temporarily disable window.solana during Ethereum operations
    Object.defineProperty(window, 'solana', {
      get: () => undefined,
      configurable: true
    });

    // Restore after a short delay
    setTimeout(() => {
      Object.defineProperty(window, 'solana', {
        get: () => originalSolana,
        configurable: true
      });
    }, 1000);
  }
};

/**
 * Get MetaMask provider safely
 */
export const getMetaMaskProvider = (): any => {
  if (!isMetaMaskAvailable()) {
    throw new Error('MetaMask is not installed or not available');
  }

  // Ensure we're using MetaMask, not Phantom
  if (window.ethereum.isMetaMask) {
    return window.ethereum;
  }

  // If multiple wallets are installed, find MetaMask
  if (window.ethereum.providers) {
    const metamask = window.ethereum.providers.find((p: any) => p.isMetaMask);
    if (metamask) {
      return metamask;
    }
  }

  throw new Error('MetaMask provider not found');
};

/**
 * Request MetaMask accounts
 */
export const requestMetaMaskAccounts = async (): Promise<string[]> => {
  try {
    disablePhantomInterference();
    const provider = getMetaMaskProvider();
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    return accounts;
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error('User rejected the connection request');
    }
    throw error;
  }
};

/**
 * Sign message with MetaMask
 */
export const signMessageWithMetaMask = async (
  message: string,
  address: string
): Promise<string> => {
  try {
    disablePhantomInterference();
    const provider = getMetaMaskProvider();
    const signature = await provider.request({
      method: 'personal_sign',
      params: [message, address]
    });
    return signature;
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error('User rejected the signature request');
    }
    throw error;
  }
};

/**
 * Show wallet installation guide
 */
export const showWalletGuide = (): void => {
  const hasPhantom = typeof window !== 'undefined' && window.solana;
  const hasMetaMask = isMetaMaskAvailable();

  let message = '';

  if (!hasMetaMask && hasPhantom) {
    message = `⚠️ Phantom wallet detected, but MetaMask is required for CLORIT.

Please install MetaMask:
1. Visit https://metamask.io
2. Install the browser extension
3. Create or import a wallet
4. Refresh this page

Note: You can keep Phantom installed for Solana transactions.`;
  } else if (!hasMetaMask) {
    message = `⚠️ MetaMask is required for CLORIT.

Please install MetaMask:
1. Visit https://metamask.io
2. Install the browser extension
3. Create or import a wallet
4. Refresh this page`;
  }

  if (message) {
    alert(message);
  }
};

/**
 * Initialize wallet-compatible environment
 * Sets up the environment to work with MetaMask and handle Phantom conflicts
 */
export const initializeWalletCompatibleEnvironment = (): void => {
  if (typeof window === 'undefined') return;

  // Log wallet detection
  console.log('Initializing wallet environment...');

  if (window.ethereum?.isMetaMask) {
    console.log('✅ MetaMask detected');
  }

  if (window.solana) {
    console.log('⚠️ Phantom wallet detected - will use MetaMask for Ethereum transactions');
  }

  // Suppress Phantom warnings/errors in console
  const originalConsoleWarn = console.warn;
  console.warn = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    if (message.includes('window.solana') || message.includes('Phantom')) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };

  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    if (
      message.includes('window.solana') ||
      message.includes('Phantom') ||
      message.includes('solanaActionsContentScript') ||
      message.includes('installHook.js')
    ) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
};

export const WalletConflictHandler = {
  isMetaMaskAvailable,
  disablePhantomInterference,
  getMetaMaskProvider,
  requestMetaMaskAccounts,
  signMessageWithMetaMask,
  showWalletGuide,
  initializeWalletCompatibleEnvironment
};

export default WalletConflictHandler;
