import { BookClassUsecase, SearchBookingsUsecase } from '../usecases/index.js';

const bookingsController = {
  bookClass: (req, res) => {
    const usecase = BookClassUsecase.create(req, res);
    usecase.executeAndHandleErrors();
  },
  searchBookings: (req, res) => {
    const usecase = SearchBookingsUsecase.create(req, res);
    usecase.executeAndHandleErrors();
  }
};

export default bookingsController; 