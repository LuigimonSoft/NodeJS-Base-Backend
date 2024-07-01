import { CustomError, typeErrors } from '../utils/customError';
import { ErrorCode } from '../utils/errorCodes';
import { ServiceFactory } from "di-types";
import { IContainer } from './interfaces/IContainer';

export class Container implements IContainer{
  private services: Map<string, any> = new Map();
  private factories: Map<string, ServiceFactory<any>> = new Map();

  register<T>(name: string, instance: T): void {
    this.services.set(name, instance);
  }
  registerFactory<T>(name: string, factory: ServiceFactory<T>): void {
    this.factories.set(name, factory);
  }

  resolve<T>(name: string, createNew: boolean = false): T {
    if (createNew) {
      const factory = this.factories.get(name);
      if (factory) {
        return factory();
      }
      throw new CustomError(ErrorCode.DEPENDENCY_INJECTION_ERROR, typeErrors.INFRASTRUCTURE_ERROR, `Container::resolve:${name}`, null);
    }

    const service = this.services.get(name);
    if (service) {
      return service as T;
    }

    const factory = this.factories.get(name);
    if (factory) {
      const instance = factory();
      this.services.set(name, instance);
      return instance;
    }

    throw new CustomError(ErrorCode.DEPENDENCY_INJECTION_ERROR, typeErrors.INFRASTRUCTURE_ERROR, `Container::resolve:${name}`, null);
  }
}