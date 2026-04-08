import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ContractInfo {
  id: string;
  name: string;
  version: string;
  address: string;
  status: 'Active' | 'Paused' | 'Deprecated';
  updated: string;
}

export interface InfraLog {
  event: string;
  time: string;
  type: 'System' | 'Network' | 'Active' | 'Security';
}

interface SystemState {
  networkLatency: string;
  chainSync: string;
  activeNodes: string;
  gasPrice: string;
  contracts: ContractInfo[];
  infraLogs: InfraLog[];
  updateContractStatus: (name: string, status: ContractInfo['status']) => void;
  addInfraLog: (log: InfraLog) => void;
}

export const useSystemStore = create<SystemState>()(
  persist(
    (set) => ({
      networkLatency: '12ms',
      chainSync: '100%',
      activeNodes: '24/24',
      gasPrice: '18',
      contracts: [
        { id: 'sc-1', name: 'Registry Protocol', version: 'v2.4.1', address: '0x12c...88ef', status: 'Active', updated: '2 days ago' },
        { id: 'sc-2', name: 'CCT Token Engine', version: 'v1.0.8', address: '0xdef...234a', status: 'Active', updated: '2 weeks ago' },
        { id: 'sc-3', name: 'Marketplace Core', version: 'v1.8.2', address: '0xabc...567d', status: 'Paused', updated: '1 hour ago' },
        { id: 'sc-4', name: 'Verification Oracle', version: 'v1.1.0', address: '0x789...cd12', status: 'Active', updated: '1 month ago' },
      ],
      infraLogs: [
        { event: 'Registry Upgraded', time: '14:20', type: 'System' },
        { event: 'Node #4 Restart', time: '12:05', type: 'Network' },
        { event: 'Oracle Heartbeat', time: '11:42', type: 'Active' },
        { event: 'Admin Login: 0x234...', time: '09:15', type: 'Security' },
      ],
      updateContractStatus: (name, status) => set((state) => ({
        contracts: state.contracts.map((c) => 
          c.name === name ? { ...c, status, updated: 'Just now' } : c
        )
      })),
      addInfraLog: (log) => set((state) => ({
        infraLogs: [log, ...state.infraLogs.slice(0, 9)] // Keep last 10
      })),
    }),
    {
      name: 'clorit-system-storage',
    }
  )
);
