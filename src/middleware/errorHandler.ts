import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../utils/customError';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }
  let errorsResult: CustomError[] = [];

  if (err instanceof CustomError) {
    errorsResult.push(err as CustomError);
  } else
    errorsResult = err as CustomError[];

  console.log(`[Errors]`, { errorsResult });
  res.status(errorsResult[0].status || 500).json(errorsResult);
}