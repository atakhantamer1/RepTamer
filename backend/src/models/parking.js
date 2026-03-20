import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class ParkingSpot extends Model {}

ParkingSpot.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.GEOMETRY('POINT', 4326),
      allowNull: false
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    freeSpaces: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    totalSpaces: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sourceUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'ParkingSpot',
    tableName: 'parking_spots'
  }
);
