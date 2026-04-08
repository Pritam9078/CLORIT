// Authentication utilities
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  walletAddress?: string;
  profileImage?: string;
  location?: string;
  phone?: string;
  bio?: string;
  joinDate?: string;
  // NGO-specific fields
  ngoName?: string;
  organizationId?: string;
  registrationNumber?: string;
  website?: string;
  // Community-specific fields
  communityName?: string;
  // Panchayat-specific fields
  panchayatName?: string;
  wardBlockNumber?: string;
  // Verification fields
  isVerified?: boolean;
  verificationStatus?: 'pending' | 'verified' | 'suspended';
  // Timestamps
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
  // Hierarchy fields
  parentNGO?: string;
  managedCommunities?: string[];
  managedNGOs?: string[];
}

export const AuthUtils = {
  // Logout functionality
  logout: (): void => {
    // Clear all authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('walletAddress');
    sessionStorage.clear();

    // Clear any cookies if needed
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  },

  // Get current user profile
  getCurrentUser: (): UserProfile | null => {
    try {
      const userProfile = localStorage.getItem('userProfile');
      return userProfile ? JSON.parse(userProfile) : null;
    } catch {
      return null;
    }
  },

  // Save user profile
  saveUserProfile: (profile: UserProfile): void => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken');
  },

  // Get user role
  getUserRole: (): string | null => {
    const user = AuthUtils.getCurrentUser();
    return user?.role || null;
  }
};
