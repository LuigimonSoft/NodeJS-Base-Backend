import { ErrorCode } from "../utils/errorCodes";
import { CustomError, typeErrors } from "../utils/customError";
import { BaseRepository } from "../repositories/baseRepository";

export class BaseService {
  constructor(private baseRepository: BaseRepository) { }

}