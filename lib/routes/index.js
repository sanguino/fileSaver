import { Router } from 'express';
import validate from 'express-validation';
import FileController from '../controllers/FileController';
import checkBody from '../validators/validateRequest';

function getRoutes() {
  const routes = Router();
  routes.post('/savefile', validate(checkBody), FileController.saveFile);
  return routes;
}

export default getRoutes();
