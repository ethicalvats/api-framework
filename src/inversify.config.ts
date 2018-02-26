import 'reflect-metadata'
import { interfaces, TYPE, controller } from 'inversify-express-utils';
import { Container } from 'inversify';
import TYPES from './types/types';


import { DemoController } from './controller/DemoController';
import { DemoService, DemoServiceImpl } from './service/DemoService'
import { DemoRepository, DemoRepositoryMongo, DemoRepositoryDb } from './repository/DemoRepository'



const container = new Container();

container.bind<interfaces.Controller>(TYPE.Controller).to(DemoController).whenTargetNamed('DemoController');
container.bind<DemoService>(TYPES.DemoService).to(DemoServiceImpl)
container.bind<DemoRepository>(TYPES.DemoNoSQLRepository).to(DemoRepositoryMongo)
container.bind<DemoRepository>(TYPES.DemoSQLRepository).to(DemoRepositoryDb)

export default container;