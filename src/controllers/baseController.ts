import { Request, Response, NextFunction } from 'express';

import { CustomError, typeErrors } from '../utils/customError';
import { ErrorCode } from '../utils/errorCodes';
import { IBaseService } from '../services/interfaces/IBaseService';
import { setMessageValidator } from '../validators/baseValidator';


export class baseController {
  constructor(private baseService: IBaseService) { }
  
  public async getMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const message = await this.baseService.getMessage();
      res.status(200).json({ message });
    } catch (error) {
      this.raiseError(error, 'getMessage', next);
    }
  }

  public async setMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const message = req.body.message;
      await this.baseService.setMessage(message);
      res.status(200).json({ message });
    } catch (error) {
      this.raiseError(error, 'setMessage', next);
    }
  }

  public setMessageWithValidator() {
    return [setMessageValidator, (req: Request, res: Response, next: NextFunction) => this.setMessage(req, res, next)];
  }

  private raiseError(err: any, method: string, next: NextFunction) {
    if (err instanceof CustomError) {
      next(err);
    } else {
      const internalError: CustomError = new CustomError(ErrorCode.INTERNAL_SERVER_ERROR, typeErrors.CONTROLLER_ERROR, method, err);
      next(internalError);
    }
  }
}