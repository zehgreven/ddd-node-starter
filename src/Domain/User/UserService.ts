import { injectable, inject } from 'inversify';

import { Pagination } from '../Core/Pagination';
import { IUserRepository } from './IUserRepository';
import { User } from './User';

@injectable()
export class UserService {
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
