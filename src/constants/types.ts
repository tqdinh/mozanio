export type Location = {
  coords: {
    accuracy: number;
    altitude: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
  };
  mocked: boolean;
  timestamp: number;
};

export const DefaultLocation: Location = {
  coords: {
    accuracy: 600,
    altitude: 0,
    heading: 0,
    latitude: 37.4220936,
    longitude: -122.083922,
    speed: 0,
  },
  mocked: false,
  timestamp: 1668572748934,
};
