import { injectable } from 'inversify';
import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';

import { Pagination } from '../../../Domain/Core/Pagination';
import { FriendRequest } from '../../../Domain/FriendRequest/FriendRequest';
import { FriendRequestNotFound } from '../../../Domain/FriendRequest/FriendRequestNotFound';
import { FriendRequestRepository } from '../../../Domain/FriendRequest/FriendRequestRepository';
import { TypeOrmRepository } from './TypeOrmRepository';

@injectable()
@EntityRepository()
export class TypeOrmFriendRequestRepository extends TypeOrmRepository implements FriendRequestRepository {
  /**
   * @param {number} senderId
   * @param {Pagination} pagination
   *
   * @returns {Promise<[FriendRequest[] , number]>}
   */
  public bySenderId(senderId: number, pagination: Pagination): Promise<[FriendRequest[], number]> {
    return this.createQueryBuilder()
      .andWhere('fr.sender = :senderId')
      .setParameters({ senderId })
      .orderBy('fr.id', 'DESC')
      .skip(pagination.offset())
      .take(pagination.perPage())
      .getManyAndCount();
  }

  /**
   * @param {number} receiverId
   * @param {Pagination} pagination
   *
   * @returns {Promise<[FriendRequest[] , number]>}
   */
  public byReceiverId(receiverId: number, pagination: Pagination): Promise<[FriendRequest[], number]> {
    return this.createQueryBuilder()
      .andWhere('fr.receiver = :receiverId')
      .setParameters({ receiverId })
      .orderBy('fr.id', 'DESC')
      .skip(pagination.offset())
      .take(pagination.perPage())
      .getManyAndCount();
  }

  /**
   * @param {number} id
   * @returns {Promise<FriendRequest>}
   */
  public byId(id: number): Promise<FriendRequest> {
    return this.createQueryBuilder()
      .andWhere('fr.id = :id')
      .setParameters({ id })
      .getOne()
      .then((friendRequest: FriendRequest) => {
        if (!friendRequest) throw FriendRequestNotFound.fromId(id);
        return friendRequest;
      });
  }

  /**
   * @param {number} senderId
   * @param {number} receiverId
   *
   * @return {Promise<FriendRequest>}
   */
  public find(senderId: number, receiverId: number): Promise<FriendRequest> {
    return this.createQueryBuilder()
      .andWhere('fr.sender = :senderId')
      .setParameters({ senderId })
      .andWhere('fr.receiver = :receiverId')
      .setParameters({ receiverId })
      .getOne();
  }

  /**
   * @param {FriendRequest} friendRequest
   * @returns {Promise<FriendRequest>}
   */
  public store(friendRequest: FriendRequest): Promise<FriendRequest> {
    return this.entityManager.save(friendRequest);
  }

  /**
   * @param {ObjectType<any>} entityClass
   * @param {string} alias
   *
   * @returns {SelectQueryBuilder<any>}
   */
  protected createQueryBuilder(
    entityClass: ObjectType<any> = FriendRequest,
    alias: string = 'fr'
  ): SelectQueryBuilder<any> {
    return this.entityManager
      .createQueryBuilder(entityClass, alias)
      .select(alias)
      .where(`${alias}.deletedAt IS NULL`)
      .leftJoinAndSelect('fr.sender', 'us')
      .leftJoinAndSelect('fr.receiver', 'ur');
  }
}
