import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Class = sequelize.define('Class', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  startTime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bookings: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'classes',
  timestamps: false,
  initialAutoIncrement: '1000'
});

export default Class; 