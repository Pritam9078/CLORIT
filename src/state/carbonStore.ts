import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CarbonLog {
  id: string;
  type: 'Mint' | 'Burn' | 'Transfer';
  amount: string;
  project: string;
  sender: string;
  status: 'Success' | 'Pending' | 'Failed';
  date: string;
}

interface CarbonState {
  totalCCTSupply: number;
  totalMintedYTD: number;
  totalBurnedYTD: number;
  circulatingSupply: number;
  logs: CarbonLog[];
  addLog: (log: Omit<CarbonLog, 'id' | 'date'>) => void;
  updateSupplies: (minted?: number, burned?: number) => void;
}

export const useCarbonStore = create<CarbonState>()(
  persist(
    (set) => ({
      totalCCTSupply: 1245000,
      totalMintedYTD: 452800,
      totalBurnedYTD: 12400,
      circulatingSupply: 1080200,
      logs: [
        { id: 'log-1', type: 'Mint', amount: '12,500 CCT', project: 'Sundarbans R-1', sender: 'Admin', status: 'Success', date: '2024-09-02' },
        { id: 'log-2', type: 'Burn', amount: '2,000 CCT', project: 'Off-set Settlement', sender: 'Corporate X', status: 'Success', date: '2024-09-01' },
      ],
      addLog: (logData) => set((state) => ({
        logs: [
          {
            ...logData,
            id: `log-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
          },
          ...state.logs,
        ]
      })),
      updateSupplies: (minted = 0, burned = 0) => set((state) => {
        const newMinted = state.totalMintedYTD + minted;
        const newBurned = state.totalBurnedYTD + burned;
        const newTotal = state.totalCCTSupply + minted - burned;
        return {
          totalMintedYTD: newMinted,
          totalBurnedYTD: newBurned,
          totalCCTSupply: newTotal,
          circulatingSupply: newTotal - 164800, // Simulated reserve
        };
      }),
    }),
    {
      name: 'clorit-carbon-storage',
    }
  )
);
