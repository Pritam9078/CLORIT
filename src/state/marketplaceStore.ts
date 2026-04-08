import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Order {
  id: string;
  account: string;
  type: 'Buy' | 'Sell';
  amount: string;
  price: string;
  total: string;
  status: 'Live' | 'Suspended' | 'Filled';
  date: string;
}

interface MarketplaceState {
  avgPrice: string;
  tradingVolume: string;
  activeOrdersCount: number;
  marketStability: string;
  orders: Order[];
  priceHistory: { name: string; price: number; vol: number }[];
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  updateMarketStats: (price: string, volume: string) => void;
}

export const useMarketplaceStore = create<MarketplaceState>()(
  persist(
    (set) => ({
      avgPrice: '$13.25',
      tradingVolume: '842.1k CCT',
      activeOrdersCount: 1240,
      marketStability: '98.4%',
      priceHistory: [
        { name: '08:00', price: 12.4, vol: 400 },
        { name: '10:00', price: 12.6, vol: 800 },
        { name: '12:00', price: 13.1, vol: 1200 },
        { name: '14:00', price: 12.9, vol: 900 },
        { name: '16:00', price: 13.4, vol: 1500 },
        { name: '18:00', price: 13.2, vol: 1100 },
      ],
      orders: [
        { id: 'ord-1', account: '0x234...ef12', type: 'Buy', amount: '12,000 CCT', price: '$13.2', total: '$158,400', status: 'Live', date: '19:42:01' },
        { id: 'ord-2', account: '0xabc...890d', type: 'Sell', amount: '8,500 CCT', price: '$13.1', total: '$111,350', status: 'Live', date: '19:41:45' },
        { id: 'ord-3', account: '0x789...cd45', type: 'Buy', amount: '25,000 CCT', price: '$13.0', total: '$325,000', status: 'Live', date: '19:40:12' },
        { id: 'ord-4', account: '0xde5...f678', type: 'Sell', amount: '1,200 CCT', price: '$13.2', total: '$15,840', status: 'Suspended', date: '19:38:55' },
      ],
      addOrder: (orderData) => set((state) => ({
        orders: [
          {
            ...orderData,
            id: `ord-${Date.now()}`,
            date: new Date().toLocaleTimeString(),
          },
          ...state.orders,
        ]
      })),
      updateMarketStats: (price, volume) => set({ avgPrice: price, tradingVolume: volume }),
    }),
    {
      name: 'clorit-marketplace-storage',
    }
  )
);
