import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import classesRoutes from './routes/classes.routes.js';
import bookingsRoutes from './routes/bookings.routes.js';

const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use('/api/classes', classesRoutes);
app.use('/api/bookings', bookingsRoutes);

app.get('/', (req, res) => {
  res.redirect('/docs');
});

// Default 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

export default app; 