import { CreateClassUsecase } from '../usecases/index.js';

const classesController = {
  createClasses: (req, res) => {
    const usecase = CreateClassUsecase.create(req, res);
    usecase.executeAndHandleErrors();
  }
};

export default classesController; 