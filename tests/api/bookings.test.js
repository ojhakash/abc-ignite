import request from 'supertest';
import app from '../../src/app.js';
import Class from '../../src/models/class.model.js';
import Booking from '../../src/models/booking.model.js';

// Helper to clear tables
const clearAll = async () => {
  await Booking.destroy({ where: {} });
  await Class.destroy({ where: {} });
};

describe('Bookings API', () => {
  beforeEach(async () => {
    await clearAll();
  });

  it('should book a class for a member', async () => {
    // First, create a class
    const res1 = await request(app)
      .post('/api/classes')
      .send({
        name: 'Yoga',
        startDate: '2099-01-01',
        endDate: '2099-01-01',
        startTime: '10:00',
        duration: 60,
        capacity: 2
      });
      
    // Book the class
    const res = await request(app)
      .post('/api/bookings')
      .send({
        memberName: 'Alice',
        className: 'Yoga',
        participationDate: '2099-01-01'
      });
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Booking successful');
    expect(res.body.booking).toHaveProperty('memberName', 'Alice');
    const dbBookings = await Booking.findAll({ where: { memberName: 'Alice' } });
    expect(dbBookings.length).toBe(1);
  });

  it('should fail to book a non-existent class', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({
        memberName: 'Bob',
        className: 'Pilates',
        participationDate: '2099-01-01'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Class not found for the given date.');
  });

  it('should search bookings by member', async () => {
    // Create class and booking
    await request(app)
      .post('/api/classes')
      .send({
        name: 'Yoga',
        startDate: '2099-01-01',
        endDate: '2099-01-01',
        startTime: '10:00',
        duration: 60,
        capacity: 2
      });
    await request(app)
      .post('/api/bookings')
      .send({
        memberName: 'Alice',
        className: 'Yoga',
        participationDate: '2099-01-01'
      });
    const res = await request(app)
      .get('/api/bookings?member=Alice');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('member', 'Alice');
  });
}); 