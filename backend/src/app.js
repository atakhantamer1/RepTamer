import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { parkingRouter } from './routes/parkingRoutes.js';
import { rideRouter } from './routes/rideRoutes.js';
import { co2Router } from './routes/co2Routes.js';
import { transitRouter } from './routes/transitRoutes.js';

export function createApp() {
  const app = express();

  app.use(cors({ origin: env.corsOrigin }));
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/parkings', parkingRouter);
  app.use('/api/rides', rideRouter);
  app.use('/api/calculateCO2', co2Router);
  app.use('/api/transit', transitRouter);

  app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({ error: 'Interner Serverfehler', detail: error.message });
  });

  return app;
}
