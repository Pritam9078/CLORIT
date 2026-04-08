// Authentication Service - Connects frontend to backend MongoDB database
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

// Type definitions
export interface SignupData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: 'community' | 'ngo' | 'panchayat';
    location: string;
    phone: string;
    // Role-specific fields
    communityName?: string;
    ngoName?: string;
    registrationNumber?: string;
    website?: string;
    panchayatName?: string;
    wardBlockNumber?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface User {
    _id: string;
    fullName: string;
    email: string;
    role: 'community' | 'ngo' | 'panchayat';
    location: string;
    phone: string;
    isActive: boolean;
    createdAt: string;
    lastLogin?: string;
    // Role-specific fields
    communityName?: string;
    ngoName?: string;
    registrationNumber?: string;
    website?: string;
    panchayatName?: string;
    wardBlockNumber?: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data?: {
        user: User;
        token: string;
    };
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
    timeout: 10000, // 10 seconds
});

// Add request interceptor to include auth token
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

// Authentication Service
class AuthService {
    /**
     * Sign up a new user
     */
    async signup(data: SignupData): Promise<AuthResponse> {
        try {
            // Prepare base payload with common fields
            const payload: any = {
                fullName: data.fullName,
                email: data.email,
                password: data.password,
                confirmPassword: data.password, // Backend requires confirmPassword
                role: data.role.toLowerCase(), // Backend expects lowercase role
                location: data.location,
                phone: data.phone,
            };

            // Add role-specific fields
            switch (data.role.toLowerCase()) {
                case 'community':
                    payload.communityName = data.communityName;
                    break;
                case 'ngo':
                    payload.ngoName = data.ngoName;
                    payload.registrationNumber = data.registrationNumber;
                    if (data.website) {
                        payload.website = data.website;
                    }
                    break;
                case 'panchayat':
                    payload.panchayatName = data.panchayatName;
                    payload.wardBlockNumber = data.wardBlockNumber;
                    break;
            }

            const response = await api.post<AuthResponse>('/api/auth/signup', payload);

            if (response.data.success && response.data.data) {
                // Store token and user data
                localStorage.setItem('authToken', response.data.data.token);
                localStorage.setItem('userProfile', JSON.stringify(response.data.data.user));
            }

            return response.data;
        } catch (error: any) {
            console.error('Signup error:', error);

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
     * Log in an existing user
     */
    async login(credentials: LoginData): Promise<AuthResponse> {
        try {
            const response = await api.post<AuthResponse>('/api/auth/login', credentials);

            if (response.data.success && response.data.data) {
                // Store token and user data
                localStorage.setItem('authToken', response.data.data.token);
                localStorage.setItem('userProfile', JSON.stringify(response.data.data.user));
            }

            return response.data;
        } catch (error: any) {
            console.error('Login error:', error);

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
     * Get current user profile
     */
    async getProfile(): Promise<{ success: boolean; data?: { user: User }; message?: string }> {
        try {
            const response = await api.get('/api/auth/profile');
            return response.data;
        } catch (error: any) {
            console.error('Get profile error:', error);

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
     * Log out current user
     */
    logout(): void {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userProfile');
        localStorage.removeItem('adminProfile');
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('userProfile');
        return !!(token && user);
    }

    /**
     * Get current user from localStorage
     */
    getCurrentUser(): User | null {
        const userStr = localStorage.getItem('userProfile');
        if (!userStr) return null;

        try {
            return JSON.parse(userStr);
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
const authService = new AuthService();
export default authService;

// Helper functions for backward compatibility
export const saveAuthData = (user: User, token: string): void => {
    localStorage.setItem('userProfile', JSON.stringify(user));
    localStorage.setItem('authToken', token);
};

export const getAuthData = (): { token: string | null; user: User | null } => {
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('userProfile');
    const user = userStr ? JSON.parse(userStr) : null;
    return { token, user };
};

export const clearAuthData = (): void => {
    authService.logout();
};

export const isAuthenticated = (): boolean => {
    return authService.isAuthenticated();
};
