import * as bcrypt from 'bcrypt';
import { injectable, inject } from 'inversify';
import * as jwt from 'jsonwebtoken';

import { IUserRepository } from '../User/IUserRepository';
import { User } from '../User/User';
import { UserException } from '../User/UserException';
import { SignInDTO } from './SignInDTO';
import { SignUpDTO } from './SignUpDTO';

@injectable()
export class AuthService {
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
  public signUp(DTO: SignUpDTO): Promise<User> {
    const user = User.register(DTO.login, bcrypt.hashSync(DTO.password, bcrypt.genSaltSync(10)));
    return this.userRepository.store(user);
  }
}
