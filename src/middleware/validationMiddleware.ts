import { Request, Response, NextFunction } from 'express';

import { CustomError, typeErrors } from '../utils/customError';

type ValidationRule = {
  validate: (value: any) => boolean;
  errorCode: number;
};

class ValidationChain {
  private field: string;
  private rules: ValidationRule[];

  constructor(field: string) {
    this.field = field;
    this.rules = [];
  }

  notNull() {
    this.rules.push({
      validate: value => value !== null,
      errorCode: 0
    });
    return this;
  }

  notEmpty() {
    this.rules.push({
      validate: value => (value !== null) ? ((value !== undefined) ? ((value as string).trim().length > 0) : false) : true,
      errorCode: 0
    });
    return this;
  }

  isNumber() {
    this.rules.push({
      validate: value => !isNaN(value),
      errorCode: 0
    });
    return this;
  }

  MaxLength(length: number) {
    this.rules.push({
      validate: value => (value !== null) ? ((value !== undefined) ? (value.length <= length) : true) : true,
      errorCode: 0
    });
    return this;
  }

  withErrorCode(errorCode: number) {
    if (this.rules.length > 0) {
      this.rules[this.rules.length - 1].errorCode = errorCode;
    }
    return this;
  }

  getField() {
    return this.field;
  }

  getRules() {
    return this.rules;
  }
}

export const body = (field: string) => new ValidationChain(field);

export function validateRequest(validators: ValidationChain[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: Record<string, string[]> = {};
    const errorCodes: Record<string, number[]> = {};
    const errorsResult: CustomError[] = [];

    validators.forEach(validator => {
      const value = req.body[validator.getField()] || req.params[validator.getField()] || req.query[validator.getField()];

      validator.getRules().forEach(rule => {
        if (!rule.validate(value)) {
          if (!errors[validator.getField()]) {
            errors[validator.getField()] = [];
            errorCodes[validator.getField()] = [];
          }
          errorCodes[validator.getField()].push(rule.errorCode);
          errorsResult.push(new CustomError(rule.errorCode, typeErrors.VALIDATION_ERROR, req.originalUrl, null));
        }
      });
    });

    const hasErrors = Object.values(errorsResult).length > 0;

    if (hasErrors)
      next(errorsResult);
    else
      next();
  };
}