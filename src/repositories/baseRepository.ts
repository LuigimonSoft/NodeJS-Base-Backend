import { ErrorCode } from "../utils/errorCodes";
import { CustomError, typeErrors } from "../utils/customError";
import { IBaseRepository } from "./interfaces/IBaseRepository";

export class BaseRepository implements IBaseRepository{
  private text: string = "Hello World!";

  public async getMessage(): Promise<string> {
    return this.text;
  }

  public async setMessage(message: string): Promise<void> {
    this.text = message;
  }
}