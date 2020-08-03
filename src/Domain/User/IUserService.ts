import { ProfileDTO } from '../../Infrastructure/DTO/Profile/ProfileDTO';
import { Pagination } from '../Core/Pagination';
import { User } from './User';

export interface IUserService {
  /**
   * @param {Pagination} pagination
   * @returns {Promise<User[]>}
   */
  all(pagination: Pagination): Promise<[User[], number]>;

  /**
   * @param {number} id
   * @returns {Promise<User>}
   */
  byId(id: number): Promise<User>;

  /**
   * @param {number} id
   * @param {ProfileDTO} DTO
   * @returns {Promise<User>}
   */
  update(id: number, DTO: ProfileDTO): Promise<User>;

  /**
   * @param {number} id
   * @returns {Promise<void>}
   */
  remove(id: number): Promise<void>;
}
