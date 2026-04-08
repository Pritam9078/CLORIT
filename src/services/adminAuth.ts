/**
 * Admin Authentication Service
 * Handles wallet-based admin login flow
 */

import { connectWallet, signMessage } from './walletService';

const API_BASE_URL = 'http://localhost:5001/api/admin/auth';

export interface AdminProfile {
    walletAddress: string;
    name: string;
    email: string;
    role: string;
    region: string;
    lastLogin: string;
}

export interface LoginResponse {
    success: boolean;
    token: string;
    admin: AdminProfile;
}

/**
 * Get challenge (nonce) for wallet signature
 */
export const getChallenge = async (walletAddress: string): Promise<string> => {
    try {
        const response = await fetch(`${API_BASE_URL}/wallet-challenge?walletAddress=${walletAddress}`);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || 'Failed to get challenge');
        }

        return data.nonce;
    } catch (error: any) {
        console.error('Get challenge error:', error);
        throw new Error(error.message || 'Failed to get authentication challenge');
    }
};

/**
 * Verify wallet signature and login
 */
export const verifySignature = async (
    walletAddress: string,
    signature: string,
    message: string
): Promise<LoginResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/wallet-verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                walletAddress,
                signature,
                message
            })
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || 'Signature verification failed');
        }

        return data;
    } catch (error: any) {
        console.error('Verify signature error:', error);
        throw new Error(error.message || 'Failed to verify signature');
    }
};

/**
 * Complete wallet login flow
 */
export const loginWithWallet = async (): Promise<LoginResponse> => {
    try {
        // Step 1: Connect wallet
        const walletAddress = await connectWallet();
        console.log('Wallet connected:', walletAddress);

        // Step 2: Get challenge
        const nonce = await getChallenge(walletAddress);
        console.log('Challenge received');

        // Step 3: Create message to sign
        const timestamp = Date.now();
        const message = `CLORIT Admin Login\n\nWallet: ${walletAddress}\nNonce: ${nonce}\nTimestamp: ${timestamp}\n\nBy signing this message, you authenticate as an admin.`;

        // Step 4: Request signature
        const signature = await signMessage(message, walletAddress);
        console.log('Message signed');

        // Step 5: Verify signature and get token
        const loginResponse = await verifySignature(walletAddress, signature, message);
        console.log('Login successful');

        // Step 6: Store credentials
        localStorage.setItem('authToken', loginResponse.token);
        localStorage.setItem('walletAddress', walletAddress);
        localStorage.setItem('userProfile', JSON.stringify(loginResponse.admin));

        return loginResponse;
    } catch (error: any) {
        console.error('Wallet login error:', error);
        throw error;
    }
};

/**
 * Login with emergency admin key
 */
export const loginWithKey = async (adminKey: string): Promise<LoginResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/key-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ adminKey })
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || 'Invalid admin key');
        }

        // Store credentials
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userProfile', JSON.stringify(data.admin));

        return data;
    } catch (error: any) {
        console.error('Key login error:', error);
        throw new Error(error.message || 'Failed to login with admin key');
    }
};

/**
 * Get admin profile
 */
export const getProfile = async (): Promise<AdminProfile> => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_BASE_URL}/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || 'Failed to get profile');
        }

        return data.admin;
    } catch (error: any) {
        console.error('Get profile error:', error);
        throw error;
    }
};

/**
 * Logout
 */
export const logout = (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('userProfile');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('authToken');
};

/**
 * Get stored wallet address
 */
export const getStoredWalletAddress = (): string | null => {
    return localStorage.getItem('walletAddress');
};

export default {
    getChallenge,
    verifySignature,
    loginWithWallet,
    loginWithKey,
    getProfile,
    logout,
    isAuthenticated,
    getStoredWalletAddress
};
