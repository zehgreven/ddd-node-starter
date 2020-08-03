import { Pagination } from '../Core/Pagination';
import { FriendRequest } from './FriendRequest';

export interface FriendRequestRepository {
  /**
   * @param {number} senderId
   * @param {Pagination} pagination
   *
   * @returns {Promise<[FriendRequest[] , number]>}
   */
  bySenderId(senderId: number, pagination: Pagination): Promise<[FriendRequest[], number]>;

  /**
   * @param {number} receiverId
   * @param {Pagination} pagination
   *
   * @returns {Promise<[FriendRequest[] , number]>}
   */
  byReceiverId(receiverId: number, pagination: Pagination): Promise<[FriendRequest[], number]>;

  /**
   * @param {number} id
   * @returns {Promise<FriendRequest>}
   */
  byId(id: number): Promise<FriendRequest>;

  /**
   * @param {number} senderId
   * @param {number} receiverId
   *
   * @return {Promise<FriendRequest>}
   */
  find(senderId: number, receiverId: number): Promise<FriendRequest>;

  /**
   * @param {FriendRequest} user
   */
  store(user: FriendRequest): Promise<FriendRequest>;
}
