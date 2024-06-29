import { Request, Response, NextFunction } from 'express';

import { CustomError, typeErrors } from '../utils/customError';
import { ErrorCode } from '../utils/errorCodes';
import { BaseService } from '../services/baseService';


export class baseController {
  constructor(private baseService: BaseService) { }
  
}