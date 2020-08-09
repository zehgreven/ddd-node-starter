import { injectable } from 'inversify';
import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';

import { Pagination } from '../Core/Pagination';
import { TypeOrmRepository } from '../Core/TypeOrmRepository';
import { IRoleRepository } from './IRoleRepository';
import { Role } from './Role';
import { RoleException } from './RoleException';

@injectable()
@EntityRepository()
export class RoleTypeOrmRepository extends TypeOrmRepository implements IRoleRepository {
  /**
   * @param {Pagination} pagination
   * @returns {Promise<[Role[] , number]>}
   */
  public all(pagination: Pagination): Promise<[Role[], number]> {
    return this.createQueryBuilder()
      .leftJoinAndSelect('u.parent', 'up')
      .orderBy('u.id', 'DESC')
      .skip(pagination.offset())
      .take(pagination.perPage())
      .getManyAndCount();
  }

  /**
   * @param {string} id
   * @returns {Promise<Role>}
   */
  public byId(id: string): Promise<Role> {
    return this.createQueryBuilder()
      .andWhere('u.id = :id')
      .leftJoinAndSelect('u.parent', 'up')
      .setParameters({ id })
      .getOne()
      .then((role: Role) => {
        if (!role) throw RoleException.fromId(id);
        return role;
      });
  }

  /**
   * @param {Role} role
   * @returns {Promise<Role>}
   */
  public async save(data: Role): Promise<Role> {
    return this.entityManager.save(data);
  }

  /**
   * @param {ObjectType<any>} entityClass
   * @param {string} alias
   *
   * @returns {SelectQueryBuilder<any>}
   */
  protected createQueryBuilder(entityClass: ObjectType<any> = Role, alias: string = 'u'): SelectQueryBuilder<any> {
    return this.entityManager.createQueryBuilder(entityClass, alias).select(alias).where(`${alias}.deletedAt IS NULL`);
  }
}
