import BaseUsecase from './base.usecase.js';
import Joi from 'joi';
import { classes, bookings } from '../repository/storage.js';
import { compareDate, isDateInFuture } from '../utils/date.js';

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
    // Find the class instance
    const classInstance = classes.find(
      c => c.name === className && compareDate(c.date, participationDate)
    );
    if (!classInstance) {
      throw new Error('Class not found for the given date.');
    }
    if (classInstance.bookings >= classInstance.capacity) {
      throw new Error('Class is at full capacity.');
    }
    // Book
    classInstance.bookings += 1;
    const booking = {
      id: bookings.length + 1,
      memberName,
      className,
      participationDate,
      classStartTime: classInstance.startTime
    };
    bookings.push(booking);
    return { message: 'Booking successful', booking };
  }
} 