import { Router } from 'express';
import { createRideOffer, listRides } from '../services/rideService.js';

export const rideRouter = Router();

rideRouter.get('/', async (_req, res, next) => {
  try {
    const rides = await listRides();
    return res.json({ data: rides });
  } catch (error) {
    return next(error);
  }
});

rideRouter.post('/', async (req, res, next) => {
  try {
    const ride = await createRideOffer(req.body);
    return res.status(201).json({ data: ride });
  } catch (error) {
    return next(error);
  }
});
