import { RideOffer } from '../models/index.js';
import { sampleRides } from '../data/sampleData.js';
import { toPoint } from '../utils/geo.js';

export async function ensureSampleRides() {
  const count = await RideOffer.count();
  if (count > 0) return;

  await RideOffer.bulkCreate(
    sampleRides.map((ride) => ({
      ...ride,
      startLocation: toPoint(ride.startLongitude, ride.startLatitude),
      destinationLocation: toPoint(ride.destinationLongitude, ride.destinationLatitude)
    }))
  );
}

export async function listRides() {
  const rides = await RideOffer.findAll({ order: [['departureTime', 'ASC']] });
  return rides.map((ride) => ride.toJSON());
}

export async function createRideOffer(payload) {
  // DSGVO: Es werden bewusst keine Namen, Telefonnummern oder Account-IDs persistiert.
  // Die Fahrtenbeschreibung sollte keine personenbezogenen Daten enthalten.
  const ride = await RideOffer.create({
    ...payload,
    startLocation: toPoint(payload.startLongitude, payload.startLatitude),
    destinationLocation: toPoint(payload.destinationLongitude, payload.destinationLatitude)
  });

  return ride.toJSON();
}
