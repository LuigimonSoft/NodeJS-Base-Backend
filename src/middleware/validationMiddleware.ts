import { Request, Response, NextFunction } from 'express';

import { CustomError, typeErrors } from '../utils/customError';

type ValidationRule = {
  validate: (value: any) => boolean;
  errorCode: number;
};

enum typeParameters {
  BODY = 'body',
  QUERY = 'query',
  PARAMS = 'params'
}

class ValidationChain {
  private field: string;
  private rules: ValidationRule[];
  private typeParameter: typeParameters;

  constructor(field: string, typeParameter: typeParameters) {
    this.field = field;
    this.rules = [];
    this.typeParameter = typeParameter;
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

  getTypeParameter(): typeParameters {
    return this.typeParameter;
  }
}

export const body = (field: string) => new ValidationChain(field, typeParameters.BODY);
export const query = (field: string) => new ValidationChain(field, typeParameters.QUERY);
export const params = (field: string) => new ValidationChain(field, typeParameters.PARAMS);

export function validateRequest(validators: ValidationChain[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: Record<string, string[]> = {};
    const errorCodes: Record<string, number[]> = {};
    const errorsResult: CustomError[] = [];

    validators.forEach(validator => {
      const value = (validator.getTypeParameter() === typeParameters.BODY) ? req.body[validator.getField()] : (validator.getTypeParameter() === typeParameters.PARAMS)? req.params[validator.getField()] : req.query[validator.getField()];

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