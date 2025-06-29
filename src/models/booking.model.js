import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  memberName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  className: {
    type: DataTypes.STRING,
    allowNull: false
  },
  participationDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  classStartTime: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'bookings',
  timestamps: false,
  initialAutoIncrement: '1000'
});

// Optionally, set up association
// Booking.belongsTo(Class, { foreignKey: 'className', targetKey: 'name' });

export default Booking; 