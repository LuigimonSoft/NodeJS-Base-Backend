export enum ErrorCode {
  REQUIRED = 1001,
  EMPTY = 1002,
  MAX_LENGTH = 1003,
  INVALID_JSON_FORMAT = 1013,
  UNEXPECTED_JSON_FORMAT = 1014,
  DATABASE_ERROR = 4001,
  INTERNAL_SERVER_ERROR = 5001,
  DEPENDENCY_INJECTION_ERROR = 5002
}

export const errorDetails = {
  [ErrorCode.REQUIRED]: {
    httpStatus: 400,
    message: 'The field is required'
  },
  [ErrorCode.EMPTY]: {
    httpStatus: 400,
    message: 'The field cannot be empty'
  },
  [ErrorCode.MAX_LENGTH]: {
    httpStatus: 400,
    message: 'The field must be less than 35 characters'
  },
  [ErrorCode.INVALID_JSON_FORMAT]: {
    httpStatus: 400,
    message: 'Invalid JSON format'
  },
  [ErrorCode.UNEXPECTED_JSON_FORMAT]: {
    httpStatus: 400,
    message: 'Unexpected JSON format'
  },
  [ErrorCode.INTERNAL_SERVER_ERROR]: {
    httpStatus: 500,
    message: 'Internal server error'
  },
  [ErrorCode.DATABASE_ERROR]: {
    httpStatus: 500,
    message: 'Database error'
  },
  [ErrorCode.DEPENDENCY_INJECTION_ERROR]: {
    httpStatus: 500,
    message: 'Dependency injection not found'
  }
}