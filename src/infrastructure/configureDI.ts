import { Container } from './container';
import { IBaseService } from '../services/interfaces/IBaseService';
import { BaseService } from '../services/baseService';
import { IBaseRepository } from '../repositories/interfaces/IBaseRepository';
import { BaseRepository } from '../repositories/baseRepository';
export function configureDI(): Container {
  const container = new Container();
  
  container.register<IBaseRepository>('IBaseRepository', new BaseRepository());
  container.register<IBaseService>('IBaseService', new BaseService(container.resolve<IBaseRepository>('IBaseRepository')));

  return container;
}