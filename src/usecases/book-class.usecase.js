import BaseUsecase from './base.usecase.js';
import Joi from 'joi';
import Class from '../models/class.model.js';
import Booking from '../models/booking.model.js';
import { isDateInFuture } from '../utils/date.js';

const bookingSchema = Joi.object({
  memberName: Joi.string().required(),
  className: Joi.string().required(),
  participationDate: Joi.string().isoDate().required()
});

export default class BookClassUsecase extends BaseUsecase {
  static create(request, response) {
    return new BookClassUsecase(request, response);
  }

  async execute() {
    const { error, value } = bookingSchema.validate(this.request.body);
    if (error) {
      throw new Error(error.details.map(d => d.message).join(', '));
    }
    const { memberName, className, participationDate } = value;
    if (!isDateInFuture(participationDate)) {
      throw new Error('Participation date must be in the future.');
    }
    // Find the class instance in DB
    const classInstance = await Class.findOne({
      where: {
        name: className,
        date: participationDate
      }
    });
    if (!classInstance) {
      throw new Error('Class not found for the given date.');
    }
    if (classInstance.bookings >= classInstance.capacity) {
      throw new Error('Class is at full capacity.');
    }
    // Book: increment bookings and create Booking record
    classInstance.bookings += 1;
    await classInstance.save();
    const booking = await Booking.create({
      memberName,
      className,
      participationDate,
      classStartTime: classInstance.startTime
    });
    return { message: 'Booking successful', booking };
  }
} 