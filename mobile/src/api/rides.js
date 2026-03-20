import { apiClient } from './client';

export async function fetchRides() {
  const response = await apiClient.get('/rides');
  return response.data.data;
}

export async function createRide(ride) {
  const response = await apiClient.post('/rides', ride);
  return response.data.data;
}

export async function calculateCo2(distanceKm, passengers = 1) {
  const response = await apiClient.get('/calculateCO2', { params: { distance: distanceKm, passengers } });
  return response.data.data;
}
