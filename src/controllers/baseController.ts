import { Request, Response, NextFunction } from 'express';

import { CustomError, typeErrors } from '../utils/customError';
import { ErrorCode } from '../utils/errorCodes';
import { IBaseService } from '../services/interfaces/IBaseService';


export class baseController {
  constructor(private baseService: IBaseService) { }
  
}