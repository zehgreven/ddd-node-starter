import * as bcrypt from 'bcrypt';
import { injectable, inject } from 'inversify';
import * as jwt from 'jsonwebtoken';

import { IAuthService } from '../../Domain/Core/IAuthService';
import { IUserRepository } from '../../Domain/User/IUserRepository';
import { User } from '../../Domain/User/User';
import { UserException } from '../../Domain/User/UserException';
import { SignInDTO } from '../DTO/Auth/SignInDTO';
import { SignUpDTO } from '../DTO/Auth/SignUpDTO';

@injectable()
export class AuthService implements IAuthService {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * @param {SignInDTO} DTO
   * @returns {Promise<any>}
   */
  public signIn(DTO: SignInDTO): Promise<any> {
    return this.userRepository.byLogin(DTO.login).then((user: User) => {
      if (user && bcrypt.compareSync(DTO.password, user.password)) {
        return { token: jwt.sign({ id: user.id }, process.env.JWT_SECRET) };
      }

      throw UserException.authorized();
    });
  }

  /**
   * @param {SignUpDTO} DTO
   * @returns {Promise<User>}
   */
  public signUp(DTO: SignUpDTO) {
    const user = User.register(DTO.login, bcrypt.hashSync(DTO.password, bcrypt.genSaltSync(10)));
    return this.userRepository.store(user);
  }
}
