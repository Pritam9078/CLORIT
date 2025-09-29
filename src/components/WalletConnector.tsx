import React, { useState, useEffect } from 'react';
import { WalletUtils } from '../utils/walletUtils';
import { WalletConflictHandler } from '../utils/walletConflictHandler';

interface WalletConnectorProps {
  onConnect?: (address: string, provider: any) => void;
  onDisconnect?: () => void;
  className?: string;
}

interface WalletState {
  isConnected: boolean;
  address: string;
  provider: any;
  isConnecting: boolean;
  error: string | null;
  availableWallets: string[];
}

export const WalletConnector: React.FC<WalletConnectorProps> = ({
  onConnect,
  onDisconnect,
  className = ''
}) => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: '',
    provider: null,
    isConnecting: false,
    error: null,
    availableWallets: []
  });

  useEffect(() => {
    // Initialize wallet-compatible environment
    WalletConflictHandler.initializeWalletCompatibleEnvironment();
    
    // Check for available wallets
    checkAvailableWallets();
    
    // Check for existing connection
    checkExistingConnection();
  }, []);

  const checkAvailableWallets = async () => {
    try {
      const available = [];
      
      // Check for MetaMask
      if (WalletUtils.isMetaMaskAvailable()) {
        available.push('MetaMask');
      }
      
      // Check for Coinbase
      if (WalletUtils.isCoinbaseWalletAvailable()) {
        available.push('Coinbase Wallet');
      }
      
      // Check for Phantom
      if (WalletUtils.isPhantomAvailable()) {
        available.push('Phantom');
      }

      setWalletState(prev => ({
        ...prev,
        availableWallets: available
      }));
    } catch (error) {
      console.warn('Error checking available wallets:', error);
    }
  };

  const checkExistingConnection = async () => {
    try {
      const provider = WalletUtils.getEthereumProvider();
      if (provider) {
        const accounts = await provider.request({ method: 'eth_accounts' });
        if (accounts && accounts.length > 0) {
          setWalletState(prev => ({
            ...prev,
            isConnected: true,
            address: accounts[0],
            provider
          }));
          onConnect?.(accounts[0], provider);
        }
      }
    } catch (error) {
      console.warn('Error checking existing connection:', error);
    }
  };

  const connectWallet = async (walletType?: 'metamask' | 'coinbase' | 'phantom') => {
    setWalletState(prev => ({
      ...prev,
      isConnecting: true,
      error: null
    }));

    try {
      const result = await WalletUtils.connectWallet(walletType);
      
      if (result.success && result.address && result.provider) {
        setWalletState(prev => ({
          ...prev,
          isConnected: true,
          address: result.address,
          provider: result.provider,
          isConnecting: false,
          error: null
        }));
        
        onConnect?.(result.address, result.provider);
      } else {
        throw new Error(result.error || 'Failed to connect wallet');
      }
    } catch (error: any) {
      setWalletState(prev => ({
        ...prev,
        isConnecting: false,
        error: error.message || 'Failed to connect wallet'
      }));
    }
  };

  const disconnectWallet = async () => {
    try {
      await WalletUtils.disconnectWallet();
      
      setWalletState(prev => ({
        ...prev,
        isConnected: false,
        address: '',
        provider: null,
        error: null
      }));
      
      onDisconnect?.();
    } catch (error: any) {
      setWalletState(prev => ({
        ...prev,
        error: error.message || 'Failed to disconnect wallet'
      }));
    }
  };

  const formatAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (walletState.availableWallets.length === 0) {
    return (
      <div className={`bg-yellow-50 border border-yellow-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center">
          <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-yellow-800">
            No Web3 wallets detected. Please install MetaMask, Coinbase Wallet, or Phantom.
          </span>
        </div>
      </div>
    );
  }

  if (walletState.isConnected) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-green-800">Wallet Connected</p>
              <p className="text-xs text-green-600">{formatAddress(walletState.address)}</p>
            </div>
          </div>
          <button
            onClick={disconnectWallet}
            className="text-sm text-green-700 hover:text-green-900 font-medium"
          >
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Connect Wallet</h3>
      
      {walletState.error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <p className="text-sm text-red-600">{walletState.error}</p>
        </div>
      )}

      <div className="space-y-3">
        {walletState.availableWallets.includes('MetaMask') && (
          <button
            onClick={() => connectWallet('metamask')}
            disabled={walletState.isConnecting}
            className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                </svg>
              </div>
              <span className="font-medium text-gray-900">MetaMask</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {walletState.availableWallets.includes('Coinbase Wallet') && (
          <button
            onClick={() => connectWallet('coinbase')}
            disabled={walletState.isConnecting}
            className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                </svg>
              </div>
              <span className="font-medium text-gray-900">Coinbase Wallet</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {walletState.availableWallets.includes('Phantom') && (
          <button
            onClick={() => connectWallet('phantom')}
            disabled={walletState.isConnecting}
            className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                </svg>
              </div>
              <span className="font-medium text-gray-900">Phantom</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {walletState.isConnecting && (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Connecting...</span>
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p>By connecting a wallet, you agree to the Terms of Service and Privacy Policy.</p>
      </div>
    </div>
  );
};

export default WalletConnector;
