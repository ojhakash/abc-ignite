import sequelize from '../src/config/db.js';

beforeAll(async () => {
  await sequelize.sync({ force: true });
}); 