import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ABC Ignite API',
    version: '1.0.0',
    description: 'API documentation for ABC Ignite workout club management',
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Local server' }
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

export default swaggerJsdoc(options); 