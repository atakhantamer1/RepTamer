import { Router } from 'express';
import { calculateCo2Savings } from '../utils/co2.js';

export const co2Router = Router();

co2Router.get('/', (req, res) => {
  const distance = Number(req.query.distance);
  const passengers = Number(req.query.passengers ?? 1);

  if (Number.isNaN(distance)) {
    return res.status(400).json({ error: 'distance ist erforderlich.' });
  }

  return res.json({
    data: {
      distanceKm: distance,
      passengers,
      co2SavedKg: calculateCo2Savings(distance, passengers)
    }
  });
});
