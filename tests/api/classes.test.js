import request from 'supertest';
import app from '../../src/app.js';
import { classes } from '../../src/repository/storage.js';

describe('Classes API', () => {
  beforeEach(() => {
    classes.length = 0; // Reset in-memory storage
  });

  it('should create classes for a date range', async () => {
    const res = await request(app)
      .post('/api/classes')
      .send({
        name: 'Yoga',
        startDate: '2099-01-01',
        endDate: '2099-01-03',
        startTime: '10:00',
        duration: 60,
        capacity: 5
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Classes created');
    expect(res.body).toHaveProperty('count', 3);
    expect(classes.length).toBe(3);
  });

  it('should fail with validation error', async () => {
    const res = await request(app)
      .post('/api/classes')
      .send({ name: 'Yoga' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });
}); 