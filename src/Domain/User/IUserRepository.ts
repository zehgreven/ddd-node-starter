import { Pagination } from '../Core/Pagination';
import { User } from './User';

export interface IUserRepository {
  /**
   * @param {Pagination} pagination
   * @returns {Promise<[User[] , number]>}
   */
  all(pagination: Pagination): Promise<[User[], number]>;

  /**
   * @param {string} id
   * @returns {Promise<User>}
   */
  byId(id: string): Promise<User>;

  /**
   * @param {string} login
   * @returns {Promise<User>}
   */
  byLogin(login: string): Promise<User>;

  /**
   * @param {User} user
   */
  save(user: User): Promise<User>;
}
