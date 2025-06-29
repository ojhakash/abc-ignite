import BaseUsecase from './base.usecase.js';
import Joi from 'joi';
import { classes } from '../repository/storage.js';
import { isDateInFuture, getDatesBetween, compareDate } from '../utils/date.js';

const classSchema = Joi.object({
  name: Joi.string().required(),
  startDate: Joi.string().isoDate().required(),
  endDate: Joi.string().isoDate().required(),
  startTime: Joi.string().required(),
  duration: Joi.number().required(),
  capacity: Joi.number().integer().min(1).required()
});

export default class CreateClassUsecase extends BaseUsecase {
  static create(request, response) {
    return new CreateClassUsecase(request, response);
  }

  async execute() {
    const { error, value } = classSchema.validate(this.request.body);
    if (error) {
      throw new Error(error.details.map(d => d.message).join(', '));
    }
    const { name, startDate, endDate, startTime, duration, capacity } = value;
    if (!isDateInFuture(endDate)) {
      throw new Error('End date must be in the future.');
    }
    // Generate class instances for each day
    const classDates = getDatesBetween(startDate, endDate);
    const classId = classes.length + 1;
    for (const date of classDates) {
      const exists = classes.some(
        c => c.name === name && compareDate(c.date, date.toISOString().split('T')[0])
      );
      if (exists) {
        throw new Error(`Class with name '${name}' already exists on date ${date.toISOString().split('T')[0]}`);
      }
    }
    classDates.forEach(date => {
      classes.push({
        id: `${classId}-${date.toISOString().split('T')[0]}`,
        name,
        date: date.toISOString().split('T')[0],
        startTime,
        duration,
        capacity,
        bookings: 0
      });
    });
    return { message: 'Classes created', count: classDates.length };
  }
} 