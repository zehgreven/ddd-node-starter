import 'reflect-metadata';

import { Container } from 'inversify';

import { AuthService } from '@src/Domain/Auth/AuthService';
import { IUserRepository } from '@src/Domain/User/IUserRepository';
import { TypeOrmUserRepository } from '@src/Domain/User/TypeOrmUserRepository';
import { UserService } from '@src/Domain/User/UserService';
import { SignInController } from '@src/Http/Controllers/Auth/SignInController';
import { SignUpController } from '@src/Http/Controllers/Auth/SignUpController';
import { HomeController } from '@src/Http/Controllers/HomeController';
import { UserController } from '@src/Http/Controllers/UserController';

import TYPES from './types';

const container: Container = new Container();

container.bind<IUserRepository>('UserRepository').to(TypeOrmUserRepository);

container.bind<UserService>('UserService').to(UserService);
container.bind<AuthService>('AuthService').to(AuthService);

container.bind<HomeController>(TYPES.Controller).to(HomeController);
container.bind<UserController>(TYPES.Controller).to(UserController);
container.bind<SignInController>(TYPES.Controller).to(SignInController);
container.bind<SignUpController>(TYPES.Controller).to(SignUpController);

export default container;
