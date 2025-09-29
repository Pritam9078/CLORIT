// CLORIT Frontend Authentication Utility (Prototype Version)
// This is a prototype implementation using localStorage for demonstration

// Type definitions for user data
export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'community' | 'ngo' | 'panchayat';
  location: string;
  phone: string;
  createdAt: string;
  isActive: boolean;
  // Community specific
  communityName?: string;
  // NGO specific
  ngoName?: string;
  registrationNumber?: string;
  website?: string | null;
  // Panchayat specific
  panchayatName?: string;
  wardBlockNumber?: string;
}

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

// Authentication utility class for prototype
class PrototypeAuth {
  private readonly USERS_KEY = 'clorit_users';
  private readonly CURRENT_USER_KEY = 'clorit_current_user';
  private readonly TOKEN_KEY = 'clorit_auth_token';

  // Get all registered users
  getAllUsers(): User[] {
    const usersJson = localStorage.getItem(this.USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  // Get current authenticated user
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  // Login user (prototype version)
  login(credentials: LoginData): { success: boolean; message: string; user?: User } {
    const users = this.getAllUsers();
    const user = users.find(u => u.email === credentials.email);
    
    if (!user) {
      return { success: false, message: 'User not found. Please sign up first.' };
    }

    // In prototype, we skip password verification for simplicity
    // In real implementation, this would verify hashed passwords
    
    // Set user session
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    localStorage.setItem(this.TOKEN_KEY, 'prototype_token_' + Date.now());
    
    return { 
      success: true, 
      message: 'Login successful!', 
      user 
    };
  }

  // Logout user
  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Get user by email
  getUserByEmail(email: string): User | null {
    const users = this.getAllUsers();
    return users.find(u => u.email === email) || null;
  }

  // Update user profile
  updateProfile(updates: Partial<User>): { success: boolean; message: string } {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'No user logged in' };
    }

    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) {
      return { success: false, message: 'User not found' };
    }

    // Update user data
    const updatedUser = { ...users[userIndex], ...updates };
    users[userIndex] = updatedUser;
    
    // Save to localStorage
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(updatedUser));
    
    return { success: true, message: 'Profile updated successfully' };
  }

  // Get users by role
  getUsersByRole(role: 'community' | 'ngo' | 'panchayat'): User[] {
    const users = this.getAllUsers();
    return users.filter(u => u.role === role);
  }

  // Get dashboard stats for current user
  getDashboardStats(): any {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;

    // Mock data for prototype - in real app this would come from backend
    const mockStats = {
      community: {
        carbonCaptured: 25.3,
        treesPlanted: 187,
        earnings: 12500,
        activeProjects: 3,
        communityRank: 12,
        impactScore: 85
      },
      ngo: {
        carbonCaptured: 156.8,
        treesPlanted: 1240,
        earnings: 89500,
        activeProjects: 15,
        verifiedProjects: 23,
        impactScore: 92
      },
      panchayat: {
        carbonCaptured: 312.7,
        treesPlanted: 2680,
        earnings: 198500,
        activeProjects: 28,
        managedArea: '15.6 km²',
        impactScore: 88
      }
    };

    return mockStats[currentUser.role];
  }
}

// Create singleton instance
const prototypeAuth = new PrototypeAuth();
export default prototypeAuth;

// Utility functions
export const saveAuthData = (user: User, token: string): void => {
  localStorage.setItem('clorit_current_user', JSON.stringify(user));
  localStorage.setItem('clorit_auth_token', token);
};

export const getAuthData = (): { token: string | null; user: User | null } => {
  const token = localStorage.getItem('clorit_auth_token');
  const userStr = localStorage.getItem('clorit_current_user');
  const user = userStr ? JSON.parse(userStr) : null;
  return { token, user };
};

export const clearAuthData = (): void => {
  localStorage.removeItem('clorit_current_user');
  localStorage.removeItem('clorit_auth_token');
};

export const isAuthenticated = (): boolean => {
  return prototypeAuth.isAuthenticated();
};

export const redirectToDashboard = (role: string): void => {
  const dashboardRoutes = {
    community: '/community-dashboard',
    ngo: '/ngo-dashboard', 
    panchayat: '/panchayat-dashboard'
  };
  
  const route = dashboardRoutes[role as keyof typeof dashboardRoutes] || '/dashboard';
  window.location.href = route;
};

// Mock API responses for development
export const mockApiResponses = {
  healthCheck: () => Promise.resolve({ status: 'OK', message: 'Frontend prototype is running' }),
  
  getUserStats: (userId: string) => {
    // Return mock user statistics
    return Promise.resolve({
      success: true,
      data: prototypeAuth.getDashboardStats()
    });
  },
  
  getProjects: (role: string) => {
    // Return mock projects based on role
    const mockProjects = {
      community: [
        { id: '1', name: 'Mangrove Restoration', status: 'active', progress: 75 },
        { id: '2', name: 'Village Tree Planting', status: 'completed', progress: 100 },
        { id: '3', name: 'Soil Conservation', status: 'planning', progress: 25 }
      ],
      ngo: [
        { id: '1', name: 'Coastal Restoration Program', status: 'active', progress: 60 },
        { id: '2', name: 'Community Education Initiative', status: 'active', progress: 45 },
        { id: '3', name: 'Research & Monitoring', status: 'ongoing', progress: 80 }
      ],
      panchayat: [
        { id: '1', name: 'District-wide Afforestation', status: 'active', progress: 55 },
        { id: '2', name: 'Wetland Conservation', status: 'active', progress: 70 },
        { id: '3', name: 'Carbon Credit Initiative', status: 'planning', progress: 20 }
      ]
    };
    
    return Promise.resolve({
      success: true,
      data: mockProjects[role as keyof typeof mockProjects] || []
    });
  }
};

// Helper to initialize sample data for demo
export const initializeSampleData = (): void => {
  const existingUsers = prototypeAuth.getAllUsers();
  
  if (existingUsers.length === 0) {
    const sampleUsers: User[] = [
      {
        id: '1',
        fullName: 'Rajesh Kumar',
        email: 'rajesh@community.com',
        role: 'community',
        location: 'Sundarbans, West Bengal, India',
        phone: '9876543210',
        createdAt: new Date().toISOString(),
        isActive: true,
        communityName: 'Sundarbans Green Village'
      },
      {
        id: '2',
        fullName: 'Dr. Priya Sharma',
        email: 'priya@greenngo.org',
        role: 'ngo',
        location: 'Mumbai, Maharashtra, India',
        phone: '9876543211',
        createdAt: new Date().toISOString(),
        isActive: true,
        ngoName: 'Green Earth Foundation',
        registrationNumber: 'NGO/2020/12345',
        website: 'https://greenearthfoundation.org'
      },
      {
        id: '3',
        fullName: 'Smt. Lakshmi Devi',
        email: 'lakshmi@panchayat.gov.in',
        role: 'panchayat',
        location: 'Kollam, Kerala, India',
        phone: '9876543212',
        createdAt: new Date().toISOString(),
        isActive: true,
        panchayatName: 'Kollam Coastal Panchayat',
        wardBlockNumber: 'Ward-7'
      }
    ];
    
    localStorage.setItem('clorit_users', JSON.stringify(sampleUsers));
  }
};
