import { Router } from 'express';
import { fetchGoogleDirections, fetchTransitOptions } from '../services/transitService.js';

export const transitRouter = Router();

transitRouter.get('/nearby', async (req, res, next) => {
  try {
    const latitude = Number(req.query.lat);
    const longitude = Number(req.query.lng);
    const data = await fetchTransitOptions({ latitude, longitude });
    return res.json({ data });
  } catch (error) {
    return next(error);
  }
});

transitRouter.get('/directions', async (req, res, next) => {
  try {
    const origin = { lat: Number(req.query.originLat), lng: Number(req.query.originLng) };
    const destination = { lat: Number(req.query.destinationLat), lng: Number(req.query.destinationLng) };
    const data = await fetchGoogleDirections({ origin, destination });
    return res.json({ data });
  } catch (error) {
    return next(error);
  }
});
