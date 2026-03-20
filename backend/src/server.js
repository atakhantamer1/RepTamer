import { createApp } from './app.js';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';
import { ensureSampleRides } from './services/rideService.js';
import './models/index.js';

const app = createApp();

async function bootstrap() {
  try {
    await connectDatabase();
    await ensureSampleRides();
    app.listen(env.port, () => {
      console.log(`Park&Ride backend listening on port ${env.port}`);
    });
  } catch (error) {
    console.error('Fehler beim Starten des Backends', error);
    process.exit(1);
  }
}

bootstrap();
