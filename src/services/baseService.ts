import { ErrorCode } from "../utils/errorCodes";
import { CustomError, typeErrors } from "../utils/customError";
import { IBaseRepository } from "../repositories/interfaces/IBaseRepository";
import { IBaseService } from "./interfaces/IBaseService";

export class BaseService implements IBaseService{
  constructor(private baseRepository: IBaseRepository) { }

  public async getMessage(): Promise<string> {
    try {
      return await this.baseRepository.getMessage();
    } catch (error) {
      throw new CustomError(ErrorCode.INTERNAL_SERVER_ERROR, typeErrors.SERVICE_ERROR, 'getMessage', error);
    }
  }

  public async setMessage(message: string): Promise<void> {
    try {
      await this.baseRepository.setMessage(message);
    } catch (error) {
      throw new CustomError(ErrorCode.INTERNAL_SERVER_ERROR, typeErrors.SERVICE_ERROR, 'setMessage', error);
    }
  }
}