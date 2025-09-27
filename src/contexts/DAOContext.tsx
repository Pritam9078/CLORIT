import React, { useState, useEffect } from 'react';

// Types for the DAO platform
export interface Proposal {
  id: string;
  title: string;
  description: string;
  fundingAmount?: number;
  deadline: Date;
  status: 'active' | 'passed' | 'failed' | 'expired';
  createdBy: string;
  createdAt: Date;
  votes: {
    yes: Vote[];
    no: Vote[];
  };
  totalYesWeight: number;
  totalNoWeight: number;
}

export interface Vote {
  userId: string;
  userRole: UserRole;
  weight: number;
  timestamp: Date;
}

export type UserRole = 'community' | 'panchayat' | 'ngo';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  walletAddress: string;
  votingPower: number;
  joinedAt: Date;
}

export interface DAOStats {
  totalMembers: number;
  activeProposals: number;
  votingParticipation: number;
  totalProposals: number;
}

// DAO Context for state management
interface DAOContextType {
  user: User | null;
  proposals: Proposal[];
  stats: DAOStats;
  login: (role: UserRole) => void;
  logout: () => void;
  createProposal: (proposal: Omit<Proposal, 'id' | 'createdAt' | 'votes' | 'totalYesWeight' | 'totalNoWeight' | 'status'>) => void;
  vote: (proposalId: string, voteType: 'yes' | 'no') => void;
  hasVoted: (proposalId: string) => boolean;
  getUserVote: (proposalId: string) => 'yes' | 'no' | null;
}

const DAOContext = React.createContext<DAOContextType | null>(null);

// Sample data
const SAMPLE_USERS: { [role in UserRole]: User } = {
  community: {
    id: 'community-1',
    name: 'Rajesh Kumar',
    email: 'rajesh@community.com',
    role: 'community',
    walletAddress: '0x1234...5678',
    votingPower: 1,
    joinedAt: new Date('2024-01-15')
  },
  ngo: {
    id: 'ngo-1',
    name: 'Dr. Priya Sharma',
    email: 'priya@greenngo.org',
    role: 'ngo',
    walletAddress: '0x9876...5432',
    votingPower: 3,
    joinedAt: new Date('2024-01-10')
  },
  panchayat: {
    id: 'panchayat-1',
    name: 'Smt. Lakshmi Devi',
    email: 'lakshmi@panchayat.gov.in',
    role: 'panchayat',
    walletAddress: '0x5555...7777',
    votingPower: 2,
    joinedAt: new Date('2024-01-12')
  }
};

const INITIAL_PROPOSALS: Proposal[] = [
  {
    id: 'prop-1',
    title: 'Mangrove Restoration Project - Sundarbans',
    description: 'Proposal to allocate 50,000 carbon credits for mangrove restoration in the Sundarbans region. This project will involve local communities and create sustainable income opportunities.',
    fundingAmount: 250000,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    status: 'active',
    createdBy: 'ngo-1',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    votes: { yes: [], no: [] },
    totalYesWeight: 0,
    totalNoWeight: 0
  },
  {
    id: 'prop-2',
    title: 'Blue Carbon Research Initiative',
    description: 'Establish a research program to study blue carbon ecosystems and develop standardized measurement protocols for carbon sequestration.',
    fundingAmount: 150000,
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    status: 'active',
    createdBy: 'ngo-1',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    votes: { yes: [], no: [] },
    totalYesWeight: 0,
    totalNoWeight: 0
  },
  {
    id: 'prop-3',
    title: 'Community Training Program',
    description: 'Fund training programs for local communities on sustainable fishing practices and mangrove conservation techniques.',
    fundingAmount: 80000,
    deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Already expired
    status: 'expired',
    createdBy: 'panchayat-1',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    votes: { yes: [], no: [] },
    totalYesWeight: 0,
    totalNoWeight: 0
  }
];

