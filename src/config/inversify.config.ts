import 'reflect-metadata';

import { Container } from 'inversify';

import { AuthService } from '@src/Domain/Auth/AuthService';
import { IRoleRepository } from '@src/Domain/Role/IRoleRepository';
import { RoleService } from '@src/Domain/Role/RoleService';
import { RoleTypeOrmRepository } from '@src/Domain/Role/RoleTypeOrmRepository';
import { IUserRepository } from '@src/Domain/User/IUserRepository';
import { UserService } from '@src/Domain/User/UserService';
import { UserTypeOrmRepository } from '@src/Domain/User/UserTypeOrmRepository';
import { SignInController } from '@src/Http/Controllers/Auth/SignInController';
import { SignUpController } from '@src/Http/Controllers/Auth/SignUpController';
import { HomeController } from '@src/Http/Controllers/HomeController';
import { RoleController } from '@src/Http/Controllers/RoleController';
import { UserController } from '@src/Http/Controllers/UserController';

import TYPES from './types';

const container: Container = new Container();

container.bind<IUserRepository>('UserRepository').to(UserTypeOrmRepository);
container.bind<IRoleRepository>('RoleRepository').to(RoleTypeOrmRepository);

container.bind<UserService>('UserService').to(UserService);
container.bind<AuthService>('AuthService').to(AuthService);
container.bind<RoleService>('RoleService').to(RoleService);

container.bind<HomeController>(TYPES.Controller).to(HomeController);
container.bind<UserController>(TYPES.Controller).to(UserController);
container.bind<SignInController>(TYPES.Controller).to(SignInController);
container.bind<SignUpController>(TYPES.Controller).to(SignUpController);
container.bind<RoleController>(TYPES.Controller).to(RoleController);

export default container;
