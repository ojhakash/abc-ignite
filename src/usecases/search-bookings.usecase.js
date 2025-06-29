import BaseUsecase from './base.usecase.js';
import Booking from '../models/booking.model.js';
import { Op } from 'sequelize';

export default class SearchBookingsUsecase extends BaseUsecase {
  static create(request, response) {
    return new SearchBookingsUsecase(request, response);
  }

  async execute() {
    const { member, startDate, endDate } = this.request.query;
    const where = {};
    if (member) {
      where.memberName = member;
    }
    if (startDate && endDate) {
      where.participationDate = { [Op.between]: [startDate, endDate] };
    } else if (startDate) {
      where.participationDate = { [Op.gte]: startDate };
    } else if (endDate) {
      where.participationDate = { [Op.lte]: endDate };
    }
    const results = await Booking.findAll({ where });
    return results.map(b => ({
      className: b.className,
      classStartTime: b.classStartTime,
      bookingDate: b.participationDate,
      member: b.memberName
    }));
  }
} 