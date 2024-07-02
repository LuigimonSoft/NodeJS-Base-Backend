import { Router } from 'express';

import { baseController } from '../controllers/baseController';
import { Container } from '../infrastructure/container';

export function BaseRoutes(container: Container): Router {
  const router = Router();
  const eventController = new baseController(container.resolve('IBaseService'));

  /**
    * @swagger
    * /api/v1/base-example:
    *  get:
    *   tags:
    *    - base controller
    *    summary: Example of base endpoint with GET method
    *    responses:
    *      200:
    *         description: return a message from repository
    *        content:
    *          application/json:
    *            schema:
    *              type: object
    *              properties:
    *               message:
    *                type: json
    *                 example: { "message": "Hello World" }
    *     500:
    *      description: Internal server error
    *      content:
    *        application/json:
    *         schema:
    *           type: object
    *           properties:
    *             message:
    *               type: json
    *               example: {"detail": "","type": "","code": 5001,"title": "Internal server error","status": 500,"instance": "getEvents","additionalProperties": {} }
  */
  router.get('/base-example', eventController.getMessage.bind(eventController));

  /**
    * @swagger
    * /api/v1/base-example:
    *  post:
    *   tags:
    *    - base controller
    *    summary: Example of base endpoint with POST method
    *    requestBody:
    *      required: true
    *      content:
    *        application/json:
    *          schema:
    *            type: object
    *            required:
    *              - message
    *            properties:
    *              message:
    *                type: string
    *                example: "Hello World"
    *    responses:
    *      200:
    *         description: return a message from repository
    *        content:
    *          application/json:
    *            schema:
    *              type: object
    *              properties:
    *               message:
    *                type: json
    *                 example: { "message": "Hello World" }
    *     500:
    *      description: Internal server error
    *      content:
    *        application/json:
    *         schema:
    *           type: object
    *           properties:
    *             message:
    *               type: json
    *               example: {"detail": "","type": "","code": 5001,"title": "Internal server error","status": 500,"instance": "getEvents","additionalProperties": {} }
  */
  router.post('/base-example', eventController.setMessageWithValidator.bind(eventController));

  return router;

}