import BaseUsecase from './base.usecase.js';
import { bookings } from '../repository/storage.js';

export default class SearchBookingsUsecase extends BaseUsecase {
  static create(request, response) {
    return new SearchBookingsUsecase(request, response);
  }

  async execute() {
    const { member, startDate, endDate } = this.request.query;
    let results = bookings;
    if (member) {
      results = results.filter(b => b.memberName === member);
    }
    if (startDate && endDate) {
      results = results.filter(b => b.participationDate >= startDate && b.participationDate <= endDate);
    } else if (startDate) {
      results = results.filter(b => b.participationDate >= startDate);
    } else if (endDate) {
      results = results.filter(b => b.participationDate <= endDate);
    }
    return results.map(b => ({
      className: b.className,
      classStartTime: b.classStartTime,
      bookingDate: b.participationDate,
      member: b.memberName
    }));
  }
} 