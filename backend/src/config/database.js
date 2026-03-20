import { Sequelize } from 'sequelize';
import { env } from './env.js';

export const sequelize = new Sequelize(env.databaseUrl, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: process.env.DATABASE_SSL === 'true' ? { require: true, rejectUnauthorized: false } : false
  }
});

export async function connectDatabase() {
  await sequelize.authenticate();
  await sequelize.sync();
}
