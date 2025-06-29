import request from 'supertest';
import app from '../../src/app.js';
import Class from '../../src/models/class.model.js';

// Helper to clear the Class table
const clearClasses = async () => {
  await Class.destroy({ where: {} });
};

describe('Classes API', () => {
  beforeEach(async () => {
    await clearClasses();
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
    const dbClasses = await Class.findAll({ where: { name: 'Yoga' } });
    expect(dbClasses.length).toBe(3);
  });

  it('should fail with validation error', async () => {
    const res = await request(app)
      .post('/api/classes')
      .send({ name: 'Yoga' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });
}); 