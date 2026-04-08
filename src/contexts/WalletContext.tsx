import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { WalletUtils } from '../utils/walletUtils';
import { WalletConflictHandler } from '../utils/walletConflictHandler';
import { api } from '../lib/api';

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  provider: any | null;
  signer: ethers.Signer | null;
  chainId: string | null;
  isConnecting: boolean;
  isLoggingIn: boolean;
  isAuthenticated: boolean;
  error: string | null;
  availableWallets: string[];
}

interface WalletContextValue extends WalletState {
  connect: (walletType?: 'metamask' | 'coinbase' | 'phantom') => Promise<void>;
  disconnect: () => void;
  switchToSepolia: () => Promise<void>;
  signMessage: (message: string) => Promise<string>;
  login: () => Promise<void>;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<WalletState>({
    isConnected: false,
    address: null,
    provider: null,
    signer: null,
    chainId: null,
    isConnecting: false,
    isLoggingIn: false,
    isAuthenticated: !!api.getToken(),
    error: null,
    availableWallets: []
  });

  const updateWalletState = useCallback(async (provider: any) => {
    try {
      const browserProvider = new ethers.BrowserProvider(provider);
      const signer = await browserProvider.getSigner();
      const address = await signer.getAddress();
      const network = await browserProvider.getNetwork();
      const chainId = '0x' + network.chainId.toString(16);

      setState(prev => ({
        ...prev,
        isConnected: true,
        address,
        provider,
        signer,
        chainId,
        error: null,
        isConnecting: false
      }));
    } catch (err: any) {
      console.warn('Failed to update wallet state:', err);
      setState(prev => ({ ...prev, error: err.message, isConnecting: false }));
    }
  }, []);

  const detectAvailableWallets = useCallback(() => {
    try {
      const available: string[] = [];
      if (WalletUtils.isMetaMaskAvailable()) available.push('MetaMask');
      if (WalletUtils.isCoinbaseWalletAvailable()) available.push('Coinbase Wallet');
      if (WalletUtils.isPhantomAvailable()) available.push('Phantom');
      setState(prev => ({ ...prev, availableWallets: available }));
    } catch (err) {
      console.warn('detectAvailableWallets error', err);
    }
  }, []);

  const checkExistingConnection = useCallback(async () => {
    try {
      const provider = WalletUtils.getEthereumProvider();
      if (provider && typeof provider.request === 'function') {
        const accounts = await provider.request({ method: 'eth_accounts' });
        if (accounts && accounts.length > 0) {
          await updateWalletState(provider);
          attachListeners(provider);
        }
      }
    } catch (err) {
      console.warn('checkExistingConnection error', err);
    }
  }, [updateWalletState]);

  const attachListeners = (provider: any) => {
    try {
      if (!provider || typeof provider.on !== 'function') return;
      
      provider.on('accountsChanged', (accounts: string[]) => {
        if (!accounts || accounts.length === 0) {
          api.clearToken();
          setState(prev => ({ 
            ...prev, 
            isConnected: false, 
            address: null, 
            provider: null, 
            signer: null,
            isAuthenticated: false
          }));
        } else {
          updateWalletState(provider);
        }
      });

      provider.on('chainChanged', () => {
        window.location.reload();
      });
    } catch (err) {
      console.warn('attachListeners error', err);
    }
  };

  useEffect(() => {
    WalletConflictHandler.initializeWalletCompatibleEnvironment();
    detectAvailableWallets();
    checkExistingConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connect = async (walletType?: 'metamask' | 'coinbase' | 'phantom') => {
    setState(prev => ({ ...prev, isConnecting: true, error: null }));
    try {
      const res = await WalletUtils.connectWallet(walletType);
      if (res.success && res.provider) {
        await updateWalletState(res.provider);
        attachListeners(res.provider);
      } else {
        setState(prev => ({ ...prev, isConnecting: false, error: res.error || 'Failed to connect' }));
      }
    } catch (err: any) {
      setState(prev => ({ ...prev, isConnecting: false, error: err?.message || 'Connection error' }));
    }
  };

  const disconnect = () => {
    WalletUtils.disconnectWallet();
    api.clearToken();
    setState(prev => ({ 
      ...prev, 
      isConnected: false, 
      address: null, 
      provider: null, 
      signer: null,
      chainId: null, 
      isConnecting: false, 
      isAuthenticated: false,
      error: null 
    }));
  };

  const switchToSepolia = async () => {
    try {
      await WalletUtils.switchToSepolia();
    } catch (err: any) {
      setState(prev => ({ ...prev, error: err?.message || 'Switch network failed' }));
    }
  };

  const signMessage = async (message: string): Promise<string> => {
    if (!state.signer) throw new Error('No wallet connected to sign message');
    try {
      return await state.signer.signMessage(message);
    } catch (err: any) {
      console.error('Signing error:', err);
      throw new Error(err.message || 'Signature failed');
    }
  };

  const login = async () => {
    if (!state.address || !state.signer) {
      await connect();
    }
    
    setState(prev => ({ ...prev, isLoggingIn: true, error: null }));
    try {
      // 1. Get challenge
      const { message } = await api.post('/admin/auth/wallet-challenge', { 
        walletAddress: state.address 
      });

      // 2. Sign message
      const signature = await state.signer!.signMessage(message);

      // 3. Verify and get JWT
      const { token } = await api.post('/admin/auth/wallet-verify', {
        walletAddress: state.address,
        signature
      });

      // 4. Save state
      api.setToken(token);
      setState(prev => ({ ...prev, isAuthenticated: true, isLoggingIn: false }));
    } catch (err: any) {
      console.error('Handshake failed:', err);
      setState(prev => ({ ...prev, isLoggingIn: false, error: err.message || 'Handshake failed' }));
      throw err;
    }
  };

  const contextValue: WalletContextValue = {
    ...state,
    connect,
    disconnect,
    switchToSepolia,
    signMessage,
    login
  };

  return <WalletContext.Provider value={contextValue}>{children}</WalletContext.Provider>;
};

export const useWallet = (): WalletContextValue => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within WalletProvider');
  return ctx;
};

export default WalletProvider;
