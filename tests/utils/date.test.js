import { isDateInFuture, getDatesBetween, compareDate } from '../../src/utils/date.js';

describe('date utils', () => {
  describe('isDateInFuture', () => {
    it('should return true for a future date', () => {
      const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      expect(isDateInFuture(futureDate)).toBe(true);
    });
    it('should return false for a past date', () => {
      const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      expect(isDateInFuture(pastDate)).toBe(false);
    });
    it('should return false for today', () => {
      const today = new Date().toISOString();
      expect(isDateInFuture(today)).toBe(false);
    });
  });

  describe('getDatesBetween', () => {
    it('should return all dates between two dates inclusive', () => {
      const start = '2024-06-01';
      const end = '2024-06-03';
      const result = getDatesBetween(start, end);
      expect(result.length).toBe(3);
      expect(result[0].toISOString().slice(0, 10)).toBe('2024-06-01');
      expect(result[2].toISOString().slice(0, 10)).toBe('2024-06-03');
    });
    it('should return one date if start and end are the same', () => {
      const date = '2024-06-01';
      const result = getDatesBetween(date, date);
      expect(result.length).toBe(1);
      expect(result[0].toISOString().slice(0, 10)).toBe(date);
    });
    it('should return an empty array if start is after end', () => {
      const result = getDatesBetween('2024-06-03', '2024-06-01');
      expect(result.length).toBe(0);
    });
  });

  describe('compareDate', () => {
    it('should return true for the same date', () => {
      expect(compareDate('2024-06-01', '2024-06-01')).toBe(true);
    });
    it('should return false for different dates', () => {
      expect(compareDate('2024-06-01', '2024-06-02')).toBe(false);
    });
    it('should return true for same date with different time', () => {
      expect(compareDate('2024-06-01T10:00:00Z', '2024-06-01T23:59:59Z')).toBe(true);
    });
  });
}); 