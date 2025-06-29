import BaseUsecase from './base.usecase.js';
import Joi from 'joi';
import Class from '../models/class.model.js';
import { isDateInFuture, getDatesBetween, compareDate } from '../utils/date.js';
import { Op } from 'sequelize';

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
    // Check for existing classes in DB
    const dateStrings = classDates.map(date => date.toISOString().split('T')[0]);
    const existing = await Class.findAll({
      where: {
        name,
        date: { [Op.in]: dateStrings }
      }
    });
    if (existing.length > 0) {
      throw new Error(`Class with name '${name}' already exists on one or more selected dates.`);
    }
    // Create classes
    const toCreate = classDates.map(date => ({
      name,
      date: date.toISOString().split('T')[0],
      startTime,
      duration,
      capacity,
      bookings: 0
    }));
    await Class.bulkCreate(toCreate);
    return { message: 'Classes created', count: classDates.length };
  }
} 