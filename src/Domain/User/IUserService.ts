import { Pagination } from '../Core/Pagination';
import { User } from './User';

export interface IUserService {
  /**
   * @param {Pagination} pagination
   * @returns {Promise<User[]>}
   */
  all(pagination: Pagination): Promise<[User[], number]>;

  /**
   * @param {string} id
   * @returns {Promise<User>}
   */
  byId(id: string): Promise<User>;

  /**
   * @param {string} id
   * @returns {Promise<void>}
   */
  remove(id: string): Promise<void>;
}
