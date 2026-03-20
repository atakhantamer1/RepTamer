import axios from 'axios';
import { env } from '../config/env.js';

export async function fetchTransitOptions({ latitude, longitude }) {
  const [hafasResponse, vvoResponse] = await Promise.allSettled([
    axios.get(`${env.hafasApiUrl}/locations/nearby`, { params: { latitude, longitude, results: 5 } }),
    axios.get(env.vvoApiUrl, { params: { query: `${latitude},${longitude}`, limit: 5 } })
  ]);

  return {
    hafas: hafasResponse.status === 'fulfilled' ? hafasResponse.value.data : { warning: 'HAFAS nicht erreichbar' },
    vvo: vvoResponse.status === 'fulfilled' ? vvoResponse.value.data : { warning: 'VVO API nicht erreichbar' }
  };
}

export async function fetchGoogleDirections({ origin, destination, apiKey = env.googleMapsApiKey }) {
  const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
    params: {
      origin: `${origin.lat},${origin.lng}`,
      destination: `${destination.lat},${destination.lng}`,
      mode: 'driving',
      key: apiKey
    }
  });

  return response.data;
}
