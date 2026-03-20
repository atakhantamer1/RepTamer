import axios from 'axios';
import { env } from '../config/env.js';
import { ParkingSpot } from '../models/index.js';
import { sampleParkings } from '../data/sampleData.js';
import { haversineDistanceKm, toPoint } from '../utils/geo.js';

function normalizeParking(rawParking, providerFallback = 'unknown') {
  const latitude = Number(rawParking.latitude ?? rawParking.lat ?? rawParking.position?.lat);
  const longitude = Number(rawParking.longitude ?? rawParking.lng ?? rawParking.position?.lng);

  return {
    id: String(rawParking.id ?? rawParking.stationId ?? `${providerFallback}-${latitude}-${longitude}`),
    name: rawParking.name ?? rawParking.title ?? 'Unbekannter Parkplatz',
    latitude,
    longitude,
    freeSpaces: Number(rawParking.freeSpaces ?? rawParking.free ?? rawParking.available ?? 0),
    totalSpaces: Number(rawParking.totalSpaces ?? rawParking.capacity ?? 0),
    provider: rawParking.provider ?? providerFallback,
    sourceUpdatedAt: rawParking.updatedAt ?? rawParking.lastUpdated ?? new Date().toISOString(),
    location: toPoint(longitude, latitude)
  };
}

async function fetchMobiDataParkings(lat, lng) {
  // Beispiel für Echtzeit-Abfrage an die MobiData-BW-Park-API.
  const response = await axios.get(env.mobiDataParkApiUrl, {
    params: { lat, lng, radius: 5000 }
  });

  const parkings = response.data?.parkings ?? response.data?.data ?? [];
  return parkings.map((parking) => normalizeParking(parking, 'MobiData BW'));
}

async function fetchDbBahnParkings(lat, lng) {
  const response = await axios.get(env.dbBahnParkApiUrl, {
    params: { lat, lng, radius: 5000 }
  });

  const parkings = response.data?.items ?? response.data?.parkings ?? [];
  return parkings.map((parking) => normalizeParking(parking, 'DB BahnPark'));
}

export async function updateNearbyParkings(lat, lng) {
  try {
    const [mobiDataParkings, dbParkings] = await Promise.all([
      fetchMobiDataParkings(lat, lng),
      fetchDbBahnParkings(lat, lng)
    ]);

    const mergedParkings = [...mobiDataParkings, ...dbParkings];
    await Promise.all(
      mergedParkings.map((parking) =>
        ParkingSpot.upsert({
          ...parking,
          location: toPoint(parking.longitude, parking.latitude)
        })
      )
    );

    return mergedParkings;
  } catch (error) {
    console.warn('Externe Park-APIs nicht erreichbar, nutze Seed-Daten.', error.message);
    return sampleParkings.map((parking) => normalizeParking(parking, parking.provider));
  }
}

export async function getNearbyParkings(lat, lng) {
  const externalOrSeed = await updateNearbyParkings(lat, lng);

  const withDistance = externalOrSeed
    .map((parking) => ({
      ...parking,
      distanceKm: haversineDistanceKm(lat, lng, parking.latitude, parking.longitude)
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm);

  return withDistance;
}
