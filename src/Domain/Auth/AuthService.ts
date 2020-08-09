import * as bcrypt from 'bcrypt';
import { injectable, inject } from 'inversify';
import * as jwt from 'jsonwebtoken';
import { uuid } from 'uuidv4';

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
        return this.generateToken(user);
      }

      throw UserException.authorized();
    });
  }

  public refreshToken(token) {
    if (!token) {
      throw new Error('token is empty');
    }

    return jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          throw new Error('token expired');
        }
        throw error;
      }

      if (!decoded || !decoded.id) {
        throw new Error('not authorized');
      }

      return this.generateToken(decoded);
    });
  }

  private generateToken(user: any): any {
    return {
      token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: Number.parseInt(process.env.JWT_TOKEN_EXPIRES_IN, 10),
      }),
      'refresh-token': jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: Number.parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN, 10),
      }),
    };
  }

  /**
   * @param {SignUpDTO} DTO
   * @returns {Promise<User>}
   */
  public signUp(DTO: SignUpDTO): Promise<User> {
    const user = User.register(DTO.login, bcrypt.hashSync(DTO.password, bcrypt.genSaltSync(10)));
    return this.userRepository.save(user);
  }
}
