import { apiClient } from './client';

export async function fetchParkings(lat, lng) {
  const response = await apiClient.get('/parkings', { params: { lat, lng } });
  return response.data.data;
}

export async function fetchDirections(origin, destination) {
  const response = await apiClient.get('/transit/directions', {
    params: {
      originLat: origin.latitude,
      originLng: origin.longitude,
      destinationLat: destination.latitude,
      destinationLng: destination.longitude
    }
  });

  return response.data.data;
}
