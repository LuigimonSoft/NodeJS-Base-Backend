import { ServiceFactory } from "di-types";

export interface IContainer {
  register<T>(name: string, instance: T): void;
  registerFactory<T>(name: string, factory: ServiceFactory<T>): void;
  resolve<T>(name: string, createNew: boolean): T;
}