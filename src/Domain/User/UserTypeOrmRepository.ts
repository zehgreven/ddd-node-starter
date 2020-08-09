import { injectable } from 'inversify';
import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';

import { Pagination } from '../Core/Pagination';
import { TypeOrmRepository } from '../Core/TypeOrmRepository';
import { IUserRepository } from './IUserRepository';
import { User } from './User';
import { UserException } from './UserException';

@injectable()
@EntityRepository()
export class UserTypeOrmRepository extends TypeOrmRepository implements IUserRepository {
  /**
   * @param {Pagination} pagination
   * @returns {Promise<[User[] , number]>}
   */
  public all(pagination: Pagination): Promise<[User[], number]> {
    return this.createQueryBuilder()
      .orderBy('u.id', 'DESC')
      .skip(pagination.offset())
      .take(pagination.perPage())
      .getManyAndCount();
  }

  /**
   * @param {string} id
   * @returns {Promise<User>}
   */
  public byId(id: string): Promise<User> {
    return this.createQueryBuilder()
      .andWhere('u.id = :id')
      .setParameters({ id })
      .getOne()
      .then((user: User) => {
        if (!user) throw UserException.fromId(id);
        return user;
      });
  }

  /**
   * @param {string} login
   * @returns {Promise<User>}
   */
  public byLogin(login: string): Promise<User> {
    return this.createQueryBuilder()
      .andWhere('u.login = :login')
      .setParameters({ login })
      .getOne()
      .then((user: User) => {
        if (!user) throw UserException.fromLogin(login);
        return user;
      });
  }

  /**
   * @param {User} user
   * @returns {Promise<User>}
   */
  public save(user: User): Promise<User> {
    return this.entityManager.save(user);
  }

  /**
   * @param {ObjectType<any>} entityClass
   * @param {string} alias
   *
   * @returns {SelectQueryBuilder<any>}
   */
  protected createQueryBuilder(entityClass: ObjectType<any> = User, alias: string = 'u'): SelectQueryBuilder<any> {
    return this.entityManager.createQueryBuilder(entityClass, alias).select(alias).where(`${alias}.deletedAt IS NULL`);
  }
}
