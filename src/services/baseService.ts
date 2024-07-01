import { ErrorCode } from "../utils/errorCodes";
import { CustomError, typeErrors } from "../utils/customError";
import { IBaseRepository } from "../repositories/interfaces/IBaseRepository";
import { IBaseService } from "./interfaces/IBaseService";

export class BaseService implements IBaseService{
  constructor(private baseRepository: IBaseRepository) { }

}