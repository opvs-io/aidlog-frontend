import { LatLng } from 'leaflet';

const LOCAL_STORAGE_KEY = 'latlng';

export const setLocation = (location: LatLng) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(location));
};

export const getLocation = (): LatLng | null => {
  try {
    const location = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!location) {
      return null;
    }

    return JSON.parse(location) as LatLng;
  } catch (error) {
    return null;
  }
};
