import 'reflect-metadata';

import { Container } from 'inversify';

import { IAuthService } from '../Domain/Core/IAuthService';
import { IUploadService } from '../Domain/Core/IUploadService';
import { FriendRequestRepository } from '../Domain/FriendRequest/FriendRequestRepository';
import { IFriendRequestService } from '../Domain/FriendRequest/IFriendRequestService';
import { IImageService } from '../Domain/Image/IImageService';
import { ImageRepository } from '../Domain/Image/ImageRepository';
import { IUserService } from '../Domain/User/IUserService';
import { UserRepository } from '../Domain/User/UserRepository';
import { SignInController } from '../Http/Controllers/Auth/SignInController';
import { SignUpController } from '../Http/Controllers/Auth/SignUpController';
import { FriendRequestController } from '../Http/Controllers/FriendRequestController';
import { HomeController } from '../Http/Controllers/HomeController';
import { ImageController } from '../Http/Controllers/ImageController';
import { ProfileController } from '../Http/Controllers/ProfileController';
import { UploadController } from '../Http/Controllers/UploadController';
import { UserController } from '../Http/Controllers/UserController';
import { TypeOrmFriendRequestRepository } from '../Infrastructure/Domain/TypeOrm/TypeOrmFriendRequestRepository';
import { TypeOrmImageRepository } from '../Infrastructure/Domain/TypeOrm/TypeOrmImageRepository';
import { TypeOrmUserRepository } from '../Infrastructure/Domain/TypeOrm/TypeOrmUserRepository';
import { AuthService } from '../Infrastructure/Services/AuthService';
import { FriendRequestService } from '../Infrastructure/Services/FriendRequestService';
import { ImageService } from '../Infrastructure/Services/ImageService';
import { MultipartUploadService } from '../Infrastructure/Services/MultipartUploadService';
import { UserService } from '../Infrastructure/Services/UserService';
import TYPES from './types';

const container: Container = new Container();

container.bind<UserRepository>('UserRepository').to(TypeOrmUserRepository);
container.bind<ImageRepository>('ImageRepository').to(TypeOrmImageRepository);
container.bind<FriendRequestRepository>('FriendRequestRepository').to(TypeOrmFriendRequestRepository);

container.bind<IUserService>('IUserService').to(UserService);
container.bind<IAuthService>('IAuthService').to(AuthService);
container.bind<IUploadService>('IUploadService').to(MultipartUploadService);
container.bind<IImageService>('IImageService').to(ImageService);
container.bind<IFriendRequestService>('IFriendRequestService').to(FriendRequestService);

container.bind<HomeController>(TYPES.Controller).to(HomeController);
container.bind<UserController>(TYPES.Controller).to(UserController);
container.bind<FriendRequestController>(TYPES.Controller).to(FriendRequestController);
container.bind<ProfileController>(TYPES.Controller).to(ProfileController);
container.bind<SignInController>(TYPES.Controller).to(SignInController);
container.bind<SignUpController>(TYPES.Controller).to(SignUpController);
container.bind<UploadController>(TYPES.Controller).to(UploadController);
container.bind<ImageController>(TYPES.Controller).to(ImageController);

export default container;
