
declare module 'di-types' {
  export type ServiceFactory<T> = () => T;
}