export interface IBaseRepository {
  getMessage(): Promise<string>;
  setMessage(message: string): Promise<void>;
}