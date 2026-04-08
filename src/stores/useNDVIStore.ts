import { create } from 'zustand';

export type LayerType = 'NDVI' | 'Temperature' | 'Carbon' | 'Deforestation';

interface NDVIStoreState {
  isFullscreen: boolean;
  activeLayer: LayerType;
  selectedRegion: string | null;
  timeSliderValue: number;
  alerts: string[];
  
  toggleFullscreen: () => void;
  setActiveLayer: (layer: LayerType) => void;
  setSelectedRegion: (regionId: string | null) => void;
  setTimeSliderValue: (val: number) => void;
  addAlert: (alert: string) => void;
  clearAlerts: () => void;
}

export const useNDVIStore = create<NDVIStoreState>((set) => ({
  isFullscreen: false,
  activeLayer: 'NDVI',
  selectedRegion: null,
  timeSliderValue: 2026,
  alerts: [],

  toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),
  setActiveLayer: (layer) => set({ activeLayer: layer }),
  setSelectedRegion: (regionId) => set({ selectedRegion: regionId }),
  setTimeSliderValue: (val) => set({ timeSliderValue: val }),
  addAlert: (alert) => set((state) => ({ alerts: [...state.alerts, alert] })),
  clearAlerts: () => set({ alerts: [] }),
}));
