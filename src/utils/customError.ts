import { ErrorCode, errorDetails } from './errorCodes';

export enum typeErrors {
  REPOSITORY_ERROR = 'RepositoryError',
  SERVICE_ERROR = 'ServiceError',
  CONTROLLER_ERROR = 'ControllerError',
  VALIDATION_ERROR = 'ValidationError',
  CUSTOM_ERROR = 'CustomError',
  UNKNOWN_ERROR = 'UnknownError',
  INFRASTRUCTURE_ERROR = 'InfrastructureError',
}

export class CustomError extends Error {
  public status: number;
  public code: ErrorCode;
  public title: string;
  public detail: string;
  public type: string;
  public instance: string;
  public additionalProperties: Record<string, string>;

  constructor(code: ErrorCode, typeError: typeErrors, method: string = "", error: any) {
    const { httpStatus, message } = errorDetails[code];
    super(message);
    this.detail = "";
    this.type = '';
    this.code = code;
    this.title = message;
    this.status = httpStatus;
    this.additionalProperties = {};

    if (error != null)
      this.detail = error.message;
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
      this.additionalProperties = { 'trace': typeError };

    this.instance = method;

  }
}