import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/parkride',
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY ?? 'demo-key',
  mobiDataParkApiUrl: process.env.MOBIDATA_PARK_API_URL ?? 'https://api.mobidata-bw.de/park-api/parkings',
  dbBahnParkApiUrl: process.env.DB_BAHNPARK_API_URL ?? 'https://api.deutschebahn.com/bahnpark/v1/parking-lots',
  hafasApiUrl: process.env.HAFAS_API_URL ?? 'https://v6.db.transport.rest',
  vvoApiUrl: process.env.VVO_API_URL ?? 'https://webapi.vvo-online.de/tr/pointfinder',
  corsOrigin: process.env.CORS_ORIGIN ?? '*'
};
