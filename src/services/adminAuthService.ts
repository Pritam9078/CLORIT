// Admin Authentication Service - Connects admin login to backend
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

// Type definitions
export interface Admin {
    walletAddress: string;
    name: string;
    email?: string;
    role: string;
    region?: string;
    lastLogin?: string;
    createdAt?: string;
}

export interface AdminAuthResponse {
    success: boolean;
    message?: string;
    token?: string;
    admin?: Admin;
}

export interface ErrorResponse {
    success: false;
    message: string;
    error?: string;
}

// Configure axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Add request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Admin Authentication Service
class AdminAuthService {
    /**
     * Login with admin key (ADMIN Super Admin)
     */
    async keyLogin(adminKey: string, walletAddress?: string): Promise<AdminAuthResponse> {
        try {
            const response = await api.post<AdminAuthResponse>('/api/admin/auth/key-login', {
                adminKey,
                walletAddress,
            });

            if (response.data.success && response.data.token && response.data.admin) {
                // Store token and admin data
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('adminProfile', JSON.stringify(response.data.admin));
            }

            return response.data;
        } catch (error: any) {
            console.error('Admin key login error:', error);

            if (error.response?.data) {
                return error.response.data as ErrorResponse;
            }

            return {
                success: false,
                message: error.message || 'Network error. Please check your connection.',
            };
        }
    }

    /**
     * Request wallet challenge (for wallet-based authentication)
     */
    async requestWalletChallenge(walletAddress: string): Promise<{
        success: boolean;
        message?: string;
        nonce?: string;
    }> {
        try {
            const response = await api.post('/api/admin/auth/wallet-challenge', {
                walletAddress,
            });
            return response.data;
        } catch (error: any) {
            console.error('Wallet challenge error:', error);

            if (error.response?.data) {
                return error.response.data;
            }

            return {
                success: false,
                message: error.message || 'Failed to request challenge',
            };
        }
    }

    /**
     * Verify wallet signature
     */
    async verifyWalletSignature(
        walletAddress: string,
        signature: string
    ): Promise<AdminAuthResponse> {
        try {
            const response = await api.post<AdminAuthResponse>('/api/admin/auth/wallet-verify', {
                walletAddress,
                signature,
            });

            if (response.data.success && response.data.token && response.data.admin) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('adminProfile', JSON.stringify(response.data.admin));
            }

            return response.data;
        } catch (error: any) {
            console.error('Wallet verify error:', error);

            if (error.response?.data) {
                return error.response.data as ErrorResponse;
            }

            return {
                success: false,
                message: error.message || 'Signature verification failed',
            };
        }
    }

    /**
     * Get admin profile
     */
    async getProfile(): Promise<{ success: boolean; admin?: Admin; message?: string }> {
        try {
            const response = await api.get('/api/admin/auth/profile');
            return response.data;
        } catch (error: any) {
            console.error('Get admin profile error:', error);

            if (error.response?.data) {
                return error.response.data;
            }

            return {
                success: false,
                message: error.message || 'Failed to fetch profile',
            };
        }
    }

    /**
     * Log out admin
     */
    logout(): void {
        localStorage.removeItem('authToken');
        localStorage.removeItem('adminProfile');
        localStorage.removeItem('userProfile');
    }

    /**
     * Check if admin is authenticated
     */
    isAuthenticated(): boolean {
        const token = localStorage.getItem('authToken');
        const admin = localStorage.getItem('adminProfile');
        return !!(token && admin);
    }

    /**
     * Get current admin from localStorage
     */
    getCurrentAdmin(): Admin | null {
        const adminStr = localStorage.getItem('adminProfile');
        if (!adminStr) return null;

        try {
            return JSON.parse(adminStr);
        } catch {
            return null;
        }
    }

    /**
     * Get auth token
     */
    getToken(): string | null {
        return localStorage.getItem('authToken');
    }
}

// Export singleton instance
const adminAuthService = new AdminAuthService();
export default adminAuthService;
