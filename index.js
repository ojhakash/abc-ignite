import dotenv from 'dotenv';
dotenv.config();
import app from './src/app.js';
import sequelize from './src/config/db.js';

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
  });
}); 