export enum ErrorCode {
  INVALID_JSON_FORMAT = 1013,
  UNEXPECTED_JSON_FORMAT = 1014,
  DATABASE_ERROR = 4001,
  INTERNAL_SERVER_ERROR = 5001
}

export const errorDetails = {
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
  }
}