import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class RideOffer extends Model {}

RideOffer.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    startLocation: {
      type: DataTypes.GEOMETRY('POINT', 4326),
      allowNull: false
    },
    destinationLocation: {
      type: DataTypes.GEOMETRY('POINT', 4326),
      allowNull: false
    },
    startLatitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    startLongitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    destinationLatitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    destinationLongitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    availableSeats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'RideOffer',
    tableName: 'ride_offers'
  }
);