// DAO Provider Component
export const DAOProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>(INITIAL_PROPOSALS);
  const [userVotes, setUserVotes] = useState<{ [proposalId: string]: 'yes' | 'no' }>({});

  // Calculate stats
  const stats: DAOStats = {
    totalMembers: Object.keys(SAMPLE_USERS).length + 47, // Mock additional members
    activeProposals: proposals.filter(p => p.status === 'active').length,
    votingParticipation: 73.2, // Mock participation rate
    totalProposals: proposals.length
  };

  const login = (role: UserRole) => {
    setUser(SAMPLE_USERS[role]);
  };

  const logout = () => {
    setUser(null);
    setUserVotes({});
  };

  const createProposal = (proposalData: Omit<Proposal, 'id' | 'createdAt' | 'votes' | 'totalYesWeight' | 'totalNoWeight' | 'status'>) => {
    const newProposal: Proposal = {
      ...proposalData,
      id: `prop-${Date.now()}`,
      createdAt: new Date(),
      votes: { yes: [], no: [] },
      totalYesWeight: 0,
      totalNoWeight: 0,
      status: 'active'
    };
    setProposals(prev => [newProposal, ...prev]);
  };

  const vote = (proposalId: string, voteType: 'yes' | 'no') => {
    if (!user) return;

    const vote: Vote = {
      userId: user.id,
      userRole: user.role,
      weight: user.votingPower,
      timestamp: new Date()
    };

    setProposals(prev => prev.map(proposal => {
      if (proposal.id === proposalId) {
        const updatedVotes = { ...proposal.votes };
        
        if (voteType === 'yes') {
          updatedVotes.yes = [...updatedVotes.yes, vote];
        } else {
          updatedVotes.no = [...updatedVotes.no, vote];
        }

        const totalYesWeight = updatedVotes.yes.reduce((sum, v) => sum + v.weight, 0);
        const totalNoWeight = updatedVotes.no.reduce((sum, v) => sum + v.weight, 0);

        return {
          ...proposal,
          votes: updatedVotes,
          totalYesWeight,
          totalNoWeight
        };
      }
      return proposal;
    }));

    setUserVotes(prev => ({ ...prev, [proposalId]: voteType }));
  };

  const hasVoted = (proposalId: string): boolean => {
    return proposalId in userVotes;
  };

  const getUserVote = (proposalId: string): 'yes' | 'no' | null => {
    return userVotes[proposalId] || null;
  };

  // Update proposal status based on deadline
  useEffect(() => {
    const interval = setInterval(() => {
      setProposals(prev => prev.map(proposal => {
        if (proposal.status === 'active' && new Date() > proposal.deadline) {
          const totalWeight = proposal.totalYesWeight + proposal.totalNoWeight;
          const yesPercentage = totalWeight > 0 ? (proposal.totalYesWeight / totalWeight) * 100 : 0;
          return {
            ...proposal,
            status: yesPercentage >= 50 ? 'passed' : 'failed'
          };
        }
        return proposal;
      }));
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const value: DAOContextType = {
    user,
    proposals,
    stats,
    login,
    logout,
    createProposal,
    vote,
    hasVoted,
    getUserVote
  };

  return <DAOContext.Provider value={value}>{children}</DAOContext.Provider>;
};

// Hook to use DAO context
export const useDAO = () => {
  const context = React.useContext(DAOContext);
  if (!context) {
    throw new Error('useDAO must be used within a DAOProvider');
  }
  return context;
};

// Utility functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
};

export const formatTimeRemaining = (deadline: Date): string => {
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();
  
  if (diff <= 0) return 'Expired';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) return `${days}d ${hours}h remaining`;
  if (hours > 0) return `${hours}h ${minutes}m remaining`;
  return `${minutes}m remaining`;
};

export const getRoleColor = (role: UserRole): string => {
  switch (role) {
    case 'community': return 'text-green-600 bg-green-100';
    case 'ngo': return 'text-blue-600 bg-blue-100';
    case 'panchayat': return 'text-purple-600 bg-purple-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export const getRoleName = (role: UserRole): string => {
  switch (role) {
    case 'community': return 'Community Member';
    case 'ngo': return 'NGO Representative';
    case 'panchayat': return 'Panchayat Official';
    default: return 'Unknown';
  }
};
