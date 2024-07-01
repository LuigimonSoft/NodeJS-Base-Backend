import { Router } from 'express';

import { baseController } from '../controllers/baseController';
import { Container } from '../infrastructure/container';

export function BaseRoutes(container: Container): Router {
  const router = Router();
  const eventController = new baseController(container.resolve('IBaseService'));

  return router;

}