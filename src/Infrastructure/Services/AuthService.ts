import * as bcrypt from 'bcrypt';
import { injectable, inject } from 'inversify';
import * as jwt from 'jsonwebtoken';

import { IAuthService } from '../../Domain/Core/IAuthService';
import { User } from '../../Domain/User/User';
import { UserNotFound } from '../../Domain/User/UserNotFound';
import { UserRepository } from '../../Domain/User/UserRepository';
import { SignInDTO } from '../DTO/Auth/SignInDTO';
import { SignUpDTO } from '../DTO/Auth/SignUpDTO';

@injectable()
export class AuthService implements IAuthService {
  constructor(@inject('UserRepository') private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * @param {SignInDTO} DTO
   * @returns {Promise<any>}
   */
  public signIn(DTO: SignInDTO): Promise<any> {
    return this.userRepository.byEmail(DTO.email).then((user: User) => {
      if (user && bcrypt.compareSync(DTO.password, user.password)) {
        return { token: jwt.sign({ id: user.id }, process.env.JWT_SECRET) };
      }

      throw UserNotFound.authorized();
    });
  }

  /**
   * @param {SignUpDTO} DTO
   * @returns {Promise<User>}
   */
  public signUp(DTO: SignUpDTO) {
    const user = User.register(
      DTO.email,
      bcrypt.hashSync(DTO.password, bcrypt.genSaltSync(10)),
      DTO.firstName,
      DTO.lastName
    );

    return this.userRepository.store(user);
  }
}
