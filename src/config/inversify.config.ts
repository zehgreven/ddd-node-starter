import 'reflect-metadata';

import { Container } from 'inversify';

import { IAuthService } from '../Domain/Core/IAuthService';
import { IUserRepository } from '../Domain/User/IUserRepository';
import { IUserService } from '../Domain/User/IUserService';
import { SignInController } from '../Http/Controllers/Auth/SignInController';
import { SignUpController } from '../Http/Controllers/Auth/SignUpController';
import { HomeController } from '../Http/Controllers/HomeController';
import { UserController } from '../Http/Controllers/UserController';
import { TypeOrmUserRepository } from '../Infrastructure/Domain/TypeOrm/TypeOrmUserRepository';
import { AuthService } from '../Infrastructure/Services/AuthService';
import { UserService } from '../Infrastructure/Services/UserService';
import TYPES from './types';

const container: Container = new Container();

container.bind<IUserRepository>('UserRepository').to(TypeOrmUserRepository);

container.bind<IUserService>('IUserService').to(UserService);
container.bind<IAuthService>('IAuthService').to(AuthService);

container.bind<HomeController>(TYPES.Controller).to(HomeController);
container.bind<UserController>(TYPES.Controller).to(UserController);
container.bind<SignInController>(TYPES.Controller).to(SignInController);
container.bind<SignUpController>(TYPES.Controller).to(SignUpController);

export default container;
