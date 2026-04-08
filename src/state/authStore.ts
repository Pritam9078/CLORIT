import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'ngo' | 'corporate' | 'user';
export type UserStatus = 'pending' | 'verified' | 'rejected' | 'suspended';

export interface User {
  id: string;
  role: UserRole;
  email: string;
  fullName: string;
  status: UserStatus;
  walletAddress?: string;
  createdAt: string;
  // Specific fields
  organization?: string;
  registrationNumber?: string;
  industry?: string;
  esgGoals?: string;
  location?: string;
  phone?: string;
  kybSubmitted?: boolean;
}

interface AuthState {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
  
  // Actions
  registerUser: (userData: Omit<User, 'id' | 'status' | 'createdAt'>) => { success: boolean; error?: string };
  loginUser: (email: string, password: string) => Promise<boolean>;
  loginWithWallet: (address: string) => Promise<boolean>;
  loginAdmin: (adminKey: string) => Promise<boolean>;
  logout: () => void;
  updateUserStatus: (userId: string, status: UserStatus) => void;
  updateUserProfile: (userId: string, profileData: Partial<User>) => void;
  deleteUser: (userId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      isAuthenticated: false,

      registerUser: (userData) => {
        // Robust Duplicate Check
        const existingUser = get().users.find((u) => u.email.toLowerCase() === userData.email.toLowerCase());
        
        if (existingUser) {
          console.error("Registration Attempt Failed: Email already exists.", userData.email);
          return { success: false, error: "Email already registered." };
        }

        const newUser: User = {
          ...userData,
          email: userData.email.trim().toLowerCase(),
          id: `u-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`,
          status: userData.role === 'admin' ? 'verified' : 'pending',
          createdAt: new Date().toISOString(),
        };

        console.log("New User Registered Successfully:", newUser);

        set((state) => ({ 
          users: [...state.users, newUser] 
        }));

        return { success: true };
      },

      loginUser: async (email, _password) => {
        // Simple simulation for prototype
        const normalizedEmail = email.trim().toLowerCase();
        const user = get().users.find((u) => u.email.trim().toLowerCase() === normalizedEmail);
        if (user) {
          set({ currentUser: user, isAuthenticated: true });
          return true;
        }
        return false;
      },

      loginWithWallet: async (address) => {
        const user = get().users.find((u) => u.walletAddress === address);
        if (user) {
          set({ currentUser: user, isAuthenticated: true });
          return true;
        }
        // If not found, we could auto-register or show error
        return false;
      },

      loginAdmin: async (adminKey) => {
        // Secure Admin Key Check
        if (adminKey === 'ADMIN9078') {
          const admin: User = {
            id: 'admin-main',
            role: 'admin',
            email: 'admin@clorit.io',
            fullName: 'Main Admin',
            status: 'verified',
            walletAddress: '0x0000000000000000000000000000000000000000',
            createdAt: new Date().toISOString(),
          };
          set({ currentUser: admin, isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => set({ currentUser: null, isAuthenticated: false }),

      updateUserStatus: (userId, status) => {
        set((state) => ({
          users: state.users.map((u) => 
            u.id === userId ? { ...u, status } : u
          ),
          // Update current user if they are the one being changed
          currentUser: state.currentUser?.id === userId 
            ? { ...state.currentUser, status } 
            : state.currentUser
        }));
      },
      updateUserProfile: (userId, profileData) => {
        set((state) => ({
          users: state.users.map((u) => 
            u.id === userId ? { ...u, ...profileData } : u
          ),
          currentUser: state.currentUser?.id === userId 
            ? { ...state.currentUser, ...profileData } 
            : state.currentUser
        }));
      },

      deleteUser: (userId) => {
        set((state) => ({
          users: state.users.filter((u) => u.id !== userId)
        }));
      }
    }),
    {
      name: 'clorit-auth-storage',
    }
  )
);
