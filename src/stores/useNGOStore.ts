import { create } from 'zustand';

interface NGOImpactStats {
    totalCommunities: number;
    totalProjects: number;
    approvedProjects: number;
    pendingVerification: number;
    totalCarbonCredits: number;
    totalArea: number;
    averageCreditsPerProject: number;
}

interface Project {
    projectId: string;
    name: string;
    location: {
        region: string;
        state: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
    };
    status: string;
    area: number;
    carbonCredits: number;
    submittedBy: {
        userId: any;
        walletAddress: string;
        communityName: string;
    };
    submissionDate: string;
}

interface NGOStoreState {
    communities: any[];
    pendingProjects: Project[];
    tickets: any[];
    impactStats: NGOImpactStats | null;
    isLoading: boolean;
    error: string | null;

    fetchCommunities: () => Promise<void>;
    fetchPendingProjects: () => Promise<void>;
    fetchImpactSummary: () => Promise<void>;
    verifyProject: (projectId: string, status: 'approved' | 'rejected', notes: string) => Promise<void>;
    fetchTickets: () => Promise<void>;
    respondToTicket: (id: string, message: string) => Promise<void>;
    fetchMarketplace: () => Promise<void>;
    marketplaceItems: any[];
}

export const useNGOStore = create<NGOStoreState>((set, get) => ({
    communities: [],
    pendingProjects: [],
    tickets: [],
    marketplaceItems: [],
    impactStats: null,
    isLoading: false,
    error: null,

    fetchCommunities: async () => {
        set({ isLoading: true });
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/ngo/communities', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                set({ communities: data.data, isLoading: false });
            } else {
                set({ error: data.message, isLoading: false });
            }
        } catch (error) {
            set({ error: 'Failed to fetch communities', isLoading: false });
        }
    },

    fetchPendingProjects: async () => {
        set({ isLoading: true });
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/ngo/pending-verifications', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                set({ pendingProjects: data.data, isLoading: false });
            } else {
                set({ error: data.message, isLoading: false });
            }
        } catch (error) {
            set({ error: 'Failed to fetch pending projects', isLoading: false });
        }
    },

    fetchImpactSummary: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/ngo/impact-summary', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                set({ impactStats: data.data });
            }
        } catch (error) {
            console.error('Impact Summary fetch failed:', error);
        }
    },

    verifyProject: async (projectId, status, notes) => {
        set({ isLoading: true });
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/ngo/verify/${projectId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status, notes })
            });
            const data = await response.json();
            if (data.success) {
                // Refresh pending list
                await get().fetchPendingProjects();
                await get().fetchImpactSummary();
            } else {
                set({ error: data.message, isLoading: false });
            }
        } catch (error) {
            set({ error: 'Verification update failed', isLoading: false });
        }
    },

    fetchTickets: async () => {
        set({ isLoading: true });
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/ngo/tickets', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                set({ tickets: data.data, isLoading: false });
            } else {
                set({ error: data.message, isLoading: false });
            }
        } catch (error) {
            set({ error: 'Failed to fetch tickets', isLoading: false });
        }
    },

    respondToTicket: async (id, message) => {
        set({ isLoading: true });
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/ngo/tickets/${id}/respond`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ message })
            });
            const data = await response.json();
            if (data.success) {
                await get().fetchTickets();
            } else {
                set({ error: data.message, isLoading: false });
            }
        } catch (error) {
            set({ error: 'Failed to respond to ticket', isLoading: false });
        }
    },

    fetchMarketplace: async () => {
        set({ isLoading: true });
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/carbon/marketplace', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                set({ marketplaceItems: data.data, isLoading: false });
            } else {
                set({ error: data.message, isLoading: false });
            }
        } catch (error) {
            set({ error: 'Failed to fetch marketplace', isLoading: false });
        }
    }
}));
