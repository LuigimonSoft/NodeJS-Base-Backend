export interface IBaseService {
  getMessage(): Promise<string>;
  setMessage(message: string): Promise<void>;
}