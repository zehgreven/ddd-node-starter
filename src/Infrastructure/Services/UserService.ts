import { injectable, inject } from 'inversify';

import { Pagination } from '../../Domain/Core/Pagination';
import { IUserRepository } from '../../Domain/User/IUserRepository';
import { IUserService } from '../../Domain/User/IUserService';
import { User } from '../../Domain/User/User';

@injectable()
export class UserService implements IUserService {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * @param {Pagination} pagination
   * @returns {Promise<User[]>}
   */
  public all(pagination: Pagination): Promise<[User[], number]> {
    return this.userRepository.all(pagination);
  }

  /**
   * @param {string} id
   * @returns {Promise<User>}
   */
  public byId(id: string): Promise<User> {
    return this.userRepository.byId(id);
  }

  /**
   * @param {string} id
   * @returns {Promise<void>}
   */
  public remove(id: string): Promise<void> {
    return this.userRepository.byId(id).then((user: User) => {
      user.remove();
      this.userRepository.store(user);
    });
  }
}
