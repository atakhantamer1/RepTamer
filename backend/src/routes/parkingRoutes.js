import { Router } from 'express';
import { getNearbyParkings } from '../services/parkingService.js';

export const parkingRouter = Router();

parkingRouter.get('/', async (req, res, next) => {
  try {
    const lat = Number(req.query.lat);
    const lng = Number(req.query.lng);

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return res.status(400).json({ error: 'lat und lng sind erforderlich.' });
    }

    const parkings = await getNearbyParkings(lat, lng);
    return res.json({ data: parkings });
  } catch (error) {
    return next(error);
  }
});
