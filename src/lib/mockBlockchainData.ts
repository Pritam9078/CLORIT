export interface RegionData {
  id: string;
  name: string;
  ndvi: number;
  temperature: number;
  carbonDensity: number;
  creditsMinted: number;
  area: number;
  lat: number;
  lng: number;
  status: 'Healthy' | 'Moderate' | 'Degraded';
}

export const generateMockRegionData = (): RegionData[] => {
  return [
    {
      id: 'reg-wb',
      name: 'West Bengal Delta',
      ndvi: 0.75,
      temperature: 28,
      carbonDensity: 140,
      creditsMinted: 1250,
      area: 45.2,
      lat: 22.9868,
      lng: 87.855,
      status: 'Healthy'
    },
    {
      id: 'reg-kl',
      name: 'Kerala Ghats',
      ndvi: 0.82,
      temperature: 24,
      carbonDensity: 180,
      creditsMinted: 980,
      area: 32.7,
      lat: 10.8505,
      lng: 76.2711,
      status: 'Healthy'
    },
    {
      id: 'reg-od',
      name: 'Odisha Coast',
      ndvi: 0.35,
      temperature: 31,
      carbonDensity: 90,
      creditsMinted: 1640,
      area: 67.1,
      lat: 20.9517,
      lng: 85.0985,
      status: 'Moderate'
    },
    {
      id: 'reg-tn',
      name: 'Tamil Nadu Reserve',
      ndvi: 0.65,
      temperature: 30,
      carbonDensity: 120,
      creditsMinted: 1840,
      area: 58.9,
      lat: 11.1271,
      lng: 78.6569,
      status: 'Healthy'
    },
    {
      id: 'reg-gj',
      name: 'Gujarat Arid Zone',
      ndvi: 0.22,
      temperature: 36,
      carbonDensity: 40,
      creditsMinted: 2100,
      area: 72.4,
      lat: 22.2587,
      lng: 71.1924,
      status: 'Degraded'
    }
  ];
};

// Simulate pulling from a real-time data provider
export const getLiveRegionData = (): Promise<RegionData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockRegionData());
    }, 800);
  });
};
